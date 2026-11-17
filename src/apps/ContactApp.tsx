import styles from './apps.module.css';
import { info } from '../data/info';
import { useOS } from '../os/OSProvider';
import {
  ArrowRightIcon,
  DocIcon,
  ExternalLinkIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
} from '../components/Icons';

const ICONS = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  mail: MailIcon,
  cv: DocIcon,
} as const;

export default function ContactApp() {
  const { openApp } = useOS();

  return (
    <div className={`${styles.content} ${styles.scroll}`}>
      <span className={styles.contactStatus}>
        <span className={styles.pulse} />
        {info.services.availability}
      </span>

      <div className={styles.contactList}>
        {info.socials.map((social) => {
          const Icon = ICONS[social.icon];
          const external = social.link.startsWith('http');
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
              <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <span className={styles.contactLabel}>{social.label.toLowerCase()}</span>
                <span className={styles.contactValue}>
                  {social.icon === 'mail'
                    ? info.email
                    : social.icon === 'cv'
                      ? 'Download CV'
                      : social.label === 'GitHub'
                        ? 'github.com/josekbm'
                        : 'linkedin.com/in/jose-carlos-blanco'}
                </span>
              </span>
            </a>
          );
        })}
      </div>

      <div className={styles.contactActions}>
        <a className={styles.cta} href={`mailto:${info.email}`}>
          <MailIcon style={{ width: 18, height: 18 }} /> Say hello
        </a>
        <button
          className={styles.ghostBtn}
          onClick={() => openApp('services')}
          type="button"
        >
          View services <ArrowRightIcon />
        </button>
      </div>

      <a className={styles.contactEmail} href={`mailto:${info.email}`}>
        <ExternalLinkIcon /> {info.email}
      </a>
    </div>
  );
}
