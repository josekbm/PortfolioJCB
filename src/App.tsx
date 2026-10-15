import { useState } from 'react';
import { OSProvider } from './os/OSProvider';
import BootSequence from './os/BootSequence';
import MenuBar from './os/MenuBar';
import Desktop from './os/Desktop';
import Dock from './os/Dock';
import { useTheme } from './hooks/useTheme';

const BOOT_KEY = 'jcb_booted';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [booting, setBooting] = useState(
    () => sessionStorage.getItem(BOOT_KEY) !== '1',
  );

  const handleBootDone = () => {
    sessionStorage.setItem(BOOT_KEY, '1');
    setBooting(false);
  };

  const reboot = () => setBooting(true);

  return (
    <OSProvider>
      {booting ? (
        <BootSequence onDone={handleBootDone} />
      ) : (
        <>
          <MenuBar theme={theme} onToggleTheme={toggleTheme} onReboot={reboot} />
          <Desktop theme={theme} onToggleTheme={toggleTheme} onReboot={reboot} />
          <Dock />
        </>
      )}
    </OSProvider>
  );
}
