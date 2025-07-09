import MainLayout from 'src/layouts/main';

// ----------------------------------------------------------------------

export default function Layout({ children }: React.PropsWithChildren) {
  return <MainLayout>{children}</MainLayout>;
}
