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
    intro: 'Vous vivez en France, en Belgique, au Canada ou ailleurs — nous gérons tout le processus sur place, en vous tenant informé à chaque étape. Votre investissement au Burkina Faso est possible, sécurisé et transparent.',
    steps: [
      {
        num: '01',
        title: 'Premier contact & sélection',
        text: 'Vous nous contactez par WhatsApp, email ou via le Configurateur G3. Nous échangeons sur votre projet, votre budget et vos préférences. Nous sélectionnons ensemble les biens correspondants et organisons des visites virtuelles (photos HD, vidéos, appel vidéo sur place).',
      },
      {
        num: '02',
        title: 'Procuration notariée',
        text: 'Pour signer le compromis et les actes en votre nom, vous établissez une procuration auprès d\'un notaire local (France, Belgique, Canada…). Nous vous fournissons le modèle exact. La procuration est authentifiée et envoyée à notre notaire partenaire à Ouagadougou.',
      },
      {
        num: '03',
        title: 'Virement international & sécurisation',
        text: 'Le paiement s\'effectue par virement SWIFT vers le compte séquestre du notaire — jamais vers un compte particulier. Nous vous communiquons les coordonnées bancaires vérifiables du notaire et vous pouvons organiser un appel de vérification à trois (vous, nous, notaire).',
      },
      {
        num: '04',
        title: 'Titre foncier & remise',
        text: 'Une fois l\'acte signé et le titre foncier établi (délai 2–6 mois selon la nature du bien), l\'original vous est transmis par courrier sécurisé ou récupéré par votre représentant. Nous vous envoyons une copie numérisée dès signature.',
      },
    ],
    trustTitle: 'Nos engagements de transparence',
    trustItems: [
      'Toutes les communications officielles vous sont envoyées directement — jamais uniquement à votre représentant',
      'Coordonnées bancaires du notaire vérifiables et confirmées par appel vidéo sur demande',
      'Rapport de visite en direct (photos, vidéo) avant tout engagement financier',
      'Copie numérique de tous les actes dès signature',
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
    intro: 'You live in France, Belgium, Canada or elsewhere — we handle the entire process on the ground, keeping you informed at every step. Your investment in Burkina Faso is possible, secure and transparent.',
    steps: [
      {
        num: '01',
        title: 'First contact & selection',
        text: 'Reach us via WhatsApp, email or the G3 Configurator. We discuss your project, budget and preferences. We select matching properties and arrange virtual tours (HD photos, video, live video call on site).',
      },
      {
        num: '02',
        title: 'Notarised power of attorney',
        text: 'To sign the contract and deeds on your behalf, you grant a power of attorney through your local notary (France, Belgium, Canada…). We provide the exact template. The POA is authenticated and sent to our partner notary in Ouagadougou.',
      },
      {
        num: '03',
        title: 'International wire transfer & security',
        text: 'Payment is made by SWIFT transfer to the notary\'s escrow account — never to a private account. We share verifiable bank details for the notary and can arrange a three-way verification call (you, us, notary).',
      },
      {
        num: '04',
        title: 'Land title & handover',
        text: 'Once the deed is signed and the land title registered (2–6 months depending on the property type), the original is sent to you by secure mail or collected by your representative. We send you a scanned copy immediately upon signing.',
      },
    ],
    trustTitle: 'Our transparency commitments',
    trustItems: [
      'All official communications are sent directly to you — never only to your representative',
      'Notary bank details are verifiable and confirmed by video call on request',
      'Live visit report (photos, video) before any financial commitment',
      'Digital copy of all deeds delivered immediately upon signing',
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
      <div className="max-w-3xl">
        {/* Header */}
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)] mb-3">
          {c.eyebrow}
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-white leading-tight mb-4">
          {c.heading}
        </h1>
        <p className="text-[var(--color-white-muted)] text-lg leading-relaxed mb-12 max-w-prose">
          {c.intro}
        </p>

        {/* Steps */}
        <div className="space-y-10 mb-16">
          {c.steps.map((step) => (
            <div key={step.num} className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border border-[var(--color-gold)]/30 flex items-center justify-center">
                <span className="font-serif text-[var(--color-gold)] font-semibold">{step.num}</span>
              </div>
              <div>
                <h2 className="font-serif text-xl font-semibold text-white mb-2">{step.title}</h2>
                <p className="text-[var(--color-white-muted)] leading-relaxed max-w-prose">{step.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust box */}
        <div className="p-6 rounded-xl bg-[var(--color-anthracite-soft)] border border-[var(--color-gold)]/20 mb-12">
          <h2 className="font-serif text-xl font-semibold text-white mb-3">
            {c.trustTitle}
          </h2>
          <ul className="space-y-2">
            {c.trustItems.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-white-muted)]">
                <span className="text-[var(--color-gold)] mt-0.5 flex-shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact form */}
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
  );
}
