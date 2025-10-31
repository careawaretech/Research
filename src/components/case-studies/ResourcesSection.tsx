import React from 'react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: string;
  typeColor: string;
  size: string;
  pages: string;
  buttonColor: string;
  icon: string;
  actionType: 'download' | 'watch';
}

const ResourcesSection = () => {
  const resources: Resource[] = [
    {
      id: '1',
      title: 'Complete Case Study Portfolio',
      description: 'Comprehensive collection of all 84 case studies with detailed outcomes, metrics, and implementation insights.',
      type: 'PDF • 2.3MB',
      typeColor: 'bg-sky-100 text-sky-800',
      size: '2.3MB',
      pages: '127 pages • Updated Dec 2024',
      buttonColor: 'text-sky-600',
      icon: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/109ba568a3802a401e98e4898464d46da082972e?placeholderIfAbsent=true',
      actionType: 'download'
    },
    {
      id: '2',
      title: 'ROI Calculator & Analysis',
      description: 'Interactive calculator and detailed financial analysis showing cost savings and efficiency improvements.',
      type: 'PDF • 1.8MB',
      typeColor: 'bg-green-100 text-green-800',
      size: '1.8MB',
      pages: '45 pages • Updated Nov 2024',
      buttonColor: 'text-green-600',
      icon: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/a065f7a54f099afb84157d34bb8774f725089859?placeholderIfAbsent=true',
      actionType: 'download'
    },
    {
      id: '3',
      title: 'Implementation Guide',
      description: 'Step-by-step implementation guide with timelines, staff training materials, and best practices.',
      type: 'PDF • 3.1MB',
      typeColor: 'bg-purple-100 text-purple-800',
      size: '3.1MB',
      pages: '89 pages • Updated Dec 2024',
      buttonColor: 'text-purple-600',
      icon: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/182c65d22ad8d0bb0bcccec7bffa1e8dde4717c4?placeholderIfAbsent=true',
      actionType: 'download'
    },
    {
      id: '4',
      title: 'Privacy & Compliance Guide',
      description: 'Comprehensive guide to HIPAA, PIPEDA, and GDPR compliance with privacy-first monitoring technology.',
      type: 'PDF • 1.2MB',
      typeColor: 'bg-orange-100 text-orange-800',
      size: '1.2MB',
      pages: '32 pages • Updated Oct 2024',
      buttonColor: 'text-orange-600',
      icon: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/36aaef55b14fc607d68d63d4ed5019db3a2294f6?placeholderIfAbsent=true',
      actionType: 'download'
    },
    {
      id: '5',
      title: 'Technology Demo Video',
      description: 'Complete technology demonstration showing real-world implementation and user interface walkthrough.',
      type: 'MP4 • 45min',
      typeColor: 'bg-teal-100 text-teal-800',
      size: '45min',
      pages: 'HD Video • Nov 2024',
      buttonColor: 'text-teal-600',
      icon: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/d7610107066b29e4dfa8440a0a46a681ef4f36ec?placeholderIfAbsent=true',
      actionType: 'watch'
    },
    {
      id: '6',
      title: 'Quick Start Checklist',
      description: 'Essential checklist for healthcare administrators considering fall detection and monitoring technology.',
      type: 'PDF • 0.8MB',
      typeColor: 'bg-indigo-100 text-indigo-800',
      size: '0.8MB',
      pages: '12 pages • Updated Dec 2024',
      buttonColor: 'text-indigo-600',
      icon: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/986f4bc52f56dcf5ba020ff2542ca769f44fa43f?placeholderIfAbsent=true',
      actionType: 'download'
    }
  ];

  return (
    <section className="bg-white w-full py-16 lg:py-20 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center text-center pb-[9px] px-20 max-md:max-w-full max-md:px-5">
          <div className="flex w-[751px] max-w-full flex-col items-stretch">
            <h2 className="text-gray-900 text-4xl font-bold leading-none self-center">
              Resources & Downloads
            </h2>
            <p className="text-gray-600 text-xl font-normal leading-7 mt-[27px] max-md:max-w-full">
              Access comprehensive documentation, case study reports, and implementation guides to support your decision-making process
            </p>
          </div>
        </div>
        <div className="bg-[rgba(0,0,0,0)] mt-12 mx-10 max-md:max-w-full max-md:mr-2.5 max-md:mt-10">
          <div className="bg-[rgba(0,0,0,0)] w-full max-md:max-w-full">
            <div className="max-md:max-w-full">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                {resources.slice(0, 3).map((resource) => (
                  <div key={resource.id} className="w-[33%] max-md:w-full max-md:ml-0">
                    <div className="border-sky-100 border flex w-full flex-col items-stretch p-[25px] rounded-xl border-solid max-md:mt-8 max-md:px-5">
                      <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-5 text-xs font-medium text-center justify-between">
                        <img
                          src={resource.icon}
                          className="aspect-[1] object-contain w-12 shrink-0 rounded-lg"
                          alt={resource.title}
                        />
                        <span className={`my-auto pt-1 pb-[11px] px-3.5 rounded-full ${resource.typeColor}`}>
                          <div>{resource.type}</div>
                        </span>
                      </div>
                      <h3 className="text-gray-900 text-lg font-bold leading-loose mt-4">
                        {resource.title}
                      </h3>
                      <p className="text-gray-600 text-sm font-normal leading-5 mt-[23px] max-md:mr-2.5">
                        {resource.description}
                      </p>
                      <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-[34px] mt-[22px]">
                        <div className="text-gray-500 text-xs font-normal leading-none grow shrink w-[158px]">
                          {resource.pages}
                        </div>
                        <button className={`bg-[rgba(0,0,0,0)] flex items-stretch gap-2 text-base font-medium whitespace-nowrap ${resource.buttonColor}`}>
                          <img
                            src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/726651e6da685065ec673cd7d6387d7a36956b2f?placeholderIfAbsent=true"
                            className="aspect-[0.67] object-contain w-4 shrink-0"
                            alt={resource.actionType}
                          />
                          <div>{resource.actionType === 'download' ? 'Download' : 'Watch'}</div>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 max-md:max-w-full">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                {resources.slice(3, 6).map((resource) => (
                  <div key={resource.id} className="w-[33%] max-md:w-full max-md:ml-0">
                    <div className="border-orange-100 border flex w-full flex-col items-stretch p-[25px] rounded-xl border-solid max-md:mt-8 max-md:px-5">
                      <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-5 text-xs font-medium text-center justify-between">
                        <img
                          src={resource.icon}
                          className="aspect-[1] object-contain w-12 shrink-0 rounded-lg"
                          alt={resource.title}
                        />
                        <span className={`my-auto pt-1 pb-[11px] px-[13px] rounded-full ${resource.typeColor}`}>
                          <div>{resource.type}</div>
                        </span>
                      </div>
                      <h3 className="text-gray-900 text-lg font-bold leading-loose mt-4">
                        {resource.title}
                      </h3>
                      <p className="text-gray-600 text-sm font-normal leading-5 mt-[23px] max-md:mr-2.5">
                        {resource.description}
                      </p>
                      <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-[40px_42px] mt-[22px]">
                        <div className="text-gray-500 text-xs font-normal leading-none grow shrink w-[150px]">
                          {resource.pages}
                        </div>
                        <button className={`bg-[rgba(0,0,0,0)] flex items-stretch gap-2 text-base font-medium whitespace-nowrap ${resource.buttonColor}`}>
                          <img
                            src={resource.actionType === 'watch' 
                              ? "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/304563c1834895dc8a4335b05434907d043131a0?placeholderIfAbsent=true"
                              : "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/015e0714f8795f3ff890d3e5437438c2c6165e8c?placeholderIfAbsent=true"
                            }
                            className={resource.actionType === 'watch' ? "aspect-[0.5] object-contain w-3 shrink-0" : "aspect-[0.67] object-contain w-4 shrink-0"}
                            alt={resource.actionType}
                          />
                          <div>{resource.actionType === 'download' ? 'Download' : 'Watch'}</div>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-[rgba(0,0,0,0)] text-base text-center mt-12 max-md:max-w-full max-md:mt-10">
            <div className="flex flex-col items-center justify-center px-20 py-8 rounded-xl max-md:max-w-full max-md:px-5">
              <div className="flex w-[591px] max-w-full flex-col items-center">
                <h3 className="text-gray-900 text-2xl font-bold leading-none">
                  Need Additional Resources?
                </h3>
                <p className="text-gray-600 font-normal leading-6 self-stretch mt-[29px] max-md:max-w-full">
                  Our team can provide custom reports, facility-specific analyses, and additional documentation to support your evaluation process.
                </p>
                <button className="bg-gray-900 flex w-[298px] max-w-full items-stretch gap-[27px] text-white font-medium mt-[33px] px-8 py-3 rounded-lg max-md:px-5">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/88c8ebe6be893c9cc35d0ab62075f19b6aedf127?placeholderIfAbsent=true"
                    className="aspect-[0.67] object-contain w-4 shrink-0"
                    alt="Request"
                  />
                  <div className="grow shrink w-[188px]">Request Custom Resources</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
