import styles from './Dock.module.css';
import { APPS } from './apps';
import { useOS } from './OSProvider';
import { useI18n } from '../i18n/LanguageProvider';
import { CV_URL } from '../data/links';
import { pathFor } from '../routes';
import { DocIcon } from '../components/Icons';

export default function Dock() {
  const { windows, toggleApp } = useOS();
  const { info, ui, lang } = useI18n();
  const appName = (app: (typeof APPS)[number]) => ui.apps[app.nameKey];

  const hrefFor = (id: (typeof APPS)[number]['id']) => {
    if (id === 'terminal') return pathFor('home', lang);
    if (id === 'skills') return pathFor('about', lang);
    return pathFor(id, lang);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.dock}>
        {APPS.map((app) => {
          const state = windows[app.id];
          return (
            <a
              key={app.id}
              className={`${styles.app} ${state.open && !state.minimized ? styles.running : ''} ${
                state.focused ? styles.focused : ''
              }`}
              href={hrefFor(app.id)}
              onClick={(event) => {
                if (
                  event.metaKey ||
                  event.ctrlKey ||
                  event.shiftKey ||
                  event.altKey
                ) {
                  return;
                }
                event.preventDefault();
                toggleApp(app.id);
              }}
              aria-label={appName(app)}
              title={appName(app)}
            >
              <app.Icon className={styles.icon} />
              <span className={styles.tooltip}>{appName(app)}</span>
              <span className={styles.dot} />
            </a>
          );
        })}

        <span className={styles.sep} />

        <a
          className={styles.app}
          href={CV_URL}
          target="_blank"
          rel="noopener noreferrer"
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
