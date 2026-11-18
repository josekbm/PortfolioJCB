import type { ReactNode } from 'react';
import styles from './Terminal.module.css';
import type { Info } from '../data/info';
import type { UI } from '../i18n/ui';
import type { Lang } from '../i18n/types';
import { CV_URL } from '../data/links';
import { ASCII_JCB } from './neofetch';
import type { Theme } from '../hooks/useTheme';
import type { AppId } from '../os/apps';

export interface CommandContext {
  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  onToggleTheme: () => void;
  theme: Theme;
  onReboot: () => void;
  history: string[];
  info: Info;
  ui: UI;
  lang: Lang;
  locale: string;
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

const APPS = ['about', 'skills', 'services', 'projects', 'contact', 'terminal'] as const;

const COMMANDS: Record<string, { run: Handler }> = {
  help: {
    run: (_args, ctx) => ({
      output: (
        <>
          {text(ctx.ui.terminal.helpTitle)}
          {Object.keys(COMMANDS).map((name) => (
            <Line key={name}>
              <span className={styles.ok}>{name.padEnd(12)}</span>
              <span className={styles.muted}>
                {ctx.ui.terminal.descriptions[name] ?? name}
              </span>
            </Line>
          ))}
        </>
      ),
    }),
  },
  whoami: {
    run: (_args, ctx) => ({
      output: (
        <>
          {text('josecarlos')}
          {text(ctx.info.role)}
        </>
      ),
    }),
  },
  about: {
    run: (_args, ctx) => ({ output: <Line>{ctx.info.bio}</Line> }),
  },
  bio: {
    run: (_args, ctx) => COMMANDS.about.run([], ctx),
  },
  skills: {
    run: (_args, ctx) => ({
      output: (
        <>
          {ok(ctx.ui.terminal.proficient)}
          {text(ctx.info.skills.proficientWith.join(' · '))}
          {ok(ctx.ui.terminal.exposed)}
          {text(ctx.info.skills.exposedTo.join(' · '))}
        </>
      ),
    }),
  },
  services: {
    run: (_args, ctx) => ({
      output: (
        <>
          {ok(ctx.info.services.availability.toLowerCase())}
          {text(ctx.info.services.intro)}
          {ok(`${ctx.ui.services.servicesTitle.replace('$ ', '')}:`)}
          {ctx.info.services.services.map((service) => (
            <Line key={service.title}>
              <span className={styles.ok}>·</span> {service.title}{' '}
              <span className={styles.muted}>— {service.tagline}</span>
            </Line>
          ))}
          {muted(ctx.ui.terminal.openServicesHint)}
        </>
      ),
    }),
  },
  hire: {
    run: (_args, ctx) => {
      ctx.openApp('services');
      return { output: ok(ctx.ui.terminal.servicesOpened) };
    },
  },
  projects: {
    run: (_args, ctx) => ({
      output: (
        <>
          {ctx.info.projects.map((project, index) => (
            <Line key={project.title}>
              <span className={styles.ok}>
                {(index + 1).toString().padStart(2, '0')}.
              </span>{' '}
              {project.title}{' '}
              <span className={styles.muted}>— {project.tech.join(', ')}</span>
            </Line>
          ))}
          {muted(ctx.ui.terminal.openProjectsHint)}
        </>
      ),
    }),
  },
  contact: {
    run: (_args, ctx) => ({
      output: (
        <>
          {text(ctx.info.email)}
          {ctx.info.socials
            .filter((social) => social.icon === 'github' || social.icon === 'linkedin')
            .map((social) => (
              <Line key={social.label}>
                <span className={styles.muted}>{social.label.toLowerCase()}</span>{' '}
                {social.link}
              </Line>
            ))}
          {muted(ctx.ui.terminal.openContactHint)}
        </>
      ),
    }),
  },
  socials: {
    run: (_args, ctx) => COMMANDS.contact.run([], ctx),
  },
  cv: {
    run: (_args, ctx) => ({
      output: (
        <Line>
          {ctx.ui.terminal.downloading}{' '}
          <a className={styles.link} href={CV_URL} target="_blank" rel="noreferrer">
            CV_Jose_Carlos_Blanco.pdf
          </a>
        </Line>
      ),
    }),
  },
  ls: {
    run: () => ({
      output: text('about.txt   skills/   services/   projects/   contact   cv.pdf'),
    }),
  },
  cat: {
    run: (args, ctx) => {
      const file = (args[0] || '').replace(/\.(txt|pdf)$/, '');
      if (file === 'about') return { output: <Line>{ctx.info.bio}</Line> };
      if (file === 'skills')
        return {
          output: (
            <>
              {text(ctx.info.skills.proficientWith.join(', '))}
              {text(ctx.info.skills.exposedTo.join(', '))}
            </>
          ),
        };
      if (file === 'services')
        return {
          output: (
            <>
              {text(ctx.info.services.intro)}
              {ctx.info.services.services.map((service) =>
                text(`${service.title}: ${service.tagline}`),
              )}
            </>
          ),
        };
      if (file === 'projects')
        return {
          output: <>{ctx.info.projects.map((project) => text(project.title))}</>,
        };
      if (file === 'contact') return { output: text(ctx.info.email) };
      if (file === 'cv')
        return { output: text(ctx.ui.terminal.binaryFile) };
      return { output: err(ctx.ui.terminal.noFile(args[0] || '')) };
    },
  },
  open: {
    run: (args, ctx) => {
      const target = (args[0] || '').toLowerCase();
      if ((APPS as readonly string[]).includes(target)) {
        ctx.openApp(target as AppId);
        const label =
          ctx.ui.apps[target as keyof typeof ctx.ui.apps] ?? target;
        return { output: ok(ctx.ui.terminal.opened(label)) };
      }
      return {
        output: err(ctx.ui.terminal.unknownApp(target, APPS.join(', '))),
      };
    },
  },
  theme: {
    run: (args, ctx) => {
      const arg = args[0]?.toLowerCase();
      if (!arg || arg === 'toggle') {
        ctx.onToggleTheme();
        return {
          output: ok(
            ctx.ui.terminal.themeNow(ctx.theme === 'dark' ? 'light' : 'dark'),
          ),
        };
      }
      if (arg === 'dark' || arg === 'light') {
        if (arg !== ctx.theme) ctx.onToggleTheme();
        return { output: ok(ctx.ui.terminal.themeNow(arg)) };
      }
      return { output: err(ctx.ui.terminal.themeUsage) };
    },
  },
  neofetch: {
    run: (_args, ctx) => ({
      output: (
        <>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <pre className={styles.ok} style={{ fontSize: '0.7rem', lineHeight: 1.15 }}>
              {ASCII_JCB.join('\n')}
            </pre>
            <div>
              {ctx.ui.neofetch.rows.map(([key, value]) => (
                <Line key={key}>
                  <span className={styles.ok}>{key.padEnd(10)}</span>
                  <span className={styles.muted}>{value}</span>
                </Line>
              ))}
            </div>
          </div>
        </>
      ),
    }),
  },
  echo: {
    run: (args) => ({ output: text(args.join(' ') || '') }),
  },
  date: {
    run: (_args, ctx) => ({ output: text(new Date().toLocaleString(ctx.locale)) }),
  },
  clear: {
    run: () => ({ output: null, clear: true }),
  },
  history: {
    run: (_args, ctx) => ({
      output: (
        <>
          {ctx.history.map((command, index) =>
            text(`${(index + 1).toString().padStart(3)}  ${command}`),
          )}
        </>
      ),
    }),
  },
  exit: {
    run: (_args, ctx) => {
      ctx.closeApp('terminal');
      return { output: muted(ctx.ui.terminal.bye) };
    },
  },
  reboot: {
    run: (_args, ctx) => {
      ctx.onReboot();
      return { output: muted(ctx.ui.terminal.rebooting) };
    },
  },
  github: {
    run: (_args, ctx) => {
      const link =
        ctx.info.socials.find((social) => social.icon === 'github')?.link ??
        'https://github.com/josekbm';
      return {
        output: (
          <Line>
            <a className={styles.link} href={link} target="_blank" rel="noreferrer">
              {link}
            </a>
          </Line>
        ),
      };
    },
  },
  linkedin: {
    run: (_args, ctx) => {
      const link =
        ctx.info.socials.find((social) => social.icon === 'linkedin')?.link ??
        'https://www.linkedin.com/in/jose-carlos-blanco-mira-59ab5980';
      return {
        output: (
          <Line>
            <a className={styles.link} href={link} target="_blank" rel="noreferrer">
              {link}
            </a>
          </Line>
        ),
      };
    },
  },
  sudo: {
    run: (args, ctx) => {
      if (args.join(' ') === 'hire me') {
        ctx.openApp('services');
        return { output: ok(ctx.ui.terminal.permissionGranted) };
      }
      return { output: err(ctx.ui.terminal.sudoDenied) };
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
          {err(ctx.ui.terminal.commandNotFound(name))}
          {muted(ctx.ui.terminal.tryHelp)}
        </>
      ),
    };
  }

  return command.run(args, ctx);
}

export const COMMAND_NAMES = Object.keys(COMMANDS);
