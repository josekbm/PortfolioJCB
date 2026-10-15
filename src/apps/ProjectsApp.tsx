import styles from './apps.module.css';
import { info } from '../data/info';
import { ExternalLinkIcon, CodeIcon } from '../components/Icons';

export default function ProjectsApp() {
  return (
    <div className={`${styles.content} ${styles.scroll}`}>
      <div className={styles.grid}>
        {info.projects.map((project) => (
          <article key={project.title} className={styles.card}>
            <div className={styles.thumb}>
              <img src={project.image} alt={`Screenshot of ${project.title}`} loading="lazy" />
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>{project.title}</h3>
              <p className={styles.cardDesc}>{project.description}</p>
              <div className={styles.cardTags}>
                {project.tech.map((tech) => (
                  <span key={tech} className={styles.cardTag}>
                    {tech}
                  </span>
                ))}
              </div>
              <div className={styles.cardLinks}>
                {project.live && (
                  <a
                    className={styles.cardLink}
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLinkIcon /> live
                  </a>
                )}
                <a
                  className={styles.cardLink}
                  href={project.source}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CodeIcon /> source
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
