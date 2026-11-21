import styles from './apps.module.css';
import ProfileSummary from '../components/ProfileSummary';
import ExperienceContent from '../components/ExperienceContent';
import { useI18n } from '../i18n/LanguageProvider';

export default function AboutApp() {
  const { info } = useI18n();

  return (
    <div className={`${styles.content} ${styles.scroll}`}>
      <h1 className={styles.srOnly}>{info.role}</h1>
      <ProfileSummary />
      <ExperienceContent />
    </div>
  );
}
