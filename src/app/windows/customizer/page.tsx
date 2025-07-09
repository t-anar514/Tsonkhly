import MainLayout from 'src/layouts/main';
import WindowCustomizer from 'src/sections/windows/customizer/window-customizer';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Custom Window Designer',
};

export default function WindowCustomizerPage() {
  return (
    <MainLayout>
      <WindowCustomizer />
    </MainLayout>
  );
}
