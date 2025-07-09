import Stack from '@mui/material/Stack';

import { NavProps } from '../types';

import NavList from './nav-list';

// ----------------------------------------------------------------------

export default function NavDesktop({ data, sx }: NavProps) {
  return (
    <Stack
      component="nav"
      direction="row"
      spacing={2}
      justifyContent="flex-start"
      alignItems="center"
      sx={{
        height: 1,
        ...sx,
      }}
    >
      {data.map((link) => (
        <NavList key={link.title} item={link} />
      ))}
    </Stack>
  );
}
