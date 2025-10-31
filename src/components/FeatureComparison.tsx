import React from 'react';

const FeatureComparison = () => {
  const problemFeatures = [
    "Visual data captured and stored",
    "Cannot operate in bathrooms legally",
    "Family resistance and ethical concerns",
    "Potential for misuse or data breaches"
  ];

  const solutionFeatures = [
    "Radio waves and WiFi signals only",
    "Motion patterns, not visual imagery",
    "Physically impossible to capture faces",
    "Anonymous data by fundamental design"
  ];

  const dignifiedFeatures = [
    "Bathroom-safe monitoring capability",
    "Preserves dignity and autonomy",
    "Family acceptance and trust",
    "Ethical leadership in elder care"
  ];

  return (
    <section className="bg-white w-full py-16 lg:py-20 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center font-normal text-center pb-[13px] px-20 max-md:max-w-full max-md:px-5">
          <div className="flex w-[935px] max-w-full flex-col items-stretch ml-[21px]">
            <h2 className="text-gray-900 text-5xl leading-none self-center max-md:max-w-full max-md:text-[40px]">
              The Privacy Revolution
            </h2>
            <p className="text-gray-600 text-xl leading-[33px] mt-[34px] max-md:max-w-full">
              While others promise privacy through policies, we deliver it through physics. Our technology makes it impossible to capture faces, bodies, or any identifiable imagery.
            </p>
          </div>
        </div>

        <div className="bg-[rgba(0,0,0,0)] mt-20 max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <article className="w-[33%] max-md:w-full max-md:ml-0">
              <div className="bg-[rgba(0,0,0,0)] flex grow flex-col items-center w-full max-md:mt-10">
                <img
                  src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/2ae1a5c7a60d16de7550028f2aa9b5a3c6007ee3?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-24 rounded-2xl"
                  alt="Camera problems icon"
                />
                <h3 className="text-gray-900 text-2xl font-bold leading-none text-center mt-6">
                  The Problem with Cameras
                </h3>
                <ul className="bg-[rgba(0,0,0,0)] self-stretch w-full text-base text-gray-700 font-normal mt-[29px]">
                  {problemFeatures.map((feature, index) => (
                    <li key={index} className="bg-[rgba(0,0,0,0)] flex gap-3 mt-3 first:mt-0">
                      <img
                        src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/f84b1483d1c80e8de54d78dff994647ae8aacb1a?placeholderIfAbsent=true"
                        className="aspect-[0.5] object-contain w-3 shrink-0 mt-1"
                        alt="Problem indicator"
                      />
                      <div className="grow shrink w-[347px] basis-auto">
                        {feature}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            <article className="w-[33%] ml-5 max-md:w-full max-md:ml-0">
              <div className="bg-[rgba(0,0,0,0)] flex grow flex-col items-center w-full max-md:mt-10">
                <img
                  src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/a52bf04c218cad3b907066486f636eab49f140e5?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-24 rounded-2xl"
                  alt="Physics solution icon"
                />
                <h3 className="text-gray-900 text-2xl font-bold leading-none text-center mt-6">
                  Physics-Based Solution
                </h3>
                <ul className="bg-[rgba(0,0,0,0)] self-stretch w-full text-base text-gray-700 font-normal mt-[25px]">
                  {solutionFeatures.map((feature, index) => (
                    <li key={index} className="bg-[rgba(0,0,0,0)] flex gap-3 mt-3 first:mt-0">
                      <img
                        src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/772f8f280b51ca5dd59858f07cbd9b52ddce56ba?placeholderIfAbsent=true"
                        className="aspect-[0.58] object-contain w-3.5 shrink-0 mt-1"
                        alt="Solution indicator"
                      />
                      <div className="grow shrink w-[345px] basis-auto">
                        {feature}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            <article className="w-[33%] ml-5 max-md:w-full max-md:ml-0">
              <div className="bg-[rgba(0,0,0,0)] flex grow flex-col items-center w-full max-md:mt-10">
                <img
                  src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/7086d84e7faf836b3935411aa51fd94e4e9d4ed3?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-24 rounded-2xl"
                  alt="Dignified monitoring icon"
                />
                <h3 className="text-gray-900 text-2xl font-bold leading-none text-center mt-6">
                  Dignified Monitoring
                </h3>
                <ul className="bg-[rgba(0,0,0,0)] self-stretch w-full text-base text-gray-700 font-normal mt-6">
                  {dignifiedFeatures.map((feature, index) => (
                    <li key={index} className="bg-[rgba(0,0,0,0)] flex gap-3 mt-3 first:mt-0">
                      <img
                        src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/adc3b4ecfcd7fcfbb7d77701e2753c98bc6758ab?placeholderIfAbsent=true"
                        className="aspect-[0.58] object-contain w-3.5 shrink-0 mt-1"
                        alt="Benefit indicator"
                      />
                      <div className="grow shrink w-[344px] basis-auto">
                        {feature}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </div>

        <div className="bg-gray-50 w-full mt-20 p-12 rounded-3xl max-md:max-w-full max-md:mt-10 max-md:px-5">
          <h3 className="bg-[rgba(0,0,0,0)] flex flex-col items-center text-3xl text-gray-900 font-normal text-center justify-center px-[70px] py-1 max-md:max-w-full max-md:px-5">
            <div className="max-md:max-w-full">
              What Different Technologies Actually See
            </div>
          </h3>
          
          <div className="bg-[rgba(0,0,0,0)] mt-12 max-md:max-w-full max-md:mt-10">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
              <div className="w-6/12 max-md:w-full max-md:ml-0">
                <div className="bg-white border-red-200 grow w-full p-9 rounded-2xl border-solid border-4 max-md:max-w-full max-md:mt-10 max-md:px-5">
                  <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center text-center pb-[9px] px-20 max-md:max-w-full max-md:px-5">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/c37a86d6496bec22dca9aa19249681a5c279eecc?placeholderIfAbsent=true"
                      className="aspect-[1] object-contain w-20 rounded-full"
                      alt="Camera systems"
                    />
                    <h4 className="text-red-800 text-2xl font-bold leading-none self-stretch mt-4">
                      Camera-Based Systems
                    </h4>
                    <p className="text-red-600 text-base font-normal mt-[17px]">
                      Like SafelyYou and competitors
                    </p>
                  </div>
                  
                  <div className="bg-[rgba(0,0,0,0)] mt-8 max-md:max-w-full">
                    <div className="bg-red-50 p-6 rounded-xl max-md:max-w-full max-md:px-5">
                      <h5 className="bg-[rgba(0,0,0,0)] flex flex-col text-base text-red-800 font-semibold pb-2.5 max-md:pr-5">
                        <div className="z-10">What They Capture:</div>
                      </h5>
                      <ul className="bg-[rgba(0,0,0,0)] text-sm text-red-700 font-normal mt-3">
                        <li className="bg-[rgba(0,0,0,0)] flex flex-col pb-[7px] max-md:pr-5">
                          <div className="z-10">• Full visual imagery of residents</div>
                        </li>
                        <li className="bg-[rgba(0,0,0,0)] flex flex-col mt-2 pb-[7px] max-md:pr-5">
                          <div className="z-10">• Facial features and body positions</div>
                        </li>
                        <li className="bg-[rgba(0,0,0,0)] flex flex-col mt-2 pb-2.5 max-md:pr-5">
                          <div className="z-10">• Personal moments and activities</div>
                        </li>
                        <li className="bg-[rgba(0,0,0,0)] flex flex-col mt-2 pb-[7px] max-md:pr-5">
                          <div className="z-10">• Potentially embarrassing situations</div>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-red-100 text-sm text-red-800 mt-6 p-6 rounded-xl max-md:max-w-full max-md:px-5">
                      <h5 className="bg-[rgba(0,0,0,0)] flex flex-col text-base font-semibold pb-2.5 max-md:pr-5">
                        <div className="z-10">Privacy Promises:</div>
                      </h5>
                      <ul className="bg-[rgba(0,0,0,0)] text-red-700 font-normal mt-3">
                        <li className="bg-[rgba(0,0,0,0)] flex flex-col pb-2.5 max-md:pr-5">
                          <div className="z-10">• "Video deleted after non-fall events"</div>
                        </li>
                        <li className="bg-[rgba(0,0,0,0)] flex flex-col mt-2 pb-[7px] max-md:pr-5">
                          <div className="z-10">• "No live streaming to family"</div>
                        </li>
                        <li className="bg-[rgba(0,0,0,0)] flex flex-col mt-2 pb-2 max-md:pr-5">
                          <div className="z-10">• "Secure cloud storage"</div>
                        </li>
                        <li className="bg-[rgba(0,0,0,0)] flex flex-col mt-2 pb-2 max-md:pr-5">
                          <div className="z-10">• "HIPAA-compliant policies"</div>
                        </li>
                      </ul>
                      <div className="bg-red-200 flex w-full flex-col items-stretch font-medium justify-center mt-4 px-3 py-[11px] rounded-lg">
                        <div className="bg-[rgba(0,0,0,0)] flex items-stretch pr-[77px] max-md:pr-5">
                          <div className="z-10 mr-[-280px]">
                            Still relies on trust and policy enforcement
                          </div>
                          <img
                            src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/6930d4e27c28dc31055119d42cc8ae74648e6629?placeholderIfAbsent=true"
                            className="aspect-[0.64] object-contain w-3.5 shrink-0"
                            alt="Warning icon"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
                <div className="bg-white border-green-200 grow w-full p-9 rounded-2xl border-solid border-4 max-md:max-w-full max-md:mt-10 max-md:px-5">
                  <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center text-center pb-[9px] px-20 max-md:max-w-full max-md:px-5">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/dd7d7c22655a336d8d4fd704f1be6643d6463636?placeholderIfAbsent=true"
                      className="aspect-[1] object-contain w-20 rounded-full"
                      alt="Care Aware Tech"
                    />
                    <h4 className="text-green-800 text-2xl font-bold leading-none mt-4">
                      Care Aware Tech
                    </h4>
                    <p className="text-green-600 text-base font-normal mt-[22px]">
                      Physics-based sensing technology
                    </p>
                  </div>
                  
                  <div className="bg-[rgba(0,0,0,0)] mt-8 max-md:max-w-full">
                    <div className="bg-green-50 p-6 rounded-xl max-md:max-w-full max-md:px-5">
                      <h5 className="bg-[rgba(0,0,0,0)] flex flex-col text-base text-green-800 font-semibold pb-[13px] max-md:pr-5">
                        <div className="z-10">What We Detect:</div>
                      </h5>
                      <ul className="bg-[rgba(0,0,0,0)] text-sm text-green-700 font-normal mt-3">
                        <li className="bg-[rgba(0,0,0,0)] flex flex-col pb-[7px] max-md:pr-5">
                          <div className="z-10">• Motion signatures and patterns</div>
                        </li>
                        <li className="bg-[rgba(0,0,0,0)] flex flex-col mt-2 pb-2 max-md:pr-5">
                          <div className="z-10">• Respiratory and cardiac rhythms</div>
                        </li>
                        <li className="bg-[rgba(0,0,0,0)] flex flex-col mt-2 pb-2.5 max-md:pr-5">
                          <div className="z-10">• Fall event classifications</div>
                        </li>
                        <li className="bg-[rgba(0,0,0,0)] flex flex-col mt-2 pb-2 max-md:pr-5">
                          <div className="z-10">• Anonymous activity data only</div>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-100 text-sm text-green-800 mt-6 p-6 rounded-xl max-md:max-w-full max-md:px-5">
                      <h5 className="bg-[rgba(0,0,0,0)] flex flex-col text-base font-semibold pb-2.5 max-md:pr-5">
                        <div className="z-10">Physical Guarantees:</div>
                      </h5>
                      <ul className="bg-[rgba(0,0,0,0)] text-green-700 font-normal mt-3">
                        <li className="bg-[rgba(0,0,0,0)] flex flex-col pb-2.5 max-md:pr-5">
                          <div className="z-10">• No visual sensors or cameras</div>
                        </li>
                        <li className="bg-[rgba(0,0,0,0)] flex flex-col mt-2 pb-[7px] max-md:pr-5">
                          <div className="z-10">• Radar/WiFi cannot capture images</div>
                        </li>
                        <li className="bg-[rgba(0,0,0,0)] flex flex-col mt-2 pb-2 max-md:pr-5">
                          <div className="z-10">• Faces physically undetectable</div>
                        </li>
                        <li className="bg-[rgba(0,0,0,0)] flex flex-col mt-2 pb-[7px] max-md:pr-5">
                          <div className="z-10">• Anonymous by fundamental design</div>
                        </li>
                      </ul>
                      <div className="bg-green-200 flex w-full flex-col items-stretch font-medium justify-center mt-4 px-3 py-[11px] rounded-lg">
                        <div className="bg-[rgba(0,0,0,0)] flex items-stretch pr-[77px] max-md:pr-5">
                          <div className="z-10 mr-[-286px]">
                            Privacy violations are physically impossible
                          </div>
                          <img
                            src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/f2be9ede199b144f56eba9176a8bfbbeb41bf1fc?placeholderIfAbsent=true"
                            className="aspect-[0.64] object-contain w-3.5 shrink-0"
                            alt="Check icon"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureComparison;
