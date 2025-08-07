// Window type options
export enum WindowType {
  NEW_CONSTRUCTION = 'new_construction',
  REPLACEMENT = 'replacement',
}

// Window shape options
export enum WindowShape {
  RECTANGULAR = 'rectangular',
  ARCHED = 'arched',
  CIRCULAR = 'circular',
  CUSTOM = 'custom',
}

// Window material options
export enum WindowMaterial {
  VINYL = 'vinyl',
  WOOD = 'wood',
  ALUMINUM = 'aluminum',
  FIBERGLASS = 'fiberglass',
}

// Window glass options
export enum GlassType {
  SINGLE_PANE = 'single_pane',
  DOUBLE_PANE = 'double_pane',
  TRIPLE_PANE = 'triple_pane',
  LOW_E = 'low_e',
  TEMPERED = 'tempered',
  FROSTED = 'frosted',
}

// Window style options
export enum WindowStyle {
  CASEMENT = 'casement',
  DOUBLE_HUNG = 'double_hung',
  SLIDING = 'sliding',
  FIXED = 'fixed',
  BAY = 'bay',
  BOW = 'bow',
  AWNING = 'awning',
}

// Window opening type options
export enum WindowOpeningType {
  FIXED = 'fixed', // Both panels fixed
  RIGHT_OPENING = 'right_opening', // Right panel opens
  LEFT_OPENING = 'left_opening', // Left panel opens
  BOTH_OPENING = 'both_opening', // Both panels open
  TILT_TURN_LEFT = 'tilt_turn_left', // Left panel tilt and turn
  TILT_TURN_BOTH = 'tilt_turn_both', // Both panels tilt and turn
}

// Window dimensions
export interface WindowDimensions {
  width: number;
  height: number;
  unit: 'inches' | 'centimeters';
}

// Vent dimensions
export interface VentDimensions {
  width: number;
  height: number;
  unit: 'inches' | 'centimeters';
}

// Delivery options
export type DeliveryOption = 'delivery' | 'pickup';

// Window section dimensions (for top/bottom sections)
export interface SectionDimensions {
  height: number;
  unit: 'inches' | 'centimeters';
}

// Main window customization interface
export interface WindowCustomization {
  id?: string;
  type: WindowType;
  shape: WindowShape;
  style: WindowStyle;
  openingType?: WindowOpeningType;
  material: WindowMaterial;
  dimensions: WindowDimensions;
  dimensions2?: WindowDimensions; // For second window when having multiple windows
  topSection?: SectionDimensions; // For top section dimensions
  bottomSection?: SectionDimensions; // For bottom section dimensions
  ventDimensions?: VentDimensions; // For vent dimensions in Step3
  glassType: GlassType;
  color: string;
  quantity: number;
  additionalFeatures?: {
    grids?: boolean;
    screens?: boolean;
    energyEfficient?: boolean;
    soundProofing?: boolean;
    topLight?: boolean;
    bottomLight?: boolean;
    skylightType?: 'regular' | 'divided';
    underlightType?: 'regular' | 'divided';
  };
  price?: number;
  deliveryOption?: DeliveryOption; // For Step4 delivery selection
  installationService?: boolean; // For Step4 installation option
  contactInfo?: {
    name: string;
    phone: string;
    address?: string; // Only required if deliveryOption is 'delivery'
  };
}

// Installer profile interface
export interface InstallerProfile {
  id: string;
  name: string;
  company: string;
  rating: number;
  reviews: number;
  location: string;
  contactInfo: {
    email: string;
    phone: string;
  };
  availability: string[];
  price: {
    hourlyRate?: number;
    perWindowRate?: number;
  };
  specializations: string[];
}
