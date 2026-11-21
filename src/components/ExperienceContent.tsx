import styles from '../apps/apps.module.css';
import { useI18n } from '../i18n/LanguageProvider';

export default function ExperienceContent() {
  const { info, ui } = useI18n();

  return (
    <>
      <section className={styles.group} aria-labelledby="experience">
        <h2 id="experience" className={styles.groupTitle}>
          {ui.about.experience}
        </h2>

        <ol className={styles.timeline}>
          {info.experience.map((job) => (
            <li key={`${job.company}-${job.period}`} className={styles.timelineItem}>
              <div className={styles.timelineHead}>
                <h3 className={styles.timelineRole}>{job.role}</h3>
                <span className={styles.timelinePeriod}>{job.period}</span>
              </div>
              <p className={styles.timelineMeta}>
                {job.company} · {job.location}
              </p>
              <p className={styles.timelineSummary}>{job.summary}</p>
              <ul className={styles.timelinePoints}>
                {job.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.group} aria-labelledby="education">
        <h2 id="education" className={styles.groupTitle}>
          {ui.about.education}
        </h2>

        <ul className={styles.timeline}>
          {info.education.map((item) => (
            <li key={item.title} className={styles.timelineItem}>
              <div className={styles.timelineHead}>
                <h3 className={styles.timelineRole}>{item.title}</h3>
                <span className={styles.timelinePeriod}>{item.period}</span>
              </div>
              <p className={styles.timelineMeta}>{item.institution}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
