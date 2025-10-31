import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import oregonMapImage from '@/assets/oregon-map.svg';
import usMapImage from '@/assets/us-map.png';

const MarketBreakdownByRegion = () => {
  return (
    <section className="bg-white w-full py-16 lg:py-20 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-gray-900 text-3xl font-bold mb-8">
          Market Breakdown by Region
        </h2>
        
        <Tabs defaultValue="oregon" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="oregon" className="px-6 py-2">
              Oregon Focus
            </TabsTrigger>
            <TabsTrigger value="us" className="px-6 py-2">
              US Expansion
            </TabsTrigger>
          </TabsList>
          
          {/* Oregon Focus Tab */}
          <TabsContent value="oregon" className="space-y-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Map */}
              <div className="flex items-center justify-center min-h-[300px]">
                <img 
                  src={oregonMapImage}
                  alt="Portland Metro Map with Facility Locations"
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Right Side Content */}
              <div className="space-y-6">
                {/* Portland Metro Pilot Program */}
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Portland Metro Pilot Program
                  </h3>
                  <p className="text-sm text-gray-700 mb-6">
                    Our initial deployment focuses on the Portland metropolitan area to validate technology and build case studies.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">150</div>
                      <div className="text-xs text-gray-700 mt-1">Target Facilities</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">158K</div>
                      <div className="text-xs text-gray-700 mt-1">Seniors (65+)</div>
                    </div>
                  </div>
                </div>
                
                {/* Oregon Statewide Potential */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-base font-semibold text-gray-900 mb-4">
                    Oregon Statewide Potential
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Total AL Facilities</span>
                      <span className="text-lg font-bold text-blue-600">400+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Seniors Population</span>
                      <span className="text-lg font-bold text-green-600">650K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Market Value</span>
                      <span className="text-lg font-bold text-purple-600">$125M</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* US Expansion Tab */}
          <TabsContent value="us" className="space-y-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Map */}
              <div className="flex items-center justify-center min-h-[300px]">
                <img 
                  src={usMapImage}
                  alt="US Map with Target Metropolitan Areas"
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Right Side Content */}
              <div className="space-y-6">
                {/* National Expansion Strategy */}
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    National Expansion Strategy
                  </h3>
                  <p className="text-sm text-gray-700 mb-6">
                    Following Portland success, we plan strategic expansion to major metropolitan areas with high senior populations.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">30K+</div>
                      <div className="text-xs text-gray-700 mt-1">US AL Facilities</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">54M</div>
                      <div className="text-xs text-gray-700 mt-1">US Seniors (65+)</div>
                    </div>
                  </div>
                </div>
                
                {/* Phase 2 Target Markets */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-base font-semibold text-gray-900 mb-4">
                    Phase 2 Target Markets
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">California</span>
                      <span className="text-base font-bold text-blue-600">5.8M seniors</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Florida</span>
                      <span className="text-base font-bold text-blue-600">4.2M seniors</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Texas</span>
                      <span className="text-base font-bold text-blue-600">3.2M seniors</span>
                    </div>
                  </div>
                  
                  {/* Timeline */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <p className="text-xs text-orange-600 font-medium">
                      <span className="font-bold">Timeline:</span> National expansion planned for 2027-2028 following successful Portland validation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default MarketBreakdownByRegion;
