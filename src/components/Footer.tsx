import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Footer = () => {
  const [footerStyles, setFooterStyles] = useState({
    backgroundColor: '#111827',
    textColor: '#ffffff',
    borderColor: '#374151',
  });

  useEffect(() => {
    const fetchStyles = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('setting_value')
          .eq('setting_key', 'footer_styles')
          .single();

        if (!error && data?.setting_value) {
          const styles = JSON.parse(data.setting_value);
          setFooterStyles({
            backgroundColor: styles.background_color,
            textColor: styles.text_color,
            borderColor: styles.border_color,
          });
        }
      } catch (error) {
        console.error('Error fetching footer styles:', error);
      }
    };

    fetchStyles();
  }, []);

  return (
    <footer 
      className="py-16 px-6 lg:px-8"
      style={{ backgroundColor: footerStyles.backgroundColor, color: footerStyles.textColor }}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-6">SafeSense Technologies</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Privacy-first elderly monitoring solutions using contactless radar and WiFi sensing.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#market" className="text-gray-400 hover:text-white text-sm transition-colors">Market Opportunity</a></li>
              <li><a href="#technology" className="text-gray-400 hover:text-white text-sm transition-colors">Technology Platform</a></li>
              <li><a href="#evidence" className="text-gray-400 hover:text-white text-sm transition-colors">Clinical Evidence</a></li>
              <li><a href="#research" className="text-gray-400 hover:text-white text-sm transition-colors">Research & Publications</a></li>
              <li><a href="#partnerships" className="text-gray-400 hover:text-white text-sm transition-colors">Partnerships</a></li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h4 className="text-base font-semibold mb-6">Help & Support</h4>
            <ul className="space-y-3">
              <li><a href="#faq" className="text-gray-400 hover:text-white text-sm transition-colors">FAQ</a></li>
              <li><a href="#documentation" className="text-gray-400 hover:text-white text-sm transition-colors">Documentation</a></li>
              <li><a href="#pilot-program" className="text-gray-400 hover:text-white text-sm transition-colors">Pilot Program</a></li>
              <li><a href="#technical-support" className="text-gray-400 hover:text-white text-sm transition-colors">Technical Support</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-base font-semibold mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-1 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">info@safesensetech.com</p>
                  <p className="text-sm text-gray-400 mt-1">partnerships@safesensetech.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-1 text-blue-400" />
                <p className="text-sm text-gray-400">(503) 555-0123</p>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Portland State University</p>
                  <p className="text-sm text-gray-400">Innovation Hub</p>
                  <p className="text-sm text-gray-400">Portland, OR 97201</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t pt-8" style={{ borderColor: footerStyles.borderColor }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2025 SafeSense Technologies. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#terms" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#accessibility" className="text-sm text-gray-400 hover:text-white transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
