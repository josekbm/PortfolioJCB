import type { Lang } from './i18n/types';
import type { AppId } from './os/apps';

/**
 * Single source of truth for public URLs, language pairs and page-level SEO
 * metadata. It is consumed by the dock, the language switcher, the static
 * page generator and the sitemap builder.
 *
 * Until Phase 3 generates the HTML from this manifest, the hand-written
 * `index.html` and `es/index.html` keep their home metadata duplicated. From
 * Phase 3 onwards this file is the only place where route metadata lives.
 *
 * Rules:
 * - Every indexable route MUST exist in both languages.
 * - Indexable `path` values are absolute and end with `/`. The file-based
 *   404 page is the only exception.
 * - Titles stay under ~60 characters and descriptions under ~155.
 */
export type RouteKey =
  | 'home'
  | 'services'
  | 'projects'
  | 'about'
  | 'contact'
  | 'notFound';

export interface RouteDef {
  key: RouteKey;
  /** App/window that represents this route inside the desktop shell. */
  appId: AppId | null;
  path: Record<Lang, string>;
  title: Record<Lang, string>;
  description: Record<Lang, string>;
  /** False for error pages and other URLs that must not enter the sitemap. */
  indexable: boolean;
}

export const ROUTES: Record<RouteKey, RouteDef> = {
  home: {
    key: 'home',
    appId: null,
    path: { en: '/', es: '/es/' },
    title: {
      en: 'Jose Carlos Blanco · Full Stack & Process Automation',
      es: 'Jose Carlos Blanco · Ingeniero Full Stack y Automatización',
    },
    description: {
      en: 'Full Stack & Process Automation Engineer in Seville. Freelance web development, AI integration and n8n automation with React, Python and PHP.',
      es: 'Ingeniero Full Stack y de Automatización en Sevilla. Desarrollo web freelance, integración de IA y automatización con n8n, React, Python y PHP.',
    },
    indexable: true,
  },
  services: {
    key: 'services',
    appId: 'services',
    path: { en: '/services/', es: '/es/servicios/' },
    title: {
      en: 'Web Development & Automation Services | blancodev',
      es: 'Desarrollo web y automatización | blancodev',
    },
    description: {
      en: 'Full-stack web apps, AI integration and n8n process automation for startups and small teams. React, Python, PHP and Docker.',
      es: 'Aplicaciones web full-stack, integración de IA y automatización de procesos con n8n para empresas y startups. React, Python, PHP y Docker.',
    },
    indexable: true,
  },
  projects: {
    key: 'projects',
    appId: 'projects',
    path: { en: '/projects/', es: '/es/proyectos/' },
    title: {
      en: 'Projects & Case Studies | Jose Carlos Blanco',
      es: 'Proyectos y casos de estudio | Jose Carlos Blanco',
    },
    description: {
      en: 'Selected web development, automation and AI projects: Astro sites, React dashboards, REST APIs, e-commerce and n8n workflows.',
      es: 'Proyectos seleccionados de desarrollo web, automatización e IA: webs en Astro, dashboards en React, APIs REST, e-commerce y flujos con n8n.',
    },
    indexable: true,
  },
  about: {
    key: 'about',
    appId: 'about',
    path: { en: '/about/', es: '/es/sobre-mi/' },
    title: {
      en: 'About Jose Carlos Blanco | Full Stack Engineer',
      es: 'Sobre Jose Carlos Blanco | Ingeniero Full Stack',
    },
    description: {
      en: 'Full Stack and process automation engineer in Seville with 3+ years of experience in React, Python, PHP, Docker, n8n and local LLMs.',
      es: 'Ingeniero Full Stack y de automatización en Sevilla con más de 3 años de experiencia en React, Python, PHP, Docker, n8n y LLMs locales.',
    },
    indexable: true,
  },
  contact: {
    key: 'contact',
    appId: 'contact',
    path: { en: '/contact/', es: '/es/contacto/' },
    title: {
      en: 'Contact | Jose Carlos Blanco',
      es: 'Contacto | Jose Carlos Blanco',
    },
    description: {
      en: 'Tell me about your web project or automation workflow. Based in Seville, working remotely with teams across Europe.',
      es: 'Cuéntame tu proyecto web o flujo de automatización. Con base en Sevilla, trabajo en remoto con equipos de toda Europa.',
    },
    indexable: true,
  },
  notFound: {
    key: 'notFound',
    appId: null,
    path: { en: '/404.html', es: '/404.html' },
    title: {
      en: '404 — Page not found | blancodev',
      es: '404 — Página no encontrada | blancodev',
    },
    description: {
      en: 'The page you are looking for does not exist.',
      es: 'La página que buscas no existe.',
    },
    indexable: false,
  },
};

/** Routes that belong in the sitemap, in a stable order. */
export const PUBLIC_ROUTES: RouteDef[] = [
  ROUTES.home,
  ROUTES.services,
  ROUTES.projects,
  ROUTES.about,
  ROUTES.contact,
];

export function pathFor(key: RouteKey, lang: Lang): string {
  return ROUTES[key].path[lang];
}

/** URL of the same page in the other language. */
export function alternatePath(key: RouteKey, lang: Lang): string {
  return ROUTES[key].path[lang === 'en' ? 'es' : 'en'];
}

function normalizePath(path: string): string {
  const clean = (path || '/').split(/[?#]/)[0];
  if (clean.length > 1 && clean.endsWith('/')) return clean.slice(0, -1);
  return clean || '/';
}

const PATH_LOOKUP = new Map<string, RouteDef>();
for (const route of Object.values(ROUTES)) {
  for (const lang of ['en', 'es'] as const) {
    PATH_LOOKUP.set(normalizePath(route.path[lang]), route);
  }
}

/** Resolve a pathname such as `/es/servicios` to its static route definition. */
export function routeForPath(pathname: string): RouteDef | undefined {
  return PATH_LOOKUP.get(normalizePath(pathname));
}

export interface ProjectPathMatch {
  slug: string;
  lang: Lang;
}

/**
 * Resolve `/projects/<slug>/` or `/es/proyectos/<slug>/` to its slug and
 * language. It does not validate the slug against the project data; callers
 * should check it against `info.projects`.
 */
export function projectForPath(pathname: string): ProjectPathMatch | undefined {
  const clean = normalizePath(pathname);
  const match = clean.match(/^\/(?:es\/proyectos|projects)\/([^/]+)$/);
  if (!match) return undefined;
  return {
    slug: match[1],
    lang: clean.startsWith('/es/') ? 'es' : 'en',
  };
}

export function projectPath(slug: string, lang: Lang): string {
  const base = lang === 'es' ? '/es/proyectos' : '/projects';
  return `${base}/${slug}/`;
}

export function projectAlternatePath(slug: string, lang: Lang): string {
  return projectPath(slug, lang === 'en' ? 'es' : 'en');
}

/** Every static route in both languages, ready for a prerender script. */
export function staticPaths(): Array<{
  route: RouteDef;
  lang: Lang;
  path: string;
}> {
  return PUBLIC_ROUTES.flatMap((route) =>
    (['en', 'es'] as const).map((lang) => ({
      route,
      lang,
      path: route.path[lang],
    })),
  );
}

/** Project detail URLs for a given list of slugs. */
export function projectStaticPaths(slugs: string[]): Array<{
  slug: string;
  lang: Lang;
  path: string;
}> {
  return slugs.flatMap((slug) =>
    (['en', 'es'] as const).map((lang) => ({
      slug,
      lang,
      path: projectPath(slug, lang),
    })),
  );
}
