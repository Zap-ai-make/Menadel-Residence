'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Menu, MessageCircle, ChevronDown } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { CurrencySwitcher } from '@/components/ui/CurrencySwitcher';
import { NavDropdown, type NavDropdownItem } from '@/components/layout/NavDropdown';
import { cn } from '@/lib/utils';
import { WHATSAPP_NUMBER } from '@/lib/config';

// ── Structure de navigation ──
type NavItem = {
  key: string;
  href?: string;
  children?: { key: string; href: string; icon?: string; descKey?: string }[];
};

const NAV_STRUCTURE: NavItem[] = [
  { key: 'catalogue', href: '/catalogue' },
  {
    key: 'rent',
    children: [
      { key: 'shortTerm', href: '/location-court-sejour', icon: '🏨', descKey: 'shortTermDesc' },
      { key: 'longTerm', href: '/location-longue-duree', icon: '🏠', descKey: 'longTermDesc' },
    ],
  },
  { key: 'abroadGuide', href: '/acheter-depuis-etranger' },
  {
    key: 'entrust',
    children: [
      { key: 'rentalMgmt', href: '/gestion-locative', icon: '📊', descKey: 'rentalMgmtDesc' },
      { key: 'sellProperty', href: '/mise-en-vente', icon: '💰', descKey: 'sellPropertyDesc' },
    ],
  },
  {
    key: 'agency',
    children: [
      { key: 'representations', href: '/representations', icon: '📍', descKey: 'representationsDesc' },
      { key: 'partnerships', href: '/partenariats', icon: '🤝', descKey: 'partnershipsDesc' },
      { key: 'whyMinadel', href: '/pourquoi-minadel', icon: '✨', descKey: 'whyMinadelDesc' },
    ],
  },
];

