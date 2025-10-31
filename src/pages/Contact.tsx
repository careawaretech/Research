import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import InquiryTypes from '@/components/InquiryTypes';
import ContactMethods from '@/components/ContactMethods';
import FAQ from '@/components/FAQ';
import Partners from '@/components/Partners';
import OfficeLocation from '@/components/OfficeLocation';
import Footer from '@/components/Footer';

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection pageSlug="contact" />
        <InquiryTypes />
        <ContactMethods />
        <FAQ />
        <Partners />
        <OfficeLocation />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
