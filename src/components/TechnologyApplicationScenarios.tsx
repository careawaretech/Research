import React from 'react';
import { Radio, Wifi, TrendingDown, Users, Activity, Bell } from 'lucide-react';

const ApplicationScenarios = () => {
  const scenarios = [
    {
      title: 'Memory Care Unit',
      residents: '24 residents',
      technology: [
        { name: 'Radar Sensors', count: '6 units', description: 'Bathrooms & high-risk areas' },
        { name: 'WiFi Analysis', count: 'Facility-wide', description: 'Common areas & bedrooms' }
      ],
      benefits: [
        { metric: '78%', label: 'Fall Reduction', icon: TrendingDown },
        { metric: '92%', label: 'Family Satisfaction', icon: Users },
        { metric: '<3min', label: 'Response Time', icon: Activity },
        { metric: '24/7', label: 'Coverage', icon: Bell }
      ],
      color: 'blue'
    },
    {
      title: 'Independent Living Facility',
      residents: '120 residents',
      technology: [
        { name: 'WiFi Analysis', count: 'Primary monitoring', description: 'All apartments & common spaces' },
        { name: 'Radar Sensors', count: '8 units', description: 'Community bathrooms & fitness center' }
      ],
      benefits: [
        { metric: '65%', label: 'Cost vs Cameras', icon: TrendingDown },
        { metric: '95%', label: 'Resident Acceptance', icon: Users },
        { metric: '0', label: 'Privacy Violations', icon: Activity },
        { metric: '100%', label: 'HIPAA Compliant', icon: Bell }
      ],
      color: 'green'
    },
    {
      title: 'Assisted Living Community',
      residents: '80 residents',
      technology: [
        { name: 'Hybrid Deployment', count: '12 radar + WiFi', description: 'Optimized for mixed acuity levels' },
        { name: 'Integrated Platform', count: 'Single dashboard', description: 'Unified alerts & analytics' }
      ],
      benefits: [
        { metric: '83%', label: 'Fall Detection Rate', icon: TrendingDown },
        { metric: '4.2hrs', label: 'Saved per Day', icon: Users },
        { metric: '$180K', label: 'Annual Savings', icon: Activity },
        { metric: '89%', label: 'Staff Satisfaction', icon: Bell }
      ],
      color: 'purple'
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Real-World Application Scenarios
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how our dual technology platform is deployed across different care environments
          </p>
        </div>

        <div className="space-y-8">
          {scenarios.map((scenario, index) => (
            <div 
              key={index}
              className={`bg-white rounded-2xl shadow-xl overflow-hidden border-l-8 ${
                scenario.color === 'blue' ? 'border-blue-500' :
                scenario.color === 'green' ? 'border-green-500' : 'border-purple-500'
              }`}
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">
                      {scenario.title}
                    </h3>
                    <p className="text-lg text-gray-600">{scenario.residents}</p>
                  </div>
                  <div className={`px-6 py-3 rounded-full ${
                    scenario.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                    scenario.color === 'green' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'
                  } font-semibold`}>
                    Case Study
                  </div>
                </div>

                {/* Technology Deployment */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Technology Deployment</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {scenario.technology.map((tech, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center mb-2">
                          {tech.name.includes('Radar') ? (
                            <Radio className="w-5 h-5 text-blue-600 mr-2" />
                          ) : (
                            <Wifi className="w-5 h-5 text-green-600 mr-2" />
                          )}
                          <span className="font-bold text-gray-900">{tech.name}</span>
                        </div>
                        <div className="text-sm font-semibold text-gray-700">{tech.count}</div>
                        <div className="text-sm text-gray-600">{tech.description}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Benefits */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Key Benefits & Results</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {scenario.benefits.map((benefit, idx) => (
                      <div key={idx} className="text-center p-4 bg-gray-50 rounded-lg">
                        <benefit.icon className={`w-8 h-8 mx-auto mb-2 ${
                          scenario.color === 'blue' ? 'text-blue-600' :
                          scenario.color === 'green' ? 'text-green-600' : 'text-purple-600'
                        }`} />
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                          {benefit.metric}
                        </div>
                        <div className="text-sm text-gray-600">{benefit.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApplicationScenarios;
