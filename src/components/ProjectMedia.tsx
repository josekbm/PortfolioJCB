import type { Project } from '../data/info';
import { projectImageSizes } from '../data/imageSizes';
import { useI18n } from '../i18n/LanguageProvider';
import { ArrowRightIcon, CodeIcon, ExternalLinkIcon } from './Icons';
import styles from '../apps/apps.module.css';

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

function previewLabel(project: Project, fallback: string, codePath: string) {
  if (project.live) {
    try {
      return new URL(project.live).host.replace(/^www\./, '');
    } catch {
      return fallback;
    }
  }

  return project.code ? `~/${codePath}/${project.slug}` : project.slug;
}

function ProjectPreviewBar({ project }: { project: Project }) {
  const { ui } = useI18n();
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
      <span className={styles.previewUrl}>
        {previewLabel(project, ui.projects.preview, ui.projects.codePath)}
      </span>
      <span className={styles.previewStatus}>
        {project.live
          ? ui.projects.live
          : isCode
            ? ui.projects.source
            : ui.projects.preview}
      </span>
    </div>
  );
}

interface ProjectMediaProps {
  project: Project;
  /** When set, the media becomes a link to the project detail page. */
  href?: string;
  /** When set, the media opens the OS detail view. */
  onSelect?: () => void;
  /** Detail layout: larger code panel and natural-height image. */
  large?: boolean;
}

export function ProjectMedia({
  project,
  href,
  onSelect,
  large = false,
}: ProjectMediaProps) {
  const { ui } = useI18n();
  const label = ui.projects.openCaseStudyAria(project.title);

  if (project.code) {
    const content = (
      <>
        <span className={styles.codeFile}>
          <span className={styles.codeFileName}>
            <CodeIcon /> {project.code.file}
          </span>
          <span className={styles.codeLang}>{project.code.language}</span>
        </span>
        <CodeLines lines={project.code.lines} limit={large ? undefined : 10} />
      </>
    );

    if (large) {
      return (
        <>
          <ProjectPreviewBar project={project} />
          <div
            className={`${styles.codePanel} ${styles.codePanelLarge}`}
            style={{ cursor: 'default' }}
          >
            {content}
          </div>
        </>
      );
    }

    if (onSelect) {
      return (
        <>
          <ProjectPreviewBar project={project} />
          <button
            type="button"
            className={styles.codePanel}
            onClick={onSelect}
            aria-label={label}
          >
            {content}
          </button>
        </>
      );
    }

    return (
      <>
        <ProjectPreviewBar project={project} />
        {href ? (
          <a className={styles.codePanel} href={href} aria-label={label}>
            {content}
          </a>
        ) : (
          <div className={styles.codePanel} style={{ cursor: 'default' }}>
            {content}
          </div>
        )}
      </>
    );
  }

  if (!project.image) {
    return <ProjectPreviewBar project={project} />;
  }

  const size = projectImageSizes[project.slug];

  if (large) {
    return (
      <>
        <ProjectPreviewBar project={project} />
        <img
          className={styles.detailImage}
          src={project.image}
          alt={ui.projects.imageAlt(project.title)}
          width={size?.width}
          height={size?.height}
          loading="lazy"
          decoding="async"
        />
      </>
    );
  }

  const image = (
    <img
      src={project.image}
      alt={ui.projects.imageAlt(project.title)}
      width={size?.width}
      height={size?.height}
      loading="lazy"
      decoding="async"
      style={
        project.imagePosition
          ? { objectPosition: project.imagePosition }
          : undefined
      }
    />
  );

  const overlay = (
    <span className={styles.shotOverlay}>
      <span>{ui.projects.openCaseStudy}</span>
      <ArrowRightIcon />
    </span>
  );

  return (
    <>
      <ProjectPreviewBar project={project} />
      {onSelect ? (
        <button
          type="button"
          className={styles.shot}
          onClick={onSelect}
          aria-label={label}
        >
          {image}
          {overlay}
        </button>
      ) : href ? (
        <a className={styles.shot} href={href} aria-label={label}>
          {image}
          {overlay}
        </a>
      ) : (
        <div className={styles.shot} style={{ cursor: 'default' }}>
          {image}
        </div>
      )}
    </>
  );
}

export function ProjectLinks({ project }: { project: Project }) {
  const { ui } = useI18n();

  return (
    <div className={styles.cardLinks}>
      {project.live && (
        <a
          className={styles.cardLink}
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLinkIcon /> {ui.projects.live}
        </a>
      )}
      {project.source && (
        <a
          className={styles.cardLink}
          href={project.source}
          target="_blank"
          rel="noopener noreferrer"
        >
          <CodeIcon /> {ui.projects.source}
        </a>
      )}
    </div>
  );
}
