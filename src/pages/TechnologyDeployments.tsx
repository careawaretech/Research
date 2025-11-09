import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { HeroWave } from '@/components/ui/ai-input-hero';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { SectionTagBadge } from '@/components/admin/SectionTagBadge';

interface Feature {
  title: string;
  description: string;
}

interface DeploymentSection {
  id: string;
  badge_text: string;
  badge_color: string;
  badge_bg_color: string;
  title: string;
  description: string;
  image_url?: string;
  image_position: 'left' | 'right';
  features: Feature[];
}

interface ComparisonRow {
  attribute: string;
  radar: string;
  wifi: string;
}

interface ComparisonData {
  title: string;
  subtitle: string;
  comparison_data: ComparisonRow[];
}

interface CTAData {
  title: string;
  description: string;
  button_text: string;
  button_url?: string;
}

const TechnologyDeployments = () => {
  const [sections, setSections] = useState<DeploymentSection[]>([]);
  const [comparison, setComparison] = useState<ComparisonData | null>(null);
  const [cta, setCta] = useState<CTAData | null>(null);
  const [loading, setLoading] = useState(true);
  const [heroData, setHeroData] = useState({
    title: 'Technology Deployments',
    subtitle: 'Empowering patient safety with privacy-first sensing in every environment—from clinical settings to the comfort of home.',
    placeholder: 'Describe your deployment needs...',
    buttonText: 'Get Started',
  });

  useEffect(() => {
    fetchData();
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      const { data: page } = await supabase
        .from('content_pages')
        .select('id')
        .eq('page_slug', 'technology-deployments')
        .maybeSingle();

      if (page) {
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
    }
  };

  const fetchData = async () => {
    try {
      const [sectionsRes, comparisonRes, ctaRes] = await Promise.all([
        supabase.from('technology_deployments_sections').select('*').eq('visible', true).order('display_order'),
        supabase.from('technology_deployments_comparison').select('*').single(),
        supabase.from('technology_deployments_cta').select('*').single()
      ]);

      if (sectionsRes.data) setSections(sectionsRes.data as any);
      if (comparisonRes.data) setComparison(comparisonRes.data as any);
      if (ctaRes.data) setCta(ctaRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <HeroWave
        title={heroData.title}
        subtitle={heroData.subtitle}
        placeholder={heroData.placeholder}
        buttonText={heroData.buttonText}
      />

      {/* Deployment Sections */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-7xl space-y-32">
          {sections.map((section, index) => (
            <div 
              key={section.id}
              className="relative grid md:grid-cols-2 gap-12 items-center"
            >
              <SectionTagBadge sectionTag={section.badge_text} adminPath="/admin/technology-deployments" />
              <div className={section.image_position === 'left' ? 'md:order-2' : 'md:order-1'}>
                <span 
                  className="inline-block font-semibold py-1 px-3 rounded-full mb-4"
                  style={{
                    color: section.badge_color,
                    backgroundColor: section.badge_bg_color
                  }}
                >
                  {section.badge_text}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-6 tracking-tight">
                  {section.title}
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground mb-6">
                  {section.description}
                </p>
                <div className="space-y-4">
                  {section.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-foreground">{feature.title}</h4>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={section.image_position === 'left' ? 'md:order-1' : 'md:order-2'}>
                {section.image_url && (
                  <div className="h-96 overflow-hidden rounded-xl shadow-2xl">
                    <img 
                      src={section.image_url} 
                      alt={section.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      {comparison && (
        <section className="bg-muted py-20 relative">
          <SectionTagBadge sectionTag="Comparison" adminPath="/admin/technology-deployments" />
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-4 tracking-tight">
                {comparison.title}
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground">
                {comparison.subtitle}
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] border-collapse bg-card rounded-lg overflow-hidden">
                <thead>
                  <tr className="border-b-2 border-primary">
                    <th className="p-4 text-left font-bold text-lg text-foreground">Attribute</th>
                    <th className="p-4 text-left font-bold text-lg text-primary bg-primary/5">SFCW Radar</th>
                    <th className="p-4 text-left font-bold text-lg text-green-600 bg-green-50 dark:bg-green-950/20">WiFi Signal Analysis</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.comparison_data.map((row, index) => (
                    <tr key={index} className="border-b border-border">
                      <td className="p-4 font-semibold text-foreground">{row.attribute}</td>
                      <td className="p-4 bg-primary/5">{row.radar}</td>
                      <td className="p-4 bg-green-50 dark:bg-green-950/20">{row.wifi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {cta && (
        <section className="bg-primary text-primary-foreground py-20 relative">
          <SectionTagBadge sectionTag="Become a Pilot Partner" adminPath="/admin/technology-deployments" />
          <div className="container mx-auto px-6 max-w-7xl text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
              {cta.title}
            </h2>
            <p className="text-base sm:text-lg max-w-2xl mx-auto mb-8 opacity-90">
              {cta.description}
            </p>
            <Button 
              size="lg"
              variant="secondary"
              onClick={() => cta.button_url && window.open(cta.button_url, '_blank')}
              disabled={!cta.button_url}
            >
              {cta.button_text}
            </Button>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default TechnologyDeployments;
