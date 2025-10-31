import React from 'react';
import { StatCard } from '../cards/StatCard';

export const HeroSection: React.FC = () => {
  const stats = [
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/c7fb2cac4282c8024e4a6dadb534db27a9962028?placeholderIfAbsent=true",
      value: "47",
      label: "Total Publications",
      description: "Peer-reviewed & Conference"
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/89276f7e42efd8eafa13257dead990668749eda6?placeholderIfAbsent=true",
      value: "1247",
      label: "Total Citations",
      description: "Google Scholar Verified"
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/aa4de9202716c07bed70c1b56459c5f3b6ef3e5a?placeholderIfAbsent=true",
      value: "18",
      label: "h-index",
      description: "Research Impact Score"
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/21e9eb50b9a10faa563dce5cba8f37269f68240f?placeholderIfAbsent=true",
      value: "23",
      label: "i10-index",
      description: "High-Impact Papers"
    }
  ];

  return (
    <section className="flex w-full flex-col items-stretch justify-center px-20 py-[68px] max-md:max-w-full max-md:px-5">
      <div className="bg-[rgba(0,0,0,0)] w-full px-[17px] max-md:max-w-full">
        <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center font-normal text-center mx-[15px] max-md:max-w-full max-md:mr-2.5">
          <img
            src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/cc4bc3d9276656b12044ebe227de89f5992f83e9?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-20 rounded-full"
            alt="Research icon"
          />
          <h1 className="text-black text-xs leading-[60px] ml-7 mt-6 max-md:max-w-full">
            <span className="text-6xl text-gray-900">Research Credibility &</span>
            <span className="text-6xl text-blue-600"> Publications</span>
          </h1>
          <p className="text-gray-600 text-xl leading-7 z-10 mt-[-22px] ml-3 max-md:max-w-full">
            Demonstrating scientific excellence through peer-reviewed research, academic partnerships, and institutional backing in privacy-first healthcare sensing technology
          </p>
          <div className="bg-[rgba(0,0,0,0)] self-stretch flex w-full flex-col items-center text-base font-semibold mt-10 px-[70px] max-md:max-w-full max-md:px-5">
            <div className="flex w-[554px] max-w-full items-stretch gap-4 flex-wrap">
              <button className="bg-blue-600 flex gap-5 text-white flex-1 grow shrink basis-auto px-8 py-[18px] rounded-lg max-md:px-5 hover:bg-blue-700 transition-colors">
                <img
                  src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/cecc0fd169a1888f26e0caa2920c73d03c5ef72c?placeholderIfAbsent=true"
                  className="aspect-[0.67] object-contain w-4 shrink-0"
                  alt=""
                />
                <span className="basis-auto">Download All Publications</span>
              </button>
              <button className="bg-white border-purple-600 flex gap-[21px] text-purple-600 flex-1 grow shrink basis-auto px-[34px] py-[18px] rounded-lg border-solid border-2 max-md:px-5 hover:bg-purple-50 transition-colors">
                <img
                  src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/f8f8572519b1a966846c496e1fa94e148ffa7cb3?placeholderIfAbsent=true"
                  className="aspect-[0.67] object-contain w-4 shrink-0"
                  alt=""
                />
                <span className="basis-auto">View Research Portfolio</span>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-[rgba(0,0,0,0)] mt-[43px] pt-[5px] pb-[25px] px-[15px] max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            {stats.map((stat, index) => (
              <div key={index} className="w-3/12 max-md:w-full max-md:ml-0">
                <StatCard {...stat} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
