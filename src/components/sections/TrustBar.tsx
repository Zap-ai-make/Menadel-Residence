import { useTranslations } from 'next-intl';

const TRUST_STATS = [
  { key: 'propertiesAvailable', value: '30+' },
  { key: 'dealsDone', value: '120+' },
  { key: 'yearsExperience', value: '8' },
] as const;

export function TrustBar() {
  const t = useTranslations('trust');

  return (
    <section
      className="border-y border-white/10 bg-[var(--color-anthracite-soft)]"
      aria-label="Indicateurs de confiance"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center">
          {TRUST_STATS.map(({ key, value }) => (
            <div key={key} className="text-center">
              <div className="font-serif text-3xl font-semibold text-[var(--color-gold)]">
                {value}
              </div>
              <div className="text-xs text-[var(--color-white-muted)] mt-1">
                {t(key)}
              </div>
            </div>
          ))}

          {/* Formal agency badge */}
          <div className="text-center col-span-2 sm:col-span-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/5">
              <div className="w-2 h-2 rounded-full bg-[var(--color-gold)]" aria-hidden="true" />
              <span className="text-xs text-[var(--color-gold)] font-medium">
                {t('formalAgency')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
