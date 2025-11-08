import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import logo from '@/assets/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLogo, setCurrentLogo] = useState<string>(logo);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('setting_value')
          .eq('setting_key', 'active_logo_url')
          .single();

        if (!error && data?.setting_value) {
          setCurrentLogo(data.setting_value);
        }
      } catch (error) {
        console.error('Error fetching logo:', error);
      }
    };

    fetchLogo();
  }, []);

  return (
    <header className="bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] text-slate-800 px-20 max-md:max-w-full max-md:px-5">
      <div className="bg-[rgba(0,0,0,0)] flex w-full flex-col items-stretch justify-center px-6 py-4 max-md:max-w-full max-md:px-5">
        <div className="bg-[rgba(0,0,0,0)] flex w-full items-stretch gap-5 flex-wrap justify-between max-md:max-w-full">
          <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-3 text-2xl font-normal leading-none">
            <img
              src={currentLogo}
              className="aspect-[1] object-contain w-10 shrink-0 rounded-lg"
              alt="Care Aware Tech Logo"
            />
            <div className="basis-auto">Care Aware Tech</div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="bg-[rgba(0,0,0,0)] hidden md:flex items-stretch gap-8 text-base font-medium whitespace-nowrap flex-wrap">
            <div className="bg-[rgba(0,0,0,0)] pt-0.5 pb-[26px]">
              <a href="#mission" className="hover:text-orange-600 transition-colors">Mission</a>
            </div>
            <div className="bg-[rgba(0,0,0,0)] pt-0.5 pb-[26px]">
              <a href="#vision" className="hover:text-orange-600 transition-colors">Vision</a>
            </div>
            <div className="bg-[rgba(0,0,0,0)] pt-0.5 pb-[26px]">
              <a href="#team" className="hover:text-orange-600 transition-colors">Team</a>
            </div>
            <div className="bg-[rgba(0,0,0,0)] pt-0.5 pb-[26px]">
              <a href="#timeline" className="hover:text-orange-600 transition-colors">Timeline</a>
            </div>
            <div className="bg-[rgba(0,0,0,0)] pt-0.5 pb-[23px]">
              <a href="#advisory" className="hover:text-orange-600 transition-colors">Advisory</a>
            </div>
            <div className="bg-orange-600 text-white font-normal text-center pt-2.5 pb-[18px] px-6 rounded-full max-md:px-5 hover:bg-orange-700 transition-colors">
              <a href="#contact">Contact</a>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col gap-4 pt-4">
              <a href="#mission" className="text-base font-medium hover:text-orange-600 transition-colors">Mission</a>
              <a href="#vision" className="text-base font-medium hover:text-orange-600 transition-colors">Vision</a>
              <a href="#team" className="text-base font-medium hover:text-orange-600 transition-colors">Team</a>
              <a href="#timeline" className="text-base font-medium hover:text-orange-600 transition-colors">Timeline</a>
              <a href="#advisory" className="text-base font-medium hover:text-orange-600 transition-colors">Advisory</a>
              <a href="#contact" className="bg-orange-600 text-white font-normal text-center py-3 px-6 rounded-full hover:bg-orange-700 transition-colors">Contact</a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
