import React, { useState } from 'react';

const CallToAction = () => {
  const [selectedPartnership, setSelectedPartnership] = useState<string | null>(null);

  const partnerships = [
    {
      id: 'facility',
      title: 'Facility Partners',
      description: 'Join our pilot program and be the first to offer truly private fall detection',
      buttonText: 'Become a Pilot Partner',
      color: 'blue',
      textColor: 'blue-200'
    },
    {
      id: 'research',
      title: 'Research Collaborators',
      description: 'Partner with us on groundbreaking privacy-first healthcare technology research',
      buttonText: 'Collaborate with Our Team',
      color: 'green',
      textColor: 'green-200'
    },
    {
      id: 'investor',
      title: 'Investors',
      description: 'Invest in the future of privacy-compliant healthcare technology',
      buttonText: 'Request Executive Brief',
      color: 'purple',
      textColor: 'purple-200'
    }
  ];

  const handlePartnershipClick = (partnershipId: string) => {
    setSelectedPartnership(partnershipId);
    // Implement partnership form logic here
    console.log(`Selected partnership: ${partnershipId}`);
  };

  const handleDownloadWhitePaper = () => {
    // Implement download functionality
    console.log('Download white paper clicked');
  };

  const handleScheduleConsultation = () => {
    // Implement consultation scheduling
    console.log('Schedule consultation clicked');
  };

  return (
    <section className="w-full py-16 lg:py-20 px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <div className="bg-[rgba(0,0,0,0)] flex w-[951px] max-w-full flex-col ml-7">
          <h2 className="text-white text-5xl font-normal leading-none text-center ml-[18px] max-md:max-w-full max-md:text-[40px]">
            Ready to Lead the Privacy Revolution?
          </h2>
          <p className="text-blue-100 text-xl font-normal leading-[33px] text-center self-stretch mt-[34px] max-md:max-w-full">
            Join forward-thinking facilities and research institutions pioneering the future of dignified senior care monitoring
          </p>
          
          <div className="bg-[rgba(0,0,0,0)] w-[896px] max-w-full mt-[60px] max-md:mt-10">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
              {partnerships.map((partnership) => (
                <div key={partnership.id} className="w-[33%] max-md:w-full max-md:ml-0">
                  <div className={`bg-[rgba(255,255,255,0.1)] border grow text-base text-white text-center w-full px-[33px] py-[65px] rounded-2xl border-[rgba(255,255,255,0.2)] border-solid max-md:mt-8 max-md:px-5 hover:bg-[rgba(255,255,255,0.15)] transition-all cursor-pointer ${
                    selectedPartnership === partnership.id ? 'ring-2 ring-white' : ''
                  }`}>
                    <h3 className="bg-[rgba(0,0,0,0)] text-xl font-bold pb-[11px] px-[27px] max-md:px-5">
                      <div className="z-10">{partnership.title}</div>
                    </h3>
                    <p className={`bg-[rgba(0,0,0,0)] flex flex-col items-center text-${partnership.textColor} font-normal mt-3 pb-2.5 px-[7px]`}>
                      {partnership.description.split(' ').reduce((acc: string[], word: string, index: number) => {
                        if (index % 6 === 0 && index > 0) {
                          acc.push('\n');
                        }
                        acc.push(word);
                        return acc;
                      }, []).join(' ').split('\n').map((line, lineIndex) => (
                        <div key={lineIndex} className={lineIndex > 0 ? 'mt-[9px]' : 'self-stretch z-10'}>
                          {line.trim()}
                        </div>
                      ))}
                    </p>
                    <button 
                      onClick={() => handlePartnershipClick(partnership.id)}
                      className={`bg-${partnership.color}-600 flex flex-col items-center font-semibold mt-6 pt-[11px] pb-[25px] px-[42px] rounded-lg max-md:px-5 hover:bg-${partnership.color}-700 transition-colors w-full`}
                    >
                      {partnership.buttonText.split(' ').reduce((acc: string[], word: string, index: number) => {
                        if (index === 2) {
                          acc.push('\n');
                        }
                        acc.push(word);
                        return acc;
                      }, []).join(' ').split('\n').map((line, lineIndex) => (
                        <div key={lineIndex} className={lineIndex > 0 ? 'mt-3' : ''}>
                          {line.trim()}
                        </div>
                      ))}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-[21px] text-lg font-bold text-center flex-wrap mt-[43px] pt-[5px] pb-[25px] px-[72px] max-md:mt-10 max-md:px-5">
            <button 
              onClick={handleDownloadWhitePaper}
              className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] flex items-stretch gap-[35px] text-blue-900 grow shrink basis-auto pt-[17px] pb-[7px] px-[43px] rounded-xl max-md:px-5 hover:shadow-lg transition-shadow"
            >
              <img
                src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/263cdfefcc92f1fb3378b431a9147328c0f3de0e?placeholderIfAbsent=true"
                className="aspect-[0.62] object-contain w-[18px] shrink-0"
                alt="Download icon"
              />
              <div className="w-[257px]">
                Download Privacy White Paper
              </div>
            </button>
            
            <button 
              onClick={handleScheduleConsultation}
              className="bg-[rgba(0,0,0,0)] flex items-stretch gap-[40px_61px] text-white grow shrink basis-auto pt-[17px] pb-[11px] px-[45px] rounded-xl border-white border-solid border-2 max-md:px-5 hover:bg-white hover:text-gray-900 transition-colors"
            >
              <img
                src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/1f22ceaf9c4ab76eeea192d947af4a4869d9eea1?placeholderIfAbsent=true"
                className="aspect-[0.52] object-contain w-[15px] shrink-0"
                alt="Schedule icon"
              />
              <div className="w-[252px]">
                Schedule Privacy Consultation
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
