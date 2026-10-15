import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { AppId } from './apps';

interface WindowState {
  open: boolean;
  minimized: boolean;
  focused: boolean;
  z: number;
}

type Windows = Record<AppId, WindowState>;

interface OSContextValue {
  windows: Windows;
  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  toggleApp: (id: AppId) => void;
  minimizeApp: (id: AppId) => void;
  focusApp: (id: AppId) => void;
}

const initialState: Windows = {
  terminal: { open: true, minimized: false, focused: true, z: 2 },
  about: { open: true, minimized: false, focused: false, z: 1 },
  skills: { open: false, minimized: false, focused: false, z: 0 },
  projects: { open: false, minimized: false, focused: false, z: 0 },
  contact: { open: false, minimized: false, focused: false, z: 0 },
};

const OSContext = createContext<OSContextValue | null>(null);

export function OSProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<Windows>(initialState);
  const zRef = useRef(100);

  const focusApp = useCallback((id: AppId) => {
    setWindows((prev) => {
      const z = zRef.current++;
      const next = { ...prev };
      (Object.keys(next) as AppId[]).forEach((key) => {
        next[key] = { ...next[key], focused: key === id };
      });
      next[id] = { ...next[id], z };
      return next;
    });
  }, []);

  const openApp = useCallback(
    (id: AppId) => {
      setWindows((prev) => {
        const z = zRef.current++;
        const next = { ...prev };
        (Object.keys(next) as AppId[]).forEach((key) => {
          next[key] = { ...next[key], focused: key === id };
        });
        next[id] = { ...next[id], open: true, minimized: false, focused: true, z };
        return next;
      });
    },
    [],
  );

  const closeApp = useCallback((id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], open: false, minimized: false, focused: false },
    }));
  }, []);

  const toggleApp = useCallback(
    (id: AppId) => {
      setWindows((prev) => {
        const isOpen = prev[id].open;
        const willOpen = !isOpen || prev[id].minimized;
        if (willOpen) {
          const z = zRef.current++;
          const next = { ...prev };
          (Object.keys(next) as AppId[]).forEach((key) => {
            next[key] = { ...next[key], focused: key === id };
          });
          next[id] = { ...next[id], open: true, minimized: false, focused: true, z };
          return next;
        }
        if (prev[id].focused) {
          return { ...prev, [id]: { ...prev[id], minimized: true, focused: false } };
        }
        const z = zRef.current++;
        const next = { ...prev };
        (Object.keys(next) as AppId[]).forEach((key) => {
          next[key] = { ...next[key], focused: key === id };
        });
        next[id] = { ...next[id], focused: true, z };
        return next;
      });
    },
    [],
  );

  const minimizeApp = useCallback((id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], minimized: true, focused: false },
    }));
  }, []);

  const value = useMemo(
    () => ({ windows, openApp, closeApp, toggleApp, minimizeApp, focusApp }),
    [windows, openApp, closeApp, toggleApp, minimizeApp, focusApp],
  );

  return <OSContext.Provider value={value}>{children}</OSContext.Provider>;
}

export function useOS() {
  const ctx = useContext(OSContext);
  if (!ctx) throw new Error('useOS must be used within OSProvider');
  return ctx;
}
