import MainLayout from 'src/layouts/main';
import WindowCustomizer from 'src/sections/windows/customizer/window-customizer';
import WindowCustomizer2Tsonh from 'src/sections/windows/customizer/2tsonh';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Custom Window Designer',
};

type PageProps = {
  params: {
    windowType: string;
  };
};

export default function WindowCustomizerPage({ params }: PageProps) {
  const { windowType } = params;
  
  // Render the specific window type component based on the URL parameter
  const renderWindowCustomizer = () => {
    // Only 2tsonh has a dedicated component, others use the generic WindowCustomizer
    if (windowType === '2tsonh') {
      return <WindowCustomizer2Tsonh />;
    } else {
      return <WindowCustomizer windowType={windowType} />;
    }
  };

  return (
    <MainLayout>
      {renderWindowCustomizer()}
    </MainLayout>
  );
}
