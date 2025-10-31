import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <section className="w-full py-16 lg:py-20 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[rgba(0,0,0,0)] max-md:max-w-full">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <div className="w-6/12 max-md:w-full max-md:ml-0">
              <div className="bg-[rgba(0,0,0,0)] w-full text-base mx-auto max-md:max-w-full">
                <div className="bg-[rgba(0,0,0,0)] flex w-full flex-col items-stretch text-blue-100 font-medium pr-1.5 max-md:max-w-full">
                  <div className="bg-[rgba(255,255,255,0.1)] flex items-stretch gap-2 pl-4 pr-px py-2 rounded-full">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/c7ae905d78a3337776e04d60fc35406d1168faf8?placeholderIfAbsent=true"
                      className="aspect-[0.67] object-contain w-4 shrink-0"
                      alt="technology icon"
                    />
                    <div className="bg-[rgba(0,0,0,0)] pb-[9px]">
                      <div className="z-10">Advanced Sensing Technologies</div>
                    </div>
                  </div>
                  <div className="text-black text-xs font-normal leading-[60px] mt-6 max-md:max-w-full">
                    <span style={{fontSize: '60px', color: 'rgba(255,255,255,1)'}}>
                      Dual Technology
                    </span>
                    <span style={{fontSize: '60px', color: 'rgba(147,197,253,1)'}}>
                      {" "}Deep Dive
                    </span>
                  </div>
                  <div className="text-xl font-normal leading-[33px] mt-10 max-md:max-w-full max-md:mr-2.5">
                    Comprehensive exploration of our SFCW Radar and WiFi Signal Analysis platforms—two revolutionary approaches to privacy-first fall detection and vital signs monitoring.
                  </div>
                  <div className="bg-[rgba(249,115,22,0.2)] border flex w-[584px] max-w-full flex-col items-stretch text-orange-100 justify-center mt-9 p-[17px] rounded-lg border-[rgba(251,146,60,0.3)] border-solid">
                    <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-2 flex-wrap">
                      <img
                        src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/03ec198af2da5483037ca3dd68c6d2ff8979e075?placeholderIfAbsent=true"
                        className="aspect-[0.5] object-contain w-3 shrink-0"
                        alt="privacy icon"
                      />
                      <div className="grow shrink w-[528px] basis-auto max-md:max-w-full">
                        Physics-based privacy: No cameras, no compromise, no exceptions.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[rgba(0,0,0,0)] flex w-[584px] max-w-full items-stretch gap-4 font-semibold text-center flex-wrap mt-8 pr-20 max-md:pr-5">
                  <button className="bg-white flex gap-[18px] text-blue-900 grow shrink basis-auto px-8 py-[18px] rounded-lg max-md:px-5 hover:bg-gray-50 transition-colors">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/b52ec419b3dc7c4348a510cbb7582e0bdcfe16eb?placeholderIfAbsent=true"
                      className="aspect-[0.67] object-contain w-4 shrink-0"
                      alt="specifications icon"
                    />
                    <div className="basis-auto">Technical Specifications</div>
                  </button>
                  <button className="bg-[rgba(0,0,0,0)] flex gap-[25px] text-white px-[34px] py-[18px] rounded-lg border-white border-solid border-2 max-md:px-5 hover:bg-white hover:text-gray-900 transition-colors">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/51e74532a55ddbb72730b27e80f3acc88d38dcd7?placeholderIfAbsent=true"
                      className="aspect-[0.67] object-contain w-4 shrink-0"
                      alt="research icon"
                    />
                    <div className="basis-auto">Research Papers</div>
                  </button>
                </div>
              </div>
            </div>
            <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
              <div className="bg-[rgba(0,0,0,0)] w-full mt-11 max-md:max-w-full max-md:mt-10">
                <div className="bg-[rgba(0,0,0,0)] w-full max-md:max-w-full">
                  <div className="max-md:max-w-full">
                    <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                      <div className="w-6/12 max-md:w-full max-md:ml-0">
                        <div className="bg-[rgba(255,255,255,0.1)] flex grow flex-col items-stretch text-center w-full p-6 rounded-2xl max-md:mt-6 max-md:px-5">
                          <img
                            src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/b91a06f232501b7fa65aef9a2e8f442e9be97c3e?placeholderIfAbsent=true"
                            className="aspect-[1] object-contain w-16 self-center rounded-full"
                            alt="SFCW Radar"
                          />
                          <div className="bg-[rgba(0,0,0,0)] text-lg text-white font-bold mt-4 pb-4 px-[62px] max-md:px-5">
                            <div className="z-10">SFCW Radar</div>
                          </div>
                          <div className="bg-[rgba(0,0,0,0)] text-sm text-blue-200 font-normal mt-2 pb-[7px] px-[3px]">
                            <div className="z-10">Clinical-grade contactless sensing</div>
                          </div>
                        </div>
                      </div>
                      <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
                        <div className="bg-[rgba(255,255,255,0.1)] flex grow flex-col items-stretch text-center w-full p-6 rounded-2xl max-md:mt-6 max-md:pl-5">
                          <img
                            src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/5f60c1f99aec8df5462f0002639c142ec5f7f8f2?placeholderIfAbsent=true"
                            className="aspect-[1] object-contain w-16 self-center rounded-full"
                            alt="WiFi CSI"
                          />
                          <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center text-lg text-white font-bold mt-4 pb-[15px] px-[70px] max-md:mr-1.5 max-md:px-5">
                            <div className="z-10">WiFi CSI</div>
                          </div>
                          <div className="bg-[rgba(0,0,0,0)] text-sm text-green-200 font-normal mt-2 pb-[7px] px-0.5">
                            <div className="z-10">Infrastructure-integrated monitoring</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[rgba(255,255,255,0.1)] flex flex-col items-stretch text-center mt-6 p-6 rounded-2xl max-md:max-w-full max-md:px-5">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/e00975257fad7bf69bcaaee65f01694ef73666d2?placeholderIfAbsent=true"
                      className="aspect-[1] object-contain w-16 self-center rounded-full"
                      alt="Privacy by Physics"
                    />
                    <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center text-lg text-white font-bold mt-4 pb-[11px] px-[70px] max-md:max-w-full max-md:px-5">
                      <div className="z-10">Privacy by Physics</div>
                    </div>
                    <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center text-sm text-purple-200 font-normal mt-2 pb-[7px] px-[70px] max-md:max-w-full max-md:px-5">
                      <div className="z-10">Inherent protection through technology design</div>
                    </div>
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
