import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import HowItWorksCardsSection from '@/components/HowItWorksCardsSection';
import DiverseTechnologyApplications from '@/components/DiverseTechnologyApplications';
import UniversalSecurityCompliance from '@/components/UniversalSecurityCompliance';
import CriticalGapSectionDynamic from '@/components/CriticalGapSectionDynamic';
import MassiveMarketOpportunityDynamic from '@/components/MassiveMarketOpportunityDynamic';
import CoreTechnologyFeaturesDynamic from '@/components/CoreTechnologyFeaturesDynamic';
import PrivacySectionDynamic from '@/components/PrivacySectionDynamic';
import TechnologyComparisonDynamic from '@/components/TechnologyComparisonDynamic';
import ResearchCredibility from '@/components/ResearchCredibility';
import TrainingProgramsSection from '@/components/TrainingProgramsSection';
import ResearchInProgressSection from '@/components/ResearchInProgressSection';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection pageSlug="home" />
        <ResearchInProgressSection />
        <CriticalGapSectionDynamic />
        <section className="bg-background py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MassiveMarketOpportunityDynamic />
          </div>
        </section>
        <HowItWorksCardsSection />
        <DiverseTechnologyApplications />
        <UniversalSecurityCompliance />
        <CoreTechnologyFeaturesDynamic />
        <PrivacySectionDynamic />
        <TechnologyComparisonDynamic />
        <ResearchCredibility />
        <TrainingProgramsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
