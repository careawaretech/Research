import React from 'react';
import { DollarSign, Check, Clock, Calendar, Rocket } from 'lucide-react';

const GrantFundingSection = () => {
  return (
    <section id="grant-funding" className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 font-serif mb-6">NIH Grant & Funding Opportunities</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Partner with us on federal grant applications and commercialization initiatives
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          {/* NIH SBIR Progress */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 font-serif mb-6">NIH SBIR/STTR Progress</h3>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-semibold text-gray-900">Phase I Application Status</h4>
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                  <Clock className="w-4 h-4 mr-2" />
                  Under Review
                </span>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <img src="https://www.nia.nih.gov/sites/default/files/2017-06/nia-logo_0.png" alt="NIA" className="h-12 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">National Institute on Aging (NIA)</h5>
                    <p className="text-gray-600">Fall prevention technology for Alzheimer's and dementia populations</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">$500K</div>
                    <div className="text-sm text-green-800">Phase I Maximum</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">$2.5M</div>
                    <div className="text-sm text-blue-800">Phase II Potential</div>
                  </div>
                </div>
                
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h5 className="font-semibold text-orange-900 mb-2">Enhanced Funding Track</h5>
                  <p className="text-orange-800 text-sm">Alzheimer's/dementia focus qualifies for enhanced SBIR funding with expedited review process</p>
                </div>
              </div>
            </div>
            
            {/* Grant Timeline */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mt-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-6">Grant Application Timeline</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-green-900">Phase I Application Submitted</div>
                    <div className="text-sm text-green-700">October 2024 - Complete</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-yellow-900">NIH Review Process</div>
                    <div className="text-sm text-yellow-700">November 2024 - March 2025</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-blue-900">Award Decision Expected</div>
                    <div className="text-sm text-blue-700">Q1 2025</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                    <Rocket className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Phase II Application</div>
                    <div className="text-sm text-gray-700">Q3 2025 (if Phase I awarded)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Funding Impact & Opportunities */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 font-serif mb-6">Funding Impact & Opportunities</h3>
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-gray-900 mb-3">Phase I Funding Utilization</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Prototype Development</span>
                      <span className="font-semibold text-green-600">40%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Clinical Validation Studies</span>
                      <span className="font-semibold text-blue-600">30%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Partnership Development</span>
                      <span className="font-semibold text-purple-600">20%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Regulatory Preparation</span>
                      <span className="font-semibold text-orange-600">10%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-gray-900 mb-3">Phase II Expansion Plan</h4>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                      </svg>
                      <span>Multi-facility clinical trials (5+ facilities)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                      </svg>
                      <span>WiFi platform development and validation</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                        <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                      </svg>
                      <span>FDA regulatory pathway preparation</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      <span>Commercial partnership development</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-gray-900 mb-3">Additional Funding Sources</h4>
                  <div className="space-y-4">
                    <div className="bg-purple-50 rounded-lg p-4">
                      <h5 className="font-medium text-purple-900 mb-2">NSF SBIR</h5>
                      <p className="text-purple-800 text-sm">Technology innovation and commercialization focus</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h5 className="font-medium text-blue-900 mb-2">State of Oregon Grants</h5>
                      <p className="text-blue-800 text-sm">Local innovation and job creation incentives</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <h5 className="font-medium text-green-900 mb-2">Private Foundation Funding</h5>
                      <p className="text-green-800 text-sm">Aging research and healthcare innovation grants</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Funding Collaboration Opportunities */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-3xl font-bold text-gray-900 font-serif text-center mb-8">Grant Collaboration Opportunities</h3>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900">Co-Investigator Roles</h4>
              <p className="text-gray-600">Lead roles in NIH Phase II applications with established research credentials and institutional backing</p>
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Apply Now
              </button>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900">Subcontracting Partners</h4>
              <p className="text-gray-600">Specialized research services for clinical validation, regulatory affairs, and commercialization support</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Partner With Us
              </button>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900">Advisory Board</h4>
              <p className="text-gray-600">Strategic guidance on grant applications, research direction, and commercialization pathway development</p>
              <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Join Board
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrantFundingSection;
