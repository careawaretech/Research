import React, { useState } from 'react';
import { PaperCard } from '@/components/research-hub/PaperCard';

export const LatestPapersSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('Sort by Date');

  const papers = [
    {
      title: "Contactless Vital Signs Monitoring in Clinical Settings",
      description: "Advanced sensor fusion techniques for non-invasive patient monitoring with clinical validation results.",
      author: "Dr. Emily Johnson",
      year: "2024",
      views: "892",
      comments: "67",
      image: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/e1bc88be3683a6acf2e74129ed2cfa78e99c310b?placeholderIfAbsent=true",
      badges: [
        { text: "Open Access", color: "text-green-800", bgColor: "bg-green-100" }
      ]
    },
    {
      title: "Machine Learning for Elderly Fall Prevention Systems",
      description: "Comprehensive study on predictive models for fall risk assessment using wearable and ambient sensors.",
      author: "Dr. Robert Kim",
      year: "2024",
      views: "1.4k",
      comments: "98",
      image: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/cd8df8efc1a765842e8b945ed5cab7e1dc8b0544?placeholderIfAbsent=true",
      badges: [
        { text: "Editor's Pick", color: "text-yellow-800", bgColor: "bg-yellow-100" }
      ]
    },
    {
      title: "Privacy-First Ambient Intelligence in Smart Homes",
      description: "Novel approaches to privacy-preserving smart home systems with edge computing and federated learning.",
      author: "Dr. Maria Garcia",
      year: "2024",
      views: "756",
      comments: "45",
      image: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/e1337524d024a02922dab6636ab03a4992964cb8?placeholderIfAbsent=true",
      badges: [
        { text: "Peer Reviewed", color: "text-blue-800", bgColor: "bg-blue-100" }
      ]
    },
    {
      title: "Federated Learning for Healthcare Data Privacy",
      description: "Distributed machine learning approaches for medical data analysis while preserving patient privacy.",
      author: "Dr. James Liu",
      year: "2024",
      views: "1.8k",
      comments: "134",
      image: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/f522c5ae46946e265c9ea12c349d82d52d9021b6?placeholderIfAbsent=true",
      badges: [
        { text: "Conference", color: "text-purple-800", bgColor: "bg-purple-100" }
      ]
    },
    {
      title: "Quantum-Safe Cryptography for IoT Devices",
      description: "Post-quantum cryptographic algorithms for securing Internet of Things devices against future quantum threats.",
      author: "Dr. Anna Petrov",
      year: "2024",
      views: "2.1k",
      comments: "189",
      image: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/0f8e3ffc118565a86244584949bc2f657e17f4da?placeholderIfAbsent=true",
      badges: [
        { text: "High Impact", color: "text-red-800", bgColor: "bg-red-100" }
      ]
    },
    {
      title: "Sustainable Computing: Green AI Algorithms",
      description: "Energy-efficient machine learning algorithms and sustainable computing practices for environmental responsibility.",
      author: "Dr. Thomas Green",
      year: "2024",
      views: "967",
      comments: "72",
      image: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/29da2ad8f791b511cffd3948d9e246a984c25701?placeholderIfAbsent=true",
      badges: [
        { text: "Trending", color: "text-orange-800", bgColor: "bg-orange-100" }
      ]
    }
  ];

  return (
    <section className="bg-gray-50 flex flex-col items-stretch justify-center px-20 py-16 max-md:max-w-full max-md:px-5">
      <div className="w-full px-[17px] max-md:max-w-full">
        <div className="flex w-full max-w-[1216px] items-stretch gap-5 flex-wrap justify-between mx-[15px] max-md:max-w-full max-md:mr-2.5">
          <div className="flex flex-col items-stretch pb-[11px]">
            <h2 className="text-[rgba(44,62,80,1)] text-3xl font-bold leading-[1.2]">
              Latest Research Papers
            </h2>
            <p className="text-gray-600 text-lg font-normal leading-loose mt-4">
              Recently published papers across all categories
            </p>
          </div>
          <div className="flex items-stretch gap-4 text-base text-black font-normal my-auto max-md:max-w-full">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white border-gray-300 border px-2.5 py-2 rounded-lg border-solid outline-none"
            >
              <option>All Categories</option>
              <option>AI & Machine Learning</option>
              <option>Healthcare Technology</option>
              <option>Cybersecurity</option>
            </select>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border-gray-300 border px-2.5 py-2 rounded-lg border-solid outline-none"
            >
              <option>Sort by Date</option>
              <option>Sort by Views</option>
              <option>Sort by Comments</option>
            </select>
          </div>
        </div>
        
        <div className="w-full mt-[43px] pt-[5px] pb-[25px] px-[15px] max-md:max-w-full max-md:mt-10">
          <div className="max-md:max-w-full">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
              {papers.slice(0, 3).map((paper, index) => (
                <div key={index} className="w-[33%] max-md:w-full max-md:ml-0">
                  <div className="max-md:mt-8">
                    <PaperCard {...paper} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 max-md:max-w-full">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
              {papers.slice(3, 6).map((paper, index) => (
                <div key={index} className="w-[33%] max-md:w-full max-md:ml-0">
                  <div className="max-md:mt-8">
                    <PaperCard {...paper} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center text-base text-white font-medium text-center mt-[23px] mx-[15px] px-20 max-md:max-w-full max-md:mr-2.5 max-md:px-5">
          <button className="bg-[rgba(44,62,80,1)] w-[198px] max-w-full pt-[11px] pb-[22px] px-[31px] rounded-lg max-md:px-5 hover:bg-[rgba(44,62,80,0.9)] transition-colors">
            Load More Papers
          </button>
        </div>
      </div>
    </section>
  );
};
