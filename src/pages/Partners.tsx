import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import NationalPartnershipOpportunitiesDynamic from '@/components/NationalPartnershipOpportunitiesDynamic';
import PartnershipTypesSection from '@/components/PartnershipTypesSection';
import FacilityPartnershipDeepDive from '@/components/FacilityPartnershipDeepDive';
import ResearchCollaborationSection from '@/components/ResearchCollaborationSection';
import GrantFundingSection from '@/components/GrantFundingSection';
import PortlandFacilitiesSection from '@/components/PortlandFacilitiesSection';
import PartnersApplicationSection from '@/components/PartnersApplicationSection';
import Footer from '@/components/Footer';

const Partners = () => {
  return (
    <div className="bg-gray-50">
      <Header />
      <main>
        <HeroSection pageSlug="partners" />
        <NationalPartnershipOpportunitiesDynamic />
        <PartnershipTypesSection />
        <FacilityPartnershipDeepDive />
        <ResearchCollaborationSection />
        <GrantFundingSection />
        <PortlandFacilitiesSection />
        <PartnersApplicationSection />
      </main>
      <Footer />
    </div>
  );
};

export default Partners;
