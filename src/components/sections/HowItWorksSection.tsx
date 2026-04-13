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
      { num: '01', title: 'Conseil personnalisé', desc: 'Dès le premier contact (WhatsApp, formulaire ou Configurateur G3), nos conseillers analysent avec précision votre projet. Objectif : comprendre vos attentes et vous orienter vers les meilleures opportunités du marché.' },
      { num: '02', title: 'Sélection premium & visites', desc: 'Nous effectuons une sélection rigoureuse de biens correspondant à vos critères. Chaque visite est organisée avec professionnalisme : photos haute qualité, rapports détaillés, analyse du potentiel du bien.' },
      { num: '03', title: 'Négociation stratégique', desc: 'Nous défendons vos intérêts pour obtenir les conditions les plus avantageuses. L\'accord est formalisé par écrit, puis sécurisé par la signature d\'un compromis de vente auprès de notre notaire partenaire.' },
      { num: '04', title: 'Sécurisation juridique & titre foncier', desc: 'Nous assurons un suivi administratif complet jusqu\'à l\'obtention du titre foncier. Délai moyen : 2 à 6 mois selon le bien. Remise de l\'original et transmission d\'une copie numérique sécurisée.' },
    ],
    stepsDiaspora: [
      { num: '01', title: 'Accompagnement digital immersif', desc: 'Profitez d\'un suivi à distance complet : échanges WhatsApp & appels vidéo, visites virtuelles en temps réel, photos HD & vidéos terrain. Vous prenez vos décisions comme si vous étiez sur place.' },
      { num: '02', title: 'Représentation légale simplifiée', desc: 'Nous vous accompagnons dans l\'établissement d\'une procuration notariée dans votre pays de résidence. Un modèle conforme vous est fourni pour une mise en place rapide et sécurisée.' },
      { num: '03', title: 'Paiement 100% sécurisé', desc: 'Toutes les transactions sont effectuées exclusivement via compte séquestre notarial. Zéro transfert vers des comptes personnels. Un contrôle indépendant est possible à tout moment.' },
      { num: '04', title: 'Livraison du titre à distance', desc: 'Une fois le titre foncier établi : envoi sécurisé (courrier international) ou remise à votre représentant local. Copie numérique transmise immédiatement. Traçabilité complète des documents.' },
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
      { num: '01', title: 'Personalized advice', desc: 'From first contact (WhatsApp, form or G3 Configurator), our advisors carefully analyze your project. Goal: understand your expectations and guide you to the best market opportunities.' },
      { num: '02', title: 'Premium selection & visits', desc: 'We carefully select properties matching your criteria. Each visit is professionally organized: high-quality photos, detailed reports, property potential analysis.' },
      { num: '03', title: 'Strategic negotiation', desc: 'We defend your interests to obtain the most advantageous conditions. The agreement is formalized in writing, then secured by signing a sales agreement with our partner notary.' },
      { num: '04', title: 'Legal security & land title', desc: 'We ensure complete administrative follow-up until the land title is obtained. Average time: 2 to 6 months. Original delivered and secure digital copy transmitted.' },
    ],
    stepsDiaspora: [
      { num: '01', title: 'Immersive digital support', desc: 'Enjoy complete remote support: WhatsApp exchanges & video calls, real-time virtual tours, HD photos & field videos. Make your decisions as if you were on site.' },
      { num: '02', title: 'Simplified legal representation', desc: 'We assist you in establishing a notarized power of attorney in your country of residence. A compliant template is provided for quick and secure setup.' },
      { num: '03', title: '100% secure payment', desc: 'All transactions are made exclusively via notarial escrow account. Zero transfers to personal accounts. Independent verification available at any time.' },
      { num: '04', title: 'Remote title delivery', desc: 'Once the land title is established: secure shipping (international mail) or delivery to your local representative. Digital copy transmitted immediately. Full document traceability.' },
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
