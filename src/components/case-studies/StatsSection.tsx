import React from 'react';

const StatsSection = () => {
  return (
    <section className="bg-white w-full py-16 lg:py-20 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center text-center pb-[9px] px-20 max-md:max-w-full max-md:px-5">
          <div className="flex w-[714px] max-w-full flex-col items-stretch">
            <h2 className="text-gray-900 text-4xl font-bold leading-none self-center max-md:max-w-full">
              Quantitative Impact Analysis
            </h2>
            <p className="text-gray-600 text-xl font-normal leading-7 mt-[21px] max-md:max-w-full">
              Real-world data demonstrating the measurable benefits of Care Aware Tech implementation across our partner facilities
            </p>
          </div>
        </div>
        <div className="bg-[rgba(0,0,0,0)] mt-12 max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <div className="w-6/12 max-md:w-full max-md:ml-0">
              <div className="flex grow flex-col items-stretch text-2xl text-gray-900 font-bold leading-none p-8 rounded-2xl max-md:max-w-full max-md:mt-10 max-md:px-5">
                <h3>Fall Detection Performance</h3>
                <div className="bg-[rgba(0,0,0,0)] flex shrink-0 h-80 mt-[37px] max-md:max-w-full bg-gray-100 rounded-lg items-center justify-center">
                  <div className="text-gray-500 text-lg">Chart Placeholder</div>
                </div>
              </div>
            </div>
            <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
              <div className="flex grow flex-col items-stretch text-2xl text-gray-900 font-bold leading-none p-8 rounded-2xl max-md:max-w-full max-md:mt-10 max-md:px-5">
                <h3>Response Time Improvements</h3>
                <div className="bg-[rgba(0,0,0,0)] flex shrink-0 h-80 mt-[33px] max-md:max-w-full bg-gray-100 rounded-lg items-center justify-center">
                  <div className="text-gray-500 text-lg">Chart Placeholder</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[rgba(0,0,0,0)] mt-16 max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <div className="w-3/12 max-md:w-full max-md:ml-0">
              <div className="flex grow flex-col items-stretch text-center p-6 rounded-xl max-md:mt-8 max-md:px-5">
                <img
                  src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/7d232fecdd72a3fd8499c46fa2e0c80f9f9bcef6?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-16 self-center rounded-full"
                  alt="Facilities"
                />
                <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center text-3xl text-sky-600 font-bold whitespace-nowrap mt-4 pb-[13px] px-[70px] max-md:px-5">
                  <div>127</div>
                </div>
                <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch text-base text-gray-700 font-medium justify-center mt-2 px-[47px] py-[5px] max-md:px-5">
                  <div>Facilities Deployed</div>
                </div>
                <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch text-sm text-gray-500 font-normal justify-center mt-1 px-4 py-1">
                  <div>Across 12 states and provinces</div>
                </div>
              </div>
            </div>
            <div className="w-3/12 ml-5 max-md:w-full max-md:ml-0">
              <div className="flex grow flex-col items-stretch text-center p-6 rounded-xl max-md:mt-8 max-md:px-5">
                <img
                  src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/01c4caec20d509373193768d5f009c32e566fd65?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-16 self-center rounded-full"
                  alt="Residents"
                />
                <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center text-3xl text-green-600 font-bold whitespace-nowrap mt-4 pb-[13px] px-[70px] max-md:px-5">
                  <div>18,500</div>
                </div>
                <div className="bg-[rgba(0,0,0,0)] text-base text-gray-700 font-medium mt-2 pt-0.5 pb-2.5 px-[42px] max-md:px-5">
                  <div>Residents Protected</div>
                </div>
                <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch text-sm text-gray-500 font-normal justify-center mt-1 px-6 py-[3px] max-md:px-5">
                  <div>24/7 privacy-first monitoring</div>
                </div>
              </div>
            </div>
            <div className="w-3/12 ml-5 max-md:w-full max-md:ml-0">
              <div className="flex grow flex-col items-stretch text-center p-6 rounded-xl max-md:mt-8 max-md:px-5">
                <img
                  src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/066296a4b6b3fd6d7ff482274fd6476ffec0abc1?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-16 self-center rounded-full"
                  alt="Response"
                />
                <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center text-3xl text-purple-600 font-bold whitespace-nowrap mt-4 pb-[13px] px-[70px] max-md:px-5">
                  <div>73</div>
                </div>
                <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch text-base text-gray-700 font-medium justify-center mt-2 px-[47px] py-[5px] max-md:px-5">
                  <div>% Faster Response</div>
                </div>
                <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch text-sm text-gray-500 font-normal justify-center mt-1 px-[29px] py-[3px] max-md:px-5">
                  <div>Average across all facilities</div>
                </div>
              </div>
            </div>
            <div className="w-3/12 ml-5 max-md:w-full max-md:ml-0">
              <div className="flex grow flex-col items-stretch text-center p-6 rounded-xl max-md:mt-8 max-md:px-5">
                <img
                  src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/5d062fd8c0dd8e902103c80a29d48faf446e5745?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-16 self-center rounded-full"
                  alt="Satisfaction"
                />
                <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center text-3xl text-orange-600 font-bold whitespace-nowrap mt-4 pb-[13px] px-[70px] max-md:px-5">
                  <div>94</div>
                </div>
                <div className="bg-[rgba(0,0,0,0)] text-base text-gray-700 font-medium mt-2 pt-0.5 pb-2.5 px-[46px] max-md:px-5">
                  <div>% Satisfaction Rate</div>
                </div>
                <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch text-sm text-gray-500 font-normal justify-center mt-1 px-9 py-[3px] max-md:px-5">
                  <div>Staff and family approval</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
