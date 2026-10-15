import { useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './Window.module.css';
import type { AppDef, AppId } from './apps';
import { useOS } from './OSProvider';
import { MinusIcon, SquareIcon, CloseIcon } from '../components/Icons';

interface WindowProps {
  app: AppDef;
  children: ReactNode;
}

const DEFAULT: Record<AppId, { w: number; h: number; dx: number; dy: number }> = {
  terminal: { w: 680, h: 430, dx: 60, dy: 30 },
  about: { w: 640, h: 600, dx: -380, dy: 10 },
  skills: { w: 560, h: 540, dx: -320, dy: 60 },
  projects: { w: 920, h: 640, dx: 0, dy: -10 },
  contact: { w: 560, h: 480, dx: -220, dy: -40 },
};

function isDesktop() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches
  );
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(v, max));
}

export default function Window({ app, children }: WindowProps) {
  const { windows, closeApp, minimizeApp, focusApp } = useOS();
  const state = windows[app.id];
  const [desktop, setDesktop] = useState(isDesktop);
  const [maximized, setMaximized] = useState(false);

  const [pos, setPos] = useState(() => {
    const d = DEFAULT[app.id];
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    return {
      x: clamp((vw - d.w) / 2 + d.dx, 8, Math.max(8, vw - d.w - 8)),
      y: clamp((vh - d.h) / 2 + d.dy, 42, Math.max(42, vh - d.h - 88)),
    };
  });

  const dragRef = useRef<{ dx: number; dy: number } | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const handler = () => setDesktop(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!state.open) setMaximized(false);
  }, [state.open]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!desktop || maximized) return;
    focusApp(app.id);
    dragRef.current = { dx: e.clientX - pos.x, dy: e.clientY - pos.y };
    const move = (ev: PointerEvent) => {
      if (!dragRef.current) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const d = DEFAULT[app.id];
      setPos({
        x: clamp(ev.clientX - dragRef.current.dx, -d.w + 120, vw - 120),
        y: clamp(ev.clientY - dragRef.current.dy, 40, vh - 100),
      });
    };
    const up = () => {
      dragRef.current = null;
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  return (
    <section
      className={`${styles.window} ${maximized ? styles.maximized : ''} ${
        state.focused ? styles.focused : ''
      } ${state.minimized ? styles.minimized : ''}`}
      style={
        desktop && !maximized
          ? { left: pos.x, top: pos.y, width: DEFAULT[app.id].w, height: DEFAULT[app.id].h, zIndex: state.z }
          : undefined
      }
      onPointerDown={() => focusApp(app.id)}
    >
      <header className={styles.titlebar} onPointerDown={onPointerDown}>
        <div className={styles.controls}>
          <button
            className={`${styles.c} ${styles.close}`}
            onClick={() => closeApp(app.id)}
            aria-label="Close"
          >
            <CloseIcon />
          </button>
          <button
            className={`${styles.c} ${styles.min}`}
            onClick={() => minimizeApp(app.id)}
            aria-label="Minimize"
          >
            <MinusIcon />
          </button>
          <button
            className={`${styles.c} ${styles.max}`}
            onClick={() => setMaximized((m) => !m)}
            aria-label="Maximize"
          >
            <SquareIcon />
          </button>
        </div>
        <div className={styles.title}>
          <app.Icon className={styles.titleIcon} />
          <span>{app.title}</span>
        </div>
        <div className={styles.spacer} />
      </header>
      <div className={styles.body}>{children}</div>
    </section>
  );
}
