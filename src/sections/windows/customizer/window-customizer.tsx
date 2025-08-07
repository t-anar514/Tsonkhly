'use client';

import { useState, ChangeEvent, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Card,
  Grid,
  Step,
  Stack,
  Button,
  Stepper,
  Container,
  Typography,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  InputAdornment,
  StepLabel,
  StepContent,
  Divider,
  Paper,
} from '@mui/material';

import Iconify from 'src/components/iconify';
import { useResponsive } from 'src/hooks/use-responsive';

import {
  WindowCustomization,
  WindowType,
  WindowShape,
  WindowStyle,
  WindowMaterial,
  GlassType,
  DeliveryOption,
  VentDimensions,
  WindowOpeningType,
} from '../types/window-types';

// Import step components
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
// Step4 removed as per requirement
import StepWrapper from './steps/StepWrapper';
import { windowOptions } from './mockData';

import { WindowVisualization } from './components/WindowVisualization';
import { useCart, windowCustomizationToProduct } from 'src/contexts/cart-context';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

type WindowCustomizerProps = {
  windowType?: string;
};

// Helper function to get initial window customization state
const getInitialCustomization = (): WindowCustomization => ({
  type: WindowType.REPLACEMENT,
  shape: WindowShape.RECTANGULAR,
  style: WindowStyle.CASEMENT,
  material: WindowMaterial.VINYL,
  openingType: WindowOpeningType.RIGHT_OPENING, // Default opening type
  color: '#FFFFFF',
  glassType: GlassType.DOUBLE_PANE,
  dimensions: { width: 150, height: 150, unit: 'centimeters' },
  quantity: 1,
  ventDimensions: { width: 50, height: 80, unit: 'centimeters' },
  deliveryOption: 'delivery',
  installationService: false,
  contactInfo: {
    name: '',
    phone: '',
    address: '',
  },
  additionalFeatures: {
    screens: false,
    grids: false,
    energyEfficient: false,
    soundProofing: false,
    topLight: false,
    bottomLight: false,
  },
});

