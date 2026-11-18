import styles from './apps.module.css';
import { useI18n } from '../i18n/LanguageProvider';

export default function SkillsApp() {
  const { info, ui } = useI18n();

  return (
    <div className={`${styles.content} ${styles.scroll}`}>
      <div className={styles.group}>
        <h3 className={styles.groupTitle}>{ui.skills.proficient}</h3>
        <div className={styles.tagGrid}>
          {info.skills.proficientWith.map((skill) => (
            <span key={skill} className={styles.tag}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.group}>
        <h3 className={styles.groupTitle}>{ui.skills.exposed}</h3>
        <div className={styles.tagGrid}>
          {info.skills.exposedTo.map((skill) => (
            <span key={skill} className={`${styles.tag} ${styles.tagDim}`}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
