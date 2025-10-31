import React from 'react';
import { TrendingUp, Users, DollarSign, Atom, University, Network, Award } from 'lucide-react';

const PrivacyMarketImpactSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 lg:mb-8">
            Market Impact & Competitive Benefits
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            Privacy-first technology creates significant competitive advantages and market opportunities
          </p>
        </div>

        {/* Three Column Stats */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 mb-12 lg:mb-16">
          {/* Market Expansion */}
          <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-xl border-t-4 border-blue-500">
            <div className="text-center mb-6">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 lg:w-10 lg:h-10 text-blue-600" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-foreground">Market Expansion</h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">80%+</div>
                <div className="text-blue-800 font-medium">Bathroom Coverage</div>
                <div className="text-sm text-blue-600">Previously inaccessible market</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">3x</div>
                <div className="text-green-800 font-medium">Addressable Market</div>
                <div className="text-sm text-green-600">Includes privacy-sensitive facilities</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-2">95%+</div>
                <div className="text-purple-800 font-medium">Family Acceptance</div>
                <div className="text-sm text-purple-600">No privacy concerns</div>
              </div>
            </div>
          </div>

          {/* Sales Advantages */}
          <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-xl border-t-4 border-green-500">
            <div className="text-center mb-6">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 lg:w-10 lg:h-10 text-green-600" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-foreground">Sales Advantages</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="font-medium text-green-800 text-sm">No Family Objections</div>
                  <div className="text-xs text-green-600">Smoother procurement process</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <div>
                  <div className="font-medium text-blue-800 text-sm">Facility-Wide Deployment</div>
                  <div className="text-xs text-blue-600">No restricted areas</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                <svg className="w-5 h-5 text-purple-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="font-medium text-purple-800 text-sm">Easier Procurement</div>
                  <div className="text-xs text-purple-600">No ethics committee delays</div>
                </div>
              </div>
            </div>
          </div>

          {/* Cost Advantages */}
          <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-xl border-t-4 border-orange-500">
            <div className="text-center mb-6">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 lg:w-10 lg:h-10 text-orange-600" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-foreground">Cost Advantages</h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 mb-2">40%</div>
                <div className="text-orange-800 font-medium">Lower Legal Risk</div>
                <div className="text-sm text-orange-600">No privacy litigation exposure</div>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600 mb-2">60%</div>
                <div className="text-red-800 font-medium">Faster Implementation</div>
                <div className="text-sm text-red-600">No consent processes needed</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">25%</div>
                <div className="text-green-800 font-medium">Lower Staff Training</div>
                <div className="text-sm text-green-600">No privacy protocols</div>
              </div>
            </div>
          </div>
        </div>

        {/* Competitive Moats */}
        <div className="bg-card rounded-3xl shadow-2xl p-8 lg:p-12">
          <h3 className="text-3xl lg:text-4xl font-bold text-foreground text-center mb-8 lg:mb-12">
            Sustainable Competitive Moats
          </h3>
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="space-y-8">
              <div className="flex items-start space-x-4 lg:space-x-6">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Atom className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-xl lg:text-2xl font-bold text-foreground mb-3">
                    Physics-Based Differentiation
                  </h4>
                  <p className="text-muted-foreground mb-4">
                    Competitors cannot replicate privacy guarantees without abandoning their camera-based architectures. Switching costs are prohibitive.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="font-semibold text-blue-800 text-sm">Competitive Response Time</div>
                    <div className="text-blue-600 text-sm">3-5 years minimum for technology pivot</div>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4 lg:space-x-6">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-green-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <University className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-xl lg:text-2xl font-bold text-foreground mb-3">
                    Academic Research Moat
                  </h4>
                  <p className="text-muted-foreground mb-4">
                    Deep academic partnerships and PhD-level expertise create high barriers to entry. Continuous innovation through research collaboration.
                  </p>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="font-semibold text-green-800 text-sm">Research Pipeline</div>
                    <div className="text-green-600 text-sm">15+ publications, ongoing NIH funding</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-4 lg:space-x-6">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Network className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-xl lg:text-2xl font-bold text-foreground mb-3">
                    Network Effects
                  </h4>
                  <p className="text-muted-foreground mb-4">
                    Each facility deployment improves algorithm accuracy. Multi-site data creates compound value that competitors cannot easily replicate.
                  </p>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="font-semibold text-purple-800 text-sm">Data Advantage</div>
                    <div className="text-purple-600 text-sm">Exponential improvement with scale</div>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4 lg:space-x-6">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-xl lg:text-2xl font-bold text-foreground mb-3">
                    Regulatory First-Mover
                  </h4>
                  <p className="text-muted-foreground mb-4">
                    Privacy-by-design positions us ahead of inevitable regulatory tightening. GDPR-style laws will favor our approach.
                  </p>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="font-semibold text-orange-800 text-sm">Regulatory Tailwinds</div>
                    <div className="text-orange-600 text-sm">Privacy laws increasingly strict</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyMarketImpactSection;
