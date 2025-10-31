import React, { useState } from 'react';
import { Mail, Phone, MapPin, Download, Users, Calendar } from 'lucide-react';

interface ContactFormProps {
  type: 'download' | 'partner' | 'consultation';
  title: string;
  description: string;
  buttonText: string;
  buttonColor: string;
  icon: React.ReactNode;
}

const ContactForm: React.FC<ContactFormProps> = ({
  type,
  title,
  description,
  buttonText,
  buttonColor,
  icon
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log(`${type} form submitted:`, formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <div className="bg-[rgba(255,255,255,0.1)] flex grow flex-col items-stretch text-base text-white text-center w-full p-6 rounded-2xl max-md:mt-8 max-md:px-5">
        <div className="flex justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold mt-4 pb-3.5">{title}</h3>
        <div className="bg-green-100 text-green-800 p-4 rounded-lg mt-4">
          <p className="font-semibold">Thank you for your interest!</p>
          <p className="text-sm mt-2">We'll be in touch within 24 hours.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[rgba(255,255,255,0.1)] flex grow flex-col items-stretch text-base text-white text-center w-full p-6 rounded-2xl max-md:mt-8 max-md:px-5">
      <div className="flex justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold mt-4 pb-3.5">{title}</h3>
      <p className="text-blue-100 font-normal mt-3 pb-2.5">{description}</p>
      
      <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-left">
        <div>
          <label htmlFor={`${type}-name`} className="block text-sm font-medium text-blue-100 mb-1">
            Name *
          </label>
          <input
            type="text"
            id={`${type}-name`}
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Your full name"
          />
        </div>
        
        <div>
          <label htmlFor={`${type}-email`} className="block text-sm font-medium text-blue-100 mb-1">
            Email *
          </label>
          <input
            type="email"
            id={`${type}-email`}
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="your.email@organization.com"
          />
        </div>
        
        <div>
          <label htmlFor={`${type}-organization`} className="block text-sm font-medium text-blue-100 mb-1">
            Organization
          </label>
          <input
            type="text"
            id={`${type}-organization`}
            name="organization"
            value={formData.organization}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Healthcare facility or institution"
          />
        </div>
        
        <div>
          <label htmlFor={`${type}-message`} className="block text-sm font-medium text-blue-100 mb-1">
            Message
          </label>
          <textarea
            id={`${type}-message`}
            name="message"
            rows={3}
            value={formData.message}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Tell us about your specific needs..."
          />
        </div>
        
        <button
          type="submit"
          className={`${buttonColor} hover:opacity-90 self-center w-full max-w-[200px] font-semibold mt-4 pt-[11px] pb-[25px] px-[21px] rounded-lg transition-opacity`}
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export { ContactForm };

const ContactSection = () => {
  return (
    <section className="flex w-full flex-col items-stretch justify-center p-20 max-md:max-w-full max-md:px-5 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
      <div className="flex w-full flex-col items-stretch px-8 max-md:max-w-full max-md:px-5">
        <div className="flex flex-col items-stretch font-normal text-center pb-2 px-[42px] max-md:max-w-full max-md:px-5">
          <h2 className="text-white text-5xl leading-none max-md:max-w-full max-md:text-[40px]">
            Ready to Validate Our Technology at Your Facility?
          </h2>
          <p className="text-blue-100 text-xl leading-7 self-center mt-[26px] max-md:max-w-full">
            Join our clinical validation program and be part of the future of privacy-first fall detection technology
          </p>
        </div>
        
        <div className="mt-12 max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <div className="w-[33%] max-md:w-full max-md:ml-0">
              <ContactForm
                type="download"
                title="Download Clinical Evidence"
                description="Access our comprehensive research brief and performance data"
                buttonText="Get Research Brief"
                buttonColor="bg-white text-blue-900"
                icon={<Download className="w-16 h-16 text-blue-300" />}
              />
            </div>
            <div className="w-[33%] ml-5 max-md:w-full max-md:ml-0">
              <ContactForm
                type="partner"
                title="Partner with Us"
                description="Join our pilot program and help validate breakthrough technology"
                buttonText="Become a Partner"
                buttonColor="bg-green-600 text-white"
                icon={<Users className="w-16 h-16 text-green-300" />}
              />
            </div>
            <div className="w-[33%] ml-5 max-md:w-full max-md:ml-0">
              <ContactForm
                type="consultation"
                title="Schedule Consultation"
                description="Discuss implementation and ROI analysis for your facility"
                buttonText="Schedule Call"
                buttonColor="bg-orange-600 text-white"
                icon={<Calendar className="w-16 h-16 text-orange-300" />}
              />
            </div>
          </div>
        </div>
        
        <div className="bg-[rgba(255,255,255,0.1)] self-center w-[896px] max-w-full text-base text-white font-normal text-center mt-12 p-8 rounded-2xl max-md:mt-10 max-md:px-5">
          <div className="flex flex-col items-center text-2xl font-bold pb-[18px] px-[70px] max-md:max-w-full max-md:px-5">
            <h3 className="z-10 -mt-1">Contact Our Research Team</h3>
          </div>
          <div className="flex flex-col items-center text-blue-100 mt-4 pb-2.5 px-[70px] max-md:max-w-full max-md:px-5">
            <p className="z-10 max-md:max-w-full">
              Have questions about our clinical validation data or partnership opportunities?
            </p>
          </div>
          <div className="flex w-full flex-col items-center mt-6 px-[70px] max-md:max-w-full max-md:px-5">
            <div className="flex w-[532px] max-w-full items-stretch gap-1.5 flex-wrap">
              <div className="flex items-stretch gap-2.5 py-0.5">
                <Mail className="w-4 h-4 mt-1" />
                <a href="mailto:research@careawaretech.com" className="hover:text-blue-200 transition-colors">
                  research@careawaretech.com
                </a>
              </div>
              <div className="flex items-stretch gap-[9px] py-0.5">
                <Phone className="w-4 h-4 mt-1" />
                <a href="tel:5035552273" className="hover:text-blue-200 transition-colors">
                  (503) 555-CARE
                </a>
              </div>
              <div className="flex items-stretch gap-[9px] py-0.5">
                <MapPin className="w-3 h-3 mt-1" />
                <span>Portland, OR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
