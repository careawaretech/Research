import React from 'react';
import { Building, Gift, Wrench, GraduationCap, FileText, Tag, Check } from 'lucide-react';

const FacilityPartnershipDeepDive = () => {
  return (
    <section id="facility-partnership" className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Building className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 font-serif mb-6">Facility Partnership Program</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your facility into a showcase for next-generation senior safety technology
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          {/* Partnership Benefits */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 font-serif mb-6">What You Receive</h3>
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Gift className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Free Equipment Package</h4>
                      <p className="text-gray-600">Complete radar sensor systems or WiFi analysis software provided at no cost during 6-12 month pilot period</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Wrench className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Professional Installation</h4>
                      <p className="text-gray-600">Expert technicians handle all setup, calibration, and integration with your existing systems</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Comprehensive Training</h4>
                      <p className="text-gray-600">Staff education on system operation, alert management, and privacy protocols</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-orange-500">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Co-Publication Rights</h4>
                      <p className="text-gray-600">Joint authorship on case studies and research papers showcasing your facility's innovation</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-red-500">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Tag className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Early Adopter Pricing</h4>
                      <p className="text-gray-600">Guaranteed preferred pricing when you decide to purchase post-pilot, typically 30-40% below market rate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Implementation Process */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 font-serif mb-6">Implementation Timeline</h3>
              <div className="space-y-6">
                <div className="progress-step flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Application & Qualification</h4>
                    <p className="text-gray-600 mb-2">Submit partnership application and participate in qualification call</p>
                    <div className="text-sm text-green-600 font-medium">Duration: 2 weeks</div>
                  </div>
                </div>

                <div className="progress-step flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">MOU & Site Assessment</h4>
                    <p className="text-gray-600 mb-2">Sign partnership agreement and conduct technical site survey</p>
                    <div className="text-sm text-blue-600 font-medium">Duration: 2 weeks</div>
                  </div>
                </div>

                <div className="progress-step flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Installation & Setup</h4>
                    <p className="text-gray-600 mb-2">Professional installation of sensors and software configuration</p>
                    <div className="text-sm text-purple-600 font-medium">Duration: 3-5 days</div>
                  </div>
                </div>

                <div className="progress-step flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">4</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Training & Go-Live</h4>
                    <p className="text-gray-600 mb-2">Staff training sessions and system activation</p>
                    <div className="text-sm text-orange-600 font-medium">Duration: 1 week</div>
                  </div>
                </div>

                <div className="progress-step flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-400 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">5</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Monitoring & Evaluation</h4>
                    <p className="text-gray-600 mb-2">Active monitoring with quarterly reviews and data collection</p>
                    <div className="text-sm text-gray-600 font-medium">Duration: 6-12 months</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h4 className="font-semibold text-gray-900 mb-4">What Your Facility Provides</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Access to 2-5 installation locations (rooms/units)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Staff participation in training sessions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Incident reporting data (falls, false alarms)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Optional participation in case study publication</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Feedback on system performance and usability</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Facility Requirements */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-3xl font-bold text-gray-900 font-serif text-center mb-8">Ideal Facility Partners</h3>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900">Size Requirements</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• 25+ residents minimum</li>
                <li>• Memory care or assisted living</li>
                <li>• Private room availability</li>
                <li>• 24/7 staffing model</li>
              </ul>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900">Geographic Focus</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Portland metro area preferred</li>
                <li>• Pacific Northwest region</li>
                <li>• Easy access for tech support</li>
                <li>• Research collaboration proximity</li>
              </ul>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900">Partnership Readiness</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Innovation-focused leadership</li>
                <li>• Staff training commitment</li>
                <li>• Data sharing agreement</li>
                <li>• 6-12 month pilot commitment</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacilityPartnershipDeepDive;
