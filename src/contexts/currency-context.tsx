import { createContext, useContext, useState, ReactNode } from 'react';

export type Currency = 'CNY' | 'MNT';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (priceInCNY: number) => number;
  formatPrice: (priceInCNY: number) => string;
  getCurrencySymbol: () => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const CNY_TO_MNT_RATE = 500; // 1 CNY = 500 MNT

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('CNY');

  const convertPrice = (priceInCNY: number): number => {
    if (currency === 'MNT') {
      return priceInCNY * CNY_TO_MNT_RATE;
    }
    return priceInCNY;
  };

  const formatPrice = (priceInCNY: number): string => {
    const convertedPrice = convertPrice(priceInCNY);
    const symbol = getCurrencySymbol();
    
    if (currency === 'MNT') {
      return `${convertedPrice.toLocaleString()} ${symbol}`;
    }
    return `${convertedPrice.toFixed(2)} ${symbol}`;
  };

  const getCurrencySymbol = (): string => {
    return currency === 'CNY' ? '¥' : '₮';
  };

  const value = {
    currency,
    setCurrency,
    convertPrice,
    formatPrice,
    getCurrencySymbol,
  };

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
} 