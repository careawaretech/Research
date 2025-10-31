import React from 'react';
import { Building, Microscope, DollarSign, Check } from 'lucide-react';

const PartnershipTypesSection = () => {
  return (
    <section id="partnership-types" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 font-serif mb-6">Partnership Pathways</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the collaboration model that best fits your organization's goals and research interests
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Facility Partners */}
          <div className="partnership-card bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center transition-all duration-300 border-2 border-transparent hover:border-blue-600 hover:-translate-y-1 hover:shadow-xl">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 font-serif mb-4">Facility Partners</h3>
            <p className="text-gray-600 mb-6">Assisted living facilities and memory care units ready to pilot our technology</p>
            <div className="space-y-3 text-left">
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700">Free equipment during pilot</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700">Professional installation & training</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700">Co-publication opportunities</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700">Early adopter pricing</span>
              </div>
            </div>
            <button className="w-full mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Learn More
            </button>
          </div>

          {/* Research Collaborators */}
          <div className="partnership-card bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center transition-all duration-300 border-2 border-transparent hover:border-green-600 hover:-translate-y-1 hover:shadow-xl">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Microscope className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 font-serif mb-4">Research Collaborators</h3>
            <p className="text-gray-600 mb-6">Academic institutions and research organizations advancing healthcare technology</p>
            <div className="space-y-3 text-left">
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Co-investigator roles</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Data sharing agreements</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Joint grant applications</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Academic publications</span>
              </div>
            </div>
            <button className="w-full mt-6 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Join Research
            </button>
          </div>

          {/* Grant Collaborators */}
          <div className="partnership-card bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 text-center transition-all duration-300 border-2 border-transparent hover:border-purple-600 hover:-translate-y-1 hover:shadow-xl">
            <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 font-serif mb-4">Grant Collaborators</h3>
            <p className="text-gray-600 mb-6">Organizations supporting NIH SBIR/STTR funding and commercialization</p>
            <div className="space-y-3 text-left">
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
                <span className="text-gray-700">NIH Phase I & II support</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
                <span className="text-gray-700">Commercialization pathway</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
                <span className="text-gray-700">Regulatory guidance</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
                <span className="text-gray-700">Market validation</span>
              </div>
            </div>
            <button className="w-full mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              Explore Funding
            </button>
          </div>
        </div>

        {/* Partnership Benefits Matrix */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h3 className="text-3xl font-bold text-gray-900 font-serif text-center mb-8">Partnership Benefits Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-sm">
              <thead className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Benefit</th>
                  <th className="px-6 py-4 text-center font-semibold">Facility Partners</th>
                  <th className="px-6 py-4 text-center font-semibold">Research Collaborators</th>
                  <th className="px-6 py-4 text-center font-semibold">Grant Collaborators</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">Free Equipment Access</td>
                  <td className="px-6 py-4 text-center">
                    <Check className="w-6 h-6 text-green-600 inline-block" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Check className="w-6 h-6 text-green-600 inline-block" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-gray-400">N/A</span>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">Co-Publication Rights</td>
                  <td className="px-6 py-4 text-center">
                    <Check className="w-6 h-6 text-green-600 inline-block" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Check className="w-6 h-6 text-green-600 inline-block" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Check className="w-6 h-6 text-green-600 inline-block" />
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">Data Access & Sharing</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-orange-600 font-medium">Limited</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Check className="w-6 h-6 text-green-600 inline-block" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Check className="w-6 h-6 text-green-600 inline-block" />
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">Grant Funding Opportunities</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-gray-400">N/A</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Check className="w-6 h-6 text-green-600 inline-block" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Check className="w-6 h-6 text-green-600 inline-block" />
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">Early Adopter Pricing</td>
                  <td className="px-6 py-4 text-center">
                    <Check className="w-6 h-6 text-green-600 inline-block" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-orange-600 font-medium">Negotiable</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-gray-400">N/A</span>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">Technical Support</td>
                  <td className="px-6 py-4 text-center">
                    <Check className="w-6 h-6 text-green-600 inline-block" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Check className="w-6 h-6 text-green-600 inline-block" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Check className="w-6 h-6 text-green-600 inline-block" />
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

export default PartnershipTypesSection;
