import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FilterSection from '@/components/case-studies/FilterSection';
import FeaturedCaseStudy from '@/components/case-studies/FeaturedCaseStudy';
import CaseStudyGrid from '@/components/case-studies/CaseStudyGrid';
import StatsSection from '@/components/case-studies/StatsSection';
import TestimonialsSection from '@/components/case-studies/TestimonialsSection';
import ResearchSection from '@/components/case-studies/ResearchSection';
import ResourcesSection from '@/components/case-studies/ResourcesSection';

const CaseStudies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection pageSlug="case-studies" />
        <FilterSection />
        <FeaturedCaseStudy />
        <CaseStudyGrid />
        <StatsSection />
        <TestimonialsSection />
        <ResearchSection />
        <ResourcesSection />
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudies;
