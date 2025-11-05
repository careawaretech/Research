import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ResearchHeroSection } from '@/components/research-hub/ResearchHeroSection';
import { CategoriesSection } from '@/components/research-hub/CategoriesSection';
import { LatestPapersSection } from '@/components/research-hub/LatestPapersSection';
import { TrendingTopicsSection } from '@/components/research-hub/TrendingTopicsSection';
import { CollectionsSection } from '@/components/research-hub/CollectionsSection';
import { NewsletterSection } from '@/components/research-hub/NewsletterSection';

const ResearchHub = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ResearchHeroSection />
        <CategoriesSection />
        <LatestPapersSection />
        <TrendingTopicsSection />
        <CollectionsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default ResearchHub;
