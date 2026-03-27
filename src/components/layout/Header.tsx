'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Menu, X, MessageCircle } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { CurrencySwitcher } from '@/components/ui/CurrencySwitcher';
import { cn } from '@/lib/utils';
import { WHATSAPP_NUMBER } from '@/lib/config';

export function Header() {
  const t = useTranslations('nav');
  const tContact = useTranslations('contact');
  const locale = useLocale();
  const pathname = usePathname();

  const navLinks = [
    { href: '/catalogue', label: t('catalogue') },
    { href: '/acheter-depuis-etranger', label: t('abroadGuide') },
    { href: '/avec-representant', label: t('withRep') },
    { href: '/gestion-locative', label: t('rentalMgmt') },
  ];

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(tContact('whatsappGeneric'))}`;

  const bannerItems = locale === 'fr'
    ? [
        '✦ Agence immobilière agréée — Burkina Faso',
        '📍 Ouagadougou · Bobo-Dioulasso · Koudougou',
        '✓ IFU · RCCM · Agrément Ministère de l\'Habitat',
        '🏡 Parcelles · Villas · Terrains · Appartements',
        '💬 Réponse WhatsApp sous 5 min',
        '🌍 Accompagnement diaspora — acheter depuis l\'étranger',
        '📊 Catalogue synchronisé en temps réel',
      ]
    : [
        '✦ Licensed Real Estate Agency — Burkina Faso',
        '📍 Ouagadougou · Bobo-Dioulasso · Koudougou',
        '✓ IFU · RCCM · Ministry of Housing Approval',
        '🏡 Plots · Villas · Land · Apartments',
        '💬 WhatsApp reply under 5 min',
        '🌍 Diaspora support — buy from abroad',
        '📊 Real-time catalogue',
      ];

  return (
    <header className="sticky top-0 z-50">
      {/* ── Bandeau défilant d'information ── */}
      <div
        className="overflow-hidden border-b border-[var(--color-gold)]/10"
        style={{ background: '#111111', height: '42px' }}
        aria-hidden="true"
      >
        <div className="ticker-track h-full flex items-center">
          {/* Doublé pour boucle seamless */}
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
          <nav className="hidden lg:flex items-center gap-6" aria-label="Navigation principale">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'text-sm text-[var(--color-white-muted)] hover:text-white transition-colors border-b-2 border-transparent',
                  pathname === href && 'text-white border-[var(--color-gold)]'
                )}
              >
                {label}
              </Link>
            ))}
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
            <Sheet>
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
                  <nav className="flex flex-col gap-2 py-6 flex-1" aria-label="Navigation mobile">
                    {navLinks.map(({ href, label }) => (
                      <SheetClose key={href}>
                        <Link
                          href={href}
                          className="block w-full text-left text-base text-[var(--color-white-muted)] hover:text-white px-2 py-2.5 rounded hover:bg-white/5 transition-colors"
                        >
                          {label}
                        </Link>
                      </SheetClose>
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
