import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { HeroWave } from '@/components/ui/ai-input-hero';
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
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const [heroData, setHeroData] = useState({
    title: 'Privacy-First Fall Detection',
    subtitle: 'Advanced radar and WiFi sensing technology for elderly care. No cameras. Ever.',
    placeholder: 'Describe your facility\'s needs...',
    buttonText: 'Get Started',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        // Get the home page
        const { data: page } = await supabase
          .from('content_pages')
          .select('id')
          .eq('page_slug', 'home')
          .maybeSingle();

        if (page) {
          // Get the hero section for the home page
          const { data: heroSection } = await supabase
            .from('page_sections')
            .select('content')
            .eq('page_id', page.id)
            .eq('section_type', 'hero')
            .maybeSingle();

          if (heroSection?.content) {
            const content = heroSection.content as any;
            setHeroData({
              title: content.title || heroData.title,
              subtitle: content.subtitle || heroData.subtitle,
              placeholder: content.input_placeholder || heroData.placeholder,
              buttonText: content.button_text || heroData.buttonText,
            });
          }
        }
      } catch (error) {
        console.error('Error fetching hero data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroWave 
          title={heroData.title}
          subtitle={heroData.subtitle}
          placeholder={heroData.placeholder}
          buttonText={heroData.buttonText}
        />
        <HowItWorksCardsSection />
        <DiverseTechnologyApplications />
        <UniversalSecurityCompliance />
        <CriticalGapSectionDynamic />
        <section className="bg-[hsl(var(--feature-card))] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MassiveMarketOpportunityDynamic />
          </div>
        </section>
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
