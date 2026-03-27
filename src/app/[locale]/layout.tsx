import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { routing } from '@/i18n/routing';
import { CurrencyProvider } from '@/components/providers/CurrencyProvider';
import { Toaster } from '@/components/ui/sonner';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloating } from '@/components/contact/WhatsAppFloating';
import { GdprBanner } from '@/components/ui/GdprBanner';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: {
      default: 'Menadel Residence — Immobilier de confiance au Burkina Faso',
      template: '%s — Menadel Residence',
    },
    description:
      locale === 'fr'
        ? 'Agence immobilière agréée au Burkina Faso. Parcelles, villas, terrains pour acheteurs locaux et diaspora.'
        : 'Licensed real estate agency in Burkina Faso. Plots, villas, land for local buyers and the diaspora.',
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? 'https://minadel-residence.com'
    ),
    alternates: {
      languages: {
        fr: '/fr',
        en: '/en',
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'fr' | 'en')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <CurrencyProvider>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloating />
        <GdprBanner />
        <Toaster position="bottom-right" richColors />
        <SpeedInsights />
      </CurrencyProvider>
    </NextIntlClientProvider>
  );
}
