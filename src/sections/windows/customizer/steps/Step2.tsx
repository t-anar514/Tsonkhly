import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  CardActionArea,
  Divider,
  Chip,
  Button,
  CircularProgress,
  Alert,
  AlertTitle,
} from '@mui/material';
import { useState, useEffect, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { WindowType, WindowCustomization, WindowOpeningType } from '../../types/window-types';

// Define TypeScript interface for the API response
interface OpeningTypeImage {
  id: number;
  name: string;
  name_factory: string;
  image_path: string | null;
  is_active: boolean;
  top_bottom_glass_option: number;
}

interface SegmentOption {
  id: number;
  name: string;
  description: string | null;
  warning_text: string;
  image_url: string | null;
  is_active: boolean;
}

type Step2Props = {
  windowCustomization: WindowCustomization;
  windowType: string;
  onChangeWindowType: (windowType: string) => void;
  onChangeOpeningType?: (openingType: WindowOpeningType) => void;
  onChangeLightOption?: (
    option: 'none' | 'top' | 'topDivided' | 'bottom' | 'bottomDivided'
  ) => void;
};

// Styled components for the window type cards
const WindowTypeCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[4],
  },
}));

const WindowTypeImage = styled(CardMedia)(({ theme }) => ({
  height: 160,
  backgroundSize: 'contain',
  margin: theme.spacing(2),
}));

