import type { ComponentType } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import HomeStatic from './pages/HomeStatic';
import PageShell from './pages/PageShell';
import ProjectPage from './pages/ProjectPage';
import ProjectsPage from './pages/ProjectsPage';
import ServicesPage from './pages/ServicesPage';
import { LanguageProvider } from './i18n/LanguageProvider';
import { ui } from './i18n/ui';
import type { Lang } from './i18n/types';
import { info } from './data/info';
import { infoEs } from './data/info.es';
import {
  projectAlternatePath,
  projectForPath,
  projectPath,
  routeForPath,
  staticPaths,
  projectStaticPaths,
  type RouteKey,
} from './routes';

export { staticPaths, projectStaticPaths };

type PageKey = Exclude<RouteKey, 'notFound'>;

export interface RenderedPage {
  lang: Lang;
  routeKey: PageKey;
  path: string;
  alternate: string;
  enPath: string;
  esPath: string;
  title: string;
  description: string;
  ogType: 'website' | 'article';
  windowTitle: string;
  body: string;
  projectSlug?: string;
  breadcrumbTitle?: string;
}

const PAGES: Record<PageKey, ComponentType> = {
  home: HomeStatic,
  services: ServicesPage,
  projects: ProjectsPage,
  about: AboutPage,
  contact: ContactPage,
};

function pageUi(lang: Lang) {
  return ui[lang];
}

function pageKey(key: RouteKey): PageKey | null {
  return key === 'notFound' ? null : key;
}

export function projectSlugs(): string[] {
  return info.projects.map((project) => project.slug);
}

export function renderPage(pathname: string): RenderedPage | null {
  const lang: Lang =
    pathname === '/es' || pathname.startsWith('/es/') ? 'es' : 'en';
  const other: Lang = lang === 'en' ? 'es' : 'en';
  const t = pageUi(lang);

  const projectMatch = projectForPath(pathname);
  if (projectMatch) {
    const data = lang === 'es' ? infoEs : info;
    const project = data.projects.find((item) => item.slug === projectMatch.slug);
    if (!project) return null;

    const path = projectPath(project.slug, lang);
    const body = renderToStaticMarkup(
      <LanguageProvider initialLang={lang}>
        <PageShell
          activeKey="projects"
          windowTitle={`${t.windowTitles.projects}/${project.slug}`}
          alternate={projectAlternatePath(project.slug, lang)}
          projectTitle={project.title}
        >
          <ProjectPage project={project} />
        </PageShell>
      </LanguageProvider>,
    );

    return {
      lang,
      routeKey: 'projects',
      path,
      alternate: projectAlternatePath(project.slug, lang),
      enPath: projectPath(project.slug, 'en'),
      esPath: projectPath(project.slug, 'es'),
      title: project.seoTitle,
      description: project.seoDescription,
      ogType: 'article',
      windowTitle: `${t.windowTitles.projects}/${project.slug}`,
      body,
      projectSlug: project.slug,
      breadcrumbTitle: project.title,
    };
  }

  const route = routeForPath(pathname);
  if (!route || !route.indexable) return null;
  const key = pageKey(route.key);
  if (!key) return null;

  const Page = PAGES[key];
  const appId = route.appId;
  const windowTitle =
    key === 'home'
      ? t.windowTitles.terminal
      : appId
        ? t.windowTitles[appId]
        : t.windowTitles.about;
  const path = route.path[lang];

  const body = renderToStaticMarkup(
    <LanguageProvider initialLang={lang}>
      <PageShell
        activeKey={key}
        windowTitle={windowTitle}
        alternate={route.path[other]}
      >
        <Page />
      </PageShell>
    </LanguageProvider>,
  );

  return {
    lang,
    routeKey: key,
    path,
    alternate: route.path[other],
    enPath: route.path.en,
    esPath: route.path.es,
    title: route.title[lang],
    description: route.description[lang],
    ogType: 'website',
    windowTitle,
    body,
  };
}
