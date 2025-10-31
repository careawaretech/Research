import React from 'react';
import { TeamMemberCard } from '../cards/TeamMemberCard';

export const TeamSection: React.FC = () => {
  const teamMembers = [
    {
      image: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/9f45d091c0c8106eb9dc3fd47fb6f1b9a9b31096?placeholderIfAbsent=true",
      name: "Dr. Sarah Chen, PhD",
      title: "Co-Founder & Chief Executive Officer",
      titleColor: "text-blue-600",
      credentials: [
        {
          icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/79196295083b37281b1618822927f44b99c821fb?placeholderIfAbsent=true",
          text: "PhD in Electrical Engineering, Portland State University"
        },
        {
          icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/dc3f67468fcd73770e082740ffa51730e43a6ded?placeholderIfAbsent=true",
          text: "Dual Master's degrees in Signal Processing & RF Systems"
        },
        {
          icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/f158a628d7dbcd0cdfc4b8152423e5855881e708?placeholderIfAbsent=true",
          text: "Research focus: SFCW radar for healthcare applications"
        },
        {
          icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/127c92fa9441ff9cc50cc5f758ac9e245308ee74?placeholderIfAbsent=true",
          text: "22 peer-reviewed publications in healthcare sensing"
        }
      ],
      achievements: [
        { value: "8", label: "Years Experience", color: "text-blue-600" },
        { value: "15", label: "h-index", color: "text-purple-600" },
        { value: "487", label: "Citations", color: "text-green-600" }
      ],
      affiliation: {
        logo: "",
        name: "Portland State University"
      }
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/a0f267d4ef01c0085c1cfa8bbbd781f6e13ba5d8?placeholderIfAbsent=true",
      name: "Dr. Michael Rodriguez, PhD",
      title: "Co-Founder & Chief Technology Officer",
      titleColor: "text-green-600",
      credentials: [
        {
          icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/9248a5c83ee1641c55ecf5759fadc86dadcf6202?placeholderIfAbsent=true",
          text: "PhD in Electrical Engineering, Stanford University"
        },
        {
          icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/ea20f42389b1c9d36a78b5acd65391f023478c2e?placeholderIfAbsent=true",
          text: "Senior RF Engineer, Intel Corporation (2020– present)"
        },
        {
          icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/af35101f832f2856210ef47e94645a9945c73878?placeholderIfAbsent=true",
          text: "Expertise: Wireless communications, IoT systems"
        },
        {
          icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/eabfad8d50dcc493ad31913ece9bad042f9b3e77?placeholderIfAbsent=true",
          text: "25 patents in RF hardware design"
        }
      ],
      achievements: [
        { value: "12", label: "Years Experience", color: "text-green-600" },
        { value: "21", label: "h-index", color: "text-blue-600" },
        { value: "760", label: "Citations", color: "text-purple-600" }
      ],
      affiliation: {
        logo: "",
        name: "Intel Corporation"
      }
    }
  ];

  const expertiseAreas = [
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/fe7ca91daeceafdc048ce998383193518a6d93f1?placeholderIfAbsent=true",
      title: "SFCW Radar Systems",
      description: "Advanced radar signal processing for healthcare monitoring applications"
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/8f9bcf2711e78633204ccecf4531174fa98aa1c1?placeholderIfAbsent=true",
      title: "WiFi CSI Analysis",
      description: "Channel State Information extraction for ambient sensing"
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/43ae802fb6d85c62e218f30bb128eb6b7ad71512?placeholderIfAbsent=true",
      title: "Privacy Technology",
      description: "Privacy-preserving sensing methodologies and ethical AI"
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/133e200d439d624a30d632d51e625edd22c74b2a?placeholderIfAbsent=true",
      title: "Healthcare Sensing",
      description: "Contactless vital signs monitoring and fall detection"
    }
  ];

  return (
    <section className="bg-white w-full py-16 lg:py-20 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center font-normal text-center pb-[9px] max-md:max-w-full">
          <div className="flex w-[783px] max-w-full flex-col items-stretch ml-2.5">
            <h2 className="text-gray-900 text-4xl leading-none self-center max-md:max-w-full">
              Founding Team Credentials
            </h2>
            <p className="text-gray-600 text-xl leading-7 mt-[29px] max-md:max-w-full">
              PhD researchers with combined expertise in RF engineering, signal processing, and healthcare technology
            </p>
          </div>
        </div>
        <div className="bg-[rgba(0,0,0,0)] mt-[59px] pt-[5px] pb-[45px] px-[25px] max-md:max-w-full max-md:mt-10 max-md:px-5">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            {teamMembers.map((member, index) => (
              <div key={index} className="w-6/12 max-md:w-full max-md:ml-0">
                <TeamMemberCard {...member} />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-50 mt-[19px] pt-8 pb-[7px] px-[17px] rounded-3xl max-md:max-w-full">
          <div className="flex flex-col items-center text-3xl text-gray-900 font-normal text-center justify-center py-1 max-md:max-w-full">
            <h3 className="max-md:max-w-full">Combined Research Expertise</h3>
          </div>
          <div className="bg-[rgba(0,0,0,0)] mt-[27px] pt-[5px] pb-[25px] px-[15px] max-md:max-w-full">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
              {expertiseAreas.map((area, index) => (
                <div key={index} className="w-3/12 max-md:w-full max-md:ml-0">
                  <div className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] flex grow flex-col items-stretch text-center w-full p-6 rounded-xl max-md:mt-[29px] max-md:px-5">
                    <img
                      src={area.icon}
                      className="aspect-[1] object-contain w-16 self-center rounded-full"
                      alt=""
                    />
                    <h4 className="bg-[rgba(0,0,0,0)] text-base text-gray-900 font-semibold mt-4 pb-2.5 px-7 max-md:mr-0.5 max-md:px-5">
                      <div className="z-10">{area.title}</div>
                    </h4>
                    <p className="bg-[rgba(0,0,0,0)] flex flex-col items-center text-sm text-gray-600 font-normal mt-2 pb-2 px-px">
                      <span className="self-stretch z-10">{area.description}</span>
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
