import React, { useState } from 'react';
import { PublicationSearch } from '../forms/PublicationSearch';
import { PublicationCard } from '../cards/PublicationCard';

interface SearchFilters {
  query: string;
  researchArea: string;
  publicationType: string;
  yearRange: string;
  sortBy: string;
}

export const PublicationsSection: React.FC = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    researchArea: 'all',
    publicationType: 'all',
    yearRange: 'all',
    sortBy: 'recent'
  });

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  const featuredPublication = {
    title: "Privacy-Preserving SFCW Radar for Contactless Fall Detection in Smart Assisted Living Environments",
    authors: "S. Chen, M. Rodriguez, A. Johnson, K. Williams",
    journal: "IEEE Transactions on Biomedical Engineering, Vol. 71, No. 8, 2024",
    journalColor: "text-blue-600",
    abstract: "This paper presents a novel SFCW radar system specifically designed for fall detection in assisted living facilities, with particular emphasis on privacy preservation and bathroom monitoring capabilities. The system achieves 98.9% sensitivity and 99% specificity while maintaining complete visual privacy.",
    tags: [
      { label: "SFCW Radar", color: "bg-blue-100 text-blue-800", icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/be4c1c8396bd5878adffd5ed8d1747c2272c05c1?placeholderIfAbsent=true" },
      { label: "Privacy Technology", color: "bg-green-100 text-green-800", icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/5adbb04c68b5fa480d2a5662cb54672b4608d096?placeholderIfAbsent=true" },
      { label: "Fall Detection", color: "bg-purple-100 text-purple-800", icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/076a8ff8df88a516c8f163f83aeda7e3a6f630e4?placeholderIfAbsent=true" },
      { label: "Peer-Reviewed", color: "bg-orange-100 text-orange-800", icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/13a2f88976304b3abce6479de13f7ab6206a5bdb?placeholderIfAbsent=true" }
    ],
    year: "2024",
    citations: "67",
    citationColor: "text-blue-600",
    isFeatured: true
  };

  const publications = [
    {
      title: "WiFi CSI-Based Human Activity Recognition for Ambient Assisted Living",
      authors: "M. Rodriguez, S. Chen, L. Zhang, P. Kumar",
      journal: "Sensors Journal, Vol. 24, No. 12, 2024",
      journalColor: "text-green-600",
      abstract: "Comprehensive study of WiFi Channel State Information extraction for contactless human activity recognition in assisted living environments, focusing on scalability and privacy preservation.",
      tags: [
        { label: "WiFi CSI", color: "bg-green-100 text-green-800", icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/db8ee2f1fca649e9440459100a179268153c391d?placeholderIfAbsent=true" },
        { label: "Assisted Living", color: "bg-blue-100 text-blue-800", icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/e73ea515f852285269089aaeac2c87a44c9f6c90?placeholderIfAbsent=true" },
        { label: "Privacy", color: "bg-purple-100 text-purple-800", icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/1688bf3e7f9ae5059b97036ee8553535afa41af0?placeholderIfAbsent=true" }
      ],
      year: "2024",
      citations: "42",
      citationColor: "text-green-600",
      badges: ["Open Access"]
    },
    {
      title: "Contactless Vital Signs Monitoring Using Ultra-Wideband Radar Technology",
      authors: "S. Chen, A. Johnson, M. Rodriguez, T. Lee",
      journal: "IEEE Access, Vol. 11, 2023",
      journalColor: "text-purple-600",
      abstract: "Novel approach to contactless vital signs monitoring using UWB radar technology, demonstrating high accuracy in heart rate and respiration rate detection for elderly care applications.",
      tags: [
        { label: "Vital Signs", color: "bg-red-100 text-red-800", icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/1a76be920d71dd5bddaa1c958bfb1d22b53f6050?placeholderIfAbsent=true" },
        { label: "UWB Radar", color: "bg-blue-100 text-blue-800", icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/cd4794ba7fdf42723dd13363a43c084bcc230a80?placeholderIfAbsent=true" },
        { label: "Elderly Care", color: "bg-green-100 text-green-800", icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/8f671a711b30606430fd4498231b2edb8882e296?placeholderIfAbsent=true" }
      ],
      year: "2023",
      citations: "89",
      citationColor: "text-purple-600",
      badges: ["High Impact"]
    },
    {
      title: "Machine Learning Approaches for Fall Detection in Assisted Living Environments",
      authors: "M. Rodriguez, S. Chen, K. Patel, R. Anderson",
      journal: "Journal of Ambient Intelligence, 2023",
      journalColor: "text-orange-600",
      abstract: "Comprehensive review and comparison of machine learning algorithms for fall detection systems, with focus on accuracy, computational efficiency, and real-time performance in assisted living facilities.",
      tags: [
        { label: "Machine Learning", color: "bg-orange-100 text-orange-800", icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/1d6c511a54dc01e504330820165280150528eb13?placeholderIfAbsent=true" },
        { label: "Fall Detection", color: "bg-red-100 text-red-800", icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/bdcf615be1be31fd7aa4bcf5d338f94c0eb17f6c?placeholderIfAbsent=true" },
        { label: "Assisted Living", color: "bg-blue-100 text-blue-800", icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/eebfd31c9a43979471e2c53cb232951f1146f469?placeholderIfAbsent=true" }
      ],
      year: "2023",
      citations: "56",
      citationColor: "text-orange-600",
      badges: ["Featured Article"]
    },
    {
      title: "Privacy-by-Design Framework for Healthcare IoT Sensing Systems",
      authors: "S. Chen, M. Rodriguez, D. Kim, J. Martinez",
      journal: "ACM Transactions on Privacy and Security, 2023",
      journalColor: "text-teal-600",
      abstract: "Comprehensive framework for implementing privacy-by-design principles in healthcare IoT sensing systems, with specific focus on elderly monitoring applications and regulatory compliance.",
      tags: [
        { label: "Privacy by Design", color: "bg-purple-100 text-purple-800", icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/9310075573ab4aa08ac086bf221f2de9824a5699?placeholderIfAbsent=true" },
        { label: "Healthcare IoT", color: "bg-blue-100 text-blue-800", icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/5f25f440ad1acf2c3067a04a67fe84d341d8367a?placeholderIfAbsent=true" },
        { label: "Compliance", color: "bg-green-100 text-green-800", icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/ef65ce86d43013ccb1fafc61777cfe441f92f9bc?placeholderIfAbsent=true" }
      ],
      year: "2023",
      citations: "73",
      citationColor: "text-teal-600",
      badges: ["Best Paper Award"]
    }
  ];

  return (
    <section className="bg-white w-full py-16 lg:py-20 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center font-normal text-center pb-2 max-md:max-w-full">
          <div className="flex w-[755px] max-w-full flex-col items-stretch">
            <h2 className="text-gray-900 text-4xl leading-none self-center">
              Publications Database
            </h2>
            <p className="text-gray-600 text-xl leading-7 mt-[37px] max-md:max-w-full">
              Comprehensive collection of peer-reviewed research contributions in healthcare sensing, privacy technology, and RF engineering
            </p>
          </div>
        </div>

        <PublicationSearch onFiltersChange={handleFiltersChange} />

        <div className="mt-12 max-md:max-w-full max-md:mt-10">
          <div className="border-blue-200 p-[34px] rounded-2xl border-solid border-2 max-md:max-w-full max-md:pl-5">
            <div className="bg-[rgba(0,0,0,0)] flex w-full items-stretch gap-5 flex-wrap justify-between max-md:max-w-full max-md:mr-2.5">
              <div className="bg-[rgba(0,0,0,0)] flex gap-2 text-sm text-yellow-800 font-medium px-3 py-1 rounded-full">
                <img
                  src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/2939e65f2d5dfa1eda6a7f1ed948c38ebb4e56a5?placeholderIfAbsent=true"
                  className="aspect-[0.8] object-contain w-4 shrink-0"
                  alt=""
                />
                <span className="basis-auto">Featured Publication</span>
              </div>
              <div className="bg-[rgba(0,0,0,0)] whitespace-nowrap text-right">
                <div className="bg-[rgba(0,0,0,0)] flex w-[54px] flex-col text-2xl text-blue-600 font-bold pb-[18px] px-[27px] max-md:mr-1 max-md:pl-5">
                  <div className="z-10 -mt-1">{featuredPublication.citations}</div>
                </div>
                <div className="bg-[rgba(0,0,0,0)] text-sm text-blue-800 font-normal pb-2.5 px-0.5">
                  <div className="z-10">Citations</div>
                </div>
              </div>
            </div>
            <div className="bg-[rgba(0,0,0,0)] mt-4 max-md:max-w-full">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                <div className="w-[67%] max-md:w-full max-md:ml-0">
                  <div className="bg-[rgba(0,0,0,0)] flex w-full flex-col text-xs mx-auto pb-4 max-md:max-w-full">
                    <h3 className="text-gray-900 text-2xl font-bold leading-8 self-stretch mr-6 max-md:max-w-full max-md:mr-2.5">
                      {featuredPublication.title}
                    </h3>
                    <p className="text-black font-normal leading-loose mt-5 max-md:max-w-full">
                      <span className="font-bold text-base text-gray-700">Authors:</span>
                      <span className="text-base text-gray-700"> {featuredPublication.authors}</span>
                    </p>
                    <p className="text-blue-600 text-base font-semibold mt-[25px] max-md:max-w-full">
                      {featuredPublication.journal}
                    </p>
                    <p className="text-gray-600 text-base font-normal leading-6 self-stretch mt-6 max-md:max-w-full">
                      {featuredPublication.abstract}
                    </p>
                    <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-2 font-medium flex-wrap mt-8 pr-20 max-md:pr-5">
                      {featuredPublication.tags.map((tag, index) => (
                        <span key={index} className={`flex items-stretch gap-1 px-3 py-[3px] rounded-full ${tag.color}`}>
                          <img
                            src={tag.icon}
                            className="aspect-[0.75] object-contain w-3 shrink-0"
                            alt=""
                          />
                          <span>{tag.label}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-[33%] ml-5 max-md:w-full max-md:ml-0">
                  <div className="bg-[rgba(0,0,0,0)] whitespace-nowrap text-center w-full mt-[63px] pt-[5px] pb-[25px] px-[15px] max-md:mt-10">
                    <div className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] w-full p-6 rounded-xl max-md:px-5">
                      <div className="bg-[rgba(240,240,240,1)] flex flex-col items-center text-xs text-[rgba(153,153,153,1)] font-normal justify-center rounded-lg max-md:mr-[3px]">
                        <div>IMG<br />313.34375×72</div>
                      </div>
                      <div className="bg-[rgba(0,0,0,0)] flex w-full items-stretch gap-[40px_81px] text-sm font-medium mt-[58px] max-md:mt-10">
                        <button className="bg-[rgba(0,0,0,0)] flex items-stretch gap-2 text-blue-600 flex-1 hover:underline">
                          <img
                            src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/ce867e921249298f4a0985b27039762a3a6f992a?placeholderIfAbsent=true"
                            className="aspect-[0.7] object-contain w-3.5 shrink-0"
                            alt=""
                          />
                          <span>PDF</span>
                        </button>
                        <button className="bg-[rgba(0,0,0,0)] flex items-stretch gap-[7px] text-purple-600 flex-1 hover:underline">
                          <img
                            src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/16d3cf8176a3f48d4f0680684043e37322457411?placeholderIfAbsent=true"
                            className="aspect-[0.6] object-contain w-3 shrink-0"
                            alt=""
                          />
                          <span>Cite</span>
                        </button>
                        <button className="bg-[rgba(0,0,0,0)] flex items-stretch gap-1.5 text-green-600 flex-1 hover:underline">
                          <img
                            src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/15427798d34b7e4cd850de39a446217906883a18?placeholderIfAbsent=true"
                            className="aspect-[0.7] object-contain w-3.5 shrink-0"
                            alt=""
                          />
                          <span>Share</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full mt-[27px] pt-[5px] pb-[25px] max-md:max-w-full">
            <div className="max-md:max-w-full">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                {publications.slice(0, 2).map((publication, index) => (
                  <div key={index} className="w-6/12 max-md:w-full max-md:ml-0">
                    <PublicationCard {...publication} />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 max-md:max-w-full">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                {publications.slice(2, 4).map((publication, index) => (
                  <div key={index} className="w-6/12 max-md:w-full max-md:ml-0">
                    <PublicationCard {...publication} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center text-base text-white font-semibold text-center mt-[7px] max-md:max-w-full">
            <button className="bg-blue-600 flex w-[370px] max-w-full items-stretch gap-[40px_45px] pt-[11px] pb-0.5 px-[35px] rounded-lg max-md:px-5 hover:bg-blue-700 transition-colors">
              <img
                src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/091e165165450b51c3b19cbd9989502826ec1daa?placeholderIfAbsent=true"
                className="aspect-[0.56] object-contain w-3.5 shrink-0"
                alt=""
              />
              <span className="grow shrink w-[238px]">Load More Publications (39 remaining)</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
