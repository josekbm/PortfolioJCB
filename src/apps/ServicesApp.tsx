import ServicesContent from '../components/ServicesContent';
import { useOS } from '../os/OSProvider';

export default function ServicesApp() {
  const { openApp } = useOS();

  return (
    <ServicesContent mode="window" onSeeWork={() => openApp('projects')} />
  );
}
