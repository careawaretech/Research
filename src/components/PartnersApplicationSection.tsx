import React from 'react';
import { Building, Microscope, DollarSign, Clock, Phone, FileSignature, Wrench, Mail, Calendar, CalendarPlus } from 'lucide-react';

const PartnersApplicationSection = () => {
  return (
    <section id="application-process" className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-green-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-serif mb-6">Ready to Partner with Us?</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Join the select group of organizations pioneering the future of privacy-first senior safety technology
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Facility Partnership Application */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Facility Partners</h3>
              <p className="text-blue-100">Join our pilot program</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-green-300 flex-shrink-0" />
                <span className="text-sm">Application review: 1-2 weeks</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-300 flex-shrink-0" />
                <span className="text-sm">Qualification call: 30 minutes</span>
              </div>
              <div className="flex items-center space-x-3">
                <FileSignature className="w-5 h-5 text-green-300 flex-shrink-0" />
                <span className="text-sm">MOU signing: 1 week</span>
              </div>
              <div className="flex items-center space-x-3">
                <Wrench className="w-5 h-5 text-green-300 flex-shrink-0" />
                <span className="text-sm">Installation: 3-5 days</span>
              </div>
            </div>
            
            <button className="w-full bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors mb-4">
              <FileSignature className="w-5 h-5 inline-block mr-2" />
              Apply for Pilot Program
            </button>
            
            <div className="text-center">
              <span className="text-blue-200 hover:text-white text-sm underline cursor-pointer">Download Facility Requirements PDF</span>
            </div>
          </div>

          {/* Research Collaboration */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Microscope className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Research Partners</h3>
              <p className="text-green-100">Collaborate on breakthrough research</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Co-investigator opportunities</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                  <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                  <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                </svg>
                <span className="text-sm">Exclusive data access</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                  <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                </svg>
                <span className="text-sm">Joint publication rights</span>
              </div>
              <div className="flex items-center space-x-3">
                <DollarSign className="w-5 h-5 text-green-300 flex-shrink-0" />
                <span className="text-sm">Grant funding opportunities</span>
              </div>
            </div>
            
            <button className="w-full bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors mb-4">
              <svg className="w-5 h-5 inline-block mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Join Research Network
            </button>
            
            <div className="text-center">
              <span className="text-green-200 hover:text-white text-sm underline cursor-pointer">View Research Collaboration Guide</span>
            </div>
          </div>

          {/* Grant & Funding */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Grant Partners</h3>
              <p className="text-purple-100">Support NIH SBIR funding</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                <span className="text-sm">NIH Phase I & II support</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                <span className="text-sm">Commercialization pathway</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                  <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                </svg>
                <span className="text-sm">Regulatory guidance</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span className="text-sm">Advisory board roles</span>
              </div>
            </div>
            
            <button className="w-full bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors mb-4">
              <svg className="w-5 h-5 inline-block mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
              </svg>
              Explore Funding Opportunities
            </button>
            
            <div className="text-center">
              <span className="text-purple-200 hover:text-white text-sm underline cursor-pointer">Download Grant Timeline</span>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold font-serif mb-4">Get Started Today</h3>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Have questions about partnership opportunities? Our team is ready to discuss how we can work together to advance senior safety technology.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6" />
              </div>
              <h4 className="font-semibold mb-2">Email Us</h4>
              <p className="text-blue-100 text-sm">partnerships@careawaretech.com</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone className="w-6 h-6" />
              </div>
              <h4 className="font-semibold mb-2">Call Us</h4>
              <p className="text-blue-100 text-sm">(503) 555-0123</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6" />
              </div>
              <h4 className="font-semibold mb-2">Schedule Call</h4>
              <p className="text-blue-100 text-sm">Book 30-minute discovery call</p>
            </div>
          </div>
          
          <div className="text-center">
            <button className="bg-orange-500 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors shadow-lg">
              <CalendarPlus className="w-6 h-6 inline-block mr-3" />
              Schedule Partnership Discovery Call
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersApplicationSection;
