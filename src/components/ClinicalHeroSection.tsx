import React from 'react';
import MetricCard from './MetricCard';
import { CheckCircle, Shield, FileText } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="w-full py-16 lg:py-20 px-6 lg:px-8 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center px-[30px] max-md:max-w-full max-md:px-5">
          <img
            src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/21b2806ca81fb7237688c17e6ca5fe480fe54027?placeholderIfAbsent=true"
            alt="Care Aware Tech Logo"
            className="aspect-[1] object-contain w-20 rounded-full"
          />
          <h1 className="text-white text-6xl font-normal leading-none text-center self-stretch mt-6 max-md:max-w-full max-md:text-[40px]">
            Clinical Validation & Performance Metrics
          </h1>
          <p className="text-blue-100 text-xl font-normal leading-7 text-center mt-[38px] max-md:max-w-full">
            Comprehensive data demonstrating technical feasibility, clinical efficacy, and commercial viability of our dual-technology platform
          </p>
          
          <div className="flex w-full max-w-[996px] flex-col mt-[15px] py-6 max-md:max-w-full">
            <div className="shadow-[0px_25px_50px_rgba(0,0,0,0.25)] self-center w-[896px] max-w-full overflow-hidden rounded-2xl">
              <img
                src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/6a2d62fa5aa8cecdfc55b8b6e05a2a1c6ff3efba?placeholderIfAbsent=true"
                alt="Clinical Validation Dashboard"
                className="aspect-[2.8] object-contain w-full max-md:max-w-full"
              />
            </div>
            
            <div className="flex mr-[-110px] w-full flex-col items-center text-sm text-white font-normal text-center leading-none mt-8 px-[70px] max-md:max-w-full max-md:px-5">
              <div className="flex w-[571px] max-w-full items-stretch gap-5 flex-wrap justify-between">
                <div className="flex items-stretch gap-2.5 py-0.5">
                  <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                  <div>Clinical-Grade Accuracy</div>
                </div>
                <div className="flex items-stretch gap-2.5 py-0.5">
                  <Shield className="w-3.5 h-3.5 text-blue-400" />
                  <div>Privacy-First Design</div>
                </div>
                <div className="flex items-stretch gap-[9px] py-0.5">
                  <FileText className="w-3.5 h-3.5 text-purple-400" />
                  <div>Peer-Reviewed Research</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Performance Metrics Grid */}
        <div className="mt-[41px] max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <div className="w-3/12 max-md:w-full max-md:ml-0">
              <MetricCard
                value="87"
                label="% Sensitivity"
                description="Fall Detection Accuracy"
                labelColor="text-blue-200"
                descriptionColor="text-blue-100"
              />
            </div>
            <div className="w-3/12 ml-5 max-md:w-full max-md:ml-0">
              <MetricCard
                value="88"
                label="% Specificity"
                description="False Alarm Prevention"
                labelColor="text-green-200"
                descriptionColor="text-green-100"
              />
            </div>
            <div className="w-3/12 ml-5 max-md:w-full max-md:ml-0">
              <MetricCard
                value="<2"
                label="Seconds"
                description="Response Time"
                labelColor="text-orange-200"
                descriptionColor="text-orange-100"
              />
            </div>
            <div className="w-3/12 ml-5 max-md:w-full max-md:ml-0">
              <MetricCard
                value="267"
                label="Citations"
                description="Research Impact"
                labelColor="text-purple-200"
                descriptionColor="text-purple-100"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
