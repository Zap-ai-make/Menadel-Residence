import { useTranslations } from 'next-intl';
import { G3Widget } from '@/components/g3/G3Widget';

export function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section
      className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 py-[60px] overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background gradient + gold halo */}
      <div className="absolute inset-0 hero-gradient" aria-hidden="true" />
      <div className="absolute inset-0 hero-halo" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 w-full text-center">

        {/* Eyebrow */}
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--color-gold)] mb-5">
          {t('eyebrow')}
        </p>

        {/* Headline — clamp(36px, 6vw, 72px) comme la maquette, line-height 1.1, max-w 700px
            Utilise <em> (pas <span>) pour hériter la taille — le CSS global force
            span à text-base ce qui écraserait la taille héritée du h1 */}
        <h1
          id="hero-heading"
          className="font-serif font-semibold text-white leading-[1.1] mb-5 mx-auto"
          style={{ fontSize: 'clamp(36px, 6vw, 72px)', maxWidth: '700px' }}
        >
          {t('tagline1')}<br />
          <em className="text-[var(--color-gold)]">{t('taglineEm')}</em><br />
          {t('tagline2')}
        </h1>

        {/* Subtitle — max-w 480px, line-height 1.6, mb 48px comme la maquette */}
        <p className="text-base text-[var(--color-white-muted)] mb-12 mx-auto leading-[1.6]"
           style={{ maxWidth: '480px' }}>
          {t('subtitle')}
        </p>

        {/* G3 Widget */}
        <G3Widget variant="hero" />

        {/* Trust signals — utilise <b> pour éviter l'override global sur <span> */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <b className="flex items-center gap-1.5 text-[11px] font-normal text-[var(--color-white-muted)]/70">
            <em className="not-italic text-[var(--color-gold)]">✓</em>
            {t('trust1')}
          </b>
          <b className="flex items-center gap-1.5 text-[11px] font-normal text-[var(--color-white-muted)]/70">
            <em className="not-italic text-[var(--color-gold)]">✓</em>
            {t('trust2')}
          </b>
          <b className="flex items-center gap-1.5 text-[11px] font-normal text-[var(--color-white-muted)]/70">
            <em className="not-italic text-[var(--color-gold)]">✓</em>
            {t('trust3')}
          </b>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40"
        aria-hidden="true"
      >
        <b className="text-[10px] font-normal text-[var(--color-white-muted)] uppercase tracking-widest">
          Catalogue
        </b>
        <div className="w-px h-8 bg-[var(--color-white-muted)]" />
      </div>
    </section>
  );
}
