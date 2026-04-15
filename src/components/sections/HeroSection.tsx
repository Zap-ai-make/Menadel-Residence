'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { G3Widget } from '@/components/g3/G3Widget';
import { TypewriterText } from '@/components/ui/TypewriterText';

export function HeroSection() {
  const t = useTranslations('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 py-[60px] overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      >
        <source src="/videos/Luxury_Real_Estate_Video_Burkina_Faso.mp4" type="video/mp4" />
      </video>

      {/* Background gradient + gold halo overlays */}
      <div className="absolute inset-0 hero-gradient opacity-60" aria-hidden="true" />
      <div className="absolute inset-0 hero-halo" aria-hidden="true" />

      {/* Veo logo mask - disappears on scroll */}
      <div
        className={`absolute bottom-0 right-0 w-48 h-32 bg-linear-to-tl from-(--color-anthracite) via-(--color-anthracite)/80 to-transparent transition-opacity duration-500 ${
          isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 w-full text-center">

        {/* Eyebrow */}
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--color-gold)] mb-5 animate-fade-in-up opacity-0"
          style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}
        >
          {t('eyebrow')}
        </p>

        {/* Headline — clamp(36px, 6vw, 72px) comme la maquette, line-height 1.1, max-w 700px
            Utilise <em> (pas <span>) pour hériter la taille — le CSS global force
            span à text-base ce qui écraserait la taille héritée du h1 */}
        <h1
          id="hero-heading"
          className="font-serif font-semibold text-white leading-[1.1] mb-5 mx-auto animate-fade-in-up opacity-0"
          style={{ fontSize: 'clamp(36px, 6vw, 72px)', maxWidth: '700px', animationDelay: '200ms', animationFillMode: 'forwards' }}
        >
          {t('tagline1')}<br />
          <em className="text-[var(--color-gold)]">{t('taglineEm')}</em><br />
          <TypewriterText
            phrases={[
              'en toute confiance.',
              'en toute sérénité.',
              'où que vous soyez.'
            ]}
            typingSpeed={80}
            deletingSpeed={40}
            pauseDuration={2500}
            className="text-white"
          />
        </h1>

        {/* Subtitle — max-w 480px, line-height 1.6, mb 48px comme la maquette */}
        <p
          className="text-base text-[var(--color-white-muted)] mb-12 mx-auto leading-[1.6] animate-fade-in-up opacity-0"
          style={{ maxWidth: '480px', animationDelay: '400ms', animationFillMode: 'forwards' }}
        >
          {t('subtitle')}
        </p>

        {/* G3 Widget */}
        <div
          className="animate-fade-in-up opacity-0"
          style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
        >
          <G3Widget variant="hero" />
        </div>

        {/* Trust signals — utilise <b> pour éviter l'override global sur <span> */}
        <div
          className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 animate-fade-in-up opacity-0"
          style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}
        >
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
