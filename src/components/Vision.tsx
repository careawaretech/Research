import React from 'react';

const Vision = () => {
  return (
    <section id="vision" className="bg-white flex flex-col items-stretch justify-center px-[79px] py-[78px] max-md:max-w-full max-md:px-5">
      <div className="bg-[rgba(0,0,0,0)] w-full max-md:max-w-full max-md:pr-5">
        <div className="bg-[rgba(0,0,0,0)] pl-[25px] py-[3px] max-md:max-w-full max-md:pl-5">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <div className="w-6/12 max-md:w-full max-md:ml-0">
              <div className="bg-[rgba(0,0,0,0)] shadow-[0px_8px_10px_rgba(0,0,0,0.1)] self-stretch overflow-hidden w-full my-auto rounded-2xl max-md:max-w-full max-md:mt-10">
                <img
                  src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/f5213cf14994a809c8d357980f2ce65f8a4c3386?placeholderIfAbsent=true"
                  className="aspect-[1.52] object-contain w-full max-md:max-w-full"
                  alt="Vision illustration"
                />
              </div>
            </div>
            <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
              <div className="bg-[rgba(0,0,0,0)] flex grow flex-col items-stretch w-full max-md:max-w-full max-md:mt-10">
                <h2 className="text-slate-800 text-4xl font-normal leading-none">Our Vision</h2>
                <p className="text-gray-700 text-lg font-normal leading-[30px] mr-10 mt-10 max-md:max-w-full max-md:mr-2.5">
                  We envision a future where aging is supported by intelligent, compassionate technology that adapts to individual needs while preserving personal autonomy and dignity.
                </p>
                <div className="bg-[rgba(0,0,0,0)] w-full text-base mt-[34px] max-md:max-w-full">
                  <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-4 flex-wrap">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/5af8d97f895341a6d53e47454bf6fa407b05e892?placeholderIfAbsent=true"
                      className="aspect-[0.78] object-contain w-[25px] shrink-0 mt-1 rounded-full"
                      alt="Intelligent Adaptation Icon"
                    />
                    <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch grow shrink-0 basis-0 w-fit pr-[19px] pb-2 max-md:max-w-full">
                      <h3 className="text-slate-800 font-semibold">Intelligent Adaptation</h3>
                      <p className="text-gray-700 font-normal leading-6 mt-4 max-md:max-w-full">
                        AI that learns and adapts to individual preferences and needs without compromising privacy.
                      </p>
                    </div>
                  </div>
                  <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-4 flex-wrap mt-6">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/1dcb6a6b520c6096a30bfdcb6511023727bb1429?placeholderIfAbsent=true"
                      className="aspect-[0.81] object-contain w-[26px] shrink-0 mt-1 rounded-full"
                      alt="Seamless Integration Icon"
                    />
                    <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch grow shrink-0 basis-0 w-fit pr-11 pb-[9px] max-md:max-w-full">
                      <h3 className="text-slate-800 font-semibold">Seamless Integration</h3>
                      <p className="text-gray-700 font-normal leading-6 mt-4 max-md:max-w-full">
                        Technology that integrates naturally into daily life without creating barriers or complexity.
                      </p>
                    </div>
                  </div>
                  <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-4 flex-wrap mt-6">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/d50b78d266e7dad68ca3bd0321badeaa23623123?placeholderIfAbsent=true"
                      className="aspect-[0.84] object-contain w-[27px] shrink-0 mt-1 rounded-full"
                      alt="Community Connection Icon"
                    />
                    <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch grow shrink-0 basis-0 w-fit pr-4 pb-[9px] max-md:max-w-full">
                      <h3 className="text-slate-800 font-semibold">Community Connection</h3>
                      <p className="text-gray-700 font-normal leading-6 mt-[17px] max-md:max-w-full">
                        Platforms that strengthen relationships between seniors, families, and care providers.
                      </p>
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

export default Vision;
