'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const STORAGE_KEY = 'gdpr-consent';

export function GdprBanner() {
  const t = useTranslations('gdpr');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentement cookies"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[var(--color-anthracite-soft)]/95 backdrop-blur-sm shadow-xl"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <p className="text-xs text-[var(--color-white-muted)] flex-1 leading-relaxed">
          {t('message')}{' '}
          <Link
            href="/politique-confidentialite"
            className="underline text-[var(--color-gold)] hover:text-[var(--color-gold-light)] transition-colors"
          >
            {t('learnMore')}
          </Link>
        </p>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={decline}
            className="text-xs px-3 py-1.5 rounded border border-white/20 text-[var(--color-white-muted)] hover:border-white/40 hover:text-white transition-colors"
          >
            {t('decline')}
          </button>
          <button
            onClick={accept}
            className="text-xs px-4 py-1.5 rounded bg-[var(--color-gold)] text-[var(--color-anthracite)] font-semibold hover:bg-[var(--color-gold-light)] transition-colors"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
