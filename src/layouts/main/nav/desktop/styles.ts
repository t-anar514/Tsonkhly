import Paper from '@mui/material/Paper';
import { styled, alpha } from '@mui/material/styles';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';

import { NavItemProps } from '../types';

// ----------------------------------------------------------------------

type StyledNavItemProps = Omit<NavItemProps, 'item'>;

export const StyledNavItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'open' && prop !== 'subItem',
})<StyledNavItemProps>(({ active, open, subItem, theme }) => {
  return {
    ...theme.typography.body2,
    fontWeight: theme.typography.fontWeightMedium,
    padding: '8px 16px',
    color: theme.palette.primary.contrastText, // Using theme's primary contrast text (white for dark colors)
    fontSize: '14px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    height: '100%',
    transition: theme.transitions.create(['opacity', 'background-color'], {
      duration: theme.transitions.duration.shorter,
    }),
    '&:hover': {
      opacity: 1,
      backgroundColor: alpha(theme.palette.primary.contrastText, 0.1), // Slightly lighter hover
    },
    // Sub item
    ...(subItem && {
      fontWeight: theme.typography.fontWeightRegular,
      color: theme.palette.text.secondary,
    }),
    // Active
    ...(active && {
      color: theme.palette.primary.contrastText,
      fontWeight: theme.typography.fontWeightBold,
      backgroundColor: alpha(theme.palette.primary.contrastText, 0.15), // Slightly more visible active state
    }),
    // Active sub item
    ...(active &&
      subItem && {
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightSemiBold,
      }),
    // Open
    ...(open && {
      color: theme.palette.primary.contrastText,
    }),
  };
});

// ----------------------------------------------------------------------

export const StyledMenu = styled(Paper)(({ theme }) => ({
  top: 62,
  width: '100%',
  borderRadius: 0,
  position: 'fixed',
  zIndex: theme.zIndex.modal,
  boxShadow: theme.customShadows.dialog,
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export const StyledSubheader = styled(ListSubheader)(({ theme }) => ({
  ...theme.typography.h6,
  padding: 0,
  color: theme.palette.text.primary,
  backgroundColor: 'transparent',
}));
