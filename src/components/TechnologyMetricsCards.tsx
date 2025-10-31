import React from 'react';
import { Activity, Wifi, Shield, TrendingDown } from 'lucide-react';

const MetricsCards = () => {
  const metrics = [
    {
      icon: Activity,
      value: '98.7%',
      label: 'Fall Detection Accuracy',
      description: 'Industry-leading precision in fall event identification',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: Wifi,
      value: '<200ms',
      label: 'Response Time',
      description: 'Real-time alert generation for immediate caregiver notification',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: Shield,
      value: '100%',
      label: 'Privacy Compliant',
      description: 'No cameras or wearables, fully HIPAA compliant monitoring',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: TrendingDown,
      value: '67%',
      label: 'Cost Reduction',
      description: 'Lower total cost of ownership vs traditional camera systems',
      gradient: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Quick Stats
          </h2>
          <p className="text-xl text-gray-600">
            Key performance metrics of our dual technology platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${metric.gradient} flex items-center justify-center mb-4`}>
                <metric.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {metric.value}
              </div>
              <div className="text-lg font-semibold text-gray-700 mb-2">
                {metric.label}
              </div>
              <p className="text-sm text-gray-600">
                {metric.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsCards;
