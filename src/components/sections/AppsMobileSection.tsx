'use client';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';

const CONTENT = {
  fr: {
    eyebrow: 'Agence numérique',
    heading1: 'Deux apps mobiles',
    headingEm: 'incluses dans votre mandat',
    subtitle: 'Là où les autres agences s\'arrêtent à la remise des clés, Menadel Residence va plus loin. Propriétaire ou locataire, chacun pilote sa gestion depuis son téléphone.',
    badge: 'Bientôt disponible',
    bailleur: {
      tag: 'Propriétaire',
      name: 'Menadel Bailleur',
      tagline: 'Votre patrimoine dans votre poche',
      screens: [
        { label: 'Tableau de bord', value: '3 biens · 285 000 FCFA/mois' },
        { label: 'Dernier virement', value: '5 mars 2025 · reçu ✓' },
        { label: 'État des biens', value: 'Tous occupés' },
      ],
      features: [
        '📊 Tableau de bord en temps réel',
        '💸 Virements & relevés mensuels',
        '📋 Contrats et documents légaux',
        '🔔 Alertes loyer, travaux, impayés',
      ],
    },
    locataire: {
      tag: 'Locataire',
      name: 'Menadel Locataire',
      tagline: 'Loyer, quittance, contrat — tout en un',
      screens: [
        { label: 'Loyer du mois', value: '95 000 FCFA · à payer' },
        { label: 'Quittance mars', value: 'Télécharger PDF ↓' },
        { label: 'Contrat de bail', value: 'En cours · 12 mois' },
      ],
      features: [
        '💳 Paiement loyer (Mobile Money)',
        '🧾 Quittances téléchargeables',
        '📄 Accès au contrat de bail',
        '🔧 Demandes d\'intervention',
      ],
    },
    storeLabel: 'Disponible sur',
    notifyLabel: 'Me prévenir au lancement →',
    cta: 'Découvrir la gestion locative →',
  },
  en: {
    eyebrow: 'Digital agency',
    heading1: 'Two mobile apps',
    headingEm: 'included with your mandate',
    subtitle: 'Where other agencies stop at handing over the keys, Menadel Residence goes further. Owner or tenant, everyone manages their rental from their phone.',
    badge: 'Coming soon',
    bailleur: {
      tag: 'Owner',
      name: 'Menadel Bailleur',
      tagline: 'Your portfolio in your pocket',
      screens: [
        { label: 'Dashboard', value: '3 properties · 285,000 FCFA/mo' },
        { label: 'Last transfer', value: 'March 5 2025 · received ✓' },
        { label: 'Property status', value: 'All occupied' },
      ],
      features: [
        '📊 Real-time portfolio dashboard',
        '💸 Transfers & monthly statements',
        '📋 Contracts and legal documents',
        '🔔 Alerts: rent, works, arrears',
      ],
    },
    locataire: {
      tag: 'Tenant',
      name: 'Menadel Locataire',
      tagline: 'Rent, receipt, lease — all in one',
      screens: [
        { label: 'This month\'s rent', value: '95,000 FCFA · due' },
        { label: 'March receipt', value: 'Download PDF ↓' },
        { label: 'Lease contract', value: 'Active · 12 months' },
      ],
      features: [
        '💳 Rent payment (Mobile Money)',
        '🧾 Downloadable receipts',
        '📄 Lease contract access',
        '🔧 Maintenance requests',
      ],
    },
    storeLabel: 'Available on',
    notifyLabel: 'Notify me at launch →',
    cta: 'Discover property management →',
  },
};

function PhoneMockup({ screens }: { screens: { label: string; value: string }[] }) {
  return (
    <div className="relative mx-auto" style={{ width: '148px' }}>
      <div className="relative rounded-[1.75rem] border-[3px] border-[#333] bg-[#0d0d0d] pb-3 pt-3">
        {/* Notch */}
        <div className="flex justify-center mb-2">
          <div className="w-8 h-1 rounded-full bg-[#333]" />
        </div>
        {/* Status bar */}
        <div className="flex justify-between items-center px-3 mb-2">
          <span className="text-[8px] text-white/30">9:41</span>
          <span className="text-[8px] text-white/30">●●●</span>
        </div>
        {/* App title bar */}
        <div className="px-3 mb-2.5">
          <div className="h-1.5 w-14 rounded bg-[var(--color-gold)]/50 mb-1" />
          <div className="h-1 w-9 rounded bg-white/15" />
        </div>
        {/* Data rows */}
        <div className="px-3 space-y-1.5">
          {screens.map((s) => (
            <div key={s.label} className="rounded-lg bg-white/6 px-2 py-1.5">
              <div className="text-[7.5px] text-white/35 mb-0.5">{s.label}</div>
              <div className="text-[8.5px] text-white/75 font-medium leading-tight">{s.value}</div>
            </div>
          ))}
        </div>
        {/* Bottom nav */}
        <div className="flex justify-center gap-3 mt-3 mb-1 px-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`flex-1 h-5 rounded-md ${i === 1 ? 'bg-[var(--color-gold)]/25' : 'bg-white/8'}`} />
          ))}
        </div>
        {/* Home bar */}
        <div className="flex justify-center mt-2">
          <div className="w-7 h-0.5 rounded-full bg-white/20" />
        </div>
      </div>
      {/* Glow */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-[var(--color-gold)]/15 rounded-full blur-xl pointer-events-none" />
    </div>
  );
}

