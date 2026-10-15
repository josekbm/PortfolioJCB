import styles from './apps.module.css';
import { info } from '../data/info';
import { NEOFETCH_ROWS } from './neofetch';

export default function AboutApp() {
  return (
    <div className={`${styles.content} ${styles.scroll}`}>
      <div className={styles.neofetch}>
        <div className={styles.avatarRing}>
          <img
            className={styles.avatar}
            src={info.selfPortrait}
            alt={`Portrait of ${info.firstName}`}
          />
        </div>
        <div className={styles.table}>
          {NEOFETCH_ROWS.map(([key, value]) => (
            <div key={key} style={{ display: 'contents' }}>
              <div className={styles.key}>{key}</div>
              <div>: {value}</div>
            </div>
          ))}
        </div>
      </div>

      <p className={styles.bio}>{info.bio}</p>

      <div className={styles.chips}>
        {info.miniBio.map((item) => (
          <span key={item.text} className={styles.chip}>
            <span>{item.emoji}</span>
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}
