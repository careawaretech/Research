import React from 'react';
import { Check, X, Ban, Video, Radio, Wifi, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const PrivacyComparisonMatrix = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50/50 to-green-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 lg:mb-8">
            Technology Comparison Matrix
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            See how Care Aware Tech's privacy-first approach compares to existing fall detection solutions
          </p>
        </div>

        <div className="bg-card rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-green-600 px-6 lg:px-8 py-6">
            <h3 className="text-2xl lg:text-3xl font-bold text-white text-center">
              Comprehensive Technology Analysis
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted border-b-2 border-border">
                <tr>
                  <th className="px-4 lg:px-6 py-4 lg:py-6 text-left font-bold text-foreground text-base lg:text-lg min-w-[200px] lg:min-w-[250px]">
                    Technology Solution
                  </th>
                  <th className="px-3 lg:px-4 py-4 lg:py-6 text-center font-bold text-foreground text-sm lg:text-base min-w-[120px] lg:min-w-[140px]">
                    Captures Images?
                  </th>
                  <th className="px-3 lg:px-4 py-4 lg:py-6 text-center font-bold text-foreground text-sm lg:text-base min-w-[100px] lg:min-w-[120px]">
                    Bathroom Safe?
                  </th>
                  <th className="px-3 lg:px-4 py-4 lg:py-6 text-center font-bold text-foreground text-sm lg:text-base min-w-[100px] lg:min-w-[120px]">
                    Wearable Required?
                  </th>
                  <th className="px-3 lg:px-4 py-4 lg:py-6 text-center font-bold text-foreground text-sm lg:text-base min-w-[100px] lg:min-w-[120px]">
                    User Compliance
                  </th>
                  <th className="px-3 lg:px-4 py-4 lg:py-6 text-center font-bold text-foreground text-sm lg:text-base min-w-[80px] lg:min-w-[100px]">
                    Privacy Score
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {/* Camera AI Systems */}
                <tr className="bg-red-50/30 hover:bg-red-50/50 transition-colors">
                  <td className="px-4 lg:px-6 py-6 lg:py-8">
                    <div className="flex items-center space-x-3 lg:space-x-4">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Video className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-foreground text-base lg:text-lg">Camera AI Systems</div>
                        <div className="text-xs lg:text-sm text-muted-foreground">(SafelyYou, CarePredict Vision)</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 lg:px-4 py-6 lg:py-8 text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <X className="w-6 h-6 lg:w-8 lg:h-8 text-red-500" />
                      <Badge variant="destructive" className="text-xs">YES - Visual Data</Badge>
                    </div>
                  </td>
                  <td className="px-3 lg:px-4 py-6 lg:py-8 text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <Ban className="w-6 h-6 lg:w-8 lg:h-8 text-red-500" />
                      <Badge variant="destructive" className="text-xs">NO - Prohibited</Badge>
                    </div>
                  </td>
                  <td className="px-3 lg:px-4 py-6 lg:py-8 text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <Check className="w-6 h-6 lg:w-8 lg:h-8 text-green-500" />
                      <Badge variant="outline" className="text-xs border-green-500 text-green-700">NO</Badge>
                    </div>
                  </td>
                  <td className="px-3 lg:px-4 py-6 lg:py-8 text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <span className="text-muted-foreground text-sm">N/A</span>
                    </div>
                  </td>
                  <td className="px-3 lg:px-4 py-6 lg:py-8 text-center">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-lg lg:text-2xl font-bold text-red-600">2/10</span>
                    </div>
                  </td>
                </tr>

                {/* Wearable Pendants */}
                <tr className="bg-yellow-50/30 hover:bg-yellow-50/50 transition-colors">
                  <td className="px-4 lg:px-6 py-6 lg:py-8">
                    <div className="flex items-center space-x-3 lg:space-x-4">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-foreground text-base lg:text-lg">Wearable Pendants</div>
                        <div className="text-xs lg:text-sm text-muted-foreground">(Life Alert, Medical Guardian)</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 lg:px-4 py-6 lg:py-8 text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <Check className="w-6 h-6 lg:w-8 lg:h-8 text-green-500" />
                      <Badge variant="outline" className="text-xs border-green-500 text-green-700">NO</Badge>
                    </div>
                  </td>
                  <td className="px-3 lg:px-4 py-6 lg:py-8 text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <Check className="w-6 h-6 lg:w-8 lg:h-8 text-green-500" />
                      <Badge variant="outline" className="text-xs border-green-500 text-green-700">YES</Badge>
                    </div>
                  </td>
                  <td className="px-3 lg:px-4 py-6 lg:py-8 text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <X className="w-6 h-6 lg:w-8 lg:h-8 text-red-500" />
                      <Badge variant="destructive" className="text-xs">YES - Required</Badge>
                    </div>
                  </td>
                  <td className="px-3 lg:px-4 py-6 lg:py-8 text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <Badge variant="outline" className="text-xs border-yellow-500 text-yellow-700 bg-yellow-50">50% Non-Compliance</Badge>
                    </div>
                  </td>
                  <td className="px-3 lg:px-4 py-6 lg:py-8 text-center">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-lg lg:text-2xl font-bold text-yellow-600">6/10</span>
                    </div>
                  </td>
                </tr>

                {/* Care Aware Radar */}
                <tr className="bg-blue-50/30 hover:bg-blue-50/50 transition-colors">
                  <td className="px-4 lg:px-6 py-6 lg:py-8">
                    <div className="flex items-center space-x-3 lg:space-x-4">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <Radio className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-primary text-base lg:text-lg">Care Aware Radar</div>
                        <div className="text-xs lg:text-sm text-primary/70">(SFCW Radar Technology)</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 lg:px-4 py-6 lg:py-8 text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <Check className="w-6 h-6 lg:w-8 lg:h-8 text-green-500" />
                      <Badge variant="outline" className="text-xs border-green-500 text-green-700 bg-green-50">IMPOSSIBLE</Badge>
                    </div>
                  </td>
                  <td className="px-3 lg:px-4 py-6 lg:py-8 text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <Check className="w-6 h-6 lg:w-8 lg:h-8 text-green-500" />
                      <Badge variant="outline" className="text-xs border-green-500 text-green-700 bg-green-50">YES - Safe</Badge>
                    </div>
                  </td>
                  <td className="px-3 lg:px-4 py-6 lg:py-8 text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <Check className="w-6 h-6 lg:w-8 lg:h-8 text-green-500" />
                      <Badge variant="outline" className="text-xs border-green-500 text-green-700">NO</Badge>
                    </div>
                  </td>
                  <td className="px-3 lg:px-4 py-6 lg:py-8 text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <Badge variant="outline" className="text-xs border-green-500 text-green-700 bg-green-50">100% Passive</Badge>
                    </div>
                  </td>
                  <td className="px-3 lg:px-4 py-6 lg:py-8 text-center">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center shadow-lg shadow-green-200">
                      <span className="text-lg lg:text-2xl font-bold text-green-600">10/10</span>
                    </div>
                  </td>
                </tr>

                {/* Care Aware WiFi */}
                <tr className="bg-green-50/30 hover:bg-green-50/50 transition-colors">
                  <td className="px-4 lg:px-6 py-6 lg:py-8">
                    <div className="flex items-center space-x-3 lg:space-x-4">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Wifi className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-green-900 text-base lg:text-lg">Care Aware WiFi</div>
                        <div className="text-xs lg:text-sm text-green-600">(WiFi Signal Analysis)</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 lg:px-4 py-6 lg:py-8 text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <Check className="w-6 h-6 lg:w-8 lg:h-8 text-green-500" />
                      <Badge variant="outline" className="text-xs border-green-500 text-green-700 bg-green-50">IMPOSSIBLE</Badge>
                    </div>
                  </td>
                  <td className="px-3 lg:px-4 py-6 lg:py-8 text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <Check className="w-6 h-6 lg:w-8 lg:h-8 text-green-500" />
                      <Badge variant="outline" className="text-xs border-green-500 text-green-700 bg-green-50">YES - Safe</Badge>
                    </div>
                  </td>
                  <td className="px-3 lg:px-4 py-6 lg:py-8 text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <Check className="w-6 h-6 lg:w-8 lg:h-8 text-green-500" />
                      <Badge variant="outline" className="text-xs border-green-500 text-green-700">NO</Badge>
                    </div>
                  </td>
                  <td className="px-3 lg:px-4 py-6 lg:py-8 text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <Badge variant="outline" className="text-xs border-green-500 text-green-700 bg-green-50">100% Passive</Badge>
                    </div>
                  </td>
                  <td className="px-3 lg:px-4 py-6 lg:py-8 text-center">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center shadow-lg shadow-green-200">
                      <span className="text-lg lg:text-2xl font-bold text-green-600">10/10</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyComparisonMatrix;
