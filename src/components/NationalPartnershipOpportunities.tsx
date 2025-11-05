import { SectionTagBadge } from '@/components/admin/SectionTagBadge';

const NationalPartnershipOpportunities = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <SectionTagBadge sectionTag="partnership-opportunities" adminPath="/admin/partnership-opportunities" enabled={false} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 font-serif mb-6">
            National & Regional Partnership Opportunities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Strategic expansion strategy from Oregon pilot to nationwide deployment through key partnerships
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 font-serif mb-6">Expansion Strategy</h3>
              <p className="text-lg text-gray-600 mb-8">
                Phased approach to national market penetration through strategic partnerships and proven pilot success
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border-l-4 border-blue-500 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="font-bold text-blue-600">1</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">Oregon Pilot Program</h4>
                </div>
                <p className="text-gray-600 mb-4">Establish proof-of-concept with 5-10 Portland metro facilities</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="font-bold text-blue-600">6-12</div>
                    <div className="text-sm text-gray-600">Months</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="font-bold text-blue-600">10</div>
                    <div className="text-sm text-gray-600">Facilities</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-green-500 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="font-bold text-green-600">2</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">Regional Expansion</h4>
                </div>
                <p className="text-gray-600 mb-4">Scale to Pacific Northwest and California markets</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="font-bold text-green-600">12-24</div>
                    <div className="text-sm text-gray-600">Months</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="font-bold text-green-600">100+</div>
                    <div className="text-sm text-gray-600">Facilities</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-purple-500 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <span className="font-bold text-purple-600">3</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">National Deployment</h4>
                </div>
                <p className="text-gray-600 mb-4">Partner-driven rollout across key growth markets</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="font-bold text-purple-600">24-36</div>
                    <div className="text-sm text-gray-600">Months</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="font-bold text-purple-600">1000+</div>
                    <div className="text-sm text-gray-600">Facilities</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-gray-900 font-serif mb-6">Strategic Partners</h3>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h4 className="text-xl font-bold text-gray-900 mb-6">Healthcare Systems</h4>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <i className="fa-solid fa-hospital text-white text-2xl"></i>
                  </div>
                  <h5 className="font-semibold text-gray-900 mb-2">Providence Health</h5>
                  <p className="text-sm text-gray-600">51 hospitals, 900+ clinics across 7 states</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="w-16 h-16 bg-green-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <i className="fa-solid fa-heart-pulse text-white text-2xl"></i>
                  </div>
                  <h5 className="font-semibold text-gray-900 mb-2">Kaiser Permanente</h5>
                  <p className="text-sm text-gray-600">39 hospitals, 700+ medical offices</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h4 className="text-xl font-bold text-gray-900 mb-6">Senior Living Chains</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <i className="fa-solid fa-home text-orange-600 text-xl"></i>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Brookdale Senior Living</h5>
                    <p className="text-sm text-gray-600">700+ communities nationwide</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <i className="fa-solid fa-building text-purple-600 text-xl"></i>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Sunrise Senior Living</h5>
                    <p className="text-sm text-gray-600">320+ communities in US & Canada</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h4 className="text-xl font-bold mb-4">Partnership Benefits</h4>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <i className="fa-solid fa-check-circle text-green-300 mr-3"></i>
                  <span>Rapid market penetration</span>
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check-circle text-green-300 mr-3"></i>
                  <span>Established customer relationships</span>
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check-circle text-green-300 mr-3"></i>
                  <span>Shared implementation costs</span>
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check-circle text-green-300 mr-3"></i>
                  <span>Integrated care workflows</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Market Penetration Timeline</h3>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg top-0"></div>
                <div className="bg-blue-50 rounded-xl p-6 mt-8">
                  <h4 className="font-bold text-blue-900 mb-2">Year 1-2</h4>
                  <p className="text-blue-700 text-sm mb-4">Oregon Pilot & Regional Expansion</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Facilities:</span>
                      <span className="font-semibold text-blue-600">50-100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Revenue:</span>
                      <span className="font-semibold text-blue-600">$2-5M</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-green-500 rounded-full border-4 border-white shadow-lg top-0"></div>
                <div className="bg-green-50 rounded-xl p-6 mt-8">
                  <h4 className="font-bold text-green-900 mb-2">Year 3-4</h4>
                  <p className="text-green-700 text-sm mb-4">Multi-State Partnership Rollout</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Facilities:</span>
                      <span className="font-semibold text-green-600">500+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Revenue:</span>
                      <span className="font-semibold text-green-600">$25-50M</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-500 rounded-full border-4 border-white shadow-lg top-0"></div>
                <div className="bg-purple-50 rounded-xl p-6 mt-8">
                  <h4 className="font-bold text-purple-900 mb-2">Year 5+</h4>
                  <p className="text-purple-700 text-sm mb-4">National Market Leadership</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Facilities:</span>
                      <span className="font-semibold text-purple-600">2000+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Revenue:</span>
                      <span className="font-semibold text-purple-600">$100M+</span>
                    </div>
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

export default NationalPartnershipOpportunities;