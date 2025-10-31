import React from 'react';

const MarketImpact = () => {
  const marketExpansionData = [
    { percentage: "80%+", title: "Bathroom Coverage", subtitle: "Previously inaccessible market", color: "blue" },
    { percentage: "3x", title: "Addressable Market", subtitle: "Includes privacy-sensitive facilities", color: "green" },
    { percentage: "95%+", title: "Family Acceptance", subtitle: "No privacy concerns", color: "purple" }
  ];

  const regulatoryAdvantages = [
    { title: "No Privacy Law Violations", subtitle: "Physically impossible", color: "green" },
    { title: "Facility-Wide Deployment", subtitle: "No restricted areas", color: "blue" },
    { title: "Easier Procurement", subtitle: "No ethics committee delays", color: "purple" }
  ];

  const costAdvantages = [
    { percentage: "40%", title: "Lower Legal Risk", subtitle: "No privacy litigation exposure", color: "orange" },
    { percentage: "60%", title: "Faster Implementation", subtitle: "No consent processes needed", color: "red" },
    { percentage: "25%", title: "Lower Staff Training", subtitle: "No privacy protocols", color: "green" }
  ];

  const competitiveMoats = [
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/04e11d9e705922a7b715000e62ea35d3228ccc71?placeholderIfAbsent=true",
      title: "Physics-Based Differentiation",
      description: "Competitors cannot replicate privacy guarantees without abandoning their camera-based architectures. Switching costs are prohibitive.",
      badge: "3-5 years minimum for technology pivot",
      badgeColor: "blue"
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/e3b3d19a58539bf997bdfd2de65561afcf1ee14e?placeholderIfAbsent=true",
      title: "Academic Research Moat",
      description: "Deep academic partnerships and PhD-level expertise create high barriers to entry. Continuous innovation through research collaboration.",
      badge: "15+ publications, ongoing NIH funding",
      badgeColor: "green"
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/a3223d77ae053a79cd835d73643ade2a6eef704e?placeholderIfAbsent=true",
      title: "Network Effects",
      description: "Each facility deployment improves algorithm accuracy. Multi- site data creates compound value that competitors cannot easily replicate.",
      badge: "Exponential improvement with scale",
      badgeColor: "purple"
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/053532d5b7e3b0470f30cd36aaae6c24e3271d55?placeholderIfAbsent=true",
      title: "Regulatory First-Mover",
      description: "Privacy-by-design positions us ahead of inevitable regulatory tightening. GDPR-style laws will favor our approach.",
      badge: "Privacy laws increasingly strict",
      badgeColor: "orange"
    }
  ];

  return (
    <section className="bg-gray-50 w-full py-16 lg:py-20 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center font-normal text-center mx-[25px] pb-[9px] px-20 max-md:max-w-full max-md:mr-2.5 max-md:px-5">
          <div className="flex w-[850px] max-w-full flex-col items-stretch">
            <h2 className="text-gray-900 text-5xl leading-none max-md:max-w-full max-md:text-[40px]">
              Market Impact & Competitive Benefits
            </h2>
            <p className="text-gray-600 text-xl leading-7 self-center mt-[34px] max-md:max-w-full">
              Privacy-first technology creates significant competitive advantages and market opportunities
            </p>
          </div>
        </div>

        <div className="bg-[rgba(0,0,0,0)] mt-[59px] pt-[5px] pb-[45px] px-[25px] max-md:max-w-full max-md:mt-10 max-md:px-5">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <article className="w-[33%] max-md:w-full max-md:ml-0">
              <div className="bg-white shadow-[0px_8px_10px_rgba(0,0,0,0.1)] grow w-full px-8 py-[34px] rounded-2xl max-md:mt-10 max-md:px-5">
                <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch text-2xl text-gray-900 font-bold text-center leading-none pb-[9px] px-[51px] max-md:px-5">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/4fd6a9137d80f9bd5594e8dc7eeb9669a18e1572?placeholderIfAbsent=true"
                    className="aspect-[1] object-contain w-20 self-center rounded-full"
                    alt="Market expansion icon"
                  />
                  <div className="mt-4">Market Expansion</div>
                </div>
                <div className="bg-[rgba(0,0,0,0)] mt-6">
                  {marketExpansionData.map((item, index) => (
                    <div key={index} className={`bg-${item.color}-50 text-${item.color}-600 ${index > 0 ? 'mt-4' : ''} p-4 rounded-lg`}>
                      <div className="bg-[rgba(0,0,0,0)] flex flex-col text-2xl font-bold whitespace-nowrap pb-[17px] max-md:pr-5">
                        <div className="z-10 -mt-1">{item.percentage}</div>
                      </div>
                      <div className={`bg-[rgba(0,0,0,0)] flex flex-col text-base text-${item.color}-800 font-medium mt-2 pb-2.5 max-md:pr-5`}>
                        <div className="z-10">{item.title}</div>
                      </div>
                      <div className="bg-[rgba(0,0,0,0)] flex flex-col text-sm font-normal pb-2 max-md:pr-5">
                        <div className="z-10">{item.subtitle}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            <article className="w-[33%] ml-5 max-md:w-full max-md:ml-0">
              <div className="bg-white shadow-[0px_8px_10px_rgba(0,0,0,0.1)] grow w-full pt-9 pb-44 px-8 rounded-2xl max-md:mt-10 max-md:pb-[100px] max-md:px-5">
                <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch text-2xl text-gray-900 font-bold text-center leading-none pb-[9px] px-[26px] max-md:px-5">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/0d0c95f4d0c579b5b4b3562dfc66eaf869c6e860?placeholderIfAbsent=true"
                    className="aspect-[1] object-contain w-20 self-center rounded-full"
                    alt="Regulatory advantage icon"
                  />
                  <div className="mt-4">Regulatory Advantage</div>
                </div>
                <div className="bg-[rgba(0,0,0,0)] w-full mt-6">
                  {regulatoryAdvantages.map((item, index) => (
                    <div key={index} className={`bg-${item.color}-50 flex items-stretch gap-3 ${index > 0 ? 'mt-4' : ''} pl-3 pr-[62px] py-3 rounded-lg max-md:pr-5`}>
                      <img
                        src={`https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/${
                          item.color === 'green' ? 'a254fea08d739d19d22100608a8e20222ed693ee' :
                          item.color === 'blue' ? 'ef261ebf494b99bc18704f9438c39df51f36e7e2' :
                          '46789e1f624c5a39fe41c848daf41777af1eb3bd'
                        }?placeholderIfAbsent=true`}
                        className="aspect-[0.67] object-contain w-4 shrink-0 my-auto"
                        alt="Advantage icon"
                      />
                      <div className="bg-[rgba(0,0,0,0)]">
                        <div className={`bg-[rgba(0,0,0,0)] text-base text-${item.color}-800 font-medium pb-2.5`}>
                          <div className="z-10">{item.title}</div>
                        </div>
                        <div className={`bg-[rgba(0,0,0,0)] flex w-[188px] max-w-full flex-col text-sm text-${item.color}-600 font-normal pb-2 max-md:mr-[9px] max-md:pr-5`}>
                          <div className="z-10">{item.subtitle}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            <article className="w-[33%] ml-5 max-md:w-full max-md:ml-0">
              <div className="bg-white shadow-[0px_8px_10px_rgba(0,0,0,0.1)] grow w-full px-8 py-[34px] rounded-2xl max-md:mt-10 max-md:px-5">
                <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch text-2xl text-gray-900 font-bold text-center leading-none pb-[9px] px-[55px] max-md:px-5">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/d714fad1e0e46688f0fea81bac8dd22928b46f54?placeholderIfAbsent=true"
                    className="aspect-[1] object-contain w-20 self-center rounded-full"
                    alt="Cost advantages icon"
                  />
                  <div className="mt-4">Cost Advantages</div>
                </div>
                <div className="bg-[rgba(0,0,0,0)] mt-6">
                  {costAdvantages.map((item, index) => (
                    <div key={index} className={`bg-${item.color}-50 text-${item.color}-600 ${index > 0 ? 'mt-4' : ''} p-4 rounded-lg`}>
                      <div className="bg-[rgba(0,0,0,0)] flex flex-col text-2xl font-bold whitespace-nowrap pb-[17px] max-md:pr-5">
                        <div className="z-10 -mt-1">{item.percentage}</div>
                      </div>
                      <div className={`bg-[rgba(0,0,0,0)] flex flex-col text-base text-${item.color}-800 font-medium mt-2 pb-[9px] max-md:pr-5`}>
                        <div className="z-10">{item.title}</div>
                      </div>
                      <div className="bg-[rgba(0,0,0,0)] flex flex-col text-sm font-normal pb-[7px] max-md:pr-5">
                        <div className="z-10">{item.subtitle}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>

        <div className="bg-white shadow-[0px_25px_50px_rgba(0,0,0,0.25)] mt-[19px] mx-[25px] pl-12 pr-6 py-12 rounded-3xl max-md:max-w-full max-md:mr-2.5 max-md:px-5">
          <h3 className="bg-[rgba(0,0,0,0)] flex flex-col items-center text-4xl text-gray-900 font-normal text-center mr-6 pb-2 px-[70px] max-md:max-w-full max-md:mr-2.5 max-md:px-5">
            <div className="max-md:max-w-full">
              Sustainable Competitive Moats
            </div>
          </h3>
          
          <div className="bg-[rgba(0,0,0,0)] mt-[46px] max-md:max-w-full max-md:mt-10">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
              <div className="w-6/12 max-md:w-full max-md:ml-0">
                <div className="bg-[rgba(0,0,0,0)] w-full text-base mx-auto max-md:max-w-full max-md:mt-10">
                  {competitiveMoats.slice(0, 2).map((moat, index) => (
                    <div key={index} className={`bg-[rgba(0,0,0,0)] flex items-stretch gap-6 flex-wrap ${index > 0 ? 'mt-8' : ''} max-md:mr-2.5`}>
                      <img
                        src={moat.icon}
                        className="aspect-[1] object-contain w-16 shrink-0 rounded-2xl"
                        alt={`${moat.title} icon`}
                      />
                      <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch grow shrink-0 basis-0 w-fit max-md:max-w-full">
                        <div className="text-gray-900 text-2xl font-bold leading-none">
                          {moat.title}
                        </div>
                        <div className="text-gray-700 font-normal leading-6 mt-[21px] max-md:max-w-full max-md:mr-2.5">
                          {moat.description}
                        </div>
                        <div className={`bg-${moat.badgeColor}-50 mt-[25px] p-4 rounded-lg max-md:max-w-full`}>
                          <div className={`bg-[rgba(0,0,0,0)] flex flex-col text-${moat.badgeColor}-800 font-semibold pb-2.5 max-md:pr-5`}>
                            <div className="z-10">
                              {index === 0 ? 'Competitive Response Time' : 'Research Pipeline'}
                            </div>
                          </div>
                          <div className={`bg-[rgba(0,0,0,0)] flex flex-col text-${moat.badgeColor}-600 font-normal pb-[9px] max-md:pr-5`}>
                            <div className="z-10">{moat.badge}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
                <div className="bg-[rgba(0,0,0,0)] w-full text-base mx-auto pb-6 max-md:max-w-full max-md:mt-10">
                  {competitiveMoats.slice(2, 4).map((moat, index) => (
                    <div key={index} className={`bg-[rgba(0,0,0,0)] flex items-stretch gap-6 flex-wrap ${index > 0 ? 'mt-8' : ''} max-md:mr-[5px]`}>
                      <img
                        src={moat.icon}
                        className="aspect-[1] object-contain w-16 shrink-0 rounded-2xl"
                        alt={`${moat.title} icon`}
                      />
                      <div className="bg-[rgba(0,0,0,0)] flex flex-col grow shrink-0 basis-0 w-fit max-md:max-w-full">
                        <div className="text-gray-900 text-2xl font-bold leading-none">
                          {moat.title}
                        </div>
                        <div className="text-gray-700 font-normal leading-6 self-stretch mt-[25px] max-md:max-w-full">
                          {moat.description}
                        </div>
                        <div className={`bg-${moat.badgeColor}-50 ${index === 0 ? 'mt-[25px]' : 'w-[440px] max-w-full mt-6'} p-4 rounded-lg`}>
                          <div className={`bg-[rgba(0,0,0,0)] flex flex-col text-${moat.badgeColor}-800 font-semibold pb-${index === 0 ? '2.5' : '[9px]'} max-md:pr-5`}>
                            <div className="z-10">
                              {index === 0 ? 'Data Advantage' : 'Regulatory Tailwinds'}
                            </div>
                          </div>
                          <div className={`bg-[rgba(0,0,0,0)] flex flex-col text-${moat.badgeColor}-600 font-normal pb-2.5 max-md:pr-5`}>
                            <div className="z-10">{moat.badge}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketImpact;
