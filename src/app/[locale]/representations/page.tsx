import type { Metadata } from 'next';
import { ContactFormInline } from '@/components/contact/ContactFormInline';

const CONTENT = {
  fr: {
    meta: {
      title: 'Nos représentations — Agences Menadel Residence',
      description: 'Retrouvez les agences Menadel Residence au Burkina Faso. Siège à Ouagadougou, présence à Bobo-Dioulasso et Koudougou.',
    },
    eyebrow: 'L\'agence',
    heading: 'Nos représentations',
    intro: 'Menadel Residence est présente dans les principales villes du Burkina Faso. Retrouvez nos bureaux et points de contact.',
    offices: [
      {
        city: 'Ouagadougou',
        type: 'Siège social',
        address: 'Secteur 53 (Ouaga 2000), BP 9656 Ouagadougou 06',
        phone: '+226 50 73 27 30 / 70 59 52 56',
        email: 'menadelresidence@gmail.com',
        hours: 'Lun–Ven : 8h–18h · Sam : 9h–13h',
        isPrimary: true,
      },
      {
        city: 'Bobo-Dioulasso',
        type: 'Bureau régional',
        address: 'Secteur 25, avenue de la Liberté',
        phone: '+226 70 XX XX XX',
        email: 'bobo@menadelresidence.com',
        hours: 'Lun–Ven : 8h–17h',
        isPrimary: false,
      },
      {
        city: 'Koudougou',
        type: 'Point de contact',
        address: 'Secteur 4, près du marché central',
        phone: '+226 70 XX XX XX',
        email: 'koudougou@menadelresidence.com',
        hours: 'Sur rendez-vous',
        isPrimary: false,
      },
    ],
    formTitle: 'Prendre rendez-vous',
    formSubtitle: 'Indiquez la ville et le créneau souhaité — nous vous confirmons le rendez-vous.',
  },
  en: {
    meta: {
      title: 'Our offices — Menadel Residence Agencies',
      description: 'Find Menadel Residence agencies in Burkina Faso. Headquarters in Ouagadougou, presence in Bobo-Dioulasso and Koudougou.',
    },
    eyebrow: 'The agency',
    heading: 'Our offices',
    intro: 'Menadel Residence is present in the main cities of Burkina Faso. Find our offices and contact points.',
    offices: [
      {
        city: 'Ouagadougou',
        type: 'Headquarters',
        address: 'Sector 53 (Ouaga 2000), BP 9656 Ouagadougou 06',
        phone: '+226 50 73 27 30 / 70 59 52 56',
        email: 'menadelresidence@gmail.com',
        hours: 'Mon–Fri: 8am–6pm · Sat: 9am–1pm',
        isPrimary: true,
      },
      {
        city: 'Bobo-Dioulasso',
        type: 'Regional office',
        address: 'Sector 25, Avenue de la Liberté',
        phone: '+226 70 XX XX XX',
        email: 'bobo@menadelresidence.com',
        hours: 'Mon–Fri: 8am–5pm',
        isPrimary: false,
      },
      {
        city: 'Koudougou',
        type: 'Contact point',
        address: 'Sector 4, near central market',
        phone: '+226 70 XX XX XX',
        email: 'koudougou@menadelresidence.com',
        hours: 'By appointment',
        isPrimary: false,
      },
    ],
    formTitle: 'Book an appointment',
    formSubtitle: 'Indicate the city and preferred time slot — we\'ll confirm your appointment.',
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

export default async function RepresentationsPage({
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

        {/* Offices */}
        <div className="space-y-4 mb-14">
          {c.offices.map((office) => (
            <div
              key={office.city}
              className={`p-6 rounded-xl border ${
                office.isPrimary
                  ? 'border-[var(--color-gold)]/30 bg-[var(--color-gold)]/5'
                  : 'border-white/10 bg-[var(--color-anthracite-soft)]'
              }`}
            >
              <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                <div>
                  <h2 className="font-serif text-xl font-semibold text-white">{office.city}</h2>
                  <p className={`text-xs uppercase tracking-wider ${office.isPrimary ? 'text-[var(--color-gold)]' : 'text-[var(--color-white-muted)]'}`}>
                    {office.type}
                  </p>
                </div>
                {office.isPrimary && (
                  <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/30 text-[var(--color-gold)]">
                    {locale === 'fr' ? 'Siège' : 'HQ'}
                  </span>
                )}
              </div>

              <div className="space-y-2 text-sm">
                <p className="text-[var(--color-white-muted)] flex items-start gap-2">
                  <span>📍</span>
                  <span>{office.address}</span>
                </p>
                <p className="text-[var(--color-white-muted)] flex items-start gap-2">
                  <span>📞</span>
                  <span>{office.phone}</span>
                </p>
                <p className="text-[var(--color-white-muted)] flex items-start gap-2">
                  <span>✉️</span>
                  <a href={`mailto:${office.email}`} className="text-[var(--color-gold)] hover:underline">
                    {office.email}
                  </a>
                </p>
                <p className="text-[var(--color-white-muted)] flex items-start gap-2">
                  <span>🕐</span>
                  <span>{office.hours}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact form */}
        <div className="p-6 rounded-xl bg-[var(--color-anthracite-soft)] border border-white/10">
          <h2 className="font-serif text-2xl font-semibold text-white mb-2">{c.formTitle}</h2>
          <p className="text-sm text-[var(--color-white-muted)] mb-6">{c.formSubtitle}</p>
          <ContactFormInline source="representations" />
        </div>
      </div>
    </div>
  );
}
