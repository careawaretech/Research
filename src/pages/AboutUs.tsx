import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Mission from '@/components/Mission';
import Statistics from '@/components/Statistics';
import Vision from '@/components/Vision';
import Values from '@/components/Values';
import Team from '@/components/Team';
import Timeline from '@/components/Timeline';
import Advisory from '@/components/Advisory';
import Philosophy from '@/components/Philosophy';
import Roadmap from '@/components/Roadmap';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-gray-50 max-w-full w-[1440px] mx-auto">
        <Header />
        <main>
          <HeroSection pageSlug="about" />
          <Mission />
          <Statistics />
          <Vision />
          <Values />
          <Team />
          <Timeline />
          <Advisory />
          <Philosophy />
          <Roadmap />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AboutUs;
