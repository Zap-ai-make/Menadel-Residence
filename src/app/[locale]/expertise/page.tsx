import type { Metadata } from 'next';
import { ContactFormInline } from '@/components/contact/ContactFormInline';

const CONTENT = {
  fr: {
    meta: {
      title: 'Expertise immobilière',
      description: 'Évaluation de bien, conseil en investissement, analyse de marché immobilier au Burkina Faso. Service d\'expertise de Menadel Residence.',
    },
    eyebrow: 'Service',
    heading: 'Expertise immobilière',
    intro: 'Vous souhaitez connaître la valeur réelle d\'un bien, évaluer un investissement ou comprendre un marché de quartier ? Notre équipe vous accompagne avec des analyses basées sur les données de marché actuelles.',
    services: [
      { icon: '📊', title: 'Évaluation de bien', desc: 'Estimation précise de la valeur marchande d\'un bien selon sa localisation, état et marché.' },
      { icon: '💼', title: 'Conseil investissement', desc: 'Analyse rendement locatif, opportunités quartier, perspectives de valorisation.' },
      { icon: '📍', title: 'Analyse de marché', desc: 'Fourchettes de prix, tendances et disponibilité par type et quartier à Ouagadougou et Bobo.' },
    ],
    formTitle: 'Demander une expertise',
    formSubtitle: 'Décrivez votre besoin — nous vous répondons avec une première analyse gratuite.',
  },
  en: {
    meta: {
      title: 'Property expertise',
      description: 'Property valuation, investment advice, real estate market analysis in Burkina Faso. Expertise service by Menadel Residence.',
    },
    eyebrow: 'Service',
    heading: 'Property expertise',
    intro: 'Want to know the real value of a property, assess an investment or understand a neighbourhood market? Our team provides analysis grounded in current market data.',
    services: [
      { icon: '📊', title: 'Property valuation', desc: 'Precise estimate of a property\'s market value based on location, condition and local market.' },
      { icon: '💼', title: 'Investment advice', desc: 'Rental yield analysis, neighbourhood opportunities, capital appreciation outlook.' },
      { icon: '📍', title: 'Market analysis', desc: 'Price ranges, trends and availability by type and neighbourhood in Ouagadougou and Bobo.' },
    ],
    formTitle: 'Request an expertise',
    formSubtitle: 'Describe your need — we reply with a free initial analysis.',
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

export default async function ExpertisePage({
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
        <p className="text-[var(--color-white-muted)] text-lg leading-relaxed mb-12 max-w-prose">
          {c.intro}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
          {c.services.map((s) => (
            <div key={s.title} className="p-5 rounded-xl bg-[var(--color-anthracite-soft)] border border-white/10">
              <div className="text-2xl mb-2">{s.icon}</div>
              <h2 className="font-semibold text-white mb-1">{s.title}</h2>
              <p className="text-sm text-[var(--color-white-muted)] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-xl bg-[var(--color-anthracite-soft)] border border-white/10">
          <h2 className="font-serif text-2xl font-semibold text-white mb-2">{c.formTitle}</h2>
          <p className="text-sm text-[var(--color-white-muted)] mb-6">
            {c.formSubtitle}
          </p>
          <ContactFormInline source="expertise" />
        </div>
      </div>
    </div>
  );
}
