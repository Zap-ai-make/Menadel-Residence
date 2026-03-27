import { useTranslations } from 'next-intl';
import { type PropertyStatus } from '@/lib/types';
import { cn } from '@/lib/utils';

const STATUS_CONFIG: Record<PropertyStatus, { color: string; dot: string; animated: boolean }> = {
  'disponible':     { color: 'text-[var(--color-status-available)] bg-[var(--color-status-available)]/10 border-[var(--color-status-available)]/20', dot: 'bg-[var(--color-status-available)]', animated: true },
  'sous-compromis': { color: 'text-[var(--color-status-pending)] bg-[var(--color-status-pending)]/10 border-[var(--color-status-pending)]/20', dot: 'bg-[var(--color-status-pending)]', animated: false },
  'vendu':          { color: 'text-[var(--color-status-sold)] bg-[var(--color-status-sold)]/10 border-[var(--color-status-sold)]/20', dot: 'bg-[var(--color-status-sold)]', animated: false },
};

const STATUS_KEYS: Record<PropertyStatus, 'available' | 'pending' | 'sold'> = {
  'disponible': 'available',
  'sous-compromis': 'pending',
  'vendu': 'sold',
};

interface StatusBadgeProps {
  status: PropertyStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const t = useTranslations('property');
  const config = STATUS_CONFIG[status];
  const label = t(STATUS_KEYS[status]);

  return (
    <span
      role="status"
      aria-label={`${t('statusLabel')} ${label}`}
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border',
        config.color,
        className
      )}
    >
      <span
        className={cn('w-1.5 h-1.5 rounded-full', config.dot, config.animated && 'animate-dot-pulse')}
        aria-hidden="true"
      />
      {label}
    </span>
  );
}
