import styles from './MenuBar.module.css';
import { useClock } from './useClock';
import { MoonIcon, SunIcon, PowerIcon, TerminalIcon } from '../components/Icons';
import { info } from '../data/info';
import type { Theme } from '../hooks/useTheme';

interface MenuBarProps {
  theme: Theme;
  onToggleTheme: () => void;
  onReboot: () => void;
}

function pad(n: number) {
  return n.toString().padStart(2, '0');
}

export default function MenuBar({ theme, onToggleTheme, onReboot }: MenuBarProps) {
  const now = useClock();
  const date = now
    .toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short' })
    .toUpperCase();
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}`;

  return (
    <header className={styles.bar}>
      <div className={styles.left}>
        <span className={styles.logo}>
          <TerminalIcon />
        </span>
        <span className={styles.brand}>jose@jcb.dev</span>
        <span className={styles.user}>— {info.firstName.toLowerCase()}</span>
      </div>

      <div className={styles.right}>
        <span className={styles.clock}>{date}</span>
        <span className={styles.clock}>{time}</span>
        <button
          className={styles.btn}
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
        <button
          className={styles.btn}
          onClick={onReboot}
          aria-label="Reboot"
          title="Reboot"
        >
          <PowerIcon />
        </button>
      </div>
    </header>
  );
}
