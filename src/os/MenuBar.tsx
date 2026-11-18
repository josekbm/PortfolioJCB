import styles from './MenuBar.module.css';
import { useClock } from './useClock';
import { MoonIcon, SunIcon, PowerIcon } from '../components/Icons';
import Logo from '../components/Logo';
import { useI18n } from '../i18n/LanguageProvider';
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
  const { info, ui, locale, switchLanguage } = useI18n();
  const date = now
    .toLocaleDateString(locale, { weekday: 'short', day: '2-digit', month: 'short' })
    .toUpperCase();
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}`;

  return (
    <header className={styles.bar}>
      <div className={styles.left}>
        <span className={styles.logo}>
          <Logo />
        </span>
        <span className={styles.brand}>
          blanco<span className={styles.brandAccent}>dev</span>
        </span>
        <span className={styles.user}>— {info.firstName.toLowerCase()}</span>
      </div>

      <div className={styles.right}>
        <span className={styles.clock}>{date}</span>
        <span className={styles.clock}>{time}</span>
        <button
          className={styles.lang}
          onClick={switchLanguage}
          aria-label={ui.menu.switchLanguage}
          title={ui.menu.switchLanguage}
        >
          {ui.menu.langShort}
        </button>
        <button
          className={styles.btn}
          onClick={onToggleTheme}
          aria-label={ui.menu.toggleTheme}
          title={ui.menu.toggleTheme}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
        <button
          className={styles.btn}
          onClick={onReboot}
          aria-label={ui.menu.reboot}
          title={ui.menu.reboot}
        >
          <PowerIcon />
        </button>
      </div>
    </header>
  );
}
