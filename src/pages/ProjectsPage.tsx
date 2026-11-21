import styles from '../apps/apps.module.css';
import { ProjectLinks, ProjectMedia } from '../components/ProjectMedia';
import { useI18n } from '../i18n/LanguageProvider';
import { pathFor, projectPath } from '../routes';
import { ArrowRightIcon, CheckIcon } from '../components/Icons';

export default function ProjectsPage() {
  const { info, ui, lang } = useI18n();

  return (
    <div className={styles.content}>
      <header className={styles.projectsHead}>
        <div>
          <p className={styles.eyebrow}>{ui.projects.eyebrow}</p>
          <h1 className="staticH1">{ui.projects.heading}</h1>
          <p className={styles.projectsIntro}>{ui.projects.intro}</p>
        </div>
        <span className={styles.projectCount}>
          {info.projects.length.toString().padStart(2, '0')} {ui.projects.countLabel}
        </span>
      </header>

      <div className={styles.grid}>
        {info.projects.map((project) => {
          const href = projectPath(project.slug, lang);

          return (
            <article
              key={project.slug}
              className={`${styles.card} ${project.featured ? styles.featured : ''}`}
            >
              <div className={styles.cardMedia}>
                <ProjectMedia
                  project={project}
                  href={project.image ? href : undefined}
                />
              </div>

              <div className={styles.cardBody}>
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

                <h2 className={styles.cardTitle}>
                  <a className={styles.cardTitleBtn} href={href}>
                    {project.title}
                  </a>
                </h2>

                <p className={styles.cardDesc}>{project.summary}</p>

                {project.featured && (
                  <ul className={styles.cardHighlights}>
                    {project.highlights.map((highlight) => (
                      <li key={highlight}>
                        <CheckIcon /> {highlight}
                      </li>
                    ))}
                  </ul>
                )}

                <div className={styles.cardTags}>
                  {project.tech.map((tech) => (
                    <span key={tech} className={styles.cardTag}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div className={styles.cardFooter}>
                  <ProjectLinks project={project} />
                  <a className={styles.caseLink} href={href}>
                    {ui.projects.caseStudy} <ArrowRightIcon />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <p className={styles.projectsIntro} style={{ marginTop: '1.5rem' }}>
        <a className={styles.caseLink} href={pathFor('services', lang)}>
          {ui.projects.seeHowICanHelp} <ArrowRightIcon />
        </a>
      </p>
    </div>
  );
}
