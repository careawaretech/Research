import React, { useState } from 'react';

interface FormData {
  partnershipType: string;
  organizationName: string;
  industry: string;
  location: string;
  organizationSize: string;
  fullName: string;
  title: string;
  email: string;
  phone: string;
  interests: string[];
  goals: string;
  timeline: string;
  consent: boolean;
}

const PartnershipForm = () => {
  const [formData, setFormData] = useState<FormData>({
    partnershipType: '',
    organizationName: '',
    industry: '',
    location: '',
    organizationSize: '',
    fullName: '',
    title: '',
    email: '',
    phone: '',
    interests: [],
    goals: '',
    timeline: '',
    consent: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    
    if (name === 'consent') {
      setFormData(prev => ({
        ...prev,
        consent: checked
      }));
    } else if (name === 'interests') {
      setFormData(prev => ({
        ...prev,
        interests: checked 
          ? [...prev.interests, value]
          : prev.interests.filter(interest => interest !== value)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  const handleScheduleCall = () => {
    console.log('Schedule discovery call clicked');
    // Handle scheduling logic here
  };

  return (
    <section className="bg-gray-50 w-full py-16 lg:py-20 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center font-normal text-center pb-2 px-20 max-md:max-w-full max-md:px-5">
          <div className="flex w-[712px] max-w-full flex-col items-stretch">
            <div className="text-gray-900 text-4xl leading-none self-center max-md:max-w-full">
              Ready to Partner with Us?
            </div>
            <div className="text-gray-600 text-xl leading-7 mt-[30px] max-md:max-w-full">
              Join the growing network of facilities, researchers, and
              technology partners advancing privacy-first senior care
              monitoring
            </div>
          </div>
        </div>
        <div className="bg-[rgba(0,0,0,0)] self-center w-[946px] max-w-full mt-[59px] pt-[5px] pb-[45px] px-[25px] max-md:mt-10 max-md:px-5">
          <div className="bg-white shadow-[0px_8px_10px_rgba(0,0,0,0.1)] p-8 rounded-2xl max-md:max-w-full max-md:px-5">
            <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center font-normal text-center pb-[9px] px-20 max-md:max-w-full max-md:px-5">
              <div className="flex w-[424px] max-w-full flex-col items-stretch">
                <div className="text-gray-900 text-2xl leading-none self-center">
                  Partnership Application Form
                </div>
                <div className="text-gray-600 text-base mt-[25px] max-md:max-w-full">
                  Tell us about your organization and partnership interests
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="bg-[rgba(0,0,0,0)] mt-8 max-md:max-w-full">
              {/* Step 1: Partnership Type */}
              <div className="bg-[rgba(0,0,0,0)] flex w-full flex-col items-stretch max-md:max-w-full">
                <div className="text-gray-900 text-lg font-semibold leading-loose">
                  Step 1: Partnership Type
                </div>
                <div className="bg-[rgba(0,0,0,0)] mt-[27px] max-md:max-w-full">
                  <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                    {['Facility Partner', 'Research Partner', 'Industry Partner'].map((type, index) => (
                      <div key={type} className="w-[33%] max-md:w-full max-md:ml-0">
                        <label className="bg-[rgba(0,0,0,0)] grow text-center w-full max-md:mt-4 cursor-pointer">
                          <input
                            type="radio"
                            name="partnershipType"
                            value={type}
                            checked={formData.partnershipType === type}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <div className={`border flex flex-col items-stretch justify-center px-[26px] py-[23px] rounded-xl border-solid border-2 max-md:px-5 transition-colors ${
                            formData.partnershipType === type 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-300 hover:border-gray-400'
                          }`}>
                            <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center pb-1.5 px-0.5">
                              <img
                                src={`https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/${
                                  index === 0 ? '74900baea386b0be496cd0df1ff984b9c32e58d6' :
                                  index === 1 ? '7ad7bc22970d21ce4fbc678071a23817a5a951e7' :
                                  '13ea1f6fdaad37b53d679440112e11c6f63a255a'
                                }?placeholderIfAbsent=true`}
                                className={`object-contain ${
                                  index === 0 ? 'aspect-[0.49] w-[23px]' :
                                  index === 1 ? 'aspect-[0.64] w-[30px]' :
                                  'aspect-[0.72] w-[34px]'
                                }`}
                                alt={`${type} icon`}
                              />
                              <div className="text-gray-900 text-base font-semibold">
                                {type}
                              </div>
                              <div className="text-gray-600 text-sm font-normal leading-5 self-stretch mt-[17px]">
                                {index === 0 && 'Assisted living, memory care, or senior housing'}
                                {index === 1 && 'Academic institution or research organization'}
                                {index === 2 && 'Technology, healthcare, or distribution company'}
                              </div>
                            </div>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 2: Organization Details */}
              <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch mt-6 max-md:max-w-full">
                <div className="text-gray-900 text-lg font-semibold leading-loose">
                  Step 2: Organization Details
                </div>
                <div className="bg-[rgba(0,0,0,0)] w-full mt-[26px] max-md:max-w-full">
                  <div className="flex items-stretch gap-6 flex-wrap max-md:max-w-full">
                    <div className="bg-[rgba(0,0,0,0)] flex-1 grow shrink-0 basis-0 w-fit py-0.5">
                      <label className="bg-[rgba(0,0,0,0)] flex flex-col text-sm text-gray-700 font-medium pb-[7px] max-md:pr-5">
                        <div className="z-10">Organization Name</div>
                      </label>
                      <input
                        type="text"
                        name="organizationName"
                        value={formData.organizationName}
                        onChange={handleInputChange}
                        placeholder="Your Organization"
                        className="bg-white border-gray-300 border flex flex-col text-base font-normal justify-center mt-2 px-4 py-[18px] rounded-lg border-solid max-md:pr-5 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div className="bg-[rgba(0,0,0,0)] flex-1 grow shrink-0 basis-0 w-fit">
                      <label className="bg-[rgba(0,0,0,0)] flex flex-col text-sm text-gray-700 font-medium whitespace-nowrap pb-[7px] max-md:pr-5">
                        <div className="z-10">Industry/Sector</div>
                      </label>
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        className="bg-white border-gray-300 border flex items-stretch gap-5 text-base font-normal justify-between mt-2 px-2.5 py-2 rounded-lg border-solid focus:border-blue-500 focus:outline-none"
                      >
                        <option value="">Select Industry</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="technology">Technology</option>
                        <option value="research">Research</option>
                        <option value="senior-living">Senior Living</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-stretch gap-6 flex-wrap mt-6 max-md:max-w-full">
                    <div className="bg-[rgba(0,0,0,0)] flex-1 grow shrink-0 basis-0 w-fit py-0.5">
                      <label className="bg-[rgba(0,0,0,0)] flex flex-col text-sm text-gray-700 font-medium pb-[7px] max-md:pr-5">
                        <div className="z-10">Location (City, State)</div>
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Portland, OR"
                        className="bg-white border-gray-300 border flex flex-col text-base font-normal justify-center mt-2 px-4 py-[18px] rounded-lg border-solid max-md:pr-5 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div className="bg-[rgba(0,0,0,0)] flex-1 grow shrink-0 basis-0 w-fit">
                      <label className="bg-[rgba(0,0,0,0)] flex flex-col text-sm text-gray-700 font-medium pb-[7px] max-md:pr-5">
                        <div className="z-10">Organization Size</div>
                      </label>
                      <select
                        name="organizationSize"
                        value={formData.organizationSize}
                        onChange={handleInputChange}
                        className="bg-white border-gray-300 border flex items-stretch gap-5 text-base font-normal justify-between mt-2 px-2.5 py-2 rounded-lg border-solid focus:border-blue-500 focus:outline-none"
                      >
                        <option value="">Select Size</option>
                        <option value="small">1-50 employees</option>
                        <option value="medium">51-200 employees</option>
                        <option value="large">200+ employees</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Primary Contact */}
              <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch mt-6 max-md:max-w-full">
                <div className="text-gray-900 text-lg font-semibold leading-loose">
                  Step 3: Primary Contact
                </div>
                <div className="bg-[rgba(0,0,0,0)] w-full mt-[27px] max-md:max-w-full">
                  <div className="flex items-stretch gap-6 flex-wrap max-md:max-w-full">
                    <div className="bg-[rgba(0,0,0,0)] flex-1 grow shrink-0 basis-0 w-fit">
                      <label className="bg-[rgba(0,0,0,0)] flex flex-col text-sm text-gray-700 font-medium pb-[11px] max-md:pr-5">
                        <div className="z-10">Full Name</div>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="John Smith"
                        className="bg-white border-gray-300 border flex flex-col text-base font-normal justify-center mt-2 px-4 py-[19px] rounded-lg border-solid max-md:pr-5 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div className="bg-[rgba(0,0,0,0)] flex-1 grow shrink-0 basis-0 w-fit">
                      <label className="bg-[rgba(0,0,0,0)] flex flex-col text-sm text-gray-700 font-medium whitespace-nowrap pb-[9px] max-md:pr-5">
                        <div className="z-10">Title/Position</div>
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Director of Operations"
                        className="bg-white border-gray-300 border flex flex-col text-base font-normal justify-center mt-2 px-4 py-[18px] rounded-lg border-solid max-md:pr-5 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex items-stretch gap-6 flex-wrap mt-6 max-md:max-w-full">
                    <div className="bg-[rgba(0,0,0,0)] flex-1 grow shrink-0 basis-0 w-fit">
                      <label className="bg-[rgba(0,0,0,0)] flex flex-col text-sm text-gray-700 font-medium pb-2.5 max-md:pr-5">
                        <div className="z-10">Email Address</div>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@organization.com"
                        className="bg-white border-gray-300 border flex flex-col text-base font-normal whitespace-nowrap justify-center mt-2 px-4 py-[18px] rounded-lg border-solid max-md:pr-5 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div className="bg-[rgba(0,0,0,0)] flex-1 grow shrink-0 basis-0 w-fit">
                      <label className="bg-[rgba(0,0,0,0)] flex flex-col text-sm text-gray-700 font-medium pb-[11px] max-md:pr-5">
                        <div className="z-10">Phone Number</div>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(555) 123-4567"
                        className="bg-white border-gray-300 border flex flex-col text-base font-normal justify-center mt-2 px-4 py-[18px] rounded-lg border-solid max-md:pr-5 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4: Partnership Interests */}
              <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch mt-6 max-md:max-w-full">
                <div className="text-gray-900 text-lg font-semibold leading-loose">
                  Step 4: Partnership Interests
                </div>
                <div className="bg-[rgba(0,0,0,0)] mt-[27px] max-md:max-w-full">
                  <div className="bg-[rgba(0,0,0,0)] text-gray-700 max-md:max-w-full">
                    <label className="bg-[rgba(0,0,0,0)] flex flex-col text-sm font-medium pb-[7px] max-md:max-w-full max-md:pr-5">
                      <div className="z-10">Specific Areas of Interest</div>
                    </label>
                    <div className="bg-[rgba(0,0,0,0)] w-full text-base font-normal mt-2 max-md:max-w-full">
                      {[
                        'Pilot program participation',
                        'Research collaboration',
                        'Technology integration',
                        'Distribution partnership',
                        'Joint grant applications',
                        'Advisory board participation'
                      ].map((interest, index) => (
                        <div key={interest} className={`flex items-stretch gap-3 ${index % 2 === 0 ? 'flex-wrap' : 'flex-wrap mt-3'}`}>
                          <label className="bg-[rgba(0,0,0,0)] flex items-stretch gap-3 flex-1 grow shrink basis-auto py-0.5 cursor-pointer">
                            <input
                              type="checkbox"
                              name="interests"
                              value={interest}
                              checked={formData.interests.includes(interest)}
                              onChange={handleCheckboxChange}
                              className="bg-white border flex w-4 shrink-0 h-4 mt-1 rounded-[1px] border-black border-solid"
                            />
                            <div className="basis-auto grow shrink">
                              {interest}
                            </div>
                          </label>
                          {index % 2 === 0 && index + 1 < 6 && (
                            <label className="bg-[rgba(0,0,0,0)] flex items-stretch gap-3 flex-1 grow shrink basis-auto py-0.5 cursor-pointer">
                              <input
                                type="checkbox"
                                name="interests"
                                value={[
                                  'Research collaboration',
                                  'Distribution partnership',
                                  'Advisory board participation'
                                ][Math.floor(index / 2)]}
                                checked={formData.interests.includes([
                                  'Research collaboration',
                                  'Distribution partnership',
                                  'Advisory board participation'
                                ][Math.floor(index / 2)])}
                                onChange={handleCheckboxChange}
                                className="bg-white border flex w-4 shrink-0 h-4 mt-1 rounded-[1px] border-black border-solid"
                              />
                              <div className="basis-auto grow shrink">
                                {[
                                  'Research collaboration',
                                  'Distribution partnership',
                                  'Advisory board participation'
                                ][Math.floor(index / 2)]}
                              </div>
                            </label>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-[rgba(0,0,0,0)] mt-4 pb-[7px] max-md:max-w-full">
                    <label className="bg-[rgba(0,0,0,0)] flex flex-col text-sm text-gray-700 font-medium pb-[7px] max-md:max-w-full max-md:pr-5">
                      <div className="z-10">Tell us more about your partnership goals</div>
                    </label>
                    <textarea
                      name="goals"
                      value={formData.goals}
                      onChange={handleInputChange}
                      placeholder="Describe your organization's specific interests, capabilities, and what you hope to achieve through partnership with Care Aware Tech..."
                      className="bg-white border-gray-300 border overflow-hidden text-base font-normal leading-6 mt-2 pt-6 pb-[38px] px-[33px] rounded-lg border-solid max-md:max-w-full max-md:px-5 focus:border-blue-500 focus:outline-none resize-none"
                      rows={4}
                    />
                  </div>
                  <div className="bg-[rgba(0,0,0,0)] w-full mt-4 max-md:max-w-full">
                    <label className="bg-[rgba(0,0,0,0)] flex flex-col text-sm text-gray-700 font-medium pb-[7px] max-md:max-w-full max-md:pr-5">
                      <div className="z-10">Timeline for Partnership</div>
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="bg-white border-gray-300 border flex items-stretch gap-5 text-base font-normal flex-wrap justify-between mt-2 px-2.5 py-2 rounded-lg border-solid max-md:max-w-full focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">Select Timeline</option>
                      <option value="immediate">Immediate (1-3 months)</option>
                      <option value="short-term">Short-term (3-6 months)</option>
                      <option value="medium-term">Medium-term (6-12 months)</option>
                      <option value="long-term">Long-term (12+ months)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Consent and Submit */}
              <div className="bg-[rgba(0,0,0,0)] w-full mt-6 pt-[25px] max-md:max-w-full">
                <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-3 text-sm text-gray-700 font-normal leading-5 flex-wrap pb-1.5">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleCheckboxChange}
                    className="bg-white border flex w-3.5 shrink-0 h-4 my-auto rounded-[1px] border-black border-solid"
                  />
                  <div className="grow shrink w-[803px] basis-auto max-md:max-w-full">
                    I agree to be contacted by Care Aware Tech regarding
                    partnership opportunities and consent to the processing of
                    the information provided in this form.
                  </div>
                </div>
                <div className="bg-[rgba(0,0,0,0)] flex w-full flex-col items-center text-base text-white font-semibold text-center mt-6 px-[70px] max-md:max-w-full max-md:px-5">
                  <div className="flex w-[586px] max-w-full items-stretch gap-4 flex-wrap">
                    <button
                      type="submit"
                      disabled={!formData.consent}
                      className="bg-blue-600 flex gap-[17px] grow shrink basis-auto px-8 py-4 rounded-lg max-md:px-5 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      <img
                        src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/20ad330469d6280d203cc5046e2fffbf3298b2f3?placeholderIfAbsent=true"
                        className="aspect-[0.67] object-contain w-4 shrink-0"
                        alt="Submit icon"
                      />
                      <div className="basis-auto">Submit Partnership Application</div>
                    </button>
                    <button
                      type="button"
                      onClick={handleScheduleCall}
                      className="bg-green-600 flex gap-[21px] grow shrink basis-auto px-8 py-4 rounded-lg max-md:px-5 hover:bg-green-700 transition-colors"
                    >
                      <img
                        src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/f4013cb5ba1c8c2dfe71b00107f2f05135b5ce7f?placeholderIfAbsent=true"
                        className="aspect-[0.58] object-contain w-3.5 shrink-0"
                        alt="Call icon"
                      />
                      <div className="basis-auto">Schedule Discovery Call</div>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnershipForm;
