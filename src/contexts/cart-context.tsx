'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { IProductItemProps } from 'src/types/product';
import { ICartProductItemProps } from 'src/types/extended-product';
import { WindowCustomization } from 'src/sections/windows/types/window-types';

// Define the shape of our cart context
interface CartContextType {
  cartItems: ICartProductItemProps[];
  addToCart: (item: ICartProductItemProps) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateCartItemQuantity: (id: string, quantity: number) => void;
  getCartTotal: () => number;
}

// Create the context with a default value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create a provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<ICartProductItemProps[]>([]);

  // Load cart from localStorage when component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart data', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add an item to the cart
  const addToCart = (item: ICartProductItemProps) => {
    setCartItems((prevItems) => {
      // Check if the item already exists in the cart
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        // If it exists, update the quantity
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: (cartItem.quantity || 1) + (item.quantity || 1) }
            : cartItem
        );
      }
      
      // Otherwise, add the new item
      return [...prevItems, { ...item, quantity: item.quantity || 1 }];
    });
  };

  // Remove an item from the cart
  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Update the quantity of an item in the cart
  const updateCartItemQuantity = (id: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // Calculate the total price of items in the cart
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  };

  // Convert window customization to product format
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    updateCartItemQuantity,
    getCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use the cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};

// Helper function to convert window customization to product format
export const windowCustomizationToProduct = (
  windowCustomization: WindowCustomization,
  windowType: string,
  price: number
): ICartProductItemProps => {
  const getWindowTypeName = () => {
    switch (windowType) {
      case '1tsonh': return 'Нэг хэсэгтэй цонх';
      case '2tsonh': return 'Хоёр хэсэгтэй цонх';
      case '3tsonh': return 'Гурван хэсэгтэй цонх';
      default: return 'Цонх';
    }
  };
  
  // Get the appropriate window image based on window type, glass type, and features
  const getWindowImage = () => {
    // Fallback image if nothing else matches
    const fallbackImage = '/assets/images/windows/one-piece-window.svg';
    
    // Define base image paths with type safety
    const basePaths: Record<string, string> = {
      '1tsonh': '/assets/images/windows/one-piece-window.svg',
      '2tsonh': '/assets/images/windows/two-piece-window.svg',
      '3tsonh': '/assets/images/windows/three-piece-window.svg',
    };
    
    // Check for special window features
    if (windowCustomization.additionalFeatures?.topLight) {
      if (windowType === '1tsonh') {
        return windowCustomization.additionalFeatures?.grids 
          ? '/assets/images/windows/window-with-skylight-divided.svg'
          : '/assets/images/windows/window-with-skylight.svg';
      }
    }
    
    if (windowCustomization.additionalFeatures?.bottomLight) {
      if (windowType === '1tsonh') {
        return windowCustomization.additionalFeatures?.grids 
          ? '/assets/images/windows/window-with-bottom-light-divided.svg'
          : '/assets/images/windows/window-with-underlight.svg';
      }
    }
    
    // Return the base image for this window type, or default if not found
    return basePaths[windowType] || fallbackImage;
  };
  
  // Function to ensure we always have a valid product image
  const ensureValidImage = (product: ICartProductItemProps): ICartProductItemProps => {
    // If it's a window product and has a missing or placeholder image
    if (product.customData?.type === 'window') {
      // Override the placeholder with an appropriate window image
      return {
        ...product,
        coverUrl: '/assets/images/windows/one-piece-window.svg',
        images: ['/assets/images/windows/one-piece-window.svg']
      };
    }
    return product;
  };

  const getOpeningTypeName = () => {
    const openingTypeMap: Record<string, string> = {
      'FIXED': 'Суурин',
      'RIGHT_OPENING': 'Баруун талд нээгдэг',
      'LEFT_OPENING': 'Зүүн талд нээгддэг', 
      'BOTH_OPENING': 'Хоёр талд нээгддэг',
      'TILT_TURN_LEFT': 'Зүүн хэлбэлзэх эргэлт',
      'TILT_TURN_BOTH': 'Хоёр талын хэлбэлзэх эргэлт',
    };

    return windowCustomization.openingType ? openingTypeMap[windowCustomization.openingType] || 'Нээлттэй' : 'Нээлттэй';
  };

  // Get the glass type name in Mongolian for display
  const getGlassTypeName = () => {
    const glassTypeMap: Record<string, string> = {
      'single_pane': 'нэг давхаргат шил',
      'double_pane': 'хос давхаргат шил',
      'triple_pane': 'гурван давхаргат шил',
      'low_e': 'нам E шил',
      'tempered': 'хатуу шил',
      'frosted': 'цантсан шил',
    };
    return glassTypeMap[windowCustomization.glassType] || 'хос давхаргат шил';
  };

  // Generate a unique ID for this window
  const uniqueId = `window-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  // Create a description for the window
  const description = `
    - Цонхны хэмжээ: ${windowCustomization.dimensions.width}×${windowCustomization.dimensions.height}${windowCustomization.dimensions.unit}
    - Материал: ${windowCustomization.material}
    - Өнгө: ${windowCustomization.color}
    - Нээлтийн төрөл: ${getOpeningTypeName()}
    - Шилний төрөл: ${getGlassTypeName()}
  `;

  // Build additional features list
  const features = [];
  if (windowCustomization.additionalFeatures?.energyEfficient) features.push('Эрчим хүч хэмнэлттэй');
  if (windowCustomization.additionalFeatures?.soundProofing) features.push('Дуу чимээ тусгаарлагч');
  if (windowCustomization.additionalFeatures?.screens) features.push('Сараачин хаалттай');
  if (windowCustomization.additionalFeatures?.grids) features.push('Торлогтой');
  if (windowCustomization.additionalFeatures?.topLight) features.push('Дээд гэрэлтэй');
  if (windowCustomization.additionalFeatures?.bottomLight) features.push('Доод гэрэлтэй');

  // Create product item from window customization
  return {
    id: uniqueId,
    name: getWindowTypeName(),
    sold: 0,
    label: 'Захиалгат',
    price: price,
    caption: `${getWindowTypeName()} - ${getOpeningTypeName()}`,
    stock: 1,
    coverUrl: getWindowImage(), // Use appropriate window image
    category: 'windows',
    images: [getWindowImage()],
    priceSale: 0,
    ratingNumber: 5,
    description: description,
    totalReviews: 0,
    quantity: windowCustomization.quantity || 1,
    customData: {
      type: 'window',
      windowType: windowType,
      windowCustomization: windowCustomization,
      features: features
    }
  };
};
