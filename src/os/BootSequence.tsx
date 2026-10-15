import { useEffect, useRef, useState } from 'react';
import styles from './BootSequence.module.css';

interface BootSequenceProps {
  onDone: () => void;
}

const LINES = [
  'JCB BIOS v3.0.0 — starting up...',
  'CPU: initialized',
  'MEM: 16GB @ 3200MHz ... ok',
  'Mounting /home/josecarlos ... done',
  'Loading portfolio kernel ........ [ OK ]',
  'Starting react runtime ........... [ OK ]',
  'Spinning up AI agent runtime ..... [ OK ]',
  'Connecting to ~/projects ......... [ OK ]',
  'All systems operational.',
  '',
  'type `help` in the terminal to get started',
];

export default function BootSequence({ onDone }: BootSequenceProps) {
  const [count, setCount] = useState(0);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone();
  };

  useEffect(() => {
    if (count >= LINES.length) {
      const id = setTimeout(finish, 700);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => setCount((c) => c + 1), count === 0 ? 150 : 130);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

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
      <div className={styles.box}>
        {LINES.slice(0, count).map((line, i) => (
          <p key={i} className={i === LINES.length - 2 ? styles.hl : ''}>
            {line || '\u00A0'}
          </p>
        ))}
        <span className={styles.caret} />
      </div>
      <p className={styles.hint}>press any key to skip</p>
    </div>
  );
}
