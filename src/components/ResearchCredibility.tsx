const ResearchCredibility = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 font-serif mb-6">Research Credibility & Publications</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Founded by PhD researchers with institutional backing and peer-reviewed scientific contributions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-gray-900 font-serif mb-8">Founding Team</h3>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
              <div className="flex items-start space-x-6">
                <img 
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" 
                  alt="Founder" 
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                />
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Dr. Sarah Chen</h4>
                  <p className="text-blue-600 font-semibold mb-4">Co-Founder & CEO</p>
                  <div className="space-y-2 text-gray-700">
                    <p>• Dual Master's degrees in Electrical Engineering</p>
                    <p>• PhD Candidate, Portland State University</p>
                    <p>• Research focus: SFCW radar systems, signal processing</p>
                    <p>• 15+ peer-reviewed publications in healthcare sensing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-gray-900 font-serif mb-8">Institutional Backing</h3>
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-2xl border border-gray-200">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                  <i className="fa-solid fa-university text-white text-2xl"></i>
                </div>
                <p className="text-center text-sm font-semibold text-gray-700">Funded by National Institutes of Health (NIH)</p>
              </div>
              <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-2xl border border-gray-200">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
                  <i className="fa-solid fa-flask text-white text-2xl"></i>
                </div>
                <p className="text-center text-sm font-semibold text-gray-700">Supported by the National Science Foundation</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Key Publications</h4>
              <ul className="space-y-4">
                <li className="flex items-start space-x-4">
                  <i className="fa-solid fa-file-alt text-blue-500 mt-1"></i>
                  <div>
                    <a href="#" className="font-semibold text-gray-800 hover:text-blue-600">
                      Contactless Vital Signs Monitoring Using SFCW Radar
                    </a>
                    <p className="text-sm text-gray-500">IEEE Journal of Biomedical and Health Informatics, 2023</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <i className="fa-solid fa-file-alt text-blue-500 mt-1"></i>
                  <div>
                    <a href="#" className="font-semibold text-gray-800 hover:text-blue-600">
                      Fall Detection in Complex Environments via WiFi CSI
                    </a>
                    <p className="text-sm text-gray-500">
                      Proceedings of the ACM on Interactive, Mobile, Wearable and Ubiquitous Technologies, 2022
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchCredibility;