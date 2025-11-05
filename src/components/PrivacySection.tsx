import React from 'react';
import { Shield, X, Check, VideoOff, Settings, Radio, Building2 } from 'lucide-react';
import { SectionTagBadge } from '@/components/admin/SectionTagBadge';

const PrivacySection = () => {
  return <section className="relative bg-gray-50 w-full py-16 lg:py-20 px-6 lg:px-8">
      <SectionTagBadge sectionTag="privacy-section" adminPath="/admin/privacy-section" enabled={false} />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-red-100 rounded-full p-6">
                <VideoOff className="w-12 h-12 text-red-600" />
              </div>
            </div>
            <h2 className="text-gray-900 text-5xl leading-none mt-6 max-md:text-[40px]">
              No Cameras. Ever.
            </h2>
            <p className="text-gray-600 text-xl leading-7 self-stretch mt-9 max-md:max-w-full">
              Privacy by Physics, Not Policy — Our technology makes privacy violations physically impossible
            </p>
          </div>
        </div>
        
        <div className="mt-12 lg:mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - The Privacy Revolution */}
            <div>
              <h3 className="text-gray-900 text-3xl font-bold leading-[1.2] mb-8">
                The Privacy Revolution
              </h3>
              
              <div className="flex flex-col gap-6">
                {/* Camera Systems Card */}
                <article className="bg-red-50/50 border-l-[6px] border-red-600 flex flex-col px-8 py-6">
                  <h4 className="text-red-800 text-lg font-semibold mb-4">
                    Camera Systems (like SafelyYou)
                  </h4>
                  <ul className="flex flex-col gap-2 text-base text-red-700">
                    <li className="leading-relaxed">• Rely on policy promises (video deletion, no live streaming)</li>
                    <li className="leading-relaxed">• Still capture visual data that could be misused</li>
                    <li className="leading-relaxed">• Cannot operate in bathrooms due to privacy laws</li>
                    <li className="leading-relaxed">• Family resistance and ethical concerns</li>
                  </ul>
                </article>
                
                {/* Care Aware Tech Card */}
                <article className="bg-green-50/50 border-l-[6px] border-green-600 flex flex-col px-8 py-6">
                  <h4 className="text-green-800 text-lg font-semibold mb-4">
                    Care Aware Tech Approach
                  </h4>
                  <ul className="flex flex-col gap-2 text-base text-green-700">
                    <li className="leading-relaxed">• Physical impossibility of capturing faces or images</li>
                    <li className="leading-relaxed">• Radar and WiFi only detect motion signatures</li>
                    <li className="leading-relaxed">• Bathroom-safe monitoring preserves dignity</li>
                    <li className="leading-relaxed">• Anonymous data collection by design</li>
                  </ul>
                </article>
              </div>
            </div>
            
            {/* Right Side - What Different Technologies See */}
            <div>
              <div className="bg-white shadow-lg rounded-2xl p-8">
                <h4 className="text-2xl text-gray-900 font-bold text-center mb-8">
                  What Different Technologies See
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Camera Systems */}
                  <div className="text-center">
                    <div className="bg-red-100 p-6 rounded-lg mb-4 flex items-center justify-center" style={{
                    minHeight: '160px'
                  }}>
                      <div className="flex flex-col items-center gap-4">
                        <VideoOff className="w-12 h-12 text-red-600" />
                        <div className="text-sm text-red-800 font-medium">Camera Systems</div>
                      </div>
                    </div>
                    <p className="text-xs text-red-600">
                      Visual imagery (blurred for privacy but still captured)
                    </p>
                  </div>
                  
                  {/* Physics-Based Sensing */}
                  <div className="text-center">
                    <div className="bg-green-100 p-6 rounded-lg mb-4 flex items-center justify-center" style={{
                    minHeight: '160px'
                  }}>
                      <div className="flex flex-col items-center gap-4">
                        <Radio className="w-12 h-12 text-green-600" />
                        <div className="text-sm text-green-800 font-medium">Physics-Based Sensing</div>
                      </div>
                    </div>
                    <p className="text-xs text-green-600">
                      Waveform data only (no visual information possible)
                    </p>
                  </div>
                </div>
                
                {/* Compliance Badges */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                    <div className="flex justify-center mb-3">
                      <Settings className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="text-sm text-gray-900 font-medium">HIPAA-Aligned</div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                    <div className="flex justify-center mb-3">
                      <Shield className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="text-sm text-gray-900 font-medium">FCC-Compliant</div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                    <div className="flex justify-center mb-3">
                      <Building2 className="w-8 h-8 text-purple-600" />
                    </div>
                    <div className="text-sm text-gray-900 font-medium">Research-Backed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default PrivacySection;