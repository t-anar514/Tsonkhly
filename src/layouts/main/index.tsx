'use client';

import Box from '@mui/material/Box';

import { usePathname } from 'src/routes/hooks';
import { CurrencyProvider } from 'src/contexts/currency-context';

import { HEADER } from '../config-layout';

import Header from './header';
import Footer from './footer';

// ----------------------------------------------------------------------

const pathsOnDark = [] as string[];

const spacingLayout = ['/'] as string[];

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const pathname = usePathname();

  const actionPage = (arr: string[]) => arr.some((path) => pathname === path);

  return (
    <CurrencyProvider>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
        <Header headerOnDark={actionPage(pathsOnDark)} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
          }}
        >
          {!actionPage(spacingLayout) && <Spacing />}

          {children}
        </Box>

        <Footer />
      </Box>
    </CurrencyProvider>
  );
}

// ----------------------------------------------------------------------

function Spacing() {
  return (
    <Box
      sx={{
        height: { xs: HEADER.H_MOBILE, md: HEADER.H_DESKTOP },
      }}
    />
  );
}
