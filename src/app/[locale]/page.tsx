import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturedProperties } from '@/components/sections/FeaturedProperties';
import { TrustBar } from '@/components/sections/TrustBar';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { PartnersSection } from '@/components/sections/PartnersSection';
import { AppsMobileSection } from '@/components/sections/AppsMobileSection';
import { MapSection } from '@/components/sections/MapSection';
import { getProperties } from '@/lib/saas-client';

export default async function HomePage() {
  const properties = await getProperties();

  return (
    <>
      <HeroSection />
      <TrustBar />
      <FeaturedProperties properties={properties} />
      <PartnersSection />
      <HowItWorksSection />
      <AppsMobileSection />
      <MapSection properties={properties} />
    </>
  );
}
