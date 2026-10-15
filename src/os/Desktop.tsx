import type { ComponentType } from 'react';
import styles from './Desktop.module.css';
import { APPS, type AppId } from './apps';
import { useOS } from './OSProvider';
import Window from './Window';
import Terminal from '../apps/Terminal';
import AboutApp from '../apps/AboutApp';
import SkillsApp from '../apps/SkillsApp';
import ProjectsApp from '../apps/ProjectsApp';
import ContactApp from '../apps/ContactApp';
import type { AppProps } from '../apps/types';

const CONTENT: Record<AppId, ComponentType<AppProps>> = {
  terminal: Terminal,
  about: AboutApp,
  skills: SkillsApp,
  projects: ProjectsApp,
  contact: ContactApp,
};

export default function Desktop(props: AppProps) {
  const { windows } = useOS();

  return (
    <main className={styles.desktop}>
      {APPS.map((app) => {
        const state = windows[app.id];
        if (!state.open) return null;
        const Content = CONTENT[app.id];
        return (
          <Window key={app.id} app={app}>
            <Content {...props} />
          </Window>
        );
      })}
    </main>
  );
}
