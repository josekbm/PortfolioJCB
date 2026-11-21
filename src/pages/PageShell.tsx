import type { ReactNode } from 'react';
import Logo from '../components/Logo';
import {
  BriefcaseIcon,
  DocIcon,
  GridIcon,
  MailIcon,
  TerminalIcon,
  UserIcon,
} from '../components/Icons';
import { CV_URL } from '../data/links';
import { useI18n } from '../i18n/LanguageProvider';
import { pathFor } from '../routes';

type ActiveKey = 'home' | 'services' | 'projects' | 'about' | 'contact';

interface Crumb {
  label: string;
  href?: string;
}

interface PageShellProps {
  activeKey: ActiveKey;
  windowTitle: string;
  /** URL of the same page in the other language. */
  alternate: string;
  /** Set on project detail pages to build Home > Projects > Project crumbs. */
  projectTitle?: string;
  children: ReactNode;
}

export default function PageShell({
  activeKey,
  windowTitle,
  alternate,
  projectTitle,
  children,
}: PageShellProps) {
  const { info, ui, lang } = useI18n();
  const otherLang = lang === 'en' ? 'es' : 'en';
  const homeLabel = lang === 'es' ? 'Inicio' : 'Home';

  const crumbs: Crumb[] =
    activeKey === 'home'
      ? []
      : activeKey === 'projects' && projectTitle
        ? [
            { label: homeLabel, href: pathFor('home', lang) },
            { label: ui.apps.projects, href: pathFor('projects', lang) },
            { label: projectTitle },
          ]
        : [
            { label: homeLabel, href: pathFor('home', lang) },
            { label: ui.apps[activeKey] },
          ];

  const links = [
    { key: 'home' as const, href: pathFor('home', lang), label: ui.apps.terminal, Icon: TerminalIcon },
    {
      key: 'services' as const,
      href: pathFor('services', lang),
      label: ui.apps.services,
      Icon: BriefcaseIcon,
    },
    {
      key: 'projects' as const,
      href: pathFor('projects', lang),
      label: ui.apps.projects,
      Icon: GridIcon,
    },
    {
      key: 'about' as const,
      href: pathFor('about', lang),
      label: ui.apps.about,
      Icon: UserIcon,
    },
    {
      key: 'contact' as const,
      href: pathFor('contact', lang),
      label: ui.apps.contact,
      Icon: MailIcon,
    },
  ];

  return (
    <div className="staticShell">
      <header className="staticMenubar">
        <a className="staticBrand" href={pathFor('home', lang)}>
          <Logo />
          <span className="staticBrandName">
            blanco<span className="staticBrandAccent">dev</span>
          </span>
          <span className="staticUser">— {info.firstName.toLowerCase()}</span>
        </a>

        <nav
          className="staticNav"
          aria-label={lang === 'es' ? 'Navegación principal' : 'Primary navigation'}
        >
          <a
            className="staticLang"
            href={alternate}
            hrefLang={otherLang}
            lang={otherLang}
            title={ui.menu.switchLanguage}
          >
            {ui.menu.langShort}
          </a>
        </nav>
      </header>

      <main className="staticDesktop">
        <section className="staticWindow" aria-label={windowTitle}>
          <header className="staticTitlebar">
            <span className="staticDots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="staticWindowTitle">{windowTitle}</span>
          </header>
          <div className="staticWindowBody">
            {crumbs.length > 0 && (
              <nav
                className="staticBreadcrumb"
                aria-label={lang === 'es' ? 'Migas de pan' : 'Breadcrumb'}
              >
                <ol>
                  {crumbs.map((crumb, index) => {
                    const last = index === crumbs.length - 1;
                    return (
                      <li key={`${crumb.label}-${index}`}>
                        {crumb.href && !last ? (
                          <a href={crumb.href}>{crumb.label}</a>
                        ) : (
                          <span aria-current={last ? 'page' : undefined}>
                            {crumb.label}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </nav>
            )}
            {children}
          </div>
        </section>
      </main>

      <nav
        className="staticDockWrap"
        aria-label={lang === 'es' ? 'Accesos rápidos' : 'Quick links'}
      >
        <div className="staticDock">
          {links.map(({ key, href, label, Icon }) => (
            <a
              key={key}
              className="staticDockLink"
              href={href}
              aria-label={label}
              title={label}
              aria-current={activeKey === key ? 'page' : undefined}
            >
              <Icon />
              <span className="staticDockTip">{label}</span>
            </a>
          ))}

          <span className="staticDockSep" />

          <a
            className="staticDockLink"
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
            title={ui.dock.curriculum}
          >
            <DocIcon />
            <span className="staticDockTip">{ui.dock.cv}</span>
          </a>
        </div>
        <p className="staticCredit">
          {info.firstName} © {new Date().getFullYear()}
        </p>
      </nav>
    </div>
  );
}
