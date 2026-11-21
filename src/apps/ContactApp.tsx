import styles from './apps.module.css';
import ContactDetails from '../components/ContactDetails';
import { useOS } from '../os/OSProvider';

export default function ContactApp() {
  const { openApp } = useOS();

  return (
    <div className={`${styles.content} ${styles.scroll}`}>
      <ContactDetails onViewServices={() => openApp('services')} />
    </div>
  );
}
