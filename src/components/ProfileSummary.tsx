import styles from '../apps/apps.module.css';
import { portraitSize } from '../data/imageSizes';
import { useI18n } from '../i18n/LanguageProvider';

export default function ProfileSummary() {
  const { info, ui } = useI18n();

  return (
    <>
      <div className={styles.neofetch}>
        <div className={styles.avatarRing}>
          <img
            className={styles.avatar}
            src={info.selfPortrait}
            alt={ui.about.portraitAlt(info.firstName)}
            width={portraitSize.width}
            height={portraitSize.height}
            loading="eager"
            decoding="async"
          />
        </div>
        <div className={styles.table}>
          {ui.neofetch.rows.map(([key, value]) => (
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
    </>
  );
}
