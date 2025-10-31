import React from 'react';

interface Achievement {
  value: string;
  label: string;
  color: string;
}

interface TeamMemberCardProps {
  image: string;
  name: string;
  title: string;
  titleColor: string;
  credentials: Array<{
    icon: string;
    text: string;
  }>;
  achievements: Achievement[];
  affiliation: {
    logo: string;
    name: string;
  };
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  image,
  name,
  title,
  titleColor,
  credentials,
  achievements,
  affiliation
}) => {
  return (
    <div className="shadow-[0px_8px_10px_rgba(0,0,0,0.1)] w-full pt-[27px] pb-11 px-[17px] rounded-3xl max-md:max-w-full max-md:mt-10 max-md:pr-5">
      <div className="bg-[rgba(0,0,0,0)] max-md:max-w-full">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-[30%] max-md:w-full max-md:ml-0">
            <img
              src={image}
              className="aspect-[1] object-contain w-[158px] shrink-0 max-w-full"
              alt={name}
            />
          </div>
          <div className="w-[70%] ml-5 max-md:w-full max-md:ml-0">
            <div className="bg-[rgba(0,0,0,0)] w-full mt-[5px] mx-auto max-md:mt-2">
              <div className="flex w-full flex-col items-stretch pl-3">
                <h3 className="text-gray-900 text-3xl font-bold leading-[1.2]">
                  {name}
                </h3>
                <div className={`text-lg font-semibold leading-loose mr-[30px] mt-[17px] max-md:mr-2.5 ${titleColor}`}>
                  {title}
                </div>
                <div className="bg-[rgba(0,0,0,0)] w-full text-base text-gray-700 font-normal leading-6 mt-[30px]">
                  {credentials.map((credential, index) => (
                    <div key={index} className="bg-[rgba(0,0,0,0)] flex items-stretch gap-3 pb-[9px] max-md:mr-[3px]">
                      <img
                        src={credential.icon}
                        className="aspect-[0.83] object-contain w-5 shrink-0 my-auto"
                        alt=""
                      />
                      <div className="grow shrink w-[316px] basis-auto">
                        {credential.text}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-4 whitespace-nowrap text-center mt-[23px] p-0.5">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] flex-1 p-3 rounded-lg">
                      <div className={`bg-[rgba(0,0,0,0)] text-2xl font-bold pb-[18px] px-[35px] max-md:px-5 ${achievement.color}`}>
                        <div className="z-10 -mt-1">{achievement.value}</div>
                      </div>
                      <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch text-xs text-gray-600 font-normal pb-[7px] px-[11px]">
                        <div className="self-center z-10">{achievement.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-4 mt-[21px] px-3.5 py-px max-md:mr-[3px]">
                <div className="bg-[rgba(240,240,240,1)] flex flex-col items-center text-xs text-[rgba(153,153,153,1)] font-normal whitespace-nowrap text-center justify-center">
                  <div>IMG<br />48.90625×32</div>
                </div>
                <div className="text-gray-600 text-sm font-medium leading-none grow shrink w-[263px] basis-auto my-auto">
                  {affiliation.name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
