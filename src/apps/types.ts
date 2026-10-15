import type { Theme } from '../hooks/useTheme';

export interface AppProps {
  theme: Theme;
  onToggleTheme: () => void;
  onReboot: () => void;
}
