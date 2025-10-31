import React from 'react';
import { CheckCircle, Circle, Clock } from 'lucide-react';

const DevelopmentRoadmap = () => {
  const timeline = [
    {
      phase: 'Phase 1',
      status: 'Complete',
      quarter: 'Q2-Q3 2024',
      icon: CheckCircle,
      color: 'green',
      milestones: [
        { title: 'SFCW Radar Hardware Development', completed: true },
        { title: 'Core Fall Detection Algorithms', completed: true },
        { title: 'FCC Part 15 Compliance Certification', completed: true },
        { title: 'Initial Pilot Deployments (3 facilities)', completed: true },
        { title: 'WiFi CSI Algorithm Foundation', completed: true }
      ]
    },
    {
      phase: 'Phase 2',
      status: 'Active',
      quarter: 'Q4 2024 - Q1 2025',
      icon: Clock,
      color: 'blue',
      milestones: [
        { title: 'Multi-Resident Tracking Enhancement', completed: true },
        { title: 'Breathing & Sleep Quality Monitoring', completed: false },
        { title: 'WiFi Platform Beta Launch', completed: false },
        { title: 'Dashboard & Analytics Platform', completed: false },
        { title: 'EHR Integration Development', completed: false }
      ]
    },
    {
      phase: 'Phase 3',
      status: 'Planned',
      quarter: 'Q2-Q3 2025',
      icon: Circle,
      color: 'purple',
      milestones: [
        { title: 'Predictive Health Alert System', completed: false },
        { title: 'Advanced Gait Analysis & Fall Risk Prediction', completed: false },
        { title: 'Behavioral Pattern Recognition (Dementia Care)', completed: false },
        { title: 'Full EHR/EMR Integration Suite', completed: false },
        { title: 'Multi-Site Fleet Management Platform', completed: false }
      ]
    },
    {
      phase: 'Phase 4',
      status: 'Future',
      quarter: 'Q4 2025+',
      icon: Circle,
      color: 'gray',
      milestones: [
        { title: 'AI-Powered Care Recommendations', completed: false },
        { title: 'Voice Distress Detection Integration', completed: false },
        { title: 'Medication Adherence Monitoring', completed: false },
        { title: 'Social Isolation Detection & Alerts', completed: false },
        { title: 'Regulatory Approval for Clinical Settings', completed: false }
      ]
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Technology Development Roadmap
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our strategic development timeline for continuous innovation and platform expansion
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 via-blue-500 to-gray-300 hidden lg:block"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {timeline.map((phase, index) => (
              <div key={index} className="relative">
                <div className="lg:ml-20">
                  <div className={`bg-white rounded-xl shadow-lg overflow-hidden border-l-8 ${
                    phase.color === 'green' ? 'border-green-500' :
                    phase.color === 'blue' ? 'border-blue-500' :
                    phase.color === 'purple' ? 'border-purple-500' : 'border-gray-400'
                  }`}>
                    {/* Phase Header */}
                    <div className={`px-8 py-6 ${
                      phase.color === 'green' ? 'bg-green-50' :
                      phase.color === 'blue' ? 'bg-blue-50' :
                      phase.color === 'purple' ? 'bg-purple-50' : 'bg-gray-50'
                    }`}>
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center space-x-4">
                          <phase.icon className={`w-8 h-8 ${
                            phase.color === 'green' ? 'text-green-600' :
                            phase.color === 'blue' ? 'text-blue-600' :
                            phase.color === 'purple' ? 'text-purple-600' : 'text-gray-500'
                          }`} />
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">{phase.phase}</h3>
                            <p className="text-sm text-gray-600">{phase.quarter}</p>
                          </div>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          phase.color === 'green' ? 'bg-green-100 text-green-700' :
                          phase.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                          phase.color === 'purple' ? 'bg-purple-100 text-purple-700' : 'bg-gray-200 text-gray-700'
                        }`}>
                          {phase.status}
                        </span>
                      </div>
                    </div>

                    {/* Milestones */}
                    <div className="p-8">
                      <ul className="space-y-3">
                        {phase.milestones.map((milestone, idx) => (
                          <li key={idx} className="flex items-start space-x-3">
                            {milestone.completed ? (
                              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            ) : (
                              <Circle className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                            )}
                            <span className={`text-gray-700 ${milestone.completed ? 'line-through text-gray-500' : ''}`}>
                              {milestone.title}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className={`absolute left-8 top-8 w-6 h-6 rounded-full border-4 border-white transform -translate-x-1/2 hidden lg:block ${
                  phase.color === 'green' ? 'bg-green-500' :
                  phase.color === 'blue' ? 'bg-blue-500' :
                  phase.color === 'purple' ? 'bg-purple-500' : 'bg-gray-400'
                }`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DevelopmentRoadmap;
