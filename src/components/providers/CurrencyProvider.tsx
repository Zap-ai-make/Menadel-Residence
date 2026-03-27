'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { type Currency, FALLBACK_RATES, formatPrice } from '@/lib/currency';

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  rates: Record<Currency, number>;
  format: (amountXof: number) => string;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

const STORAGE_KEY = 'minadel-currency';

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('FCFA');
  const [rates, setRates] = useState<Record<Currency, number>>(FALLBACK_RATES);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Currency | null;
    if (stored && ['FCFA', 'EUR', 'USD'].includes(stored)) {
      setCurrencyState(stored);
    }
  }, []);

  // Fetch exchange rates
  useEffect(() => {
    fetch('/api/exchange-rates')
      .then((r) => r.json())
      .then((data) => {
        if (data.rates) setRates(data.rates);
      })
      .catch(() => {
        // Silent fallback — FALLBACK_RATES stay active
      });
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem(STORAGE_KEY, c);
  };

  const format = (amountXof: number) => formatPrice(amountXof, currency, rates);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, rates, format }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider');
  return ctx;
}
