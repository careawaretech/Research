import React from 'react';
import { Bath, UserCheck, Scale, Ban, CheckCircle } from 'lucide-react';

const PrivacyAdvantagesSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 lg:mb-8">
            Privacy Advantages in Action
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-world benefits that set Care Aware Tech apart from camera-based systems
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Bathroom Coverage */}
          <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-lg border-t-4 border-blue-500 hover:shadow-xl transition-shadow">
            <div className="text-center mb-6">
              <Bath className="w-12 h-12 lg:w-16 lg:h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl lg:text-2xl font-bold text-foreground">Complete Coverage</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <span className="text-red-800 font-medium text-sm">Camera Systems</span>
                <Ban className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-green-800 font-medium text-sm">Care Aware Tech</span>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                80% of elderly falls occur in bathrooms where camera systems cannot legally operate due to privacy laws.
              </p>
            </div>
          </div>

          {/* Family Acceptance */}
          <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-lg border-t-4 border-green-500 hover:shadow-xl transition-shadow">
            <div className="text-center mb-6">
              <UserCheck className="w-12 h-12 lg:w-16 lg:h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl lg:text-2xl font-bold text-foreground">Family Acceptance</h3>
            </div>
            <div className="space-y-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">95%+</div>
                <div className="text-green-800 font-medium">Family Approval Rate</div>
                <div className="text-sm text-green-600">No privacy concerns</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-3xl font-bold text-red-600 mb-2">60%</div>
                <div className="text-red-800 font-medium">Camera System Acceptance</div>
                <div className="text-sm text-red-600">Privacy resistance</div>
              </div>
            </div>
          </div>

          {/* Legal Compliance */}
          <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-lg border-t-4 border-purple-500 hover:shadow-xl transition-shadow">
            <div className="text-center mb-6">
              <Scale className="w-12 h-12 lg:w-16 lg:h-16 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl lg:text-2xl font-bold text-foreground">Legal Compliance</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                <svg className="w-5 h-5 text-purple-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-purple-800 font-medium text-sm">HIPAA-Aligned by Design</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                <span className="text-blue-800 font-medium text-sm">FCC-Compliant Frequencies</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <Scale className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-green-800 font-medium text-sm">No Privacy Law Violations</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyAdvantagesSection;
