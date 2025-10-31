import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import PrivacyPrinciplesSection from '@/components/PrivacyPrinciplesSection';
import PrivacyComparisonMatrix from '@/components/PrivacyComparisonMatrix';
import PrivacyAdvantagesSection from '@/components/PrivacyAdvantagesSection';
import PrivacyDataSecuritySection from '@/components/PrivacyDataSecuritySection';
import PrivacyMarketImpactSection from '@/components/PrivacyMarketImpactSection';
import PrivacyCallToAction from '@/components/PrivacyCallToAction';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection pageSlug="privacy" />
        <PrivacyPrinciplesSection />
        <PrivacyComparisonMatrix />
        <PrivacyAdvantagesSection />
        <PrivacyDataSecuritySection />
        <PrivacyMarketImpactSection />
        <PrivacyCallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
