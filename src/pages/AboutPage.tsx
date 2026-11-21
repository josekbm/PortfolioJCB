import styles from '../apps/apps.module.css';
import {
  ArrowRightIcon,
  DocIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
} from '../components/Icons';
import ProfileSummary from '../components/ProfileSummary';
import ExperienceContent from '../components/ExperienceContent';
import { useI18n } from '../i18n/LanguageProvider';
import { pathFor } from '../routes';

const ICONS = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  mail: MailIcon,
  cv: DocIcon,
} as const;

export default function AboutPage() {
  const { info, ui, lang } = useI18n();

  return (
    <div className={styles.content}>
      <h1 className="staticH1">{ui.about.heading}</h1>
      <p className="staticRole">{info.role}</p>

      <ProfileSummary />

      <ExperienceContent />

      <section className={styles.group}>
        <h2 className={styles.groupTitle}>{ui.apps.skills}</h2>

        <h3 className={styles.groupTitle}>{ui.skills.proficient}</h3>
        <div className={styles.tagGrid}>
          {info.skills.proficientWith.map((skill) => (
            <span key={skill} className={styles.tag}>
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.group}>
        <h3 className={styles.groupTitle}>{ui.skills.exposed}</h3>
        <div className={styles.tagGrid}>
          {info.skills.exposedTo.map((skill) => (
            <span key={skill} className={`${styles.tag} ${styles.tagDim}`}>
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.group}>
        <h2 className={styles.groupTitle}>{ui.apps.contact}</h2>
        <div className={styles.contactList}>
          {info.socials.map((social) => {
            const Icon = ICONS[social.icon];
            const external = social.link.startsWith('http');
            const value =
              social.icon === 'mail'
                ? info.email
                : social.icon === 'cv'
                  ? ui.contact.downloadCv
                  : social.link.replace(/^https?:\/\/(www\.)?/, '');

            return (
              <a
                key={social.label}
                className={styles.contactRow}
                href={social.link}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
              >
                <span className={styles.contactIcon}>
                  <Icon />
                </span>
                <span
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: 0,
                  }}
                >
                  <span className={styles.contactLabel}>
                    {social.label.toLowerCase()}
                  </span>
                  <span className={styles.contactValue}>{value}</span>
                </span>
              </a>
            );
          })}
        </div>
      </section>

      <p className={styles.projectsIntro}>
        <a className={styles.caseLink} href={pathFor('projects', lang)}>
          {ui.projects.title} <ArrowRightIcon />
        </a>
      </p>
    </div>
  );
}
