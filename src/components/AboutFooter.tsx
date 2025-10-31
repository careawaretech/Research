import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-800 flex flex-col items-stretch justify-center px-20 py-16 max-md:max-w-full max-md:px-5">
      <div className="bg-[rgba(0,0,0,0)] w-full px-6 max-md:max-w-full max-md:px-5">
        <div className="bg-[rgba(0,0,0,0)] max-md:max-w-full">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <div className="w-[51%] max-md:w-full max-md:ml-0">
              <div className="bg-[rgba(0,0,0,0)] flex w-full flex-col items-stretch mx-auto max-md:max-w-full max-md:mt-8">
                <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-3 text-2xl text-white font-normal leading-none flex-wrap">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/7312fe20aa2e028fd98326f25b5848af253ab2f9?placeholderIfAbsent=true"
                    className="aspect-[1] object-contain w-10 shrink-0 rounded-lg"
                    alt="Care Aware Tech Logo"
                  />
                  <div className="grow shrink w-[540px] basis-auto max-md:max-w-full">
                    Care Aware Tech
                  </div>
                </div>
                <p className="text-gray-300 text-base font-normal leading-6 mt-6 max-md:max-w-full">
                  Transforming elderly care through privacy-first technology that enhances human dignity and strengthens community connections.
                </p>
                <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-4 flex-wrap mt-9 pr-20 max-md:pr-5">
                  <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Facebook">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/44af2171deabf0e0dedceb3a079973377fa73d37?placeholderIfAbsent=true"
                      className="aspect-[0.66] object-contain w-[21px] shrink-0"
                      alt="Facebook"
                    />
                  </a>
                  <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Twitter">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/406085fbf8696ae032d4aa84dce1022c25f23615?placeholderIfAbsent=true"
                      className="aspect-[0.75] object-contain w-6 shrink-0"
                      alt="Twitter"
                    />
                  </a>
                  <a href="#" className="hover:opacity-80 transition-opacity" aria-label="LinkedIn">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/162158bebfde146ad3c2a1fccb4c1d335acf3d4c?placeholderIfAbsent=true"
                      className="aspect-[0.72] object-contain w-[23px] shrink-0"
                      alt="LinkedIn"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="w-[24%] ml-5 max-md:w-full max-md:ml-0">
              <div className="bg-[rgba(0,0,0,0)] flex grow flex-col items-stretch text-base whitespace-nowrap w-full pb-8 max-md:mt-8">
                <h3 className="text-white font-semibold">Company</h3>
                <nav className="bg-[rgba(0,0,0,0)] text-gray-300 font-normal mt-[25px]">
                  <ul>
                    <li className="bg-[rgba(0,0,0,0)]">
                      <a href="#mission" className="bg-[rgba(0,0,0,0)] flex flex-col pt-0.5 pb-2.5 max-md:pr-5 hover:text-white transition-colors">
                        Mission
                      </a>
                    </li>
                    <li className="bg-[rgba(0,0,0,0)] mt-2">
                      <a href="#team" className="bg-[rgba(0,0,0,0)] flex flex-col pt-0.5 pb-2.5 max-md:pr-5 hover:text-white transition-colors">
                        Team
                      </a>
                    </li>
                    <li className="bg-[rgba(0,0,0,0)] mt-2">
                      <a href="#values" className="bg-[rgba(0,0,0,0)] flex flex-col pt-0.5 pb-2.5 max-md:pr-5 hover:text-white transition-colors">
                        Values
                      </a>
                    </li>
                    <li className="bg-[rgba(0,0,0,0)] mt-2">
                      <a href="#timeline" className="bg-[rgba(0,0,0,0)] flex flex-col pt-0.5 pb-2.5 max-md:pr-5 hover:text-white transition-colors">
                        Timeline
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="w-[24%] ml-5 max-md:w-full max-md:ml-0">
              <div className="bg-[rgba(0,0,0,0)] flex grow flex-col items-stretch text-base w-full pb-8 max-md:mt-8">
                <h3 className="text-white font-semibold">Connect</h3>
                <nav className="bg-[rgba(0,0,0,0)] text-gray-300 font-normal mt-7">
                  <ul>
                    <li className="bg-[rgba(0,0,0,0)] whitespace-nowrap">
                      <a href="#contact" className="bg-[rgba(0,0,0,0)] flex flex-col justify-center py-[5px] max-md:pr-5 hover:text-white transition-colors">
                        Partnerships
                      </a>
                    </li>
                    <li className="bg-[rgba(0,0,0,0)] whitespace-nowrap mt-2">
                      <a href="#contact" className="bg-[rgba(0,0,0,0)] flex flex-col pt-0.5 pb-2.5 max-md:pr-5 hover:text-white transition-colors">
                        Investors
                      </a>
                    </li>
                    <li className="bg-[rgba(0,0,0,0)] mt-2">
                      <a href="#advisory" className="bg-[rgba(0,0,0,0)] flex flex-col justify-center py-[5px] max-md:pr-5 hover:text-white transition-colors">
                        Advisory Board
                      </a>
                    </li>
                    <li className="bg-[rgba(0,0,0,0)] whitespace-nowrap mt-2">
                      <a href="#contact" className="bg-[rgba(0,0,0,0)] flex flex-col pt-0.5 pb-2.5 max-md:pr-5 hover:text-white transition-colors">
                        Contact
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center text-base text-gray-400 font-normal text-center mt-12 pt-[33px] pb-2 px-[70px] max-md:max-w-full max-md:mt-10 max-md:px-5 border-t border-gray-600">
          <p className="max-md:max-w-full">
            © 2024 Care Aware Tech. All rights reserved. Privacy-first elderly care technology.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
