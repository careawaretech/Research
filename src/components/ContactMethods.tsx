import React from 'react';
import { Phone, Calendar } from 'lucide-react';

const ContactMethods = () => {
  return (
    <section className="bg-gray-50 flex flex-col items-stretch justify-center px-20 py-[68px] max-md:max-w-full max-md:px-5">
      <div className="bg-[rgba(0,0,0,0)] w-full px-[17px] max-md:max-w-full">
        <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center font-normal text-center mx-[15px] pb-[9px] px-20 max-md:max-w-full max-md:mr-2.5 max-md:px-5">
          <div className="flex w-[674px] max-w-full flex-col items-stretch">
            <div className="text-gray-900 text-4xl leading-none self-center">
              Other Ways to Connect
            </div>
            <div className="text-gray-600 text-xl leading-[1.4] mt-[30px] max-md:max-w-full">
              Prefer a different approach? Here are additional ways to reach our team
            </div>
          </div>
        </div>
        <div className="bg-[rgba(0,0,0,0)] mt-[59px] pt-[5px] pb-[25px] px-[15px] max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            {/* Direct Email */}
            <div className="w-[33%] max-md:w-full max-md:ml-0">
              <div className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] flex grow flex-col items-stretch text-base font-normal text-center w-full pl-8 pr-[15px] pt-8 pb-[126px] rounded-2xl max-md:mt-[37px] max-md:pl-5 max-md:pb-[100px]">
                <img
                  src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/f45d664fc9f3257ff58abdb4ee22f414453758d6?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-16 self-center rounded-full"
                  alt="Email icon"
                />
                <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center text-2xl text-gray-900 font-bold mt-6 pb-[17px] px-[70px] max-md:px-5">
                  <div className="z-10 -mt-1">Direct Email</div>
                </div>
                <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch text-gray-600 mt-4 pb-2.5 px-[31px] max-md:px-5">
                  <div className="z-10">Send us an email directly for quick</div>
                  <div className="self-center mt-[9px]">questions or detailed inquiries</div>
                </div>
                <div className="bg-[rgba(0,0,0,0)] flex w-full flex-col text-sm text-black leading-none mt-6">
                  <div className="bg-[rgba(0,0,0,0)] self-stretch flex items-stretch gap-[9px]">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/c3ef7ee5f1d1f8347434059f0965e234280e2b9d?placeholderIfAbsent=true"
                      className="aspect-[0.55] object-contain w-[11px] shrink-0"
                      alt="Email icon"
                    />
                    <div className="grow shrink w-[315px] basis-auto">
                      Partnerships: partnerships@careawaretech.com
                    </div>
                  </div>
                  <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-[9px] mt-3 px-5">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/1b9cc1b6f3fc54338c929813d24cc501328a2f09?placeholderIfAbsent=true"
                      className="aspect-[0.7] object-contain w-3.5 shrink-0"
                      alt="Email icon"
                    />
                    <div className="basis-auto grow shrink">
                      Research: research@careawaretech.com
                    </div>
                  </div>
                  <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-2.5 mt-3 px-5">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/026de2c7a5432c5cfed77f91e563e65bc196b849?placeholderIfAbsent=true"
                      className="aspect-[0.7] object-contain w-3.5 shrink-0"
                      alt="Email icon"
                    />
                    <div className="basis-auto grow shrink">
                      Investors: investors@careawaretech.com
                    </div>
                  </div>
                  <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-2.5 mt-3 px-[38px] max-md:px-5">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/867c5e47fbc5a250147c8d5f3c81f4553be8bac6?placeholderIfAbsent=true"
                      className="aspect-[0.7] object-contain w-3.5 shrink-0"
                      alt="Email icon"
                    />
                    <div className="basis-auto">Media: media@careawaretech.com</div>
                  </div>
                </div>
                <button className="bg-blue-600 self-center w-[212px] max-w-full text-white font-semibold mt-6 pt-[11px] pb-[25px] px-5 rounded-lg hover:bg-blue-700 transition-colors">
                  <div>Choose Email Address</div>
                </button>
              </div>
            </div>

            {/* Phone Support */}
            <div className="w-[33%] ml-5 max-md:w-full max-md:ml-0">
              <div className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] flex w-full flex-col items-stretch text-base text-center mx-auto pt-8 pb-16 px-8 rounded-2xl max-md:mt-[37px] max-md:px-5">
                <img
                  src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/4e67c71d9884bc24da0d88cda9d14c26e7f7f825?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-16 self-center rounded-full"
                  alt="Phone icon"
                />
                <div className="bg-[rgba(0,0,0,0)] text-2xl text-gray-900 font-bold mt-6 pb-[13px] px-[70px] max-md:px-5">
                  <div className="z-10 -mt-1">Phone Support</div>
                </div>
                <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch text-gray-600 font-normal mt-4 pb-[13px] px-[26px] max-md:px-5">
                  <div className="z-10">Speak directly with our team during</div>
                  <div className="self-center mt-[9px]">business hours</div>
                </div>
                <div className="bg-[rgba(0,0,0,0)] text-sm mt-[23px]">
                  <div className="bg-[rgba(0,0,0,0)] text-2xl text-green-600 font-bold pb-3.5 px-[68px] max-md:px-5">
                    <div className="z-10">(503) 555-0147</div>
                  </div>
                  <div className="bg-[rgba(0,0,0,0)] text-gray-600 font-normal mt-4">
                    <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center pb-2 px-[70px] max-md:px-5">
                      <div className="z-10">Monday - Friday</div>
                    </div>
                    <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center pb-2.5 px-[70px] max-md:px-5">
                      <div className="z-10">9:00 AM - 6:00 PM PST</div>
                    </div>
                  </div>
                  <div className="bg-green-50 border-green-200 border text-green-800 mt-4 pt-4 pb-[7px] px-[17px] rounded-lg border-solid">
                    <div className="bg-[rgba(0,0,0,0)] flex w-full flex-col items-stretch px-[45px] py-0.5 max-md:px-5">
                      <div className="self-center flex w-[119px] max-w-full items-stretch font-bold leading-none">
                        <div className="grow max-md:-mr-2">Best times to call:</div>
                      </div>
                      <div className="font-normal">Tuesday - Thursday, 10 AM - 4 PM</div>
                    </div>
                  </div>
                </div>
                <button className="bg-green-600 self-center flex w-[142px] max-w-full items-stretch gap-[9px] text-white font-semibold mt-6 px-[27px] py-3 rounded-lg max-md:px-5 hover:bg-green-700 transition-colors">
                  <Phone className="w-4 h-4" />
                  <div>Call Now</div>
                </button>
              </div>
            </div>

            {/* Schedule Meeting */}
            <div className="w-[33%] ml-5 max-md:w-full max-md:ml-0">
              <div className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] flex w-full flex-col items-stretch text-base text-center mx-auto p-8 rounded-2xl max-md:mt-[37px] max-md:px-5">
                <img
                  src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/2ed5c098b73b4cf9bce2d4ebbe40cc8970c37be0?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-16 self-center rounded-full"
                  alt="Calendar icon"
                />
                <div className="bg-[rgba(0,0,0,0)] text-2xl text-gray-900 font-bold mt-6 pb-3 px-[45px] max-md:px-5">
                  <div className="z-10 -mt-1">Schedule a Meeting</div>
                </div>
                <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch text-gray-600 font-normal mt-4 pb-[13px] px-[13px]">
                  <div className="z-10">Book a dedicated time slot for in-depth</div>
                  <div className="self-center mt-[9px]">discussions</div>
                </div>
                <div className="bg-[rgba(0,0,0,0)] text-sm mt-6">
                  <div className="bg-purple-50 border-purple-200 border p-[17px] rounded-lg border-solid">
                    <div className="bg-[rgba(0,0,0,0)] text-purple-800 font-bold leading-none pb-[7px] px-[67px] max-md:px-5">
                      <div className="z-10">Available meeting types:</div>
                    </div>
                    <div className="bg-[rgba(0,0,0,0)] text-purple-700 font-normal mt-2">
                      <div className="bg-[rgba(0,0,0,0)] pb-2 px-[67px] max-md:px-5">
                        <div className="z-10">• 15-min Discovery Call</div>
                      </div>
                      <div className="bg-[rgba(0,0,0,0)] mt-1 pb-2 px-[37px] max-md:px-5">
                        <div className="z-10">• 30-min Partnership Discussion</div>
                      </div>
                      <div className="bg-[rgba(0,0,0,0)] mt-1 pb-2.5 px-[60px] max-md:px-5">
                        <div className="z-10">• 45-min Technical Demo</div>
                      </div>
                      <div className="bg-[rgba(0,0,0,0)] mt-1 pb-2.5 px-[43px] max-md:px-5">
                        <div className="z-10">• 60-min Investor Presentation</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch text-gray-600 font-normal mt-4 pb-[7px] px-1">
                    <div className="z-10">Choose from available time slots that work best</div>
                    <div className="self-center mt-[9px]">for your schedule</div>
                  </div>
                </div>
                <button className="bg-purple-600 self-center flex w-44 max-w-full gap-5 text-white font-semibold justify-between mt-6 pt-[11px] pb-[3px] px-[27px] rounded-lg max-md:px-5 hover:bg-purple-700 transition-colors">
                  <Calendar className="w-4 h-4" />
                  <div>Book Meeting</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMethods;
