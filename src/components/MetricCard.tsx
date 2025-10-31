import React from 'react';

interface MetricCardProps {
  value: string;
  label: string;
  description: string;
  bgColor?: string;
  textColor?: string;
  labelColor?: string;
  descriptionColor?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  value,
  label,
  description,
  bgColor = "bg-[rgba(255,255,255,0.1)]",
  textColor = "text-white",
  labelColor = "text-blue-200",
  descriptionColor = "text-blue-100"
}) => {
  return (
    <div className={`${bgColor} grow text-center w-full p-6 rounded-2xl max-md:mt-8 max-md:px-5`}>
      <div className={`flex flex-col items-center text-4xl ${textColor} font-bold whitespace-nowrap pb-[22px] px-[70px] max-md:px-5`}>
        <div className="z-10 -mt-2">{value}</div>
      </div>
      <div className={`text-base ${labelColor} font-semibold mt-2 pb-2.5 px-[68px] max-md:px-5`}>
        <div className="z-10">{label}</div>
      </div>
      <div className={`text-sm ${descriptionColor} font-normal mt-2 pb-2 px-[39px] max-md:px-5`}>
        <div className="z-10">{description}</div>
      </div>
    </div>
  );
};

export default MetricCard;
