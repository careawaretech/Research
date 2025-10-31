import React from 'react';

const Advisory = () => {
  const advisors = [
    {
      name: "Dr. Robert Williams",
      title: "Former CTO, Mayo Clinic",
      expertise: "Healthcare Technology Innovation",
      image: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/009320611b2317de75a7e3480764db12ee6177f3?placeholderIfAbsent=true"
    },
    {
      name: "Maria Santos",
      title: "CEO, Senior Care Alliance",
      expertise: "Care Facility Operations",
      image: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/12573ae6737ce7e71847a06d3f5a2ab2adf56607?placeholderIfAbsent=true"
    },
    {
      name: "Prof. Alan Chang",
      title: "Stanford AI Ethics Lab",
      expertise: "AI Ethics & Privacy",
      image: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/643197119d84ec8aab7c4a95f82cd0dd70d97b14?placeholderIfAbsent=true"
    },
    {
      name: "Dr. Jennifer Lee",
      title: "Geriatrics Specialist",
      expertise: "Clinical Elderly Care",
      image: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/0236d8b69b0c5993f973be72c19492d15c66cbf2?placeholderIfAbsent=true"
    }
  ];

  return (
    <section id="advisory" className="bg-white flex flex-col items-stretch justify-center p-20 max-md:max-w-full max-md:px-5">
      <div className="bg-[rgba(0,0,0,0)] w-full px-6 max-md:max-w-full max-md:px-5">
        <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center font-normal text-center pb-2 px-20 max-md:max-w-full max-md:px-5">
          <div className="flex w-[680px] max-w-full flex-col items-stretch">
            <h2 className="text-slate-800 text-4xl leading-none self-center">Advisory Board</h2>
            <p className="text-gray-700 text-xl leading-7 mt-8 max-md:max-w-full">
              Distinguished experts guiding our mission with decades of experience in healthcare, technology, and elderly care.
            </p>
          </div>
        </div>
        <div className="bg-[rgba(0,0,0,0)] mt-16 max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            {advisors.map((advisor, index) => (
              <div key={index} className="w-3/12 max-md:w-full max-md:ml-0">
                <div className="bg-[rgba(0,0,0,0)] flex grow flex-col items-center font-normal text-center w-full px-[50px] py-0.5 max-md:mt-6 max-md:px-5">
                  <img
                    src={advisor.image}
                    className="aspect-[1] object-contain w-24 rounded-full"
                    alt={advisor.name}
                  />
                  <h3 className="text-slate-800 text-base font-semibold mt-4">
                    {advisor.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-none mt-4">
                    {advisor.title}
                  </p>
                  <p className="text-gray-500 text-xs leading-none self-stretch mt-[15px]">
                    {advisor.expertise}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center text-base text-white font-normal text-center mt-12 px-20 max-md:max-w-full max-md:mt-10 max-md:px-5">
          <button className="bg-violet-600 flex w-[250px] max-w-full flex-col items-stretch justify-center px-[34px] py-[17px] rounded-full max-md:px-5 hover:bg-violet-700 transition-colors">
            Join Our Advisory Board
          </button>
        </div>
      </div>
    </section>
  );
};

export default Advisory;
