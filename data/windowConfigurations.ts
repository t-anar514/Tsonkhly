// Mock window configuration data
export type FrameLayout = 'single' | 'double-vertical' | 'double-vertical-reversed' | 'double-horizontal' | 't-layout' | 'double-top' | 'triple-horizontal' | 'top-transom' | 'bottom-transom' | 'double-vertical-small-top' | 'double-vertical-small-bottom';

export interface WindowConfig {
  id: string;
  name: string;
  width: number;
  height: number;
  color: string;
  partitions: {
    horizontal: number;
    vertical: number;
  };
  openingType: "fixed" | "tilt" | "turn";
  frameLayout: FrameLayout;
}

export const windowConfigsData: WindowConfig[] = [
  {
    id: "standard-single",
    name: "Standard Single Pane",
    width: 300,
    height: 400,
    color: "#ffffff",
    partitions: {
      horizontal: 0,
      vertical: 0,
    },
    openingType: "fixed",
    frameLayout: "single"
  },
  {
    id: "double-horizontal",
    name: "Double Horizontal (Side-by-Side)",
    width: 400,
    height: 300,
    color: "#f0f0f0",
    partitions: {
      horizontal: 0,
      vertical: 0,
    },
    openingType: "turn",
    frameLayout: "double-horizontal"
  },
  {
    id: "triple-horizontal",
    name: "Triple Horizontal (Side-by-Side)",
    width: 500,
    height: 300,
    color: "#f0f0f0",
    partitions: {
      horizontal: 0,
      vertical: 0,
    },
    openingType: "turn",
    frameLayout: "triple-horizontal"
  },
  {
    id: "double-vertical-small-top",
    name: "Double Vertical (Smaller Top)",
    width: 300,
    height: 400,
    color: "#f5f5f5",
    partitions: {
      horizontal: 0,
      vertical: 0,
    },
    openingType: "tilt",
    frameLayout: "double-vertical-small-top"
  },
  {
    id: "double-vertical-small-bottom",
    name: "Double Vertical (Smaller Bottom)",
    width: 300,
    height: 400,
    color: "#f5f5f5",
    partitions: {
      horizontal: 0,
      vertical: 0,
    },
    openingType: "tilt",
    frameLayout: "double-vertical-reversed"
  },
  {
    id: "top-transom",
    name: "Top Transom with Three Below",
    width: 450,
    height: 500,
    color: "#f8f8f8",
    partitions: {
      horizontal: 0,
      vertical: 0,
    },
    openingType: "fixed",
    frameLayout: "top-transom"
  },
  {
    id: "bottom-transom",
    name: "Bottom Transom with Three Above",
    width: 450,
    height: 500,
    color: "#f8f8f8",
    partitions: {
      horizontal: 0,
      vertical: 0,
    },
    openingType: "fixed",
    frameLayout: "bottom-transom"
  },
  {
    id: "t-layout",
    name: "T-Layout (Top & Two Bottom)",
    width: 350,
    height: 450,
    color: "#f8f8f8",
    partitions: {
      horizontal: 0,
      vertical: 0,
    },
    openingType: "fixed",
    frameLayout: "t-layout"
  },
  {
    id: "double-top",
    name: "Double Top (Two Top & One Bottom)",
    width: 350,
    height: 450,
    color: "#f8f8f8",
    partitions: {
      horizontal: 0,
      vertical: 0,
    },
    openingType: "fixed",
    frameLayout: "double-top"
  }
];

export default windowConfigsData;
