import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import ROICalculator from '@/components/ROICalculator';

const ROI = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection pageSlug="roi" />
        <div className="py-16 lg:py-20 px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Return on Investment Calculator
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Understand the financial impact of implementing our fall detection system in your facility
              </p>
            </div>
            <ROICalculator />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ROI;
