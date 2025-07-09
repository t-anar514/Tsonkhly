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

// Window dimensions
export interface WindowDimensions {
  width: number;
  height: number;
  unit: 'inches' | 'centimeters';
}

// Main window customization interface
export interface WindowCustomization {
  id?: string;
  type: WindowType;
  shape: WindowShape;
  style: WindowStyle;
  material: WindowMaterial;
  dimensions: WindowDimensions;
  glassType: GlassType;
  color: string;
  quantity: number;
  additionalFeatures?: {
    grids?: boolean;
    screens?: boolean;
    energyEfficient?: boolean;
    soundProofing?: boolean;
  };
  price?: number;
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
