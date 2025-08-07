import {
  Box,
  Typography,
  TextField,
  Grid,
  InputAdornment,
  Card,
  CardContent,
  Stack,
  Chip,
  CircularProgress,
} from '@mui/material';
// StepWrapper is now handled at the parent level
import { WindowCustomization, WindowMaterial, GlassType } from '../../types/window-types';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// Interface to match the API response format
interface ApiWindowOption {
  id: number;
  name: string;
  window_color_code: string;
  image_path: string | null;
  caption_text:
    | string[]
    | {
        [key: string]: string | undefined;
      };
  depth: string;
  seals: number;
  uw: string;
  is_default: boolean;
  is_active: boolean;
  colorOptionsByMaterial: Array<{ code: string; label: string; color: string; extra: string }>;
  glassOptions: Array<{
    name: string;
    icon?: string;
    image_path?: string | null;
    factory_code?: string;
    warning_text?: string;
  }>;
  warningText?: Array<{ title: string; description: string }>;
}

type Step1Props = {
  windowCustomization: WindowCustomization;
  onChangeType: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeWidth: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onChangeHeight: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onChangeMaterial: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeGlassType: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeColor: (color: string) => void;
  setWarningText?: React.Dispatch<
    React.SetStateAction<Array<{ title: string; description: string }>>
  >;
};

