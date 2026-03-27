'use client';

import { useTranslations } from 'next-intl';
import { useCurrency } from '@/components/providers/CurrencyProvider';
import { type Currency } from '@/lib/currency';
import { cn } from '@/lib/utils';

const CURRENCIES: Currency[] = ['FCFA', 'EUR', 'USD'];

export function CurrencySwitcher({ className }: { className?: string }) {
  const t = useTranslations('currency');
  const { currency, setCurrency } = useCurrency();

  return (
    <div
      role="radiogroup"
      aria-label={t('label')}
      className={cn('flex items-center rounded border border-white/15 overflow-hidden text-xs', className)}
    >
      {CURRENCIES.map((c) => (
        <button
          key={c}
          role="radio"
          aria-checked={currency === c}
          onClick={() => setCurrency(c)}
          className={cn(
            'px-2 py-1 transition-colors font-medium',
            currency === c
              ? 'bg-[var(--color-gold)] text-[var(--color-anthracite)]'
              : 'text-[var(--color-white-muted)] hover:text-white hover:bg-white/5'
          )}
        >
          {t(c)}
        </button>
      ))}
    </div>
  );
}
