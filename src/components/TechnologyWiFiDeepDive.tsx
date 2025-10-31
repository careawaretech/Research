import React from 'react';
import { Wifi, Database, Cpu, CheckCircle, ArrowRight } from 'lucide-react';

const TechnologyWiFiDeepDive = () => {
  const signalSteps = [
    {
      number: '01',
      title: 'CSI Data Extraction',
      description: 'Channel State Information extracted from WiFi signals reveals fine-grained motion data'
    },
    {
      number: '02',
      title: 'Signal Preprocessing',
      description: 'Advanced filtering removes noise and environmental interference from raw CSI data'
    },
    {
      number: '03',
      title: 'Feature Extraction',
      description: 'Machine learning extracts motion signatures, breathing patterns, and behavioral markers'
    },
    {
      number: '04',
      title: 'Classification',
      description: 'Deep learning models classify activities: falls, walking, sitting, breathing anomalies'
    },
    {
      number: '05',
      title: 'Event Detection & Alerts',
      description: 'Real-time alerts generated for critical events with location and severity assessment'
    }
  ];

  const advantages = {
    infrastructure: [
      'Leverages existing WiFi network - no new hardware needed',
      'Scales instantly across entire facility',
      'Software-only deployment in 24-48 hours',
      'Zero physical installation or maintenance costs'
    ],
    operational: [
      'Continuous monitoring without resident compliance',
      'Works through walls and in all rooms simultaneously',
      'No privacy concerns - analyzes signal patterns, not images',
      'Integrates with existing facility management systems'
    ]
  };

  const roadmap = [
    {
      phase: 'Phase 1',
      status: 'Complete',
      quarter: 'Q3 2024',
      items: [
        'Core CSI extraction algorithms',
        'Fall detection model training',
        'Router compatibility testing',
        'Initial facility pilots'
      ],
      color: 'green'
    },
    {
      phase: 'Phase 2',
      status: 'In Progress',
      quarter: 'Q4 2024',
      items: [
        'Breathing & sleep quality monitoring',
        'Wandering/elopement detection',
        'Multi-resident tracking',
        'Dashboard & analytics platform'
      ],
      color: 'blue'
    },
    {
      phase: 'Phase 3',
      status: 'Planned',
      quarter: 'Q1 2025',
      items: [
        'Behavioral pattern analysis',
        'Predictive health alerts',
        'Integration with EHR systems',
        'Advanced gait analysis'
      ],
      color: 'purple'
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            WiFi Signal Analysis Platform Deep Dive
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Revolutionary CSI technology transforms existing WiFi networks into health monitoring systems
          </p>
        </div>

        {/* Signal Pipeline */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            WiFi CSI Signal Analysis Pipeline
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {signalSteps.map((step, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl font-bold text-green-600 mb-3">{step.number}</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Advantages */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Key Advantages of WiFi Sensing
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <Wifi className="w-8 h-8 text-blue-600 mr-3" />
                <h4 className="text-2xl font-bold text-gray-900">Infrastructure Benefits</h4>
              </div>
              <ul className="space-y-3">
                {advantages.infrastructure.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-50 rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <Database className="w-8 h-8 text-green-600 mr-3" />
                <h4 className="text-2xl font-bold text-gray-900">Operational Benefits</h4>
              </div>
              <ul className="space-y-3">
                {advantages.operational.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Development Roadmap */}
        <div>
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            WiFi Platform Development Roadmap
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roadmap.map((phase, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl p-6 shadow-lg border-t-4 ${
                  phase.color === 'green' ? 'border-green-500' :
                  phase.color === 'blue' ? 'border-blue-500' : 'border-purple-500'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-2xl font-bold text-gray-900">{phase.phase}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    phase.color === 'green' ? 'bg-green-100 text-green-700' :
                    phase.color === 'blue' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                  }`}>
                    {phase.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-4 font-semibold">
                  Target: {phase.quarter}
                </div>
                <ul className="space-y-2">
                  {phase.items.map((item, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700">
                      <ArrowRight className="w-4 h-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyWiFiDeepDive;