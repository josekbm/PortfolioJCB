import { useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './Terminal.module.css';
import { useOS } from '../os/OSProvider';
import { runCommand, type CommandContext } from './terminalCommands';
import type { AppProps } from './types';

interface Entry {
  id: number;
  cmd?: string;
  output: ReactNode;
}

let idCounter = 0;

export default function Terminal({ theme, onToggleTheme, onReboot }: AppProps) {
  const { openApp, closeApp } = useOS();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState(-1);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEntries([
      {
        id: idCounter++,
        output: (
          <>
            <div className={`${styles.line} ${styles.ok}`}>JCB OS — interactive terminal</div>
            <div className={styles.line}>
              type <span className={styles.ok}>help</span> to see what you can do.
            </div>
          </>
        ),
      },
    ]);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries]);

  const ctx: CommandContext = { openApp, closeApp, onToggleTheme, theme, onReboot, history };

  const submit = () => {
    const cmd = value.trim();
    if (!cmd) return;

    const result = runCommand(cmd, ctx);

    if (result.clear) {
      setEntries([]);
    } else {
      setEntries((prev) => [
        ...prev,
        { id: idCounter++, cmd, output: result.output },
      ]);
    }

    setHistory((prev) => [...prev, cmd]);
    setValue('');
    setHistIndex(-1);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const next = histIndex < 0 ? history.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(next);
      setValue(history[next]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIndex < 0) return;
      const next = histIndex + 1;
      if (next >= history.length) {
        setHistIndex(-1);
        setValue('');
      } else {
        setHistIndex(next);
        setValue(history[next]);
      }
    }
  };

  return (
    <div className={styles.terminal} onClick={() => inputRef.current?.focus()}>
      <div className={styles.scroll} ref={scrollRef}>
        {entries.map((entry) => (
          <div key={entry.id} className={styles.entry}>
            {entry.cmd !== undefined && (
              <div className={styles.cmdLine}>
                <span className={styles.prompt}>jose@jcb:~$</span>
                <span className={styles.cmd}>{entry.cmd}</span>
              </div>
            )}
            {entry.output}
          </div>
        ))}
      </div>

      <div className={styles.inputLine}>
        <span className={styles.prompt}>jose@jcb:~$</span>
        <input
          ref={inputRef}
          className={styles.input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="type a command…"
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoFocus
        />
      </div>
    </div>
  );
}
