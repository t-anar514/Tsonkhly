import { IProductItemProps } from './product';
import { WindowCustomization } from 'src/sections/windows/types/window-types';

// Extend the basic product interface to include cart-specific properties
export interface ICartProductItemProps extends IProductItemProps {
  quantity?: number;
  customData?: {
    type: string;
    windowType?: string;
    windowCustomization?: WindowCustomization;
    features?: string[];
    [key: string]: any;
  };
}
