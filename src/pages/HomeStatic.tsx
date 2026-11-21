import styles from '../apps/apps.module.css';
import {
  ArrowRightIcon,
  CheckIcon,
  DocIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
} from '../components/Icons';
import { useI18n } from '../i18n/LanguageProvider';
import { pathFor, projectPath } from '../routes';

export default function HomeStatic() {
  const { info, ui, lang } = useI18n();
  const selected = info.projects.slice(0, 3);
  const intro =
    lang === 'es'
      ? `Soy ${info.firstName}, ${info.role} en ${info.location}. Construyo productos web y automatizo trabajo manual con React, Python, PHP, n8n y Docker.`
      : `I'm ${info.firstName}, a ${info.role} based in ${info.location}. I build web products and automate manual work with React, Python, PHP, n8n and Docker.`;

  return (
    <div className={styles.content}>
      <h1 className="staticH1">{info.role}</h1>
      <p className={styles.serviceLead}>{intro}</p>

      <p className={styles.projectsIntro}>
        <a className={styles.caseLink} href={pathFor('about', lang)}>
          {ui.about.more} <ArrowRightIcon />
        </a>
      </p>

      <div className={styles.serviceActions} style={{ marginTop: '1.25rem' }}>
        <a className={styles.cta} href={pathFor('services', lang)}>
          {ui.services.startProject} <ArrowRightIcon />
        </a>
        <a className={styles.ghostBtn} href={pathFor('projects', lang)}>
          {ui.projects.title} <ArrowRightIcon />
        </a>
        <a className={styles.ghostBtn} href={pathFor('contact', lang)}>
          {ui.contact.sayHello} <ArrowRightIcon />
        </a>
      </div>

      <section className={styles.group} style={{ marginTop: '1.75rem' }}>
        <h2 className={styles.groupTitle}>{ui.apps.services}</h2>
        <ul className={styles.cardHighlights}>
          {info.services.services.map((service) => (
            <li key={service.title}>
              <CheckIcon /> <span>{service.title} — {service.tagline}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.group}>
        <h2 className={styles.groupTitle}>{ui.apps.projects}</h2>
        <ul className={styles.cardHighlights}>
          {selected.map((project) => (
            <li key={project.slug}>
              <CheckIcon />
              <a className="staticInlineLink" href={projectPath(project.slug, lang)}>
                {project.title}
              </a>
              <span> — {project.summary}</span>
            </li>
          ))}
        </ul>
        <p className={styles.projectsIntro}>
          <a className={styles.caseLink} href={pathFor('projects', lang)}>
            {ui.projects.all} <ArrowRightIcon />
          </a>
        </p>
      </section>

      <section className={styles.group}>
        <h2 className={styles.groupTitle}>{ui.apps.contact}</h2>
        <div className={styles.chips}>
          <a className={styles.chip} href={`mailto:${info.email}`}>
            <MailIcon /> {info.email}
          </a>
          <a className={styles.chip} href="https://github.com/josekbm">
            <GithubIcon /> GitHub
          </a>
          <a
            className={styles.chip}
            href="https://www.linkedin.com/in/jose-carlos-blanco-mira-59ab5980"
          >
            <LinkedinIcon /> LinkedIn
          </a>
          <a className={styles.chip} href="/CV_Jose_Carlos_Blanco.pdf">
            <DocIcon /> {ui.contact.downloadCv}
          </a>
        </div>
      </section>
    </div>
  );
}
