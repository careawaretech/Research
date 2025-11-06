import React, { useEffect, useState } from 'react';
import { PaperCard } from '@/components/research-hub/PaperCard';
import { SectionTagBadge } from '@/components/admin/SectionTagBadge';
import { supabase } from '@/integrations/supabase/client';

interface Badge {
  text: string;
  color: string;
  bgColor: string;
}

interface FeaturedPaper {
  id: string;
  title: string;
  description: string;
  author: string;
  year: string;
  views: string;
  comments: string;
  image_url: string;
  pdf_url?: string;
  badges: Badge[];
  display_order: number;
}

export const ResearchHeroSection: React.FC = () => {
  const [heroTitle, setHeroTitle] = useState('Discover Cutting-Edge Research');
  const [heroDescription, setHeroDescription] = useState('Explore the latest research papers, listen to expert discussions, and watch in-depth presentations from leading researchers worldwide');
  const [featuredPapers, setFeaturedPapers] = useState<FeaturedPaper[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch hero section content
      const { data: heroData } = await (supabase as any)
        .from('page_sections')
        .select('*')
        .eq('section_type', 'research-hub-hero')
        .maybeSingle();

      if (heroData?.content) {
        setHeroTitle(heroData.content.title || heroTitle);
        setHeroDescription(heroData.content.description || heroDescription);
      }

      // Fetch featured papers that should show in hero
      const { data: papers } = await (supabase as any)
        .from('research_hub_featured_papers')
        .select('*')
        .eq('show_in_hero', true)
        .order('display_order', { ascending: true });

      if (papers) {
        setFeaturedPapers(papers);
      }
    };

    fetchData();
  }, []);

  return (
    <section 
      className="relative pt-12 pb-[21px] px-20 max-md:max-w-full max-md:px-5"
      style={{
        background: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)'
      }}
    >
      <SectionTagBadge sectionTag="research-hub-hero" adminPath="/admin/research-hub" />
      <div className="w-full px-8 max-md:max-w-full max-md:px-5">
        <div className="flex flex-col items-center text-white text-center pb-[9px] px-20 max-md:max-w-full max-md:px-5">
          <div className="w-[786px] max-w-full ml-[11px]">
            <h1 className="text-5xl font-bold leading-none mr-[23px] max-md:max-w-full max-md:text-[40px] max-md:mr-2.5">
              {heroTitle}
            </h1>
            <p className="text-xl font-normal leading-7 mt-[17px] max-md:max-w-full">
              {heroDescription}
            </p>
          </div>
        </div>
        
        <div className="mt-12 max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            {featuredPapers.map((paper) => (
              <div key={paper.id} className="w-[33%] max-md:w-full max-md:ml-0">
                <div className="max-md:mt-8">
                  <PaperCard 
                    title={paper.title}
                    description={paper.description}
                    author={paper.author}
                    year={paper.year}
                    views={paper.views}
                    comments={paper.comments}
                    image={paper.image_url}
                    pdfUrl={paper.pdf_url}
                    badges={paper.badges}
                    variant="hero" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};