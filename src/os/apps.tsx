import type { ComponentType } from 'react';
import {
  TerminalIcon,
  UserIcon,
  WrenchIcon,
  GridIcon,
  MailIcon,
} from '../components/Icons';

export type AppId = 'terminal' | 'about' | 'skills' | 'projects' | 'contact';

export interface AppDef {
  id: AppId;
  name: string;
  title: string;
  Icon: ComponentType<{ className?: string }>;
}

export const APPS: AppDef[] = [
  { id: 'about', name: 'About', title: 'about.txt', Icon: UserIcon },
  { id: 'skills', name: 'Skills', title: 'skills', Icon: WrenchIcon },
  { id: 'projects', name: 'Projects', title: '~/projects', Icon: GridIcon },
  { id: 'contact', name: 'Contact', title: 'contact', Icon: MailIcon },
  { id: 'terminal', name: 'Terminal', title: 'jose@jcb: ~', Icon: TerminalIcon },
];