export default function Step1({
  windowCustomization,
  onChangeType,
  onChangeMaterial,
  onChangeWidth,
  onChangeHeight,
  onChangeGlassType,
  onChangeColor,
  setWarningText,
}: Step1Props) {
  const [customRalColor, setCustomRalColor] = useState('');
  const [windowOptions, setWindowOptions] = useState<ApiWindowOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const initialDataLoaded = useRef(false);

  const onChangeMaterialRef = useRef(onChangeMaterial);
  const onChangeColorRef = useRef(onChangeColor);
  const windowCustomizationRef = useRef(windowCustomization);

  // Update refs when props change, but don't trigger re-renders
  useEffect(() => {
    onChangeMaterialRef.current = onChangeMaterial;
    onChangeColorRef.current = onChangeColor;
    windowCustomizationRef.current = windowCustomization;
  });

  // Fetch window options from our Next.js API proxy to avoid CORS issues
  useEffect(() => {
    // Prevent duplicate fetches and initialization
    if (initialDataLoaded.current) return;

    console.log('Initial data load starting');
    let isMounted = true;

    const fetchFrameTypes = async () => {
      // Set loading state only once
      setLoading(true);
      console.log('Fetching frame types from API proxy...');

      try {
        // Use our Next.js API route as a proxy to avoid CORS issues
        const response = await axios.get('/api/frametypes/');

        // Check if component is still mounted before updating state
        if (!isMounted) return;

        console.log(
          'API response received:',
          response.data && Array.isArray(response.data)
            ? `${response.data.length} frame types`
            : 'invalid format'
        );

        // Log the full warning text content in great detail
        if (response.data && Array.isArray(response.data)) {
          response.data.forEach((option) => {
            console.log(`==== WARNING TEXT INSPECTION FOR ${option.name} ====`);
            if (option.warningText) {
              console.log('warningText type:', typeof option.warningText);
              console.log('isArray:', Array.isArray(option.warningText));
              console.log('value:', JSON.stringify(option.warningText, null, 2));

              if (Array.isArray(option.warningText)) {
                option.warningText.forEach((warning: any, i: number) => {
                  console.log(`Warning ${i + 1} type:`, typeof warning);
                  if (typeof warning === 'object' && warning !== null) {
                    console.log(`Keys:`, Object.keys(warning));
                    Object.keys(warning).forEach((key) => {
                      const warningObj = warning as Record<string, any>;
                      console.log(`- ${key}:`, warningObj[key], typeof warningObj[key]);
                    });
                  } else {
                    console.log(`Value:`, warning);
                  }
                });
              }
            } else {
              console.log('No warning text available');
            }
            console.log('========================================');
          });
        }

        if (response.data && Array.isArray(response.data)) {
          // Update window options state
          setWindowOptions(response.data);

          // Set loading to false BEFORE updating other state to prevent race conditions
          setLoading(false);

          // Process default selections only if we haven't already initialized
          if (!initialDataLoaded.current) {
            initialDataLoaded.current = true;
            console.log('Setting up initial selections');

            // Find the default frame option
            let defaultOption = response.data.find((option) => option.is_default === true);
            if (!defaultOption && response.data.length > 0) {
              // Fallback to first option if no default is specified
              defaultOption = response.data[0];
            }

            if (defaultOption) {
              // Set selected frame option based on default from API or first available
              const materialName = defaultOption.name.toLowerCase();
              setSelectedFrameOption(materialName);

              // Set warning text if available
              if (defaultOption.warningText && setWarningText) {
                console.log('Setting initial warning text:', defaultOption.warningText);
                setWarningText(defaultOption.warningText);
              }

              // Update material based on name (Metal = ALUMINUM, PVC = VINYL)
              const materialType = materialName.includes('metal')
                ? WindowMaterial.ALUMINUM
                : WindowMaterial.VINYL;

              // Use setTimeout to push these updates to the next event cycle
              // This helps prevent update cycles
              setTimeout(() => {
                if (isMounted) {
                  // Material update through parent
                  const materialEvent = {
                    target: { value: materialType },
                  } as React.ChangeEvent<HTMLInputElement>;
                  onChangeMaterialRef.current(materialEvent);

                  // Color update if available
                  if (
                    defaultOption.colorOptionsByMaterial &&
                    defaultOption.colorOptionsByMaterial.length > 0
                  ) {
                    // Small delay to separate the updates
                    setTimeout(() => {
                      if (isMounted) {
                        onChangeColorRef.current(defaultOption.colorOptionsByMaterial[0].color);
                      }
                    }, 100);
                  }
                }
              }, 0);
            }
          }
        } else {
          console.warn('API returned invalid data format, falling back to mock data');

          setLoading(false);
          initialDataLoaded.current = true;
        }
      } catch (apiError) {
        if (!isMounted) return;

        console.error('API proxy error:', apiError);
        console.log('Using mock data as fallback');

        setLoading(false);
        setError(null); // Clear any previous errors
        initialDataLoaded.current = true;
      }
    };

    // Execute fetch
    fetchFrameTypes();

    // Cleanup function
    return () => {
      console.log('Cleaning up API fetch effect');
      isMounted = false;
    };
  }, []);

  // Initialize with default option if available, otherwise use the current material
  const [selectedFrameOption, setSelectedFrameOption] = useState<string>(
    windowCustomization.material === WindowMaterial.ALUMINUM ? 'metal' : 'pvc'
  );

  // This useEffect is no longer needed as we're handling this in the API fetch effect
  // We'll leave this commented out for reference
  /*
  useEffect(() => {
    if (windowOptions.length > 0 && !selectedFrameOption) {
      // Find the default option if it exists
      const defaultOption = windowOptions.find((option) => option.is_default === true);
      if (defaultOption) {
        // If material is ALUMINUM, set to 'metal', otherwise 'pvc'
        const materialType = defaultOption.name.toLowerCase().includes('metal') ? 
          WindowMaterial.ALUMINUM : WindowMaterial.VINYL;
        // Update material immediately using the ref
        const event = { target: { value: materialType } } as React.ChangeEvent<HTMLInputElement>;
        onChangeMaterialRef.current(event);
        setSelectedFrameOption(defaultOption.name.toLowerCase());
      }
    }
  }, [windowOptions, selectedFrameOption]);
  */

  const [frameColorOptions, setFrameColorOptions] = useState<
    Array<{ code: string; label: string; color: string; extra: string }>
  >([]);

  // Update color options when selected frame option changes
  // This effect only handles UI state and doesn't call parent callbacks
  useEffect(() => {
    if (windowOptions.length > 0 && selectedFrameOption) {
      const frameOption = windowOptions.find(
        (option) => option.name.toLowerCase() === selectedFrameOption.toLowerCase()
      );

      if (frameOption?.colorOptionsByMaterial) {
        // Update local state for color options display
        setFrameColorOptions(frameOption.colorOptionsByMaterial);
      } else {
        // Reset if no colors available
        setFrameColorOptions([]);
      }
    }
  }, [selectedFrameOption, windowOptions]);

  // Get the current selected frame option object for warning text
  const currentFrameOption = windowOptions.find(
    (option) => option.name.toLowerCase() === selectedFrameOption
  );

  const handleFrameOptionChange = (optionName: string) => {
    // Skip update if already selected (prevents unnecessary re-renders)
    if (selectedFrameOption === optionName.toLowerCase()) return;

    console.log('Changing frame option to:', optionName);
    setSelectedFrameOption(optionName.toLowerCase());

    // Find the selected option to get its colorOptionsByMaterial
    const selectedOption = windowOptions.find(
      (option) => option.name.toLowerCase() === optionName.toLowerCase()
    );

    // Extract material information from option
    if (selectedOption) {
      // Update warning text if available
      if (selectedOption.warningText && setWarningText) {
        console.log('Raw warning text:', JSON.stringify(selectedOption.warningText, null, 2));

        // Log each warning text object separately for better visibility
        if (Array.isArray(selectedOption.warningText)) {
          selectedOption.warningText.forEach((warning, i) => {
            console.log(`Warning ${i + 1}:`, warning);
          });

          // Make sure warning text has the right structure
          const formattedWarnings = selectedOption.warningText.map((warning) => {
            // Check if warning already has the right structure
            if (warning.title && warning.description) {
              return warning;
            }

            // If warning has a different structure, try to adapt it
            if (typeof warning === 'object' && warning !== null) {
              // For objects with different key names, try to extract title and description
              const keys = Object.keys(warning);
              if (keys.length >= 2) {
                // Use type assertion to fix TypeScript errors
                const warningObj = warning as Record<string, any>;
                return {
                  title: (warningObj[keys[0]] as string) || 'Warning',
                  description: (warningObj[keys[1]] as string) || 'Please check specifications',
                };
              }
            }

            // If warning is a string or has unexpected structure, create a default
            return {
              title: 'Warning',
              description: typeof warning === 'string' ? warning : 'Please check specifications',
            };
          });

          console.log('Formatted warnings:', formattedWarnings);
          setWarningText(formattedWarnings);
        } else {
          // If not an array, create an array with one warning
          const fallbackWarning = [
            {
              title: 'Information',
              description:
                typeof selectedOption.warningText === 'string'
                  ? selectedOption.warningText
                  : 'Please check specifications for this material',
            },
          ];
          console.log('Created fallback warning:', fallbackWarning);
          setWarningText(fallbackWarning);
        }
      }

      // Create a synthetic event to trigger the material change
      const event = {
        target: { value: WindowMaterial.WOOD },
      } as React.ChangeEvent<HTMLInputElement>;

      // If option was found, trigger material change handler
      onChangeMaterialRef.current(event);

      // Set default color for this material/frame type
      if (
        selectedOption.colorOptionsByMaterial &&
        selectedOption.colorOptionsByMaterial.length > 0 &&
        selectedOption.colorOptionsByMaterial[0].color
      ) {
        const defaultColor = selectedOption.colorOptionsByMaterial[0].color;
        onChangeColorRef.current(defaultColor);
      }
    }
  };

  const handleColorChange = (color: string) => {
    onChangeColor(color);
  };

  const handleRalColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const ralColor = event.target.value;
    setCustomRalColor(ralColor);
    onChangeColor(ralColor);
  };

  const handleGlassOptionChange = (glassType: GlassType) => {
    const event = { target: { value: glassType } } as React.ChangeEvent<HTMLInputElement>;
    onChangeGlassType(event);
  };

  return (
    <Box>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Loading window options...</Typography>
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          <Typography variant="h6" gutterBottom mb={3}>
            Цонхны хийц (Window Style & Specs)
          </Typography>

          {/* 1. Frame Material Selection */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                1. Рамны материал сонгох (Frame Material Selection)
              </Typography>

              <Grid container spacing={2}>
                {windowOptions.map((frameOption) => (
                  <Grid item xs={12} sm={6} key={frameOption.id}>
                    <Card
                      sx={{
                        cursor: 'pointer',
                        border:
                          selectedFrameOption === frameOption.name.toLowerCase()
                            ? '2px solid #1976d2'
                            : '1px solid #e0e0e0',
                        bgcolor:
                          selectedFrameOption === frameOption.name.toLowerCase()
                            ? 'rgba(25, 118, 210, 0.04)'
                            : 'transparent',
                        position: 'relative',
                        height: '100%',
                        overflow: 'visible',
                      }}
                      onClick={() => handleFrameOptionChange(frameOption.name)}
                    >
                      {frameOption.is_active === false && (
                        <Chip
                          label="Not Available"
                          color="error"
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 8,
                            left: 8,
                            fontWeight: 'bold',
                          }}
                        />
                      )}
                      {selectedFrameOption === frameOption.name.toLowerCase() && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            bgcolor: 'primary.main',
                            color: 'white',
                            width: 30,
                            height: 30,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderBottomLeftRadius: 4,
                            fontSize: '1.2rem',
                          }}
                        >
                          ✓
                        </Box>
                      )}
                      <Box sx={{ p: 2 }}>
                        <Box sx={{ height: 200, mb: 2, display: 'flex', justifyContent: 'center' }}>
                          <Box
                            component="img"
                            src={
                              frameOption.image_path ||
                              'https://via.placeholder.com/400x300?text=Window+Frame'
                            }
                            alt={frameOption.name}
                            sx={{
                              maxWidth: '100%',
                              maxHeight: '100%',
                              objectFit: 'contain',
                            }}
                            onError={(e) => {
                              // Fallback for broken images
                              const target = e.target as HTMLImageElement;
                              console.log(`Image failed to load: ${target.src}`);
                              target.src = 'https://via.placeholder.com/400x300?text=Window+Frame';
                            }}
                          />
                        </Box>

                        <Typography variant="h6" align="center" gutterBottom>
                          {frameOption.name} {frameOption.depth}
                        </Typography>

                        <Stack spacing={1} sx={{ mt: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box
                              component="span"
                              sx={{ color: 'primary.main', fontWeight: 'bold' }}
                            >
                              ✓
                            </Box>
                            <Typography variant="body2">Өргөний гүн {frameOption.depth}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box
                              component="span"
                              sx={{ color: 'primary.main', fontWeight: 'bold' }}
                            >
                              ✓
                            </Box>
                            <Typography variant="body2">
                              Хамгаалалтын түвшин: {frameOption.seals}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box
                              component="span"
                              sx={{ color: 'primary.main', fontWeight: 'bold' }}
                            >
                              ✓
                            </Box>
                            <Typography variant="body2">
                              Дулаан хамгаалалт: {frameOption.uw}
                            </Typography>
                          </Box>
                        </Stack>

                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                          <Chip
                            label={`U W - ${frameOption.uw}`}
                            sx={{
                              bgcolor: frameOption.uw.includes('≤')
                                ? 'success.main'
                                : 'warning.main',
                              color: 'white',
                              fontWeight: 'bold',
                            }}
                          />
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* 2. Color Selection */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                2. Өнгө сонгох (Color Selection)
              </Typography>

              <Grid container spacing={1}>
                {frameColorOptions.map((color) => (
                  <Grid item xs={4} sm={3} md={2} key={color.code}>
                    <Card
                      sx={{
                        cursor: 'pointer',
                        border:
                          windowCustomization.color === color.color
                            ? '2px solid #1976d2'
                            : '1px solid #e0e0e0',
                        bgcolor:
                          windowCustomization.color === color.color
                            ? 'rgba(25, 118, 210, 0.04)'
                            : 'transparent',
                        position: 'relative',
                        height: '100%',
                        p: 1,
                      }}
                      onClick={() => handleColorChange(color.color)}
                    >
                      <Box
                        sx={{
                          width: '100%',
                          height: 40,
                          bgcolor: color.color,
                          border: color.color === '#F4F4F4' ? '1px solid #ccc' : 'none',
                          borderRadius: 1,
                          mb: 1,
                        }}
                      />
                      <Typography variant="caption" display="block" align="center" noWrap>
                        {color.label}
                      </Typography>
                      {color.extra && (
                        <Typography
                          variant="caption"
                          display="block"
                          align="center"
                          color="text.secondary"
                        >
                          {color.extra}
                        </Typography>
                      )}
                      {windowCustomization.color === color.color && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            bgcolor: 'primary.main',
                            color: 'white',
                            width: 20,
                            height: 20,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderBottomLeftRadius: 4,
                            fontSize: '0.8rem',
                          }}
                        >
                          ✓
                        </Box>
                      )}
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* 3. Enter Size */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                3. Хэмжээ оруулах (Enter Size)
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Өргөн (Width)"
                    type="number"
                    variant="outlined"
                    value={windowCustomization.dimensions.width}
                    onChange={onChangeWidth}
                    inputProps={{
                      min: 30,
                      max: 300,
                      step: 1,
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {windowCustomization.dimensions.unit}
                        </InputAdornment>
                      ),
                    }}
                    helperText={`${
                      windowCustomization.dimensions.unit === 'centimeters'
                        ? '30-300 см'
                        : '12-120 дюйм'
                    }`}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Өндөр (Height)"
                    type="number"
                    variant="outlined"
                    value={windowCustomization.dimensions.height}
                    onChange={onChangeHeight}
                    inputProps={{
                      min: 30,
                      max: 300,
                      step: 1,
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {windowCustomization.dimensions.unit}
                        </InputAdornment>
                      ),
                    }}
                    helperText={`${
                      windowCustomization.dimensions.unit === 'centimeters'
                        ? '30-300 см'
                        : '12-120 дюйм'
                    }`}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* 4. Glass Type */}
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                4. Шилийн төрөл (Glass Type)
              </Typography>

              <Grid container spacing={2}>
                {/* Fix for TypeScript lint errors - ensure properties exist before using them */}
                {currentFrameOption &&
                currentFrameOption.glassOptions &&
                currentFrameOption.glassOptions.length > 0
                  ? // If API provides glass options, use those
                    currentFrameOption.glassOptions.map((glassOption, index) => {
                      // Map glass option to GlassType enum (safer mapping with defaults)
                      let glassTypeValue = GlassType.DOUBLE_PANE;
                      if (index === 0) glassTypeValue = GlassType.DOUBLE_PANE;
                      else if (index === 1) glassTypeValue = GlassType.TRIPLE_PANE;
                      else if (index === 2) glassTypeValue = GlassType.LOW_E;
                      else glassTypeValue = GlassType.TEMPERED;

                      // Determine image source: prefer image_path from API, fall back to icon
                      const imageSrc =
                        glassOption.image_path ||
                        glassOption.icon ||
                        `https://via.placeholder.com/60x60?text=${encodeURIComponent(
                          glassOption.name
                        )}`;

                      return (
                        <Grid item xs={12} sm={6} key={glassOption.name}>
                          <Card
                            sx={{
                              cursor: 'pointer',
                              border:
                                windowCustomization.glassType === glassTypeValue
                                  ? '2px solid #1976d2'
                                  : '1px solid #e0e0e0',
                              bgcolor:
                                windowCustomization.glassType === glassTypeValue
                                  ? 'rgba(25, 118, 210, 0.04)'
                                  : 'transparent',
                              position: 'relative',
                              height: '100%',
                              p: 2,
                            }}
                            onClick={() => handleGlassOptionChange(glassTypeValue)}
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'row' },
                                gap: 2,
                              }}
                            >
                              {/* Glass image */}
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  mb: { xs: 1, md: 0 },
                                  flexShrink: 0,
                                  width: { xs: '100%', md: 80 },
                                }}
                              >
                                <Box
                                  component="img"
                                  src={imageSrc}
                                  alt={glassOption.name}
                                  sx={{
                                    height: 80,
                                    width: 'auto',
                                    maxWidth: '100%',
                                    objectFit: 'contain',
                                  }}
                                  onError={(e) => {
                                    // Fallback for broken glass type icons
                                    const target = e.target as HTMLImageElement;
                                    console.log(`Glass image failed to load: ${target.src}`);
                                    target.src = `https://via.placeholder.com/80x80?text=${encodeURIComponent(
                                      glassOption.name
                                    )}`;
                                  }}
                                />
                              </Box>

                              {/* Glass info */}
                              <Box sx={{ flex: 1 }}>
                                <Typography variant="subtitle2" gutterBottom>
                                  {glassOption.name}
                                </Typography>

                                {/* Display factory code if available */}
                                {glassOption.factory_code && (
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    color="text.secondary"
                                    gutterBottom
                                  >
                                    {glassOption.factory_code}
                                  </Typography>
                                )}

                                {/* Display warning text with info icon */}
                                {glassOption.warning_text && (
                                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: 1 }}>
                                    <Box
                                      component="span"
                                      sx={{
                                        color: 'info.main',
                                        mr: 1,
                                        display: 'inline-flex',
                                        fontSize: 16,
                                      }}
                                    >
                                      ℹ️
                                    </Box>
                                    <Typography variant="body2" color="text.secondary">
                                      {glassOption.warning_text}
                                    </Typography>
                                  </Box>
                                )}
                              </Box>
                            </Box>

                            {windowCustomization.glassType === glassTypeValue && (
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
                      );
                    })
                  : // Fallback default glass options if API doesn't provide any
                    [
                      { name: 'Double Pane', value: GlassType.DOUBLE_PANE },
                      { name: 'Triple Pane', value: GlassType.TRIPLE_PANE },
                      { name: 'Low-E Glass', value: GlassType.LOW_E },
                      { name: 'Tempered', value: GlassType.TEMPERED },
                    ].map((glassOption) => (
                      <Grid item xs={6} sm={3} key={glassOption.name}>
                        <Card
                          sx={{
                            cursor: 'pointer',
                            border:
                              windowCustomization.glassType === glassOption.value
                                ? '2px solid #1976d2'
                                : '1px solid #e0e0e0',
                            bgcolor:
                              windowCustomization.glassType === glassOption.value
                                ? 'rgba(25, 118, 210, 0.04)'
                                : 'transparent',
                            position: 'relative',
                            height: '100%',
                            p: 2,
                          }}
                          onClick={() => handleGlassOptionChange(glassOption.value)}
                        >
                          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                            <Box
                              component="img"
                              src={`https://via.placeholder.com/60x60?text=${encodeURIComponent(
                                glassOption.name
                              )}`}
                              alt={glassOption.name}
                              sx={{
                                height: 60,
                                width: 'auto',
                                objectFit: 'contain',
                              }}
                            />
                          </Box>
                          <Typography variant="body2" align="center">
                            {glassOption.name}
                          </Typography>
                          {windowCustomization.glassType === glassOption.value && (
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
                    ))}
              </Grid>
            </CardContent>
          </Card>
        </>
      )}
    </Box>
  );
}
