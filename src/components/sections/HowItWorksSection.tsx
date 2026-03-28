'use client';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';

const CONTENT = {
  fr: {
    eyebrow: 'Comment ça marche',
    heading1: 'Un processus transparent,',
    headingEm: 'étape par étape',
    localTitle: 'Acheteur local',
    diasporaTitle: 'Diaspora — depuis l\'étranger',
    diasporaCta: 'Guide complet achat depuis l\'étranger →',
    stepsLocal: [
      { num: '01', title: 'Premier contact', desc: 'Vous nous contactez via WhatsApp, le formulaire ou le Configurateur G3. On discute de votre projet et budget.' },
      { num: '02', title: 'Sélection & visite', desc: 'Nous sélectionnons les biens correspondants et organisons les visites. Vous recevez photos et rapport de visite.' },
      { num: '03', title: 'Négociation & compromis', desc: 'Prix négocié confirmé par écrit. Signature du compromis chez notre notaire partenaire.' },
      { num: '04', title: 'Titre foncier', desc: 'Établissement du titre foncier (2–6 mois selon le bien). Remise de l\'original et copie numérique.' },
    ],
    stepsDiaspora: [
      { num: '01', title: 'Contact & visites virtuelles', desc: 'Échange WhatsApp + appel vidéo. Visites virtuelles avec photos HD et vidéo depuis le terrain.' },
      { num: '02', title: 'Procuration notariée', desc: 'Vous établissez une procuration chez votre notaire local. Nous fournissons le modèle exact.' },
      { num: '03', title: 'Virement sécurisé', desc: 'Paiement vers le compte séquestre du notaire. Jamais vers un compte particulier. Vérification possible par appel.' },
      { num: '04', title: 'Titre & remise à distance', desc: 'Titre foncier transmis par courrier sécurisé ou via votre représentant local. Copie numérique immédiate.' },
    ],
  },
  en: {
    eyebrow: 'How it works',
    heading1: 'A transparent process,',
    headingEm: 'step by step',
    localTitle: 'Local buyer',
    diasporaTitle: 'Diaspora — buying from abroad',
    diasporaCta: 'Full guide: buying from abroad →',
    stepsLocal: [
      { num: '01', title: 'First contact', desc: 'Reach us via WhatsApp, the contact form or the G3 Configurator. We discuss your project and budget.' },
      { num: '02', title: 'Selection & visit', desc: 'We select matching properties and arrange viewings. You receive photos and a visit report.' },
      { num: '03', title: 'Negotiation & contract', desc: 'Negotiated price confirmed in writing. Contract signed at our partner notary.' },
      { num: '04', title: 'Land title', desc: 'Land title registration (2–6 months depending on the property). Original and digital copy delivered to you.' },
    ],
    stepsDiaspora: [
      { num: '01', title: 'Contact & virtual tours', desc: 'WhatsApp exchange + video call. Virtual tours with HD photos and on-site video.' },
      { num: '02', title: 'Notarised power of attorney', desc: 'You grant a power of attorney through your local notary. We provide the exact template.' },
      { num: '03', title: 'Secure wire transfer', desc: 'Payment to the notary\'s escrow account — never to a private account. Verification call available.' },
      { num: '04', title: 'Title & remote handover', desc: 'Land title sent by secure mail or via your local representative. Digital copy delivered immediately.' },
    ],
  },
};

export function HowItWorksSection() {
  const locale = useLocale() as 'fr' | 'en';
  const c = CONTENT[locale] ?? CONTENT.fr;

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10" aria-labelledby="how-heading">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--color-gold)] mb-3">
            {c.eyebrow}
          </p>
          <h2
            id="how-heading"
            className="font-serif text-3xl sm:text-4xl font-semibold text-white"
          >
            {c.heading1}<br />
            <em className="text-[var(--color-gold)] not-italic">{c.headingEm}</em>
          </h2>
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Local */}
          <div className="p-6 rounded-2xl bg-[var(--color-anthracite-soft)] border border-white/10">
            <h3 className="font-serif text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[var(--color-gold)]/15 border border-[var(--color-gold)]/30 flex items-center justify-center" aria-hidden="true">
                <span className="text-[10px] text-[var(--color-gold)]">🏠</span>
              </span>
              {c.localTitle}
            </h3>
            <div className="space-y-6">
              {c.stepsLocal.map((step) => (
                <div key={step.num} className="flex gap-4">
                  <div className="flex-shrink-0 w-9 h-9 rounded-full border border-[var(--color-gold)]/25 flex items-center justify-center">
                    <span className="font-serif text-xs text-[var(--color-gold)] font-semibold">{step.num}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-white mb-0.5">{step.title}</p>
                    <p className="text-xs text-[var(--color-white-muted)] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Diaspora */}
          <div className="p-6 rounded-2xl bg-[var(--color-anthracite-soft)] border border-[var(--color-gold)]/20">
            <h3 className="font-serif text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[var(--color-gold)]/15 border border-[var(--color-gold)]/30 flex items-center justify-center" aria-hidden="true">
                <span className="text-[10px] text-[var(--color-gold)]">🌍</span>
              </span>
              {c.diasporaTitle}
            </h3>
            <div className="space-y-6">
              {c.stepsDiaspora.map((step) => (
                <div key={step.num} className="flex gap-4">
                  <div className="flex-shrink-0 w-9 h-9 rounded-full border border-[var(--color-gold)]/25 flex items-center justify-center">
                    <span className="font-serif text-xs text-[var(--color-gold)] font-semibold">{step.num}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-white mb-0.5">{step.title}</p>
                    <p className="text-xs text-[var(--color-white-muted)] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/acheter-depuis-etranger"
              className="inline-block mt-6 text-xs text-[var(--color-gold)] hover:underline"
            >
              {c.diasporaCta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
