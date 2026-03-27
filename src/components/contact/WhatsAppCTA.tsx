'use client';

import { useTranslations } from 'next-intl';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

function isBusinessHours(): boolean {
  const now = new Date();
  const ouagaTime = new Date(
    now.toLocaleString('en-US', { timeZone: 'Africa/Ouagadougou' })
  );
  const hour = ouagaTime.getHours();
  const day = ouagaTime.getDay(); // 0=Sun, 6=Sat
  return day >= 1 && day <= 6 && hour >= 8 && hour < 18;
}

interface WhatsAppCTAProps {
  phone: string;
  message: string;
  variant?: 'floating' | 'card' | 'sheet' | 'prefilled';
  label?: string;
  className?: string;
}

export function WhatsAppCTA({
  phone,
  message,
  variant = 'card',
  label,
  className,
}: WhatsAppCTAProps) {
  const t = useTranslations('contact');
  const open = isBusinessHours();
  const resolvedLabel = label ?? t('whatsappLabel');
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  if (variant === 'floating') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={resolvedLabel}
        className={cn(
          'fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg',
          'bg-[#25D366] text-white font-medium text-sm hover:bg-[#20b557] transition-colors',
          className
        )}
      >
        <MessageCircle size={18} />
        WhatsApp
        {!open && (
          <span className="text-[10px] opacity-70 ml-1">· {t('whatsappOffHours')}</span>
        )}
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={resolvedLabel}
      className={cn(
        'flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-medium transition-colors',
        'bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20',
        className
      )}
    >
      <MessageCircle size={16} />
      <span>
        {resolvedLabel}
        {!open && (
          <span className="text-[10px] opacity-60 ml-1">· {t('whatsappOffHours')}</span>
        )}
      </span>
    </a>
  );
}
