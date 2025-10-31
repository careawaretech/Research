import React from 'react';

const WiFiSection: React.FC = () => {
  return (
    <section className="w-full py-16 lg:py-20 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex max-w-3xl flex-col items-center">
            <img
              src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/2c4cfee67eb49a311a883b5b9d6c0f4f50aad8b6?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-20 rounded-full"
              alt="WiFi Signal Analysis Platform"
            />
            <div className="text-gray-900 text-5xl leading-none mt-6 max-md:max-w-full max-md:text-[40px]">
              WiFi Signal Analysis Platform
            </div>
            <div className="text-gray-700 text-xl leading-7 self-stretch mt-[25px] max-md:max-w-full">
              Revolutionary Channel State Information (CSI) technology transforms existing WiFi
              infrastructure into a comprehensive health monitoring system—no additional hardware
              required.
            </div>
          </div>
        </div>
        <div className="bg-[rgba(0,0,0,0)] mt-[59px] max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <div className="w-6/12 max-md:w-full max-md:ml-0">
              <div className="bg-[rgba(0,0,0,0)] w-full mt-[5px] pl-[15px] pb-[136px] max-md:max-w-full max-md:mt-[27px] max-md:pb-[100px]">
                <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch font-normal pb-2.5 max-md:max-w-full">
                  <div className="text-green-900 text-3xl leading-[1.2]">
                    WiFi CSI Technology
                  </div>
                  <div className="text-gray-700 text-lg leading-7 mt-[31px] max-md:max-w-full">
                    Channel State Information captures minute changes in WiFi signal propagation
                    caused by human movement, breathing, and heartbeat— turning your facility's
                    wireless network into an ambient sensing system.
                  </div>
                </div>
                <div className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] w-[576px] max-w-full mt-8 p-8 rounded-2xl max-md:px-5">
                  <div className="bg-[rgba(0,0,0,0)] flex flex-col text-xl text-gray-900 font-bold pb-2.5 max-md:max-w-full max-md:pr-5">
                    <div className="z-10">Signal Analysis Pipeline</div>
                  </div>
                  <div className="bg-[rgba(0,0,0,0)] w-full mt-6 max-md:max-w-full">
                    {/* Pipeline Steps */}
                    {[
                      {
                        number: '1',
                        title: 'CSI Data Extraction',
                        description: 'Real-time capture from existing WiFi routers',
                        bgColor: 'bg-green-600'
                      },
                      {
                        number: '2',
                        title: 'Signal Preprocessing',
                        description: 'Noise filtering and amplitude/phase analysis',
                        bgColor: 'bg-green-600'
                      },
                      {
                        number: '3',
                        title: 'Feature Extraction',
                        description: 'Time-frequency domain characteristic identification',
                        bgColor: 'bg-green-600'
                      },
                      {
                        number: '4',
                        title: 'Deep Learning Classification',
                        description: 'Neural networks identify activities and vital patterns',
                        bgColor: 'bg-green-600'
                      },
                      {
                        number: '5',
                        title: 'Event Detection & Alerts',
                        description: 'Real-time anomaly detection and notifications',
                        bgColor: 'bg-blue-600'
                      }
                    ].map((step, index) => (
                      <div key={index} className={`bg-[rgba(0,0,0,0)] flex items-stretch gap-4 flex-wrap ${index > 0 ? 'mt-6' : ''} max-md:max-w-full`}>
                        <div className={`${step.bgColor} flex flex-col items-center text-lg text-white font-bold whitespace-nowrap w-12 h-12 pt-[9px] pb-[26px] px-[19px] rounded-full max-md:pr-5`}>
                          <div>{step.number}</div>
                        </div>
                        <div className="bg-[rgba(0,0,0,0)] flex flex-col grow shrink-0 basis-0 w-fit my-auto pr-20 pb-1.5 max-md:max-w-full">
                          <div className="text-gray-900 text-base font-semibold">
                            {step.title}
                          </div>
                          <div className="text-gray-600 text-sm font-normal leading-none mt-3">
                            {step.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
              <div className="bg-[rgba(0,0,0,0)] grow w-full pt-[5px] pb-[25px] px-[15px] max-md:max-w-full max-md:mt-[22px]">
                <div className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] p-8 rounded-2xl max-md:max-w-full max-md:pl-5">
                  <div className="bg-[rgba(240,240,240,1)] flex flex-col items-center text-xs text-[rgba(153,153,153,1)] font-normal whitespace-nowrap text-center justify-center rounded-xl max-md:max-w-full max-md:mr-2.5">
                    <div>IMG<br />512×48</div>
                  </div>
                  <div className="bg-[rgba(0,0,0,0)] flex flex-col text-xl text-gray-900 font-bold mt-[42px] pb-2.5 max-md:max-w-full max-md:mr-2.5 max-md:mt-10 max-md:pr-5">
                    <div className="z-10">Software Integration</div>
                  </div>
                  <div className="bg-[rgba(0,0,0,0)] w-full text-base text-gray-700 mt-4 max-md:max-w-full">
                    <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-5 flex-wrap justify-between pb-[9px] max-md:max-w-full max-md:mr-[5px]">
                      <div className="font-normal">Compatible Routers:</div>
                      <div className="font-medium">Intel AX200+, Atheros</div>
                    </div>
                    <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-5 flex-wrap justify-between mt-3 pb-[9px] max-md:max-w-full max-md:mr-2">
                      <div className="font-normal">WiFi Standards:</div>
                      <div className="font-medium">802.11ac/ax (WiFi 5/6)</div>
                    </div>
                    <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-5 flex-wrap justify-between mt-3 pb-2 max-md:max-w-full max-md:mr-[7px]">
                      <div className="font-normal">Processing:</div>
                      <div className="font-medium">Edge computing</div>
                    </div>
                    <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-5 flex-wrap justify-between mt-3 pb-[9px] max-md:max-w-full">
                      <div className="font-normal">Deployment:</div>
                      <div className="font-medium">Software-only update</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] mt-8 p-8 rounded-2xl max-md:max-w-full max-md:px-5">
                  <div className="bg-[rgba(0,0,0,0)] flex flex-col text-xl text-gray-900 font-bold pb-[15px] max-md:max-w-full max-md:pr-5">
                    <div className="z-10">Current Performance</div>
                  </div>
                  <div className="bg-[rgba(0,0,0,0)] w-full mt-6 max-md:max-w-full">
                    {[
                      {
                        title: 'Respiration Detection',
                        value: '±5 rpm',
                        bgColor: 'bg-green-50',
                        textColor: 'text-green-600',
                        icon: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/c049d13a7ebd4b9b742a0bf0d7d1e0906d65e1df?placeholderIfAbsent=true'
                      },
                      {
                        title: 'Motion Classification',
                        value: '85%+',
                        bgColor: 'bg-blue-50',
                        textColor: 'text-blue-600',
                        icon: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/8deb2b7cec31ddf3c9dc6f9e314314445cc4a58b?placeholderIfAbsent=true'
                      },
                      {
                        title: 'Fall Detection',
                        value: 'Validation',
                        bgColor: 'bg-yellow-50',
                        textColor: 'text-yellow-600',
                        icon: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/d6ef15a443c453bd609d4131d6f068941a530b9b?placeholderIfAbsent=true'
                      },
                      {
                        title: 'Response Time',
                        value: '<5s',
                        bgColor: 'bg-purple-50',
                        textColor: 'text-purple-600',
                        icon: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/114adeca5299c39d0bac322c7e62a159342d24ec?placeholderIfAbsent=true'
                      }
                    ].map((metric, index) => (
                      <div key={index} className={`${metric.bgColor} flex w-full items-stretch gap-5 flex-wrap justify-between ${index > 0 ? 'mt-4' : ''} px-[15px] py-4 rounded-lg max-md:max-w-full`}>
                        <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-3 text-base text-gray-900 font-medium my-auto">
                          <img
                            src={metric.icon}
                            className="aspect-[0.83] object-contain w-5 shrink-0"
                            alt={`${metric.title} icon`}
                          />
                          <div className="basis-auto">{metric.title}</div>
                        </div>
                        <div className={`bg-[rgba(0,0,0,0)] text-2xl ${metric.textColor} font-bold pb-3.5`}>
                          <div className="z-10 -mt-1">{metric.value}</div>
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
    </section>
  );
};

export default WiFiSection;
