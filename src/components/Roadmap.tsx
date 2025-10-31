import React from 'react';

const Roadmap = () => {
  const roadmapSections = [
    {
      title: "2025 Goals",
      items: [
        "Launch AI-powered health insights",
        "Expand to 100+ care facilities",
        "Introduce family communication platform",
        "Achieve SOC 2 Type II compliance"
      ],
      iconBase: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/9590eb87d7af82eeb74035d8380276fb47d50a31?placeholderIfAbsent=true"
    },
    {
      title: "2026 Vision",
      items: [
        "Predictive health analytics",
        "Integration with major EHR systems",
        "Voice-activated assistance features",
        "International market expansion"
      ],
      iconBase: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/9bd5694ba61a0acd400e9c43e907ca27c54346fe?placeholderIfAbsent=true"
    },
    {
      title: "Long-term Impact",
      items: [
        "Serve 1M+ seniors globally",
        "Open-source privacy frameworks",
        "Industry standard for ethical AI",
        "Transform elderly care worldwide"
      ],
      iconBase: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/96d1814bba4c525ada22304beeb38f55bc776385?placeholderIfAbsent=true"
    }
  ];

  return (
    <section className="bg-white flex flex-col items-stretch justify-center p-20 max-md:max-w-full max-md:px-5">
      <div className="bg-[rgba(0,0,0,0)] w-full px-6 max-md:max-w-full max-md:px-5">
        <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center font-normal text-center pb-2 px-20 max-md:max-w-full max-md:px-5">
          <div className="flex w-[652px] max-w-full flex-col items-stretch">
            <h2 className="text-slate-800 text-4xl leading-none self-center">Future Roadmap</h2>
            <p className="text-gray-700 text-xl leading-7 mt-8 max-md:max-w-full">
              Our commitment to continuous innovation in privacy-first elderly care technology.
            </p>
          </div>
        </div>
        <div className="bg-[rgba(0,0,0,0)] mt-16 max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            {roadmapSections.map((section, index) => (
              <div key={index} className="w-[33%] max-md:w-full max-md:ml-0">
                <div className="flex grow flex-col items-stretch text-white font-normal p-8 rounded-xl max-md:mt-8 max-md:px-5 bg-gradient-to-br from-slate-700 to-slate-900">
                  <h3 className="text-2xl leading-none">{section.title}</h3>
                  <ul className="bg-[rgba(0,0,0,0)] w-full text-base mt-[31px]">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="bg-[rgba(0,0,0,0)] flex gap-3 mt-3 first:mt-0">
                        <img
                          src={section.iconBase}
                          className="aspect-[0.67] object-contain w-4 shrink-0 mt-1"
                          alt="Checkmark"
                        />
                        <div className="grow shrink w-[294px] basis-auto">{item}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
