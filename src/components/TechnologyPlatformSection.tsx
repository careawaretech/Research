import React, { useState, useEffect, useRef } from 'react';
import { Check, Activity, Home, Building2, Shield, Wifi, Zap, Signal, Settings, TrendingUp, Bell } from 'lucide-react';
import FeatureCard from './FeatureCard';

const TechnologyPlatformSection = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const tabContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentTouchStart, setContentTouchStart] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  
  const tabs = ['Overview', 'SFCW Radar System', 'WiFi Signal Analysis'];
  const activeTabIndex = tabs.indexOf(activeTab);

  // Auto-advance slideshow for mobile
  useEffect(() => {
    if (!autoPlay) return;
    
    const timer = setInterval(() => {
      setActiveTab((prev) => {
        const currentIndex = tabs.indexOf(prev);
        return tabs[(currentIndex + 1) % tabs.length];
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  // Content swipe handlers
  const handleContentTouchStart = (e: React.TouchEvent) => {
    setContentTouchStart(e.touches[0].clientX);
  };

  const handleContentTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = contentTouchStart - touchEnd;
    
    // Swipe threshold of 50px
    if (Math.abs(diff) > 50) {
      if (diff > 0 && activeTabIndex < tabs.length - 1) {
        // Swiped left, go to next tab
        setActiveTab(tabs[activeTabIndex + 1]);
      } else if (diff < 0 && activeTabIndex > 0) {
        // Swiped right, go to previous tab
        setActiveTab(tabs[activeTabIndex - 1]);
      }
    }
  };

  const handleDotClick = (tabName: string) => {
    setActiveTab(tabName);
    setAutoPlay(false); // Stop auto-advance when user clicks a dot
  };

  return (
    <section className="bg-gray-50 w-full py-16 lg:py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 lg:mb-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-gray-900 text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.2] tracking-tight">
              Dual Technology Platform
            </h2>
            <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-6 sm:leading-7 mt-3 sm:mt-4 lg:mt-[29px] max-w-[90%] mx-auto">
              Privacy by Physics, Not Policy — Two complementary technologies, unified by ethical design
            </p>
          </div>
        </div>
        
        <div className="bg-white shadow-lg overflow-hidden rounded-2xl">
          {/* Desktop tabs - hidden on mobile */}
          <div className="hidden sm:block border-b border-gray-200 bg-white lg:static sticky top-0 z-30 lg:shadow-none shadow-md relative">
            <nav 
              ref={tabContainerRef}
              role="tablist"
              className="flex gap-0"
            >
              <button
                role="tab"
                aria-selected={activeTab === 'Overview'}
                aria-controls="overview-panel"
                aria-label="Overview tab"
                onClick={() => setActiveTab('Overview')}
                className={`h-auto py-4 px-6 md:px-8 text-base font-semibold transition-all duration-300 whitespace-nowrap ${
                  activeTab === 'Overview'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Overview
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'SFCW Radar System'}
                aria-controls="radar-panel"
                aria-label="SFCW Radar System tab"
                onClick={() => setActiveTab('SFCW Radar System')}
                className={`h-auto py-4 px-6 md:px-8 text-base font-semibold transition-all duration-300 whitespace-nowrap ${
                  activeTab === 'SFCW Radar System'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                SFCW Radar System
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'WiFi Signal Analysis'}
                aria-controls="wifi-panel"
                aria-label="WiFi Signal Analysis tab"
                onClick={() => setActiveTab('WiFi Signal Analysis')}
                className={`h-auto py-4 px-6 md:px-8 text-base font-semibold transition-all duration-300 whitespace-nowrap ${
                  activeTab === 'WiFi Signal Analysis'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                WiFi Signal Analysis
              </button>
            </nav>
          </div>
          
          {/* Slideshow indicators - visible on mobile, hidden on tablet/desktop with tabs */}
          <div className="sm:hidden flex justify-center items-center gap-2 py-4 bg-white border-b border-gray-200">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                onClick={() => handleDotClick(tab)}
                className={`h-2 rounded-full transition-all ${
                  index === activeTabIndex ? 'bg-blue-600 w-6' : 'bg-gray-300 w-2'
                }`}
                aria-label={`Go to ${tab}`}
              />
            ))}
          </div>
          
          <div className="w-full relative">
            {/* Mobile: Slideshow with fade transitions */}
            <div className="sm:hidden relative">
              <div 
                className="p-4"
                ref={contentRef}
                onTouchStart={handleContentTouchStart}
                onTouchEnd={handleContentTouchEnd}
              >
                {/* Overview Slide */}
                <div 
                  className={`transition-opacity duration-500 ${
                    activeTab === 'Overview' ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
                  }`}
                  role="tabpanel" 
                  id="overview-panel-mobile" 
                  aria-labelledby="overview-tab"
                >
                  <div className="gap-5 flex flex-col items-stretch">
                    <div className="w-full">
                      <h3 className="text-gray-900 text-xl font-bold mb-4">Overview</h3>
                      <div className="w-full h-[220px] rounded-2xl overflow-hidden mb-4">
                        <div className="bg-cyan-50 w-full h-full flex flex-col items-center justify-center p-6">
                          <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mb-3">
                            <Shield className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-gray-900 text-lg font-bold text-center mb-2">
                            No Cameras. Ever.
                          </h3>
                          <p className="text-gray-600 text-sm text-center max-w-md px-2">
                            Physical impossibility of capturing faces or identifiable images
                          </p>
                          <div className="bg-green-500 rounded-full w-8 h-8 flex items-center justify-center mt-3">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full">
                      <div className="flex flex-col w-full">
                        <h3 className="text-gray-900 text-xl font-semibold leading-[1.3]">
                          Core Concept: Privacy by Physics
                        </h3>
                        <p className="text-gray-600 text-sm leading-6 mt-3">
                          Both technologies use contactless sensing without imaging— making privacy violations physically impossible, not just policy-dependent.
                        </p>
                        
                        <div className="bg-green-50 border-green-200 border mt-8 p-6 rounded-lg">
                          <h4 className="text-green-800 font-semibold text-base mb-3">
                            Shared Capabilities
                          </h4>
                          <ul className="text-green-700 text-sm space-y-2">
                            <li>• Fall detection with &lt;2s response time</li>
                            <li>• Heart rate monitoring (contactless)</li>
                            <li>• Respiration rate tracking</li>
                            <li>• No cameras, no recordings, no facial recognition</li>
                            <li>• HIPAA-aligned data processing</li>
                          </ul>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mt-8">
                          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-blue-600">24/7</div>
                            <div className="text-sm text-gray-600 mt-1">Continuous Monitoring</div>
                          </div>
                          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-blue-600">&lt;2s</div>
                            <div className="text-sm text-gray-600 mt-1">Alert Response Time</div>
                          </div>
                          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-blue-600">0%</div>
                            <div className="text-sm text-gray-600 mt-1">Camera Usage</div>
                          </div>
                          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-blue-600">100%</div>
                            <div className="text-sm text-gray-600 mt-1">Privacy Compliance</div>
                          </div>
                        </div>
                        
                        {/* Mobile: 3 icon containers at bottom */}
                        <div className="flex flex-col gap-6 mt-8">
                          <FeatureCard 
                            icon={Shield} 
                            title="Privacy-First Monitoring" 
                            description="Fall Detection System"
                            variant="blue"
                            horizontal
                          />
                          <FeatureCard 
                            icon={Activity} 
                            title="Clinical-Grade Analytics" 
                            description="AI Pattern Classification"
                            variant="green"
                            horizontal
                          />
                          <FeatureCard 
                            icon={Bell} 
                            title="Instant Alerts & Response" 
                            description="Rapid Emergency Notification"
                            variant="purple"
                            horizontal
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SFCW Radar Slide */}
                <div 
                  className={`transition-opacity duration-500 ${
                    activeTab === 'SFCW Radar System' ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
                  }`}
                  role="tabpanel" 
                  id="radar-panel-mobile" 
                  aria-labelledby="radar-tab"
                >
                  <div className="gap-5 flex flex-col items-stretch">
                    <div className="w-full">
                      <h3 className="text-gray-900 text-xl font-bold mb-4">SFCW Radar System</h3>
                      <div className="flex flex-col">
                        <div className="w-full h-[220px] rounded-2xl overflow-hidden mb-4">
                          <img
                            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop"
                            alt="SFCW Radar System Technology"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full">
                      <div className="flex flex-col w-full">
                        <p className="text-gray-600 text-sm leading-6 mt-3">
                          Radar-based monitoring using millimeter-wave technology. Purpose-built medical sensors for clinical deployment.
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4 mt-8">
                          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-blue-600">98.9%</div>
                            <div className="text-sm text-gray-600 mt-1">Sensitivity</div>
                          </div>
                          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-blue-600">99%</div>
                            <div className="text-sm text-gray-600 mt-1">Specificity</div>
                          </div>
                          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-blue-600">&lt;2s</div>
                            <div className="text-sm text-gray-600 mt-1">Response Time</div>
                          </div>
                          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-blue-600">0.1%</div>
                            <div className="text-sm text-gray-600 mt-1">False Alarms</div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-6 mt-6">
                          <FeatureCard 
                            icon={Activity} 
                            title="Bathroom Monitoring" 
                            description="Instant fall and vital sign monitoring in high-risk areas."
                            variant="blue"
                            horizontal
                          />
                          <FeatureCard 
                            icon={Home} 
                            title="Bedroom Coverage" 
                            description="Sleep monitoring and nighttime safety."
                            variant="blue"
                            horizontal
                          />
                          <FeatureCard 
                            icon={Building2} 
                            title="Memory Care" 
                            description="Wandering detection and behavior analysis."
                            variant="blue"
                            horizontal
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* WiFi Signal Slide */}
                <div 
                  className={`transition-opacity duration-500 ${
                    activeTab === 'WiFi Signal Analysis' ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
                  }`}
                  role="tabpanel" 
                  id="wifi-panel-mobile" 
                  aria-labelledby="wifi-tab"
                >
                  <div className="gap-5 flex flex-col items-stretch">
                    <div className="w-full">
                      <h3 className="text-gray-900 text-xl font-bold mb-4">WiFi Signal Analysis</h3>
                      <div className="flex flex-col">
                        <div className="w-full h-[220px] rounded-2xl overflow-hidden mb-4">
                          <img
                            src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=400&fit=crop"
                            alt="WiFi Signal Analysis Technology"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full">
                      <div className="flex flex-col w-full">
                        <p className="text-gray-600 text-sm leading-6 mt-3">
                          Analyzing existing WiFi signal disruptions to detect movement and vital signs. No new hardware—retrofits into current infrastructure.
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4 mt-8">
                          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-green-600">$0</div>
                            <div className="text-sm text-gray-600 mt-1">Hardware Cost</div>
                          </div>
                          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-green-600">100%</div>
                            <div className="text-sm text-gray-600 mt-1">Infrastructure Reuse</div>
                          </div>
                          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-green-600">TBD</div>
                            <div className="text-sm text-gray-600 mt-1">Accuracy Target</div>
                          </div>
                          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-green-600">2024</div>
                            <div className="text-sm text-gray-600 mt-1">Validation Phase</div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-6 mt-6">
                          <FeatureCard 
                            icon={Signal} 
                            title="Feasibility Study" 
                            description="Controlled testing to validate WiFi sensing."
                            variant="green"
                            horizontal
                          />
                          <FeatureCard 
                            icon={Settings} 
                            title="Algorithm Optimization" 
                            description="ML refinement for better accuracy, fewer false positives."
                            variant="green"
                            horizontal
                          />
                          <FeatureCard 
                            icon={TrendingUp} 
                            title="Clinical Validation" 
                            description="Large-scale healthcare trials for regulatory approval"
                            variant="green"
                            horizontal
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tablet & Desktop: Standard tab content */}
            <div className="hidden sm:block">
              <div 
                className="p-6 lg:p-12"
              >
              
              {/* Overview Tab Content */}
              {activeTab === 'Overview' && (
                <div role="tabpanel" id="overview-panel" aria-labelledby="overview-tab" className="flex flex-col">
                  <div className="gap-5 flex lg:flex-row flex-col items-stretch">
                    <div className="w-full lg:w-6/12 lg:order-2">
                      <div className="flex flex-col lg:h-full">
                        <div className="w-full h-[220px] sm:h-[280px] lg:flex-1 rounded-2xl overflow-hidden mb-4">
                          <div className="bg-cyan-50 w-full h-full flex flex-col items-center justify-center p-6">
                            <div className="bg-blue-600 rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center mb-3 sm:mb-4">
                              <Shield className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
                            </div>
                            <h3 className="text-gray-900 text-lg sm:text-xl md:text-2xl font-bold text-center mb-2 sm:mb-3">
                              No Cameras. Ever.
                            </h3>
                            <p className="text-gray-600 text-sm sm:text-base text-center max-w-md px-2">
                              Physical impossibility of capturing faces or identifiable images
                            </p>
                            <div className="bg-green-500 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center mt-3 sm:mt-4">
                              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </div>
                          </div>
                        </div>
                        
                        {/* Desktop only: Show cards under image */}
                        <div className="hidden lg:flex flex-col gap-6">
                          <FeatureCard
                            icon={Shield}
                            title="Privacy-First Monitoring"
                            description="Fall Detection System"
                            variant="blue"
                            horizontal
                          />
                          <FeatureCard
                            icon={Activity}
                            title="Clinical-Grade Analytics"
                            description="AI Pattern Classification"
                            variant="green"
                            horizontal
                          />
                          <FeatureCard
                            icon={Bell}
                            title="Instant Alerts & Response"
                            description="Rapid Emergency Notification"
                            variant="purple"
                            horizontal
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full lg:w-6/12 lg:order-1">
                      <div className="flex flex-col w-full">
                        <h3 className="text-gray-900 text-xl sm:text-2xl lg:text-3xl font-semibold leading-[1.3]">
                          Core Concept: Privacy by Physics
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 mt-3 sm:mt-4 lg:mt-6">
                          Both technologies use contactless sensing without imaging— making privacy violations physically impossible, not just policy-dependent.
                        </p>
                        
                        <div className="bg-green-50 border-green-200 border mt-8 p-6 rounded-lg">
                          <h4 className="text-green-800 font-semibold text-base mb-3">
                            Shared Capabilities
                          </h4>
                          <ul className="text-green-700 text-sm space-y-2">
                            <li>• Fall detection with &lt;2s response time</li>
                            <li>• Heart rate monitoring (contactless)</li>
                            <li>• Respiration rate tracking</li>
                            <li>• No cameras, no recordings, no facial recognition</li>
                            <li>• HIPAA-aligned data processing</li>
                          </ul>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mt-8">
                          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-blue-600">24/7</div>
                            <div className="text-sm text-gray-600 mt-1">Continuous Monitoring</div>
                          </div>
                          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-blue-600">&lt;2s</div>
                            <div className="text-sm text-gray-600 mt-1">Alert Response Time</div>
                          </div>
                          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-blue-600">0%</div>
                            <div className="text-sm text-gray-600 mt-1">Camera Usage</div>
                          </div>
                          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-blue-600">100%</div>
                            <div className="text-sm text-gray-600 mt-1">Privacy Compliance</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tablet only: Show cards at bottom */}
                  <div className="flex sm:flex lg:hidden flex-col gap-6 mt-8">
                    <FeatureCard
                      icon={Shield}
                      title="Privacy-First Monitoring"
                      description="Fall Detection System"
                      variant="blue"
                      horizontal
                    />
                    <FeatureCard
                      icon={Activity}
                      title="Clinical-Grade Analytics"
                      description="AI Pattern Classification"
                      variant="green"
                      horizontal
                    />
                    <FeatureCard
                      icon={Bell}
                      title="Instant Alerts & Response"
                      description="Rapid Emergency Notification"
                      variant="purple"
                      horizontal
                    />
                  </div>
                </div>
              )}

              {/* SFCW Radar System Tab Content */}
              {activeTab === 'SFCW Radar System' && (
                <div role="tabpanel" id="radar-panel" aria-labelledby="radar-tab" className="flex flex-col">
                  {/* Top row with image and text/colored box */}
                  <div className="gap-5 flex lg:flex-row flex-col items-stretch">
                    <div className="w-full lg:w-6/12 lg:order-2">
                      <div className="flex flex-col lg:h-full">
                        <div className="w-full h-[220px] sm:h-[280px] lg:flex-1 rounded-2xl overflow-hidden mb-4 lg:mb-0">
                          <img
                            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop"
                            alt="Radar Sensor Unit"
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full lg:w-6/12 lg:order-1">
                      <div className="flex flex-col w-full h-full">
                        <h3 className="text-gray-900 text-xl sm:text-2xl lg:text-3xl font-semibold leading-[1.3] mt-6 sm:mt-0">
                          SFCW Radar System
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 mt-3 sm:mt-4 lg:mt-6">
                          Stepped Frequency Continuous Wave radar enables clinical-grade contactless monitoring without imaging—ensuring privacy by design while reliably detecting vital signs and falls in healthcare settings.
                        </p>
                        
                        <div className="bg-blue-50 border-blue-200 border mt-8 p-6 rounded-lg">
                          <h4 className="text-blue-800 font-semibold text-base mb-3">
                            Technical Pipeline
                          </h4>
                          <ul className="text-blue-700 text-sm space-y-3">
                            <li className="flex items-start gap-3">
                              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold flex-shrink-0">1</span>
                              <span>RF Wave Transmission (5-7 GHz)</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold flex-shrink-0">2</span>
                              <span>Reflection Analysis & Processing</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold flex-shrink-0">3</span>
                              <span>AI/ML Pattern Classification</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold flex-shrink-0">4</span>
                              <span>Instant Alert Generation</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Statistics grid and feature cards row */}
                  <div className="gap-5 flex lg:flex-row flex-col items-stretch mt-5">
                    <div className="w-full lg:w-6/12 lg:order-2">
                      {/* Desktop only: Show cards */}
                      <div className="hidden lg:flex flex-col gap-6">
                        <FeatureCard
                          icon={Activity}
                          title="Bathroom Monitoring"
                          description="Instant fall and vital sign monitoring in high-risk areas."
                          variant="blue"
                          horizontal
                        />
                        <FeatureCard
                          icon={Home}
                          title="Bedroom Coverage"
                          description="Sleep monitoring and nighttime safety."
                          variant="blue"
                          horizontal
                        />
                        <FeatureCard
                          icon={Building2}
                          title="Memory Care"
                          description="Wandering detection and behavior analysis."
                          variant="blue"
                          horizontal
                        />
                      </div>
                    </div>
                    
                    <div className="w-full lg:w-6/12 lg:order-1">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                          <div className="text-3xl font-bold text-blue-600">98.9%</div>
                          <div className="text-sm text-gray-600 mt-1">Sensitivity</div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                          <div className="text-3xl font-bold text-blue-600">99%</div>
                          <div className="text-sm text-gray-600 mt-1">Specificity</div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                          <div className="text-3xl font-bold text-blue-600">&lt;2s</div>
                          <div className="text-sm text-gray-600 mt-1">Response Time</div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                          <div className="text-3xl font-bold text-blue-600">0.1%</div>
                          <div className="text-sm text-gray-600 mt-1">False Alarms</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tablet only: Show cards at bottom */}
                  <div className="flex sm:flex lg:hidden flex-col gap-6 mt-8">
                    <FeatureCard
                      icon={Activity}
                      title="Bathroom Monitoring"
                      description="Instant fall and vital sign monitoring in high-risk areas."
                      variant="blue"
                      horizontal
                    />
                    <FeatureCard
                      icon={Home}
                      title="Bedroom Coverage"
                      description="Sleep monitoring and nighttime safety."
                      variant="blue"
                      horizontal
                    />
                    <FeatureCard
                      icon={Building2}
                      title="Memory Care"
                      description="Wandering detection and behavior analysis."
                      variant="blue"
                      horizontal
                    />
                  </div>
                </div>
              )}

              {/* WiFi Signal Analysis Tab Content */}
              {activeTab === 'WiFi Signal Analysis' && (
                <div role="tabpanel" id="wifi-panel" aria-labelledby="wifi-tab" className="flex flex-col">
                  {/* Top row with image and text/colored box */}
                  <div className="gap-5 flex lg:flex-row flex-col items-stretch">
                    <div className="w-full lg:w-6/12 lg:order-2">
                      <div className="flex flex-col lg:h-full">
                        <div className="w-full h-[220px] sm:h-[280px] lg:flex-1 rounded-2xl overflow-hidden mb-4 lg:mb-0 bg-gradient-to-br from-purple-900 to-pink-900">
                          <div className="w-full h-full flex items-center justify-center p-6">
                            <img
                              src="https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400&h=400&fit=crop"
                              alt="WiFi Router"
                              loading="lazy"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full lg:w-6/12 lg:order-1">
                      <div className="flex flex-col w-full h-full">
                        <h3 className="text-gray-900 text-xl sm:text-2xl lg:text-3xl font-semibold leading-[1.3] mt-6 sm:mt-0">
                          WiFi Signal Analysis Platform
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 mt-3 sm:mt-4 lg:mt-6">
                          Channel State Information (CSI) from ambient WiFi enables whole-facility contactless monitoring—privacy-preserving, device-free, and ideal for scalable health and safety applications.
                        </p>
                        
                        <div className="bg-green-50 border-green-200 border mt-8 p-6 rounded-lg">
                          <h4 className="text-green-800 font-semibold text-base mb-3">
                            How It Works
                          </h4>
                          <ul className="text-green-700 text-sm space-y-3">
                            <li className="flex items-start gap-3">
                              <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold flex-shrink-0">1</span>
                              <span>Existing WiFi Routers</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold flex-shrink-0">2</span>
                              <span>Signal Disturbance Analysis</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold flex-shrink-0">3</span>
                              <span>ML Pattern Recognition</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold flex-shrink-0">4</span>
                              <span>Event Classification</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Statistics grid and feature cards row */}
                  <div className="gap-5 flex lg:flex-row flex-col items-stretch mt-5">
                    <div className="w-full lg:w-6/12 lg:order-2">
                      {/* Desktop only: Show cards */}
                      <div className="hidden lg:flex flex-col gap-6">
                        <FeatureCard
                          icon={Signal}
                          title="Feasibility Study"
                          description="Controlled testing to validate WiFi sensing."
                          variant="green"
                          horizontal
                        />
                        <FeatureCard
                          icon={Settings}
                          title="Algorithm Optimization"
                          description="ML refinement for better accuracy, fewer false positives."
                          variant="green"
                          horizontal
                        />
                        <FeatureCard
                          icon={TrendingUp}
                          title="Clinical Validation"
                          description="Large-scale healthcare trials for regulatory approval"
                          variant="green"
                          horizontal
                        />
                      </div>
                    </div>
                    
                    <div className="w-full lg:w-6/12 lg:order-1">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                          <div className="text-3xl font-bold text-green-600">$0</div>
                          <div className="text-sm text-gray-600 mt-1">Hardware Cost</div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                          <div className="text-3xl font-bold text-green-600">100%</div>
                          <div className="text-sm text-gray-600 mt-1">Infrastructure Reuse</div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                          <div className="text-3xl font-bold text-green-600">TBD</div>
                          <div className="text-sm text-gray-600 mt-1">Accuracy Target</div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                          <div className="text-3xl font-bold text-green-600">2024</div>
                          <div className="text-sm text-gray-600 mt-1">Validation Phase</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tablet only: Show cards at bottom */}
                  <div className="flex sm:flex lg:hidden flex-col gap-6 mt-8">
                    <FeatureCard
                      icon={Signal}
                      title="Feasibility Study"
                      description="Controlled testing to validate WiFi sensing."
                      variant="green"
                      horizontal
                    />
                    <FeatureCard
                      icon={Settings}
                      title="Algorithm Optimization"
                      description="ML refinement for better accuracy, fewer false positives."
                      variant="green"
                      horizontal
                    />
                    <FeatureCard
                      icon={TrendingUp}
                      title="Clinical Validation"
                      description="Large-scale healthcare trials for regulatory approval"
                      variant="green"
                      horizontal
                    />
                  </div>
                </div>
              )}
              
            </div>
          </div>
          
          {/* Slideshow indicators - visible for all screen sizes at bottom */}
          <div className="flex justify-center items-center gap-2 py-6 bg-white border-t border-gray-200">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                onClick={() => handleDotClick(tab)}
                className={`h-3 rounded-full transition-all ${
                  index === activeTabIndex ? 'bg-blue-600 w-8' : 'bg-gray-300 w-3'
                }`}
                aria-label={`Go to ${tab}`}
              />
            ))}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyPlatformSection;
