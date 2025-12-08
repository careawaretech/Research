import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumb } from '@/components/ui/custom-breadcrumb';
import HeroSection from '@/components/HeroSection';
import { TeamSection } from '@/components/sections/TeamSection';
import { PublicationsSection } from '@/components/sections/PublicationsSection';
import { CollaborationSection } from '@/components/sections/CollaborationSection';

const AcademicValidation = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/', isActive: false },
    { label: 'Research', href: '#', isActive: false },
    { label: 'Academic Validation', isActive: true }
  ];

  return (
    <div className="bg-white overflow-hidden rounded-lg border-[rgba(206,212,218,1)] border-solid border-2">
      <div className="bg-gray-50 w-full max-md:max-w-full">
        <Header />
        <Breadcrumb items={breadcrumbItems} />
        <HeroSection pageSlug="academic-validation" />
        <TeamSection />
        
        {/* Academic Partnerships & Institutional Backing Section */}
        <section className="bg-gray-50 w-full py-16 lg:py-20 px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center font-normal text-center pb-[9px] max-md:max-w-full">
              <div className="w-[776px] max-w-full">
                <h2 className="text-gray-900 text-4xl leading-none max-md:max-w-full">
                  Academic Partnerships & Institutional Backing
                </h2>
                <p className="text-gray-600 text-xl leading-7 ml-[21px] mr-[19px] mt-[29px] max-md:max-w-full max-md:mr-2.5">
                  Supported by leading research institutions and industry partners in healthcare technology development
                </p>
              </div>
            </div>
            
            <div className="bg-[rgba(0,0,0,0)] mt-16 max-md:max-w-full max-md:mt-10">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                <div className="w-6/12 max-md:w-full max-md:ml-0">
                  <div className="bg-[rgba(0,0,0,0)] flex grow flex-col items-stretch w-full pb-[45px] px-[25px] max-md:max-w-full max-md:mt-3.5 max-md:px-5">
                    <h3 className="text-gray-900 text-3xl font-normal leading-[1.2] max-md:max-w-full">
                      University Research Collaborations
                    </h3>
                    
                    {/* Portland State University Partnership */}
                    <div className="bg-white shadow-[0px_8px_10px_rgba(0,0,0,0.1)] w-full mt-[39px] p-8 rounded-2xl max-md:max-w-full max-md:px-5">
                      <div className="bg-[rgba(0,0,0,0)] flex gap-6 flex-wrap pr-20 pb-2 max-md:max-w-full max-md:pr-5">
                        <div className="bg-[rgba(240,240,240,1)] flex flex-col items-center text-xs text-[rgba(153,153,153,1)] font-normal whitespace-nowrap text-center justify-center">
                          <div>IMG<br />80×80</div>
                        </div>
                        <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch grow shrink-0 basis-0 w-fit mt-2 pb-[9px]">
                          <h4 className="text-gray-900 text-2xl font-bold leading-none">
                            Portland State University
                          </h4>
                          <div className="text-blue-600 text-base font-semibold mt-[17px]">
                            Primary Research Partner
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-[rgba(0,0,0,0)] w-full text-base text-gray-700 font-normal mt-6 max-md:max-w-full">
                        <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-3 flex-wrap">
                          <img
                            src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/cca466ecd0de3079875cfb497a60d0548a0fffd3?placeholderIfAbsent=true"
                            className="aspect-[0.67] object-contain w-4 shrink-0"
                            alt=""
                          />
                          <div className="grow shrink w-[481px] basis-auto max-md:max-w-full">
                            Radar Systems Research Laboratory access
                          </div>
                        </div>
                        <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-3 flex-wrap mt-4">
                          <img
                            src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/6e6472d619b1448bb44e94d668491ccf1148481d?placeholderIfAbsent=true"
                            className="aspect-[0.83] object-contain w-5 shrink-0"
                            alt=""
                          />
                          <div className="grow shrink w-[476px] basis-auto max-md:max-w-full">
                            Graduate student research collaboration
                          </div>
                        </div>
                        <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-3 flex-wrap mt-4">
                          <img
                            src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/1f43408b302413feeaf984c3f22571c5848fc56a?placeholderIfAbsent=true"
                            className="aspect-[0.58] object-contain w-3.5 shrink-0"
                            alt=""
                          />
                          <div className="grow shrink w-[483px] basis-auto max-md:max-w-full">
                            Shared datasets and testing facilities
                          </div>
                        </div>
                        <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-3 flex-wrap mt-4">
                          <img
                            src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/6e3e3300354d84069c6987164d51984d972fbbd6?placeholderIfAbsent=true"
                            className="aspect-[0.5] object-contain w-3 shrink-0"
                            alt=""
                          />
                          <div className="grow shrink w-[486px] basis-auto max-md:max-w-full">
                            Joint publication agreements
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 flex flex-col items-stretch text-sm text-blue-800 font-normal justify-center mt-6 p-4 rounded-lg max-md:max-w-full">
                        <div className="bg-[rgba(0,0,0,0)] flex flex-col pr-20 pb-2 max-md:max-w-full max-md:pr-5">
                          <div className="font-bold leading-none -mt-3.5">Active Projects:</div>
                          <div className="z-10">
                            SFCW radar optimization, privacy-preserving algorithms,
                          </div>
                          <div className="mt-[5px]">clinical validation protocols</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Stanford University Partnership */}
                    <div className="bg-white shadow-[0px_8px_10px_rgba(0,0,0,0.1)] w-full mt-8 p-8 rounded-2xl max-md:max-w-full max-md:px-5">
                      <div className="bg-[rgba(0,0,0,0)] flex gap-6 flex-wrap pr-20 pb-2 max-md:max-w-full max-md:pr-5">
                        <div className="bg-[rgba(240,240,240,1)] flex flex-col items-center text-xs text-[rgba(153,153,153,1)] font-normal whitespace-nowrap text-center justify-center">
                          <div>IMG<br />80×80</div>
                        </div>
                        <div className="bg-[rgba(0,0,0,0)] mt-2 pb-[9px]">
                          <h4 className="text-gray-900 text-2xl font-bold leading-none">
                            Stanford University
                          </h4>
                          <div className="text-red-600 text-base font-semibold mt-[17px] max-md:mr-2.5">
                            Alumni Network & Advisory
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-[rgba(0,0,0,0)] w-full text-base text-gray-700 font-normal mt-6 max-md:max-w-full">
                        <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-3 flex-wrap">
                          <img
                            src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/9e5c646b978c1260845b9afc1adfb137007a1201?placeholderIfAbsent=true"
                            className="aspect-[0.58] object-contain w-3.5 shrink-0"
                            alt=""
                          />
                          <div className="grow shrink w-[483px] basis-auto max-md:max-w-full">
                            Alumni advisory board participation
                          </div>
                        </div>
                        <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-3 flex-wrap mt-4">
                          <img
                            src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/38e20b60583442a040b9129ca23f15d166379e32?placeholderIfAbsent=true"
                            className="aspect-[0.83] object-contain w-5 shrink-0"
                            alt=""
                          />
                          <div className="grow shrink w-[476px] basis-auto max-md:max-w-full">
                            Technology transfer office consultation
                          </div>
                        </div>
                        <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-3 flex-wrap mt-4">
                          <img
                            src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/c666cc36f11bb0f8d62a5fbed631010ad1386fdb?placeholderIfAbsent=true"
                            className="aspect-[0.5] object-contain w-3 shrink-0"
                            alt=""
                          />
                          <div className="grow shrink w-[486px] basis-auto max-md:max-w-full">
                            Innovation lab access privileges
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
                  <div className="bg-[rgba(0,0,0,0)] flex w-full flex-col items-stretch mx-auto pb-[127px] px-2.5 max-md:max-w-full max-md:mt-3.5 max-md:pb-[100px]">
                    <h3 className="text-gray-900 text-3xl font-normal leading-[1.2] ml-[15px] max-md:max-w-full">
                      Industry & Government Partners
                    </h3>
                    
                    {/* Intel Corporation Partnership */}
                    <div className="bg-white shadow-[0px_8px_10px_rgba(0,0,0,0.1)] mt-10 mx-[15px] p-8 rounded-2xl max-md:max-w-full max-md:mr-2.5 max-md:px-5">
                      <div className="bg-[rgba(0,0,0,0)] flex gap-6 flex-wrap pr-20 pb-2 max-md:max-w-full max-md:pr-5">
                        <div className="bg-[rgba(240,240,240,1)] flex flex-col items-center text-xs text-[rgba(153,153,153,1)] font-normal whitespace-nowrap text-center justify-center">
                          <div>IMG<br />80×80</div>
                        </div>
                        <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch grow shrink-0 basis-0 w-fit mt-2 pb-2">
                          <h4 className="text-gray-900 text-2xl font-bold leading-none">
                            Intel Corporation
                          </h4>
                          <div className="text-blue-600 text-base font-semibold mt-[17px]">
                            Technology & Engineering Partner
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-[rgba(0,0,0,0)] w-full text-base text-gray-700 font-normal mt-6 max-md:max-w-full">
                        <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-3 flex-wrap">
                          <img
                            src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/534871b4b418f292e22cc3cae5e93526eb384e24?placeholderIfAbsent=true"
                            className="aspect-[0.67] object-contain w-4 shrink-0"
                            alt=""
                          />
                          <div className="grow shrink w-[481px] basis-auto max-md:max-w-full">
                            RF hardware development expertise
                          </div>
                        </div>
                        <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-3 flex-wrap mt-4">
                          <img
                            src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/08ca3a48d8694cf79f0df1cb31236f5c61fbb269?placeholderIfAbsent=true"
                            className="aspect-[0.83] object-contain w-5 shrink-0"
                            alt=""
                          />
                          <div className="grow shrink w-[476px] basis-auto max-md:max-w-full">
                            Prototype development support
                          </div>
                        </div>
                        <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-3 flex-wrap mt-4">
                          <img
                            src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/4d6cd733252f41b7c11ad919026a82e51baabbf3?placeholderIfAbsent=true"
                            className="aspect-[0.75] object-contain w-[18px] shrink-0"
                            alt=""
                          />
                          <div className="grow shrink w-[478px] basis-auto max-md:max-w-full">
                            Manufacturing scalability consultation
                          </div>
                        </div>
                        <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-3 flex-wrap mt-4">
                          <img
                            src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/76a8360c98f117c921be3ad2de3f3eb0b2bc5d28?placeholderIfAbsent=true"
                            className="aspect-[0.67] object-contain w-4 shrink-0"
                            alt=""
                          />
                          <div className="grow shrink w-[481px] basis-auto max-md:max-w-full">
                            FCC compliance guidance
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Government Partners */}
                    <div className="bg-[rgba(0,0,0,0)] mt-[27px] pt-[5px] pb-[25px] px-[15px] max-md:max-w-full">
                      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                        <div className="w-6/12 max-md:w-full max-md:ml-0">
                          <div className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] flex grow flex-col items-stretch text-xs font-normal text-center w-full p-6 rounded-xl max-md:mt-[29px] max-md:px-5">
                            <div className="bg-[rgba(240,240,240,1)] flex flex-col items-center text-[rgba(153,153,153,1)] whitespace-nowrap justify-center">
                              <div>IMG<br />228×64</div>
                            </div>
                            <h4 className="bg-[rgba(0,0,0,0)] text-base text-gray-900 font-semibold mt-[50px] pb-[13px] px-[7px] max-md:mt-10">
                              <div className="z-10">National Institutes of Health</div>
                            </h4>
                            <p className="bg-[rgba(0,0,0,0)] text-sm text-gray-600 mt-2 pb-[7px] px-[21px] max-md:px-5">
                              <div className="z-10">SBIR/STTR funding recipient</div>
                            </p>
                            <div className="bg-green-100 self-center w-[124px] max-w-full text-green-800 mt-3 pt-0.5 pb-[13px] px-3 rounded-full">
                              <div>Phase I Submitted</div>
                            </div>
                          </div>
                        </div>
                        <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
                          <div className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] flex grow flex-col items-stretch text-xs font-normal text-center w-full p-6 rounded-xl max-md:mt-[29px] max-md:px-5">
                            <div className="bg-[rgba(240,240,240,1)] flex flex-col items-center text-[rgba(153,153,153,1)] whitespace-nowrap justify-center">
                              <div>IMG<br />228×64</div>
                            </div>
                            <h4 className="bg-[rgba(0,0,0,0)] text-base text-gray-900 font-semibold mt-[50px] pb-[9px] px-[13px] max-md:mt-10">
                              <div className="z-10">National Institute on Aging</div>
                            </h4>
                            <p className="bg-[rgba(0,0,0,0)] text-sm text-gray-600 mt-2 pb-[7px] px-4">
                              <div className="z-10">Fall prevention research focus</div>
                            </p>
                            <div className="bg-blue-100 self-center w-[132px] max-w-full text-blue-800 mt-3 pt-0.5 pb-[13px] px-[9px] rounded-full">
                              <div>Active Collaboration</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Research Impact & Recognition */}
            <div className="bg-white shadow-[0px_8px_10px_rgba(0,0,0,0.1)] text-center mt-[19px] mx-[25px] p-8 rounded-3xl max-md:max-w-full max-md:mr-2.5 max-md:px-5">
              <h3 className="text-gray-900 text-3xl font-normal leading-[1.2] max-md:max-w-full">
                Research Impact & Recognition
              </h3>
              
              <div className="bg-[rgba(0,0,0,0)] mt-8 pt-3 pb-[3px] max-md:max-w-full">
                <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                  <div className="w-[33%] max-md:w-full max-md:ml-0">
                    <div className="bg-[rgba(0,0,0,0)] flex grow flex-col items-stretch text-base font-normal w-full pb-4 max-md:mt-6">
                      <img
                        src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/51815f0dfed79062a86816937ccc2e1ece1e3063?placeholderIfAbsent=true"
                        className="aspect-[1] object-contain w-12 self-center"
                        alt=""
                      />
                      <div className="text-gray-900 text-4xl font-bold whitespace-nowrap mt-6 pb-5">
                        <span className="font-normal">12+</span>
                      </div>
                      <div className="text-gray-600 font-semibold pb-[13px]">
                        Published Papers
                      </div>
                      <div className="text-gray-500 pb-2.5 px-3">
                        Peer-reviewed publications in leading journals
                      </div>
                    </div>
                  </div>
                  <div className="w-[33%] ml-5 max-md:w-full max-md:ml-0">
                    <div className="bg-[rgba(0,0,0,0)] flex grow flex-col items-stretch text-base font-normal w-full pb-4 max-md:mt-6">
                      <img
                        src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/a7da1f1f78b24a913ee26bc17a50ab1f4e9e2a99?placeholderIfAbsent=true"
                        className="aspect-[1] object-contain w-12 self-center"
                        alt=""
                      />
                      <div className="text-gray-900 text-4xl font-bold whitespace-nowrap mt-6 pb-5">
                        <span className="font-normal">450+</span>
                      </div>
                      <div className="text-gray-600 font-semibold pb-[13px]">
                        Total Citations
                      </div>
                      <div className="text-gray-500 pb-2.5 px-[15px]">
                        Growing impact in fall prevention research
                      </div>
                    </div>
                  </div>
                  <div className="w-[33%] ml-5 max-md:w-full max-md:ml-0">
                    <div className="bg-[rgba(0,0,0,0)] flex grow flex-col items-stretch text-base font-normal w-full pb-4 max-md:mt-6">
                      <img
                        src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/eb4e9b1e7f5c9e1dd5c0f34a5d5f9c4ad2d4ed40?placeholderIfAbsent=true"
                        className="aspect-[1] object-contain w-12 self-center"
                        alt=""
                      />
                      <div className="text-gray-900 text-4xl font-bold whitespace-nowrap mt-6 pb-5">
                        <span className="font-normal">h-index: 8</span>
                      </div>
                      <div className="text-gray-600 font-semibold pb-[13px]">
                        Research Influence
                      </div>
                      <div className="text-gray-500 pb-2.5 px-3">
                        Demonstrating sustained research impact
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-[rgba(0,0,0,0)] mt-8 pt-3 pb-[3px] max-md:max-w-full">
                <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                  <div className="w-6/12 max-md:w-full max-md:ml-0">
                    <div className="bg-[rgba(0,0,0,0)] flex grow flex-col items-stretch text-base font-normal w-full pb-4 max-md:mt-6">
                      <img
                        src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/9e8d1f5e8c3a4e0f8d7c6b5a4d3c2b1a0e9f8d7c?placeholderIfAbsent=true"
                        className="aspect-[1] object-contain w-12 self-center"
                        alt=""
                      />
                      <div className="text-gray-900 text-4xl font-bold whitespace-nowrap mt-6 pb-5">
                        <span className="font-normal">3</span>
                      </div>
                      <div className="text-gray-600 font-semibold pb-[13px]">
                        Patents Filed
                      </div>
                      <div className="text-gray-500 pb-2.5 px-[34px] max-md:px-5">
                        Protecting innovative radar sensing technology
                      </div>
                    </div>
                  </div>
                  <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
                    <div className="bg-[rgba(0,0,0,0)] flex grow flex-col items-stretch text-base font-normal w-full pb-4 max-md:mt-6">
                      <img
                        src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/7f6e5d4c3b2a1e0d9c8b7a6f5e4d3c2b1a0f9e8d?placeholderIfAbsent=true"
                        className="aspect-[1] object-contain w-12 self-center"
                        alt=""
                      />
                      <div className="text-gray-900 text-4xl font-bold whitespace-nowrap mt-6 pb-5">
                        <span className="font-normal">5</span>
                      </div>
                      <div className="text-gray-600 font-semibold pb-[13px]">
                        Industry Awards
                      </div>
                      <div className="text-gray-500 pb-2.5 px-[22px]">
                        Recognition for innovation in healthcare technology
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <PublicationsSection />
        <CollaborationSection />
        <Footer />
      </div>
    </div>
  );
};

export default AcademicValidation;
