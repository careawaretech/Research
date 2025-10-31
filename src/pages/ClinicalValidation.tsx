import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import HeroSection from '@/components/HeroSection';
import MetricCard from '@/components/MetricCard';
import PerformanceTable from '@/components/PerformanceTable';
import Timeline from '@/components/Timeline';
import StudyCard from '@/components/StudyCard';
import { ContactForm } from '@/components/ContactForm';
import ComplianceCard from '@/components/ComplianceCard';
import { Shield, FileCheck, Lock, Globe, CheckCircle, Clock, Calendar, Activity, Heart, Wifi, Zap, X, Download, Users } from 'lucide-react';

const ClinicalValidation = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/', isActive: false },
    { label: 'Research', href: '#', isActive: false },
    { label: 'Clinical Validation', isActive: true }
  ];

  return (
    <div className="bg-white overflow-hidden rounded-lg border-[rgba(206,212,218,1)] border-solid border-2">
      <div className="bg-gray-50 w-full max-md:max-w-full">
        <Header />
        <Breadcrumb items={breadcrumbItems} />
        
        <HeroSection pageSlug="clinical-validation" />
        
        {/* Clinical Validation Overview Section */}
        <section className="bg-white w-full py-16 lg:py-20 px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-stretch font-normal text-center max-md:max-w-full">
              <img
                src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/297b17ddd313c51c15aa07399f25c58e15455d95?placeholderIfAbsent=true"
                alt="Clinical Validation Icon"
                className="aspect-[1] object-contain w-16 self-center rounded-full"
              />
              <h2 className="text-gray-900 text-4xl leading-none self-center mt-6 max-md:max-w-full">
                Clinical Validation Overview
              </h2>
              <p className="text-gray-600 text-xl leading-7 mt-[37px] max-md:max-w-full max-md:mr-2.5">
                Comprehensive clinical validation demonstrating the safety, efficacy, and commercial viability of our dual-technology platform across diverse healthcare environments
              </p>
              <div className="flex w-[1024px] shrink-0 max-w-full h-px mt-10 bg-gray-200" />
            </div>
            
            {/* Three Column Feature Cards */}
            <div className="mt-[31px] max-md:max-w-full">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                <div className="w-[33%] max-md:w-full max-md:ml-0">
                  <article className="grow text-base p-8 rounded-2xl max-md:mt-8 max-md:pl-5 bg-blue-50">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/5e6a9c38d80c97371ad8dd30a9e7c47b458b4534?placeholderIfAbsent=true"
                      alt="Clinical Performance Icon"
                      className="aspect-[1] object-contain w-12 rounded-full"
                    />
                    <h3 className="text-blue-900 text-2xl font-bold leading-none mt-6 max-md:mr-[7px]">
                      Clinical-Grade Performance
                    </h3>
                    <p className="text-blue-800 font-normal leading-6 mt-[29px]">
                      SFCW Radar technology achieves medical device-level accuracy with 98.9% sensitivity and 99% specificity in controlled clinical environments.
                    </p>
                    <div className="w-full mt-9 max-md:mr-1.5">
                      <div className="flex items-stretch gap-5 justify-between pb-[9px] max-md:mr-[7px]">
                        <span className="text-blue-700 font-medium">FDA Pathway</span>
                        <span className="text-blue-900 font-bold">Class II</span>
                      </div>
                      <div className="flex gap-5 justify-between mt-3 pb-3">
                        <span className="text-blue-700 font-medium">Clinical Sites</span>
                        <span className="text-blue-900 font-bold">3 Facilities</span>
                      </div>
                      <div className="flex items-stretch gap-5 justify-between mt-3 pb-[9px]">
                        <span className="text-blue-700 font-medium">Study Duration</span>
                        <span className="text-blue-900 font-bold">6 Months</span>
                      </div>
                    </div>
                  </article>
                </div>
                
                <div className="w-[33%] ml-5 max-md:w-full max-md:ml-0">
                  <article className="flex grow flex-col items-stretch text-base pt-8 pb-14 px-8 rounded-2xl max-md:mt-8 max-md:px-5 bg-green-50">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/4f9139b90b1d7de497d93e77ff0ae63c0f61cd53?placeholderIfAbsent=true"
                      alt="Research Foundation Icon"
                      className="aspect-[1] object-contain w-12 rounded-full"
                    />
                    <h3 className="text-green-900 text-2xl font-bold leading-none mt-6">
                      Research Foundation
                    </h3>
                    <p className="text-green-800 font-normal leading-6 mt-[29px] max-md:mr-[7px]">
                      Peer-reviewed publications and academic partnerships establish scientific credibility and support NIH SBIR/STTR applications.
                    </p>
                    <div className="w-full mt-[33px]">
                      <div className="flex items-stretch gap-5 justify-between pb-[9px]">
                        <span className="text-green-700 font-medium">Publications</span>
                        <span className="text-green-900 font-bold">8 Papers</span>
                      </div>
                      <div className="flex gap-5 justify-between mt-3 pb-3">
                        <span className="text-green-700 font-medium">Citations</span>
                        <span className="text-green-900 font-bold">287+</span>
                      </div>
                      <div className="flex gap-5 justify-between mt-3 pb-3 max-md:mr-1">
                        <span className="text-green-700 font-medium">Collaborations</span>
                        <span className="text-green-900 font-bold">PSU + Intel</span>
                      </div>
                    </div>
                  </article>
                </div>
                
                <div className="w-[33%] ml-5 max-md:w-full max-md:ml-0">
                  <article className="flex grow flex-col items-stretch text-base pt-8 pb-14 px-8 rounded-2xl max-md:mt-8 max-md:pl-5 bg-purple-50">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/921eaeb2de6998fbe80a2e3597978be41e2b9bef?placeholderIfAbsent=true"
                      alt="Privacy Leadership Icon"
                      className="aspect-[1] object-contain w-12 rounded-full"
                    />
                    <h3 className="text-purple-900 text-2xl font-bold leading-none mt-6">
                      Privacy Leadership
                    </h3>
                    <p className="text-purple-800 font-normal leading-6 mt-[25px]">
                      Physics-based privacy protection enables monitoring in bathroom environments where 80% of elderly falls occur.
                    </p>
                    <div className="w-full mt-[33px] max-md:mr-1">
                      <div className="flex items-stretch gap-5 justify-between pb-[9px] max-md:mr-[5px]">
                        <span className="text-purple-700 font-medium">Privacy Complaints</span>
                        <span className="text-purple-900 font-bold">Zero</span>
                      </div>
                      <div className="flex items-stretch gap-5 justify-between mt-3 pb-2 max-md:mr-0.5">
                        <span className="text-purple-700 font-medium">HIPAA Status</span>
                        <span className="text-purple-900 font-bold">Aligned</span>
                      </div>
                      <div className="flex items-stretch gap-5 justify-between mt-3 pb-2">
                        <span className="text-purple-700 font-medium">Camera Data</span>
                        <span className="text-purple-900 font-bold">Impossible</span>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
            
            <Timeline />
            <PerformanceTable />
            
            {/* Download Section */}
            <div className="text-base text-center mt-12 max-md:max-w-full max-md:mt-10">
              <div className="flex flex-col items-center p-8 rounded-2xl max-md:max-w-full max-md:px-5">
                <h3 className="text-gray-900 text-2xl font-bold leading-none">
                  Access Detailed Clinical Evidence
                </h3>
                <p className="text-gray-600 font-normal leading-6 mt-[29px] max-md:max-w-full">
                  Download our comprehensive clinical validation report including study protocols, statistical analysis, and regulatory pathway documentation.
                </p>
                <div className="self-stretch flex w-full flex-col items-center font-semibold mt-[33px] px-[70px] max-md:max-w-full max-md:px-5">
                  <div className="flex w-[420px] max-w-full items-stretch gap-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white pt-[11px] pb-[22px] px-[21px] rounded-lg transition-colors">
                      Download Full Report
                    </button>
                    <button className="bg-white hover:bg-gray-50 text-blue-900 border border-blue-200 pt-[11px] pb-[22px] px-[18px] rounded-lg transition-colors">
                      View Study Protocols
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Radar Clinical Performance Section */}
        <section className="bg-white w-full py-16 lg:py-20 px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center font-normal text-center max-md:max-w-full">
              <div className="flex w-[798px] max-w-full flex-col items-stretch">
                <img
                  src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/44833feefb47481ae3369dfe652cbac0cefc01f3?placeholderIfAbsent=true"
                  alt="Radar Performance Icon"
                  className="aspect-[1] object-contain w-16 self-center rounded-full"
                />
                <h2 className="text-gray-900 text-4xl leading-none self-center mt-6 max-md:max-w-full">
                  Radar Clinical Performance
                </h2>
                <p className="text-gray-600 text-xl leading-7 ml-4 mt-9 max-md:max-w-full max-md:mr-[5px]">
                  Validated clinical-grade performance metrics from controlled testing environments and pilot studies
                </p>
                <img
                  src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/84c92201f34b8dcfeea876527d9d75bdb2189a70?placeholderIfAbsent=true"
                  alt="Radar Performance Chart"
                  className="aspect-[2.79] object-contain w-full mt-9 max-md:max-w-full"
                />
              </div>
            </div>
            
            {/* Performance Results Grid */}
            <div className="mt-[39px] max-md:max-w-full">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                <div className="w-6/12 max-md:w-full max-md:ml-0">
                  <div className="grow w-full max-md:max-w-full max-md:mt-[18px]">
                    <div className="font-normal max-md:max-w-full">
                      <div className="flex flex-col pl-[15px] pr-20 max-md:max-w-full max-md:pr-5">
                        <h3 className="text-gray-900 text-3xl leading-[1.2]">
                          Clinical Validation Results
                        </h3>
                        <p className="text-gray-600 text-base mt-[37px] max-md:max-w-full">
                          Comprehensive testing across multiple scenarios and environments
                        </p>
                      </div>
                      <img
                        src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/0f9f29f6737d14e4e6173eac26eca6dc5bff9c16?placeholderIfAbsent=true"
                        alt="Validation Results Chart"
                        className="aspect-[2.76] object-contain w-full mt-9 max-md:max-w-full"
                      />
                    </div>
                    
                    {/* Bathroom Testing Card */}
                    <div className="mt-[7px] max-md:max-w-full max-md:mr-2.5">
                      <div className="flex w-full flex-col items-stretch pt-3.5 pb-[31px] px-6 rounded-xl max-md:max-w-full max-md:pl-5 bg-gray-50">
                        <div className="flex w-full items-stretch gap-5 flex-wrap justify-between pr-2.5 py-2.5 max-md:max-w-full">
                          <h4 className="text-gray-900 text-xl font-semibold leading-[1.4]">
                            Bathroom Environment Testing
                          </h4>
                          <span className="bg-green-100 shadow-[0px_0px_10px_rgba(34,197,94,0.208)] flex items-stretch gap-1 text-sm text-green-800 font-medium px-3 py-[5px] rounded-full">
                            <CheckCircle className="w-3.5 h-3.5 mt-1" />
                            Validated
                          </span>
                        </div>
                        <div className="flex items-stretch gap-4 text-center flex-wrap mt-1.5 max-md:max-w-full max-md:mr-2.5">
                          <div className="bg-white flex-1 grow shrink-0 basis-0 w-fit p-4 rounded-lg">
                            <div className="flex flex-col items-center text-2xl text-blue-600 font-bold pb-[17px] px-[70px] max-md:px-5">
                              <div className="z-10 -mt-1">97.8%</div>
                            </div>
                            <div className="flex flex-col items-center text-sm text-blue-800 font-normal pb-2 px-[70px] max-md:px-5">
                              <div className="z-10">Sensitivity</div>
                            </div>
                          </div>
                          <div className="bg-white flex-1 grow shrink-0 basis-0 w-fit p-4 rounded-lg">
                            <div className="flex flex-col items-center text-2xl text-green-600 font-bold pb-[17px] px-[70px] max-md:px-5">
                              <div className="z-10 -mt-1">98.5%</div>
                            </div>
                            <div className="flex flex-col items-center text-sm text-green-800 font-normal pb-[7px] px-[70px] max-md:px-5">
                              <div className="z-10">Specificity</div>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm font-normal leading-5 mt-4 max-md:max-w-full">
                          Critical validation in privacy-sensitive environments where camera systems cannot operate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
                  <div className="grow w-full pb-[115px] max-md:max-w-full max-md:mt-[18px] max-md:pb-[100px]">
                    <div className="flex flex-col items-stretch text-3xl text-gray-900 font-normal leading-[1.2] pb-[25px] px-[15px] max-md:max-w-full">
                      <h3>Performance Comparison</h3>
                      <div className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] flex shrink-0 h-[400px] mt-[31px] rounded-xl max-md:max-w-full" />
                    </div>
                    
                    {/* Competitive Analysis Table */}
                    <div className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] mt-[7px] p-6 rounded-xl max-md:max-w-full max-md:mr-2.5 max-md:px-5">
                      <h4 className="text-xl text-gray-900 font-semibold pb-[11px] max-md:max-w-full max-md:pr-5">
                        Competitive Benchmark Analysis
                      </h4>
                      <div className="overflow-hidden text-base text-center mt-6 max-md:max-w-full">
                        <table className="w-full">
                          <thead className="bg-gray-50 font-semibold">
                            <tr>
                              <th className="text-gray-900 pt-[23px] pb-[37px] px-[47px] max-md:px-5">Metric</th>
                              <th className="text-blue-900 pt-[11px] pb-[25px] px-[23px] max-md:px-5">
                                <div>Care Aware</div>
                                <div className="mt-3">Radar</div>
                              </th>
                              <th className="text-gray-700 pt-[11px] pb-[22px] px-6 max-md:px-5">
                                <div>Industry</div>
                                <div className="mt-[9px]">Average</div>
                              </th>
                              <th className="text-red-700 pt-[11px] pb-[22px] px-7 max-md:px-5">
                                <div>Camera</div>
                                <div className="mt-3">Systems</div>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="font-normal">
                            <tr>
                              <td className="text-gray-900 font-medium pt-3 pb-[23px] px-8 max-md:px-5">Sensitivity</td>
                              <td className="text-blue-600 font-bold pt-3 pb-[26px] px-[43px] max-md:px-5">98.9%</td>
                              <td className="text-gray-600 pt-3 pb-[26px] px-[30px] max-md:px-5">92-95%</td>
                              <td className="text-red-600 pt-3 pb-[26px] px-[38px] max-md:px-5">85-90%*</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="text-gray-900 font-medium pt-3 pb-[23px] px-8 max-md:px-5">Specificity</td>
                              <td className="text-blue-600 font-bold pt-3 pb-[26px] px-[43px] max-md:px-5">99.0%</td>
                              <td className="text-gray-600 pt-3 pb-[26px] px-[30px] max-md:px-5">88-92%</td>
                              <td className="text-red-600 pt-3 pb-[26px] px-[38px] max-md:px-5">78-85%*</td>
                            </tr>
                            <tr>
                              <td className="text-gray-900 font-medium pt-[11px] pb-[26px] px-7 max-md:px-5">
                                <div>Response</div>
                                <div className="mt-[9px]">Time</div>
                              </td>
                              <td className="text-blue-600 font-bold pt-6 pb-[37px] px-[42px] max-md:px-5">&lt;2 sec</td>
                              <td className="text-gray-600 pt-6 pb-[37px] px-[31px] max-md:px-5">3-8 sec</td>
                              <td className="text-red-600 pt-6 pb-[37px] px-[39px] max-md:px-5">5-15 sec</td>
                            </tr>
                            <tr className="bg-gray-50 font-medium">
                              <td className="text-gray-900 pt-[11px] pb-[22px] px-[27px] max-md:px-5">
                                <div>Privacy</div>
                                <div className="mt-[9px]">Compliance</div>
                              </td>
                              <td className="pt-[11px] pb-[26px] px-[42px] max-md:px-5">
                                <span className="bg-green-100 flex w-24 items-stretch gap-1 px-2 py-1 rounded-full text-green-800 text-xs font-medium">
                                  <CheckCircle className="w-3 h-3 mt-1" />
                                  Physics-Based
                                </span>
                              </td>
                              <td className="pt-3 pb-[26px] px-[27px] max-md:px-5">
                                <span className="bg-yellow-100 flex w-[93px] items-stretch gap-1 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                                  <Clock className="w-3 h-3 mt-1" />
                                  Varies
                                </span>
                              </td>
                              <td className="pt-3 pb-[26px] px-[30px] max-md:px-5">
                                <span className="bg-red-100 flex w-[91px] items-stretch gap-1 px-2 py-1 rounded-full text-red-800 text-xs font-medium">
                                  <X className="w-3 h-3 mt-1" />
                                  Restricted
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="text-gray-600 text-xs font-normal leading-none mt-[30px] pb-px px-11 max-md:px-5">
                        *Camera systems restricted in bathroom environments
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Clinical Study Results */}
          <div className="mt-16 max-md:mt-10 max-w-6xl mx-auto">
            <StudyCard
              title="Fall Detection Validation Study"
              description="Comprehensive clinical validation of SFCW radar technology for fall detection in controlled and real-world assisted living environments"
              participants="150 Participants"
              duration="6 Months"
              status="Complete"
              statusColor="bg-green-100 text-green-800"
              metrics={[
                { value: "98.9%", label: "Sensitivity", color: "bg-blue-50 text-blue-900" },
                { value: "99.0%", label: "Specificity", color: "bg-green-50 text-green-900" },
                { value: "< 2 sec", label: "Response Time", color: "bg-purple-50 text-purple-900" },
              ]}
              findings={[
                "Zero false negatives in 450+ monitored fall events",
                "Less than 1% false alarm rate across all environments",
                "Successful bathroom deployment with full privacy protection",
                "Consistent performance across diverse patient demographics"
              ]}
              publication="Clinical Validation Results - Q3 2024"
              icon={
                <img
                  src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/bcad37829243ca6f199e141e89f1c165c4cbcdd4?placeholderIfAbsent=true"
                  alt="Clinical Study Results Icon"
                  className="aspect-[1] object-contain w-[120px] rounded-xl"
                />
              }
            />
          </div>
        </section>
        
        {/* WiFi Platform Clinical Development Section */}
        <section className="bg-gradient-to-br from-green-50 to-teal-50 w-full py-16 lg:py-20 px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center font-normal text-center max-md:max-w-full">
              <div className="flex w-[798px] max-w-full flex-col items-stretch">
                <img
                  src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/2393378e318148c744172c49111f1eed3dd3dbcf?placeholderIfAbsent=true"
                  alt="WiFi Performance Icon"
                  className="aspect-[1] object-contain w-16 self-center rounded-full"
                />
                <h2 className="text-gray-900 text-4xl leading-none self-center mt-6 max-md:max-w-full">
                  WiFi Platform Development
                </h2>
                <p className="text-gray-600 text-xl leading-7 ml-4 mt-9 max-md:max-w-full max-md:mr-[5px]">
                  Patent-pending WiFi signal analysis platform currently in development and validation phase
                </p>
                <img
                  src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/e878c81de2ab8da11d4b4755955ace65c8539fab?placeholderIfAbsent=true"
                  alt="WiFi Performance Chart"
                  className="aspect-[2.79] object-contain w-full mt-9 max-md:max-w-full"
                />
              </div>
            </div>
            
            {/* Development Status Grid */}
            <div className="mt-[39px] max-md:max-w-full">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                <div className="w-6/12 max-md:w-full max-md:ml-0">
                  <div className="grow w-full max-md:max-w-full max-md:mt-[18px]">
                    <div className="font-normal max-md:max-w-full">
                      <div className="flex flex-col pl-[15px] pr-20 max-md:max-w-full max-md:pr-5">
                        <h3 className="text-gray-900 text-3xl leading-[1.2]">
                          Current Development Stage
                        </h3>
                        <p className="text-gray-600 text-base mt-[37px] max-md:max-w-full">
                          Ongoing technical validation and algorithm optimization
                        </p>
                      </div>
                      <img
                        src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/6d2743f94836b15fcaf0c6faedf4566621b855cb?placeholderIfAbsent=true"
                        alt="Current Performance Chart"
                        className="aspect-[2.76] object-contain w-full mt-9 max-md:max-w-full"
                      />
                    </div>
                    
                    {/* Development Phase Card */}
                    <div className="mt-[7px] max-md:max-w-full max-md:mr-2.5">
                      <div className="flex w-full flex-col items-stretch pt-3.5 pb-[31px] px-6 rounded-xl max-md:max-w-full max-md:pl-5 bg-white">
                        <div className="flex w-full items-stretch gap-5 flex-wrap justify-between pr-2.5 py-2.5 max-md:max-w-full">
                          <h4 className="text-gray-900 text-xl font-semibold leading-[1.4]">
                            Algorithm Development Status
                          </h4>
                          <span className="bg-blue-100 shadow-[0px_0px_10px_rgba(59,130,246,0.208)] flex items-stretch gap-1 text-sm text-blue-800 font-medium px-3 py-[5px] rounded-full">
                            <Activity className="w-3.5 h-3.5 mt-1" />
                            In Progress
                          </span>
                        </div>
                        <div className="flex items-stretch gap-4 text-center flex-wrap mt-1.5 max-md:max-w-full max-md:mr-2.5">
                          <div className="bg-gray-50 flex-1 grow shrink-0 basis-0 w-fit p-4 rounded-lg">
                            <div className="flex flex-col items-center text-2xl text-blue-600 font-bold pb-[17px] px-[70px] max-md:px-5">
                              <div className="z-10 -mt-1">Q2 2025</div>
                            </div>
                            <div className="flex flex-col items-center text-sm text-blue-800 font-normal pb-2 px-[70px] max-md:px-5">
                              <div className="z-10">Target Completion</div>
                            </div>
                          </div>
                          <div className="bg-gray-50 flex-1 grow shrink-0 basis-0 w-fit p-4 rounded-lg">
                            <div className="flex flex-col items-center text-2xl text-green-600 font-bold pb-[17px] px-[70px] max-md:px-5">
                              <div className="z-10 -mt-1">Phase II</div>
                            </div>
                            <div className="flex flex-col items-center text-sm text-green-800 font-normal pb-[7px] px-[70px] max-md:px-5">
                              <div className="z-10">Clinical Trials</div>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm font-normal leading-5 mt-4 max-md:max-w-full">
                          Leveraging existing WiFi infrastructure for cost-effective deployment
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
                  <div className="grow w-full pb-[115px] max-md:max-w-full max-md:mt-[18px] max-md:pb-[100px]">
                    <div className="flex flex-col items-stretch text-3xl text-gray-900 font-normal leading-[1.2] pb-[25px] px-[15px] max-md:max-w-full">
                      <h3>Platform Advantages</h3>
                    </div>
                    
                    {/* Advantages List */}
                    <div className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] mt-[7px] p-6 rounded-xl max-md:max-w-full max-md:mr-2.5 max-md:px-5">
                      <h4 className="text-xl text-gray-900 font-semibold pb-[11px] max-md:max-w-full max-md:pr-5">
                        Key Technology Benefits
                      </h4>
                      <div className="mt-6 space-y-4">
                        <div className="flex items-start gap-3">
                          <Wifi className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                          <div>
                            <h5 className="text-base font-semibold text-gray-900">Zero Additional Hardware</h5>
                            <p className="text-sm text-gray-600 mt-1">Uses existing WiFi infrastructure with software-only deployment</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Zap className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                          <div>
                            <h5 className="text-base font-semibold text-gray-900">Rapid Scalability</h5>
                            <p className="text-sm text-gray-600 mt-1">Remote deployment and configuration across multiple facilities</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Lock className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                          <div>
                            <h5 className="text-base font-semibold text-gray-900">Privacy-First Design</h5>
                            <p className="text-sm text-gray-600 mt-1">No cameras or wearables required - maintains resident dignity</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Heart className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                          <div>
                            <h5 className="text-base font-semibold text-gray-900">Complementary Technology</h5>
                            <p className="text-sm text-gray-600 mt-1">Enhances radar coverage for whole-facility monitoring</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Development Timeline */}
                    <div className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] mt-6 p-6 rounded-xl max-md:max-w-full max-md:mr-2.5 max-md:px-5">
                      <h4 className="text-xl text-gray-900 font-semibold pb-[11px] max-md:max-w-full max-md:pr-5">
                        Development Roadmap
                      </h4>
                      <div className="mt-6 space-y-4">
                        <div className="flex items-stretch gap-4">
                          <span className="bg-green-100 flex items-center gap-1 px-3 py-1 rounded-full text-green-800 text-xs font-medium whitespace-nowrap h-fit">
                            <CheckCircle className="w-3 h-3" />
                            Complete
                          </span>
                          <div>
                            <h5 className="text-base font-semibold text-gray-900">Phase I - Algorithm Development</h5>
                            <p className="text-sm text-gray-600 mt-1">Patent filing and initial proof of concept</p>
                          </div>
                        </div>
                        <div className="flex items-stretch gap-4">
                          <span className="bg-blue-100 flex items-center gap-1 px-3 py-1 rounded-full text-blue-800 text-xs font-medium whitespace-nowrap h-fit">
                            <Activity className="w-3 h-3" />
                            Active
                          </span>
                          <div>
                            <h5 className="text-base font-semibold text-gray-900">Phase II - Clinical Validation</h5>
                            <p className="text-sm text-gray-600 mt-1">Multi-site testing and performance optimization</p>
                          </div>
                        </div>
                        <div className="flex items-stretch gap-4">
                          <span className="bg-gray-100 flex items-center gap-1 px-3 py-1 rounded-full text-gray-600 text-xs font-medium whitespace-nowrap h-fit">
                            <Calendar className="w-3 h-3" />
                            Planned
                          </span>
                          <div>
                            <h5 className="text-base font-semibold text-gray-900">Phase III - Commercial Deployment</h5>
                            <p className="text-sm text-gray-600 mt-1">Full integration with Care Aware platform</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* WiFi Study Card */}
          <div className="mt-16 max-md:mt-10 max-w-6xl mx-auto">
            <StudyCard
              title="WiFi Signal Analysis Feasibility Study"
              description="Initial validation of WiFi CSI analysis for fall detection and activity monitoring in assisted living environments"
              participants="50 Participants"
              duration="3 Months"
              status="In Progress"
              statusColor="bg-blue-100 text-blue-800"
              metrics={[
                { value: "Q2 2025", label: "Expected Completion", color: "bg-blue-50 text-blue-900" },
                { value: "2 Sites", label: "Testing Locations", color: "bg-green-50 text-green-900" },
                { value: "TBD", label: "Performance Metrics", color: "bg-gray-50 text-gray-600" },
              ]}
              findings={[
                "Initial proof of concept successful in controlled environments",
                "Algorithm optimization ongoing for real-world conditions",
                "Cost model shows significant deployment savings vs. hardware solutions",
                "Integration with radar system demonstrates complementary coverage"
              ]}
              publication="Development Progress Report - Q1 2025"
              icon={
                <img
                  src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/8a2aa1ac86f39a2117bffc54bc9739c51883c505?placeholderIfAbsent=true"
                  alt="Study Results Overview"
                  className="aspect-[1] object-contain w-[120px] rounded-xl"
                />
              }
            />
          </div>
        </section>
        
        {/* Regulatory Compliance Section */}
        <section className="bg-white w-full py-16 lg:py-20 px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center font-normal text-center max-md:max-w-full">
              <img
                src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/8b7d86d82674a33a0d6e0daa0ae94970ae1caedc?placeholderIfAbsent=true"
                alt="Regulatory Compliance Icon"
                className="aspect-[1] object-contain w-16 self-center rounded-full"
              />
              <h2 className="text-gray-900 text-4xl leading-none self-center mt-6 max-md:max-w-full">
                Regulatory & Compliance Framework
              </h2>
              <p className="text-gray-600 text-xl leading-7 mt-[37px] max-md:max-w-full">
                Comprehensive regulatory strategy ensuring compliance across privacy, data protection, and medical device regulations
              </p>
              <div className="flex w-[1024px] shrink-0 max-w-full h-px mt-10 bg-gray-200" />
            </div>
            
            {/* Regulatory Overview Image */}
            <div className="mt-12 max-md:mt-10">
              <img
                src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/0aa8f2e2b7704e5eba87a7f821227a1f30209d81?placeholderIfAbsent=true"
                alt="Regulatory Overview"
                className="aspect-[2.8] object-contain w-full max-w-4xl mx-auto rounded-xl shadow-lg"
              />
            </div>
            
            {/* Compliance Cards Grid */}
            <div className="mt-12 max-md:mt-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1 md:col-span-2">
                  <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                    <div className="w-[25%] max-md:w-full max-md:ml-0">
                      <ComplianceCard
                        title="FDA Class II Pathway"
                        description="Medical device classification for SFCW radar system"
                        icon={<FileCheck className="w-12 h-12 text-blue-600" />}
                        borderColor="border-blue-200"
                        titleColor="text-blue-900"
                      />
                    </div>
                    <div className="w-[25%] ml-5 max-md:w-full max-md:ml-0">
                      <ComplianceCard
                        title="HIPAA Alignment"
                        description="Privacy protections for healthcare data"
                        icon={<Shield className="w-12 h-12 text-green-600" />}
                        borderColor="border-green-200"
                        titleColor="text-green-900"
                      />
                    </div>
                    <div className="w-[25%] ml-5 max-md:w-full max-md:ml-0">
                      <ComplianceCard
                        title="FCC Certification"
                        description="Radio frequency emission compliance"
                        icon={<Zap className="w-12 h-12 text-purple-600" />}
                        borderColor="border-purple-200"
                        titleColor="text-purple-900"
                      />
                    </div>
                    <div className="w-[25%] ml-5 max-md:w-full max-md:ml-0">
                      <ComplianceCard
                        title="International Standards"
                        description="Data protection by design"
                        icon={<Globe className="w-12 h-12 text-orange-600" />}
                        borderColor="border-orange-200"
                        titleColor="text-orange-900"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Privacy Advantage Section */}
            <div className="flex flex-col items-stretch mt-8 p-6 rounded-xl max-md:max-w-full max-md:px-5 bg-gray-50">
              <h4 className="text-gray-900 text-xl font-semibold leading-[1.4]">Privacy by Physics Advantage</h4>
              <div className="w-full text-base text-gray-700 font-normal mt-6 max-md:max-w-full space-y-3">
                <div className="flex items-stretch gap-3 flex-wrap py-0.5">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                  <span className="grow shrink w-[500px] basis-auto max-md:max-w-full">No visual data collection possible</span>
                </div>
                <div className="flex items-stretch gap-3 flex-wrap mt-3 py-0.5">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                  <span className="grow shrink w-[500px] basis-auto max-md:max-w-full">Anonymous motion signature detection</span>
                </div>
                <div className="flex items-stretch gap-3 flex-wrap mt-3 py-0.5">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                  <span className="grow shrink w-[505px] basis-auto max-md:max-w-full">On-premises processing option</span>
                </div>
                <div className="flex items-stretch gap-3 flex-wrap mt-3 py-0.5">
                  <CheckCircle className="w-3.5 h-3.5 text-green-600 mt-1" />
                  <span className="grow shrink w-[507px] basis-auto max-md:max-w-full">Automatic data purging protocols</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section with Forms */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 w-full py-16 lg:py-20 px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center font-normal text-center max-md:max-w-full">
              <h2 className="text-white text-4xl leading-none self-center mt-6 max-md:max-w-full">
                Partner With Us
              </h2>
              <p className="text-blue-100 text-xl leading-7 mt-6 max-md:max-w-full">
                Join our clinical validation program or explore partnership opportunities
              </p>
            </div>
            
            <div className="mt-12 max-md:mt-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ContactForm
                  type="download"
                  title="Download Clinical Data"
                  description="Access detailed validation reports and study protocols"
                  buttonText="Request Access"
                  buttonColor="bg-blue-600 hover:bg-blue-700"
                  icon={<Download className="w-12 h-12 text-blue-300" />}
                />
                <ContactForm
                  type="partner"
                  title="Partnership Inquiries"
                  description="Explore collaboration opportunities with our research team"
                  buttonText="Contact Us"
                  buttonColor="bg-green-600 hover:bg-green-700"
                  icon={<Users className="w-12 h-12 text-green-300" />}
                />
                <ContactForm
                  type="consultation"
                  title="Schedule Consultation"
                  description="Discuss deployment options for your facility"
                  buttonText="Book Meeting"
                  buttonColor="bg-purple-600 hover:bg-purple-700"
                  icon={<Calendar className="w-12 h-12 text-purple-300" />}
                />
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </div>
  );
};

export default ClinicalValidation;
