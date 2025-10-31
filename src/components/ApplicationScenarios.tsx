import React from 'react';

export const ApplicationScenarios: React.FC = () => {
  return (
    <section className="bg-white flex w-full flex-col items-stretch justify-center p-20 max-md:max-w-full max-md:px-5">
      <div className="bg-[rgba(0,0,0,0)] px-8 max-md:max-w-full max-md:px-5">
        <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center font-normal text-center pb-[13px] px-20 max-md:max-w-full max-md:px-5">
          <div className="flex w-[745px] max-w-full flex-col items-stretch">
            <div className="text-gray-900 text-4xl leading-none self-center max-md:max-w-full">
              Real-World Application Scenarios
            </div>
            <div className="text-gray-600 text-xl leading-7 mt-[30px] max-md:max-w-full">
              How our dual technology platform addresses different monitoring needs across various care environments
            </div>
          </div>
        </div>
        
        <div className="bg-[rgba(0,0,0,0)] mt-16 max-md:max-w-full max-md:mt-10">
          <div className="flex w-full flex-col items-stretch justify-center p-12 rounded-3xl max-md:max-w-full max-md:px-5">
            {/* Memory Care Unit Scenario */}
            <div className="bg-[rgba(0,0,0,0)] max-md:max-w-full">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                <div className="w-6/12 max-md:w-full max-md:ml-0">
                  <div className="bg-[rgba(0,0,0,0)] w-full mx-auto max-md:max-w-full max-md:mt-[33px]">
                    <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-4 flex-wrap pr-[59px] max-md:pr-5">
                      <img
                        src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/ca868bd6454f9572e038f68d4f85534fd2bdd4ab?placeholderIfAbsent=true"
                        className="aspect-[1] object-contain w-16 shrink-0 rounded-full"
                        alt="Memory Care Unit"
                      />
                      <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch grow shrink-0 basis-0 w-fit my-auto pb-2 px-px">
                        <div className="text-gray-900 text-3xl font-normal leading-[1.2]">
                          Memory Care Unit
                        </div>
                        <div className="text-purple-600 text-base font-medium mt-[7px]">
                          Comprehensive monitoring for cognitive impairment
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-[rgba(0,0,0,0)] flex w-full flex-col items-stretch mt-6 max-md:max-w-full">
                      <div className="text-gray-900 text-xl font-bold leading-[1.4]">
                        Technology Deployment
                      </div>
                      
                      <div className="bg-[rgba(0,0,0,0)] mt-[25px] max-md:max-w-full">
                        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                          <div className="w-6/12 max-md:w-full max-md:ml-0">
                            <div className="bg-white w-full mx-auto p-4 rounded-lg max-md:mt-4">
                              <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-2 text-base text-blue-900 font-semibold">
                                <img
                                  src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/cbe67b2406944a703b57a6b1c6f57159febc9b2d?placeholderIfAbsent=true"
                                  className="aspect-[0.67] object-contain w-4 shrink-0"
                                  alt="radar icon"
                                />
                                <div className="grow shrink w-[201px]">Radar Sensors</div>
                              </div>
                              <ul className="bg-[rgba(0,0,0,0)] text-sm text-gray-600 font-normal mt-2">
                                <li className="bg-[rgba(0,0,0,0)] flex flex-col pb-2.5 max-md:pr-5">
                                  <div className="z-10">• Private bathrooms</div>
                                </li>
                                <li className="bg-[rgba(0,0,0,0)] flex flex-col mt-1 pb-2.5 max-md:pr-5">
                                  <div className="z-10">• Individual bedrooms</div>
                                </li>
                                <li className="bg-[rgba(0,0,0,0)] flex flex-col mt-1 pb-2 max-md:pr-5">
                                  <div className="z-10">• Quiet spaces</div>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
                            <div className="bg-white w-full mx-auto p-4 rounded-lg max-md:mt-4">
                              <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-2 text-base text-green-900 font-semibold">
                                <img
                                  src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/19227ad8d3f09b681d6c433aee4f52c1cc81511b?placeholderIfAbsent=true"
                                  className="aspect-[0.83] object-contain w-5 shrink-0"
                                  alt="wifi icon"
                                />
                                <div className="grow shrink w-[196px]">WiFi Analysis</div>
                              </div>
                              <ul className="bg-[rgba(0,0,0,0)] text-sm text-gray-600 font-normal mt-2">
                                <li className="bg-[rgba(0,0,0,0)] flex flex-col pb-2.5 max-md:pr-5">
                                  <div className="z-10">• Common areas</div>
                                </li>
                                <li className="bg-[rgba(0,0,0,0)] flex flex-col mt-1 pb-2 max-md:pr-5">
                                  <div className="z-10">• Hallways</div>
                                </li>
                                <li className="bg-[rgba(0,0,0,0)] flex flex-col mt-1 pb-2 max-md:pr-5">
                                  <div className="z-10">• Activity rooms</div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white mt-6 p-6 rounded-lg max-md:max-w-full max-md:px-5">
                      <div className="bg-[rgba(0,0,0,0)] flex flex-col text-base text-gray-900 font-bold pb-[9px] max-md:max-w-full max-md:pr-5">
                        <div className="z-10">Key Benefits</div>
                      </div>
                      <div className="bg-[rgba(0,0,0,0)] w-full text-sm text-green-600 font-normal leading-none mt-3 max-md:max-w-full">
                        {[
                          '24/7 wandering detection and alerts',
                          'Bathroom fall prevention (80% of incidents)',
                          'Agitation and behavioral pattern analysis',
                          'Family notification system'
                        ].map((benefit, index) => (
                          <div key={index} className={`bg-[rgba(0,0,0,0)] flex items-stretch gap-2 flex-wrap ${index > 0 ? 'mt-2' : ''}`}>
                            <img
                              src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/b2f98496ec87c3f0a3a2a70e750fc7d64a9cf97f?placeholderIfAbsent=true"
                              className="aspect-[0.58] object-contain w-3.5 shrink-0"
                              alt="check icon"
                            />
                            <div className="grow shrink w-[463px] basis-auto max-md:max-w-full">
                              {benefit}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
                  <div className="bg-[rgba(0,0,0,0)] flex flex-col self-stretch items-stretch text-center w-full my-auto px-[15px] py-[3px] max-md:max-w-full max-md:mt-10">
                    <div className="bg-[rgba(240,240,240,1)] shadow-[0px_4px_6px_rgba(0,0,0,0.1)] flex flex-col items-center text-xs text-[rgba(153,153,153,1)] font-normal whitespace-nowrap justify-center rounded-2xl max-md:max-w-full">
                      <div>IMG<br />536×48</div>
                    </div>
                    <div className="bg-[rgba(255,255,255,0.9)] z-10 flex w-[101px] max-w-full flex-col items-stretch justify-center -mt-3.5 px-2.5 py-3 rounded-lg max-md:mr-2.5">
                      <div className="bg-[rgba(0,0,0,0)]">
                        <div className="bg-[rgba(0,0,0,0)] text-2xl text-purple-600 font-bold whitespace-nowrap pb-[17px] px-2.5 max-md:mr-0.5">
                          <div className="z-10 -mt-1">40%</div>
                        </div>
                        <div className="bg-[rgba(0,0,0,0)] text-xs text-purple-800 font-normal pb-[9px] px-px">
                          <div className="z-10">Fall Reduction</div>
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
