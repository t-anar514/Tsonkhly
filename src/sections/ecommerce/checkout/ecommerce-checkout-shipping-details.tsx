import Box from '@mui/material/Box';

import { RHFTextField } from 'src/components/hook-form';

export default function EcommerceCheckoutShippingDetails() {
  return (
    <Box
      rowGap={2.5}
      columnGap={2}
      display="grid"
      gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
    >
      <RHFTextField name="streetAddress" label="Гудамжны хаяг" />

      <RHFTextField name="zipCode" label="Шуудангийн код" />

      <RHFTextField name="city" label="Хот" />
    </Box>
  );
}
