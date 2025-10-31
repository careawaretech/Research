import React from 'react';

interface ComplianceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  borderColor: string;
  titleColor: string;
}

const ComplianceCard: React.FC<ComplianceCardProps> = ({
  title,
  description,
  icon,
  borderColor,
  titleColor
}) => {
  return (
    <div className={`bg-white ${borderColor} flex grow flex-col items-stretch text-center w-full p-[26px] rounded-xl border-solid border-2 max-md:mt-4 max-md:px-5`}>
      <div className="flex justify-center">
        {icon}
      </div>
      <div className={`text-base ${titleColor} font-semibold mt-4 pb-[9px] px-[61px] max-md:px-5`}>
        <h4>{title}</h4>
      </div>
      <div className="text-sm text-gray-600 font-normal mt-2 pb-[7px] px-[17px]">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ComplianceCard;
