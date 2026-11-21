import styles from '../apps/apps.module.css';
import ContactDetails from '../components/ContactDetails';
import { useI18n } from '../i18n/LanguageProvider';

export default function ContactPage() {
  const { ui } = useI18n();

  return (
    <div className={styles.content}>
      <h1 className="staticH1">{ui.contact.headline}</h1>
      <p className={styles.serviceLead}>{ui.contact.intro}</p>
      <ContactDetails showProcess showExpectations />
    </div>
  );
}
