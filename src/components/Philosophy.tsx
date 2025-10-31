import React from 'react';

const Philosophy = () => {
  const principles = [
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/f750a6fc8e06a49ec77afa92e4883f0b56275d02?placeholderIfAbsent=true",
      title: "Transparency First",
      description: "Every user knows exactly what data we collect, how it's used, and maintains full control over their information."
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/28be1b7a47869abd71d0e6aae80c9878c8e419ca?placeholderIfAbsent=true",
      title: "Human-Centered Design",
      description: "We design with and for seniors, not just for them. Every feature is tested and validated by our user community."
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/218a8a6d2738fb35d757f438a283252512fa18cc?placeholderIfAbsent=true",
      title: "Partnership Approach",
      description: "We work collaboratively with healthcare providers, families, and seniors to create holistic care solutions."
    }
  ];

  return (
    <section className="flex flex-col items-stretch justify-center p-20 max-md:max-w-full max-md:px-5 bg-gradient-to-br from-blue-900 to-purple-900">
      <div className="bg-[rgba(0,0,0,0)] w-full px-6 max-md:max-w-full max-md:px-5">
        <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center font-normal text-center pb-[9px] px-20 max-md:max-w-full max-md:px-5">
          <div className="flex w-[763px] max-w-full flex-col items-stretch">
            <h2 className="text-white text-4xl leading-none self-center">Our Philosophy</h2>
            <p className="text-blue-100 text-xl leading-7 mt-8 max-md:max-w-full">
              Technology should enhance human dignity, not diminish it. We believe in creating solutions that empower rather than replace human connection.
            </p>
          </div>
        </div>
        <div className="bg-[rgba(0,0,0,0)] mt-16 max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            {principles.map((principle, index) => (
              <div key={index} className="w-[33%] max-md:w-full max-md:ml-0">
                <div className="bg-[rgba(0,0,0,0)] flex grow flex-col items-center font-normal text-center w-full pb-3 px-[9px] max-md:mt-8">
                  <img
                    src={principle.icon}
                    className="aspect-[1] object-contain w-20 rounded-full"
                    alt={`${principle.title} Icon`}
                  />
                  <h3 className="text-white text-xl leading-[1.4] mt-6">
                    {principle.title}
                  </h3>
                  <p className="text-blue-100 text-base leading-6 self-stretch mt-[26px]">
                    {principle.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
