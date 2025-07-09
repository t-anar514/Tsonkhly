import MainLayout from 'src/layouts/main';
import InstallerFinder from 'src/sections/windows/installer/installer-finder';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Find Window Installers',
};

export default function InstallerFinderPage() {
  return (
    <MainLayout>
      <InstallerFinder />
    </MainLayout>
  );
}
