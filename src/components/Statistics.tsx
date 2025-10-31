import React from 'react';

const Statistics = () => {
  return (
    <section className="bg-gray-50 pt-20 pb-[35px] px-[79px] max-md:max-w-full max-md:px-5">
      <div className="bg-[rgba(0,0,0,0)] w-full pb-[45px] px-2.5 max-md:max-w-full">
        <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center font-normal text-center mx-[15px] pb-[9px] px-20 max-md:max-w-full max-md:mr-2.5 max-md:px-5">
          <div className="flex w-[744px] max-w-full flex-col items-stretch">
            <h2 className="text-slate-800 text-4xl leading-none self-center">Why This Mission Matters</h2>
            <p className="text-gray-700 text-xl leading-7 mt-8 max-md:max-w-full">
              The challenges facing our aging population require thoughtful, ethical solutions that respect both autonomy and safety.
            </p>
          </div>
        </div>
        <div className="bg-[rgba(0,0,0,0)] mt-[59px] pt-[5px] pb-[25px] px-[15px] max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <div className="w-[33%] max-md:w-full max-md:ml-0">
              <div className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] grow text-base font-normal w-full p-8 rounded-xl max-md:mt-[37px] max-md:px-5">
                <img
                  src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/97f1d863928b50ccf7f877082de62fc9c5547ead?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-16 rounded-full"
                  alt="Growing Need Icon"
                />
                <h3 className="bg-[rgba(0,0,0,0)] flex flex-col text-2xl text-slate-800 mt-6 pb-2.5 max-md:pr-5">
                  Growing Need
                </h3>
                <div className="bg-[rgba(0,0,0,0)] flex flex-col text-3xl text-violet-600 font-bold whitespace-nowrap mt-4 pb-3.5 max-md:pr-5">
                  54
                </div>
                <p className="bg-[rgba(0,0,0,0)] flex flex-col text-gray-600 justify-center mt-2 py-[5px] max-md:pr-5">
                  Million seniors will need care by 2030
                </p>
                <p className="bg-[rgba(0,0,0,0)] flex flex-col text-gray-700 mt-4 pr-11 pt-0.5 pb-2.5 max-md:pr-5">
                  The aging baby boomer generation is creating unprecedented demand for innovative care solutions.
                </p>
              </div>
            </div>
            <div className="w-[33%] ml-5 max-md:w-full max-md:ml-0">
              <div className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] grow text-base font-normal w-full p-8 rounded-xl max-md:mt-[37px] max-md:px-5">
                <img
                  src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/49695baad64fc4f1f05ac9e2a4c6fa262a30f0e1?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-16 rounded-full"
                  alt="Economic Impact Icon"
                />
                <h3 className="bg-[rgba(0,0,0,0)] flex flex-col text-2xl text-slate-800 mt-6 pb-[11px] max-md:pr-5">
                  Economic Impact
                </h3>
                <div className="bg-[rgba(0,0,0,0)] flex w-full flex-col text-3xl text-orange-600 font-bold whitespace-nowrap mt-4 pr-[65px] pb-[9px] max-md:pr-5">
                  <div className="z-10">B</div>
                  <div className="flex items-stretch gap-[3px] -mt-7">
                    <div>$</div>
                    <div className="leading-[1.2]">460</div>
                  </div>
                </div>
                <p className="bg-[rgba(0,0,0,0)] flex flex-col text-gray-600 justify-center mt-2 py-[5px] max-md:pr-5">
                  Annual healthcare spending on seniors
                </p>
                <p className="bg-[rgba(0,0,0,0)] flex flex-col text-gray-700 mt-4 pr-[15px] pt-0.5 pb-[11px]">
                  Smart technology can reduce costs while improving quality of life and care outcomes.
                </p>
              </div>
            </div>
            <div className="w-[33%] ml-5 max-md:w-full max-md:ml-0">
              <div className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] grow text-base font-normal w-full pt-8 pb-14 px-8 rounded-xl max-md:mt-[37px] max-md:px-5">
                <img
                  src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/1c04818dd06b1c13ef1ef215c75dd7d47fa39995?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-16 rounded-full"
                  alt="Aging in Place Icon"
                />
                <h3 className="bg-[rgba(0,0,0,0)] flex flex-col text-2xl text-slate-800 mt-6 pb-2.5 max-md:pr-5">
                  Aging in Place
                </h3>
                <div className="bg-[rgba(0,0,0,0)] flex flex-col text-3xl text-teal-600 font-bold whitespace-nowrap mt-4 pb-[13px] max-md:pr-5">
                  90
                </div>
                <p className="bg-[rgba(0,0,0,0)] flex flex-col text-gray-600 justify-center mt-2 py-1 max-md:pr-5">
                  Percent who prefer to age at home
                </p>
                <p className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch text-gray-700 mt-4 pr-[9px] py-1">
                  Technology can enable independent living while ensuring safety and connection.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[rgba(0,0,0,0)] shadow-[0px_8px_10px_rgba(0,0,0,0.1)] overflow-hidden mt-[39px] mx-[15px] rounded-2xl max-md:max-w-full max-md:mr-2.5">
          <img
            src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/6ba1ecbd6406d27ff1885add0d5f77554dbfe4ec?placeholderIfAbsent=true"
            className="aspect-[3.85] object-contain w-full max-md:max-w-full"
            alt="Statistics illustration"
          />
        </div>
      </div>
    </section>
  );
};

export default Statistics;
