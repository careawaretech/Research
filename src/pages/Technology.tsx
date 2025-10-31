import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import TechnologyTable from '@/components/TechnologyComparisonTable';
import MetricsCards from '@/components/TechnologyMetricsCards';
import RadarDeepDive from '@/components/TechnologyRadarDeepDive';
import WiFiDeepDive from '@/components/TechnologyWiFiDeepDive';
import ApplicationScenarios from '@/components/TechnologyApplicationScenarios';
import ComprehensiveComparison from '@/components/TechnologyComprehensiveComparison';
import DevelopmentRoadmap from '@/components/TechnologyDevelopmentRoadmap';

const Technology = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div style={{ background: 'linear-gradient(135deg, #1E40AF, #10B981)' }}>
          <HeroSection pageSlug="technology" />
        </div>
        <TechnologyTable />
        <MetricsCards />
        <RadarDeepDive />
        <WiFiDeepDive />
        <ApplicationScenarios />
        <ComprehensiveComparison />
        <DevelopmentRoadmap />
      </main>
      <Footer />
    </div>
  );
};

export default Technology;
