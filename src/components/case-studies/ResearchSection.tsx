import React from 'react';

interface ResearchPaper {
  id: string;
  title: string;
  journal: string;
  description: string;
  type: string;
  typeColor: string;
  citations: number;
  downloads: string;
  icon: string;
  buttonColor: string;
}

const ResearchSection = () => {
  const papers: ResearchPaper[] = [
    {
      id: '1',
      title: 'WiFi-Based Fall Detection in Memory Care: A 24-Month Longitudinal Study',
      journal: 'Journal of Geriatric Technology & Innovation • Volume 15, Issue 3 • March 2024',
      description: 'Comprehensive analysis of 1,240 residents across 18 memory care facilities demonstrating 91.3% accuracy in fall detection with zero privacy violations over 24 months of continuous monitoring.',
      type: 'Peer Reviewed',
      typeColor: 'bg-sky-100 text-sky-800',
      citations: 47,
      downloads: '2.3k',
      icon: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/733fe2893081834579c9087108c2a66885342e55?placeholderIfAbsent=true',
      buttonColor: 'text-sky-600'
    },
    {
      id: '2',
      title: 'Privacy-Preserving Vital Signs Monitoring: Clinical Validation Study',
      journal: 'Healthcare Technology Research Quarterly • Volume 8, Issue 2 • June 2024',
      description: 'Multi-center randomized controlled trial (n=892) validating continuous vital signs monitoring accuracy against gold-standard medical devices with 97.8% correlation and full HIPAA compliance.',
      type: 'Clinical Trial',
      typeColor: 'bg-green-100 text-green-800',
      citations: 63,
      downloads: '3.1k',
      icon: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/b052c90696b6c454b4738e9491bb533974e54c79?placeholderIfAbsent=true',
      buttonColor: 'text-green-600'
    },
    {
      id: '3',
      title: 'AI-Driven Behavioral Pattern Recognition in Dementia Care: Systematic Review',
      journal: 'International Journal of Dementia Care Technology • Volume 12, Issue 1 • January 2024',
      description: 'Systematic review and meta-analysis of 23 studies examining AI applications in dementia care, highlighting superior outcomes with privacy-first monitoring approaches.',
      type: 'Meta-Analysis',
      typeColor: 'bg-purple-100 text-purple-800',
      citations: 89,
      downloads: '4.7k',
      icon: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/b4bd4bd7630b6de46abe79957bdd197b63184333?placeholderIfAbsent=true',
      buttonColor: 'text-purple-600'
    },
    {
      id: '4',
      title: 'Privacy-First Healthcare Monitoring: Regulatory Compliance & Best Practices',
      journal: 'Healthcare Privacy & Security Review • Volume 19, Issue 4 • September 2024',
      description: 'Comprehensive analysis of privacy regulations (HIPAA, PIPEDA, GDPR) in healthcare monitoring, establishing framework for compliant technology implementation.',
      type: 'White Paper',
      typeColor: 'bg-orange-100 text-orange-800',
      citations: 156,
      downloads: '8.9k',
      icon: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/af578950a3db446eae803610a5e177f399e4a516?placeholderIfAbsent=true',
      buttonColor: 'text-orange-600'
    }
  ];

  return (
    <section className="bg-white w-full py-16 lg:py-20 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center text-center pb-2 px-20 max-md:max-w-full max-md:px-5">
          <div className="w-[699px] max-w-full">
            <h2 className="text-gray-900 text-4xl font-bold leading-none mx-[17px] max-md:max-w-full max-md:mr-2.5">
              Peer-Reviewed Research & Publications
            </h2>
            <p className="text-gray-600 text-xl font-normal leading-7 mt-[27px] max-md:max-w-full">
              Our technology's efficacy is validated through rigorous clinical studies and published research in leading healthcare journals
            </p>
          </div>
        </div>
        <div className="bg-[rgba(0,0,0,0)] self-center w-full max-w-screen-lg mt-12 max-md:max-w-full max-md:mt-10">
          <div className="bg-[rgba(0,0,0,0)] w-full max-md:max-w-full">
            <div className="max-md:max-w-full">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                {papers.slice(0, 2).map((paper) => (
                  <div key={paper.id} className="w-6/12 max-md:w-full max-md:ml-0">
                    <div className="border-sky-100 border w-full p-[33px] rounded-xl border-solid max-md:max-w-full max-md:mt-8 max-md:px-5">
                      <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-5 text-xs font-medium text-center justify-between max-md:max-w-full">
                        <img
                          src={paper.icon}
                          className="aspect-[1] object-contain w-12 shrink-0 rounded-lg"
                          alt={paper.type}
                        />
                        <span className={`pt-1 pb-[11px] px-[13px] rounded-full ${paper.typeColor}`}>
                          <div>{paper.type}</div>
                        </span>
                      </div>
                      <h3 className="text-gray-900 text-xl font-bold leading-7 mt-4 max-md:mr-2.5">
                        {paper.title}
                      </h3>
                      <p className="text-gray-600 text-sm font-normal leading-5 mt-[21px] max-md:mr-2.5">
                        {paper.journal}
                      </p>
                      <p className="text-gray-700 text-base font-normal leading-6 mt-[25px] max-md:mr-2.5">
                        {paper.description}
                      </p>
                      <div className="bg-[rgba(0,0,0,0)] flex w-full items-stretch gap-5 justify-between mt-8 max-md:max-w-full">
                        <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-[17px] my-auto px-px py-0.5">
                          <div className="flex items-stretch gap-1">
                            <div className="flex min-h-3.5 items-center overflow-hidden justify-center">
                              <img
                                src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/2521807cee5630b0293160bd795e409dbfe34534?placeholderIfAbsent=true"
                                className="aspect-[1] object-contain w-3.5 self-stretch my-auto"
                                alt="Citations"
                              />
                            </div>
                            <div className="text-gray-500 text-sm font-normal leading-none">
                              {paper.citations} citations
                            </div>
                          </div>
                          <div className="flex items-stretch gap-1">
                            <div className="flex min-h-3.5 items-center overflow-hidden justify-center">
                              <img
                                src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/d1004b160ad5c817232c6fdc65cb803c848835df?placeholderIfAbsent=true"
                                className="aspect-[1] object-contain w-3.5 self-stretch my-auto"
                                alt="Downloads"
                              />
                            </div>
                            <div className="text-gray-500 text-sm font-normal leading-none basis-auto">
                              {paper.downloads} downloads
                            </div>
                          </div>
                        </div>
                        <button className={`bg-[rgba(0,0,0,0)] flex items-stretch gap-2 text-base font-medium ${paper.buttonColor}`}>
                          <img
                            src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/5ef3ba9ee18bd4674db5ec3dc353bfaf4aea722d?placeholderIfAbsent=true"
                            className="aspect-[0.67] object-contain w-4 shrink-0"
                            alt="Read"
                          />
                          <div>Read Paper</div>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 max-md:max-w-full">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                {papers.slice(2, 4).map((paper) => (
                  <div key={paper.id} className="w-6/12 max-md:w-full max-md:ml-0">
                    <div className="border-purple-100 border w-full p-[33px] rounded-xl border-solid max-md:max-w-full max-md:mt-8 max-md:px-5">
                      <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-5 text-xs font-medium whitespace-nowrap text-center justify-between max-md:max-w-full">
                        <img
                          src={paper.icon}
                          className="aspect-[1] object-contain w-12 shrink-0 rounded-lg"
                          alt={paper.type}
                        />
                        <span className={`flex flex-col items-stretch justify-center px-[13px] py-1.5 rounded-full ${paper.typeColor}`}>
                          <div>{paper.type}</div>
                        </span>
                      </div>
                      <h3 className="text-gray-900 text-xl font-bold leading-7 mr-[21px] mt-4 max-md:mr-2.5">
                        {paper.title}
                      </h3>
                      <p className="text-gray-600 text-sm font-normal leading-5 mt-[21px] max-md:mr-2.5">
                        {paper.journal}
                      </p>
                      <p className="text-gray-700 text-base font-normal leading-6 mt-[22px] max-md:mr-2.5">
                        {paper.description}
                      </p>
                      <div className="bg-[rgba(0,0,0,0)] flex w-full items-stretch gap-5 justify-between mt-[33px] max-md:max-w-full">
                        <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-[17px] my-auto px-px py-0.5">
                          <div className="flex items-stretch gap-1">
                            <div className="flex min-h-3.5 items-center overflow-hidden justify-center">
                              <img
                                src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/27549d267fad5994b0581409aa0f273d3abb5313?placeholderIfAbsent=true"
                                className="aspect-[1] object-contain w-3.5 self-stretch my-auto"
                                alt="Citations"
                              />
                            </div>
                            <div className="text-gray-500 text-sm font-normal leading-none">
                              {paper.citations} citations
                            </div>
                          </div>
                          <div className="flex items-stretch gap-1">
                            <div className="flex min-h-3.5 items-center overflow-hidden justify-center">
                              <img
                                src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/b0df051096c8c4865706fb772e81ce0df08f9db2?placeholderIfAbsent=true"
                                className="aspect-[1] object-contain w-3.5 self-stretch my-auto"
                                alt="Downloads"
                              />
                            </div>
                            <div className="text-gray-500 text-sm font-normal leading-none basis-auto">
                              {paper.downloads} downloads
                            </div>
                          </div>
                        </div>
                        <button className={`bg-[rgba(0,0,0,0)] flex items-stretch gap-2 text-base font-medium ${paper.buttonColor}`}>
                          <img
                            src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/9fb89dcf09d26bcac731e0c145b015181ab28826?placeholderIfAbsent=true"
                            className="aspect-[0.67] object-contain w-4 shrink-0"
                            alt="Read"
                          />
                          <div>Read Paper</div>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-[rgba(0,0,0,0)] flex w-full flex-col items-center text-base text-white font-medium text-center mt-12 px-[70px] max-md:max-w-full max-md:mt-10 max-md:px-5">
            <button className="bg-gray-900 flex w-[340px] max-w-full items-stretch gap-[27px] px-8 py-3 rounded-lg max-md:px-5">
              <img
                src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/482ce83d59f91d16a57d9c774763881906736410?placeholderIfAbsent=true"
                className="aspect-[0.75] object-contain w-[18px] shrink-0"
                alt="View"
              />
              <div className="grow shrink w-[227px]">View Complete Research Library</div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
