'use client';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import { useCart } from 'src/contexts/cart-context';

import EcommerceCartList from '../cart/ecommerce-cart-list';
import EcommerceCartSummary from '../cart/ecommerce-cart-summary';

// ----------------------------------------------------------------------

export default function EcommerceCartView() {
  const { cartItems } = useCart();
  
  // Calculate cart summary values
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const shipping = subtotal > 0 ? 5000 : 0; // Standard shipping fee
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;
  
  return (
    <Container
      sx={{
        overflow: 'hidden',
        pt: 5,
        pb: { xs: 5, md: 10 },
      }}
    >
      <Typography variant="h3" sx={{ mb: 5 }}>
        Худалдан авах сагс
      </Typography>

      <Grid container spacing={{ xs: 5, md: 8 }}>
        <Grid xs={12} md={8}>
          {cartItems.length > 0 ? (
            <EcommerceCartList products={cartItems} />
          ) : (
            <Typography variant="subtitle1" sx={{ textAlign: 'center', py: 3 }}>
              Таны сагс хоосон байна
            </Typography>
          )}
        </Grid>

        <Grid xs={12} md={4}>
          <EcommerceCartSummary
            tax={tax}
            total={total}
            subtotal={subtotal}
            shipping={shipping}
            discount={0}
          />
        </Grid>
      </Grid>

      <Button
        component={RouterLink}
        href={paths.windows.customizer}
        color="inherit"
        startIcon={<Iconify icon="carbon:chevron-left" />}
        sx={{ mt: 3 }}
      >
        Худалдан авалтаа үргэлжлүүлэх
      </Button>
    </Container>
  );
}
