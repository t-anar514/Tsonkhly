import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Button,
  Divider,
  Stack,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
} from '@mui/material';
import { WindowShape, WindowCustomization, GlassType } from '../../types/window-types';
import WindowVisualization from '../components/WindowVisualization';
import { usePricing } from 'src/hooks/use-pricing';
import { useCurrency } from 'src/contexts/currency-context';

type Step3Props = {
  windowCustomization: WindowCustomization;
  windowType?: string;
  estimatedPrice?: number;
  onAddAnotherWindow?: () => void;
  onAddToCart?: () => void;
  onChangeVentHeight?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onChangeVentWidth?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onChangeSkylightHeight?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  // Added from Step4
  onSubmitOrder?: () => void;
};

export default function Step3({
  windowCustomization,
  windowType = '',
  estimatedPrice: providedEstimatedPrice,
  onAddAnotherWindow,
  onAddToCart,
  onChangeVentHeight,
  onChangeVentWidth,
  onChangeSkylightHeight,
  onSubmitOrder,
}: Step3Props) {
  const { pricingData, loading: pricingLoading, error: pricingError } = usePricing();
  const { formatPrice } = useCurrency();

  // Calculate area in square meters
  const windowArea = windowCustomization.dimensions.width * windowCustomization.dimensions.height;
  const areaInM2 = windowArea / 10000;

  // Calculate price based on API data or fallback
  const calculatePriceBreakdown = () => {
    if (!pricingData) {
      // Fallback calculation
      const basePrice = 250;
      const areaMultiplier = 0.5;
      const calculatedPrice = basePrice + windowArea * areaMultiplier;
      
      return {
        basePrice: basePrice,
        areaPrice: windowArea * areaMultiplier,
        totalPrice: calculatedPrice,
        colorPrice: 0,
        glassPrice: 0,
      };
    }

    // Use API pricing data
    let basePricePerM2 = parseFloat(pricingData.base_price_per_m2);
    
    // If area is less than 1 m2, use the less_than_one price
    if (areaInM2 < 1) {
      basePricePerM2 = parseFloat(pricingData.less_than_one);
    }

    const basePrice = basePricePerM2 * areaInM2;
    let colorPrice = 0;
    let glassPrice = 0;

    // Add color option price if not white (checking against common white color codes)
    const whiteColors = ['#FFFFFF', '#F4F4F4', '#F6F6F6']; // Including the default color from API
    if (!whiteColors.includes(windowCustomization.color)) {
      colorPrice = parseFloat(pricingData.option_color_price_m2) * areaInM2;
    }

    // Add glass option prices
    if (windowCustomization.glassType === GlassType.LOW_E) {
      glassPrice += parseFloat(pricingData.option_dried_glass_price_m2) * areaInM2;
    }

    if (windowCustomization.glassType === GlassType.TRIPLE_PANE) {
      glassPrice += parseFloat(pricingData.option_triple_glass_price_m2) * areaInM2;
    }

    const totalPrice = basePrice + colorPrice + glassPrice;

    return {
      basePrice,
      areaPrice: 0, // Not used with API pricing
      totalPrice,
      colorPrice,
      glassPrice,
    };
  };

  const priceBreakdown = calculatePriceBreakdown();
  
  // Use provided estimated price if available, otherwise use calculated price
  const estimatedPrice = providedEstimatedPrice || priceBreakdown.totalPrice;

  // Add premium for special features
  const getPremiumFeatures = () => {
    const features = [];
    if (windowCustomization.additionalFeatures?.energyEfficient) features.push('Energy Efficient');
    if (windowCustomization.additionalFeatures?.soundProofing) features.push('Sound Proofing');
    if (windowCustomization.additionalFeatures?.screens) features.push('Screens');
    if (windowCustomization.additionalFeatures?.grids) features.push('Grids');
    if (windowCustomization.additionalFeatures?.topLight) features.push('Top Light');
    if (windowCustomization.additionalFeatures?.bottomLight) features.push('Bottom Light');
    return features;
  };

  const premiumFeatures = getPremiumFeatures();

  return (
    <Box>
      <Typography variant="h6" gutterBottom mb={3}>
        Баталгаажуулах (Confirm Configuration)
      </Typography>

      <Grid container spacing={4}>
        {/* Left column with window preview */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Эцсийн загвар (Final Preview)
              </Typography>

              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: 'auto',
                  minHeight: 300,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px dashed #ccc',
                  borderRadius: 1,
                  p: 2,
                  mb: 2,
                }}
              >
                <WindowVisualization
                  windowCustomization={windowCustomization}
                  windowType={windowType}
                />
              </Box>

              <Typography variant="caption" align="center" display="block">
                Таны сонгосон хэмжээ: {windowCustomization.dimensions.width} x{' '}
                {windowCustomization.dimensions.height} {windowCustomization.dimensions.unit}
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              {windowCustomization.additionalFeatures?.topLight ? (
                <>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Дээд цонхны хэмжээ (Skylight Dimensions)
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }} color="text.secondary">
                    Дээд цонхны (skylight) өндрийг тохируулна уу:
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        type="number"
                        label="Skylight өндөр"
                        variant="outlined"
                        size="small"
                        value={
                          windowCustomization.topSection?.height ||
                          windowCustomization.dimensions.height * 0.3
                        }
                        onChange={onChangeSkylightHeight}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">см</InputAdornment>,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="caption" color="text.secondary">
                        Нийт өндөр: {windowCustomization.dimensions.height} см - Дээд цонхны өндөр:{' '}
                        {windowCustomization.topSection?.height ||
                          windowCustomization.dimensions.height * 0.3}{' '}
                        см = Үндсэн цонхны өндөр:{' '}
                        {windowCustomization.dimensions.height -
                          (windowCustomization.topSection?.height ||
                            windowCustomization.dimensions.height * 0.3)}{' '}
                        см
                      </Typography>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    1. Салхивчны хэмжээ (Vent Dimensions)
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }} color="text.secondary">
                    Хэрэв та тусгай хэмжээтэй салхивч хүсвэл энд оруулна уу:
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        type="number"
                        label="Салхивчны өргөн"
                        variant="outlined"
                        size="small"
                        onChange={onChangeVentWidth}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">см</InputAdornment>,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        type="number"
                        label="Салхивчны өндөр"
                        variant="outlined"
                        size="small"
                        onChange={onChangeVentHeight}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">см</InputAdornment>,
                        }}
                      />
                    </Grid>
                  </Grid>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Right column with vent dimensions and actions */}
        <Grid item xs={12} md={6}>
          {/* Price summary */}
          <Card sx={{ mb: 3, bgcolor: '#f9f9f9' }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Үнийн тооцоо
              </Typography>

              {pricingLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                  <CircularProgress size={24} />
                </Box>
              ) : pricingError ? (
                <Typography variant="body2" color="error" gutterBottom>
                  Error loading pricing: {pricingError}
                </Typography>
              ) : (
                <>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Үндсэн үнэ ({areaInM2.toFixed(2)} м²):</Typography>
                    <Typography variant="body2">{formatPrice(priceBreakdown.basePrice)}</Typography>
                  </Box>

                  {priceBreakdown.colorPrice > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Өнгөний нэмэлт үнэ:</Typography>
                      <Typography variant="body2">{formatPrice(priceBreakdown.colorPrice)}</Typography>
                    </Box>
                  )}

                  {priceBreakdown.glassPrice > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Шилний нэмэлт үнэ:</Typography>
                      <Typography variant="body2">{formatPrice(priceBreakdown.glassPrice)}</Typography>
                    </Box>
                  )}

                  <Divider sx={{ my: 1 }} />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      Нийт үнэ:
                    </Typography>
                    <Typography variant="subtitle2" fontWeight="bold" color="primary">
                      {formatPrice(estimatedPrice)}
                    </Typography>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>

          {/* Action buttons */}
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            {onAddAnotherWindow && (
              <Button variant="outlined" onClick={onAddAnotherWindow} fullWidth>
                Дахин шинэ цонх оруулах
              </Button>
            )}

            {onAddToCart && (
              <Button variant="contained" color="primary" onClick={onAddToCart} fullWidth>
                Сагс руу оруулах
              </Button>
            )}
          </Stack>
        </Grid>
      </Grid>
      <Box sx={{ mt: 4, p: 3, bgcolor: '#f5f5f5', borderRadius: 1 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Хувилбар сонголт
        </Typography>
        <Typography variant="body2" gutterBottom>
          • Select configuration: Visual thumbnails with open/close arrows
          <br />
          • Choose door-like opening style if applicable
          <br />
          • Select форчик (vent/small window) or салхивч (air vents)
          <br />
        </Typography>
      </Box>
    </Box>
  );
}
