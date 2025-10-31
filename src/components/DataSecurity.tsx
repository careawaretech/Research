import React from 'react';

const DataSecurity = () => {
  const anonymousFeatures = [
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/bb3e2408e4e5227332649d488633c90b9434fcb8?placeholderIfAbsent=true",
      title: "No Personal Identifiers",
      description: "Motion signatures contain no names, faces, or identifying characteristics"
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/af00c89405a23f91a7ba93b8109cb16fcc5c4708?placeholderIfAbsent=true",
      title: "Biometric-Free Detection",
      description: "No fingerprints, facial recognition, or biometric data collection"
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/6bc2c3a57a30ce2119df3f56defa0ffb8d91b7e3?placeholderIfAbsent=true",
      title: "Aggregated Analytics Only",
      description: "Individual events processed for safety, trends analyzed in aggregate"
    }
  ];

  const encryptionFeatures = [
    { title: "AES-256", subtitle: "End-to-end encryption" },
    { title: "On-Premises", subtitle: "Local processing option" },
    { title: "TLS 1.3", subtitle: "Secure transmission" },
    { title: "PKI", subtitle: "Certificate management" }
  ];

  const complianceFeatures = [
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/1c8551dbe067016bf57543e7e3479cb983e032c1?placeholderIfAbsent=true",
      title: "HIPAA Alignment",
      description: "Anonymous data processing meets healthcare privacy standards",
      badge: "Compliant by Design",
      color: "blue"
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/5afeb967db4b51d1e920f95d6ad7c90194ee6b76?placeholderIfAbsent=true",
      title: "FCC Compliance",
      description: "5-7 GHz radar frequencies fully authorized for healthcare use",
      badge: "Certified Frequencies",
      color: "green"
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/f2cfed821199cd05aaaf702b75343a099df2b0f5?placeholderIfAbsent=true",
      title: "International Standards",
      description: "ISO 27001 security framework and EU GDPR principles",
      badge: "Global Ready",
      color: "purple"
    }
  ];

  const transparencyFeatures = [
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/18ba1446da36e3aa2698a0f5bd9a3718936bc15d?placeholderIfAbsent=true",
      text: "Opt-in alert notifications for families"
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/8d10d6cd82c22cb3b4e7058109764507997c3efd?placeholderIfAbsent=true",
      text: "Anonymous activity summaries"
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/533453d2a054cbcb0a1d227d8f1566ae863383ba?placeholderIfAbsent=true",
      text: "Granular privacy controls"
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/bfee45a34c5ed1de544a535557f64eb9685cb2f5?placeholderIfAbsent=true",
      text: "No video or audio access ever"
    }
  ];

  const partners = [
    { name: "NIH SBIR", subtitle: "Grant Application" },
    { name: "Portland State", subtitle: "Research Partner" },
    { name: "Intel Corp", subtitle: "RF Engineering" },
    { name: "HIPAA Aligned", subtitle: "Privacy Certified", special: true }
  ];

  return (
    <section className="bg-white w-full py-16 lg:py-20 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center font-normal text-center mx-[15px] pb-[9px] px-20 max-md:max-w-full max-md:mr-2.5 max-md:px-5">
          <div className="flex w-[758px] max-w-full flex-col items-stretch">
            <h2 className="text-gray-900 text-5xl leading-none self-center max-md:max-w-full max-md:text-[40px]">
              Data Security & Compliance
            </h2>
            <p className="text-gray-600 text-xl leading-7 mt-[34px] max-md:max-w-full">
              Beyond privacy by design, our systems implement enterprise-grade security and regulatory compliance
            </p>
          </div>
        </div>

        <div className="bg-[rgba(0,0,0,0)] mt-16 mx-[15px] max-md:max-w-full max-md:mr-2.5 max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <div className="w-6/12 max-md:w-full max-md:ml-0">
              <div className="bg-[rgba(0,0,0,0)] grow w-full pb-52 max-md:max-w-full max-md:mt-10 max-md:pb-[100px]">
                <article className="flex flex-col items-stretch pl-8 pr-3.5 py-8 rounded-2xl max-md:max-w-full max-md:pl-5">
                  <h3 className="text-gray-900 text-3xl font-normal leading-[1.2]">
                    Anonymous Data Collection
                  </h3>
                  <div className="bg-[rgba(0,0,0,0)] flex w-full flex-col text-base mt-[31px] max-md:max-w-full">
                    {anonymousFeatures.map((feature, index) => (
                      <div key={index} className="bg-[rgba(0,0,0,0)] flex items-stretch gap-4 flex-wrap mt-6 first:mt-0">
                        <img
                          src={feature.icon}
                          className="aspect-[1] object-contain w-12 shrink-0 rounded-lg"
                          alt={`${feature.title} icon`}
                        />
                        <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch grow shrink-0 basis-0 w-fit pr-[18px] pb-3 max-md:max-w-full">
                          <div className="text-gray-900 font-semibold">
                            {feature.title}
                          </div>
                          <div className="text-gray-700 font-normal leading-6 mt-5 max-md:max-w-full">
                            {feature.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="flex flex-col items-stretch mt-8 px-[29px] py-[30px] rounded-2xl max-md:max-w-full max-md:px-5">
                  <h3 className="text-gray-900 text-3xl font-normal leading-[1.2]">
                    Encryption & Transmission
                  </h3>
                  <div className="bg-[rgba(0,0,0,0)] w-full mt-[29px] p-[3px] max-md:max-w-full">
                    <div className="max-md:max-w-full">
                      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                        {encryptionFeatures.slice(0, 2).map((feature, index) => (
                          <div key={index} className="w-6/12 max-md:w-full max-md:ml-0">
                            <div className="bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.1)] grow text-center w-full pt-[52px] pb-4 px-4 rounded-lg max-md:mt-6">
                              <div className="bg-[rgba(0,0,0,0)] text-base text-gray-900 font-semibold whitespace-nowrap pb-[13px] px-[70px] max-md:px-5">
                                <div className="z-10">{feature.title}</div>
                              </div>
                              <div className="bg-[rgba(0,0,0,0)] text-sm text-gray-600 font-normal pb-2 px-8 max-md:px-5">
                                <div className="z-10">{feature.subtitle}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-6 max-md:max-w-full">
                      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                        {encryptionFeatures.slice(2, 4).map((feature, index) => (
                          <div key={index} className="w-6/12 max-md:w-full max-md:ml-0">
                            <div className="bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.1)] grow text-center w-full pt-[52px] pb-4 px-4 rounded-lg max-md:mt-6">
                              <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center text-base text-gray-900 font-semibold pb-[13px] px-[70px] max-md:px-5">
                                <div className="z-10">{feature.title}</div>
                              </div>
                              <div className="bg-[rgba(0,0,0,0)] text-sm text-gray-600 font-normal pb-2.5 px-10 max-md:px-5">
                                <div className="z-10">{feature.subtitle}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>

            <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
              <div className="bg-[rgba(0,0,0,0)] grow w-full max-md:max-w-full max-md:mt-10">
                <article className="bg-white border p-[34px] rounded-2xl border-solid border-2 max-md:max-w-full max-md:px-5">
                  <h3 className="bg-[rgba(0,0,0,0)] flex flex-col text-3xl text-gray-900 font-normal justify-center py-1 max-md:max-w-full max-md:pr-5">
                    <div>Regulatory Compliance</div>
                  </h3>
                  <div className="bg-[rgba(0,0,0,0)] w-full mt-6 max-md:max-w-full">
                    {complianceFeatures.map((feature, index) => (
                      <div key={index} className={`bg-${feature.color}-50 flex items-stretch gap-4 flex-wrap ${index > 0 ? 'mt-6' : ''} p-4 rounded-lg`}>
                        <img
                          src={feature.icon}
                          className="aspect-[1] object-contain w-16 shrink-0 my-auto rounded-lg"
                          alt={`${feature.title} icon`}
                        />
                        <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch grow shrink-0 basis-0 w-fit">
                          <div className={`text-${feature.color}-900 text-lg font-bold leading-loose`}>
                            {feature.title}
                          </div>
                          <div className={`text-${feature.color}-700 text-base font-normal leading-6 mt-2.5`}>
                            {feature.description}
                          </div>
                          <div className="bg-[rgba(0,0,0,0)] flex w-[396px] max-w-full flex-col text-sm font-medium mt-5 max-md:mr-2.5 max-md:pr-5">
                            <div className={`bg-${feature.color}-100 text-${feature.color}-800 flex items-stretch gap-1 px-3 py-1 rounded-full`}>
                              <img
                                src={`https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/${
                                  feature.color === 'blue' ? '1a1e940041a9b6d1472082271d60908429a28875' :
                                  feature.color === 'green' ? 'c1785ca16818c1ed1b8de0967042454ff4884f85' :
                                  '312b95e2c251fe2f9f8a530637d8ee137d9fe68f'
                                }?placeholderIfAbsent=true`}
                                className="aspect-[0.6] object-contain w-3 shrink-0"
                                alt="Badge icon"
                              />
                              <div className="basis-auto">{feature.badge}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="flex flex-col items-stretch font-normal mt-8 p-8 rounded-2xl max-md:max-w-full max-md:px-5">
                  <h3 className="text-gray-900 text-2xl leading-none">
                    Family Transparency Portal
                  </h3>
                  <div className="bg-[rgba(0,0,0,0)] w-full text-base text-gray-800 mt-[33px] max-md:max-w-full">
                    {transparencyFeatures.map((feature, index) => (
                      <div key={index} className="bg-white flex items-stretch gap-3 flex-wrap mt-4 first:mt-0 pl-3 pr-20 py-3 rounded-lg max-md:pr-5">
                        <img
                          src={feature.icon}
                          className="aspect-[0.75] object-contain w-[18px] shrink-0"
                          alt="Feature icon"
                        />
                        <div className="bg-[rgba(0,0,0,0)] grow shrink-0 basis-0 w-fit pb-2.5">
                          <div className="z-10">{feature.text}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[rgba(0,0,0,0)] flex w-full flex-col items-stretch mt-16 max-md:max-w-full max-md:mt-10">
          <h3 className="text-gray-900 text-3xl font-normal leading-[1.2] text-center self-center">
            Trusted by Industry Leaders
          </h3>
          <div className="bg-[rgba(0,0,0,0)] mt-[35px] pt-[5px] pb-[25px] px-[15px] max-md:max-w-full">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
              {partners.map((partner, index) => (
                <div key={index} className="w-3/12 max-md:w-full max-md:ml-0">
                  <div className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] border-gray-100 grow text-xs font-normal text-center w-full p-[26px] rounded-xl border-solid border-2 max-md:mt-[37px] max-md:px-5">
                    {partner.special ? (
                      <div className="bg-orange-100 flex flex-col items-center justify-center px-[46px] py-2 rounded-lg max-md:px-5">
                        <img
                          src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/836faf1981b7406bf4fb7622e54e4d8a7880565f?placeholderIfAbsent=true"
                          className="aspect-[0.75] object-contain w-6"
                          alt="HIPAA icon"
                        />
                      </div>
                    ) : (
                      <div className="bg-[rgba(240,240,240,1)] flex flex-col items-center text-[rgba(153,153,153,1)] whitespace-nowrap justify-center">
                        <div>
                          IMG
                          <br />
                          228×48
                        </div>
                      </div>
                    )}
                    <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center text-sm text-gray-900 font-medium mt-[34px] pb-[11px] px-[70px] max-md:px-5">
                      <div className="z-10">{partner.name}</div>
                    </div>
                    <div className="bg-[rgba(0,0,0,0)] text-gray-600 pb-[7px] px-[66px] max-md:px-5">
                      <div className="z-10">{partner.subtitle}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataSecurity;
