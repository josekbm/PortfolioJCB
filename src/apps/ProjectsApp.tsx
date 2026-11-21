import { useEffect, useRef, useState } from 'react';
import styles from './apps.module.css';
import { type Project, type ProjectCategory } from '../data/info';
import { ProjectLinks, ProjectMedia } from '../components/ProjectMedia';
import { useI18n } from '../i18n/LanguageProvider';
import { useOS } from '../os/OSProvider';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from '../components/Icons';

type Filter = 'All' | ProjectCategory;

const FILTERS: Filter[] = ['All', 'Frontend', 'Backend', 'Landing'];

interface CardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

function ProjectCard({ project, onSelect }: CardProps) {
  const { ui } = useI18n();

  return (
    <article className={`${styles.card} ${project.featured ? styles.featured : ''}`}>
      <div className={styles.cardMedia}>
        <ProjectMedia project={project} onSelect={() => onSelect(project)} />
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardMeta}>
          <span className={styles.cardCategory}>
            {ui.projects.categories[project.category]}
          </span>
          {project.featured && (
            <span className={styles.featuredBadge}>{ui.projects.featured}</span>
          )}
        </div>

        <h3 className={styles.cardTitle}>
          <button
            className={styles.cardTitleBtn}
            onClick={() => onSelect(project)}
            type="button"
          >
            {project.title}
          </button>
        </h3>

        <p className={styles.cardDesc}>{project.description}</p>

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
          <button
            className={styles.caseLink}
            onClick={() => onSelect(project)}
            type="button"
          >
            {ui.projects.caseStudy} <ArrowRightIcon />
          </button>
        </div>
      </div>
    </article>
  );
}

interface DetailProps {
  project: Project;
  onBack: () => void;
  onServices: () => void;
}

function ProjectDetail({ project, onBack, onServices }: DetailProps) {
  const { ui } = useI18n();

  return (
    <>
      <button className={styles.backLink} onClick={onBack} type="button">
        <ArrowLeftIcon /> {ui.projects.all}
      </button>

      <header className={styles.detailHead}>
        <div className={styles.cardMeta}>
          <span className={styles.cardCategory}>
            {ui.projects.categories[project.category]}
          </span>
          {project.featured && (
            <span className={styles.featuredBadge}>{ui.projects.featured}</span>
          )}
        </div>
        <h2 className={styles.detailTitle}>{project.title}</h2>
        <p className={styles.detailLead}>{project.description}</p>
        <ProjectLinks project={project} />
      </header>

      <div className={styles.detailMedia}>
        <ProjectMedia project={project} large />
      </div>

      <div className={styles.detailGrid}>
        <section>
          <h3 className={styles.detailLabel}>{ui.projects.whatIBuilt}</h3>
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

      <div className={styles.detailFooter}>
        <p>{ui.projects.needSimilar}</p>
        <button className={styles.ghostBtn} onClick={onServices} type="button">
          {ui.projects.seeHowICanHelp} <ArrowRightIcon />
        </button>
      </div>
    </>
  );
}

export default function ProjectsApp() {
  const { openApp } = useOS();
  const { info, ui } = useI18n();
  const [filter, setFilter] = useState<Filter>('All');
  const [selected, setSelected] = useState<Project | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const filterLabels: Record<Filter, string> = {
    All: ui.projects.filters.all,
    Frontend: ui.projects.filters.frontend,
    Backend: ui.projects.filters.backend,
    Landing: ui.projects.filters.landing,
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [filter, selected]);

  const visible =
    filter === 'All'
      ? info.projects
      : info.projects.filter((project) => project.category === filter);

  const countFor = (item: Filter) =>
    item === 'All'
      ? info.projects.length
      : info.projects.filter((project) => project.category === item).length;

  return (
    <div ref={scrollRef} className={`${styles.content} ${styles.scroll} ${styles.projects}`}>
      {selected ? (
        <ProjectDetail
          project={selected}
          onBack={() => setSelected(null)}
          onServices={() => openApp('services')}
        />
      ) : (
        <>
          <header className={styles.projectsHead}>
            <div>
              <p className={styles.eyebrow}>{ui.projects.eyebrow}</p>
              <h2 className={styles.projectsTitle}>{ui.projects.title}</h2>
              <p className={styles.projectsIntro}>{ui.projects.intro}</p>
            </div>
            <span className={styles.projectCount}>
              {info.projects.length.toString().padStart(2, '0')}{' '}
              {ui.projects.countLabel}
            </span>
          </header>

          <div
            className={styles.filters}
            role="group"
            aria-label={ui.projects.filterAria}
          >
            {FILTERS.map((item) => (
              <button
                key={item}
                className={`${styles.filter} ${filter === item ? styles.filterActive : ''}`}
                onClick={() => setFilter(item)}
                type="button"
                aria-pressed={filter === item}
              >
                {filterLabels[item]}
                <span className={styles.filterCount}>{countFor(item)}</span>
              </button>
            ))}
          </div>

          <div className={styles.grid}>
            {visible.map((project) => (
              <ProjectCard key={project.slug} project={project} onSelect={setSelected} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
