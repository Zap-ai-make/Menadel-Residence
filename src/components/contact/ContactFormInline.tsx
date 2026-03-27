'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ContactFormInlineProps {
  propertyRef?: string;
  source?: string;
  prefillMessage?: string;
  compact?: boolean;
}

const COUNTRY_CODES = [
  { code: '+226', country: 'BF', flag: '🇧🇫' },
  { code: '+33', country: 'FR', flag: '🇫🇷' },
  { code: '+32', country: 'BE', flag: '🇧🇪' },
  { code: '+1', country: 'CA/US', flag: '🇨🇦' },
  { code: '+212', country: 'MA', flag: '🇲🇦' },
  { code: '+221', country: 'SN', flag: '🇸🇳' },
  { code: '+225', country: 'CI', flag: '🇨🇮' },
];

function detectCountryCode(): string {
  try {
    const lang = navigator.language || '';
    if (lang.includes('fr-BF') || lang.includes('bf')) return '+226';
    if (lang.includes('fr-FR') || lang.startsWith('fr')) return '+33';
    if (lang.includes('fr-BE')) return '+32';
    if (lang.startsWith('en')) return '+1';
  } catch {
    // ignore
  }
  return '';
}

export function ContactFormInline({
  propertyRef,
  source = 'formulaire-web',
  prefillMessage = '',
  compact = false,
}: ContactFormInlineProps) {
  const locale = useLocale();
  const t = useTranslations('contact');
  const [name, setName] = useState('');
  const [countryCode, setCountryCode] = useState(() =>
    typeof window !== 'undefined' ? detectCountryCode() : ''
  );
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(prefillMessage);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSending(true);

    const fullPhone = `${countryCode}${phone}`.trim();

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone: fullPhone,
          message,
          source,
          propertyRef,
          locale,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? t('error'));
        return;
      }

      setSent(true);
      const msg = propertyRef
        ? t('propertySuccess', { ref: propertyRef })
        : t('success');
      toast.success(msg);
    } catch {
      setError(t('error'));
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="py-4 text-center">
        <p className="text-[var(--color-status-available)] text-sm font-medium">
          ✓ {t('success')}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
      {/* Name */}
      <div>
        <label className="text-xs text-[var(--color-white-muted)] block mb-1" htmlFor="cf-name">
          {t('name')} *
        </label>
        <input
          id="cf-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
          className={inputClass}
          placeholder={t('name')}
        />
      </div>

      {/* Phone with country code */}
      <div>
        <label className="text-xs text-[var(--color-white-muted)] block mb-1" htmlFor="cf-phone">
          {t('phone')} *
        </label>
        <div className="flex gap-2">
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            aria-label={t('phone')}
            className="px-2 py-2 text-sm rounded-lg bg-[var(--color-anthracite)] border border-white/15 text-white focus:outline-none focus:border-[var(--color-gold)] w-28"
          >
            <option value=""></option>
            {COUNTRY_CODES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.code}
              </option>
            ))}
          </select>
          <input
            id="cf-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            autoComplete="tel"
            className={cn(inputClass, 'flex-1')}
            placeholder="XX XX XX XX"
          />
        </div>
      </div>

      {/* Message */}
      {!compact && (
        <div>
          <label className="text-xs text-[var(--color-white-muted)] block mb-1" htmlFor="cf-message">
            {t('message')}
          </label>
          <textarea
            id="cf-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className={cn(inputClass, 'resize-none')}
            placeholder={t('messagePlaceholder')}
          />
        </div>
      )}

      {/* Error */}
      {error && (
        <p role="alert" className="text-xs text-[var(--color-status-sold)]">
          ⚠ {error}
        </p>
      )}

      <button
        type="submit"
        disabled={sending || !name || !phone}
        className="py-2.5 text-sm font-semibold rounded-lg bg-[var(--color-gold)] text-[var(--color-anthracite)] hover:bg-[var(--color-gold-light)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {sending ? t('submitting') : t('submit')}
      </button>
    </form>
  );
}

const inputClass =
  'w-full px-3 py-2 text-sm rounded-lg bg-[var(--color-anthracite)] border border-white/15 text-white placeholder-[var(--color-white-muted)]/40 focus:outline-none focus:border-[var(--color-gold)] transition-colors';
