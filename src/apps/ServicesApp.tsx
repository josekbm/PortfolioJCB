import type { ComponentType } from 'react';
import styles from './apps.module.css';
import { info, type ServiceIcon } from '../data/info';
import { useOS } from '../os/OSProvider';
import {
  ArrowRightIcon,
  BriefcaseIcon,
  CheckIcon,
  CodeIcon,
  ContainerIcon,
  GridIcon,
  ServerIcon,
  SparklesIcon,
} from '../components/Icons';

const ICONS: Record<ServiceIcon, ComponentType<{ className?: string }>> = {
  code: CodeIcon,
  automation: SparklesIcon,
  backend: ServerIcon,
  infra: ContainerIcon,
  product: GridIcon,
};

const CONTACT_LINK = `mailto:${info.email}?subject=${encodeURIComponent(
  'Project inquiry — via portfolio',
)}`;

function packageLink(title: string) {
  return `mailto:${info.email}?subject=${encodeURIComponent(
    `Project inquiry — ${title} package`,
  )}`;
}

export default function ServicesApp() {
  const { openApp } = useOS();

  return (
    <div className={`${styles.content} ${styles.scroll} ${styles.services}`}>
      <section className={styles.serviceHero}>
        <span className={styles.availability}>
          <span className={styles.pulse} />
          {info.services.availability}
        </span>

        <h2 className={styles.serviceHeading}>
          Web products &amp; AI automation,
          <br />
          <span className="gradient-text">built end to end.</span>
        </h2>

        <p className={styles.serviceLead}>{info.services.intro}</p>

        <div className={styles.serviceActions}>
          <a className={styles.cta} href={CONTACT_LINK}>
            <BriefcaseIcon /> Start a project
          </a>
          <button
            className={styles.ghostBtn}
            onClick={() => openApp('projects')}
            type="button"
          >
            See selected work <ArrowRightIcon />
          </button>
        </div>

        <div className={styles.serviceMeta}>
          <span>{info.location}</span>
          <span>Remote-friendly</span>
          <span>CET / UTC+1</span>
        </div>
      </section>

      <section className={styles.serviceSection}>
        <div className={styles.sectionHead}>
          <h3 className={styles.groupTitle}>$ services --list</h3>
          <span className={styles.sectionHint}>what i can take off your plate</span>
        </div>

        <div className={styles.serviceGrid}>
          {info.services.services.map((service, index) => {
            const Icon = ICONS[service.icon];
            return (
              <article key={service.title} className={styles.serviceCard}>
                <div className={styles.serviceTop}>
                  <span className={styles.serviceIcon}>
                    <Icon />
                  </span>
                  <span className={styles.serviceNum}>
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                </div>

                <h4 className={styles.serviceTitle}>{service.title}</h4>
                <p className={styles.serviceTagline}>{service.tagline}</p>
                <p className={styles.serviceDesc}>{service.description}</p>

                <ul className={styles.deliverables}>
                  {service.deliverables.map((item) => (
                    <li key={item}>
                      <CheckIcon /> {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.serviceSection}>
        <div className={styles.sectionHead}>
          <h3 className={styles.groupTitle}>$ how it works</h3>
          <span className={styles.sectionHint}>no black boxes</span>
        </div>

        <ol className={styles.processGrid}>
          {info.services.process.map((step, index) => (
            <li key={step.title} className={styles.processStep}>
              <span className={styles.processNum}>
                {(index + 1).toString().padStart(2, '0')}
              </span>
              <div>
                <h4 className={styles.processTitle}>{step.title}</h4>
                <p className={styles.processDesc}>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.serviceSection}>
        <div className={styles.sectionHead}>
          <h3 className={styles.groupTitle}>$ packages --list</h3>
          <span className={styles.sectionHint}>fixed scope · fixed quote · no surprises</span>
        </div>

        <div className={styles.packageGrid}>
          {info.services.packages.map((pkg) => {
            const Icon = ICONS[pkg.icon];
            return (
              <article
                key={pkg.title}
                className={`${styles.package} ${pkg.featured ? styles.packageFeatured : ''}`}
              >
                <div className={styles.packageHead}>
                  <span className={styles.serviceIcon}>
                    <Icon />
                  </span>
                  {pkg.featured && (
                    <span className={styles.featuredBadge}>core offer</span>
                  )}
                </div>

                <h4 className={styles.packageTitle}>{pkg.title}</h4>
                <p className={styles.packageDesc}>{pkg.description}</p>

                <ul className={styles.packageIncludes}>
                  {pkg.includes.map((item) => (
                    <li key={item}>
                      <CheckIcon /> {item}
                    </li>
                  ))}
                </ul>

                <p className={styles.packageBest}>
                  <span>best for</span> {pkg.bestFor}
                </p>

                <a className={styles.packageCta} href={packageLink(pkg.title)}>
                  Request quote <ArrowRightIcon />
                </a>
              </article>
            );
          })}
        </div>

        <p className={styles.packageNote}>
          Every package is quoted up front. Need an ongoing arrangement? Monthly
          retainers and technical consulting are available too.
        </p>
      </section>

      <section className={styles.serviceSection}>
        <div className={styles.sectionHead}>
          <h3 className={styles.groupTitle}>$ faq</h3>
          <span className={styles.sectionHint}>the questions that usually come next</span>
        </div>

        <div className={styles.faqList}>
          {info.services.faq.map((item) => (
            <details key={item.question} className={styles.faqItem}>
              <summary className={styles.faqQuestion}>
                <span>{item.question}</span>
                <span className={styles.faqPlus} aria-hidden="true">
                  +
                </span>
              </summary>
              <p className={styles.faqAnswer}>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.serviceCta}>
        <div>
          <h3 className={styles.serviceCtaTitle}>Have a problem in mind?</h3>
          <p className={styles.serviceCtaText}>
            Tell me what you are trying to build or automate. I will reply with an
            honest take and a clear next step.
          </p>
        </div>
        <a className={styles.cta} href={CONTACT_LINK}>
          Start a conversation <ArrowRightIcon />
        </a>
      </section>
    </div>
  );
}
