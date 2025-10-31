import React from 'react';

interface StatCardProps {
  icon: string;
  value: string;
  label: string;
  description: string;
}

export const StatCard: React.FC<StatCardProps> = ({ icon, value, label, description }) => {
  return (
    <div className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] flex grow flex-col items-stretch text-center w-full p-6 rounded-xl max-md:mt-[29px] max-md:px-5">
      <img
        src={icon}
        className="aspect-[1] object-contain w-12 self-center rounded-full"
        alt=""
      />
      <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center text-3xl text-gray-900 font-bold whitespace-nowrap mt-4 pb-5 px-[70px] max-md:px-5">
        <div className="z-10 -mt-1.5">{value}</div>
      </div>
      <div className="bg-[rgba(0,0,0,0)] text-base text-gray-600 font-medium pb-[13px] px-[52px] max-md:px-5">
        <div className="z-10">{label}</div>
      </div>
      <div className="bg-[rgba(0,0,0,0)] text-sm text-gray-500 font-normal mt-1 pb-2.5 px-[25px] max-md:px-5">
        <div className="z-10">{description}</div>
      </div>
    </div>
  );
};
