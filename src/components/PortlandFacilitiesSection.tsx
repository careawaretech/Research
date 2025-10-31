import React from 'react';
import portlandMap from '@/assets/oregon-map.svg';

const PortlandFacilitiesSection = () => {
  return (
    <section id="portland-facilities" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 font-serif mb-6">Portland Metro Partnership Landscape</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            150+ assisted living facilities across the Portland metropolitan area represent our primary market for pilot partnerships
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          {/* Interactive Map */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 font-serif mb-6">Regional Distribution</h3>
              <div className="relative">
                <img className="w-full rounded-xl shadow-lg" src={portlandMap} alt="Portland Oregon metropolitan area map" />
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-lg p-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>Memory Care Units</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Assisted Living</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span>Independent Living+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-blue-600">150</div>
                <div className="text-blue-800 font-semibold">Total Facilities</div>
                <div className="text-sm text-blue-600">Portland Metro Area</div>
              </div>
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-green-600">158K</div>
                <div className="text-green-800 font-semibold">Seniors</div>
                <div className="text-sm text-green-600">Age 60+ (Multnomah County)</div>
              </div>
            </div>
          </div>

          {/* Facility Types & Statistics */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 font-serif mb-6">Target Facility Breakdown</h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-blue-900">Memory Care Units</h4>
                    <span className="text-2xl font-bold text-blue-600">45</span>
                  </div>
                  <p className="text-blue-800 text-sm mb-3">Specialized facilities for Alzheimer's and dementia care - primary target for NIH SBIR focus</p>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  <div className="text-xs text-blue-700 mt-2">30% of total facilities</div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-green-900">Assisted Living Communities</h4>
                    <span className="text-2xl font-bold text-green-600">78</span>
                  </div>
                  <p className="text-green-800 text-sm mb-3">Full-service residential care with 24/7 staffing and comprehensive health monitoring</p>
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '52%' }}></div>
                  </div>
                  <div className="text-xs text-green-700 mt-2">52% of total facilities</div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-purple-900">Independent Living Plus</h4>
                    <span className="text-2xl font-bold text-purple-600">27</span>
                  </div>
                  <p className="text-purple-800 text-sm mb-3">Active senior communities with optional monitoring services for high-risk residents</p>
                  <div className="w-full bg-purple-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '18%' }}></div>
                  </div>
                  <div className="text-xs text-purple-700 mt-2">18% of total facilities</div>
                </div>
              </div>
            </div>

            {/* Market Opportunity */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h4 className="font-semibold text-gray-900 mb-4">Market Opportunity Highlights</h4>
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-medium text-red-900 mb-2">Current Solutions in Market</h4>
                  <p className="text-red-800 text-sm">SafelyYou camera systems deployed in ~15% of facilities, but cannot operate in bathrooms</p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-900 mb-2">Wearable Device Challenges</h4>
                  <p className="text-yellow-800 text-sm">50%+ non-compliance rates with pendant systems across regional facilities</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-900 mb-2">Care Aware Tech Opportunity</h4>
                  <p className="text-green-800 text-sm">First-to-market with bathroom-safe, privacy-first contactless monitoring</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Market Readiness</h4>
                  <p className="text-blue-800 text-sm">High demand for privacy-preserving solutions following recent data breaches</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortlandFacilitiesSection;
