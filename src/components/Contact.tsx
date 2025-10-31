import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
    type: 'partnership'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent, formType: string) => {
    e.preventDefault();
    console.log(`${formType} form submitted:`, formData);
    // Here you would typically send the data to your backend
    alert(`Thank you for your ${formType} inquiry! We'll get back to you soon.`);
    setFormData({
      name: '',
      email: '',
      organization: '',
      message: '',
      type: formType
    });
  };

  const contactOptions = [
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/4961bbaa233446bd1c812f2b9063782330ae5353?placeholderIfAbsent=true",
      title: "Partnership Opportunities",
      description: "Explore how we can work together to improve elderly care in your facility or organization.",
      buttonText: "Learn More",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      formType: "partnership"
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/c8222f40f4afdc039e7b7d9f3e6d9b87f5f34bf3?placeholderIfAbsent=true",
      title: "Investment Inquiries",
      description: "Join investors who believe in ethical technology and sustainable healthcare solutions.",
      buttonText: "Contact Us",
      buttonColor: "bg-emerald-600 hover:bg-emerald-700",
      formType: "investment"
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/6e650ca9534e3fe7850bde9939a73515701d0c9c?placeholderIfAbsent=true",
      title: "Advisory Board",
      description: "Share your expertise and help guide the future of privacy-first elderly care technology.",
      buttonText: "Apply Now",
      buttonColor: "bg-violet-600 hover:bg-violet-700",
      formType: "advisory"
    }
  ];

  const [showForm, setShowForm] = useState<string | null>(null);

  return (
    <section id="contact" className="bg-gray-50 flex flex-col items-stretch justify-center px-20 py-[68px] max-md:max-w-full max-md:px-5">
      <div className="bg-[rgba(0,0,0,0)] w-full px-[9px] max-md:max-w-full">
        <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center font-normal text-center mx-[15px] pb-2 px-20 max-md:max-w-full max-md:mr-2.5 max-md:px-5">
          <div className="flex w-[721px] max-w-full flex-col items-stretch">
            <h2 className="text-slate-800 text-4xl leading-none self-center">Join Our Mission</h2>
            <p className="text-gray-700 text-xl leading-7 mt-[33px] max-md:max-w-full">
              Whether you're an investor, healthcare partner, or share our vision for ethical elderly care technology, we'd love to connect.
            </p>
          </div>
        </div>
        <div className="bg-[rgba(0,0,0,0)] mt-[59px] pt-[5px] pb-[25px] px-[15px] max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            {contactOptions.map((option, index) => (
              <div key={index} className="w-[33%] max-md:w-full max-md:ml-0">
                <div className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] flex grow flex-col items-stretch text-base font-normal text-center w-full p-8 rounded-xl max-md:mt-[37px] max-md:px-5">
                  <img
                    src={option.icon}
                    className="aspect-[1] object-contain w-16 self-center rounded-full"
                    alt={`${option.title} Icon`}
                  />
                  <h3 className="bg-[rgba(0,0,0,0)] text-xl text-slate-800 mt-6 pt-px pb-[9px] px-[60px] max-md:px-5">
                    {option.title}
                  </h3>
                  <p className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch text-gray-700 mt-4 px-[23px] py-[5px] max-md:px-5">
                    {option.description}
                  </p>
                  <button
                    onClick={() => setShowForm(option.formType)}
                    className={`${option.buttonColor} self-center w-[135px] max-w-full text-white mt-6 pt-3.5 pb-[22px] px-[26px] rounded-full max-md:px-5 transition-colors`}
                  >
                    {option.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-slate-800">
                  {showForm === 'partnership' && 'Partnership Inquiry'}
                  {showForm === 'investment' && 'Investment Inquiry'}
                  {showForm === 'advisory' && 'Advisory Board Application'}
                </h3>
                <button
                  onClick={() => setShowForm(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={(e) => handleSubmit(e, showForm)} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">
                    Organization
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={
                      showForm === 'partnership' ? 'Tell us about your organization and how we might collaborate...' :
                      showForm === 'investment' ? 'Share your investment interests and goals...' :
                      'Describe your expertise and how you\'d like to contribute...'
                    }
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(null)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;
