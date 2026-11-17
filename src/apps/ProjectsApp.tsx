import { useEffect, useRef, useState } from 'react';
import styles from './apps.module.css';
import {
  info,
  type CodePreview,
  type Project,
  type ProjectCategory,
} from '../data/info';
import { useOS } from '../os/OSProvider';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  CodeIcon,
  ExternalLinkIcon,
} from '../components/Icons';

type Filter = 'All' | ProjectCategory;

const FILTERS: Filter[] = ['All', 'Frontend', 'Backend', 'Landing'];

const LABELS: Record<Filter, string> = {
  All: 'all',
  Frontend: 'frontend',
  Backend: 'backend',
  Landing: 'landing',
};

function previewLabel(project: Project) {
  if (project.live) {
    try {
      return new URL(project.live).host.replace(/^www\./, '');
    } catch {
      return 'live preview';
    }
  }

  const slug = project.title
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  return project.code ? `~/projects/${slug}` : slug;
}

function PreviewBar({ project }: { project: Project }) {
  const isCode = Boolean(project.code);

  return (
    <div
      className={`${styles.previewBar} ${isCode ? styles.previewTerminal : ''}`}
      aria-hidden="true"
    >
      <span className={styles.previewDots}>
        <i />
        <i />
        <i />
      </span>
      <span className={styles.previewUrl}>{previewLabel(project)}</span>
      <span className={styles.previewStatus}>
        {project.live ? 'live' : isCode ? 'source' : 'preview'}
      </span>
    </div>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
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
  );
}

const CODE_KEYWORDS = new Set([
  'export',
  'import',
  'from',
  'const',
  'let',
  'return',
  'if',
  'else',
  'await',
  'async',
  'new',
  'public',
  'private',
  'class',
  'this',
  'true',
  'false',
  'null',
  'Task',
  'ActionResult',
  'ControllerBase',
  'HttpGet',
  'HttpPost',
  'ApiController',
  'Authorize',
  'Route',
]);

function renderCode(line: string) {
  if (line.trim().startsWith('//') || line.trim().startsWith('#')) {
    return <span className={styles.codeComment}>{line}</span>;
  }

  return line.split(/(\b\w+\b)/).map((part, index) =>
    CODE_KEYWORDS.has(part) ? (
      <span key={index} className={styles.codeKeyword}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}

function CodeLines({ lines, limit }: { lines: string[]; limit?: number }) {
  const visible = limit ? lines.slice(0, limit) : lines;

  return (
    <span className={styles.codeBody}>
      {visible.map((line, index) => (
        <span key={index} className={styles.codeLine}>
          <span className={styles.codeNum}>
            {(index + 1).toString().padStart(2, '0')}
          </span>
          <span className={styles.codeText}>{line ? renderCode(line) : ' '}</span>
        </span>
      ))}
    </span>
  );
}

interface CodePanelProps {
  code: CodePreview;
  label?: string;
  large?: boolean;
  onSelect?: () => void;
}

function CodePanel({ code, label, large = false, onSelect }: CodePanelProps) {
  const content = (
    <>
      <span className={styles.codeFile}>
        <span className={styles.codeFileName}>
          <CodeIcon /> {code.file}
        </span>
        <span className={styles.codeLang}>{code.language}</span>
      </span>
      <CodeLines lines={code.lines} limit={large ? undefined : 10} />
    </>
  );

  if (onSelect) {
    return (
      <button
        className={styles.codePanel}
        onClick={onSelect}
        type="button"
        aria-label={label}
      >
        {content}
      </button>
    );
  }

  return (
    <div className={`${styles.codePanel} ${styles.codePanelLarge}`}>{content}</div>
  );
}

interface CardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

function ProjectCard({ project, onSelect }: CardProps) {
  return (
    <article className={`${styles.card} ${project.featured ? styles.featured : ''}`}>
      <div className={styles.cardMedia}>
        <PreviewBar project={project} />
        {project.code ? (
          <CodePanel
            code={project.code}
            label={`Open case study: ${project.title}`}
            onSelect={() => onSelect(project)}
          />
        ) : project.image ? (
          <button
            className={styles.shot}
            onClick={() => onSelect(project)}
            type="button"
            aria-label={`Open case study: ${project.title}`}
          >
            <img
              src={project.image}
              alt={`Screenshot of ${project.title}`}
              loading="lazy"
            />
            <span className={styles.shotOverlay}>
              <span>open case study</span>
              <ArrowRightIcon />
            </span>
          </button>
        ) : null}
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardMeta}>
          <span className={styles.cardCategory}>{project.category}</span>
          {project.featured && <span className={styles.featuredBadge}>featured</span>}
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
            case study <ArrowRightIcon />
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
  return (
    <>
      <button className={styles.backLink} onClick={onBack} type="button">
        <ArrowLeftIcon /> all projects
      </button>

      <header className={styles.detailHead}>
        <div className={styles.cardMeta}>
          <span className={styles.cardCategory}>{project.category}</span>
          {project.featured && <span className={styles.featuredBadge}>featured</span>}
        </div>
        <h2 className={styles.detailTitle}>{project.title}</h2>
        <p className={styles.detailLead}>{project.description}</p>
        <ProjectLinks project={project} />
      </header>

      <div className={styles.detailMedia}>
        <PreviewBar project={project} />
        {project.code ? (
          <CodePanel code={project.code} large />
        ) : project.image ? (
          <img
            className={styles.detailImage}
            src={project.image}
            alt={`Screenshot of ${project.title}`}
          />
        ) : null}
      </div>

      <div className={styles.detailGrid}>
        <section>
          <h3 className={styles.detailLabel}>$ what i built</h3>
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
            <span className={styles.detailKey}>role</span>
            <span>{project.role}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailKey}>type</span>
            <span>{project.category}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailKey}>stack</span>
            <span>{project.tech.join(' · ')}</span>
          </div>
        </aside>
      </div>

      <div className={styles.detailFooter}>
        <p>Need something similar?</p>
        <button className={styles.ghostBtn} onClick={onServices} type="button">
          See how I can help <ArrowRightIcon />
        </button>
      </div>
    </>
  );
}

export default function ProjectsApp() {
  const { openApp } = useOS();
  const [filter, setFilter] = useState<Filter>('All');
  const [selected, setSelected] = useState<Project | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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
              <p className={styles.eyebrow}>$ ls ~/projects</p>
              <h2 className={styles.projectsTitle}>Selected work</h2>
              <p className={styles.projectsIntro}>
                A few products I have designed and built end to end. Open any card
                for the full story.
              </p>
            </div>
            <span className={styles.projectCount}>
              {info.projects.length.toString().padStart(2, '0')} projects
            </span>
          </header>

          <div className={styles.filters} role="group" aria-label="Filter projects by type">
            {FILTERS.map((item) => (
              <button
                key={item}
                className={`${styles.filter} ${filter === item ? styles.filterActive : ''}`}
                onClick={() => setFilter(item)}
                type="button"
                aria-pressed={filter === item}
              >
                {LABELS[item]}
                <span className={styles.filterCount}>{countFor(item)}</span>
              </button>
            ))}
          </div>

          <div className={styles.grid}>
            {visible.map((project) => (
              <ProjectCard key={project.title} project={project} onSelect={setSelected} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
