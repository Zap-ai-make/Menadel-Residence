'use client';

import { useId, useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Loader2, AlertCircle } from 'lucide-react';
import { type Property } from '@/lib/types';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { cn } from '@/lib/utils';

type G3State =
  | 'idle'
  | 'focus'
  | 'loading'
  | 'result'
  | 'error-fallback'
  | 'offline';

interface G3Result {
  properties: Property[];
  marketContext?: {
    summary: string;
    type?: string;
    city?: string;
    priceRange?: string;
    trend?: string;
  };
  message: string;
}

interface G3WidgetProps {
  variant?: 'hero' | 'compact';
}

const PLACEHOLDER_BY_LOCALE = {
  fr: 'Décrivez votre projet : "Villa 3 chambres à Ouaga 2000, budget 35M FCFA..."',
  en: 'Looking for a villa near schools in Ouagadougou...',
} as const;

export function G3Widget({ variant = 'hero' }: G3WidgetProps) {
  const t = useTranslations('hero');
  const locale = useLocale();
  const inputId = useId();
  const resultsId = useId();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [state, setState] = useState<G3State>('idle');
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<G3Result | null>(null);

  const isHero = variant === 'hero';
  const isError = state === 'error-fallback' || state === 'offline';
  const placeholder =
    locale === 'fr' ? PLACEHOLDER_BY_LOCALE.fr : PLACEHOLDER_BY_LOCALE.en;

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!query.trim() || state === 'loading') return;

    setState('loading');
    setResult(null);

    try {
      const res = await fetch('/api/g3', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query.trim(), locale }),
      });

      if (!res.ok) {
        if (res.status === 503) {
          setState('offline');
          return;
        }

        setState('error-fallback');
        return;
      }

      const data = await res.json();

      if (data.fallback) {
        setState('error-fallback');
        return;
      }

      setResult(data);
      setState('result');
    } catch {
      setState('offline');
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const reset = () => {
    setState('idle');
    setResult(null);
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div
      className={cn('w-full', isHero ? 'max-w-[600px] mx-auto' : 'max-w-md')}
      role="search"
      aria-label="Configurateur Patrimonial G3"
    >
      <form
        onSubmit={handleSubmit}
        className={cn(
          'flex items-stretch rounded-xl overflow-hidden',
          'border-[1.5px]',
          isError
            ? 'border-[var(--color-status-sold)] shadow-[0_0_0_4px_rgba(239,68,68,0.1)]'
            : 'border-[var(--color-gold)] shadow-[0_0_0_4px_rgba(201,168,76,0.1)]',
          'bg-[var(--color-anthracite-soft)]',
          state === 'loading' && 'opacity-75'
        )}
      >
        <label htmlFor={inputId} className="sr-only">
          {t('g3Placeholder')}
        </label>

        <span
          className="flex items-center px-4 text-[var(--color-gold)] text-lg shrink-0 select-none"
          aria-hidden="true"
        >
          ✦
        </span>

        <textarea
          ref={inputRef}
          id={inputId}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (state === 'idle') setState('focus');
            if (!e.target.value && state === 'focus') setState('idle');
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => state === 'idle' && setState('focus')}
          onBlur={() => {
            if (!query && state === 'focus') setState('idle');
          }}
          placeholder={state === 'loading' ? t('g3Analyzing') : placeholder}
          disabled={state === 'loading'}
          rows={1}
          className="flex-1 bg-transparent border-none outline-none resize-none py-[18px] pr-2 text-[15px] text-white placeholder-[var(--color-white-muted)] focus:outline-none"
          aria-describedby={result ? resultsId : undefined}
        />

        <button
          type="submit"
          disabled={!query.trim() || state === 'loading'}
          className="bg-[var(--color-gold)] text-[var(--color-anthracite)] px-5 font-semibold text-[14px] shrink-0 whitespace-nowrap hover:bg-[var(--color-gold-light)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {state === 'loading' ? (
            <span className="flex items-center gap-1.5">
              <Loader2 size={13} className="animate-spin" />
              {t('g3Analyzing')}
            </span>
          ) : (
            t('g3Submit')
          )}
        </button>
      </form>

      {(state === 'idle' || state === 'focus') && (
        <p className="mt-2.5 text-[12px] text-[var(--color-white-muted)] text-center">
          {t('g3Label')}
          <em className="not-italic text-[var(--color-gold)]">
            {t('g3LabelHighlight')}
          </em>
        </p>
      )}

      {state === 'result' && result && (
        <div
          id={resultsId}
          aria-live="polite"
          className="mt-6 animate-fade-in-up text-left"
        >
          {result.marketContext && (
            <div className="mb-4 p-3 rounded-lg bg-[var(--color-anthracite-soft)] border border-white/10">
              <p className="text-xs text-[var(--color-white-muted)]">
                {result.marketContext.summary}
              </p>
              {result.marketContext.priceRange && (
                <p className="text-xs text-[var(--color-gold)] mt-1">
                  {locale === 'fr' ? 'Fourchette de marché' : 'Market range'}:{' '}
                  {result.marketContext.priceRange}
                </p>
              )}
            </div>
          )}

          <p className="text-sm text-[var(--color-white-muted)] mb-4">
            {result.message}
          </p>

          {result.properties.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {result.properties.slice(0, 3).map((p) => (
                <PropertyCard key={p.id} property={p} variant="list" />
              ))}
            </div>
          ) : (
            <p className="text-sm text-[var(--color-white-muted)]/60 text-center py-4">
              {locale === 'fr'
                ? 'Aucun bien ne correspond exactement à votre projet - nos conseillers peuvent vous aider.'
                : 'No property matches your project exactly - our advisors can help.'}
            </p>
          )}

          <button
            onClick={reset}
            className="mt-4 text-xs text-[var(--color-white-muted)]/50 hover:text-white underline transition-colors"
          >
            {locale === 'fr' ? 'Nouvelle recherche' : 'New search'}
          </button>
        </div>
      )}

      {isError && (
        <div
          aria-live="assertive"
          className="mt-4 p-4 rounded-xl bg-[var(--color-anthracite-soft)] border border-[var(--color-status-sold)]/20 animate-fade-in-up"
        >
          <div className="flex items-start gap-2 mb-3">
            <AlertCircle
              size={14}
              className="text-[var(--color-status-sold)] mt-0.5 shrink-0"
            />
            <p className="text-xs text-[var(--color-white-muted)]">
              {state === 'offline' ? t('g3Unavailable') : t('g3FallbackMsg')}
            </p>
          </div>
          <FallbackContactForm prefillMessage={query} />
        </div>
      )}
    </div>
  );
}

function FallbackContactForm({ prefillMessage }: { prefillMessage: string }) {
  const t = useTranslations('contact');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          message: prefillMessage,
          source: 'g3-fallback',
        }),
      });
      setSent(true);
    } catch {
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <p className="text-xs text-[var(--color-status-available)] py-2">
        ✓ {t('success')}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        placeholder={t('name')}
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="px-3 py-2 text-xs rounded-lg bg-[var(--color-anthracite)] border border-white/15 text-white placeholder-[var(--color-white-muted)]/50 focus:outline-none focus:border-[var(--color-gold)]"
      />
      <input
        type="tel"
        placeholder={t('phone')}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        className="px-3 py-2 text-xs rounded-lg bg-[var(--color-anthracite)] border border-white/15 text-white placeholder-[var(--color-white-muted)]/50 focus:outline-none focus:border-[var(--color-gold)]"
      />
      <button
        type="submit"
        disabled={sending}
        className="py-2 text-xs font-semibold rounded-lg bg-[var(--color-gold)] text-[var(--color-anthracite)] hover:bg-[var(--color-gold-light)] disabled:opacity-50 transition-colors"
      >
        {sending ? t('submitting') : t('submit')}
      </button>
    </form>
  );
}