// Component definition
export default function WindowCustomizer({
  windowType: initialWindowType,
}: WindowCustomizerProps = {}) {
  const smUp = useResponsive('up', 'sm');

  // State
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});
  const [windowCustomization, setWindowCustomization] = useState<WindowCustomization>(
    getInitialCustomization()
  );
  const [windowType, setWindowType] = useState<string>(initialWindowType || '1tsonh');
  const [currentColor, setCurrentColor] = useState<string>('#ffffff');
  const [warningText, setWarningText] = useState<Array<{ title: string; description: string }>>([]);

  // Stepper navigation handlers
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    setWindowCustomization(getInitialCustomization());
  };

  // Window customization handlers
  const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWindowCustomization({
      ...windowCustomization,
      type: event.target.value as WindowType,
    });
  };

  const handleChangeShape = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWindowCustomization({
      ...windowCustomization,
      shape: event.target.value as WindowShape,
    });
  };

  const handleChangeStyle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWindowCustomization({
      ...windowCustomization,
      style: event.target.value as WindowStyle,
    });
  };

  const handleChangeMaterial = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newMaterial = event.target.value as WindowMaterial;
    setWindowCustomization((prev) => ({
      ...prev,
      material: newMaterial,
    }));
    // Reset warning text when material changes
    setWarningText([]);
  }, []);

  const handleChangeGlassType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWindowCustomization({
      ...windowCustomization,
      glassType: event.target.value as GlassType,
    });
  };

  const handleChangeWidth = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = Number(event.target.value);
    if (isNaN(value)) return;

    setWindowCustomization({
      ...windowCustomization,
      dimensions: {
        ...windowCustomization.dimensions,
        width: value,
      },
    });
  };

  const handleChangeHeight = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = Number(event.target.value);
    if (isNaN(value)) return;

    setWindowCustomization({
      ...windowCustomization,
      dimensions: {
        ...windowCustomization.dimensions,
        height: value,
      },
    });
  };

  const handleChangeColor = (color: string) => {
    setWindowCustomization({
      ...windowCustomization,
      color,
    });
  };

  // Handle quantity change
  const handleChangeQuantity = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const quantity = Number(event.target.value);
    if (isNaN(quantity) || quantity < 1) return;

    setWindowCustomization({
      ...windowCustomization,
      quantity,
    });
  };

  const handleChangeFeature = (
    feature: keyof NonNullable<WindowCustomization['additionalFeatures']>
  ) => {
    // For top and bottom light features, ensure they are mutually exclusive
    if (feature === 'topLight' && windowCustomization.additionalFeatures?.bottomLight) {
      setWindowCustomization({
        ...windowCustomization,
        additionalFeatures: {
          ...windowCustomization.additionalFeatures,
          topLight: true,
          bottomLight: false,
        },
      });
    } else if (feature === 'bottomLight' && windowCustomization.additionalFeatures?.topLight) {
      setWindowCustomization({
        ...windowCustomization,
        additionalFeatures: {
          ...windowCustomization.additionalFeatures,
          topLight: false,
          bottomLight: true,
        },
      });
    } else {
      setWindowCustomization({
        ...windowCustomization,
        additionalFeatures: {
          ...windowCustomization.additionalFeatures,
          [feature]: !windowCustomization.additionalFeatures?.[feature],
        },
      });
    }
  };

  const calculatePrice = (): number => {
    // Base price depends on window type
    let basePrice = 0;
    switch (windowCustomization.type) {
      case WindowType.NEW_CONSTRUCTION:
        basePrice = 250;
        break;
      case WindowType.REPLACEMENT:
        basePrice = 200;
        break;
      default:
        basePrice = 200;
    }

    // Adjust based on material
    let materialMultiplier = 1;
    switch (windowCustomization.material) {
      case WindowMaterial.ALUMINUM:
        materialMultiplier = 1.2;
        break;
      case WindowMaterial.FIBERGLASS:
        materialMultiplier = 1.5;
        break;
      case WindowMaterial.VINYL:
        materialMultiplier = 1;
        break;
      case WindowMaterial.WOOD:
        materialMultiplier = 1.8;
        break;
      default:
        materialMultiplier = 1;
    }

    // Adjust based on glass type
    let glassMultiplier = 1;
    switch (windowCustomization.glassType) {
      case GlassType.SINGLE_PANE:
        glassMultiplier = 0.8;
        break;
      case GlassType.DOUBLE_PANE:
        glassMultiplier = 1;
        break;
      case GlassType.TRIPLE_PANE:
        glassMultiplier = 1.3;
        break;
      case GlassType.LOW_E:
        glassMultiplier = 1.2;
        break;
      default:
        glassMultiplier = 1;
    }

    // Size adjustment
    const area =
      (windowCustomization.dimensions.width * windowCustomization.dimensions.height) / 10000; // Convert to square meters

    let price = basePrice * materialMultiplier * glassMultiplier * area;

    // Add for additional features
    if (windowCustomization.additionalFeatures?.grids) price += 50;
    if (windowCustomization.additionalFeatures?.screens) price += 30;
    if (windowCustomization.additionalFeatures?.energyEfficient) price += 80;
    if (windowCustomization.additionalFeatures?.soundProofing) price += 100;

    // Installation service
    if (windowCustomization.installationService) price += 150;

    // Multiply by quantity
    price *= windowCustomization.quantity || 1;

    return price;
  };

  const estimatedPrice = calculatePrice();

  // Define steps for the wizard - Step 4 removed as per requirement
  const steps = [
    {
      label: 'STEP 1: Цонхны хийц',
      description: 'Window Style & Specs - Рамны материал, өнгө, хэмжээ, шилийн төрөл сонголт',
    },
    {
      label: 'STEP 2: Үндсэн хуваалт',
      description:
        'Main Partition Selection - Нэг, хоёр, эсвэл гурван хэсэгтэй цонхны төрөл сонголт',
    },
    {
      label: 'STEP 3: Баталгаажуулах',
      description: 'Confirm Configuration - Салхивчны хэмжээ, эцсийн загвар харуулах',
    },
  ];

  // Window type change handler
  const handleWindowTypeChange = (windowType: string) => {
    setWindowType(windowType);
  };

  // Window opening type change handler
  const handleChangeOpeningType = (openingType: WindowOpeningType) => {
    setWindowCustomization({
      ...windowCustomization,
      openingType,
    });
  };

  // Top/Bottom light options handler
  const handleChangeLightOption = (
    option: 'none' | 'top' | 'topDivided' | 'bottom' | 'bottomDivided'
  ) => {
    setWindowCustomization({
      ...windowCustomization,
      additionalFeatures: {
        ...windowCustomization.additionalFeatures,
        // Set the main boolean flags for top/bottom light
        topLight: option === 'top' || option === 'topDivided',
        bottomLight: option === 'bottom' || option === 'bottomDivided',
        // Track whether it's divided or regular
        skylightType:
          option === 'topDivided' ? 'divided' : option === 'top' ? 'regular' : undefined,
        underlightType:
          option === 'bottomDivided' ? 'divided' : option === 'bottom' ? 'regular' : undefined,
      },
    });
  };

  // Skylight dimension change handlers
  const handleSkylightHeightChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = Number(event.target.value);
    if (isNaN(value) || value <= 0) return;

    const totalHeight = windowCustomization.dimensions.height;
    const newTopSectionHeight = value;

    // Ensure the main window section has a minimum height
    const minMainSectionHeight = 50; // Minimum height for main window section
    if (totalHeight - newTopSectionHeight < minMainSectionHeight) return;

    setWindowCustomization({
      ...windowCustomization,
      topSection: {
        height: newTopSectionHeight,
        unit: windowCustomization.dimensions.unit,
      },
    });
  };

  // Vent dimension change handlers
  const handleVentWidthChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const ventWidth = Number(event.target.value);
    if (isNaN(ventWidth)) return;

    setWindowCustomization({
      ...windowCustomization,
      ventDimensions: {
        ...(windowCustomization.ventDimensions as VentDimensions),
        width: ventWidth,
        unit: 'centimeters',
      } as VentDimensions,
    });
  };

  const handleVentHeightChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const ventHeight = Number(event.target.value);
    if (isNaN(ventHeight)) return;

    setWindowCustomization({
      ...windowCustomization,
      ventDimensions: {
        ...(windowCustomization.ventDimensions as VentDimensions),
        height: ventHeight,
        unit: 'centimeters',
      } as VentDimensions,
    });
  };

  // Contact info handlers
  const handleContactInfoChange = (
    field: keyof WindowCustomization['contactInfo'],
    value: string
  ) => {
    setWindowCustomization({
      ...windowCustomization,
      contactInfo: {
        name: field === 'name' ? value : windowCustomization.contactInfo?.name || '',
        phone: field === 'phone' ? value : windowCustomization.contactInfo?.phone || '',
        address: field === 'address' ? value : windowCustomization.contactInfo?.address || '',
      },
    });
  };

  // Cart and order handlers
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    const calculatedPrice = calculatePrice();
    // Convert window customization to cart product item
    const cartItem = windowCustomizationToProduct(windowCustomization, windowType, calculatedPrice);
    // Add to cart
    addToCart(cartItem);
    // Navigate to the cart page
    router.push(paths.eCommerce.cart);
  };

  const handleAddAnotherWindow = () => {
    // Logic to save current window and start a new one
    console.log('Adding another window');
    // Reset the wizard
    setActiveStep(0);
  };

  // Step 4 specific handlers
  const handleChangeDeliveryOption = (option: DeliveryOption) => {
    setWindowCustomization({
      ...windowCustomization,
      deliveryOption: option,
    });
  };

  const handleChangeInstallationService = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWindowCustomization({
      ...windowCustomization,
      installationService: event.target.checked,
    });
  };

  const handleSubmitOrder = () => {
    console.log('Order submitted', windowCustomization);
    // Logic for order submission
  };

  // Render the current step content using separate components
  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <StepWrapper stepNumber={0} warningText={warningText}>
            <Step1
              windowCustomization={windowCustomization}
              onChangeMaterial={handleChangeMaterial}
              onChangeColor={handleChangeColor}
              onChangeWidth={handleChangeWidth}
              onChangeHeight={handleChangeHeight}
              onChangeGlassType={handleChangeGlassType}
              onChangeType={handleChangeType}
              setWarningText={setWarningText}
            />
          </StepWrapper>
        );
      case 1:
        return (
          <StepWrapper stepNumber={1}>
            <Step2
              windowCustomization={windowCustomization}
              windowType={windowType}
              onChangeWindowType={handleWindowTypeChange}
              onChangeOpeningType={handleChangeOpeningType}
              onChangeLightOption={handleChangeLightOption}
            />
          </StepWrapper>
        );
      case 2:
        return (
          <StepWrapper stepNumber={2}>
            <Step3
              windowCustomization={windowCustomization}
              windowType={windowType}
              onAddAnotherWindow={handleAddAnotherWindow}
              onAddToCart={handleAddToCart}
              onChangeVentHeight={handleVentHeightChange}
              onChangeVentWidth={handleVentWidthChange}
              onChangeSkylightHeight={handleSkylightHeightChange}
              onSubmitOrder={handleSubmitOrder}
            />
          </StepWrapper>
        );
      default:
        return null;
    }
  };

  // Determine if the current step is completed
  const isStepComplete = (step: number) => completed[step];

  // Calculate the total price
  const totalPrice = calculatePrice();

  return (
    <Container sx={{ my: 5 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          {/* Window Visualization */}
          <Card sx={{ p: 3, mb: 3, position: 'sticky', top: '70px' }}>
            <WindowVisualization
              windowCustomization={windowCustomization}
              windowType={windowType}
            />
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
              Таны сонголтууд:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              {/* Step 1 selections */}
              <Typography variant="body2">
                <strong>Материал:</strong>{' '}
                {
                  {
                    [WindowMaterial.VINYL]: 'Хуванцар',
                    [WindowMaterial.WOOD]: 'Мод',
                    [WindowMaterial.ALUMINUM]: 'Хөнгөн цагаан',
                    [WindowMaterial.FIBERGLASS]: 'Шилэн мяндас',
                  }[windowCustomization.material]
                }
              </Typography>
              <Typography variant="body2">
                <strong>Өнгө:</strong>{' '}
                <Box
                  component="span"
                  sx={{
                    display: 'inline-block',
                    width: '14px',
                    height: '14px',
                    backgroundColor: windowCustomization.color,
                    border: '1px solid #ccc',
                    verticalAlign: 'middle',
                    mr: 0.5,
                  }}
                ></Box>
                {windowCustomization.color}
              </Typography>
              <Typography variant="body2">
                <strong>Шил:</strong>{' '}
                {
                  {
                    [GlassType.SINGLE_PANE]: 'Нэг давхар',
                    [GlassType.DOUBLE_PANE]: 'Хоёр давхар',
                    [GlassType.TRIPLE_PANE]: 'Гурван давхар',
                    [GlassType.LOW_E]: 'Нам E',
                    [GlassType.TEMPERED]: 'Бэхжүүлсэн',
                    [GlassType.FROSTED]: 'Хүрэн өнгөтэй',
                  }[windowCustomization.glassType]
                }
              </Typography>

              {/* Step 2 selections */}
              <Typography variant="body2">
                <strong>Цонхны төрөл:</strong>{' '}
                {
                  {
                    '1tsonh': 'Нэг хэсэгтэй',
                    '2tsonh': 'Хоёр хэсэгтэй',
                    '3tsonh': 'Гурван хэсэгтэй',
                  }[windowType]
                }
              </Typography>
              {windowCustomization.openingType && (
                <Typography variant="body2">
                  <strong>Нээлтийн төрөл:</strong>{' '}
                  {
                    {
                      [WindowOpeningType.FIXED]: 'Суурин',
                      [WindowOpeningType.RIGHT_OPENING]: 'Баруун талд нээгддэг',
                      [WindowOpeningType.LEFT_OPENING]: 'Зүүн талд нээгддэг',
                      [WindowOpeningType.BOTH_OPENING]: 'Хоёр талд нээгддэг',
                      [WindowOpeningType.TILT_TURN_LEFT]: 'Зүүн хэлбэлзэх эргэлт',
                      [WindowOpeningType.TILT_TURN_BOTH]: 'Хоёр талын хэлбэлзэх эргэлт',
                    }[windowCustomization.openingType]
                  }
                </Typography>
              )}

              {/* Step 3 selections */}
              <Typography variant="body2">
                <strong>Хэмжээ:</strong> {windowCustomization.dimensions.width} ×{' '}
                {windowCustomization.dimensions.height} {windowCustomization.dimensions.unit}
                ``{' '}
              </Typography>
              <Typography variant="body2">
                <strong>Тоо ширхэг:</strong> {windowCustomization.quantity}
              </Typography>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            {/* Steps */}
            <Stepper activeStep={activeStep} orientation="horizontal" sx={{ mb: 4 }}>
              {steps.map((step, index) => (
                <Step key={step.label} completed={isStepComplete(index)}>
                  <StepLabel>
                    <Typography variant="subtitle1">{step.label}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {step.description}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* Current step content */}
            <Box sx={{ mt: 2, mb: 2 }}>
              {renderStepContent(activeStep)}

              <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                >
                  Буцах
                </Button>

                <Box sx={{ flexGrow: 1 }} />

                {activeStep < steps.length - 1 && (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
                  >
                    Дараах
                  </Button>
                )}
              </Box>
            </Box>

            {activeStep === steps.length && (
              <Box sx={{ p: 3 }}>
                <Typography paragraph>Захиалга амжилттай илгээгдлээ!</Typography>

                <Button
                  color="inherit"
                  onClick={handleReset}
                  startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                >
                  Дахин эхлүүлэх
                </Button>
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
