import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack, { StackProps } from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';

import Image from 'src/components/image';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { fPercent, fCurrency } from 'src/utils/format-number';
import { ICartProductItemProps } from 'src/types/extended-product';
import { useCart } from 'src/contexts/cart-context';

// ----------------------------------------------------------------------

type Props = {
  tax: number;
  total: number;
  subtotal: number;
  shipping: number;
  discount: number;
  products?: ICartProductItemProps[];
};

export default function EcommerceCartSummary({ tax, total, subtotal, shipping, discount, products }: Props) {
  const { cartItems } = useCart();
  const itemsToDisplay = products || cartItems;
  return (
    <Stack
      spacing={3}
      sx={{
        p: 5,
        borderRadius: 2,
        border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
      }}
    >
      <Typography variant="h6"> Нийлбэр </Typography>
      
      {/* Product Summary with Images */}
      {itemsToDisplay.length > 0 && (
        <Stack spacing={2} sx={{ mb: 2 }}>
          <Typography variant="subtitle2">Бараа бүтээгдэхүүн:</Typography>
          
          {itemsToDisplay.map((product) => (
            <Stack key={product.id} direction="row" spacing={2} alignItems="center">
              {product.customData && product.customData.windowType ? (
                // Custom wrapper for window images to ensure full display
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    flexShrink: 0,
                    bgcolor: 'background.neutral',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'visible', // Allow image to overflow container
                    position: 'relative', // For proper positioning
                    boxSizing: 'border-box',
                    '& img': {
                      width: 'auto', // Let the image size naturally
                      height: 'auto',
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                    }
                  }}
                >
                  <img 
                    src={product.coverUrl} 
                    alt={product.name}
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '100%',
                      display: 'block', // Removes extra space below image
                    }}
                  />
                </Box>
              ) : (
                <Image
                  src={product.coverUrl}
                  sx={{ width: 48, height: 48, borderRadius: 1, flexShrink: 0 }}
                />
              )}
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography variant="body2" noWrap>
                  {product.name}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {fCurrency(product.price)} x {product.quantity || 1}
                </Typography>
              </Box>
            </Stack>
          ))}
          
          <Divider sx={{ borderStyle: 'dashed' }} />
        </Stack>
      )}
      
      <Stack spacing={2}>
        <Row label="Дэд нийлбэр" value={fCurrency(subtotal)} />

        <Row label="Хүргэлт" value={fCurrency(shipping)} />

        <Row label="Хөнгөлөлт (15%)" value={`-${fCurrency(discount)}`} />

        <Row label="Татвар" value={fPercent(tax)} />
      </Stack>

      <TextField
        hiddenLabel
        placeholder="Хөнгөлөлтийн код"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button>Хэрэглэх</Button>
            </InputAdornment>
          ),
        }}
      />

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Row
        label="Нийт дүн"
        value={fCurrency(total)}
        sx={{
          typography: 'h6',
          '& span': { typography: 'h6' },
        }}
      />

      <Button
        component={RouterLink}
        href={paths.eCommerce.checkout}
        size="large"
        variant="contained"
        color="inherit"
      >
        Төлбөр хийх
      </Button>
    </Stack>
  );
}

// ----------------------------------------------------------------------

type RowProps = StackProps & {
  label: string;
  value: string;
};

function Row({ label, value, sx, ...other }: RowProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ typography: 'subtitle2', ...sx }}
      {...other}
    >
      <Box component="span" sx={{ typography: 'body2' }}>
        {label}
      </Box>
      {value}
    </Stack>
  );
}
