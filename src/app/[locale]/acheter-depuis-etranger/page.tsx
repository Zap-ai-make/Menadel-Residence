import type { Metadata } from 'next';
import { ContactFormInline } from '@/components/contact/ContactFormInline';

const CONTENT = {
  fr: {
    meta: {
      title: 'Acheter depuis l\'étranger',
      description: 'Guide complet pour acheter un bien immobilier au Burkina Faso depuis la France, Belgique, Canada ou tout autre pays. Procuration, virement international, délais.',
    },
    eyebrow: 'Parcours diaspora',
    heading: 'Acheter depuis l\'étranger',
    introTitle: 'Nos engagements de transparence',
    introPoints: [
      'Toutes les communications officielles vous sont envoyées directement — jamais uniquement à votre représentant',
      'Coordonnées bancaires du notaire vérifiables et confirmées par appel vidéo sur demande',
      'Rapport de visite en direct (photos, vidéo) avant tout engagement financier',
      'Copie numérique de tous les actes dès signature',
    ],
    steps: [
      {
        n: '1',
        title: 'Premier contact & sélection',
        items: [
          'Vous nous contactez par WhatsApp, email ou via le Configurateur G3',
          'Nous échangeons sur votre projet, votre budget et vos préférences',
          'Nous sélectionnons ensemble les biens correspondants',
          'Organisation de visites virtuelles (photos HD, vidéos, appel vidéo sur place)',
        ],
      },
      {
        n: '2',
        title: 'Procuration notariée',
        items: [
          'Vous établissez une procuration auprès d\'un notaire local (France, Belgique, Canada…)',
          'Nous vous fournissons le modèle exact à utiliser',
          'La procuration est authentifiée et envoyée à notre notaire partenaire à Ouagadougou',
          'Ce document permet de signer le compromis et les actes en votre nom',
        ],
      },
      {
        n: '3',
        title: 'Virement international & sécurisation',
        items: [
          'Paiement par virement SWIFT vers le compte séquestre du notaire',
          'Jamais de paiement vers un compte particulier',
          'Coordonnées bancaires vérifiables du notaire',
          'Possibilité d\'organiser un appel de vérification à trois (vous, nous, notaire)',
        ],
      },
      {
        n: '4',
        title: 'Titre foncier & remise',
        items: [
          'Signature de l\'acte par votre représentant mandaté',
          'Établissement du titre foncier (délai 2–6 mois selon la nature du bien)',
          'Transmission de l\'original par courrier sécurisé ou récupération par votre représentant',
          'Envoi d\'une copie numérisée dès signature',
        ],
      },
    ],
    formTitle: 'Démarrer mon projet',
    formSubtitle: 'Partagez votre projet — nous vous répondons dans les 24h avec une première sélection de biens.',
  },
  en: {
    meta: {
      title: 'Buying from abroad',
      description: 'Complete guide to buying real estate in Burkina Faso from France, Belgium, Canada or anywhere else. Power of attorney, international wire transfer, timelines.',
    },
    eyebrow: 'Diaspora journey',
    heading: 'Buying from abroad',
    introTitle: 'Our transparency commitments',
    introPoints: [
      'All official communications are sent directly to you — never only to your representative',
      'Notary bank details are verifiable and confirmed by video call on request',
      'Live visit report (photos, video) before any financial commitment',
      'Digital copy of all deeds delivered immediately upon signing',
    ],
    steps: [
      {
        n: '1',
        title: 'First contact & selection',
        items: [
          'Reach us via WhatsApp, email or the G3 Configurator',
          'We discuss your project, budget and preferences',
          'We select matching properties together',
          'Virtual tours arranged (HD photos, video, live video call on site)',
        ],
      },
      {
        n: '2',
        title: 'Notarised power of attorney',
        items: [
          'You grant a power of attorney through your local notary (France, Belgium, Canada…)',
          'We provide the exact template to use',
          'The POA is authenticated and sent to our partner notary in Ouagadougou',
          'This document allows signing the contract and deeds on your behalf',
        ],
      },
      {
        n: '3',
        title: 'International wire transfer & security',
        items: [
          'Payment by SWIFT transfer to the notary\'s escrow account',
          'Never any payment to a private account',
          'Verifiable bank details for the notary',
          'Option to arrange a three-way verification call (you, us, notary)',
        ],
      },
      {
        n: '4',
        title: 'Land title & handover',
        items: [
          'Deed signed by your mandated representative',
          'Land title registration (2–6 months depending on property type)',
          'Original sent by secure mail or collected by your representative',
          'Scanned copy sent immediately upon signing',
        ],
      },
    ],
    formTitle: 'Start my project',
    formSubtitle: 'Share your project — we reply within 24h with an initial property selection.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = locale === 'en' ? CONTENT.en : CONTENT.fr;
  return { title: c.meta.title, description: c.meta.description };
}

export default async function AcheterDepuisEtrangerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = locale === 'en' ? CONTENT.en : CONTENT.fr;

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Main Layout: Form Left, Content Right */}
      <div className="grid grid-cols-1 lg:grid-cols-[480px_1fr] gap-12 lg:gap-20">
        {/* LEFT COLUMN: Form */}
        <div className="order-2 lg:order-1">
          <div className="sticky top-8">
            <div className="p-6 rounded-xl bg-[var(--color-anthracite-soft)] border border-white/10">
              <h2 className="font-serif text-2xl font-semibold text-white mb-2">
                {c.formTitle}
              </h2>
              <p className="text-sm text-[var(--color-white-muted)] mb-6">
                {c.formSubtitle}
              </p>
              <ContactFormInline source="achat-etranger" />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Content */}
        <div className="order-1 lg:order-2">
          {/* Header */}
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)] mb-3">
              {c.eyebrow}
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-white leading-tight mb-4">
              {c.heading}
            </h1>
            <div className="max-w-2xl">
              <p className="text-[var(--color-gold)] font-semibold mb-3">{c.introTitle}</p>
              <ul className="space-y-2">
                {c.introPoints.map((point, idx) => (
                  <li key={idx} className="text-[var(--color-white-muted)] text-base leading-relaxed flex gap-2">
                    <span className="text-[var(--color-gold)] flex-shrink-0">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Étapes du parcours diaspora */}
          <div className="space-y-4">
            {c.steps.map((step) => (
              <div key={step.n} className="p-5 rounded-xl bg-[var(--color-anthracite-soft)] border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm text-[var(--color-gold)] font-bold">{step.n}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                    <ul className="space-y-1">
                      {step.items.map((item, idx) => (
                        <li key={idx} className="text-sm text-[var(--color-white-muted)] leading-relaxed flex gap-2">
                          <span className="text-[var(--color-gold)] flex-shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
