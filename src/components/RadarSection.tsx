import React from 'react';

export const RadarSection: React.FC = () => {
  return (
    <section className="w-full pt-20 pb-[35px] px-20 max-md:max-w-full max-md:px-5">
      <div className="bg-[rgba(0,0,0,0)] w-full pb-[45px] px-[17px] max-md:max-w-full">
        <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center font-normal text-center mx-[15px] pb-[9px] px-20 max-md:max-w-full max-md:mr-2.5 max-md:px-5">
          <div className="flex w-[889px] max-w-full flex-col items-center">
            <img
              src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/53d5f95b960ba81623f9825ede5dbffca8aee2bd?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-20 rounded-full"
              alt="SFCW Radar Technology"
            />
            <div className="text-gray-900 text-5xl leading-none mt-6 max-md:max-w-full max-md:text-[40px]">
              SFCW Radar Technology
            </div>
            <div className="text-gray-700 text-xl leading-7 self-stretch mt-[26px] max-md:max-w-full">
              Stepped Frequency Continuous Wave radar represents the gold standard in contactless health monitoring—delivering clinical-grade accuracy without compromising privacy.
            </div>
          </div>
        </div>
        
        <div className="bg-[rgba(0,0,0,0)] mt-[59px] max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <div className="w-6/12 max-md:w-full max-md:ml-0">
              <div className="bg-[rgba(0,0,0,0)] w-full mt-[5px] pl-[15px] pb-[136px] max-md:max-w-full max-md:mt-[25px] max-md:pb-[100px]">
                <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch font-normal pb-2.5 max-md:max-w-full">
                  <div className="text-blue-900 text-3xl leading-[1.2]">
                    How SFCW Radar Works
                  </div>
                  <div className="text-gray-700 text-lg leading-7 mt-[37px] max-md:max-w-full">
                    Our radar system transmits low-power radio frequency waves that reflect off moving objects, analyzing the returned signals to detect vital signs and movement patterns with unprecedented precision.
                  </div>
                </div>
                
                <div className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] w-[576px] max-w-full mt-8 p-8 rounded-2xl max-md:px-5">
                  <div className="bg-[rgba(0,0,0,0)] flex flex-col text-xl text-gray-900 font-bold pb-2.5 max-md:max-w-full max-md:pr-5">
                    <div className="z-10">Signal Processing Pipeline</div>
                  </div>
                  
                  <div className="bg-[rgba(0,0,0,0)] w-full mt-6 max-md:max-w-full">
                    {[
                      { step: '1', title: 'RF Wave Transmission', desc: '5-7 GHz stepped frequency signals (FCC compliant)', color: 'bg-blue-600' },
                      { step: '2', title: 'Reflection Capture', desc: 'Multi-antenna array receives reflected signals', color: 'bg-blue-600' },
                      { step: '3', title: 'Digital Signal Processing', desc: 'Advanced algorithms extract vital sign patterns', color: 'bg-blue-600' },
                      { step: '4', title: 'AI Classification', desc: 'Machine learning models identify events and patterns', color: 'bg-blue-600' },
                      { step: '5', title: 'Alert Generation', desc: 'Instant notifications to staff and family', color: 'bg-green-600' }
                    ].map((item, index) => (
                      <div key={index} className={`bg-[rgba(0,0,0,0)] flex items-stretch gap-4 flex-wrap ${index > 0 ? 'mt-6' : ''} max-md:max-w-full`}>
                        <div className={`${item.color} flex flex-col items-center text-lg text-white font-bold whitespace-nowrap w-12 h-12 pt-[9px] pb-[26px] px-[19px] rounded-full max-md:pr-5`}>
                          <div>{item.step}</div>
                        </div>
                        <div className="bg-[rgba(0,0,0,0)] flex flex-col grow shrink-0 basis-0 w-fit my-auto pr-20 pb-1.5 max-md:max-w-full">
                          <div className="text-gray-900 text-base font-semibold">
                            {item.title}
                          </div>
                          <div className="text-gray-600 text-sm font-normal leading-none mt-3">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
              <div className="bg-[rgba(0,0,0,0)] grow w-full pt-[5px] pb-[25px] px-[15px] max-md:max-w-full max-md:mt-5">
                <div className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] p-8 rounded-2xl max-md:max-w-full max-md:px-5">
                  <div className="bg-[rgba(240,240,240,1)] flex flex-col items-center text-xs text-[rgba(153,153,153,1)] font-normal whitespace-nowrap text-center justify-center rounded-xl max-md:max-w-full max-md:mr-[5px]">
                    <div>IMG<br />512×48</div>
                  </div>
                  
                  <div className="bg-[rgba(0,0,0,0)] flex flex-col text-xl text-gray-900 font-bold mt-[42px] pb-3.5 max-md:max-w-full max-md:mr-[5px] max-md:mt-10 max-md:pr-5">
                    <div className="z-10">Radar Sensor Unit</div>
                  </div>
                  
                  <div className="bg-[rgba(0,0,0,0)] w-full text-base text-gray-700 mt-4 max-md:max-w-full">
                    {[
                      { label: 'Dimensions:', value: '15cm × 10cm × 3cm' },
                      { label: 'Power Consumption:', value: '< 5W' },
                      { label: 'Range:', value: '0.5m - 6m' },
                      { label: 'Field of View:', value: '120° horizontal' }
                    ].map((spec, index) => (
                      <div key={index} className={`bg-[rgba(0,0,0,0)] flex items-stretch gap-5 flex-wrap justify-between ${index > 0 ? 'mt-3' : ''} pb-3 max-md:max-w-full`}>
                        <div className="font-normal">{spec.label}</div>
                        <div className="font-medium">{spec.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] mt-8 p-8 rounded-2xl max-md:max-w-full max-md:px-5">
                  <div className="bg-[rgba(0,0,0,0)] flex flex-col text-xl text-gray-900 font-bold pb-3.5 max-md:max-w-full max-md:pr-5">
                    <div className="z-10">Performance Metrics</div>
                  </div>
                  
                  <div className="bg-[rgba(0,0,0,0)] w-full mt-6 max-md:max-w-full">
                    {[
                      { title: 'Fall Detection Sensitivity', value: '98.9%', bgColor: 'bg-green-50', textColor: 'text-green-600', icon: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/c1e4276c749c49fc648b1df503711b5fcd6d7e05?placeholderIfAbsent=true' },
                      { title: 'Specificity (False Negative)', value: '99.0%', bgColor: 'bg-blue-50', textColor: 'text-blue-600', icon: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/556970d1168d7eec62b506683a14d8f0dafd16e8?placeholderIfAbsent=true' },
                      { title: 'Response Time', value: '<2s', bgColor: 'bg-orange-50', textColor: 'text-orange-600', icon: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/b3152543852a94010a13efc4d6905911b7570a79?placeholderIfAbsent=true' },
                      { title: 'False Alarm Rate', value: '0.1%', bgColor: 'bg-purple-50', textColor: 'text-purple-600', icon: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/384cda9daf20809df96bb7bc4ef559ee5fad3313?placeholderIfAbsent=true' }
                    ].map((metric, index) => (
                      <div key={index} className={`${metric.bgColor} flex w-full items-stretch gap-5 flex-wrap justify-between ${index > 0 ? 'mt-4' : ''} px-3.5 py-4 rounded-lg max-md:max-w-full`}>
                        <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-3 text-base text-gray-900 font-medium my-auto">
                          <img
                            src={metric.icon}
                            className="aspect-[0.67] object-contain w-4 shrink-0"
                            alt={metric.title}
                          />
                          <div className="basis-auto">{metric.title}</div>
                        </div>
                        <div className={`bg-[rgba(0,0,0,0)] text-2xl ${metric.textColor} font-bold whitespace-nowrap pb-[17px]`}>
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
