import React from 'react';

const Hero = () => {
  return (
    <section className="flex flex-col items-stretch font-normal text-center justify-center px-20 py-16 max-md:max-w-full max-md:px-5">
      <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center px-20 max-md:max-w-full max-md:px-5">
        <div className="bg-[rgba(0,0,0,0)] flex w-[898px] max-w-full flex-col items-stretch">
          <div className="text-black text-xs leading-[60px] self-center ml-[33px] max-md:max-w-full">
            <span style={{ fontSize: '60px', color: 'rgba(17,24,39,1)' }}>
              Connect with
            </span>
            <span style={{ fontSize: '60px', color: 'rgba(37,99,235,1)' }}>
              {" "}Care Aware Tech
            </span>
          </div>
          <div className="text-gray-700 text-xl leading-[33px] z-10 mt-[-22px] max-md:max-w-full">
            Ready to pioneer the future of privacy-first senior safety?
            Choose your pathway to partnership, collaboration, or
            investment opportunities.
          </div>
          <div className="bg-[rgba(0,0,0,0)] flex w-full flex-col items-center text-sm text-gray-600 leading-none mt-[45px] px-[70px] max-md:max-w-full max-md:mr-0.5 max-md:mt-10 max-md:px-5">
            <div className="flex w-[582px] max-w-full items-stretch gap-5 flex-wrap justify-between">
              <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-[9px]">
                <img
                  src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/ecbdf9e1908b98ec7b33d2821b0e004d5de816b6?placeholderIfAbsent=true"
                  className="aspect-[0.7] object-contain w-3.5 shrink-0"
                  alt="Response time icon"
                />
                <div className="basis-auto">
                  Response within 24 hours
                </div>
              </div>
              <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-[9px]">
                <img
                  src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/14b97d12f57a213c6d944d5c65979ca6d53b9f39?placeholderIfAbsent=true"
                  className="aspect-[0.7] object-contain w-3.5 shrink-0"
                  alt="Confidential icon"
                />
                <div className="basis-auto">
                  Confidential discussions
                </div>
              </div>
              <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-2.5 whitespace-nowrap">
                <img
                  src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/279f98c911b85a4650bdfb60d1bef178c6555604?placeholderIfAbsent=true"
                  className="aspect-[0.85] object-contain w-[17px] shrink-0"
                  alt="Partnership icon"
                />
                <div className="basis-auto">
                  Partnership-focused
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