export function AppsMobileSection() {
  const locale = useLocale() as 'fr' | 'en';
  const c = CONTENT[locale] ?? CONTENT.fr;

  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10 overflow-hidden"
      aria-labelledby="apps-heading"
    >
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--color-gold)]">
              {c.eyebrow}
            </p>
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/30 text-[var(--color-gold)]">
              {c.badge}
            </span>
          </div>
          <h2
            id="apps-heading"
            className="font-serif text-3xl sm:text-4xl font-semibold text-white mb-4"
          >
            {c.heading1}<br />
            <em className="text-[var(--color-gold)] not-italic">{c.headingEm}</em>
          </h2>
          <p className="text-[var(--color-white-muted)] text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            {c.subtitle}
          </p>
        </div>

        {/* Two app cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          {/* ── Bailleur ── */}
          <div className="relative rounded-2xl border border-[var(--color-gold)]/20 bg-gradient-to-br from-[var(--color-gold)]/8 to-transparent p-6 sm:p-8 overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[var(--color-gold)]/5 blur-3xl pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row gap-8 items-center sm:items-start">
              <PhoneMockup screens={c.bailleur.screens} />

              <div className="flex-1 text-center sm:text-left">
                <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold)] bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/20 px-2.5 py-1 rounded-full mb-3">
                  {c.bailleur.tag}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-white mb-1">
                  {c.bailleur.name}
                </h3>
                <p className="text-[var(--color-gold)] text-sm mb-4">{c.bailleur.tagline}</p>

                <ul className="space-y-2 mb-6 text-left">
                  {c.bailleur.features.map((f) => (
                    <li key={f} className="text-sm text-[var(--color-white-muted)]">{f}</li>
                  ))}
                </ul>

                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[var(--color-white-muted)]/50 mb-2">
                    {c.storeLabel}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <StoreBadge type="apple" />
                    <StoreBadge type="google" />
                  </div>
                  <p className="text-[11px] text-[var(--color-gold)]/70 italic">{c.notifyLabel}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Locataire ── */}
          <div className="relative rounded-2xl border border-white/10 bg-[var(--color-anthracite-soft)] p-6 sm:p-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/3 blur-3xl pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row gap-8 items-center sm:items-start">
              <PhoneMockup screens={c.locataire.screens} />

              <div className="flex-1 text-center sm:text-left">
                <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-[var(--color-white-muted)]/70 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full mb-3">
                  {c.locataire.tag}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-white mb-1">
                  {c.locataire.name}
                </h3>
                <p className="text-[var(--color-white-muted)] text-sm mb-4">{c.locataire.tagline}</p>

                <ul className="space-y-2 mb-6 text-left">
                  {c.locataire.features.map((f) => (
                    <li key={f} className="text-sm text-[var(--color-white-muted)]">{f}</li>
                  ))}
                </ul>

                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[var(--color-white-muted)]/50 mb-2">
                    {c.storeLabel}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <StoreBadge type="apple" />
                    <StoreBadge type="google" />
                  </div>
                  <p className="text-[11px] text-[var(--color-gold)]/70 italic">{c.notifyLabel}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Link
            href="/gestion-locative"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-gold)] hover:text-[var(--color-gold-light)] transition-colors"
          >
            {c.cta}
          </Link>
        </div>

      </div>
    </section>
  );
}

function StoreBadge({ type }: { type: 'apple' | 'google' }) {
  return (
    <div
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 opacity-40 cursor-not-allowed select-none"
      aria-hidden="true"
    >
      {type === 'apple' ? (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white flex-shrink-0">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white flex-shrink-0">
          <path d="m3.18 23.76.02-.01 11.54-6.67-2.58-2.58zM.54 1.03C.2 1.38 0 1.94 0 2.67v18.67c0 .73.2 1.29.55 1.64l.09.08 10.46-10.46v-.25L.63.95zM21.8 10.43l-2.98-1.72-2.9 2.9 2.9 2.9 3-1.73c.86-.5.86-1.31-.02-1.85zM3.18.25 14.72 6.93l-2.58 2.58L3.2.26z" />
        </svg>
      )}
      <span className="text-[10px] text-white/60 font-medium">
        {type === 'apple' ? 'App Store' : 'Google Play'}
      </span>
    </div>
  );
}
