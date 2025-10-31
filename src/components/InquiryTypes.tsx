import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface InquiryType {
  id: string;
  title: string;
  description: string;
  icon: string;
  borderColor: string;
  titleColor: string;
  descriptionColor: string;
  listColor: string;
  items: string[];
}

const inquiryTypes: InquiryType[] = [
  {
    id: 'facility',
    title: 'Facility Partnership',
    description: 'Join our pilot program for assisted living and memory care facilities',
    icon: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/a5ad597315479d4a762dc50015b18c0a3e329d7b?placeholderIfAbsent=true',
    borderColor: 'border-blue-200',
    titleColor: 'text-blue-900',
    descriptionColor: 'text-blue-800',
    listColor: 'text-blue-700',
    items: [
      '• Free equipment during pilot',
      '• Professional installation & training',
      '• Early adopter pricing guarantee',
      '• Co-publication opportunities'
    ]
  },
  {
    id: 'research',
    title: 'Research Collaboration',
    description: 'Academic partnerships, NIH grants, and scientific collaboration',
    icon: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/a31c2bc031f8b818caefbca17ae41dab99fc3fb4?placeholderIfAbsent=true',
    borderColor: 'border-green-200',
    titleColor: 'text-green-900',
    descriptionColor: 'text-green-800',
    listColor: 'text-green-700',
    items: [
      '• Co-investigator opportunities',
      '• Data sharing agreements',
      '• Joint publication projects',
      '• Advisory board participation'
    ]
  },
  {
    id: 'investor',
    title: 'Investor Relations',
    description: 'Early-stage investment opportunities in dual-technology platform',
    icon: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/29fdccb029e79422dafbf585288b2abd8b6d46b8?placeholderIfAbsent=true',
    borderColor: 'border-purple-200',
    titleColor: 'text-purple-900',
    descriptionColor: 'text-purple-800',
    listColor: 'text-purple-700',
    items: [
      '• Executive brief & pitch deck',
      '• Financial projections',
      '• Market analysis & competitive advantage',
      '• Due diligence materials'
    ]
  },
  {
    id: 'media',
    title: 'Media Inquiry',
    description: 'Press releases, interviews, and media coverage requests',
    icon: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/73b0dcdef16e8e8753ca03920d74ddfece983704?placeholderIfAbsent=true',
    borderColor: 'border-orange-200',
    titleColor: 'text-orange-900',
    descriptionColor: 'text-orange-800',
    listColor: 'text-orange-700',
    items: [
      '• Founder interviews',
      '• Technology demonstrations',
      '• Press kit & media resources',
      '• Industry expert commentary'
    ]
  },
  {
    id: 'technical',
    title: 'Technical Support',
    description: 'Technical questions, integration support, and system specifications',
    icon: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/58a37d9618394a0f5323fd2a8b3d218aae60b7e0?placeholderIfAbsent=true',
    borderColor: 'border-red-200',
    titleColor: 'text-red-900',
    descriptionColor: 'text-red-800',
    listColor: 'text-red-700',
    items: [
      '• System specifications',
      '• Integration requirements',
      '• Technical documentation',
      '• Implementation guidance'
    ]
  },
  {
    id: 'general',
    title: 'General Question',
    description: 'Other questions, feedback, or general information requests',
    icon: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/a612e179d0943f79f7a321daba42e558b1cf5d9e?placeholderIfAbsent=true',
    borderColor: 'border',
    titleColor: 'text-gray-900',
    descriptionColor: 'text-gray-800',
    listColor: 'text-gray-700',
    items: [
      '• General information',
      '• Product inquiries',
      '• Feedback & suggestions',
      '• Other questions'
    ]
  }
];

