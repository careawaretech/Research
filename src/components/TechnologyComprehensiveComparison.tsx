import React from 'react';
import { Check, X, Minus } from 'lucide-react';

const ComprehensiveComparison = () => {
  const comparisonData = [
    {
      category: 'Detection Capabilities',
      items: [
        { feature: 'Fall Detection Accuracy', radar: '98.7%', wifi: '94.2%', radarBetter: true },
        { feature: 'Breathing Monitoring', radar: '±1 BPM', wifi: '±3 BPM', radarBetter: true },
        { feature: 'Multi-Person Tracking', radar: 'Up to 4', wifi: 'Up to 10', radarBetter: false },
        { feature: 'Through-Wall Detection', radar: 'Limited', wifi: 'Excellent', radarBetter: false }
      ]
    },
    {
      category: 'Infrastructure & Installation',
      items: [
        { feature: 'Hardware Required', radar: 'Dedicated sensors', wifi: 'Existing WiFi', radarBetter: false },
        { feature: 'Installation Time', radar: '2-4 hours/unit', wifi: '24-48 hours total', radarBetter: false },
        { feature: 'Professional Install Needed', radar: 'Yes', wifi: 'No', radarBetter: false },
        { feature: 'Maintenance', radar: 'Annual inspection', wifi: 'Software updates only', radarBetter: false }
      ]
    },
    {
      category: 'Cost Analysis (5-Year TCO)',
      items: [
        { feature: 'Hardware Cost per Unit', radar: '$300-500', wifi: '$0', radarBetter: false },
        { feature: 'Installation Cost', radar: '$150-250/unit', wifi: '$0', radarBetter: false },
        { feature: 'Monthly Service Fee', radar: '$15/sensor', wifi: '$30/facility', radarBetter: true },
        { feature: '50-Unit Facility 5-Yr Total', radar: '$37,500', wifi: '$25,800', radarBetter: false }
      ]
    },
    {
      category: 'Privacy & Compliance',
      items: [
        { feature: 'HIPAA Compliant', radar: 'Yes', wifi: 'Yes', radarBetter: null },
        { feature: 'No Video/Audio Recording', radar: 'Yes', wifi: 'Yes', radarBetter: null },
        { feature: 'Family Acceptance Rate', radar: '89%', wifi: '96%', radarBetter: false },
        { feature: 'Regulatory Concerns', radar: 'FCC Part 15', wifi: 'None', radarBetter: false }
      ]
    }
  ];

  const getIcon = (better: boolean | null) => {
    if (better === null) return <Minus className="w-5 h-5 text-gray-400" />;
    return better ? 
      <Check className="w-5 h-5 text-green-600" /> : 
      <Check className="w-5 h-5 text-blue-600" />;
  };

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Technical Comparison Matrix
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Detailed side-by-side comparison of platform capabilities and specifications
          </p>
        </div>

        <div className="space-y-12">
          {comparisonData.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 px-8 py-4">
                <h3 className="text-2xl font-bold text-white">{section.category}</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b-2 border-gray-200">
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Feature</th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">SFCW Radar</th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">WiFi CSI</th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Advantage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.items.map((item, itemIndex) => (
                      <tr 
                        key={itemIndex}
                        className="border-b border-gray-100 hover:bg-blue-50 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900">{item.feature}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-block px-4 py-2 rounded-lg ${
                            item.radarBetter === true ? 'bg-green-100 text-green-800 font-semibold' : 
                            item.radarBetter === false ? 'bg-gray-100 text-gray-700' : 
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {item.radar}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-block px-4 py-2 rounded-lg ${
                            item.radarBetter === false ? 'bg-green-100 text-green-800 font-semibold' : 
                            item.radarBetter === true ? 'bg-gray-100 text-gray-700' : 
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {item.wifi}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {getIcon(item.radarBetter)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Summary */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Recommendation: Hybrid Deployment
          </h3>
          <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto">
            For optimal results, we recommend deploying <span className="font-bold text-blue-600">radar sensors in high-risk areas</span> (bathrooms, memory care units) 
            for maximum accuracy, combined with <span className="font-bold text-green-600">WiFi analysis for facility-wide coverage</span> in common areas and bedrooms. 
            This hybrid approach provides the best balance of accuracy, coverage, and cost-effectiveness.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ComprehensiveComparison;
