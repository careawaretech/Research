import React from 'react';

const Mission = () => {
  return (
    <section id="mission" className="bg-white flex flex-col items-stretch justify-center p-20 max-md:max-w-full max-md:px-5">
      <div className="bg-[rgba(0,0,0,0)] w-full px-6 max-md:max-w-full max-md:pl-5">
        <div className="bg-[rgba(0,0,0,0)] pr-[25px] max-md:max-w-full max-md:pr-5">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <div className="w-6/12 max-md:w-full max-md:ml-0">
              <div className="bg-[rgba(0,0,0,0)] flex w-full flex-col items-stretch mx-auto max-md:max-w-full max-md:mt-10">
                <h2 className="text-slate-800 text-4xl font-normal leading-none">Our Mission</h2>
                <p className="text-gray-700 text-lg font-normal leading-[30px] mt-10 max-md:max-w-full max-md:mr-[5px]">
                  At Care Aware Tech, we are dedicated to revolutionizing elderly care through innovative, privacy-first technology solutions that preserve dignity, enhance independence, and strengthen the bonds between seniors and their loved ones.
                </p>
                <p className="text-gray-700 text-lg font-normal leading-[30px] mt-[37px] max-md:max-w-full max-md:mr-2.5">
                  We believe that technology should serve humanity, not the other way around. Our approach prioritizes user consent, data protection, and meaningful human connections over surveillance and profit.
                </p>
                <div className="bg-[rgba(0,0,0,0)] mt-[43px] max-md:max-w-full max-md:mt-10">
                  <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                    <div className="w-6/12 max-md:w-full max-md:ml-0">
                      <div className="bg-[rgba(37,99,235,0.1)] grow text-base w-full px-6 py-[25px] rounded-lg max-md:mt-6 max-md:px-5">
                        <img
                          src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/d8057f738a2c6b2b57d42ccf7319b2aac498f166?placeholderIfAbsent=true"
                          className="aspect-[0.83] object-contain w-6"
                          alt="Privacy First Icon"
                        />
                        <h3 className="bg-[rgba(0,0,0,0)] flex flex-col text-slate-800 font-semibold justify-center py-[5px] max-md:pr-5">
                          Privacy First
                        </h3>
                        <p className="bg-[rgba(0,0,0,0)] flex flex-col text-gray-600 font-normal mt-2 pr-9 pt-0.5 pb-2 max-md:pr-5">
                          User data sovereignty and consent at every step
                        </p>
                      </div>
                    </div>
                    <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
                      <div className="bg-[rgba(5,150,105,0.1)] grow text-base w-full px-6 py-[25px] rounded-lg max-md:mt-6 max-md:px-5">
                        <img
                          src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/f5b97f9dab1a9f04a2b3602bfe92d7b2cbe864bd?placeholderIfAbsent=true"
                          className="aspect-[1.03] object-contain w-[30px]"
                          alt="Human-Centered Icon"
                        />
                        <h3 className="bg-[rgba(0,0,0,0)] flex flex-col text-slate-800 font-semibold whitespace-nowrap pt-0.5 pb-2.5 max-md:pr-5">
                          Human-Centered
                        </h3>
                        <p className="bg-[rgba(0,0,0,0)] flex flex-col text-gray-600 font-normal mt-2 pr-[26px] py-[5px] max-md:pr-5">
                          Technology that enhances, never replaces, human care
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
              <div className="bg-[rgba(0,0,0,0)] shadow-[0px_8px_10px_rgba(0,0,0,0.1)] self-stretch overflow-hidden w-full my-auto rounded-2xl max-md:max-w-full max-md:mt-10">
                <img
                  src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/4c8276ff6858ebe9dfa3c2be16160d848662d59f?placeholderIfAbsent=true"
                  className="aspect-[1.52] object-contain w-full max-md:max-w-full"
                  alt="Mission illustration"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
