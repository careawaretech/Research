import React from 'react';

const Values = () => {
  const values = [
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/54cb0d62063bcb7843b0764a7b7e6ef615541cd7?placeholderIfAbsent=true",
      title: "Privacy by Design",
      description: "We build privacy protection into every feature from the ground up, ensuring user data remains secure and under their control."
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/cf2a8501440602c2388349a6287ae5605dcb40da?placeholderIfAbsent=true",
      title: "Compassionate Innovation",
      description: "Every innovation is driven by empathy and understanding of the real challenges faced by seniors and their families."
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/d7a54d35f4fbd3038cdfaa9c0b5f0c7c27e1e35e?placeholderIfAbsent=true",
      title: "Ethical Technology",
      description: "We prioritize human welfare over profit, ensuring our technology serves people rather than exploiting them."
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/355fb7e14933d2c5a0bee6bf344ad08c4c4f227c?placeholderIfAbsent=true",
      title: "Inclusive Design",
      description: "Our solutions are designed to be accessible to all users, regardless of their technical expertise or physical abilities."
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/1a2173a92093213bb5044339eaa5caf5c38aec38?placeholderIfAbsent=true",
      title: "Continuous Learning",
      description: "We constantly learn from users, caregivers, and healthcare professionals to improve our solutions."
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/ef8de36156dc0763f15b9af1b6c55cbb73f99391?placeholderIfAbsent=true",
      title: "Collaborative Approach",
      description: "We work closely with healthcare providers, families, and seniors to create solutions that truly meet their needs."
    }
  ];

  return (
    <section className="flex flex-col items-stretch justify-center px-20 py-[68px] max-md:max-w-full max-md:px-5">
      <div className="bg-[rgba(0,0,0,0)] px-[9px] max-md:max-w-full">
        <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center font-normal text-center mx-[15px] pb-[9px] px-20 max-md:max-w-full max-md:mr-2.5 max-md:px-5">
          <div className="flex w-[726px] max-w-full flex-col items-stretch">
            <h2 className="text-slate-800 text-4xl leading-none self-center">Our Core Values</h2>
            <p className="text-gray-700 text-xl leading-[1.4] mt-[39px] max-md:max-w-full">
              These principles guide every decision we make and every solution we create.
            </p>
          </div>
        </div>
        <div className="bg-[rgba(0,0,0,0)] w-full mt-[59px] pt-[5px] pb-[25px] px-[15px] max-md:max-w-full max-md:mt-10">
          <div className="max-md:max-w-full">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
              {values.slice(0, 3).map((value, index) => (
                <div key={index} className="w-[33%] max-md:w-full max-md:ml-0">
                  <div className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] grow font-normal w-full p-8 rounded-xl max-md:mt-8 max-md:px-5">
                    <img
                      src={value.icon}
                      className="aspect-[1] object-contain w-16 rounded-full"
                      alt={`${value.title} Icon`}
                    />
                    <h3 className="bg-[rgba(0,0,0,0)] flex flex-col text-xl text-slate-800 mt-6 pt-px pb-[9px] max-md:pr-5">
                      {value.title}
                    </h3>
                    <p className="bg-[rgba(0,0,0,0)] flex flex-col text-base text-gray-700 mt-4 pr-2.5 pt-0.5 pb-2.5">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 max-md:max-w-full">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
              {values.slice(3, 6).map((value, index) => (
                <div key={index + 3} className="w-[33%] max-md:w-full max-md:ml-0">
                  <div className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] grow font-normal w-full p-8 rounded-xl max-md:mt-8 max-md:px-5">
                    <img
                      src={value.icon}
                      className="aspect-[1] object-contain w-16 rounded-full"
                      alt={`${value.title} Icon`}
                    />
                    <h3 className="bg-[rgba(0,0,0,0)] flex flex-col text-xl text-slate-800 mt-6 pt-px pb-[9px] max-md:pr-5">
                      {value.title}
                    </h3>
                    <p className="bg-[rgba(0,0,0,0)] flex flex-col text-base text-gray-700 mt-4 pr-2.5 pt-0.5 pb-2.5">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Values;
