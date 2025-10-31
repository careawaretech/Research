import React from 'react';
import { AlertTriangle, Atom, Shield, X, Check } from 'lucide-react';

const PrivacyPrinciplesSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 lg:mb-8">
            The Privacy Revolution
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            While others promise privacy through policies, we deliver it through physics. Our technology makes it impossible to capture faces, bodies, or any identifiable imagery.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 mb-12 lg:mb-20">
          {/* Problem with Cameras */}
          <div className="text-center group">
            <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-4">
              The Problem with Cameras
            </h3>
            <ul className="text-left space-y-3 text-muted-foreground max-w-sm mx-auto">
              <li className="flex items-start space-x-3">
                <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <span>Visual data captured and stored</span>
              </li>
              <li className="flex items-start space-x-3">
                <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <span>Cannot operate in bathrooms legally</span>
              </li>
              <li className="flex items-start space-x-3">
                <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <span>Family resistance and ethical concerns</span>
              </li>
              <li className="flex items-start space-x-3">
                <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <span>Potential for misuse or data breaches</span>
              </li>
            </ul>
          </div>

          {/* Physics-Based Solution */}
          <div className="text-center group">
            <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Atom className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-4">
              Physics-Based Solution
            </h3>
            <ul className="text-left space-y-3 text-muted-foreground max-w-sm mx-auto">
              <li className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                <span>Radio waves and WiFi signals only</span>
              </li>
              <li className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                <span>Motion patterns, not visual imagery</span>
              </li>
              <li className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                <span>Physically impossible to capture faces</span>
              </li>
              <li className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                <span>Anonymous data by fundamental design</span>
              </li>
            </ul>
          </div>

          {/* Dignified Monitoring */}
          <div className="text-center group">
            <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Shield className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-4">
              Dignified Monitoring
            </h3>
            <ul className="text-left space-y-3 text-muted-foreground max-w-sm mx-auto">
              <li className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span>Bathroom-safe monitoring capability</span>
              </li>
              <li className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span>Preserves dignity and autonomy</span>
              </li>
              <li className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span>Family acceptance and trust</span>
              </li>
              <li className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span>Ethical leadership in elder care</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Visual Comparison */}
        <div className="bg-muted/50 rounded-3xl p-8 lg:p-12">
          <h3 className="text-2xl lg:text-3xl font-bold text-foreground text-center mb-8 lg:mb-12">
            What Different Technologies Actually See
          </h3>
          
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Camera Systems Card */}
            <div className="bg-card rounded-2xl p-6 lg:p-8 border-4 border-red-200 hover:shadow-xl transition-shadow">
              <div className="text-center mb-8">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 lg:w-10 lg:h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                  </svg>
                </div>
                <h4 className="text-xl lg:text-2xl font-bold text-red-800 mb-2">
                  Camera-Based Systems
                </h4>
                <p className="text-red-600">Like SafelyYou and competitors</p>
              </div>
              
              <div className="space-y-6">
                <div className="bg-red-50 rounded-xl p-6">
                  <h5 className="font-semibold text-red-800 mb-3">What They Capture:</h5>
                  <ul className="space-y-2 text-red-700 text-sm">
                    <li>• Full visual imagery of residents</li>
                    <li>• Facial features and body positions</li>
                    <li>• Personal moments and activities</li>
                    <li>• Potentially embarrassing situations</li>
                  </ul>
                </div>
                
                <div className="bg-red-100 rounded-xl p-6">
                  <h5 className="font-semibold text-red-800 mb-3">Privacy Promises:</h5>
                  <ul className="space-y-2 text-red-700 text-sm">
                    <li>• "Video deleted after non-fall events"</li>
                    <li>• "No live streaming to family"</li>
                    <li>• "Secure cloud storage"</li>
                    <li>• "HIPAA-compliant policies"</li>
                  </ul>
                  <div className="mt-4 p-3 bg-red-200 rounded-lg">
                    <p className="text-red-800 font-medium text-sm flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
                      Still relies on trust and policy enforcement
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Care Aware Tech Card */}
            <div className="bg-card rounded-2xl p-6 lg:p-8 border-4 border-green-200 hover:shadow-xl transition-shadow">
              <div className="text-center mb-8">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 lg:w-10 lg:h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-xl lg:text-2xl font-bold text-green-800 mb-2">
                  Care Aware Tech
                </h4>
                <p className="text-green-600">Physics-based sensing technology</p>
              </div>
              
              <div className="space-y-6">
                <div className="bg-green-50 rounded-xl p-6">
                  <h5 className="font-semibold text-green-800 mb-3">What We Detect:</h5>
                  <ul className="space-y-2 text-green-700 text-sm">
                    <li>• Motion signatures and patterns</li>
                    <li>• Respiratory and cardiac rhythms</li>
                    <li>• Fall event classifications</li>
                    <li>• Anonymous activity data only</li>
                  </ul>
                </div>
                
                <div className="bg-green-100 rounded-xl p-6">
                  <h5 className="font-semibold text-green-800 mb-3">Physical Guarantees:</h5>
                  <ul className="space-y-2 text-green-700 text-sm">
                    <li>• No visual sensors or cameras</li>
                    <li>• Radar/WiFi cannot capture images</li>
                    <li>• Faces physically undetectable</li>
                    <li>• Anonymous by fundamental design</li>
                  </ul>
                  <div className="mt-4 p-3 bg-green-200 rounded-lg">
                    <p className="text-green-800 font-medium text-sm flex items-center">
                      <Shield className="w-4 h-4 mr-2 flex-shrink-0" />
                      Privacy violations are physically impossible
                    </p>
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

export default PrivacyPrinciplesSection;
