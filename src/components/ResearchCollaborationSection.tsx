import React from 'react';
import { Microscope, Radio, Wifi, Brain, Users } from 'lucide-react';

const ResearchCollaborationSection = () => {
  return (
    <section id="research-collaboration" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Microscope className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 font-serif mb-6">Research Collaboration Program</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our network of academic and industry partners advancing privacy-first healthcare technology
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          {/* Research Areas */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 font-serif mb-6">Active Research Areas</h3>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Radio className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">SFCW Radar Signal Processing</h4>
                      <p className="text-blue-800 mb-3">Advanced algorithms for contactless vital signs monitoring and fall detection accuracy improvement</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm">Machine Learning</span>
                        <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm">Signal Processing</span>
                        <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm">Healthcare</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Wifi className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-900 mb-2">WiFi-Based Fall Detection</h4>
                      <p className="text-green-800 mb-3">Leveraging existing WiFi infrastructure for scalable, low-cost fall detection in residential settings</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm">CSI Analysis</span>
                        <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm">Deep Learning</span>
                        <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm">IoT</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-900 mb-2">Privacy-Preserving AI Models</h4>
                      <p className="text-purple-800 mb-3">Developing federated learning approaches for healthcare monitoring without compromising patient privacy</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-sm">Privacy Tech</span>
                        <span className="px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-sm">Federated Learning</span>
                        <span className="px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-sm">Ethics</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Collaboration Models */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 font-serif mb-6">Collaboration Models</h3>
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-gray-900 mb-3">Co-Investigator Roles</h4>
                  <p className="text-gray-600 mb-4">
                    Join NIH SBIR/STTR applications as co-PI or collaborator with access to real-world deployment data and clinical validation opportunities
                  </p>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Grant writing collaboration</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Access to pilot facility data</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Joint IP development</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-gray-900 mb-3">Data Sharing Partnerships</h4>
                  <p className="text-gray-600 mb-4">
                    Access anonymized fall detection, vital signs, and activity data from pilot deployments under structured data use agreements
                  </p>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Anonymized sensor data</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Clinical outcome metrics</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>IRB-compliant protocols</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-gray-900 mb-3">Joint Publications</h4>
                  <p className="text-gray-600 mb-4">
                    Co-author peer-reviewed papers, conference presentations, and case studies based on pilot deployment results
                  </p>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>First-author opportunities</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Conference presentations</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>White paper development</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-gray-900 mb-3">Student Research Projects</h4>
                  <p className="text-gray-600 mb-4">
                    Graduate and undergraduate students can conduct thesis/capstone projects using our technology platforms
                  </p>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Master's thesis opportunities</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>PhD dissertation support</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Capstone projects</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Research Partners */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-xl p-8">
          <h3 className="text-3xl font-bold text-gray-900 font-serif text-center mb-8">Current Research Partners</h3>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Portland State University</h4>
              <p className="text-gray-600 mb-4">
                Electrical & Computer Engineering Department collaboration on signal processing algorithms
              </p>
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="text-sm text-blue-900 font-medium">Active Projects: 2</div>
                <div className="text-xs text-blue-700 mt-1">Joint Publications: 1</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">OHSU</h4>
              <p className="text-gray-600 mb-4">
                Oregon Health & Science University partnership on clinical validation and geriatric care research
              </p>
              <div className="bg-green-50 rounded-lg p-3">
                <div className="text-sm text-green-900 font-medium">Active Projects: 1</div>
                <div className="text-xs text-green-700 mt-1">Clinical Trials: Planned</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Intel Corporation</h4>
              <p className="text-gray-600 mb-4">
                Technology partnership for edge computing optimization and IoT integration
              </p>
              <div className="bg-purple-50 rounded-lg p-3">
                <div className="text-sm text-purple-900 font-medium">Technology Partnership</div>
                <div className="text-xs text-purple-700 mt-1">Hardware Optimization</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchCollaborationSection;
