'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from 'react';
import { type Currency, FALLBACK_RATES, formatPrice } from '@/lib/currency';

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  rates: Record<Currency, number>;
  format: (amountXof: number) => string;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

const STORAGE_KEY = 'minadel-currency';
const STORAGE_EVENT = 'minadel-currency-change';
const CURRENCIES: Currency[] = ['FCFA', 'EUR', 'USD'];

function isCurrency(value: string | null): value is Currency {
  return value !== null && CURRENCIES.includes(value as Currency);
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === STORAGE_KEY) {
      onStoreChange();
    }
  };

  window.addEventListener('storage', handleStorage);
  window.addEventListener(STORAGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener(STORAGE_EVENT, onStoreChange);
  };
}

function getCurrencySnapshot(): Currency {
  if (typeof window === 'undefined') {
    return 'FCFA';
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isCurrency(stored) ? stored : 'FCFA';
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const currency: Currency = useSyncExternalStore(
    subscribe,
    getCurrencySnapshot,
    () => 'FCFA'
  );
  const [rates, setRates] = useState<Record<Currency, number>>(FALLBACK_RATES);

  useEffect(() => {
    fetch('/api/exchange-rates')
      .then((r) => r.json())
      .then((data) => {
        if (data.rates) setRates(data.rates);
      })
      .catch(() => {
        // Silent fallback - FALLBACK_RATES stay active
      });
  }, []);

  const setCurrency = (c: Currency) => {
    window.localStorage.setItem(STORAGE_KEY, c);
    window.dispatchEvent(new Event(STORAGE_EVENT));
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
