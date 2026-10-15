import styles from './apps.module.css';
import { info } from '../data/info';

export default function SkillsApp() {
  return (
    <div className={`${styles.content} ${styles.scroll}`}>
      <div className={styles.group}>
        <h3 className={styles.groupTitle}>$ proficient_with</h3>
        <div className={styles.tagGrid}>
          {info.skills.proficientWith.map((skill) => (
            <span key={skill} className={styles.tag}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.group}>
        <h3 className={styles.groupTitle}>$ exposed_to</h3>
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
