'use client';

import { useCurrency } from '@/components/providers/CurrencyProvider';

interface PriceDisplayProps {
  priceXof: number;
  perMonth?: boolean;
  className?: string;
}

export function PriceDisplay({ priceXof, perMonth = false, className }: PriceDisplayProps) {
  const { format } = useCurrency();
  return (
    <p className={className ?? 'font-serif text-3xl font-semibold text-[var(--color-gold)]'}>
      {format(priceXof)}
      {perMonth && <span className="text-sm font-normal text-[var(--color-white-muted)] ml-1">/mois</span>}
    </p>
  );
}
