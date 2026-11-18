import type { ComponentType } from 'react';
import styles from './apps.module.css';
import type { ServiceIcon } from '../data/info';
import { useI18n } from '../i18n/LanguageProvider';
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

export default function ServicesApp() {
  const { openApp } = useOS();
  const { info, ui } = useI18n();
  const contactLink = `mailto:${info.email}?subject=${encodeURIComponent(
    ui.services.contactSubject,
  )}`;
  const packageLink = (title: string) =>
    `mailto:${info.email}?subject=${encodeURIComponent(
      ui.services.packageSubject(title),
    )}`;

  return (
    <div className={`${styles.content} ${styles.scroll} ${styles.services}`}>
      <section className={styles.serviceHero}>
        <span className={styles.availability}>
          <span className={styles.pulse} />
          {info.services.availability}
        </span>

        <h2 className={styles.serviceHeading}>
          {ui.services.headline1}
          <br />
          <span className="gradient-text">{ui.services.headline2}</span>
        </h2>

        <p className={styles.serviceLead}>{info.services.intro}</p>

        <div className={styles.serviceActions}>
          <a className={styles.cta} href={contactLink}>
            <BriefcaseIcon /> {ui.services.startProject}
          </a>
          <button
            className={styles.ghostBtn}
            onClick={() => openApp('projects')}
            type="button"
          >
            {ui.services.seeWork} <ArrowRightIcon />
          </button>
        </div>

        <div className={styles.serviceMeta}>
          <span>{info.location}</span>
          <span>{ui.services.remote}</span>
          <span>{ui.services.timezone}</span>
        </div>
      </section>

      <section className={styles.serviceSection}>
        <div className={styles.sectionHead}>
          <h3 className={styles.groupTitle}>{ui.services.servicesTitle}</h3>
          <span className={styles.sectionHint}>{ui.services.servicesHint}</span>
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
          <h3 className={styles.groupTitle}>{ui.services.howItWorksTitle}</h3>
          <span className={styles.sectionHint}>{ui.services.howItWorksHint}</span>
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
          <h3 className={styles.groupTitle}>{ui.services.packagesTitle}</h3>
          <span className={styles.sectionHint}>{ui.services.packagesHint}</span>
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
                    <span className={styles.featuredBadge}>
                      {ui.services.coreOffer}
                    </span>
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
                  <span>{ui.services.bestFor}</span> {pkg.bestFor}
                </p>

                <a className={styles.packageCta} href={packageLink(pkg.title)}>
                  {ui.services.requestQuote} <ArrowRightIcon />
                </a>
              </article>
            );
          })}
        </div>

        <p className={styles.packageNote}>{ui.services.packageNote}</p>
      </section>

      <section className={styles.serviceSection}>
        <div className={styles.sectionHead}>
          <h3 className={styles.groupTitle}>{ui.services.faqTitle}</h3>
          <span className={styles.sectionHint}>{ui.services.faqHint}</span>
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
          <h3 className={styles.serviceCtaTitle}>{ui.services.ctaTitle}</h3>
          <p className={styles.serviceCtaText}>{ui.services.ctaText}</p>
        </div>
        <a className={styles.cta} href={contactLink}>
          {ui.services.startConversation} <ArrowRightIcon />
        </a>
      </section>
    </div>
  );
}
