import React from 'react';
import { AlertTriangle, Shield, Wrench } from 'lucide-react';

const CriticalGapSection = () => {
  return (
    <section className="bg-white w-full py-16 lg:py-20 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-gray-900 text-4xl leading-none self-center max-md:max-w-full">
              The Critical Gap in Senior Safety
            </h2>
            <p className="text-gray-600 text-xl leading-7 mt-[29px] max-md:max-w-full">
              Current fall detection solutions fail where seniors need protection most—creating a dangerous privacy vs. safety dilemma.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Clinical Crisis Card */}
            <article className="bg-red-50/50 border-l-[6px] border-red-600 flex flex-col px-8 py-8 h-full">
              <div className="flex items-center gap-4 mb-6">
                <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0" />
                <h3 className="text-2xl font-bold text-red-800">Clinical Crisis</h3>
              </div>
              <ul className="flex flex-col gap-4 text-base text-red-700">
                <li className="leading-relaxed">• Falls are the leading cause of injury-related death in seniors</li>
                <li className="leading-relaxed">• 80%+ of bathroom falls go undetected for hours</li>
                <li className="leading-relaxed">• Average response delay: 45+ minutes</li>
                <li className="leading-relaxed">• Cost per fall with injury: $30,000+</li>
              </ul>
            </article>
            
            {/* Privacy Crisis Card */}
            <article className="bg-purple-50/50 border-l-[6px] border-purple-600 flex flex-col px-8 py-8 h-full">
              <div className="flex items-center gap-4 mb-6">
                <Shield className="w-8 h-8 text-purple-600 flex-shrink-0" />
                <h3 className="text-2xl font-bold text-purple-800">Privacy Crisis</h3>
              </div>
              <ul className="flex flex-col gap-4 text-base text-purple-700">
                <li className="leading-relaxed">• Camera systems cannot operate in bathrooms</li>
                <li className="leading-relaxed">• Privacy laws prohibit visual monitoring</li>
                <li className="leading-relaxed">• Ethical concerns about dignity and autonomy</li>
                <li className="leading-relaxed">• Family resistance to surveillance</li>
              </ul>
            </article>
            
            {/* Technology Gap Card */}
            <article className="bg-orange-50/50 border-l-[6px] border-orange-600 flex flex-col px-8 py-8 h-full">
              <div className="flex items-center gap-4 mb-6">
                <Wrench className="w-8 h-8 text-orange-600 flex-shrink-0" />
                <h3 className="text-2xl font-bold text-orange-800">Technology Gap</h3>
              </div>
              <ul className="flex flex-col gap-4 text-base text-orange-700">
                <li className="leading-relaxed">• Wearable devices: 50%+ non-compliance</li>
                <li className="leading-relaxed">• Seniors forget or refuse to wear them</li>
                <li className="leading-relaxed">• False alarms cause staff fatigue</li>
                <li className="leading-relaxed">• Limited bathroom coverage</li>
              </ul>
            </article>
          </div>
        </div>
    </section>
  );
};

export default CriticalGapSection;
