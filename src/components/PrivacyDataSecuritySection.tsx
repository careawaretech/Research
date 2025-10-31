import React from 'react';
import { UserX, Fingerprint, TrendingUp, Lock, Server, Shield, Key, Hospital, Radio, Globe, Eye, BarChart, Settings, XCircle, Microscope, GraduationCap, Cpu, Award } from 'lucide-react';

const PrivacyDataSecuritySection = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 lg:mb-8">
            Data Security & Compliance
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            Beyond privacy by design, our systems implement enterprise-grade security and regulatory compliance
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-12 lg:mb-16">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Anonymous Data Collection */}
            <div className="bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-2xl p-6 lg:p-8">
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">
                Anonymous Data Collection
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <UserX className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">No Personal Identifiers</h4>
                    <p className="text-muted-foreground text-sm">
                      Motion signatures contain no names, faces, or identifying characteristics
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Fingerprint className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Biometric-Free Detection</h4>
                    <p className="text-muted-foreground text-sm">
                      No fingerprints, facial recognition, or biometric data collection
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Aggregated Analytics Only</h4>
                    <p className="text-muted-foreground text-sm">
                      Individual events processed for safety, trends analyzed in aggregate
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Encryption & Transmission */}
            <div className="bg-gradient-to-br from-green-50/50 to-blue-50/50 rounded-2xl p-6 lg:p-8">
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">
                Encryption & Transmission
              </h3>
              <div className="grid grid-cols-2 gap-4 lg:gap-6">
                <div className="text-center p-4 bg-card rounded-lg shadow">
                  <Lock className="w-8 h-8 lg:w-10 lg:h-10 text-green-600 mx-auto mb-3" />
                  <div className="font-semibold text-foreground">AES-256</div>
                  <div className="text-xs lg:text-sm text-muted-foreground">End-to-end encryption</div>
                </div>
                <div className="text-center p-4 bg-card rounded-lg shadow">
                  <Server className="w-8 h-8 lg:w-10 lg:h-10 text-blue-600 mx-auto mb-3" />
                  <div className="font-semibold text-foreground">On-Premises</div>
                  <div className="text-xs lg:text-sm text-muted-foreground">Local processing option</div>
                </div>
                <div className="text-center p-4 bg-card rounded-lg shadow">
                  <Shield className="w-8 h-8 lg:w-10 lg:h-10 text-purple-600 mx-auto mb-3" />
                  <div className="font-semibold text-foreground">TLS 1.3</div>
                  <div className="text-xs lg:text-sm text-muted-foreground">Secure transmission</div>
                </div>
                <div className="text-center p-4 bg-card rounded-lg shadow">
                  <Key className="w-8 h-8 lg:w-10 lg:h-10 text-orange-600 mx-auto mb-3" />
                  <div className="font-semibold text-foreground">PKI</div>
                  <div className="text-xs lg:text-sm text-muted-foreground">Certificate management</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Regulatory Compliance */}
            <div className="bg-card border-2 border-border rounded-2xl p-6 lg:p-8">
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">
                Regulatory Compliance
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Hospital className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-blue-900 text-base lg:text-lg">HIPAA Alignment</h4>
                    <p className="text-blue-700 text-sm">
                      Anonymous data processing meets healthcare privacy standards
                    </p>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs lg:text-sm font-medium bg-blue-100 text-blue-800">
                        <Shield className="w-3 h-3 mr-1" />
                        Compliant by Design
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Radio className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-green-900 text-base lg:text-lg">FCC Compliance</h4>
                    <p className="text-green-700 text-sm">
                      5-7 GHz radar frequencies fully authorized for healthcare use
                    </p>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs lg:text-sm font-medium bg-green-100 text-green-800">
                        <Award className="w-3 h-3 mr-1" />
                        Certified Frequencies
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-purple-900 text-base lg:text-lg">International Standards</h4>
                    <p className="text-purple-700 text-sm">
                      ISO 27001 security framework and EU GDPR principles
                    </p>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs lg:text-sm font-medium bg-purple-100 text-purple-800">
                        <Globe className="w-3 h-3 mr-1" />
                        Global Ready
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Family Transparency Portal */}
            <div className="bg-gradient-to-br from-orange-50/50 to-red-50/50 rounded-2xl p-6 lg:p-8">
              <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-6">
                Family Transparency Portal
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-card rounded-lg">
                  <Eye className="w-5 h-5 text-orange-600 flex-shrink-0" />
                  <span className="text-foreground text-sm">Opt-in alert notifications for families</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-card rounded-lg">
                  <BarChart className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-foreground text-sm">Anonymous activity summaries</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-card rounded-lg">
                  <Settings className="w-5 h-5 text-purple-600 flex-shrink-0" />
                  <span className="text-foreground text-sm">Granular privacy controls</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-card rounded-lg">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <span className="text-foreground text-sm">No video or audio access ever</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="text-center">
          <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-6 lg:mb-8">
            Trusted by Industry Leaders
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            <div className="bg-card p-6 rounded-xl shadow-lg border-2 border-border hover:border-blue-300 transition-colors">
              <div className="h-10 lg:h-12 mx-auto mb-4 bg-blue-100 rounded-lg flex items-center justify-center">
                <Microscope className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600" />
              </div>
              <div className="text-sm font-medium text-foreground">NIH SBIR</div>
              <div className="text-xs text-muted-foreground">Grant Application</div>
            </div>
            <div className="bg-card p-6 rounded-xl shadow-lg border-2 border-border hover:border-green-300 transition-colors">
              <div className="h-10 lg:h-12 mx-auto mb-4 bg-green-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 lg:w-8 lg:h-8 text-green-600" />
              </div>
              <div className="text-sm font-medium text-foreground">Portland State</div>
              <div className="text-xs text-muted-foreground">Research Partner</div>
            </div>
            <div className="bg-card p-6 rounded-xl shadow-lg border-2 border-border hover:border-purple-300 transition-colors">
              <div className="h-10 lg:h-12 mx-auto mb-4 bg-purple-100 rounded-lg flex items-center justify-center">
                <Cpu className="w-6 h-6 lg:w-8 lg:h-8 text-purple-600" />
              </div>
              <div className="text-sm font-medium text-foreground">Intel Corp</div>
              <div className="text-xs text-muted-foreground">RF Engineering</div>
            </div>
            <div className="bg-card p-6 rounded-xl shadow-lg border-2 border-border hover:border-orange-300 transition-colors">
              <div className="h-10 lg:h-12 mx-auto mb-4 bg-orange-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 lg:w-8 lg:h-8 text-orange-600" />
              </div>
              <div className="text-sm font-medium text-foreground">HIPAA Aligned</div>
              <div className="text-xs text-muted-foreground">Privacy Certified</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyDataSecuritySection;
