import type { ComponentType } from 'react';
import type { UI } from '../i18n/ui';
import {
  TerminalIcon,
  UserIcon,
  WrenchIcon,
  GridIcon,
  MailIcon,
  BriefcaseIcon,
} from '../components/Icons';

export type AppId =
  | 'terminal'
  | 'about'
  | 'skills'
  | 'services'
  | 'projects'
  | 'contact';

export interface AppDef {
  id: AppId;
  nameKey: keyof UI['apps'];
  titleKey: keyof UI['windowTitles'];
  Icon: ComponentType<{ className?: string }>;
}

export const APPS: AppDef[] = [
  { id: 'about', nameKey: 'about', titleKey: 'about', Icon: UserIcon },
  { id: 'skills', nameKey: 'skills', titleKey: 'skills', Icon: WrenchIcon },
  {
    id: 'services',
    nameKey: 'services',
    titleKey: 'services',
    Icon: BriefcaseIcon,
  },
  { id: 'projects', nameKey: 'projects', titleKey: 'projects', Icon: GridIcon },
  { id: 'contact', nameKey: 'contact', titleKey: 'contact', Icon: MailIcon },
  {
    id: 'terminal',
    nameKey: 'terminal',
    titleKey: 'terminal',
    Icon: TerminalIcon,
  },
];
