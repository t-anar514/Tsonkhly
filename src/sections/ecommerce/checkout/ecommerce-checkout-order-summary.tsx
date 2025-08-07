import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack, { StackProps } from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { IProductItemProps } from 'src/types/product';
import { ICartProductItemProps } from 'src/types/extended-product';
import TextMaxLine from 'src/components/text-max-line';
import { fPercent, fCurrency } from 'src/utils/format-number';

// ----------------------------------------------------------------------

type Props = {
  tax: number;
  total: number;
  subtotal: number;
  shipping: number;
  discount: number;
  products?: IProductItemProps[];
  loading?: boolean;
};

export default function EcommerceCheckoutOrderSummary({
  tax,
  total,
  subtotal,
  shipping,
  discount,
  products,
  loading,
}: Props) {
  return (
    <Stack
      spacing={3}
      sx={{
        p: 5,
        borderRadius: 2,
        border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
      }}
    >
      <Typography variant="h6"> Order Summary </Typography>

      {!!products?.length && (
        <>
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}

          <Divider sx={{ borderStyle: 'dashed' }} />
        </>
      )}

      <Stack spacing={2}>
        <Row label="Subtotal" value={fCurrency(subtotal)} />

        <Row label="Shipping" value={fCurrency(shipping)} />

        <Row label="Discount (15%)" value={`-${fCurrency(discount)}`} />

        <Row label="Tax" value={fPercent(tax)} />
      </Stack>

      <TextField
        hiddenLabel
        placeholder="Discount Code"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button>Apply</Button>
            </InputAdornment>
          ),
        }}
      />

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Row
        label="Total"
        value={fCurrency(total)}
        sx={{
          typography: 'h6',
          '& span': { typography: 'h6' },
        }}
      />

      <LoadingButton
        size="large"
        variant="contained"
        color="inherit"
        type="submit"
        loading={loading}
      >
        Order Now
      </LoadingButton>
    </Stack>
  );
}

// ----------------------------------------------------------------------

type ProductItemProps = StackProps & {
  product: ICartProductItemProps;
};

function ProductItem({ product, ...other }: ProductItemProps) {
  const isCustomWindow = product.customData && product.customData.windowType;
  
  return (
    <Stack direction="row" alignItems="flex-start" {...other}>
      {isCustomWindow ? (
        // Custom wrapper for window images to ensure full display
        <Box
          sx={{
            mr: 2,
            width: 64,
            height: 64,
            flexShrink: 0,
            bgcolor: 'background.neutral',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'visible', // Allow image to overflow container
            position: 'relative', // For proper positioning
            padding: 0.5, // Small padding to prevent edge touching
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
          sx={{
            mr: 2,
            width: 64,
            height: 64,
            flexShrink: 0,
            borderRadius: 1.5,
            bgcolor: 'background.neutral',
          }}
        />
      )}

      <Stack flexGrow={1}>
        <TextMaxLine variant="body2" line={1} sx={{ fontWeight: 'fontWeightMedium' }}>
          {product.name}
        </TextMaxLine>

        <Typography variant="subtitle2" sx={{ mt: 0.5, mb: 0.5 }}>
          {fCurrency(product.price)}
        </Typography>
        
        {/* Show detailed specifications for custom windows */}
        {isCustomWindow && (
          <Stack spacing={0.5} sx={{ mb: 1.5 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              <strong>Хэмжээ:</strong> {product.customData?.windowCustomization?.dimensions?.width} × {product.customData?.windowCustomization?.dimensions?.height} {product.customData?.windowCustomization?.dimensions?.unit}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              <strong>Материал:</strong> {product.customData?.windowCustomization?.material}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              <strong>Өнгө:</strong> {product.customData?.windowCustomization?.color}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              <strong>Шилний төрөл:</strong> {product.customData?.windowCustomization?.glassType}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              <strong>Цонхны төрөл:</strong> {product.customData?.windowType}
            </Typography>
            {product.customData?.windowCustomization?.openingType && (
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                <strong>Нээлтийн төрөл:</strong> {
                  (() => {
                    // Create a mapping of opening types to their display names
                    const openingTypeMap: Record<string, string> = {
                      'FIXED': 'Суурин',
                      'RIGHT_OPENING': 'Баруун талд нээгддэг',
                      'LEFT_OPENING': 'Зүүн талд нээгддэг',
                      'BOTH_OPENING': 'Хоёр талд нээгддэг',
                      'TILT_TURN_LEFT': 'Зүүн хэлбэлзэх эргэлт',
                      'TILT_TURN_BOTH': 'Хоёр талын хэлбэлзэх эргэлт',
                    };
                    
                    const openingType = product.customData?.windowCustomization?.openingType;
                    return openingType ? (openingTypeMap[openingType] || openingType) : '';
                  })()
                }
              </Typography>
            )}
          </Stack>
        )}

        <TextField
          select
          size="small"
          variant="outlined"
          value={product.quantity || 1}
          SelectProps={{
            native: true,
          }}
          sx={{ width: 80 }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>
      </Stack>

      <IconButton>
        <Iconify icon="carbon:trash-can" />
      </IconButton>
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
