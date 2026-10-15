import styles from './Dock.module.css';
import { APPS } from './apps';
import { useOS } from './OSProvider';
import { DocIcon } from '../components/Icons';
import { info } from '../data/info';

export default function Dock() {
  const { windows, toggleApp } = useOS();

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
              aria-label={app.name}
              title={app.name}
            >
              <app.Icon className={styles.icon} />
              <span className={styles.tooltip}>{app.name}</span>
              <span className={styles.dot} />
            </button>
          );
        })}

        <span className={styles.sep} />

        <a
          className={styles.app}
          href="./CV_Jose_Carlos_Blanco.pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Curriculum"
          title="Curriculum"
        >
          <DocIcon className={styles.icon} />
          <span className={styles.tooltip}>CV</span>
        </a>
      </div>
      <p className={styles.credit}>{info.firstName} © {new Date().getFullYear()}</p>
    </div>
  );
}
