import React from 'react';

interface CaseStudy {
  id: string;
  title: string;
  type: string;
  typeColor: string;
  rating: number;
  description: string;
  residents: number;
  duration: string;
  improvement: number;
  improvementLabel: string;
  image: string;
  buttonColor: string;
  icon: string;
}

const CaseStudyGrid = () => {
  const caseStudies: CaseStudy[] = [
    {
      id: '1',
      title: 'Golden Years Residence',
      type: 'Assisted Living',
      typeColor: 'bg-sky-100 text-sky-800',
      rating: 5.0,
      description: 'Implementation of comprehensive vital signs monitoring resulted in 67% improvement in early health intervention and 23% reduction in emergency room visits.',
      residents: 156,
      duration: '18mo',
      improvement: 67,
      improvementLabel: 'Improvement',
      image: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/cfee9578b71f6b170a21ed7f8cad81cdc0356bb2?placeholderIfAbsent=true',
      buttonColor: 'bg-sky-600',
      icon: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/dc79257026d1e508720087fa6ece011ffa29e134?placeholderIfAbsent=true'
    },
    {
      id: '2',
      title: 'Riverside Healthcare Center',
      type: 'Skilled Nursing',
      typeColor: 'bg-green-100 text-green-800',
      rating: 4.8,
      description: 'Advanced fall detection deployment across high-acuity units achieved 91% accuracy rate and reduced staff response time by 58% while maintaining HIPAA compliance.',
      residents: 240,
      duration: '24mo',
      improvement: 91,
      improvementLabel: 'Accuracy',
      image: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/c35124a43b31bb4e4479a28f72122fedde769234?placeholderIfAbsent=true',
      buttonColor: 'bg-green-600',
      icon: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/7fed7665e626c0bcd57f42c44d2b9b5f01b302c0?placeholderIfAbsent=true'
    },
    {
      id: '3',
      title: 'Maple Grove Memory Care',
      type: 'Memory Care',
      typeColor: 'bg-purple-100 text-purple-800',
      rating: 5.0,
      description: 'Specialized deployment for dementia care achieved 85% reduction in wandering incidents and 72% improvement in sleep pattern monitoring without compromising privacy.',
      residents: 88,
      duration: '12mo',
      improvement: 85,
      improvementLabel: 'Reduction',
      image: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/bbe5110727369d86745d1316cd8f488db6e44997?placeholderIfAbsent=true',
      buttonColor: 'bg-purple-600',
      icon: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/eb43ff3ad832e63786ad748398e115f25554eb5b?placeholderIfAbsent=true'
    },
    {
      id: '4',
      title: 'Sunrise Independent Living',
      type: 'Independent Living',
      typeColor: 'bg-orange-100 text-orange-800',
      rating: 4.7,
      description: 'Pilot program for wellness monitoring in independent units showed 43% increase in early health alerts and 89% resident satisfaction with privacy protection.',
      residents: 320,
      duration: '6mo',
      improvement: 89,
      improvementLabel: 'Satisfaction',
      image: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/04c96c52027db6c7db84d8dca98c2b158f1edd88?placeholderIfAbsent=true',
      buttonColor: 'bg-orange-600',
      icon: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/5676a1feb5f58f0a3f90f1105d378b76d5e0d111?placeholderIfAbsent=true'
    },
    {
      id: '5',
      title: 'Metro Rehabilitation Center',
      type: 'Rehabilitation',
      typeColor: 'bg-teal-100 text-teal-800',
      rating: 4.9,
      description: 'Comprehensive monitoring during rehabilitation phases resulted in 56% improvement in recovery tracking and 34% reduction in readmission rates.',
      residents: 180,
      duration: '15mo',
      improvement: 56,
      improvementLabel: 'Improvement',
      image: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/575aa93da27c0281a654602c560d05e71bf2a11f?placeholderIfAbsent=true',
      buttonColor: 'bg-teal-600',
      icon: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/e034a0617bb7554023ff2894009f9754b325a5d3?placeholderIfAbsent=true'
    },
    {
      id: '6',
      title: 'Heritage Village CCRC',
      type: 'CCRC',
      typeColor: 'bg-indigo-100 text-indigo-800',
      rating: 5.0,
      description: 'Multi-level care deployment across all facility types showed consistent 78% improvement in care coordination and 45% reduction in care transition incidents.',
      residents: 450,
      duration: '36mo',
      improvement: 78,
      improvementLabel: 'Coordination',
      image: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/7b0828476d000207946e8368f0367dab7820665c?placeholderIfAbsent=true',
      buttonColor: 'bg-indigo-600',
      icon: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/18db71d81cda13e9a6f90b1206c39570c9c5ae85?placeholderIfAbsent=true'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <img
        key={i}
        src={i < Math.floor(rating) 
          ? "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/109014bb0fc7a9b5928f210cbe718062c83c8286?placeholderIfAbsent=true"
          : "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/fe4a0247f89a7cc135b1e4c85ef56a60393a46a0?placeholderIfAbsent=true"
        }
        className="aspect-[0.8] object-contain w-4 shrink-0"
        alt="Star"
      />
    ));
  };

  return (
    <section className="bg-gray-50 w-full py-16 lg:py-20 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center text-center pb-[13px] px-20 max-md:max-w-full max-md:mr-0.5 max-md:px-5">
          <div className="flex w-[740px] max-w-full flex-col items-stretch">
            <h2 className="text-gray-900 text-4xl font-bold leading-none self-center max-md:max-w-full">
              Clinical Validation Portfolio
            </h2>
            <p className="text-gray-600 text-xl font-normal leading-7 mt-[27px] max-md:max-w-full">
              Comprehensive case studies demonstrating measurable impact across diverse senior care environments
            </p>
          </div>
        </div>
        <div className="bg-[rgba(0,0,0,0)] w-full mt-[47px] p-0.5 max-md:max-w-full max-md:mt-10">
          <div className="max-md:max-w-full">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
              {caseStudies.slice(0, 3).map((study) => (
                <div key={study.id} className="w-[33%] max-md:w-full max-md:ml-0">
                  <div className="bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] grow w-full rounded-xl max-md:mt-8">
                    <div className="overflow-hidden rounded-[12px_12px_0px_0px]">
                      <img
                        src={study.image}
                        className="aspect-[2.02] object-contain w-full"
                        alt={study.title}
                      />
                    </div>
                    <div className="bg-[rgba(0,0,0,0)] flex w-full flex-col items-stretch p-6 max-md:px-5">
                      <div className="bg-[rgba(0,0,0,0)] flex w-full items-stretch gap-5 justify-between">
                        <span className={`flex flex-col items-stretch text-xs font-medium text-center justify-center px-3 py-1.5 rounded-full ${study.typeColor}`}>
                          <div>{study.type}</div>
                        </span>
                        <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-1 my-auto">
                          <div className="flex items-stretch">
                            {renderStars(study.rating)}
                          </div>
                          <div className="text-gray-600 text-xs font-normal leading-none">
                            {study.rating}
                          </div>
                        </div>
                      </div>
                      <h3 className="text-gray-900 text-xl font-bold leading-[1.4] mt-3">
                        {study.title}
                      </h3>
                      <p className="text-gray-600 text-sm font-normal leading-5 mr-6 mt-6 max-md:mr-2.5">
                        {study.description}
                      </p>
                      <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-5 text-center justify-between mt-[22px]">
                        <div className="bg-[rgba(0,0,0,0)] whitespace-nowrap">
                          <div className={`text-lg font-bold pt-[3px] pb-3 px-[13px] ${
                            study.buttonColor.includes('sky') ? 'text-sky-600' :
                            study.buttonColor.includes('green') ? 'text-green-600' :
                            study.buttonColor.includes('purple') ? 'text-purple-600' :
                            study.buttonColor.includes('orange') ? 'text-orange-600' :
                            study.buttonColor.includes('teal') ? 'text-teal-600' :
                            'text-indigo-600'
                          }`}>
                            <div>{study.residents}</div>
                          </div>
                          <div className="text-xs text-gray-500 font-normal pb-[7px] px-px">
                            <div>Residents</div>
                          </div>
                        </div>
                        <div className="bg-[rgba(0,0,0,0)]">
                          <div className="text-lg text-sky-600 font-bold whitespace-nowrap pt-[3px] pb-3 px-[19px]">
                            <div>{study.duration}</div>
                          </div>
                          <div className="flex flex-col items-stretch text-xs text-gray-500 font-normal justify-center px-px py-[3px]">
                            <div>Study Duration</div>
                          </div>
                        </div>
                        <div className="bg-[rgba(0,0,0,0)] whitespace-nowrap">
                          <div className={`text-lg font-bold pt-[3px] pb-[11px] px-[19px] ${
                            study.buttonColor.includes('sky') ? 'text-sky-600' :
                            study.buttonColor.includes('green') ? 'text-green-600' :
                            study.buttonColor.includes('purple') ? 'text-purple-600' :
                            study.buttonColor.includes('orange') ? 'text-orange-600' :
                            study.buttonColor.includes('teal') ? 'text-teal-600' :
                            'text-indigo-600'
                          }`}>
                            <div>{study.improvement}%</div>
                          </div>
                          <div className="flex flex-col items-stretch text-xs text-gray-500 font-normal justify-center px-px py-[3px]">
                            <div>{study.improvementLabel}</div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-2 text-sm text-white font-medium text-center mt-4">
                        <button className={`flex flex-col items-center grow shrink-0 basis-0 w-fit pt-[9px] pb-4 px-[70px] rounded-lg max-md:px-5 ${study.buttonColor}`}>
                          <div>View Study</div>
                        </button>
                        <img
                          src={study.icon}
                          className="aspect-[1.26] object-contain w-12 shrink-0 rounded-lg"
                          alt="Icon"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 max-md:max-w-full">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
              {caseStudies.slice(3, 6).map((study) => (
                <div key={study.id} className="w-[33%] max-md:w-full max-md:ml-0">
                  <div className="bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] grow w-full rounded-xl max-md:mt-8">
                    <div className="overflow-hidden rounded-[12px_12px_0px_0px]">
                      <img
                        src={study.image}
                        className="aspect-[2.02] object-contain w-full"
                        alt={study.title}
                      />
                    </div>
                    <div className="bg-[rgba(0,0,0,0)] flex w-full flex-col items-stretch p-6 max-md:px-5">
                      <div className="bg-[rgba(0,0,0,0)] flex w-full items-stretch gap-5 justify-between">
                        <span className={`flex flex-col items-stretch text-xs font-medium text-center justify-center px-3 py-1.5 rounded-full ${study.typeColor}`}>
                          <div>{study.type}</div>
                        </span>
                        <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-1 my-auto">
                          <div className="flex items-stretch">
                            {renderStars(study.rating)}
                          </div>
                          <div className="text-gray-600 text-xs font-normal leading-none">
                            {study.rating}
                          </div>
                        </div>
                      </div>
                      <h3 className="text-gray-900 text-xl font-bold leading-[1.4] mt-3">
                        {study.title}
                      </h3>
                      <p className="text-gray-600 text-sm font-normal leading-5 mr-6 mt-6 max-md:mr-2.5">
                        {study.description}
                      </p>
                      <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-5 text-center justify-between mt-[22px]">
                        <div className="bg-[rgba(0,0,0,0)] whitespace-nowrap">
                          <div className={`text-lg font-bold pt-[3px] pb-3 px-[13px] ${
                            study.buttonColor.includes('sky') ? 'text-sky-600' :
                            study.buttonColor.includes('green') ? 'text-green-600' :
                            study.buttonColor.includes('purple') ? 'text-purple-600' :
                            study.buttonColor.includes('orange') ? 'text-orange-600' :
                            study.buttonColor.includes('teal') ? 'text-teal-600' :
                            'text-indigo-600'
                          }`}>
                            <div>{study.residents}</div>
                          </div>
                          <div className="text-xs text-gray-500 font-normal pb-[7px] px-px">
                            <div>{study.id === '5' ? 'Patients' : 'Residents'}</div>
                          </div>
                        </div>
                        <div className="bg-[rgba(0,0,0,0)]">
                          <div className="text-lg text-sky-600 font-bold whitespace-nowrap pt-[3px] pb-3 px-[19px]">
                            <div>{study.duration}</div>
                          </div>
                          <div className="flex flex-col items-stretch text-xs text-gray-500 font-normal justify-center px-px py-[3px]">
                            <div>{study.id === '4' ? 'Pilot Duration' : 'Study Duration'}</div>
                          </div>
                        </div>
                        <div className="bg-[rgba(0,0,0,0)] whitespace-nowrap">
                          <div className={`text-lg font-bold pt-[3px] pb-[11px] px-[19px] ${
                            study.buttonColor.includes('sky') ? 'text-sky-600' :
                            study.buttonColor.includes('green') ? 'text-green-600' :
                            study.buttonColor.includes('purple') ? 'text-purple-600' :
                            study.buttonColor.includes('orange') ? 'text-orange-600' :
                            study.buttonColor.includes('teal') ? 'text-teal-600' :
                            'text-indigo-600'
                          }`}>
                            <div>{study.improvement}%</div>
                          </div>
                          <div className="flex flex-col items-stretch text-xs text-gray-500 font-normal justify-center px-px py-[3px]">
                            <div>{study.improvementLabel}</div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-2 text-sm text-white font-medium text-center mt-4">
                        <button className={`flex flex-col items-center grow shrink-0 basis-0 w-fit pt-[9px] pb-4 px-[70px] rounded-lg max-md:px-5 ${study.buttonColor}`}>
                          <div>View Study</div>
                        </button>
                        <img
                          src={study.icon}
                          className="aspect-[1.26] object-contain w-12 shrink-0 rounded-lg"
                          alt="Icon"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-[rgba(0,0,0,0)] flex w-full flex-col items-center text-base text-white font-medium text-center mt-[45px] px-[70px] max-md:max-w-full max-md:mr-0.5 max-md:mt-10 max-md:px-5">
          <button className="bg-sky-600 flex w-[254px] max-w-full items-stretch gap-[27px] px-8 py-3 rounded-lg max-md:px-5">
            <img
              src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/b43a0e2cc38de7dbb86d332f79cdbe63bcdac07f?placeholderIfAbsent=true"
              className="aspect-[0.67] object-contain w-4 shrink-0"
              alt="View All"
            />
            <div className="grow shrink w-36">View All Case Studies</div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyGrid;
