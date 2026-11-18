import { useEffect, useRef, useState } from 'react';
import Logo from '../components/Logo';
import { useI18n } from '../i18n/LanguageProvider';
import styles from './BootSequence.module.css';

interface BootSequenceProps {
  onDone: () => void;
}

export default function BootSequence({ onDone }: BootSequenceProps) {
  const { ui } = useI18n();
  const lines = ui.boot.lines;
  const [count, setCount] = useState(0);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone();
  };

  useEffect(() => {
    if (count >= lines.length) {
      const id = setTimeout(finish, 700);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => setCount((c) => c + 1), count === 0 ? 150 : 130);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, lines.length]);

  useEffect(() => {
    const skip = () => finish();
    window.addEventListener('keydown', skip);
    window.addEventListener('pointerdown', skip);
    return () => {
      window.removeEventListener('keydown', skip);
      window.removeEventListener('pointerdown', skip);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.screen}>
      <Logo className={styles.logo} />
      <div className={styles.box}>
        {lines.slice(0, count).map((line, i) => (
          <p key={i} className={i === lines.length - 2 ? styles.hl : ''}>
            {line || '\u00A0'}
          </p>
        ))}
        <span className={styles.caret} />
      </div>
      <p className={styles.hint}>{ui.boot.skip}</p>
    </div>
  );
}
