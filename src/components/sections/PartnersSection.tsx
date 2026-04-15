'use client';

import { useLocale } from 'next-intl';

const CONTENT = {
  fr: {
    eyebrow: 'Ils nous font confiance',
    heading: 'Nos partenaires',
    subtitle: 'Un réseau de partenaires fiables pour sécuriser votre investissement',
  },
  en: {
    eyebrow: 'They trust us',
    heading: 'Our partners',
    subtitle: 'A network of reliable partners to secure your investment',
  },
};

// Logos fictifs en attendant les vrais partenaires
const PLACEHOLDER_PARTNERS = [
  { name: 'Notaire Partenaire', category: 'Notaire' },
  { name: 'Banque Immobilière', category: 'Banque' },
  { name: 'Cabinet Juridique', category: 'Juridique' },
  { name: 'Agence Foncière', category: 'Foncier' },
  { name: 'Expertise BTP', category: 'Construction' },
  { name: 'Assurance Habitat', category: 'Assurance' },
];

export function PartnersSection() {
  const locale = useLocale() as 'fr' | 'en';
  const c = CONTENT[locale] ?? CONTENT.fr;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--color-gold)] mb-3">
            {c.eyebrow}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white mb-3">
            {c.heading}
          </h2>
          <p className="text-[var(--color-white-muted)] text-sm max-w-xl mx-auto">
            {c.subtitle}
          </p>
        </div>

        {/* Partners grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {PLACEHOLDER_PARTNERS.map((partner, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-6 rounded-xl bg-[var(--color-anthracite-soft)] border border-white/10 hover:border-[var(--color-gold)]/30 transition-colors group"
            >
              {/* Placeholder logo */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-gold)]/20 to-[var(--color-gold)]/5 border border-[var(--color-gold)]/20 flex items-center justify-center mb-3 group-hover:border-[var(--color-gold)]/40 transition-colors">
                <span className="text-2xl font-serif font-bold text-[var(--color-gold)]/60">
                  {partner.name.charAt(0)}
                </span>
              </div>
              <p className="text-xs text-[var(--color-white-muted)] text-center">
                {partner.category}
              </p>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-xs text-[var(--color-white-muted)]/50 mt-8 italic">
          {locale === 'fr'
            ? 'Logos partenaires en cours de validation'
            : 'Partner logos pending validation'}
        </p>
      </div>
    </section>
  );
}
