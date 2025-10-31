import React from 'react';
import { Radio, Waves, Brain, Zap, Bell } from 'lucide-react';

const TechnologyRadarDeepDive = () => {
  const signalSteps = [
    {
      number: '01',
      title: 'Signal Transmission',
      description: 'SFCW radar emits precise frequency-modulated signals across 5.8-7.2 GHz spectrum'
    },
    {
      number: '02',
      title: 'Environmental Mapping',
      description: 'Continuous scanning creates detailed 3D motion profiles of the monitored space'
    },
    {
      number: '03',
      title: 'Pattern Recognition',
      description: 'AI algorithms analyze micro-movements, breathing patterns, and motion signatures'
    },
    {
      number: '04',
      title: 'Event Classification',
      description: 'Machine learning models identify falls, breathing anomalies, and behavioral patterns'
    },
    {
      number: '05',
      title: 'Alert Generation',
      description: 'Instant notifications sent to caregivers with event classification and location data'
    }
  ];

  const useCases = [
    {
      icon: '🚿',
      title: 'Bathroom Monitoring',
      description: '360° coverage in high-risk areas where cameras are prohibited',
      metrics: ['Privacy-compliant', 'Slip detection', 'Steam/moisture resistant']
    },
    {
      icon: '🛏️',
      title: 'Bedroom Monitoring',
      description: 'Non-intrusive monitoring for overnight safety and sleep quality',
      metrics: ['Breathing monitoring', 'Bed exit detection', 'Fall alerts']
    },
    {
      icon: '🧠',
      title: 'Memory Care Units',
      description: 'Wandering detection and behavioral pattern analysis for dementia care',
      metrics: ['Gait analysis', 'Agitation detection', 'Elopement prevention']
    }
  ];

  const specs = [
    {
      category: 'RF Specifications',
      items: [
        { label: 'Frequency Range', value: '5.8-7.2 GHz' },
        { label: 'Bandwidth', value: '1.4 GHz' },
        { label: 'Transmit Power', value: '<0dBm (1mW)' },
        { label: 'FCC Compliance', value: 'Part 15.245' }
      ]
    },
    {
      category: 'Detection Capabilities',
      items: [
        { label: 'Range Resolution', value: '10cm' },
        { label: 'Angular Coverage', value: '120° horizontal' },
        { label: 'Detection Range', value: '0.3-10m' },
        { label: 'Breathing Rate Accuracy', value: '±1 BPM' }
      ]
    },
    {
      category: 'Physical Specifications',
      items: [
        { label: 'Dimensions', value: '12cm x 8cm x 3cm' },
        { label: 'Weight', value: '150g' },
        { label: 'Power Consumption', value: '<5W' },
        { label: 'Operating Temp', value: '-10°C to 50°C' }
      ]
    },
    {
      category: 'Connectivity & Processing',
      items: [
        { label: 'Network', value: 'WiFi 802.11ac, Ethernet' },
        { label: 'Processing', value: 'Edge AI + Cloud' },
        { label: 'Data Rate', value: '100 samples/sec' },
        { label: 'Latency', value: '<50ms' }
      ]
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            SFCW Radar Technology Deep Dive
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cutting-edge millimeter-wave radar for clinical-grade health monitoring
          </p>
        </div>

        {/* Signal Processing Pipeline */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How SFCW Radar Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {signalSteps.map((step, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl font-bold text-blue-600 mb-3">{step.number}</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Real-World Use Cases
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-5xl mb-4">{useCase.icon}</div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{useCase.title}</h4>
                <p className="text-gray-600 mb-4">{useCase.description}</p>
                <ul className="space-y-2">
                  {useCase.metrics.map((metric, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      {metric}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Specifications */}
        <div>
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Technical Specifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specs.map((spec, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                <h4 className="text-lg font-bold text-blue-600 mb-4 pb-2 border-b-2 border-blue-200">
                  {spec.category}
                </h4>
                <ul className="space-y-3">
                  {spec.items.map((item, idx) => (
                    <li key={idx} className="text-sm">
                      <span className="font-semibold text-gray-700">{item.label}:</span>
                      <br />
                      <span className="text-gray-600">{item.value}</span>
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

export default TechnologyRadarDeepDive;