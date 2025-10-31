import React from 'react';

export const DevelopmentRoadmap: React.FC = () => {
  return (
    <section className="bg-white flex w-full flex-col items-stretch justify-center p-20 max-md:max-w-full max-md:px-5">
      <div className="bg-[rgba(0,0,0,0)] px-8 max-md:max-w-full max-md:px-5">
        <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center font-normal text-center pb-[9px] px-20 max-md:max-w-full max-md:px-5">
          <div className="flex w-[771px] max-w-full flex-col items-stretch">
            <div className="text-gray-900 text-4xl leading-none self-center max-md:max-w-full">
              Technology Development Roadmap
            </div>
            <div className="text-gray-600 text-xl leading-7 mt-[30px] max-md:max-w-full">
              Our strategic development timeline for both platforms, from current capabilities to future commercial deployment
            </div>
          </div>
        </div>
        
        <div className="bg-[rgba(0,0,0,0)] mt-16 max-md:max-w-full max-md:mt-10">
          <div className="w-full pt-12 pb-[23px] px-[33px] rounded-3xl max-md:max-w-full max-md:px-5" style={{background: 'linear-gradient(135deg, #EBF8FF, #F0FDF4)'}}>
            <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-4 text-3xl text-blue-900 font-normal leading-[1.2] flex-wrap ml-[15px]">
              <img
                src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/e1a02d610007134c72ce8d7ae210e710376ec0f1?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-16 shrink-0 rounded-full"
                alt="SFCW Radar Development"
              />
              <div className="grow shrink w-[1027px] basis-auto my-auto max-md:max-w-full">
                SFCW Radar Development Timeline
              </div>
            </div>
            
            <div className="bg-[rgba(0,0,0,0)] mt-[27px] pl-[15px] pr-20 pt-[5px] pb-[25px] max-md:max-w-full max-md:pr-5">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                <div className="w-6/12 max-md:w-full max-md:ml-0">
                  <div className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] grow w-full p-6 rounded-2xl max-md:mt-[29px] max-md:px-5">
                    <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center text-center pb-[9px] px-[38px] max-md:px-5">
                      <img
                        src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/144f0d19f79156a0a7a06d8235064ca7c4bdb11f?placeholderIfAbsent=true"
                        className="aspect-[1] object-contain w-12 rounded-full"
                        alt="Phase 1 Complete"
                      />
                      <div className="text-gray-900 text-base font-bold self-stretch mt-3">
                        Phase 1 Complete
                      </div>
                      <div className="text-green-600 text-sm font-medium leading-none mt-[9px]">
                        Q4 2024 ✓
                      </div>
                    </div>
                    
                    <ul className="bg-[rgba(0,0,0,0)] text-sm text-gray-600 font-normal mt-4">
                      {[
                        'Prototype development',
                        'Algorithm validation',
                        'Lab testing complete',
                        '98.9% sensitivity achieved'
                      ].map((item, index) => (
                        <li key={index} className={`bg-[rgba(0,0,0,0)] flex flex-col ${index > 0 ? 'mt-2' : ''} pb-2 max-md:pr-5`}>
                          <div className="z-10">• {item}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
                  <div className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] border-yellow-300 grow text-center w-full pt-[26px] pb-[125px] px-[26px] rounded-2xl border-solid border-2 max-md:mt-[29px] max-md:pb-[100px] max-md:px-5">
                    <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center pb-[9px] px-[42px] max-md:px-5">
                      <img
                        src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/6f33824ca19b6cf513262bde4dd4af0db34cd472?placeholderIfAbsent=true"
                        className="aspect-[1] object-contain w-12 rounded-full"
                        alt="Phase 2 Active"
                      />
                      <div className="text-gray-900 text-base font-bold mt-3">
                        Phase 2 Active
                      </div>
                      <div className="text-yellow-600 text-sm font-medium leading-none mt-3">
                        Q1-Q2 2025
                      </div>
                    </div>
                    
                    <div className="bg-[rgba(0,0,0,0)] flex shrink-0 h-px mt-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
