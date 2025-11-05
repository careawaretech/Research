import React from 'react';
import { PaperCard } from '@/components/research-hub/PaperCard';

export const ResearchHeroSection: React.FC = () => {
  const featuredPapers = [
    {
      title: "Deep Learning Approaches in Healthcare Monitoring",
      description: "Comprehensive analysis of contactless patient monitoring using advanced AI techniques with privacy preservation.",
      author: "Dr. Sarah Chen",
      year: "2024",
      views: "1.2k",
      comments: "89",
      image: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/3ec1ab3dbed9de67c19dfb70c311346c8a7f8652?placeholderIfAbsent=true",
      badges: [
        { text: "FEATURED", color: "text-white", bgColor: "bg-[rgba(255,111,97,1)]" },
        { text: "NEW", color: "text-white", bgColor: "bg-[rgba(255,255,255,0.2)]" }
      ]
    },
    {
      title: "Privacy-Preserving Fall Detection Using Radar Technology",
      description: "Revolutionary SFCW radar applications for elderly care with complete privacy protection and clinical accuracy.",
      author: "Dr. Michael Rodriguez",
      year: "2024",
      views: "2.4k",
      comments: "156",
      image: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/d688131320f6ad8baa5d9999a4b9f5e85d9234eb?placeholderIfAbsent=true",
      badges: [
        { text: "TRENDING", color: "text-gray-900", bgColor: "bg-yellow-400" }
      ]
    },
    {
      title: "WiFi-Based Human Activity Recognition: A Comprehensive Survey",
      description: "Systematic review of WiFi sensing technologies for ambient human activity monitoring and classification systems.",
      author: "Dr. Lisa Wang",
      year: "2023",
      views: "3.1k",
      comments: "243",
      image: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/4f6aa0b4de3477d5c628cfa843a7a178cb84e0db?placeholderIfAbsent=true",
      badges: [
        { text: "POPULAR", color: "text-gray-900", bgColor: "bg-green-400" }
      ]
    }
  ];

  return (
    <section 
      className="pt-12 pb-[21px] px-20 max-md:max-w-full max-md:px-5"
      style={{
        background: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)'
      }}
    >
      <div className="w-full px-8 max-md:max-w-full max-md:px-5">
        <div className="flex flex-col items-center text-white text-center pb-[9px] px-20 max-md:max-w-full max-md:px-5">
          <div className="w-[786px] max-w-full ml-[11px]">
            <h1 className="text-5xl font-bold leading-none mr-[23px] max-md:max-w-full max-md:text-[40px] max-md:mr-2.5">
              Discover Cutting-Edge Research
            </h1>
            <p className="text-xl font-normal leading-7 mt-[17px] max-md:max-w-full">
              Explore the latest research papers, listen to expert discussions, and watch in-depth presentations from leading researchers worldwide
            </p>
          </div>
        </div>
        
        <div className="mt-12 max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            {featuredPapers.map((paper, index) => (
              <div key={index} className="w-[33%] max-md:w-full max-md:ml-0">
                <div className="max-md:mt-8">
                  <PaperCard {...paper} variant="hero" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