export default function Step2({
  windowCustomization,
  windowType,
  onChangeWindowType,
  onChangeOpeningType,
  onChangeLightOption,
}: Step2Props) {
  // State for opening type images from API
  const [openingTypeImages, setOpeningTypeImages] = useState<OpeningTypeImage[]>([]);
  const [segmentOptions, setSegmentOptions] = useState<SegmentOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingSegmentOptions, setLoadingSegmentOptions] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [segmentOptionsError, setSegmentOptionsError] = useState<string | null>(null);
  const handleWindowTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeWindowType(event.target.value);
  };

  // Fetch opening type images from API
  useEffect(() => {
    const fetchOpeningTypeImages = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/opening-types');

        // Log the full API response
        console.log('Opening Types API Response:', response.data);

        const activeImages = response.data.filter(
          (item: OpeningTypeImage) => item.is_active && item.image_path
        );

        // Log filtered active images
        console.log('Filtered Active Images:', activeImages);

        setOpeningTypeImages(activeImages);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch opening type images:', err);
        setError('Failed to load opening type images');
        // Using empty array as fallback
        setOpeningTypeImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOpeningTypeImages();
  }, []);

  // Fetch segment options from API
  useEffect(() => {
    const fetchSegmentOptions = async () => {
      setLoadingSegmentOptions(true);
      try {
        // Use our Next.js API route as a proxy to avoid CORS issues
        const response = await axios.get('/api/segment-options');
        console.log('Segment Options API Response:', response.data);

        // Filter active segment options
        const activeOptions = response.data.filter((item: SegmentOption) => item.is_active);

        console.log('Filtered active segment options:', activeOptions);

        if (activeOptions.length === 0) {
          console.warn('No active segment options found in the API response');
        }

        setSegmentOptions(activeOptions);
        setSegmentOptionsError(null);
      } catch (err) {
        console.error('Failed to fetch segment options:', err);
        const errorMessage =
          err.response?.data?.message || err.message || 'Failed to load segment options data';
        setSegmentOptionsError(errorMessage);
        // Using empty array as fallback
        setSegmentOptions([]);
      } finally {
        setLoadingSegmentOptions(false);
      }
    };

    fetchSegmentOptions();
  }, []);

  // Function to get the appropriate warning text based on window type
  const getWarningText = () => {
    // Map window type to segment option name
    const segmentNameMap: Record<string, string> = {
      '1tsonh': '1 Хуваалтай',
      '2tsonh': '2 Хуваалтай',
      '3tsonh': '3 Хуваалтай',
    };

    const segmentName = segmentNameMap[windowType];
    console.log(
      'Looking for segment name:',
      segmentName,
      'in',
      segmentOptions.map((o) => o.name)
    );

    // Find matching segment option
    const matchingOption = segmentOptions.find((option) => option.name === segmentName);

    if (matchingOption) {
      console.log('Found matching option with warning text:', matchingOption.warning_text);
    } else {
      console.log('No matching option found for', segmentName, 'using fallback');
    }

    // Return warning text if found, otherwise return type-specific fallback
    return matchingOption?.warning_text;
  };

  // Helper function to get the appropriate image based on criteria
  const getOpeningTypeImageUrl = (
    windowTypeStr: string,
    openingPosition: string,
    hasTopLight: boolean = false,
    hasBottomLight: boolean = false,
    isDividedTopLight: boolean = false,
    isDividedBottomLight: boolean = false
  ): string => {
    if (loading || openingTypeImages.length === 0) {
      return '/assets/images/windows/loading-placeholder.svg';
    }

    // Parse window type string to get pieces count
    const pieceCount = windowTypeStr === '1tsonh' ? '1' : '2';

    // Determine the glass option code
    let glassOptionCode: number;
    if (!hasTopLight && !hasBottomLight) {
      // Standard window - no top or bottom light
      glassOptionCode = pieceCount === '1' ? 1 : 4;
    } else if (hasTopLight && !hasBottomLight) {
      // Window with skylight
      glassOptionCode = 2;
    } else if (!hasTopLight && hasBottomLight) {
      // Window with underlight
      glassOptionCode = 3;
    } else {
      // Both top and bottom (might need to be customized based on your data)
      glassOptionCode = isDividedBottomLight ? 7 : 3;
    }

    // Build a name pattern to search for
    let namePattern = `${pieceCount}_`;

    // Add opening position to the name pattern
    if (openingPosition === 'fixed') {
      namePattern += 'haalgagui';
    } else if (openingPosition === 'left_right') {
      namePattern += 'zuun_baruun_haalga';
    } else if (openingPosition === 'left') {
      namePattern += 'zuun_haalga';
    } else if (openingPosition === 'right') {
      namePattern += 'baruun_haalga';
    } else if (openingPosition === 'top') {
      namePattern += 'deed_haalga';
    } else if (openingPosition === 'bottom') {
      namePattern += 'dood_haalga';
    } else if (openingPosition === 'left_top') {
      namePattern += 'zuun_deed_haalga';
    } else if (openingPosition === 'right_top') {
      namePattern += 'baruun_deed_haalga';
    } else if (openingPosition === 'left_bottom') {
      namePattern += 'zuun_dood_haalga';
    } else if (openingPosition === 'right_bottom') {
      namePattern += 'baruun_dood_haalga';
    }

    // For fixed windows with one piece, explicitly look for 1_tsonhgui
    if (openingPosition === 'fixed' && pieceCount === '1') {
      console.log('Searching for fixed one-piece window with:', {
        pieceCount,
        openingPosition,
        glassOptionCode,
        hasTopLight,
        hasBottomLight,
      });

      // Debug: Show all images that might match name pattern
      const possibleMatches = openingTypeImages.filter((img) => img.name.includes('1_'));
      console.log('Possible matching images for 1_ prefix:', possibleMatches);

      // Look specifically for the 1_tsonhgui image
      const fixedImage = openingTypeImages.find(
        (img) => img.name === '1_tsonhgui' && img.top_bottom_glass_option === glassOptionCode
      );

      console.log('Found matching fixed image?', fixedImage);

      if (fixedImage && fixedImage.image_path) {
        console.log('Using fixed image path:', fixedImage.image_path);
        return fixedImage.image_path;
      }
    }

    // For other cases, filter images based on criteria
    const filteredImages = openingTypeImages.filter(
      (img) => img.name.includes(namePattern) && img.top_bottom_glass_option === glassOptionCode
    );

    // Return the first matching image URL or a default
    return filteredImages.length > 0 && filteredImages[0].image_path
      ? filteredImages[0].image_path
      : '/assets/images/windows/default-window.svg';
  };

  const handleOpeningTypeChange = (openingType: WindowOpeningType) => {
    if (onChangeOpeningType) {
      onChangeOpeningType(openingType);
    }
  };

  // Handler for top/bottom light options
  const handleLightOptionChange = (
    option: 'none' | 'top' | 'topDivided' | 'bottom' | 'bottomDivided'
  ) => {
    if (onChangeLightOption) {
      onChangeLightOption(option);
    }
  };

  return (
    <Box>
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        gutterBottom
        sx={{
          mb: 2,
          display: 'inline-block',
          backgroundColor: '#2f353b',
          color: 'white',
          px: 2,
          py: 1,
          borderRadius: 1,
        }}
      >
        WINDOW TYPE
      </Typography>
      {/* Warning Alert Box that changes based on window type */}
      <Alert
        severity="warning"
        icon={<span style={{ fontSize: '20px', marginRight: '8px' }}>⚠️</span>}
        sx={{ mb: 3 }}
      >
        {loadingSegmentOptions ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CircularProgress size={16} sx={{ mr: 1 }} /> Loading warning text...
          </Box>
        ) : segmentOptionsError ? (
          'Warning text could not be loaded.'
        ) : (
          getWarningText()
        )}
      </Alert>

      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          aria-label="window-type"
          name="window-type"
          value={windowType || '1tsonh'}
          onChange={handleWindowTypeChange}
        >
          <Grid container spacing={3}>
            {/* One-piece window */}
            <Grid item xs={12} md={4}>
              <FormControlLabel
                value="1tsonh"
                control={<Radio sx={{ display: 'none' }} />}
                label=""
                sx={{ m: 0, width: '100%' }}
              />
              <Card
                sx={{
                  cursor: 'pointer',
                  border: windowType === '1tsonh' ? '2px solid #1976d2' : '1px solid #e0e0e0',
                  bgcolor: windowType === '1tsonh' ? 'rgba(25, 118, 210, 0.04)' : 'white',
                  position: 'relative',
                  height: '100%',
                  borderRadius: 1,
                }}
                onClick={() => handleWindowTypeChange({ target: { value: '1tsonh' } } as any)}
              >
                <Box sx={{ p: 2, textAlign: 'center' }}>
                  <Box
                    component="img"
                    src="/assets/images/windows/one-piece-window.svg"
                    alt="One-piece window"
                    sx={{ height: 100, objectFit: 'contain', mb: 1 }}
                  />
                  <Typography variant="body1" fontWeight="bold" sx={{ mb: 0.5 }}>
                    One-piece
                  </Typography>
                </Box>
                {windowType === '1tsonh' && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bgcolor: '#2196f3',
                      color: 'white',
                      width: 24,
                      height: 24,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    ✓
                  </Box>
                )}
              </Card>
            </Grid>

            {/* Two-piece window */}
            <Grid item xs={12} md={4}>
              <FormControlLabel
                value="2tsonh"
                control={<Radio sx={{ display: 'none' }} />}
                label=""
                sx={{ m: 0, width: '100%' }}
              />
              <Card
                sx={{
                  cursor: 'pointer',
                  border: windowType === '2tsonh' ? '2px solid #1976d2' : '1px solid #e0e0e0',
                  bgcolor: windowType === '2tsonh' ? 'rgba(25, 118, 210, 0.04)' : 'white',
                  position: 'relative',
                  height: '100%',
                  borderRadius: 1,
                }}
                onClick={() => handleWindowTypeChange({ target: { value: '2tsonh' } } as any)}
              >
                <Box sx={{ p: 2, textAlign: 'center' }}>
                  <Box
                    component="img"
                    src="/assets/images/windows/two-piece-window.svg"
                    alt="Two-piece window"
                    sx={{ height: 100, objectFit: 'contain', mb: 1 }}
                  />
                  <Typography variant="body1" fontWeight="bold" sx={{ mb: 0.5 }}>
                    Two-piece
                  </Typography>
                </Box>
                {windowType === '2tsonh' && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bgcolor: '#2196f3',
                      color: 'white',
                      width: 24,
                      height: 24,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    ✓
                  </Box>
                )}
              </Card>
            </Grid>

            {/* Three-piece window */}
            <Grid item xs={12} md={4}>
              <FormControlLabel
                value="3tsonh"
                control={<Radio sx={{ display: 'none' }} />}
                label=""
                sx={{ m: 0, width: '100%' }}
              />
              <Card
                sx={{
                  cursor: 'pointer',
                  border: windowType === '3tsonh' ? '2px solid #1976d2' : '1px solid #e0e0e0',
                  bgcolor: windowType === '3tsonh' ? 'rgba(25, 118, 210, 0.04)' : 'white',
                  position: 'relative',
                  height: '100%',
                  borderRadius: 1,
                }}
                onClick={() => handleWindowTypeChange({ target: { value: '3tsonh' } } as any)}
              >
                <Box sx={{ p: 2, textAlign: 'center' }}>
                  <Box
                    component="img"
                    src="/assets/images/windows/three-piece-window.svg"
                    alt="Three-piece window"
                    sx={{ height: 100, objectFit: 'contain', mb: 1 }}
                  />
                  <Typography variant="body1" fontWeight="bold" sx={{ mb: 0.5 }}>
                    Three-piece
                  </Typography>
                </Box>
                {windowType === '3tsonh' && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bgcolor: '#2196f3',
                      color: 'white',
                      width: 24,
                      height: 24,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    ✓
                  </Box>
                )}
              </Card>
            </Grid>
          </Grid>
        </RadioGroup>
      </FormControl>

      {/* Top/Bottom Light Options */}
      <Box sx={{ mt: 4, mb: 3 }}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          gutterBottom
          sx={{
            mb: 2,
            display: 'inline-block',
            backgroundColor: '#2f353b',
            color: 'white',
            px: 2,
            py: 1,
            borderRadius: 1,
          }}
        >
          TOP/BOTTOM LIGHT OPTIONS
        </Typography>
        <Box sx={{ textAlign: 'right', mt: -4 }}>
          <Button variant="text" size="small" sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
            more details
          </Button>
        </Box>

        <Grid container spacing={2}>
          {/* Conditionally render light options based on window type */}
          {windowType === '1tsonh' ? (
            // Options for one-piece window
            <>
              {/* Without top/bottom light */}
              <Grid item xs={12} sm={4}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    border:
                      !windowCustomization.additionalFeatures?.topLight &&
                      !windowCustomization.additionalFeatures?.bottomLight
                        ? '2px solid #1976d2'
                        : '1px solid #e0e0e0',
                    bgcolor:
                      !windowCustomization.additionalFeatures?.topLight &&
                      !windowCustomization.additionalFeatures?.bottomLight
                        ? 'rgba(25, 118, 210, 0.04)'
                        : 'white',
                    position: 'relative',
                    height: '100%',
                    borderRadius: 1,
                  }}
                  onClick={() => handleLightOptionChange('none')}
                >
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Box
                      component="img"
                      src="/assets/images/windows/one-piece-window.svg"
                      alt="Without top/bottom light"
                      sx={{ height: 100, objectFit: 'contain', mb: 1 }}
                    />
                    <Typography variant="body2" fontWeight="medium">
                      Standard Window
                    </Typography>
                  </Box>
                  {!windowCustomization.additionalFeatures?.topLight &&
                    !windowCustomization.additionalFeatures?.bottomLight && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          bgcolor: '#2196f3',
                          color: 'white',
                          width: 24,
                          height: 24,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        ✓
                      </Box>
                    )}
                </Card>
              </Grid>

              {/* With skylight */}
              <Grid item xs={12} sm={4}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    border:
                      windowCustomization.additionalFeatures?.topLight &&
                      windowCustomization.additionalFeatures?.skylightType === 'regular'
                        ? '2px solid #1976d2'
                        : '1px solid #e0e0e0',
                    bgcolor:
                      windowCustomization.additionalFeatures?.topLight &&
                      windowCustomization.additionalFeatures?.skylightType === 'regular'
                        ? 'rgba(25, 118, 210, 0.04)'
                        : 'white',
                    position: 'relative',
                    height: '100%',
                    borderRadius: 1,
                  }}
                  onClick={() => handleLightOptionChange('top')}
                >
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Box
                      component="img"
                      src="/assets/images/windows/1window-with-skylight.svg"
                      alt="With skylight"
                      sx={{ height: 100, objectFit: 'contain', mb: 1 }}
                    />
                    <Typography variant="body2" fontWeight="medium">
                      With Skylight
                    </Typography>
                  </Box>
                  {windowCustomization.additionalFeatures?.topLight &&
                    windowCustomization.additionalFeatures?.skylightType === 'regular' && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          bgcolor: '#2196f3',
                          color: 'white',
                          width: 24,
                          height: 24,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        ✓
                      </Box>
                    )}
                </Card>
              </Grid>

              {/* With underlight */}
              <Grid item xs={12} sm={4}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    border:
                      windowCustomization.additionalFeatures?.bottomLight &&
                      windowCustomization.additionalFeatures?.underlightType === 'regular'
                        ? '2px solid #1976d2'
                        : '1px solid #e0e0e0',
                    bgcolor:
                      windowCustomization.additionalFeatures?.bottomLight &&
                      windowCustomization.additionalFeatures?.underlightType === 'regular'
                        ? 'rgba(25, 118, 210, 0.04)'
                        : 'white',
                    position: 'relative',
                    height: '100%',
                    borderRadius: 1,
                  }}
                  onClick={() => handleLightOptionChange('bottom')}
                >
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Box
                      component="img"
                      src="/assets/images/windows/1window-with-underlight.svg"
                      alt="With underlight"
                      sx={{ height: 100, objectFit: 'contain', mb: 1 }}
                    />
                    <Typography variant="body2" fontWeight="medium">
                      With Underlight
                    </Typography>
                  </Box>
                  {windowCustomization.additionalFeatures?.bottomLight &&
                    windowCustomization.additionalFeatures?.underlightType === 'regular' && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          bgcolor: '#2196f3',
                          color: 'white',
                          width: 24,
                          height: 24,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        ✓
                      </Box>
                    )}
                </Card>
              </Grid>
            </>
          ) : (
            // Options for two-piece and three-part windows (showing all options)
            <>
              {/* Without top/bottom light */}
              <Grid item xs={12} sm={4} md={2.4}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    border:
                      !windowCustomization.additionalFeatures?.topLight &&
                      !windowCustomization.additionalFeatures?.bottomLight
                        ? '2px solid #1976d2'
                        : '1px solid #e0e0e0',
                    bgcolor:
                      !windowCustomization.additionalFeatures?.topLight &&
                      !windowCustomization.additionalFeatures?.bottomLight
                        ? 'rgba(25, 118, 210, 0.04)'
                        : 'white',
                    position: 'relative',
                    height: '100%',
                    borderRadius: 1,
                  }}
                  onClick={() => handleLightOptionChange('none')}
                >
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Box
                      component="img"
                      src={
                        windowType === '2tsonh'
                          ? '/assets/images/windows/two-piece-window.svg'
                          : '/assets/images/windows/three-piece-window.svg'
                      }
                      alt="Without top/bottom light"
                      sx={{ height: 90, objectFit: 'contain', mb: 1 }}
                    />
                    <Typography variant="body2" fontWeight="medium">
                      Standard Window
                    </Typography>
                  </Box>
                  {!windowCustomization.additionalFeatures?.topLight &&
                    !windowCustomization.additionalFeatures?.bottomLight && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          bgcolor: '#2196f3',
                          color: 'white',
                          width: 24,
                          height: 24,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        ✓
                      </Box>
                    )}
                </Card>
              </Grid>

              {/* With skylight */}
              <Grid item xs={12} sm={4} md={2.4}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    border:
                      windowCustomization.additionalFeatures?.topLight &&
                      windowCustomization.additionalFeatures?.skylightType === 'regular'
                        ? '2px solid #1976d2'
                        : '1px solid #e0e0e0',
                    bgcolor:
                      windowCustomization.additionalFeatures?.topLight &&
                      windowCustomization.additionalFeatures?.skylightType === 'regular'
                        ? 'rgba(25, 118, 210, 0.04)'
                        : 'white',
                    position: 'relative',
                    height: '100%',
                    borderRadius: 1,
                  }}
                  onClick={() => handleLightOptionChange('top')}
                >
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Box
                      component="img"
                      src={
                        windowType === '3tsonh'
                          ? '/assets/images/windows/3piece-with-skylight.svg'
                          : windowType === '2tsonh'
                          ? '/assets/images/windows/window-with-skylight.svg'
                          : '/assets/images/windows/1window-with-skylight.svg'
                      }
                      alt="With skylight"
                      sx={{ height: 90, objectFit: 'contain', mb: 1 }}
                    />
                    <Typography variant="body2" fontWeight="medium">
                      With Skylight
                    </Typography>
                  </Box>
                  {windowCustomization.additionalFeatures?.topLight &&
                    windowCustomization.additionalFeatures?.skylightType === 'regular' && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          bgcolor: '#2196f3',
                          color: 'white',
                          width: 24,
                          height: 24,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        ✓
                      </Box>
                    )}
                </Card>
              </Grid>

              {/* With skylight, divided */}
              <Grid item xs={12} sm={4} md={2.4}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    border:
                      windowCustomization.additionalFeatures?.topLight &&
                      windowCustomization.additionalFeatures?.skylightType === 'divided'
                        ? '2px solid #1976d2'
                        : '1px solid #e0e0e0',
                    bgcolor:
                      windowCustomization.additionalFeatures?.topLight &&
                      windowCustomization.additionalFeatures?.skylightType === 'divided'
                        ? 'rgba(25, 118, 210, 0.04)'
                        : 'white',
                    position: 'relative',
                    height: '100%',
                    borderRadius: 1,
                  }}
                  onClick={() => handleLightOptionChange('topDivided')}
                >
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Box
                      component="img"
                      src={
                        windowType === '3tsonh'
                          ? '/assets/images/windows/3piece-with-divided-skylight.svg'
                          : windowType === '2tsonh'
                          ? '/assets/images/windows/window-with-skylight-divided.svg'
                          : '/assets/images/windows/window-with-skylight-divided.svg'
                      }
                      alt="With skylight, divided"
                      sx={{ height: 90, objectFit: 'contain', mb: 1 }}
                    />
                    <Typography variant="body2" fontWeight="medium">
                      Divided Skylight
                    </Typography>
                  </Box>
                  {windowCustomization.additionalFeatures?.topLight &&
                    windowCustomization.additionalFeatures?.skylightType === 'divided' && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          bgcolor: '#2196f3',
                          color: 'white',
                          width: 24,
                          height: 24,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        ✓
                      </Box>
                    )}
                </Card>
              </Grid>

              {/* With underlight */}
              <Grid item xs={12} sm={4} md={2.4}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    border:
                      windowCustomization.additionalFeatures?.bottomLight &&
                      windowCustomization.additionalFeatures?.underlightType === 'regular'
                        ? '2px solid #1976d2'
                        : '1px solid #e0e0e0',
                    bgcolor:
                      windowCustomization.additionalFeatures?.bottomLight &&
                      windowCustomization.additionalFeatures?.underlightType === 'regular'
                        ? 'rgba(25, 118, 210, 0.04)'
                        : 'white',
                    position: 'relative',
                    height: '100%',
                    borderRadius: 1,
                  }}
                  onClick={() => handleLightOptionChange('bottom')}
                >
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Box
                      component="img"
                      src={
                        windowType === '3tsonh'
                          ? '/assets/images/windows/3piece-with-underlight.svg'
                          : windowType === '2tsonh'
                          ? '/assets/images/windows/window-with-underlight.svg'
                          : '/assets/images/windows/window-with-underlight.svg'
                      }
                      alt="With underlight"
                      sx={{ height: 90, objectFit: 'contain', mb: 1 }}
                    />
                    <Typography variant="body2" fontWeight="medium">
                      With Underlight
                    </Typography>
                  </Box>
                  {windowCustomization.additionalFeatures?.bottomLight &&
                    windowCustomization.additionalFeatures?.underlightType === 'regular' && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          bgcolor: '#2196f3',
                          color: 'white',
                          width: 24,
                          height: 24,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        ✓
                      </Box>
                    )}
                </Card>
              </Grid>

              {/* With bottom light, divided */}
              <Grid item xs={12} sm={4} md={2.4}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    border:
                      windowCustomization.additionalFeatures?.bottomLight &&
                      windowCustomization.additionalFeatures?.underlightType === 'divided'
                        ? '2px solid #1976d2'
                        : '1px solid #e0e0e0',
                    bgcolor:
                      windowCustomization.additionalFeatures?.bottomLight &&
                      windowCustomization.additionalFeatures?.underlightType === 'divided'
                        ? 'rgba(25, 118, 210, 0.04)'
                        : 'white',
                    position: 'relative',
                    height: '100%',
                    borderRadius: 1,
                  }}
                  onClick={() => handleLightOptionChange('bottomDivided')}
                >
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Box
                      component="img"
                      src={
                        windowType === '3tsonh'
                          ? '/assets/images/windows/3piece-with-divided-underlight.svg'
                          : windowType === '2tsonh'
                          ? '/assets/images/windows/window-with-bottom-light-divided.svg'
                          : '/assets/images/windows/window-with-bottom-light-divided.svg'
                      }
                      alt="With bottom light, divided"
                      sx={{ height: 90, objectFit: 'contain', mb: 1 }}
                    />
                    <Typography variant="body2" fontWeight="medium">
                      Divided Underlight
                    </Typography>
                  </Box>
                  {windowCustomization.additionalFeatures?.bottomLight &&
                    windowCustomization.additionalFeatures?.underlightType === 'divided' && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          bgcolor: '#2196f3',
                          color: 'white',
                          width: 24,
                          height: 24,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        ✓
                      </Box>
                    )}
                </Card>
              </Grid>
            </>
          )}
        </Grid>
      </Box>

      {/* Opening Type Selection */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom mb={2}>
          Онгойлтын төрөл (Opening Type)
        </Typography>

        <Grid container spacing={2}>
          {/* Fixed */}
          <Grid item xs={6} sm={4} md={2}>
            <Card
              sx={{
                cursor: 'pointer',
                border:
                  windowCustomization.openingType === WindowOpeningType.FIXED
                    ? '2px solid #1976d2'
                    : '1px solid #e0e0e0',
                bgcolor:
                  windowCustomization.openingType === WindowOpeningType.FIXED
                    ? 'rgba(25, 118, 210, 0.04)'
                    : 'transparent',
                position: 'relative',
                height: '100%',
              }}
              onClick={() => handleOpeningTypeChange(WindowOpeningType.FIXED)}
            >
              <Box
                sx={{
                  p: 1,
                  height: '120px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {loading ? (
                  <CircularProgress size={30} />
                ) : (
                  <Box
                    component="img"
                    src={getOpeningTypeImageUrl(
                      windowType,
                      'fixed',
                      windowCustomization.additionalFeatures?.topLight || false,
                      windowCustomization.additionalFeatures?.bottomLight || false,
                      windowCustomization.additionalFeatures?.skylightType === 'divided',
                      windowCustomization.additionalFeatures?.underlightType === 'divided'
                    )}
                    alt="Both panels fixed"
                    sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  />
                )}
              </Box>
              {windowCustomization.openingType === WindowOpeningType.FIXED && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bgcolor: 'primary.main',
                    color: 'white',
                    width: 24,
                    height: 24,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottomLeftRadius: 4,
                  }}
                >
                  ✓
                </Box>
              )}
            </Card>
          </Grid>

          {/* Right panel opens */}
          <Grid item xs={6} sm={4} md={2}>
            <Card
              sx={{
                cursor: 'pointer',
                border:
                  windowCustomization.openingType === WindowOpeningType.RIGHT_OPENING
                    ? '2px solid #1976d2'
                    : '1px solid #e0e0e0',
                bgcolor:
                  windowCustomization.openingType === WindowOpeningType.RIGHT_OPENING
                    ? 'rgba(25, 118, 210, 0.04)'
                    : 'transparent',
                position: 'relative',
                height: '100%',
              }}
              onClick={() => handleOpeningTypeChange(WindowOpeningType.RIGHT_OPENING)}
            >
              <Box
                sx={{
                  p: 1,
                  height: '120px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {loading ? (
                  <CircularProgress size={30} />
                ) : (
                  <Box
                    component="img"
                    src={getOpeningTypeImageUrl(
                      windowType,
                      'right',
                      windowCustomization.additionalFeatures?.topLight || false,
                      windowCustomization.additionalFeatures?.bottomLight || false,
                      windowCustomization.additionalFeatures?.skylightType === 'divided',
                      windowCustomization.additionalFeatures?.underlightType === 'divided'
                    )}
                    alt="Right panel opens"
                    sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  />
                )}
              </Box>
              {windowCustomization.openingType === WindowOpeningType.RIGHT_OPENING && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bgcolor: 'primary.main',
                    color: 'white',
                    width: 24,
                    height: 24,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottomLeftRadius: 4,
                  }}
                >
                  ✓
                </Box>
              )}
            </Card>
          </Grid>

          {/* Left panel opens */}
          <Grid item xs={6} sm={4} md={2}>
            <Card
              sx={{
                cursor: 'pointer',
                border:
                  windowCustomization.openingType === WindowOpeningType.LEFT_OPENING
                    ? '2px solid #1976d2'
                    : '1px solid #e0e0e0',
                bgcolor:
                  windowCustomization.openingType === WindowOpeningType.LEFT_OPENING
                    ? 'rgba(25, 118, 210, 0.04)'
                    : 'transparent',
                position: 'relative',
                height: '100%',
              }}
              onClick={() => handleOpeningTypeChange(WindowOpeningType.LEFT_OPENING)}
            >
              <Box
                sx={{
                  p: 1,
                  height: '120px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {loading ? (
                  <CircularProgress size={30} />
                ) : (
                  <Box
                    component="img"
                    src={getOpeningTypeImageUrl(
                      windowType,
                      'left',
                      windowCustomization.additionalFeatures?.topLight || false,
                      windowCustomization.additionalFeatures?.bottomLight || false,
                      windowCustomization.additionalFeatures?.skylightType === 'divided',
                      windowCustomization.additionalFeatures?.underlightType === 'divided'
                    )}
                    alt="Left panel opens"
                    sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  />
                )}
              </Box>
              {windowCustomization.openingType === WindowOpeningType.LEFT_OPENING && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bgcolor: 'primary.main',
                    color: 'white',
                    width: 24,
                    height: 24,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottomLeftRadius: 4,
                  }}
                >
                  ✓
                </Box>
              )}
            </Card>
          </Grid>

          {/* Both panels open - only show for 2-piece windows */}
          {windowType !== '1tsonh' && (
            <Grid item xs={6} sm={4} md={2}>
              <Card
                sx={{
                  cursor: 'pointer',
                  border:
                    windowCustomization.openingType === WindowOpeningType.BOTH_OPENING
                      ? '2px solid #1976d2'
                      : '1px solid #e0e0e0',
                  bgcolor:
                    windowCustomization.openingType === WindowOpeningType.BOTH_OPENING
                      ? 'rgba(25, 118, 210, 0.04)'
                      : 'transparent',
                  position: 'relative',
                  height: '100%',
                }}
                onClick={() => handleOpeningTypeChange(WindowOpeningType.BOTH_OPENING)}
              >
                <Box
                  sx={{
                    p: 1,
                    height: '120px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {loading ? (
                    <CircularProgress size={30} />
                  ) : (
                    <Box
                      component="img"
                      src={getOpeningTypeImageUrl(
                        windowType,
                        'left_right',
                        windowCustomization.additionalFeatures?.topLight || false,
                        windowCustomization.additionalFeatures?.bottomLight || false,
                        windowCustomization.additionalFeatures?.skylightType === 'divided',
                        windowCustomization.additionalFeatures?.underlightType === 'divided'
                      )}
                      alt="Both panels open"
                      sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                  )}
                </Box>
                {windowCustomization.openingType === WindowOpeningType.BOTH_OPENING && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bgcolor: 'primary.main',
                      color: 'white',
                      width: 24,
                      height: 24,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderBottomLeftRadius: 4,
                    }}
                  >
                    ✓
                  </Box>
                )}
              </Card>
            </Grid>
          )}
        </Grid>
      </Box>

      <Box sx={{ mt: 4, p: 3, bgcolor: '#f5f5f5', borderRadius: 1 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Хувилбар сонголт
        </Typography>
        <Typography variant="body2" gutterBottom>
          • Select форчик (vent/small window) or салхивч (air vents)
          <br />
        </Typography>
      </Box>
    </Box>
  );
}
