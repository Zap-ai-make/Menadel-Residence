import type { Metadata } from 'next';
import { ContactFormInline } from '@/components/contact/ContactFormInline';

const CONTENT = {
  fr: {
    meta: {
      title: 'Vous avez un représentant local',
      description: 'Vous avez un proche sur place au Burkina Faso ? Menadel Residence communique directement avec vous à chaque étape critique pour vous protéger.',
    },
    eyebrow: 'Parcours diaspora',
    heading: 'Vous avez un représentant local',
    intro: 'Avoir un proche sur place est un avantage — pour les visites, les démarches physiques, la présence locale. Mais ',
    introStrong: 'toutes les décisions et communications officielles vous parviennent directement',
    introEnd: '. Votre représentant facilite, il ne décide pas à votre place.',
    ruleLabel: 'Notre règle absolue :',
    ruleText: 'votre représentant peut se déplacer pour la visite et la signature — toutes les communications officielles (prix, compromis, paiement) vous sont envoyées directement.',
    timelineTitle: 'Comment ça se passe',
    directContactBadge: 'Contact direct avec vous',
    timeline: [
      {
        step: 'Contact initial',
        detail: 'Nous vous contactons directement pour comprendre votre projet. Votre représentant peut assister aux visites sur place.',
      },
      {
        step: 'Visite & rapport',
        detail: 'Votre représentant visite avec notre agent. Vous recevez photos, vidéo et rapport détaillé directement. La validation du bien est votre décision.',
      },
      {
        step: 'Négociation & prix',
        detail: 'Le prix négocié vous est communiqué directement. Votre représentant ne peut pas accepter un prix en votre nom sans votre confirmation explicite.',
      },
      {
        step: 'Compromis & signature',
        detail: 'Le compromis vous est envoyé pour lecture et validation avant signature. Votre représentant signe avec votre procuration. Vous recevez l\'original numérisé.',
      },
      {
        step: 'Paiement',
        detail: 'Le virement s\'effectue depuis votre compte personnel vers le compte séquestre du notaire. Votre représentant n\'a pas accès aux fonds.',
      },
    ],
    formTitle: 'Commencer avec un représentant',
    formSubtitle: 'Dites-nous les coordonnées de votre représentant local et les grandes lignes de votre projet.',
  },
  en: {
    meta: {
      title: 'You have a local representative',
      description: 'Have a trusted contact in Burkina Faso? Menadel Residence communicates directly with you at every critical step to protect your interests.',
    },
    eyebrow: 'Diaspora journey',
    heading: 'You have a local representative',
    intro: 'Having someone on the ground is an advantage — for visits, physical paperwork, local presence. But ',
    introStrong: 'all decisions and official communications reach you directly',
    introEnd: '. Your representative facilitates; they do not decide on your behalf.',
    ruleLabel: 'Our absolute rule:',
    ruleText: 'your representative may attend visits and signings — all official communications (price, contract, payment) are sent directly to you.',
    timelineTitle: 'How it works',
    directContactBadge: 'Direct contact with you',
    timeline: [
      {
        step: 'Initial contact',
        detail: 'We contact you directly to understand your project. Your representative may attend on-site visits.',
      },
      {
        step: 'Visit & report',
        detail: 'Your representative visits with our agent. You receive photos, video and a detailed report directly. Approving the property is your decision.',
      },
      {
        step: 'Negotiation & price',
        detail: 'The negotiated price is communicated directly to you. Your representative cannot accept a price on your behalf without your explicit confirmation.',
      },
      {
        step: 'Contract & signing',
        detail: 'The contract is sent to you to read and validate before signing. Your representative signs using your power of attorney. You receive the scanned original.',
      },
      {
        step: 'Payment',
        detail: 'The wire transfer is made from your personal account to the notary\'s escrow account. Your representative has no access to the funds.',
      },
    ],
    formTitle: 'Start with a representative',
    formSubtitle: 'Tell us your local representative\'s contact details and the outline of your project.',
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

export default async function AvecRepresentantPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = locale === 'en' ? CONTENT.en : CONTENT.fr;

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)] mb-3">
          {c.eyebrow}
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-white leading-tight mb-4">
          {c.heading}
        </h1>
        <p className="text-[var(--color-white-muted)] text-lg leading-relaxed mb-4 max-w-prose">
          {c.intro}
          <strong className="text-white">{c.introStrong}</strong>
          {c.introEnd}
        </p>
        <div className="p-4 rounded-lg bg-[var(--color-gold)]/5 border border-[var(--color-gold)]/20 mb-12">
          <p className="text-sm text-[var(--color-gold)]">
            <strong>{c.ruleLabel}</strong> {c.ruleText}
          </p>
        </div>

        {/* Timeline */}
        <h2 className="font-serif text-2xl font-semibold text-white mb-6">
          {c.timelineTitle}
        </h2>
        <div className="space-y-6 mb-16">
          {c.timeline.map((item) => (
            <div key={item.step} className="p-5 rounded-xl bg-[var(--color-anthracite-soft)] border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-white">{item.step}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/20 text-[var(--color-gold)]">
                  {c.directContactBadge}
                </span>
              </div>
              <p className="text-sm text-[var(--color-white-muted)] leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Contact form */}
        <div className="p-6 rounded-xl bg-[var(--color-anthracite-soft)] border border-white/10">
          <h2 className="font-serif text-2xl font-semibold text-white mb-2">
            {c.formTitle}
          </h2>
          <p className="text-sm text-[var(--color-white-muted)] mb-6">
            {c.formSubtitle}
          </p>
          <ContactFormInline source="avec-representant" />
        </div>
      </div>
    </div>
  );
}
