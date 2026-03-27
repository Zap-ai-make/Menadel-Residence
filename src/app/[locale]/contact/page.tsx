import type { Metadata } from 'next';
import { ContactFormInline } from '@/components/contact/ContactFormInline';
import { WhatsAppCTA } from '@/components/contact/WhatsAppCTA';
import { WHATSAPP_NUMBER } from '@/lib/config';

const CONTENT = {
  fr: {
    meta: {
      title: 'Contact',
      description: 'Contactez Menadel Residence pour votre projet immobilier au Burkina Faso. WhatsApp, formulaire ou email.',
    },
    eyebrow: 'Contact',
    heading: 'Parlons de votre projet',
    subtitle: 'Réponse garantie sous 24h. Pour une réponse plus rapide, WhatsApp est le canal privilégié.',
    whatsappLabel: 'Contacter via WhatsApp',
    whatsappMsg: 'Bonjour Menadel Residence, je souhaite obtenir des informations.',
    formTitle: 'Formulaire de contact',
  },
  en: {
    meta: {
      title: 'Contact',
      description: 'Contact Menadel Residence for your real estate project in Burkina Faso. WhatsApp, form or email.',
    },
    eyebrow: 'Contact',
    heading: 'Let\'s talk about your project',
    subtitle: 'Reply guaranteed within 24h. For a faster response, WhatsApp is the preferred channel.',
    whatsappLabel: 'Contact via WhatsApp',
    whatsappMsg: 'Hello Menadel Residence, I would like some information.',
    formTitle: 'Contact form',
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

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = locale === 'en' ? CONTENT.en : CONTENT.fr;

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)] mb-3">
          {c.eyebrow}
        </p>
        <h1 className="font-serif text-4xl font-semibold text-white mb-4">{c.heading}</h1>
        <p className="text-[var(--color-white-muted)] mb-8">
          {c.subtitle}
        </p>

        <WhatsAppCTA
          phone={WHATSAPP_NUMBER}
          message={c.whatsappMsg}
          variant="sheet"
          label={c.whatsappLabel}
          className="mb-6"
        />

        <div className="p-6 rounded-xl bg-[var(--color-anthracite-soft)] border border-white/10">
          <h2 className="font-serif text-xl font-semibold text-white mb-4">{c.formTitle}</h2>
          <ContactFormInline source="page-contact" />
        </div>

        <div className="mt-8 text-sm text-[var(--color-white-muted)] space-y-1">
          <p>📍 Secteur 53 (Ouaga 2000), BP 9656 Ouagadougou 06</p>
          <p>📞 +226 50 73 27 30 / 70 59 52 56</p>
          <p>✉️ <a href="mailto:menadelresidence@gmail.com" className="text-[var(--color-gold)] hover:underline">menadelresidence@gmail.com</a></p>
          <p className="text-xs opacity-60 mt-3">IFU : 00253576E · RCCM : BF-OUA-01-2024-B12-17129 · SARL — Capital 5 000 000 FCFA</p>
        </div>
      </div>
    </div>
  );
}
