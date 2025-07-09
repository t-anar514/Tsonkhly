// ----------------------------------------------------------------------

export type SettingsValueProps = {
  themeMode: 'light' | 'dark';
  themeDirection: 'rtl' | 'ltr';
  themeColorPresets: string;
};

export type SettingsContextProps = SettingsValueProps & {
  // Update
  onUpdate: (name: string, value: string | boolean) => void;
  // Reset
  canReset: boolean;
  onReset: VoidFunction;
  // Drawer
  open: boolean;
  onToggle: VoidFunction;
  onClose: VoidFunction;
};
