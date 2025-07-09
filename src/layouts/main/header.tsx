import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';

import Logo from 'src/components/logo';
import { bgBlur } from 'src/theme/css';
import Label from 'src/components/label';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';
import { RouterLink } from 'src/routes/components';

import { HEADER } from '../config-layout';
import Searchbar from '../common/searchbar';
import HeaderShadow from '../common/header-shadow';
import SettingsButton from '../common/settings-button';

import NavMobile from './nav/mobile';
import NavDesktop from './nav/desktop';
import { navConfig } from './config-navigation';

// ----------------------------------------------------------------------

type Props = {
  headerOnDark: boolean;
};

export default function Header({ headerOnDark }: Props) {
  const theme = useTheme();

  const offset = useOffSetTop();

  const mdUp = useResponsive('up', 'md');

  return (
    <AppBar>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP - 20,
          },
          backgroundColor: theme.palette.primary.main, // Using the theme's primary color
          color: theme.palette.primary.contrastText,
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(offset && {
            ...bgBlur({ color: theme.palette.primary.main }),
            height: {
              md: HEADER.H_DESKTOP - 36,
            },
          }),
        }}
      >
        <Container
          sx={{ height: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ lineHeight: 0, position: 'relative', mr: 3 }}>
              <Logo />
            </Box>

            {/* Show navigation in the same row as logo */}
            {mdUp && <NavDesktop data={navConfig} sx={{ flexGrow: 1 }} />}
          </Box>

          {/* Auth and Cart actions */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Button
              component={RouterLink}
              href="/auth/login-illustration"
              variant="text"
              color="inherit"
              startIcon={<Iconify icon="carbon:user" />}
              sx={{ color: theme.palette.primary.contrastText }}
            >
              Нэвтрэх
            </Button>
            
            <Button
              component={RouterLink}
              href="/auth/register-illustration"
              variant="outlined"
              color="inherit"
              sx={{ 
                borderColor: theme.palette.primary.contrastText,
                color: theme.palette.primary.contrastText,
                '&:hover': {
                  borderColor: theme.palette.primary.contrastText,
                  bgcolor: 'rgba(255, 255, 255, 0.08)',
                },
              }}
            >
              Бүртгүүлэх
            </Button>
            
            <IconButton 
              component={RouterLink}
              href="/e-commerce/cart"
              sx={{ color: theme.palette.primary.contrastText }}
            >
              <Badge badgeContent={0} color="error">
                <Iconify icon="carbon:shopping-cart" width={24} />
              </Badge>
            </IconButton>
            
            {/* Settings button */}
            <SettingsButton />
          </Stack>

          {/* Only show mobile nav on small screens */}
          {!mdUp && <NavMobile data={navConfig} />}
        </Container>
      </Toolbar>

      {offset && <HeaderShadow />}
    </AppBar>
  );
}
