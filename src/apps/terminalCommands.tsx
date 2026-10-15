import type { ReactNode } from 'react';
import styles from './Terminal.module.css';
import { info } from '../data/info';
import { ASCII_JCB, NEOFETCH_ROWS } from './neofetch';
import type { AppId } from '../os/apps';
import type { Theme } from '../hooks/useTheme';

export interface CommandContext {
  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  onToggleTheme: () => void;
  theme: Theme;
  onReboot: () => void;
  history: string[];
}

interface CommandResult {
  output: ReactNode;
  clear?: boolean;
}

type Handler = (args: string[], ctx: CommandContext) => CommandResult;

const Line = ({ children, className = styles.line }: { children: ReactNode; className?: string }) => (
  <div className={className}>{children}</div>
);

const ok = (text: string) => <Line className={`${styles.line} ${styles.ok}`}>{text}</Line>;
const muted = (text: string) => <Line className={`${styles.line} ${styles.muted}`}>{text}</Line>;
const err = (text: string) => <Line className={`${styles.line} ${styles.err}`}>{text}</Line>;
const text = (t: string) => <Line>{t}</Line>;

const APPS = ['about', 'skills', 'projects', 'contact', 'terminal'] as const;

const COMMANDS: Record<string, { desc: string; run: Handler }> = {
  help: {
    desc: 'show available commands',
    run: () => ({
      output: (
        <>
          {text('available commands:')}
          {Object.entries(COMMANDS).map(([name, c]) => (
            <Line key={name}>
              <span className={styles.ok}>{name.padEnd(12)}</span>
              <span className={styles.muted}>{c.desc}</span>
            </Line>
          ))}
        </>
      ),
    }),
  },
  whoami: {
    desc: 'who am i?',
    run: () => ({
      output: (
        <>
          {text('josecarlos')}
          {text(info.role)}
        </>
      ),
    }),
  },
  about: {
    desc: 'a short bio',
    run: () => ({ output: <Line>{info.bio}</Line> }),
  },
  bio: {
    desc: 'alias of about',
    run: (_, ctx) => COMMANDS.about.run([], ctx),
  },
  skills: {
    desc: 'list my technical skills',
    run: () => ({
      output: (
        <>
          {ok('proficient:')}
          {text(info.skills.proficientWith.join(' · '))}
          {ok('exposed to:')}
          {text(info.skills.exposedTo.join(' · '))}
        </>
      ),
    }),
  },
  projects: {
    desc: 'list my projects',
    run: () => ({
      output: (
        <>
          {info.projects.map((p, i) => (
            <Line key={p.title}>
              <span className={styles.ok}>{(i + 1).toString().padStart(2, '0')}.</span>{' '}
              {p.title} <span className={styles.muted}>— {p.tech.join(', ')}</span>
            </Line>
          ))}
          {muted('run `open projects` to see them')}
        </>
      ),
    }),
  },
  contact: {
    desc: 'ways to reach me',
    run: () => ({
      output: (
        <>
          {text(`${info.email}`)}
          {text('github  https://github.com/josekbm')}
          {text('linkedin  https://linkedin.com/in/jose-carlos-blanco-mira-59ab5980')}
          {muted('run `open contact` to see all')}
        </>
      ),
    }),
  },
  socials: {
    desc: 'alias of contact',
    run: (_, ctx) => COMMANDS.contact.run([], ctx),
  },
  cv: {
    desc: 'download my CV',
    run: () => ({
      output: (
        <Line>
          downloading… <a className={styles.link} href="./CV_Jose_Carlos_Blanco.pdf" target="_blank" rel="noreferrer">CV_Jose_Carlos_Blanco.pdf</a>
        </Line>
      ),
    }),
  },
  ls: {
    desc: 'list files',
    run: () => ({
      output: (
        <>
          {text('about.txt   skills/   projects/   contact   cv.pdf')}
        </>
      ),
    }),
  },
  cat: {
    desc: 'print a file: cat <about|skills|projects|contact|cv>',
    run: (args) => {
      const file = (args[0] || '').replace(/\.(txt|pdf)$/, '');
      if (file === 'about') return { output: <Line>{info.bio}</Line> };
      if (file === 'skills')
        return {
          output: (
            <>
              {text(info.skills.proficientWith.join(', '))}
              {text(info.skills.exposedTo.join(', '))}
            </>
          ),
        };
      if (file === 'projects')
        return { output: <>{info.projects.map((p) => text(`${p.title}`))}</> };
      if (file === 'contact') return { output: text(info.email) };
      if (file === 'cv') return { output: text('it\'s a binary file — run `cv` to download it') };
      return { output: err(`cat: ${args[0] || ''}: no such file or directory`) };
    },
  },
  open: {
    desc: 'open an app: open <about|skills|projects|contact|terminal>',
    run: (args, ctx) => {
      const target = (args[0] || '').toLowerCase();
      if ((APPS as readonly string[]).includes(target)) {
        ctx.openApp(target as AppId);
        return { output: ok(`opened ${target}`) };
      }
      return { output: err(`open: unknown app '${target}' — try about, skills, projects, contact, terminal`) };
    },
  },
  theme: {
    desc: 'toggle theme, or theme <dark|light>',
    run: (args, ctx) => {
      const arg = args[0]?.toLowerCase();
      if (!arg || arg === 'toggle') {
        ctx.onToggleTheme();
        return { output: ok(`theme is now ${ctx.theme === 'dark' ? 'light' : 'dark'}`) };
      }
      if (arg === 'dark' || arg === 'light') {
        if (arg !== ctx.theme) ctx.onToggleTheme();
        return { output: ok(`theme is now ${arg}`) };
      }
      return { output: err('usage: theme [dark|light|toggle]') };
    },
  },
  neofetch: {
    desc: 'system info',
    run: () => ({
      output: (
        <>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <pre className={styles.ok} style={{ fontSize: '0.7rem', lineHeight: 1.15 }}>
              {ASCII_JCB.join('\n')}
            </pre>
            <div>
              {NEOFETCH_ROWS.map(([k, v]) => (
                <Line key={k}>
                  <span className={styles.ok}>{k.padEnd(10)}</span>
                  <span className={styles.muted}>{v}</span>
                </Line>
              ))}
            </div>
          </div>
        </>
      ),
    }),
  },
  echo: {
    desc: 'echo text',
    run: (args) => ({ output: text(args.join(' ') || '') }),
  },
  date: {
    desc: 'current date and time',
    run: () => ({ output: text(new Date().toString()) }),
  },
  clear: {
    desc: 'clear the terminal',
    run: () => ({ output: null, clear: true }),
  },
  history: {
    desc: 'recent commands',
    run: (_args, ctx) => ({
      output: <>{ctx.history.map((c, i) => text(`${(i + 1).toString().padStart(3)}  ${c}`))}</>,
    }),
  },
  exit: {
    desc: 'close the terminal',
    run: (_args, ctx) => {
      ctx.closeApp('terminal');
      return { output: muted('bye 👋') };
    },
  },
  reboot: {
    desc: 'restart the machine',
    run: (_args, ctx) => {
      ctx.onReboot();
      return { output: muted('rebooting…') };
    },
  },
  github: {
    desc: 'open my github',
    run: () => ({
      output: (
        <Line>
          <a className={styles.link} href="https://github.com/josekbm" target="_blank" rel="noreferrer">
            https://github.com/josekbm
          </a>
        </Line>
      ),
    }),
  },
  linkedin: {
    desc: 'open my linkedin',
    run: () => ({
      output: (
        <Line>
          <a
            className={styles.link}
            href="https://linkedin.com/in/jose-carlos-blanco-mira-59ab5980"
            target="_blank"
            rel="noreferrer"
          >
            https://linkedin.com/in/jose-carlos-blanco-mira-59ab5980
          </a>
        </Line>
      ),
    }),
  },
  sudo: {
    desc: 'try your luck',
    run: (args) => {
      if (args.join(' ') === 'hire me') {
        return { output: ok('permission granted — email jcblanco.dev@gmail.com 🙂') };
      }
      return { output: err('josecarlos is not in the sudoers file. This incident will be reported.') };
    },
  },
};

export function runCommand(raw: string, ctx: CommandContext): CommandResult {
  const trimmed = raw.trim();
  if (!trimmed) return { output: null };

  const [name, ...args] = trimmed.split(/\s+/);
  const command = COMMANDS[name.toLowerCase()];

  if (!command) {
    return {
      output: (
        <>
          {err(`command not found: ${name}`)}
          {muted(`try 'help' to see what you can do`)}
        </>
      ),
    };
  }

  return command.run(args, ctx);
}

export const COMMAND_NAMES = Object.keys(COMMANDS);
