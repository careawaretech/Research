import React from 'react';

const Partners = () => {
  return (
    <section className="flex flex-col items-stretch justify-center p-20 max-md:max-w-full max-md:px-5">
      <div className="bg-[rgba(0,0,0,0)] w-full px-[17px] max-md:max-w-full">
        <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center font-normal text-center mx-[15px] pb-[9px] px-20 max-md:max-w-full max-md:mr-2.5 max-md:px-5">
          <div className="flex w-[495px] max-w-full flex-col items-stretch">
            <div className="text-gray-900 text-4xl leading-none self-center max-md:max-w-full">
              Join Our Growing Network
            </div>
            <div className="text-gray-600 text-xl leading-[1.4] mt-[29px] max-md:max-w-full">
              Organizations already working with Care Aware Tech
            </div>
          </div>
        </div>
        <div className="bg-[rgba(0,0,0,0)] mt-[59px] pt-[5px] pb-[25px] px-[15px] max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            {/* Portland State University */}
            <div className="w-3/12 max-md:w-full max-md:ml-0">
              <div className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] grow font-normal text-center w-full px-6 py-[30px] rounded-xl max-md:mt-[37px] max-md:px-5">
                <div className="bg-[rgba(240,240,240,1)] flex flex-col items-center text-xs text-[rgba(153,153,153,1)] whitespace-nowrap justify-center h-16 rounded">
                  <div>
                    IMG
                    <br />
                    232×64
                  </div>
                </div>
                <div className="bg-[rgba(0,0,0,0)] text-base text-gray-900 font-semibold mt-[50px] pb-2.5 px-5 max-md:mt-10">
                  <div className="z-10">Portland State University</div>
                </div>
                <div className="bg-[rgba(0,0,0,0)] text-sm text-gray-600 mt-2 pb-2.5 px-10 max-md:px-5">
                  <div className="z-10">Research Collaboration</div>
                </div>
                <img
                  src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/67a8a18c35c6352be91a14a65e48c8fc7faf2832?placeholderIfAbsent=true"
                  className="aspect-[9.71] object-contain w-[232px] mt-4"
                  alt="Portland State University logo"
                />
              </div>
            </div>

            {/* Intel Corporation */}
            <div className="w-3/12 ml-5 max-md:w-full max-md:ml-0">
              <div className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] grow font-normal text-center w-full px-6 py-[30px] rounded-xl max-md:mt-[37px] max-md:px-5">
                <div className="bg-[rgba(240,240,240,1)] flex flex-col items-center text-xs text-[rgba(153,153,153,1)] whitespace-nowrap justify-center h-16 rounded">
                  <div>
                    IMG
                    <br />
                    232×64
                  </div>
                </div>
                <div className="bg-[rgba(0,0,0,0)] text-base text-gray-900 font-semibold mt-[50px] pb-2.5 px-[52px] max-md:mt-10 max-md:px-5">
                  <div className="z-10">Intel Corporation</div>
                </div>
                <div className="bg-[rgba(0,0,0,0)] text-sm text-gray-600 mt-2 pb-[7px] px-[38px] max-md:px-5">
                  <div className="z-10">Technology Partnership</div>
                </div>
                <img
                  src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/f3beae32a1abf44cb89edafbb58c6b2e283cc0a3?placeholderIfAbsent=true"
                  className="aspect-[9.71] object-contain w-[232px] mt-4"
                  alt="Intel Corporation logo"
                />
              </div>
            </div>

            {/* Pilot Facilities */}
            <div className="w-3/12 ml-5 max-md:w-full max-md:ml-0">
              <div className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] flex grow flex-col items-stretch text-sm font-semibold text-center w-full pt-6 pb-10 px-6 rounded-xl max-md:mt-[37px] max-md:px-5">
                <img
                  src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/14a1e3498be20c97ac0337ed7b07f2de61670c66?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-16 self-center rounded-lg"
                  alt="Pilot facilities icon"
                />
                <div className="bg-[rgba(0,0,0,0)] text-base text-gray-900 mt-4 pb-[13px] px-16 max-md:px-5">
                  <div className="z-10">Pilot Facilities</div>
                </div>
                <div className="bg-[rgba(0,0,0,0)] text-gray-600 font-normal mt-2 pb-[11px] px-[26px] max-md:px-5">
                  <div className="z-10">5+ Portland Metro Partners</div>
                </div>
                <div className="bg-[rgba(0,0,0,0)] text-green-600 mt-4 pb-[7px] px-[65px] max-md:px-5">
                  <div className="z-10">Recruiting Now</div>
                </div>
              </div>
            </div>

            {/* Your Organization */}
            <div className="w-3/12 ml-5 max-md:w-full max-md:ml-0">
              <div className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] flex grow flex-col items-stretch text-sm font-semibold text-center w-full p-6 rounded-xl max-md:mt-[37px] max-md:px-5">
                <img
                  src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/c4e49e9d14612bc690769449aeabca846c867d66?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-16 self-center rounded-lg"
                  alt="Your organization icon"
                />
                <div className="bg-[rgba(0,0,0,0)] text-base text-gray-900 mt-4 pb-[9px] px-[47px] max-md:px-5">
                  <div className="z-10">Your Organization</div>
                </div>
                <div className="bg-[rgba(0,0,0,0)] text-gray-600 font-normal mt-2 pb-2 px-[61px] max-md:px-5">
                  <div className="z-10">Next Partnership</div>
                </div>
                <button className="bg-green-600 flex flex-col items-center text-white mt-4 pt-[7px] pb-[18px] px-[70px] rounded-lg max-md:px-5 hover:bg-green-700 transition-colors">
                  <div>Join Us</div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center text-sm text-gray-600 font-normal text-center leading-none justify-center mt-[23px] mx-[15px] px-[70px] py-0.5 max-md:max-w-full max-md:mr-2.5 max-md:px-5">
          <div className="bg-[rgba(0,0,0,0)] flex w-[693px] max-w-full items-stretch gap-5 flex-wrap">
            <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-[9px] flex-1">
              <img
                src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/ca4e871901622f7f6777c58a9e68e6359155531e?placeholderIfAbsent=true"
                className="aspect-[0.7] object-contain w-3.5 shrink-0"
                alt="Trust icon"
              />
              <div className="basis-auto">Trusted by leading institutions</div>
            </div>
            <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-2.5 flex-1">
              <img
                src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/fee37ad22e30dd179b5461c18f95ba48af5333c1?placeholderIfAbsent=true"
                className="aspect-[0.7] object-contain w-3.5 shrink-0"
                alt="HIPAA icon"
              />
              <div className="basis-auto">HIPAA-compliant partnerships</div>
            </div>
            <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-[9px] flex-1">
              <img
                src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/55b1885e22870c669042d249f2e05d5f429ac9f5?placeholderIfAbsent=true"
                className="aspect-[0.55] object-contain w-[11px] shrink-0"
                alt="Research icon"
              />
              <div className="basis-auto">Research excellence focused</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
