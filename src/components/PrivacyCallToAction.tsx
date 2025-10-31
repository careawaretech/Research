import React from 'react';
import { Building2, Microscope, TrendingUp, Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PrivacyCallToAction = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-900 to-green-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 lg:mb-8">
            Ready to Lead the Privacy Revolution?
          </h2>
          <p className="text-lg lg:text-xl text-blue-100 mb-8 lg:mb-12 leading-relaxed">
            Join forward-thinking facilities and research institutions pioneering the future of dignified senior care monitoring
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-8 lg:mb-12">
            {/* Facility Partners */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/20 hover:bg-white/15 transition-colors">
              <Building2 className="w-10 h-10 lg:w-12 lg:h-12 text-blue-300 mx-auto mb-4" />
              <h3 className="text-lg lg:text-xl font-bold text-white mb-3">Facility Partners</h3>
              <p className="text-blue-200 mb-6 text-sm lg:text-base">
                Join our pilot program and be the first to offer truly private fall detection
              </p>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                size="lg"
              >
                Become a Pilot Partner
              </Button>
            </div>
            
            {/* Research Collaborators */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/20 hover:bg-white/15 transition-colors">
              <Microscope className="w-10 h-10 lg:w-12 lg:h-12 text-green-300 mx-auto mb-4" />
              <h3 className="text-lg lg:text-xl font-bold text-white mb-3">Research Collaborators</h3>
              <p className="text-green-200 mb-6 text-sm lg:text-base">
                Partner with us on groundbreaking privacy-first healthcare technology research
              </p>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                size="lg"
              >
                Collaborate with Our Team
              </Button>
            </div>
            
            {/* Investors */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/20 hover:bg-white/15 transition-colors">
              <TrendingUp className="w-10 h-10 lg:w-12 lg:h-12 text-purple-300 mx-auto mb-4" />
              <h3 className="text-lg lg:text-xl font-bold text-white mb-3">Investors</h3>
              <p className="text-purple-200 mb-6 text-sm lg:text-base">
                Invest in the future of privacy-compliant healthcare technology
              </p>
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                size="lg"
              >
                Request Executive Brief
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
            <Button 
              size="lg"
              className="bg-white text-blue-900 hover:bg-blue-50 shadow-lg"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Privacy White Paper
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Privacy Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyCallToAction;
