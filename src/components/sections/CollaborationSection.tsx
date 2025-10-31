import React from 'react';

export const CollaborationSection: React.FC = () => {
  const academicBenefits = [
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/d0d971e50dcbe31d9e76f8ec00b123649836c2b5?placeholderIfAbsent=true",
      text: "Co-investigator roles on NIH grants",
      color: "text-blue-800"
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/f69c4e3cd2caa8547a372f362db0590d6c321766?placeholderIfAbsent=true",
      text: "Shared datasets and research infrastructure",
      color: "text-green-800"
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/b92fb7b0699539aa5f31a5c09e0f1cb01cd30a29?placeholderIfAbsent=true",
      text: "Joint publication agreements",
      color: "text-purple-800"
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/1b31bba61626cf0c0a35ba21823180dadbefa037?placeholderIfAbsent=true",
      text: "Student exchange programs",
      color: "text-orange-800"
    }
  ];

  const industryBenefits = [
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/5cd71aa883c251b9c77f7b1d130deae763bf3b2d?placeholderIfAbsent=true",
      text: "Technology transfer opportunities",
      color: "text-green-800"
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/871afdb888ee003b71ada368f3d480f0570e716a?placeholderIfAbsent=true",
      text: "Prototype development support",
      color: "text-blue-800"
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/be689aae60b04766d7eb35f0c3ada823f514aadc?placeholderIfAbsent=true",
      text: "Market validation studies",
      color: "text-purple-800"
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/af83832534cb96723d97fe79ae91b3e4c25a2e2d?placeholderIfAbsent=true",
      text: "Joint commercialization pathways",
      color: "text-orange-800"
    }
  ];

  const researchAreas = [
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/2df87a1c13697c889710932f0ea711c46eb09038?placeholderIfAbsent=true",
      label: "SFCW Radar"
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/25e11c83499fb17ab289c07e52b9bcd0794b1cf8?placeholderIfAbsent=true",
      label: "WiFi CSI"
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/75f4bd79af35f6474a933f359b49a2fd1ce95828?placeholderIfAbsent=true",
      label: "Privacy Tech"
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/58ffa1aa51134ca20eb31e32195596e4a3c6afaf?placeholderIfAbsent=true",
      label: "ML/AI"
    }
  ];

  const industrySectors = [
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/1b7cb1a8a86d183018465a7564a41b14b3deb474?placeholderIfAbsent=true",
      label: "Healthcare Technology",
      status: "Active"
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/4f9e2ee4b3f19385047229f3816a3924cd794551?placeholderIfAbsent=true",
      label: "Semiconductor/RF",
      status: "Seeking"
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/273e20a2913bf286ddf5d44b89ed31f003b6e230?placeholderIfAbsent=true",
      label: "Smart Home/IoT",
      status: "Open"
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/f64c62648bcf2564fccb715bb30f8223503b6b28?placeholderIfAbsent=true",
      label: "Assisted Living",
      status: "Priority"
    }
  ];

  const advisoryBoard = [
    {
      image: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/4d4d06419dc68d387beea59a2dbf0270bab3ec03?placeholderIfAbsent=true",
      name: "Dr. Jennifer Walsh, MD",
      title: "Geriatric Medicine Specialist",
      titleColor: "text-purple-600",
      affiliation: "Former Director of Aging Research, OHSU",
      tags: ["Clinical Expertise", "Fall Prevention"]
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/50cb568a32213730c31551dae0299b6a1ec6e713?placeholderIfAbsent=true",
      name: "Prof. David Kim, PhD",
      title: "Privacy & Security Expert",
      titleColor: "text-blue-600",
      affiliation: "University of Washington, CSE",
      tags: ["Privacy Tech", "HIPAA Compliance"]
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/72c4009a1d620abc7b761f4494824c96f17d2409?placeholderIfAbsent=true",
      name: "Lisa Thompson",
      title: "Healthcare Technology Executive",
      titleColor: "text-green-600",
      affiliation: "Former VP, Philips Healthcare",
      tags: ["Commercialization", "Market Strategy"]
    }
  ];

  return (
    <section className="bg-gray-50 w-full py-16 lg:py-20 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center font-normal text-center pb-2 max-md:max-w-full">
          <div className="flex w-[793px] max-w-full flex-col items-stretch ml-3.5">
            <h2 className="text-gray-900 text-4xl leading-none self-center max-md:max-w-full">
              Research Collaboration Opportunities
            </h2>
            <p className="text-gray-600 text-xl leading-7 mt-[30px] max-md:max-w-full">
              Join our expanding network of academic and industry partners advancing the future of privacy-first healthcare technology
            </p>
          </div>
        </div>

        <div className="bg-[rgba(0,0,0,0)] mt-[59px] pt-[5px] pb-[45px] px-[25px] max-md:max-w-full max-md:mt-10 max-md:px-5">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <div className="w-6/12 max-md:w-full max-md:ml-0">
              <div className="bg-white shadow-[0px_8px_10px_rgba(0,0,0,0.1)] grow w-full pt-8 pb-28 px-8 rounded-3xl max-md:max-w-full max-md:mt-10 max-md:pb-[100px] max-md:px-5">
                <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center font-normal text-center pb-[9px] px-1.5 max-md:max-w-full">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/209e35b94600c67430c8de87062bfc8d2c30603d?placeholderIfAbsent=true"
                    className="aspect-[1] object-contain w-16 rounded-full"
                    alt=""
                  />
                  <h3 className="text-gray-900 text-3xl leading-[1.2] mt-4">
                    Academic Partnerships
                  </h3>
                  <p className="text-gray-600 text-base leading-6 self-stretch mt-[23px] max-md:max-w-full">
                    Collaborate with leading researchers in healthcare technology and privacy-preserving systems
                  </p>
                </div>
                <div className="bg-[rgba(0,0,0,0)] mt-8 max-md:max-w-full">
                  <div className="bg-blue-50 text-base p-6 rounded-lg max-md:max-w-full max-md:px-5">
                    <h4 className="bg-[rgba(0,0,0,0)] flex flex-col text-blue-900 font-semibold pb-2.5 max-md:max-w-full max-md:pr-5">
                      <div className="z-10">Available Collaboration Types</div>
                    </h4>
                    <div className="bg-[rgba(0,0,0,0)] w-full font-normal mt-3 max-md:max-w-full">
                      {academicBenefits.map((benefit, index) => (
                        <div key={index} className={`bg-[rgba(0,0,0,0)] flex items-stretch gap-3 ${benefit.color} ${index > 0 ? 'mt-3' : ''}`}>
                          <img
                            src={benefit.icon}
                            className="aspect-[0.83] object-contain w-5 shrink-0"
                            alt=""
                          />
                          <div className="grow shrink w-[428px] basis-auto max-md:max-w-full">
                            {benefit.text}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch text-gray-900 mt-6 max-md:max-w-full">
                    <h4 className="text-base font-semibold">Research Areas of Interest</h4>
                    <div className="bg-[rgba(0,0,0,0)] w-full text-sm font-medium text-center mt-7 max-md:max-w-full">
                      <div className="flex items-stretch gap-3 flex-wrap max-md:max-w-full">
                        {researchAreas.slice(0, 2).map((area, index) => (
                          <div key={index} className="bg-gray-50 flex flex-col items-stretch flex-1 grow shrink-0 basis-0 w-fit p-3 rounded-lg">
                            <img
                              src={area.icon}
                              className="aspect-[0.64] object-contain w-4 self-center"
                              alt=""
                            />
                            <div className="bg-[rgba(0,0,0,0)] pb-[11px] px-[70px] max-md:px-5">
                              <div className="z-10">{area.label}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-stretch gap-3 flex-wrap mt-3 max-md:max-w-full">
                        {researchAreas.slice(2, 4).map((area, index) => (
                          <div key={index} className="bg-gray-50 flex flex-col items-stretch flex-1 grow shrink-0 basis-0 w-fit p-3 rounded-lg">
                            <img
                              src={area.icon}
                              className="aspect-[0.64] object-contain w-4 self-center"
                              alt=""
                            />
                            <div className="bg-[rgba(0,0,0,0)] pb-2 px-[70px] max-md:px-5">
                              <div className="z-10">{area.label}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
              <div className="bg-white shadow-[0px_8px_10px_rgba(0,0,0,0.1)] grow w-full p-8 rounded-3xl max-md:max-w-full max-md:mt-10 max-md:px-5">
                <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center font-normal text-center pb-[9px] px-0.5 max-md:max-w-full">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/aef98c7c70e6a15a43fa46881bccc8a4bb8ec7a5?placeholderIfAbsent=true"
                    className="aspect-[1] object-contain w-16 rounded-full"
                    alt=""
                  />
                  <h3 className="text-gray-900 text-3xl leading-[1.2] mt-4">
                    Industry Partnerships
                  </h3>
                  <p className="text-gray-600 text-base leading-6 self-stretch mt-[23px] max-md:max-w-full">
                    Partner with technology companies and healthcare organizations to advance practical applications
                  </p>
                </div>
                <div className="bg-[rgba(0,0,0,0)] mt-8 max-md:max-w-full">
                  <div className="bg-green-50 text-base p-6 rounded-lg max-md:max-w-full max-md:px-5">
                    <h4 className="bg-[rgba(0,0,0,0)] flex flex-col text-green-900 font-semibold pb-2.5 max-md:max-w-full max-md:pr-5">
                      <div className="z-10">Partnership Benefits</div>
                    </h4>
                    <div className="bg-[rgba(0,0,0,0)] w-full font-normal mt-3 max-md:max-w-full">
                      {industryBenefits.map((benefit, index) => (
                        <div key={index} className={`bg-[rgba(0,0,0,0)] flex items-stretch gap-3 ${benefit.color} ${index > 0 ? 'mt-3' : ''}`}>
                          <img
                            src={benefit.icon}
                            className="aspect-[0.5] object-contain w-3 shrink-0"
                            alt=""
                          />
                          <div className="grow shrink w-[438px] basis-auto max-md:max-w-full">
                            {benefit.text}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch mt-6 max-md:max-w-full">
                    <h4 className="text-gray-900 text-base font-semibold">Target Industry Sectors</h4>
                    <div className="bg-[rgba(0,0,0,0)] w-full font-normal mt-[25px] max-md:max-w-full">
                      {industrySectors.map((sector, index) => (
                        <div key={index} className={`bg-gray-50 flex w-full items-stretch gap-5 flex-wrap justify-between px-[11px] py-3 rounded-lg max-md:max-w-full ${index > 0 ? 'mt-3' : ''}`}>
                          <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-3 text-base text-gray-700">
                            <img
                              src={sector.icon}
                              className="aspect-[0.83] object-contain w-5 shrink-0"
                              alt=""
                            />
                            <div className="basis-auto">{sector.label}</div>
                          </div>
                          <div className="bg-[rgba(0,0,0,0)] text-sm text-gray-500 whitespace-nowrap my-auto pb-2.5 px-px">
                            <div className="z-10">{sector.status}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-[0px_8px_10px_rgba(0,0,0,0.1)] mt-[19px] p-8 rounded-3xl max-md:max-w-full max-md:px-5">
          <div className="flex flex-col items-center font-normal text-center pb-[9px] max-md:max-w-full">
            <div className="flex w-[596px] max-w-full flex-col items-stretch">
              <h3 className="text-gray-900 text-3xl leading-[1.2] self-center">
                Advisory Board
              </h3>
              <p className="text-gray-600 text-base leading-6 mt-[23px] max-md:max-w-full">
                Distinguished experts providing strategic guidance in technology development, commercialization, and regulatory compliance
              </p>
            </div>
          </div>
          <div className="bg-[rgba(0,0,0,0)] mt-[43px] max-md:max-w-full max-md:mt-10">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
              {advisoryBoard.map((member, index) => (
                <div key={index} className="w-[33%] max-md:w-full max-md:ml-0">
                  <div className="bg-[rgba(0,0,0,0)] flex w-full flex-col items-center text-center mx-auto py-[3px] max-md:mt-8">
                    <img
                      src={member.image}
                      className="aspect-[1] object-contain w-24 shadow-[0px_4px_6px_rgba(0,0,0,0.1)] rounded-full"
                      alt={member.name}
                    />
                    <h4 className="text-gray-900 text-xl font-bold leading-[1.4] mt-4">
                      {member.name}
                    </h4>
                    <div className={`text-base font-semibold mt-[17px] ${member.titleColor}`}>
                      {member.title}
                    </div>
                    <div className="text-gray-600 text-sm font-normal leading-none mt-[17px]">
                      {member.affiliation}
                    </div>
                    <div className="bg-[rgba(0,0,0,0)] self-stretch flex items-stretch gap-2 text-xs font-medium mt-[22px] px-[73px] max-md:px-5">
                      {member.tags.map((tag, tagIndex) => (
                        <div key={tagIndex} className="bg-red-100 flex flex-col text-red-800 justify-center px-[31px] py-0.5 rounded-full max-md:px-5">
                          <div>{tag}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[rgba(0,0,0,0)] flex w-full flex-col items-center text-base text-white font-semibold text-center mt-6 px-[70px] max-md:max-w-full max-md:px-5">
            <button className="bg-purple-600 flex w-[274px] max-w-full items-stretch gap-5 justify-between px-[35px] py-[9px] rounded-lg max-md:px-5 hover:bg-purple-700 transition-colors">
              <img
                src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/fd30a1cbd10adf9ab91accdde6167022eb64ebb6?placeholderIfAbsent=true"
                className="aspect-[0.8] object-contain w-5 shrink-0"
                alt=""
              />
              <span>Join Our Advisory Board</span>
            </button>
          </div>
        </div>

        <div className="text-center mt-16 max-md:max-w-full max-md:mt-10">
          <div className="flex flex-col items-center p-12 rounded-3xl max-md:max-w-full max-md:px-5">
            <h3 className="text-gray-900 text-3xl font-bold leading-[1.2]">
              Ready to Collaborate?
            </h3>
            <p className="text-gray-600 text-xl font-normal leading-7 mt-8 max-md:max-w-full">
              Join our mission to advance privacy-first healthcare technology through collaborative research and innovation
            </p>
            <div className="bg-[rgba(0,0,0,0)] self-stretch flex w-full flex-col items-center text-base text-white font-semibold mt-[45px] px-[70px] max-md:max-w-full max-md:mt-10 max-md:px-5">
              <div className="flex w-[880px] max-w-full items-stretch gap-4 flex-wrap">
                <button className="bg-blue-600 flex gap-[21px] px-8 py-[18px] rounded-lg max-md:px-5 hover:bg-blue-700 transition-colors">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/49e2671e4bcbf1db9b9c0759e8eb69a7b7d1c876?placeholderIfAbsent=true"
                    className="aspect-[0.83] object-contain w-5 shrink-0"
                    alt=""
                  />
                  <span className="basis-auto">Start a Collaboration</span>
                </button>
                <button className="bg-white border-green-600 flex gap-[21px] text-green-600 px-[34px] py-[18px] rounded-lg border-solid border-2 max-md:px-5 hover:bg-green-50 transition-colors">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/52343b8fcfb8cf2ce99aa9a515e1c3aaf7228d1d?placeholderIfAbsent=true"
                    className="aspect-[0.58] object-contain w-3.5 shrink-0"
                    alt=""
                  />
                  <span className="basis-auto">Schedule Research Discussion</span>
                </button>
                <button className="bg-purple-600 flex gap-5 px-8 py-[18px] rounded-lg max-md:px-5 hover:bg-purple-700 transition-colors">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/cc3464e9b172acee23ee4459c2d510612d70b1d5?placeholderIfAbsent=true"
                    className="aspect-[0.67] object-contain w-4 shrink-0"
                    alt=""
                  />
                  <span className="basis-auto">Download Research Portfolio</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
