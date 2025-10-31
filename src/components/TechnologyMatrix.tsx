import React from 'react';

const TechnologyMatrix = () => {
  const technologies = [
    {
      name: "Camera AI Systems",
      subtitle: "(SafelyYou, CarePredict Vision)",
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/cb70a667aaecfe9d5728d5501f1cb094b1c91e0d?placeholderIfAbsent=true",
      capturesImages: { status: "YES - Visual Data", color: "red" },
      bathroomSafe: { status: "NO - Legal Prohibition", color: "red" },
      wearableRequired: { status: "NO", color: "green" },
      userCompliance: { status: "N/A", color: "gray" },
      installation: "Moderate",
      privacyScore: "2/10",
      scoreColor: "red"
    },
    {
      name: "Wearable Pendants",
      subtitle: "(Life Alert, Medical Guardian)",
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/3cdd6ca0204a491458b15b066398cadf0af63efd?placeholderIfAbsent=true",
      capturesImages: { status: "NO", color: "green" },
      bathroomSafe: { status: "YES", color: "green", icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/c19d054a4ecc7664b58fa1a414e6119563c41d2e?placeholderIfAbsent=true" },
      wearableRequired: { status: "YES - Required", color: "red" },
      userCompliance: { status: "50%+ Non-Compliance", color: "red" },
      installation: "Low",
      privacyScore: "6/10",
      scoreColor: "yellow"
    },
    {
      name: "Care Aware Radar",
      subtitle: "(SFCW Radar Technology)",
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/8b130d94d3093906d98410175dbd53cd51bc7fb2?placeholderIfAbsent=true",
      capturesImages: { status: "IMPOSSIBLE", color: "green" },
      bathroomSafe: { status: "YES - Privacy Safe", color: "green" },
      wearableRequired: { status: "NO", color: "green" },
      userCompliance: { status: "100% Passive", color: "green" },
      installation: "Moderate",
      privacyScore: "10/10",
      scoreColor: "green",
      highlighted: true
    },
    {
      name: "Care Aware WiFi",
      subtitle: "(WiFi Signal Analysis)",
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/d8284b6ad4e36a60186415c43774c9b8de3f5487?placeholderIfAbsent=true",
      capturesImages: { status: "IMPOSSIBLE", color: "green" },
      bathroomSafe: { status: "YES - Privacy Safe", color: "green" },
      wearableRequired: { status: "NO", color: "green" },
      userCompliance: { status: "100% Passive", color: "green" },
      installation: "Very Low",
      privacyScore: "10/10",
      scoreColor: "green",
      highlighted: true
    }
  ];

  const getStatusBadge = (item: any) => {
    const colorClasses = {
      red: "bg-red-100 text-red-800",
      green: "bg-green-100 text-green-800",
      gray: "bg-gray-100 text-gray-800"
    };

    return (
      <div className={`flex gap-5 justify-between pt-[7px] pb-[18px] px-[13px] rounded-full ${colorClasses[item.color as keyof typeof colorClasses]}`}>
        {item.icon && (
          <img
            src={item.icon}
            className="aspect-[0.55] object-contain w-[11px] shrink-0 mt-[11px]"
            alt="Status icon"
          />
        )}
        <div className="flex flex-col items-stretch">
          <div>{item.status.split(' - ')[0]}</div>
          {item.status.includes(' - ') && (
            <div className="mt-[9px]">{item.status.split(' - ')[1]}</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="w-full py-16 lg:py-20 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center font-normal text-center mx-[15px] pb-[13px] px-20 max-md:max-w-full max-md:mr-2.5 max-md:px-5">
          <div className="flex w-[805px] max-w-full flex-col items-stretch ml-[21px]">
            <h2 className="text-gray-900 text-5xl leading-none ml-8 max-md:max-w-full max-md:text-[40px]">
              Technology Comparison Matrix
            </h2>
            <p className="text-gray-600 text-xl leading-7 mt-[34px] max-md:max-w-full">
              See how Care Aware Tech's privacy-first approach compares to existing fall detection solutions
            </p>
          </div>
        </div>

        <div className="bg-white shadow-[0px_25px_50px_rgba(0,0,0,0.25)] overflow-hidden mt-16 mx-[15px] rounded-3xl max-md:max-w-full max-md:mr-2.5 max-md:mt-10">
          <div className="flex flex-col items-center text-3xl text-white font-bold text-center leading-[1.2] justify-center px-[70px] py-[27px] max-md:max-w-full max-md:px-5 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="max-md:max-w-full">
              Comprehensive Technology Analysis
            </div>
          </div>

          <div className="bg-[rgba(0,0,0,0)] overflow-hidden max-md:max-w-full">
            <table className="bg-[rgba(0,0,0,0)] w-full max-md:max-w-full">
              <thead className="bg-gray-100 border w-full text-base text-gray-900 font-bold text-center border-b-2 max-md:max-w-full">
                <tr className="bg-[rgba(0,0,0,0)] flex items-stretch flex-wrap max-md:max-w-full">
                  <th className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch text-lg justify-center px-[29px] py-10 max-md:px-5">
                    <div>Technology Solution</div>
                  </th>
                  <th className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch justify-center px-7 py-[41px] max-md:px-5">
                    <div>Captures Images?</div>
                  </th>
                  <th className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch justify-center px-[33px] py-[43px] max-md:px-5">
                    <div>Bathroom Safe?</div>
                  </th>
                  <th className="bg-[rgba(0,0,0,0)] flex flex-col items-center whitespace-nowrap px-[33px] py-[29px] max-md:px-5">
                    <div>Wearable</div>
                    <div className="mt-3">Required?</div>
                  </th>
                  <th className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch justify-center px-[22px] py-[41px] max-md:pl-5">
                    <div>User Compliance?</div>
                  </th>
                  <th className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch whitespace-nowrap justify-center px-[21px] py-[43px] max-md:pl-5">
                    <div>Installation</div>
                  </th>
                  <th className="bg-[rgba(0,0,0,0)] flex flex-col items-center whitespace-nowrap pt-[23px] pb-[38px] px-6 max-md:px-5">
                    <div>Privacy</div>
                    <div className="mt-2">Score</div>
                  </th>
                </tr>
              </thead>
              
              <tbody className="bg-[rgba(0,0,0,0)] w-full max-md:max-w-full">
                {technologies.map((tech, index) => (
                  <tr key={index} className={`bg-[rgba(0,0,0,0)] flex items-stretch flex-wrap max-md:max-w-full ${tech.highlighted ? 'bg-green-50' : ''}`}>
                    <td className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch justify-center px-8 py-[25px] max-md:px-5">
                      <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-4">
                        <img
                          src={tech.icon}
                          className="aspect-[0.65] object-contain w-[31px] shrink-0 my-auto rounded-lg"
                          alt={`${tech.name} icon`}
                        />
                        <div className="bg-[rgba(0,0,0,0)]">
                          <div className={`bg-[rgba(0,0,0,0)] flex flex-col text-lg font-bold pr-[25px] pb-3 max-md:pr-5 ${tech.highlighted ? 'text-blue-900' : 'text-gray-900'}`}>
                            <div className="z-10">{tech.name.split(' ')[0]} {tech.name.split(' ')[1]}</div>
                            <div className="mt-[15px]">{tech.name.split(' ').slice(2).join(' ')}</div>
                          </div>
                          <div className={`bg-[rgba(0,0,0,0)] flex flex-col items-stretch text-sm font-normal pb-2 ${tech.highlighted ? 'text-blue-600' : 'text-gray-600'}`}>
                            <div className="z-10">{tech.subtitle.split(',')[0]}</div>
                            {tech.subtitle.includes(',') && (
                              <div className="mt-1.5">{tech.subtitle.split(',')[1]}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch text-sm font-bold text-center justify-center px-6 py-[45px] max-md:px-5">
                      {getStatusBadge(tech.capturesImages)}
                    </td>
                    
                    <td className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch text-sm font-bold text-center justify-center px-6 py-[45px] max-md:px-5">
                      {tech.bathroomSafe.icon ? (
                        <img
                          src={tech.bathroomSafe.icon}
                          className="aspect-[2.22] object-contain w-20 rounded-full"
                          alt="Bathroom safe indicator"
                        />
                      ) : (
                        getStatusBadge(tech.bathroomSafe)
                      )}
                    </td>
                    
                    <td className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch text-sm font-bold text-center justify-center px-6 py-[45px] max-md:px-5">
                      {getStatusBadge(tech.wearableRequired)}
                    </td>
                    
                    <td className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch text-sm font-bold text-center justify-center px-6 py-[45px] max-md:px-5">
                      {getStatusBadge(tech.userCompliance)}
                    </td>
                    
                    <td className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch text-base font-semibold whitespace-nowrap text-center justify-center px-[27px] py-[67px] max-md:px-5">
                      <div className={tech.installation === 'Low' ? 'text-green-600' : tech.installation === 'Very Low' ? 'text-green-600' : 'text-orange-600'}>
                        {tech.installation}
                      </div>
                    </td>
                    
                    <td className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch text-2xl font-bold whitespace-nowrap text-center justify-center px-6 py-[41px] max-md:px-5">
                      <div className={`flex flex-col items-center justify-center w-16 h-16 px-[9px] rounded-full ${
                        tech.scoreColor === 'green' ? 'bg-green-100 text-green-600' + (tech.highlighted ? ' shadow-[0px_0px_30px_rgba(76,175,80,0.3)]' : '') :
                        tech.scoreColor === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        <div className="bg-[rgba(0,0,0,0)] pb-[15px] px-px">
                          <div className="z-10 -mt-1">{tech.privacyScore}</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[rgba(0,0,0,0)] mt-[59px] pt-[5px] pb-[25px] px-[15px] max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <article className="w-[33%] max-md:w-full max-md:ml-0">
              <div className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] grow w-full pt-[27px] pb-[92px] px-8 rounded-2xl max-md:mt-[37px] max-md:px-5">
                <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch text-2xl text-gray-900 font-bold text-center leading-none pb-[9px] px-[45px] max-md:px-5">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/5416f504bdd8accb14e53ee576db2736e3583d75?placeholderIfAbsent=true"
                    className="aspect-[0.79] object-contain w-[45px] self-center"
                    alt="Bathroom coverage icon"
                  />
                  <div>Bathroom Coverage</div>
                </div>
                <div className="bg-[rgba(0,0,0,0)] w-full text-base font-medium mt-6 pb-1.5">
                  <div className="bg-red-50 flex items-stretch gap-5 text-red-800 justify-between p-3 rounded-lg">
                    <div className="bg-[rgba(0,0,0,0)] my-auto pb-2.5 px-px">
                      <div className="z-10">Camera Systems</div>
                    </div>
                    <img
                      src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/9c962fc1809118d0cab9e03b363851c4275fca26?placeholderIfAbsent=true"
                      className="aspect-[0.71] object-contain w-5 shrink-0"
                      alt="Not allowed"
                    />
                  </div>
                  <div className="bg-green-50 flex items-stretch gap-5 text-green-800 justify-between mt-4 p-3 rounded-lg">
                    <div className="bg-[rgba(0,0,0,0)] my-auto pb-[13px] px-px">
                      <div className="z-10">Care Aware Tech</div>
                    </div>
                    <img
                      src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/667a89f29ff2194ca79f2b29af929084f0578fad?placeholderIfAbsent=true"
                      className="aspect-[0.71] object-contain w-5 shrink-0"
                      alt="Allowed"
                    />
                  </div>
                  <p className="text-gray-600 text-sm font-normal leading-5 mt-4 max-md:mr-2.5">
                    80% of elderly falls occur in bathrooms where camera systems cannot legally operate due to privacy laws.
                  </p>
                </div>
              </div>
            </article>

            <article className="w-[33%] ml-5 max-md:w-full max-md:ml-0">
              <div className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] grow text-center w-full px-8 py-[30px] rounded-2xl max-md:mt-[37px] max-md:px-5">
                <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch text-2xl text-gray-900 font-bold leading-none pb-[9px] px-[49px] max-md:px-5">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/1ec9a873b44959ee86652791d503da3bbce86d79?placeholderIfAbsent=true"
                    className="aspect-[0.79] object-contain w-[45px] self-center"
                    alt="Family acceptance icon"
                  />
                  <div>Family Acceptance</div>
                </div>
                <div className="bg-[rgba(0,0,0,0)] mt-6">
                  <div className="bg-green-50 text-green-600 p-4 rounded-lg">
                    <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center text-3xl font-bold whitespace-nowrap pb-[19px] px-[70px] max-md:px-5">
                      <div className="z-10 -mt-1.5">95%+</div>
                    </div>
                    <div className="bg-[rgba(0,0,0,0)] text-base text-green-800 font-medium mt-2 pb-2.5 px-[65px] max-md:px-5">
                      <div className="z-10">Family Approval Rate</div>
                    </div>
                    <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center text-sm font-normal pb-2 px-[70px] max-md:px-5">
                      <div className="z-10">No privacy concerns</div>
                    </div>
                  </div>
                  <div className="bg-red-50 text-red-600 mt-4 p-4 rounded-lg">
                    <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center text-3xl font-bold whitespace-nowrap pb-[19px] px-[70px] max-md:px-5">
                      <div className="z-10 -mt-1.5">60%</div>
                    </div>
                    <div className="bg-[rgba(0,0,0,0)] text-base text-red-800 font-medium mt-2 pb-2.5 px-9 max-md:px-5">
                      <div className="z-10">Camera System Acceptance</div>
                    </div>
                    <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center text-sm font-normal pb-2 px-[70px] max-md:px-5">
                      <div className="z-10">Privacy resistance</div>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <article className="w-[33%] ml-5 max-md:w-full max-md:ml-0">
              <div className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] grow w-full pt-[27px] pb-28 px-8 rounded-2xl max-md:mt-[37px] max-md:pb-[100px] max-md:px-5">
                <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch text-2xl text-gray-900 font-bold text-center leading-none pb-2 px-[57px] max-md:px-5">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/f1cde2cb06405eecd49cce7f6a2a2288f1e40ac7?placeholderIfAbsent=true"
                    className="aspect-[0.63] object-contain w-9 self-center"
                    alt="Legal compliance icon"
                  />
                  <div>Legal Compliance</div>
                </div>
                <div className="bg-[rgba(0,0,0,0)] w-full text-base font-medium mt-6">
                  <div className="bg-purple-50 flex items-stretch gap-3 text-purple-800 pl-3 pr-16 py-3 rounded-lg max-md:pr-5">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/7b485b8dab83340bc1cb7a7f911ccad16e7e4b56?placeholderIfAbsent=true"
                      className="aspect-[0.67] object-contain w-4 shrink-0"
                      alt="HIPAA icon"
                    />
                    <div className="bg-[rgba(0,0,0,0)] pb-[9px]">
                      <div className="z-10">HIPAA-Aligned by Design</div>
                    </div>
                  </div>
                  <div className="bg-blue-50 flex items-stretch gap-3 text-blue-800 mt-4 pl-3 pr-16 py-3 rounded-lg max-md:pr-5">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/3f537784511d180628ffd41d173b0a3407c998b0?placeholderIfAbsent=true"
                      className="aspect-[0.67] object-contain w-4 shrink-0"
                      alt="FCC icon"
                    />
                    <div className="bg-[rgba(0,0,0,0)] pb-2.5">
                      <div className="z-10">FCC-Compliant Frequencies</div>
                    </div>
                  </div>
                  <div className="bg-green-50 flex items-stretch gap-3 text-green-800 mt-4 pl-3 pr-16 py-3 rounded-lg max-md:pr-5">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/4eb65b530af41c154d5c6f9e0e09b4a24b05e71c?placeholderIfAbsent=true"
                      className="aspect-[0.83] object-contain w-5 shrink-0"
                      alt="Privacy law icon"
                    />
                    <div className="bg-[rgba(0,0,0,0)] pb-2.5">
                      <div className="z-10">No Privacy Law Violations</div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyMatrix;
