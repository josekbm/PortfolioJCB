import styles from '../apps/apps.module.css';
import {
  ArrowRightIcon,
  CheckIcon,
  DocIcon,
  ExternalLinkIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
} from './Icons';
import { useI18n } from '../i18n/LanguageProvider';
import { pathFor } from '../routes';

const ICONS = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  mail: MailIcon,
  cv: DocIcon,
} as const;

interface ContactDetailsProps {
  showProcess?: boolean;
  showExpectations?: boolean;
  onViewServices?: () => void;
}

export default function ContactDetails({
  showProcess = false,
  showExpectations = false,
  onViewServices,
}: ContactDetailsProps) {
  const { info, ui, lang } = useI18n();

  return (
    <>
      <span className={styles.contactStatus}>
        <span className={styles.pulse} />
        {info.services.availability}
      </span>

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

      <div className={styles.contactActions}>
        <a className={styles.cta} href={`mailto:${info.email}`}>
          <MailIcon style={{ width: 18, height: 18 }} /> {ui.contact.sayHello}
        </a>
        {onViewServices ? (
          <button
            className={styles.ghostBtn}
            type="button"
            onClick={onViewServices}
          >
            {ui.contact.viewServices} <ArrowRightIcon />
          </button>
        ) : (
          <a className={styles.ghostBtn} href={pathFor('services', lang)}>
            {ui.contact.viewServices} <ArrowRightIcon />
          </a>
        )}
      </div>

      {showExpectations && (
        <section
          className={styles.serviceSection}
          style={{ marginTop: '1.75rem' }}
        >
          <h2 className={styles.groupTitle}>
            {ui.contact.beforeYouWriteTitle}
          </h2>
          <ul className={styles.detailHighlights}>
            {ui.contact.beforeYouWrite.map((item) => (
              <li key={item}>
                <CheckIcon /> {item}
              </li>
            ))}
          </ul>
          <p className={styles.packageNote}>{ui.contact.responseTime}</p>
        </section>
      )}

      {showProcess && (
        <section
          className={styles.serviceSection}
          style={{ marginTop: '1.75rem' }}
        >
          <h2 className={styles.groupTitle}>{ui.services.howItWorksTitle}</h2>
          <ol className={styles.processGrid}>
            {info.services.process.map((step, index) => (
              <li key={step.title} className={styles.processStep}>
                <span className={styles.processNum}>
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                <div>
                  <h3 className={styles.processTitle}>{step.title}</h3>
                  <p className={styles.processDesc}>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      <div className={styles.serviceMeta}>
        <span>{info.location}</span>
        <span>{ui.services.remote}</span>
        <span>{ui.services.timezone}</span>
      </div>

      <a className={styles.contactEmail} href={`mailto:${info.email}`}>
        <ExternalLinkIcon /> {info.email}
      </a>
    </>
  );
}
