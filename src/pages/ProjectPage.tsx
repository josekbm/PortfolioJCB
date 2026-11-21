import styles from '../apps/apps.module.css';
import type { Project } from '../data/info';
import { ProjectLinks, ProjectMedia } from '../components/ProjectMedia';
import { useI18n } from '../i18n/LanguageProvider';
import { pathFor } from '../routes';
import { ArrowRightIcon, CheckIcon } from '../components/Icons';

export default function ProjectPage({ project }: { project: Project }) {
  const { ui, lang } = useI18n();
  const servicesHref = pathFor('services', lang);
  const contactHref = pathFor('contact', lang);

  return (
    <div className={styles.content}>
      <header className={styles.detailHead}>
        <div className={styles.cardMeta}>
          <span className={styles.cardCategory}>
            {ui.projects.categories[project.category]}
          </span>
          {project.featured && (
            <span className={styles.featuredBadge}>
              {ui.projects.featured}
            </span>
          )}
        </div>
        <h1 className={styles.detailTitle}>{project.title}</h1>
        <p className={styles.detailLead}>{project.description}</p>
        <ProjectLinks project={project} />
      </header>

      <div className={styles.detailMedia}>
        <ProjectMedia project={project} large />
      </div>

      <div className={styles.detailGrid}>
        <section>
          <h2 className={styles.detailLabel}>{ui.projects.whatIBuilt}</h2>
          <ul className={styles.detailHighlights}>
            {project.highlights.map((highlight) => (
              <li key={highlight}>
                <CheckIcon /> {highlight}
              </li>
            ))}
          </ul>
        </section>

        <aside className={styles.detailSide}>
          <div className={styles.detailRow}>
            <span className={styles.detailKey}>{ui.projects.role}</span>
            <span>{project.role}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailKey}>{ui.projects.type}</span>
            <span>{ui.projects.categories[project.category]}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailKey}>{ui.projects.stack}</span>
            <span>{project.tech.join(' · ')}</span>
          </div>
        </aside>
      </div>

      <section className={styles.serviceSection}>
        <h2 className={styles.detailLabel}>{ui.projects.problem}</h2>
        <p className={styles.detailLead}>{project.problem}</p>

        <h2 className={styles.detailLabel}>{ui.projects.solution}</h2>
        <p className={styles.detailLead}>{project.solution}</p>

        <h2 className={styles.detailLabel}>{ui.projects.results}</h2>
        <ul className={styles.detailHighlights}>
          {project.results.map((result) => (
            <li key={result}>
              <CheckIcon /> {result}
            </li>
          ))}
        </ul>
      </section>

      <div className={styles.detailFooter}>
        <p>{ui.projects.needSimilar}</p>
        <a className={styles.ghostBtn} href={servicesHref}>
          {ui.projects.seeHowICanHelp} <ArrowRightIcon />
        </a>
      </div>

      <p className={styles.projectsIntro}>
        <a className={styles.caseLink} href={contactHref}>
          {ui.contact.sayHello} <ArrowRightIcon />
        </a>
      </p>
    </div>
  );
}