export function Header() {
  const t = useTranslations('nav');
  const tContact = useTranslations('contact');
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(tContact('whatsappGeneric'))}`;

  const bannerItems = locale === 'fr'
    ? [
        '📍 Ouagadougou · Bobo-Dioulasso · Koudougou',
        '📍 Expertise du marché local',
        '🛡️ Sécurité juridique & financière',
        '🤝 Transparence à chaque étape',
        '🏠 Accompagnement personnalisé de A à Z',
      ]
    : [
        '📍 Ouagadougou · Bobo-Dioulasso · Koudougou',
        '📍 Local market expertise',
        '🛡️ Legal & financial security',
        '🤝 Transparency at every step',
        '🏠 Personalized support from A to Z',
      ];

  // Vérifier si un item ou ses enfants sont actifs
  const isItemActive = (item: NavItem): boolean => {
    if (item.href) return pathname === item.href;
    if (item.children) return item.children.some((c) => pathname === c.href);
    return false;
  };

  // Convertir les enfants en NavDropdownItem[]
  const getDropdownItems = (children: NavItem['children']): NavDropdownItem[] => {
    if (!children) return [];
    return children.map((child) => ({
      label: t(child.key as any),
      href: child.href,
      icon: child.icon,
      description: child.descKey ? t(child.descKey as any) : undefined,
    }));
  };

  return (
    <header className="sticky top-0 z-50">
      {/* ── Bandeau défilant d'information ── */}
      <div
        className="overflow-hidden border-b border-[var(--color-gold)]/10"
        style={{ background: '#111111', height: '42px' }}
        aria-hidden="true"
      >
        <div className="ticker-track h-full flex items-center">
          {[...bannerItems, ...bannerItems].map((item, i) => (
            <span
              key={i}
              className="text-[11px] text-[var(--color-white-muted)]/60 tracking-wide whitespace-nowrap px-10"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── Header principal ── */}
      <div className="header-blur border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex-shrink-0 focus-visible:outline-2 focus-visible:outline-[var(--color-gold)] focus-visible:outline-offset-4 rounded"
              aria-label="Menadel Résidence — Accueil"
            >
              <div className="relative overflow-hidden" style={{ width: '160px', height: '48px' }}>
                <Image
                  src="/logo.png"
                  alt="Menadel Résidence"
                  fill
                  sizes="160px"
                  priority
                  className="object-cover"
                  style={{ objectPosition: 'center 45%' }}
                />
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-5" aria-label="Navigation principale">
              {NAV_STRUCTURE.map((item) => {
                const isActive = isItemActive(item);

                // Lien direct
                if (item.href) {
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      className={cn(
                        'text-sm text-[var(--color-white-muted)] hover:text-white transition-colors border-b-2 border-transparent',
                        isActive && 'text-white border-[var(--color-gold)]'
                      )}
                    >
                      {t(item.key as any)}
                    </Link>
                  );
                }

                // Dropdown
                return (
                  <NavDropdown
                    key={item.key}
                    label={t(item.key as any)}
                    items={getDropdownItems(item.children)}
                    isActive={isActive}
                  />
                );
              })}
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-3">
              {/* Currency switcher */}
              <CurrencySwitcher />

              {/* Language switcher */}
              <div className="hidden sm:flex items-center gap-1 text-xs text-[var(--color-white-muted)]">
                <Link
                  href={pathname}
                  locale="fr"
                  className={cn(
                    'hover:text-white transition-colors px-1',
                    locale === 'fr' && 'text-[var(--color-gold)] font-semibold'
                  )}
                  aria-label="Passer en français"
                >
                  FR
                </Link>
                <span className="opacity-30">|</span>
                <Link
                  href={pathname}
                  locale="en"
                  className={cn(
                    'hover:text-white transition-colors px-1',
                    locale === 'en' && 'text-[var(--color-gold)] font-semibold'
                  )}
                  aria-label="Switch to English"
                >
                  EN
                </Link>
              </div>

              {/* WhatsApp button — desktop */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tContact('whatsappLabel')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
              >
                <MessageCircle size={14} />
                WhatsApp
              </a>

              {/* Mobile hamburger */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger
                  className="lg:hidden p-2 rounded text-white hover:text-[var(--color-gold)] transition-colors"
                  aria-label={t('openMenu')}
                >
                  <Menu size={20} />
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="bg-[var(--color-anthracite-soft)] border-white/10 w-72"
                >
                  <div className="flex flex-col h-full">
                    {/* Mobile logo */}
                    <div className="py-4 border-b border-white/10">
                      <div className="relative overflow-hidden" style={{ width: '140px', height: '42px' }}>
                        <Image
                          src="/logo.png"
                          alt="Menadel Résidence"
                          fill
                          className="object-cover"
                          style={{ objectPosition: 'center 45%' }}
                        />
                      </div>
                    </div>

                    {/* Mobile nav links */}
                    <nav className="flex flex-col gap-1 py-4 flex-1 overflow-y-auto" aria-label="Navigation mobile">
                      {NAV_STRUCTURE.map((item) => (
                        <MobileNavItem
                          key={item.key}
                          item={item}
                          t={t}
                          pathname={pathname}
                          onNavigate={() => setMobileMenuOpen(false)}
                        />
                      ))}
                    </nav>

                    {/* Mobile bottom controls */}
                    <div className="border-t border-white/10 pt-4 pb-6 flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <CurrencySwitcher />
                        <div className="flex items-center gap-1 text-sm text-[var(--color-white-muted)] ml-auto">
                          <Link href={pathname} locale="fr" className={cn('px-2', locale === 'fr' && 'text-[var(--color-gold)] font-semibold')}>FR</Link>
                          <span className="opacity-30">|</span>
                          <Link href={pathname} locale="en" className={cn('px-2', locale === 'en' && 'text-[var(--color-gold)] font-semibold')}>EN</Link>
                        </div>
                      </div>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-md text-sm font-medium bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366]"
                      >
                        <MessageCircle size={16} />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// ── Composant pour les items mobiles avec accordéon ──
function MobileNavItem({
  item,
  t,
  pathname,
  onNavigate,
}: {
  item: NavItem;
  t: ReturnType<typeof useTranslations<'nav'>>;
  pathname: string;
  onNavigate: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Lien direct
  if (item.href) {
    return (
      <Link
        href={item.href}
        onClick={onNavigate}
        className={cn(
          'block w-full text-left text-base px-3 py-2.5 rounded-lg transition-colors',
          pathname === item.href
            ? 'text-white bg-white/5'
            : 'text-[var(--color-white-muted)] hover:text-white hover:bg-white/5'
        )}
      >
        {t(item.key as any)}
      </Link>
    );
  }

  // Accordéon pour les items avec enfants
  const isChildActive = item.children?.some((c) => pathname === c.href);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center justify-between w-full text-left text-base px-3 py-2.5 rounded-lg transition-colors',
          isChildActive
            ? 'text-white bg-white/5'
            : 'text-[var(--color-white-muted)] hover:text-white hover:bg-white/5'
        )}
      >
        <span>{t(item.key as any)}</span>
        <ChevronDown
          size={16}
          className={cn(
            'transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {/* Sous-items */}
      <div
        className={cn(
          'overflow-hidden transition-all duration-200',
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="pl-3 pt-1 space-y-0.5">
          {item.children?.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={onNavigate}
              className={cn(
                'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors',
                pathname === child.href
                  ? 'text-[var(--color-gold)] bg-[var(--color-gold)]/5'
                  : 'text-[var(--color-white-muted)] hover:text-white hover:bg-white/5'
              )}
            >
              {child.icon && <span className="text-base">{child.icon}</span>}
              <span>{t(child.key as any)}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
