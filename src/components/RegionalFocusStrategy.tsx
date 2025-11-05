import { useState } from 'react';
import { SectionTagBadge } from '@/components/admin/SectionTagBadge';

const RegionalFocusStrategy = () => {
  const [selectedRegion, setSelectedRegion] = useState<'oregon' | 'us'>('oregon');

  return (
    <div className="relative grid lg:grid-cols-2 gap-12 items-start">
      <SectionTagBadge sectionTag="regional-focus" adminPath="/admin/regional-focus" enabled={false} />
      <div>
        <h3 className="text-3xl font-bold text-gray-900 font-serif mb-6">Regional Focus Strategy</h3>
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xl font-bold text-gray-900">Market Entry</h4>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedRegion('oregon')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  selectedRegion === 'oregon'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Oregon
              </button>
              <button
                onClick={() => setSelectedRegion('us')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  selectedRegion === 'us'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                US
              </button>
            </div>
          </div>
          
          {selectedRegion === 'oregon' ? (
            <div>
              <h5 className="font-semibold text-gray-900 mb-3">Oregon Pilot Market</h5>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-xl font-bold text-blue-600">650K</div>
                  <div className="text-xs text-blue-800">Thousand Seniors (65+)</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-xl font-bold text-green-600">400</div>
                  <div className="text-xs text-green-800">Assisted Living Facilities</div>
                </div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h6 className="font-medium text-orange-800 mb-2">Portland Metro Focus</h6>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>158K Seniors (60+)</div>
                  <div>150 AL Facilities</div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h5 className="font-semibold text-gray-900 mb-3">US National Expansion</h5>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-xl font-bold text-blue-600">54M</div>
                  <div className="text-xs text-blue-800">Million Seniors (65+)</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-xl font-bold text-green-600">30K</div>
                  <div className="text-xs text-green-800">AL Facilities</div>
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h6 className="font-medium text-purple-800 mb-2">Key Growth States</h6>
                <div className="text-sm space-y-1">
                  <div>California: 5.8M seniors</div>
                  <div>Florida: 4.2M seniors</div>
                  <div>Texas: 3.2M seniors</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-gray-900 font-serif mb-6">Competitive Advantage</h3>
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
          <h4 className="font-bold text-gray-900 mb-4 text-lg">First-Mover Advantage</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center">
              <i className="fa-solid fa-check-circle text-green-500 mr-3"></i>
              Only privacy-first bathroom monitoring solution
            </li>
            <li className="flex items-center">
              <i className="fa-solid fa-check-circle text-green-500 mr-3"></i>
              Dual technology approach (radar + WiFi)
            </li>
            <li className="flex items-center">
              <i className="fa-solid fa-check-circle text-green-500 mr-3"></i>
              Academic research foundation
            </li>
            <li className="flex items-center">
              <i className="fa-solid fa-check-circle text-green-500 mr-3"></i>
              NIH/NSF institutional backing
            </li>
          </ul>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-4 text-lg">Revenue Model</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Hardware (Radar)</span>
              <span className="font-bold text-blue-600">$2,500-4,000/unit</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Software (WiFi)</span>
              <span className="font-bold text-green-600">$50-100/room/month</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Support & Analytics</span>
              <span className="font-bold text-purple-600">$25-50/room/month</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionalFocusStrategy;