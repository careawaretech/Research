import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-b from-primary/5 to-background flex flex-col items-stretch justify-center px-6 py-20 lg:px-20 lg:py-24">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Real-World Case Studies
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mb-8">
            Explore documented success stories from healthcare facilities using Care Aware Tech's 
            privacy-first monitoring solutions. Each case study demonstrates measurable improvements 
            in resident safety, staff efficiency, and operational outcomes.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2 bg-background rounded-lg px-6 py-3 shadow-sm">
              <span className="text-3xl font-bold text-primary">84</span>
              <span className="text-sm text-muted-foreground">Active Case Studies</span>
            </div>
            <div className="flex items-center gap-2 bg-background rounded-lg px-6 py-3 shadow-sm">
              <span className="text-3xl font-bold text-primary">1,240</span>
              <span className="text-sm text-muted-foreground">Residents Monitored</span>
            </div>
            <div className="flex items-center gap-2 bg-background rounded-lg px-6 py-3 shadow-sm">
              <span className="text-3xl font-bold text-primary">91%</span>
              <span className="text-sm text-muted-foreground">Average Accuracy</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
