import styles from './Dock.module.css';
import { APPS } from './apps';
import { useOS } from './OSProvider';
import { useI18n } from '../i18n/LanguageProvider';
import { CV_URL } from '../data/links';
import { DocIcon } from '../components/Icons';

export default function Dock() {
  const { windows, toggleApp } = useOS();
  const { info, ui } = useI18n();
  const appName = (app: (typeof APPS)[number]) => ui.apps[app.nameKey];

  return (
    <div className={styles.wrap}>
      <div className={styles.dock}>
        {APPS.map((app) => {
          const state = windows[app.id];
          return (
            <button
              key={app.id}
              className={`${styles.app} ${state.open && !state.minimized ? styles.running : ''} ${
                state.focused ? styles.focused : ''
              }`}
              onClick={() => toggleApp(app.id)}
              aria-label={appName(app)}
              title={appName(app)}
            >
              <app.Icon className={styles.icon} />
              <span className={styles.tooltip}>{appName(app)}</span>
              <span className={styles.dot} />
            </button>
          );
        })}

        <span className={styles.sep} />

        <a
          className={styles.app}
          href={CV_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ui.dock.curriculum}
          title={ui.dock.curriculum}
        >
          <DocIcon className={styles.icon} />
          <span className={styles.tooltip}>{ui.dock.cv}</span>
        </a>
      </div>
      <p className={styles.credit}>{info.firstName} © {new Date().getFullYear()}</p>
    </div>
  );
}
