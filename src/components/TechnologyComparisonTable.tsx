import React from 'react';
import { Check, X } from 'lucide-react';

const TechnologyTable = () => {
  const comparisonData = [
    {
      factor: 'Detection Accuracy',
      radar: { text: 'Clinical-grade precision', status: 'excellent' },
      wifi: { text: 'High accuracy, varies by environment', status: 'good' }
    },
    {
      factor: 'Coverage Area',
      radar: { text: '30ft radius per sensor', status: 'excellent' },
      wifi: { text: 'Entire facility with existing infrastructure', status: 'excellent' }
    },
    {
      factor: 'Infrastructure Requirements',
      radar: { text: 'Dedicated sensor installation', status: 'moderate' },
      wifi: { text: 'Uses existing WiFi network', status: 'excellent' }
    },
    {
      factor: 'Installation Complexity',
      radar: { text: 'Professional installation required', status: 'moderate' },
      wifi: { text: 'Software deployment only', status: 'excellent' }
    },
    {
      factor: 'Deployment Cost',
      radar: { text: '$300-500 per sensor', status: 'moderate' },
      wifi: { text: '$50-100 per monitored space', status: 'excellent' }
    },
    {
      factor: 'Privacy Protection',
      radar: { text: 'No cameras, fully anonymous', status: 'excellent' },
      wifi: { text: 'Signal analysis only, no imaging', status: 'excellent' }
    },
    {
      factor: 'Best Use Cases',
      radar: { text: 'High-risk areas, medical monitoring', status: 'excellent' },
      wifi: { text: 'Facility-wide monitoring, scalable deployment', status: 'excellent' }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'good':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Technology Comparison Overview
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive comparison of our dual sensing platforms
          </p>
        </div>

        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full bg-white">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600 to-green-600">
                <th className="px-6 py-4 text-left text-white font-semibold text-lg">
                  Comparison Factor
                </th>
                <th className="px-6 py-4 text-left text-white font-semibold text-lg">
                  SFCW Radar Platform
                </th>
                <th className="px-6 py-4 text-left text-white font-semibold text-lg">
                  WiFi Signal Analysis Platform
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr 
                  key={index} 
                  className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}
                >
                  <td className="px-6 py-4 font-semibold text-gray-900 border-b">
                    {row.factor}
                  </td>
                  <td className="px-6 py-4 border-b">
                    <span className={`inline-block px-4 py-2 rounded-lg border ${getStatusColor(row.radar.status)}`}>
                      {row.radar.text}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b">
                    <span className={`inline-block px-4 py-2 rounded-lg border ${getStatusColor(row.wifi.status)}`}>
                      {row.wifi.text}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TechnologyTable;
