import React from 'react';

const Team = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "CEO & Co-Founder",
      roleColor: "text-blue-600",
      description: "Former geriatrician with 15 years of experience in elderly care and health technology innovation.",
      image: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/412971a7bc65d94b375c35f461b09bb0b261c5f1?placeholderIfAbsent=true",
      socialIcons: [
        "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/12be04a24c720e9339d3d248c2fc34de75a5c1db?placeholderIfAbsent=true",
        "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/b1f4e863cc4b8245c8da02b379dd8a309f078fa7?placeholderIfAbsent=true"
      ]
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO & Co-Founder",
      roleColor: "text-emerald-600",
      description: "Privacy-focused engineer with expertise in secure AI systems and healthcare data protection.",
      image: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/87fcf4c900d0f8e57d8badb1a79ba2b1772aac82?placeholderIfAbsent=true",
      socialIcons: [
        "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/bc710d174c73d56f50851213b51c7626aed6e705?placeholderIfAbsent=true",
        "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/39369121fd078d3f368c1d10f2322830c054055f?placeholderIfAbsent=true"
      ]
    },
    {
      name: "Dr. Amara Okafor",
      role: "Head of Research",
      roleColor: "text-violet-600",
      description: "Bioethicist and researcher specializing in aging, technology adoption, and digital equity.",
      image: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/9c9563fe76130a85716c63b55cfb24655f9ad86f?placeholderIfAbsent=true",
      socialIcons: [
        "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/24f1eb526b6b4f396a5ebb4f529510eab500a61b?placeholderIfAbsent=true",
        "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/6f04ad7ac49df17f29f93b8c0289b32be3eb1960?placeholderIfAbsent=true"
      ]
    },
    {
      name: "James Thompson",
      role: "Head of Product",
      roleColor: "text-orange-600",
      description: "UX designer with a passion for accessibility and 10+ years creating intuitive interfaces for seniors.",
      image: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/02a61373bb19144a183afbf086902409e3331254?placeholderIfAbsent=true",
      socialIcons: [
        "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/1a9369063ef872953d401597d2c5d754e728d1f4?placeholderIfAbsent=true",
        "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/be11c27b3c5bcde35efb96099d5fc170e05903ca?placeholderIfAbsent=true"
      ]
    },
    {
      name: "Lisa Park",
      role: "Head of Partnerships",
      roleColor: "text-teal-600",
      description: "Healthcare industry veteran with extensive experience in care facility operations and technology adoption.",
      image: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/1a82facc322031f14dbd9fc11440c8e7a739a3fe?placeholderIfAbsent=true",
      socialIcons: [
        "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/d30b268f1ff26a3a7db2b9d52b8bbe1414fda73a?placeholderIfAbsent=true",
        "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/7b07ce294036aaf7429d9c23ff52d795a56e5eda?placeholderIfAbsent=true"
      ]
    },
    {
      name: "David Kim",
      role: "Head of Security",
      roleColor: "text-blue-600",
      description: "Cybersecurity expert focused on protecting sensitive healthcare data and ensuring HIPAA compliance.",
      image: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/04a7d0da3445f50d7ead49beb153b12217d2c3bb?placeholderIfAbsent=true",
      socialIcons: [
        "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/0c9f1548695127a6078e0fe930d56abdfd6908f0?placeholderIfAbsent=true",
        "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/f5cf9839cc11ccc641b088d33b3927789aaf2032?placeholderIfAbsent=true"
      ]
    }
  ];

  return (
    <section id="team" className="bg-white flex flex-col items-stretch justify-center p-20 max-md:max-w-full max-md:px-5">
      <div className="bg-[rgba(0,0,0,0)] px-6 max-md:max-w-full max-md:px-5">
        <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center font-normal text-center pb-2 px-20 max-md:max-w-full max-md:px-5">
          <div className="flex w-[761px] max-w-full flex-col items-stretch">
            <h2 className="text-slate-800 text-4xl leading-none self-center">Meet Our Founding Team</h2>
            <p className="text-gray-700 text-xl leading-7 mt-8 max-md:max-w-full">
              A diverse group of technologists, healthcare professionals, and advocates united by a shared vision for ethical elderly care technology.
            </p>
          </div>
        </div>
        <div className="bg-[rgba(0,0,0,0)] w-full mt-16 max-md:max-w-full max-md:mt-10">
          <div className="max-md:max-w-full">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
              {teamMembers.slice(0, 3).map((member, index) => (
                <div key={index} className="w-[33%] max-md:w-full max-md:ml-0">
                  <div className="bg-gray-50 flex grow flex-col items-stretch w-full p-8 rounded-xl max-md:mt-8 max-md:px-5">
                    <img
                      src={member.image}
                      className="aspect-[1] object-contain w-32 self-center max-w-full rounded-full"
                      alt={member.name}
                    />
                    <h3 className="bg-[rgba(0,0,0,0)] flex flex-col items-center text-xl text-slate-800 font-normal text-center mt-6 pt-px pb-[13px] px-[70px] max-md:px-5">
                      {member.name}
                    </h3>
                    <p className={`bg-[rgba(0,0,0,0)] flex flex-col items-center text-base ${member.roleColor} font-normal text-center mt-2 pt-0.5 pb-2.5 px-[70px] max-md:px-5`}>
                      {member.role}
                    </p>
                    <p className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch text-base text-gray-700 font-normal text-center mt-4 px-[25px] py-[5px] max-md:px-5">
                      {member.description}
                    </p>
                    <div className="bg-[rgba(0,0,0,0)] flex w-full flex-col items-center mt-4 px-[70px] max-md:px-5">
                      <div className="flex w-[42px] items-stretch gap-3">
                        {member.socialIcons.map((icon, iconIndex) => (
                          <img
                            key={iconIndex}
                            src={icon}
                            className="aspect-[0.58] object-contain w-3.5 shrink-0"
                            alt={`Social icon ${iconIndex + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 max-md:max-w-full">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
              {teamMembers.slice(3, 6).map((member, index) => (
                <div key={index + 3} className="w-[33%] max-md:w-full max-md:ml-0">
                  <div className="bg-gray-50 flex grow flex-col items-stretch w-full p-8 rounded-xl max-md:mt-8 max-md:px-5">
                    <img
                      src={member.image}
                      className="aspect-[1] object-contain w-32 self-center max-w-full rounded-full"
                      alt={member.name}
                    />
                    <h3 className="bg-[rgba(0,0,0,0)] flex flex-col items-center text-xl text-slate-800 font-normal text-center mt-6 pt-px pb-[13px] px-[70px] max-md:px-5">
                      {member.name}
                    </h3>
                    <p className={`bg-[rgba(0,0,0,0)] flex flex-col items-center text-base ${member.roleColor} font-normal text-center justify-center mt-2 px-[70px] py-[5px] max-md:px-5`}>
                      {member.role}
                    </p>
                    <p className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch text-base text-gray-700 font-normal text-center mt-4 px-[25px] py-[5px] max-md:px-5">
                      {member.description}
                    </p>
                    <div className="bg-[rgba(0,0,0,0)] flex w-full flex-col items-center mt-4 px-[70px] max-md:px-5">
                      <div className="flex w-[42px] items-stretch gap-3">
                        {member.socialIcons.map((icon, iconIndex) => (
                          <img
                            key={iconIndex}
                            src={icon}
                            className="aspect-[0.58] object-contain w-3.5 shrink-0"
                            alt={`Social icon ${iconIndex + 1}`}
                          />
                        ))}
                      </div>
                    </div>
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

export default Team;
