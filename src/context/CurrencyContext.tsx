import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type Currency = 'USD' | 'EUR' | 'GBP';

const EXCHANGE_RATES = {
  USD: 1,
  EUR: 1.17,
  GBP: 0.73
};

type CurrencyContextType = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (priceUSD: number) => number;
  formatPrice: (price: number) => string;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('USD');

  const convertPrice = (priceUSD: number): number => {
    const rate = EXCHANGE_RATES[currency];
    return Number((priceUSD * rate).toFixed(2));
  };

  const formatPrice = (price: number): string => {
    const symbols = {
      USD: '$',
      EUR: '€',
      GBP: '£'
    };
    return `${symbols[currency]}${price.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}