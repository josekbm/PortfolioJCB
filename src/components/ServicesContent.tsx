import type { ComponentType } from 'react';
import styles from '../apps/apps.module.css';
import type { ServiceIcon } from '../data/info';
import { useI18n } from '../i18n/LanguageProvider';
import { pathFor } from '../routes';
import {
  ArrowRightIcon,
  BriefcaseIcon,
  CheckIcon,
  CodeIcon,
  ContainerIcon,
  GridIcon,
  ServerIcon,
  SparklesIcon,
} from './Icons';

const ICONS: Record<ServiceIcon, ComponentType<{ className?: string }>> = {
  code: CodeIcon,
  automation: SparklesIcon,
  backend: ServerIcon,
  infra: ContainerIcon,
  product: GridIcon,
};

interface ServicesContentProps {
  mode: 'page' | 'window';
  onSeeWork?: () => void;
}

export default function ServicesContent({ mode, onSeeWork }: ServicesContentProps) {
  const { info, ui, lang } = useI18n();
  const projectsHref = pathFor('projects', lang);
  const rootClass = [styles.content, mode === 'window' ? styles.scroll : '']
    .filter(Boolean)
    .join(' ');
  const Hero = mode === 'page' ? 'h1' : 'h2';
  const Group = mode === 'page' ? 'h2' : 'h3';
  const Card = mode === 'page' ? 'h3' : 'h4';
  const contactLink = `mailto:${info.email}?subject=${encodeURIComponent(
    ui.services.contactSubject,
  )}`;
  const packageLink = (title: string) =>
    `mailto:${info.email}?subject=${encodeURIComponent(
      ui.services.packageSubject(title),
    )}`;

  return (
    <div className={rootClass}>
      <section className={styles.serviceHero}>
        <span className={styles.availability}>
          <span className={styles.pulse} />
          {info.services.availability}
        </span>

        <Hero className={styles.serviceHeading}>
          {ui.services.headline1}
          <br />{' '}
          <span className="gradient-text">{ui.services.headline2}</span>
        </Hero>

        <p className={styles.serviceLead}>{info.services.intro}</p>

        <div className={styles.serviceActions}>
          <a className={styles.cta} href={contactLink}>
            <BriefcaseIcon /> {ui.services.startProject}
          </a>
          {onSeeWork ? (
            <button className={styles.ghostBtn} onClick={onSeeWork} type="button">
              {ui.services.seeWork} <ArrowRightIcon />
            </button>
          ) : (
            <a className={styles.ghostBtn} href={projectsHref}>
              {ui.services.seeWork} <ArrowRightIcon />
            </a>
          )}
        </div>

        <div className={styles.serviceMeta}>
          <span>{info.location}</span>
          <span>{ui.services.remote}</span>
          <span>{ui.services.timezone}</span>
        </div>
      </section>

      <section className={styles.serviceSection} aria-labelledby="services-list">
        <div className={styles.sectionHead}>
          <Group id="services-list" className={styles.groupTitle}>
            {ui.services.servicesTitle}
          </Group>
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

                <Card className={styles.serviceTitle}>{service.title}</Card>
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

      <section className={styles.serviceSection} aria-labelledby="process">
        <div className={styles.sectionHead}>
          <Group id="process" className={styles.groupTitle}>
            {ui.services.howItWorksTitle}
          </Group>
          <span className={styles.sectionHint}>{ui.services.howItWorksHint}</span>
        </div>

        <ol className={styles.processGrid}>
          {info.services.process.map((step, index) => (
            <li key={step.title} className={styles.processStep}>
              <span className={styles.processNum}>
                {(index + 1).toString().padStart(2, '0')}
              </span>
              <div>
                <Card className={styles.processTitle}>{step.title}</Card>
                <p className={styles.processDesc}>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.serviceSection} aria-labelledby="packages">
        <div className={styles.sectionHead}>
          <Group id="packages" className={styles.groupTitle}>
            {ui.services.packagesTitle}
          </Group>
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

                <Card className={styles.packageTitle}>{pkg.title}</Card>
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

      <section className={styles.serviceSection} aria-labelledby="faq">
        <div className={styles.sectionHead}>
          <Group id="faq" className={styles.groupTitle}>
            {ui.services.faqTitle}
          </Group>
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
          <Group className={styles.serviceCtaTitle}>{ui.services.ctaTitle}</Group>
          <p className={styles.serviceCtaText}>{ui.services.ctaText}</p>
        </div>
        <a className={styles.cta} href={contactLink}>
          {ui.services.startConversation} <ArrowRightIcon />
        </a>
      </section>
    </div>
  );
}
