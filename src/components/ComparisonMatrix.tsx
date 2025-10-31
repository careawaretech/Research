import React from 'react';

export const ComparisonMatrix: React.FC = () => {
  return (
    <section className="bg-gray-50 w-full text-center pt-20 pb-[35px] px-20 max-md:max-w-full max-md:px-5">
      <div className="bg-[rgba(0,0,0,0)] pb-[45px] px-8 max-md:max-w-full max-md:px-5">
        <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center font-normal pb-[9px] px-20 max-md:max-w-full max-md:px-5">
          <div className="flex w-[752px] max-w-full flex-col items-stretch">
            <div className="text-gray-900 text-4xl leading-none self-center max-md:max-w-full">
              Comprehensive Technology Comparison
            </div>
            <div className="text-gray-600 text-xl leading-7 mt-[29px] max-md:max-w-full">
              Detailed analysis of performance characteristics, deployment requirements, and operational considerations
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-[0px_8px_10px_rgba(0,0,0,0.1)] overflow-hidden mt-16 rounded-3xl max-md:max-w-full max-md:mt-10">
          <div className="flex flex-col items-center text-2xl text-white font-bold leading-none justify-center px-[70px] py-9 max-md:max-w-full max-md:px-5" style={{background: 'linear-gradient(135deg, #3B82F6, #10B981)'}}>
            <div>Technology Specification Matrix</div>
          </div>
          
          <div className="bg-[rgba(0,0,0,0)] overflow-hidden text-base max-md:max-w-full">
            <div className="bg-[rgba(0,0,0,0)] max-md:max-w-full">
              <div className="bg-gray-100 w-full font-bold max-md:max-w-full">
                <div className="bg-[rgba(0,0,0,0)] flex items-stretch flex-wrap">
                  <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch text-gray-900 justify-center px-[62px] py-8 max-md:px-5">
                    <div>Specification Category</div>
                  </div>
                  <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch text-blue-900 justify-center p-6 max-md:px-5">
                    <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-[13px] px-[72px] max-md:px-5">
                      <img
                        src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/a9d3451962858fe67f6c324c0eee45ca178c90b8?placeholderIfAbsent=true"
                        className="aspect-[0.75] object-contain w-6 shrink-0"
                        alt="SFCW Radar icon"
                      />
                      <div className="grow shrink w-[164px]">SFCW Radar Platform</div>
                    </div>
                  </div>
                  <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch text-green-900 justify-center p-6 max-md:max-w-full max-md:px-5">
                    <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-[13px] px-20 max-md:px-5">
                      <img
                        src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/a79144e0c2aca6e23f2e9a952f900efa52ca5d05?placeholderIfAbsent=true"
                        className="aspect-[0.94] object-contain w-[30px] shrink-0"
                        alt="WiFi Signal Analysis icon"
                      />
                      <div>WiFi Signal Analysis Platform</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-[rgba(0,0,0,0)] w-full font-normal max-md:max-w-full">
                {/* Technical Specifications Section */}
                <div className="bg-[rgba(0,0,0,0)] flex items-stretch text-gray-900 font-bold flex-wrap">
                  <div className="bg-gray-50 pt-[15px] pb-[29px] px-[37px] max-md:px-5">
                    <div>TECHNICAL SPECIFICATIONS</div>
                  </div>
                  <div className="bg-[rgba(0,0,0,0)] flex w-[408px] shrink-0 max-w-full h-14" />
                  <div className="bg-[rgba(0,0,0,0)] flex w-[504px] shrink-0 max-w-full h-14" />
                </div>
                
                {/* Operating Frequency */}
                <div className="bg-[rgba(0,0,0,0)] flex items-stretch flex-wrap max-md:max-w-full">
                  <div className="bg-[rgba(0,0,0,0)] text-gray-900 font-medium pt-4 pb-[25px] px-[70px] max-md:px-5">
                    <div>Operating Frequency</div>
                  </div>
                  <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center text-blue-800 pt-4 pb-[26px] px-[70px] max-md:px-5">
                    <div>5.0 - 7.0 GHz (SFCW)</div>
                  </div>
                  <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center text-green-800 pt-4 pb-[26px] px-[70px] max-md:max-w-full max-md:px-5">
                    <div>2.4 / 5 GHz (WiFi bands)</div>
                  </div>
                </div>
                
                {/* Detection Range */}
                <div className="bg-[rgba(0,0,0,0)] flex items-stretch flex-wrap max-md:max-w-full">
                  <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center text-gray-900 font-medium pt-4 pb-[25px] px-[70px] max-md:px-5">
                    <div>Detection Range</div>
                  </div>
                  <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center text-blue-800 pt-4 pb-[25px] px-[70px] max-md:px-5">
                    <div>0.5m - 6m (single room)</div>
                  </div>
                  <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center text-green-800 pt-4 pb-[26px] px-[70px] max-md:max-w-full max-md:px-5">
                    <div>5m - 50m (multi-room)</div>
                  </div>
                </div>
                
                {/* Performance Metrics Section */}
                <div className="bg-[rgba(0,0,0,0)] flex items-stretch text-gray-900 font-bold flex-wrap">
                  <div className="bg-gray-50 pt-4 pb-[29px] px-[53px] max-md:px-5">
                    <div>PERFORMANCE METRICS</div>
                  </div>
                  <div className="bg-[rgba(0,0,0,0)] flex w-[408px] shrink-0 max-w-full h-[57px]" />
                  <div className="bg-[rgba(0,0,0,0)] flex w-[504px] shrink-0 max-w-full h-[57px]" />
                </div>
                
                {/* Fall Detection Sensitivity */}
                <div className="bg-[rgba(0,0,0,0)] flex items-stretch font-bold flex-wrap max-md:max-w-full">
                  <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch text-gray-900 font-medium justify-center px-[59px] py-[25px] max-md:px-5">
                    <div>Fall Detection Sensitivity</div>
                  </div>
                  <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center text-green-800 whitespace-nowrap justify-center px-20 py-[17px] max-md:px-5">
                    <div className="bg-green-100 flex w-[70px] flex-col pt-[3px] pb-[17px] px-3 rounded-full">
                      <div>98.9%</div>
                    </div>
                  </div>
                  <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center text-yellow-800 pt-[17px] pb-2 px-20 max-md:max-w-full max-md:px-5">
                    <div className="bg-yellow-100 flex w-[142px] max-w-full flex-col items-stretch justify-center px-[27px] py-[3px] rounded-full max-md:px-5">
                      <div>85% (improving)</div>
                    </div>
                  </div>
                </div>
                
                {/* Cost Analysis Section */}
                <div className="bg-[rgba(0,0,0,0)] flex items-stretch text-gray-900 font-bold flex-wrap max-md:max-w-full">
                  <div className="bg-gray-50 flex flex-col items-center pt-4 pb-[29px] px-[70px] max-md:px-5">
                    <div>COST ANALYSIS</div>
                  </div>
                  <div className="bg-[rgba(0,0,0,0)] flex w-[408px] shrink-0 max-w-full h-[57px]" />
                  <div className="bg-[rgba(0,0,0,0)] flex w-[504px] shrink-0 max-w-full h-[57px]" />
                </div>
                
                {/* 5-Year TCO */}
                <div className="bg-[rgba(0,0,0,0)] flex items-stretch font-bold flex-wrap max-md:max-w-full">
                  <div className="bg-[rgba(0,0,0,0)] text-gray-900 font-medium pt-4 pb-[26px] px-[49px] max-md:px-5">
                    <div>5-Year TCO (100 residents)</div>
                  </div>
                  <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch text-blue-800 justify-center px-6 py-[17px] max-md:px-5">
                    <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center pb-[9px] px-[70px] max-md:px-5">
                      <div className="z-10">$480,000 - $650,000</div>
                    </div>
                  </div>
                  <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch text-green-800 justify-center px-6 py-[17px] max-md:max-w-full max-md:px-5">
                    <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center pb-[9px] px-[70px] max-md:max-w-full max-md:px-5">
                      <div className="z-10">$50,000 - $85,000</div>
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
