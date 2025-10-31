import React from 'react';

const Hero = () => {
  const handleDownloadWhitePaper = () => {
    // Implement download functionality
    console.log('Download white paper clicked');
  };

  const handleCompareTechnologies = () => {
    // Implement comparison functionality
    console.log('Compare technologies clicked');
  };

  return (
    <section className="w-full overflow-hidden py-16 lg:py-20 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex items-stretch gap-10 flex-wrap max-md:max-w-full">
        <div className="bg-red-500 flex w-28 shrink-0 h-28 mt-[88px] rounded-full max-md:mt-10" />
        
        <div className="flex items-stretch gap-4 flex-wrap grow shrink basis-auto">
          <div className="bg-[rgba(0,0,0,0)] grow shrink-0 basis-0 w-fit px-8 max-md:max-w-full max-md:px-5">
            <div className="bg-[rgba(0,0,0,0)] w-full max-md:max-w-full">
              <div className="flex flex-col items-stretch px-8 max-md:max-w-full max-md:px-5">
                <img
                  src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/75199f0bb26406dc5441de71c3dc84851c56a37c?placeholderIfAbsent=true"
                  className="aspect-[1.25] object-contain w-32 shadow-[0px_0px_30px_rgba(76,175,80,0.3)] self-center max-w-full rounded-full"
                  alt="Care Aware Tech logo"
                />
                
                <h1 className="text-white text-7xl font-normal leading-none text-center self-center mt-8 max-md:max-w-full max-md:text-[40px]">
                  No Cameras. Ever.
                </h1>
                
                <p className="text-blue-100 text-2xl font-normal leading-[39px] text-center z-10 mt-[122px] max-md:max-w-full max-md:mt-10">
                  Privacy by Physics, Not Policy — Our technology makes privacy violations physically impossible
                </p>
                
                <div className="bg-[rgba(0,0,0,0)] border-blue-300 flex mt-[-43px] w-[202px] shrink-0 h-[202px] aspect-[1] ml-[35px] rounded-full border-solid border-4 max-md:ml-2.5" />
                
                <div className="bg-[rgba(255,255,255,0.1)] border flex flex-col items-stretch justify-center ml-8 mr-[33px] p-[33px] rounded-2xl border-[rgba(255,255,255,0.2)] border-solid max-md:max-w-full max-md:mr-2.5 max-md:px-5">
                  <div className="bg-[rgba(0,0,0,0)] max-md:max-w-full">
                    <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                      <div className="w-6/12 max-md:w-full max-md:ml-0">
                        <div className="bg-[rgba(0,0,0,0)] flex grow flex-col items-center text-center w-full pb-[7px] px-6 max-md:mt-8 max-md:px-5">
                          <img
                            src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/80c26bcb03c1c0c404c965af1a00a1d459a2d3d0?placeholderIfAbsent=true"
                            className="aspect-[1] object-contain w-16 rounded-full"
                            alt="Camera systems icon"
                          />
                          <h3 className="text-white text-xl font-semibold leading-[1.4] mt-4">
                            Camera Systems
                          </h3>
                          <p className="text-blue-200 text-sm font-normal leading-none self-stretch mt-[17px]">
                            Capture visual data, rely on policy promises
                          </p>
                        </div>
                      </div>
                      
                      <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
                        <div className="bg-[rgba(0,0,0,0)] flex grow flex-col items-center text-center w-full pb-1.5 px-7 max-md:mt-8 max-md:px-5">
                          <img
                            src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/38738f3c881630ff6a2f95bef69eed17bc522777?placeholderIfAbsent=true"
                            className="aspect-[1] object-contain w-16 rounded-full"
                            alt="Physics-based sensing icon"
                          />
                          <h3 className="text-white text-xl font-semibold leading-[1.4] mt-4">
                            Physics-Based Sensing
                          </h3>
                          <p className="text-green-200 text-sm font-normal leading-none self-stretch mt-4">
                            No images possible, anonymous by design
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-[rgba(0,0,0,0)] flex w-full items-stretch gap-[21px] text-lg font-bold text-center flex-wrap mt-[43px] px-20 py-[3px] max-md:max-w-full max-md:mt-10 max-md:px-5">
                <button 
                  onClick={handleDownloadWhitePaper}
                  className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] flex items-stretch gap-[35px] text-blue-900 grow shrink basis-auto pt-[17px] px-[43px] rounded-xl max-md:px-5 hover:shadow-lg transition-shadow"
                >
                  <img
                    src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/4a02347ca338ef8e807b3c09e63a35305037ec38?placeholderIfAbsent=true"
                    className="aspect-[0.86] object-contain w-[18px] shrink-0"
                    alt="Download icon"
                  />
                  <div className="basis-auto">
                    Download Privacy White Paper
                  </div>
                </button>
                
                <button 
                  onClick={handleCompareTechnologies}
                  className="bg-[rgba(0,0,0,0)] flex gap-[40px_49px] text-white grow shrink basis-auto pt-[17px] px-[45px] rounded-xl border-white border-solid border-2 max-md:px-5 hover:bg-white hover:text-gray-900 transition-colors"
                >
                  <img
                    src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/87e4dd2c1ecbd9cebc8e7a77262381b6e9d8efc8?placeholderIfAbsent=true"
                    className="aspect-[1.05] object-contain w-[22px] shrink-0"
                    alt="Compare icon"
                  />
                  <div>Compare Technologies</div>
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-green-400 flex w-24 shrink-0 h-24 mt-[474px] rounded-full max-md:mt-10" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
