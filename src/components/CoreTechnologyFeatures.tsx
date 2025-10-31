const CoreTechnologyFeatures = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 font-serif mb-6">Core Technology Features</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced capabilities designed specifically for healthcare environments with privacy as the foundation
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-br from-purple-600 to-blue-700 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6">
                <i className="fa-solid fa-shield-halved text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Privacy by Physics</h3>
              <p className="text-white/90 mb-6">
                No cameras, no recordings, no facial recognition. Our technology makes privacy violations physically impossible, not just policy-dependent.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <i className="fa-solid fa-check-circle text-green-300"></i>
                  <span className="text-sm text-white">HIPAA-aligned data processing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="fa-solid fa-check-circle text-green-300"></i>
                  <span className="text-sm text-white">Anonymous signal analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="fa-solid fa-check-circle text-green-300"></i>
                  <span className="text-sm text-white">Bathroom-safe monitoring</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6">
                <i className="fa-solid fa-bolt text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Real-Time Detection</h3>
              <p className="text-white/90 mb-6">
                Sub-2-second response time from fall detection to alert generation. Advanced AI processes signals instantly for immediate staff notification.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <i className="fa-solid fa-check-circle text-green-300"></i>
                  <span className="text-sm text-white">≤2 second alert response</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="fa-solid fa-check-circle text-green-300"></i>
                  <span className="text-sm text-white">98.9% sensitivity rate</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="fa-solid fa-check-circle text-green-300"></i>
                  <span className="text-sm text-white">0.1% false alarm rate</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6">
                <i className="fa-solid fa-heart-pulse text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Vital Signs Monitoring</h3>
              <p className="text-white/90 mb-6">
                Contactless monitoring of heart rate, respiration, and movement patterns. Early detection of health changes without wearable devices.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <i className="fa-solid fa-check-circle text-green-300"></i>
                  <span className="text-sm text-white">Heart rate ±3 BPM accuracy</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="fa-solid fa-check-circle text-green-300"></i>
                  <span className="text-sm text-white">Respiration rate monitoring</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="fa-solid fa-check-circle text-green-300"></i>
                  <span className="text-sm text-white">Sleep pattern analysis</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-teal-400 to-blue-500 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6">
                <i className="fa-solid fa-cogs text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Easy Integration</h3>
              <p className="text-white/90 mb-6">
                Seamless integration with existing facility management systems. WiFi platform uses current infrastructure, radar system installs in minutes.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
                  <div className="text-2xl font-bold text-white">15min</div>
                  <div className="text-sm text-white/90">Installation Time</div>
                </div>
                <div className="text-center p-4 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-sm text-white/90">Support Available</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6">
                <i className="fa-solid fa-chart-line text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Analytics Dashboard</h3>
              <p className="text-white/90 mb-6">
                Comprehensive reporting and analytics help optimize care delivery. Track trends, generate compliance reports, and improve outcomes.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
                  <div className="text-2xl font-bold text-white">Real-time</div>
                  <div className="text-sm text-white/90">Data Insights</div>
                </div>
                <div className="text-center p-4 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
                  <div className="text-2xl font-bold text-white">Custom</div>
                  <div className="text-sm text-white/90">Reports</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreTechnologyFeatures;