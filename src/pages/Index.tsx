import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import HowItWorksCardsSection from '@/components/HowItWorksCardsSection';
import CriticalGapSectionDynamic from '@/components/CriticalGapSectionDynamic';
import MassiveMarketOpportunity from '@/components/MassiveMarketOpportunity';
import RegionalFocusStrategy from '@/components/RegionalFocusStrategy';
import CoreTechnologyFeatures from '@/components/CoreTechnologyFeatures';
import PrivacySection from '@/components/PrivacySection';
import TechnologyComparison from '@/components/TechnologyComparison';
import NationalPartnershipOpportunities from '@/components/NationalPartnershipOpportunities';
import ResearchCredibility from '@/components/ResearchCredibility';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <HowItWorksCardsSection />
        <CriticalGapSectionDynamic />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <MassiveMarketOpportunity />
          <RegionalFocusStrategy />
        </div>
        <CoreTechnologyFeatures />
        <PrivacySection />
        <TechnologyComparison />
        <NationalPartnershipOpportunities />
        <ResearchCredibility />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
