import React from 'react';

export const MetricsCards: React.FC = () => {
  const metrics = [
    {
      value: '<2s',
      title: 'Response Time',
      description: 'Fall detection to alert',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-600',
      titleColor: 'text-blue-800',
      icon: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/84a4c2c17466961d441b2dea6d596254ab60ad71?placeholderIfAbsent=true'
    },
    {
      value: '0%',
      title: 'Visual Data',
      description: 'No images captured',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-600',
      titleColor: 'text-green-800',
      icon: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/4c9702538145779f76c810dc7232a2f06345ca9a?placeholderIfAbsent=true'
    },
    {
      value: '24/7',
      title: 'Monitoring',
      description: 'Continuous operation',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-600',
      titleColor: 'text-purple-800',
      icon: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/d69e190069a3208c20debd3e601ed56fc9d181ef?placeholderIfAbsent=true'
    },
    {
      value: '3',
      title: 'Vital Signs',
      description: 'Falls, heart rate, respiration',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-600',
      titleColor: 'text-orange-800',
      icon: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/a1a7b091308b882c63d12b3aed8658dc965694ff?placeholderIfAbsent=true'
    }
  ];

  return (
    <div className="bg-[rgba(0,0,0,0)] mt-16 max-md:max-w-full max-md:mt-10">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        {metrics.map((metric, index) => (
          <div key={index} className="w-3/12 max-md:w-full max-md:ml-0">
            <div className={`${metric.bgColor} ${metric.borderColor} flex grow flex-col items-stretch ${metric.textColor} text-center w-full p-[26px] rounded-2xl border-solid border-2 max-md:mt-8 max-md:px-5`}>
              <img
                src={metric.icon}
                className="aspect-[1] object-contain w-16 self-center rounded-full"
                alt={metric.title}
              />
              <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center text-3xl font-bold whitespace-nowrap mt-4 pb-5 px-[70px] max-md:px-5">
                <div className="z-10 -mt-1.5">{metric.value}</div>
              </div>
              <div className={`bg-[rgba(0,0,0,0)] text-base ${metric.titleColor} font-semibold mt-2 pb-2.5 px-14 max-md:px-5`}>
                <div className="z-10">{metric.title}</div>
              </div>
              <div className="bg-[rgba(0,0,0,0)] text-sm font-normal mt-2 pb-2.5 px-[45px] max-md:px-5">
                <div className="z-10">{metric.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
