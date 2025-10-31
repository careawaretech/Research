import React from 'react';

const Hero = () => {
  return (
    <section className="w-full overflow-hidden max-md:max-w-full">
      <div className="bg-[rgba(0,0,0,0.2)] pl-20 max-md:max-w-full max-md:pl-5">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-[66%] max-md:w-full max-md:ml-0">
            <div className="bg-[rgba(0,0,0,0)] z-10 mr-[-232px] self-stretch text-white font-normal my-auto px-6 max-md:max-w-full max-md:mt-10 max-md:px-5">
              <div className="bg-[rgba(0,0,0,0)] w-full max-md:max-w-full">
                <h1 className="text-6xl leading-[75px] mr-[43px] max-md:max-w-full max-md:text-[40px] max-md:leading-[56px] max-md:mr-2.5">
                  Transforming Elderly Care Through Privacy-First Technology
                </h1>
                <p className="text-blue-100 text-xl leading-[33px] mt-[45px] max-md:max-w-full max-md:mr-2.5 max-md:mt-10">
                  We believe technology should enhance human dignity, not diminish it. Our mission is to create compassionate, privacy-respecting solutions that empower seniors and their caregivers.
                </p>
                <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-4 text-lg font-semibold text-center flex-wrap mt-[45px] pr-20 max-md:mt-10 max-md:pr-5">
                  <button className="bg-orange-600 flex flex-col items-stretch justify-center px-[34px] py-6 rounded-full max-md:px-5 hover:bg-orange-700 transition-colors">
                    Learn Our Story
                  </button>
                  <button className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch justify-center px-[35px] py-[25px] rounded-full border-white border-solid border-2 max-md:px-5 hover:bg-white hover:text-slate-800 transition-colors">
                    Join Our Mission
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[34%] ml-5 max-md:w-full max-md:ml-0">
            <div className="bg-[rgba(0,0,0,0)] grow w-full max-md:max-w-full">
              <div className="flex shrink-0 h-[600px] max-md:max-w-full bg-gradient-to-br from-blue-600 to-purple-700 rounded-l-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