const InquiryTypes = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <section className="bg-white flex flex-col items-center pt-20 pb-[35px] px-20 max-md:max-w-full max-md:px-5">
      <div className="bg-[rgba(0,0,0,0)] w-full max-w-screen-lg pb-[45px] px-8 max-md:max-w-full max-md:px-5">
        {/* Progress Steps */}
        <div className="bg-[rgba(0,0,0,0)] w-full max-md:max-w-full">
          <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-[9px] text-sm px-[42px] max-md:px-5">
            <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-3">
              <div className="bg-[rgba(44,95,141,1)] border-blue-600 flex flex-col items-center text-white font-semibold whitespace-nowrap w-10 h-10 pt-[9px] pb-[21px] px-4 rounded-full border-solid border-2">
                <div>1</div>
              </div>
              <div className="text-gray-900 font-medium leading-none my-auto">
                Inquiry Type
              </div>
            </div>
            <div className="bg-gray-300 flex w-16 shrink-0 h-0.5 my-auto" />
            <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-3 text-gray-500">
              <div className="bg-gray-100 border-gray-300 flex flex-col items-center font-semibold whitespace-nowrap w-10 h-10 pt-[9px] pb-[21px] px-4 rounded-full border-solid border-2">
                <div>2</div>
              </div>
              <div className="font-medium leading-none basis-auto my-auto">
                Contact Details
              </div>
            </div>
            <div className="bg-gray-300 flex w-16 shrink-0 h-0.5 my-auto" />
            <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-3 text-gray-500">
              <div className="bg-gray-100 border-gray-300 flex flex-col items-center font-semibold whitespace-nowrap w-10 h-10 pt-[9px] pb-[21px] px-4 rounded-full border-solid border-2">
                <div>3</div>
              </div>
              <div className="font-medium leading-none basis-auto my-auto">
                Specific Details
              </div>
            </div>
            <div className="bg-gray-300 flex w-16 shrink-0 h-0.5 my-auto" />
            <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-3 text-gray-500">
              <div className="bg-gray-100 border-gray-300 flex flex-col items-center font-semibold whitespace-nowrap w-10 h-10 pt-[9px] pb-[21px] px-4 rounded-full border-solid border-2">
                <div>4</div>
              </div>
              <div className="font-medium leading-none basis-auto my-auto">
                Review & Submit
              </div>
            </div>
          </div>
          <div className="bg-gray-200 flex flex-col mt-8 rounded-full max-md:max-w-full max-md:pr-5">
            <div className="bg-blue-600 flex w-60 shrink-0 h-2 rounded-full" />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white shadow-[0px_8px_10px_rgba(0,0,0,0.1)] border border flex flex-col overflow-hidden items-stretch justify-center mt-12 p-px rounded-2xl border-solid max-md:max-w-full max-md:mt-10">
          <div className="bg-[rgba(0,0,0,0)] p-8 max-md:max-w-full max-md:px-5">
            <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center font-normal text-center pb-[9px] px-20 max-md:max-w-full max-md:px-5">
              <div className="flex w-[420px] max-w-full flex-col items-stretch">
                <div className="text-gray-900 text-3xl leading-[1.2] self-center">
                  How can we help you?
                </div>
                <div className="text-gray-600 text-base mt-6">
                  Select the type of inquiry that best matches your needs
                </div>
              </div>
            </div>

            {/* Inquiry Type Cards */}
            <div className="bg-[rgba(0,0,0,0)] w-full mt-8 max-md:max-w-full">
              <div className="max-md:max-w-full">
                <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                  {inquiryTypes.slice(0, 2).map((type) => (
                    <div key={type.id} className="w-6/12 max-md:w-full max-md:ml-0">
                      <button
                        className={`${type.borderColor} flex w-full flex-col items-stretch font-normal justify-center p-[26px] rounded-xl border-solid border-2 max-md:max-w-full max-md:mt-6 max-md:px-5 transition-all hover:shadow-md ${
                          selectedType === type.id ? 'ring-2 ring-blue-500' : ''
                        }`}
                        onClick={() => setSelectedType(type.id)}
                      >
                        <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-4">
                          <img
                            src={type.icon}
                            className="aspect-[1] object-contain w-12 shrink-0 rounded-lg"
                            alt={`${type.title} icon`}
                          />
                          <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch grow shrink-0 basis-0 w-fit text-left">
                            <div className={`${type.titleColor} text-xl font-bold leading-[1.4]`}>
                              {type.title}
                            </div>
                            <div className={`${type.descriptionColor} text-base leading-6 mt-[17px] max-md:mr-2.5`}>
                              {type.description}
                            </div>
                            <div className={`bg-[rgba(0,0,0,0)] text-sm ${type.listColor} mt-[25px]`}>
                              {type.items.map((item, index) => (
                                <div key={index} className="bg-[rgba(0,0,0,0)] flex flex-col pb-[7px] max-md:pr-5">
                                  <div className="z-10">{item}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 max-md:max-w-full">
                <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                  {inquiryTypes.slice(2, 4).map((type) => (
                    <div key={type.id} className="w-6/12 max-md:w-full max-md:ml-0">
                      <button
                        className={`${type.borderColor} flex w-full flex-col items-stretch font-normal justify-center p-[26px] rounded-xl border-solid border-2 max-md:max-w-full max-md:mt-6 max-md:px-5 transition-all hover:shadow-md ${
                          selectedType === type.id ? 'ring-2 ring-blue-500' : ''
                        }`}
                        onClick={() => setSelectedType(type.id)}
                      >
                        <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-4">
                          <img
                            src={type.icon}
                            className="aspect-[1] object-contain w-12 shrink-0 rounded-lg"
                            alt={`${type.title} icon`}
                          />
                          <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch grow shrink-0 basis-0 w-fit text-left">
                            <div className={`${type.titleColor} text-xl font-bold leading-[1.4]`}>
                              {type.title}
                            </div>
                            <div className={`${type.descriptionColor} text-base leading-6 mt-5 max-md:mr-2.5`}>
                              {type.description}
                            </div>
                            <div className={`bg-[rgba(0,0,0,0)] text-sm ${type.listColor} mt-7`}>
                              {type.items.map((item, index) => (
                                <div key={index} className="bg-[rgba(0,0,0,0)] flex flex-col pb-[7px] max-md:pr-5">
                                  <div className="z-10">{item}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 max-md:max-w-full">
                <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                  {inquiryTypes.slice(4, 6).map((type) => (
                    <div key={type.id} className="w-6/12 max-md:w-full max-md:ml-0">
                      <button
                        className={`${type.borderColor} flex w-full flex-col items-stretch font-normal justify-center p-[26px] rounded-xl border-solid border-2 max-md:max-w-full max-md:mt-6 max-md:px-5 transition-all hover:shadow-md ${
                          selectedType === type.id ? 'ring-2 ring-blue-500' : ''
                        }`}
                        onClick={() => setSelectedType(type.id)}
                      >
                        <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-4">
                          <img
                            src={type.icon}
                            className="aspect-[1] object-contain w-12 shrink-0 rounded-lg"
                            alt={`${type.title} icon`}
                          />
                          <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch grow shrink-0 basis-0 w-fit text-left">
                            <div className={`${type.titleColor} text-xl font-bold leading-[1.4]`}>
                              {type.title}
                            </div>
                            <div className={`${type.descriptionColor} text-base leading-6 mt-[17px] max-md:mr-2.5`}>
                              {type.description}
                            </div>
                            <div className={`bg-[rgba(0,0,0,0)] text-sm ${type.listColor} mt-[25px]`}>
                              {type.items.map((item, index) => (
                                <div key={index} className="bg-[rgba(0,0,0,0)] flex flex-col pb-[7px] max-md:pr-5">
                                  <div className="z-10">{item}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <div className="bg-[rgba(0,0,0,0)] flex w-full flex-col items-center text-base text-white font-semibold text-center mt-8 px-[70px] max-md:max-w-full max-md:px-5">
              <button
                className={`flex w-[289px] max-w-full items-stretch gap-5 justify-between px-[46px] py-[9px] rounded-lg max-md:px-5 transition-all ${
                  selectedType ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'
                }`}
                disabled={!selectedType}
              >
                <div>Continue to Contact Details</div>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InquiryTypes;
