import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const LEGAL = {
  ifu: 'IFU : 00253576E',
  rccm: 'RCCM : BF-OUA-01-2024-B12-17129',
  capital: 'SARL — Capital : 5 000 000 FCFA',
  address: 'Secteur 53 (Ouaga 2000), BP 9656 Ouagadougou 06',
  phone: '+226 50 73 27 30 / 70 59 52 56',
  email: 'menadelresidence@gmail.com',
};

export function Footer() {
  const t = useTranslations('footer');
  const tPages = useTranslations('pages');
  const year = new Date().getFullYear();

  const serviceLinks = [
    { href: '/catalogue',                  label: tPages('catalogue') },
    { href: '/acheter-depuis-etranger',    label: tPages('abroad') },
    { href: '/avec-representant',          label: tPages('representative') },
    { href: '/gestion-locative',           label: t('rentalMgmt') },
    { href: '/expertise',                  label: t('expertise') },
    { href: '/demarches-administratives',  label: t('adminProcess') },
  ];

  return (
    <footer className="bg-[var(--color-anthracite-soft)] border-t border-white/10 mt-auto">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" aria-label="Menadel Résidence — Accueil">
              <div className="relative overflow-hidden" style={{ width: '140px', height: '42px' }}>
                <Image
                  src="/logo.png"
                  alt="Menadel Résidence"
                  fill
                  sizes="140px"
                  className="object-cover"
                  style={{ objectPosition: 'center 45%' }}
                />
              </div>
            </Link>
            <p className="mt-3 text-sm text-[var(--color-white-muted)] leading-relaxed max-w-xs">
              {t('tagline')}
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t('services')}
            </h3>
            <ul className="space-y-2">
              {serviceLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[var(--color-white-muted)] hover:text-[var(--color-gold)] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal info — IFU, RCCM, agrément */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t('legalTitle')}
            </h3>
            <address className="not-italic space-y-1">
              {[LEGAL.ifu, LEGAL.rccm, LEGAL.capital].map((item) => (
                <p key={item} className="text-xs text-[var(--color-white-muted)]">
                  {item}
                </p>
              ))}
              <p className="text-xs text-[var(--color-white-muted)] mt-2">{LEGAL.address}</p>
              <p className="text-xs text-[var(--color-white-muted)]">{LEGAL.phone}</p>
              <a
                href={`mailto:${LEGAL.email}`}
                className="text-xs text-[var(--color-gold)] hover:underline"
              >
                {LEGAL.email}
              </a>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--color-white-muted)]">
            {t('rights', { year })}
          </p>
          <Link
            href="/politique-confidentialite"
            className="text-xs text-[var(--color-white-muted)] hover:text-white transition-colors"
          >
            {t('privacy')}
          </Link>
          <Link
            href="/pourquoi-minadel"
            className="text-xs text-[var(--color-white-muted)] hover:text-white transition-colors"
          >
            {t('legalTitle')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
