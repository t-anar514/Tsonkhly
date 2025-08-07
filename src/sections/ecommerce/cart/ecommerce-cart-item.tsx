import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { fCurrency } from 'src/utils/format-number';
import { IProductItemProps } from 'src/types/product';
import { ICartProductItemProps } from 'src/types/extended-product';
import { useCart } from 'src/contexts/cart-context';

// ----------------------------------------------------------------------

type Props = {
  product: ICartProductItemProps;
  wishlist: boolean;
};

export default function EcommerceCartItem({ product, wishlist }: Props) {
  const { removeFromCart, updateCartItemQuantity } = useCart();
  const isCustomWindow = product.customData && product.customData.windowType;

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newQuantity = Number(event.target.value);
    if (newQuantity > 0) {
      updateCartItemQuantity(product.id, newQuantity);
    }
  };

  const handleRemoveItem = () => {
    removeFromCart(product.id);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        py: 3,
        minWidth: 720,
        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
      }}
    >
      <Stack direction="row" alignItems="center" flexGrow={1}>
        {isCustomWindow ? (
          // Custom wrapper for window images to ensure full display
          <Box
            sx={{
              width: 80,
              height: 80,
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
              width: 80,
              height: 80,
              flexShrink: 0,
              borderRadius: 1.5,
              bgcolor: 'background.neutral',
            }}
          />
        )}

        <Stack spacing={0.5} sx={{ p: 2 }}>
          <Typography variant="subtitle2">{product.name}</Typography>
          
          {isCustomWindow && (
            <Stack spacing={0.5}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                <strong>Хэмжээ:</strong> {product.customData?.windowCustomization?.dimensions?.width} × {product.customData?.windowCustomization?.dimensions?.height} {product.customData?.windowCustomization?.dimensions?.unit}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                <strong>Материал:</strong> {product.customData?.windowCustomization?.material}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                <strong>Өнгө:</strong> {product.customData?.windowCustomization?.color}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                <strong>Шилний төрөл:</strong> {product.customData?.windowCustomization?.glassType}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                <strong>Тоо ширхэг:</strong> {product.customData?.windowCustomization?.quantity || product.quantity || 1}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                <strong>Цонхны төрөл:</strong> {product.customData?.windowType}
              </Typography>
              {product.customData?.windowCustomization?.openingType && (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
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
              {/* Display additional features if present */}
              {product.customData?.windowCustomization?.additionalFeatures && (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  <strong>Нэмэлт онцлогууд:</strong> {' '}
                  {product.customData?.windowCustomization?.additionalFeatures?.energyEfficient && 'Эрчим хүч хэмнэлттэй, '}
                  {product.customData?.windowCustomization?.additionalFeatures?.soundProofing && 'Дуу чимээ тусгаарлагч, '}
                  {product.customData?.windowCustomization?.additionalFeatures?.screens && 'Сараачин хаалттай, '}
                  {product.customData?.windowCustomization?.additionalFeatures?.grids && 'Торлогтой, '}
                  {product.customData?.windowCustomization?.additionalFeatures?.topLight && 'Дээд гэрэлтэй, '}
                  {product.customData?.windowCustomization?.additionalFeatures?.bottomLight && 'Доод гэрэлтэй'}
                </Typography>
              )}
              {/* Display delivery information if present */}
              {product.customData?.windowCustomization?.deliveryOption && (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  <strong>Хүргэлт:</strong> {product.customData?.windowCustomization?.deliveryOption}
                </Typography>
              )}
              {/* Display installation service if selected */}
              {product.customData?.windowCustomization?.installationService && (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  <strong>Суурилуулах үйлчилгээ:</strong> Тийм
                </Typography>
              )}
            </Stack>
          )}
        </Stack>
      </Stack>

      <Stack sx={{ width: 120 }}>
        <TextField
          select
          size="small"
          variant="outlined"
          value={product.quantity || 1}
          onChange={handleQuantityChange}
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

      <Stack sx={{ width: 120, typography: 'subtitle2' }}> {fCurrency(product.price)} </Stack>

      <Tooltip title="Устгах">
        <IconButton onClick={handleRemoveItem}>
          <Iconify icon="carbon:trash-can" />
        </IconButton>
      </Tooltip>

      {wishlist && (
        <IconButton>
          <Iconify icon="carbon:shopping-cart-plus" />
        </IconButton>
      )}
    </Stack>
  );
}
