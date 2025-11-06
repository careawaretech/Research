import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import HowItWorksCardsSection from '@/components/HowItWorksCardsSection';
import CriticalGapSectionDynamic from '@/components/CriticalGapSectionDynamic';
import MassiveMarketOpportunityDynamic from '@/components/MassiveMarketOpportunityDynamic';
import RegionalFocusStrategyDynamic from '@/components/RegionalFocusStrategyDynamic';
import CoreTechnologyFeaturesDynamic from '@/components/CoreTechnologyFeaturesDynamic';
import PrivacySectionDynamic from '@/components/PrivacySectionDynamic';
import TechnologyComparisonDynamic from '@/components/TechnologyComparisonDynamic';
import NationalPartnershipOpportunitiesDynamic from '@/components/NationalPartnershipOpportunitiesDynamic';
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
        <section className="bg-[hsl(var(--feature-card))] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MassiveMarketOpportunityDynamic />
          </div>
        </section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <RegionalFocusStrategyDynamic />
        </div>
        <CoreTechnologyFeaturesDynamic />
        <PrivacySectionDynamic />
        <TechnologyComparisonDynamic />
        <NationalPartnershipOpportunitiesDynamic />
        <ResearchCredibility />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
