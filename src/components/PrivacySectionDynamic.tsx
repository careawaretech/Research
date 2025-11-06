import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Shield, VideoOff, Settings, Radio, Building2, Play, Pause } from 'lucide-react';
import { SectionTagBadge } from './admin/SectionTagBadge';
import * as LucideIcons from 'lucide-react';

interface ComparisonCard {
  title: string;
  description: string;
  bullet_points: string[];
  card_type: 'negative' | 'positive';
  border_color: string;
  bg_color: string;
  text_color: string;
}

interface VisualizationBox {
  title: string;
  icon_type: 'fontawesome' | 'lucide' | 'upload';
  icon: string;
  icon_url?: string;
  lucide_icon_name?: string;
  description: string;
  bg_color: string;
  text_color: string;
}

interface ComplianceBadge {
  title: string;
  icon_type: 'fontawesome' | 'lucide' | 'upload';
  icon: string;
  icon_url?: string;
  lucide_icon_name?: string;
  icon_color: string;
}

interface PrivacySectionData {
  main_title: string;
  main_subtitle: string;
  main_icon_type: 'fontawesome' | 'lucide' | 'upload';
  main_icon?: string;
  main_icon_url?: string;
  main_lucide_icon_name?: string;
  
  left_section_title: string;
  comparison_cards: ComparisonCard[];
  
  right_section_title: string;
  visualization_boxes: VisualizationBox[];
  compliance_badges: ComplianceBadge[];
  
  enable_learn_more?: boolean;
  button_text?: string;
  button_url?: string;
  audio_url?: string;
  audio_duration?: string;
}

const PrivacySectionDynamic = () => {
  const [section, setSection] = useState<PrivacySectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [playingAudio, setPlayingAudio] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetchSection();
  }, []);

  const fetchSection = async () => {
    try {
      const { data, error } = await supabase
        .from('section_content')
        .select('content')
        .eq('section_key', 'privacy_section')
        .single();

      if (error) throw error;
      if (data) {
        setSection(data.content as unknown as PrivacySectionData);
      }
    } catch (error) {
      console.error('Error fetching section:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAudioPlay = (audioUrl: string) => {
    if (playingAudio) {
      audioRef.current?.pause();
      setPlayingAudio(false);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    setCurrentAudio(audioUrl);
    setPlayingAudio(true);

    audio.play();
    audio.onended = () => {
      setPlayingAudio(false);
      setCurrentAudio(null);
    };
  };

  const handleAudioStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPlayingAudio(false);
    setCurrentAudio(null);
  };

  const renderIcon = (iconData: {
    icon_type?: 'fontawesome' | 'lucide' | 'upload';
    icon?: string;
    icon_url?: string;
    lucide_icon_name?: string;
  }, size: string = 'w-12 h-12') => {
    if (iconData.icon_type === 'upload' && iconData.icon_url) {
      return <img src={iconData.icon_url} alt="" className={`${size} object-contain`} />;
    }
    
    if (iconData.icon_type === 'lucide' && iconData.lucide_icon_name) {
      const IconComponent = LucideIcons[iconData.lucide_icon_name as keyof typeof LucideIcons] as React.ComponentType<any>;
      if (IconComponent) {
        return <IconComponent className={size} />;
      }
    }
    
    // Default: Font Awesome
    return <i className={`${iconData.icon} text-4xl`}></i>;
  };

  if (loading) {
    return null;
  }

  if (!section) {
    return null;
  }

  return (
    <section className="relative bg-gray-50 w-full py-16 lg:py-20 px-6 lg:px-8">
      <SectionTagBadge 
        sectionTag="No Cameras Ever Section" 
        adminPath="/admin/privacy-section" 
      />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-red-100 rounded-full p-6">
                {renderIcon({
                  icon_type: section.main_icon_type,
                  icon: section.main_icon,
                  icon_url: section.main_icon_url,
                  lucide_icon_name: section.main_lucide_icon_name
                })}
              </div>
            </div>
            <h2 className="text-gray-900 text-5xl leading-none mt-6 max-md:text-[40px]">
              {section.main_title}
            </h2>
            <p className="text-gray-600 text-xl leading-7 self-stretch mt-9 max-md:max-w-full">
              {section.main_subtitle}
            </p>
          </div>
        </div>
        
        <div className="mt-12 lg:mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Comparison Cards */}
            <div>
              <h3 className="text-gray-900 text-3xl font-bold leading-[1.2] mb-8">
                {section.left_section_title}
              </h3>
              
              <div className="flex flex-col gap-6">
                {section.comparison_cards.map((card, index) => (
                  <article 
                    key={index}
                    className={`${card.bg_color} border-l-[6px] ${card.border_color} flex flex-col px-8 py-6`}
                  >
                    <h4 className={`${card.text_color} text-lg font-semibold mb-4`}>
                      {card.title}
                    </h4>
                    <ul className={`flex flex-col gap-2 text-base ${card.text_color}`}>
                      {card.bullet_points.filter(p => p).map((point, i) => (
                        <li key={i} className="leading-relaxed">• {point}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
            
            {/* Right Side - What Different Technologies See */}
            <div>
              <div className="bg-white shadow-lg rounded-2xl p-8">
                <h4 className="text-2xl text-gray-900 font-bold text-center mb-8">
                  {section.right_section_title}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {section.visualization_boxes.map((box, index) => (
                    <div key={index} className="text-center">
                      <div 
                        className={`${box.bg_color} p-6 rounded-lg mb-4 flex items-center justify-center`}
                        style={{ minHeight: '160px' }}
                      >
                        <div className="flex flex-col items-center gap-4">
                          <div className={box.text_color}>
                            {renderIcon({
                              icon_type: box.icon_type,
                              icon: box.icon,
                              icon_url: box.icon_url,
                              lucide_icon_name: box.lucide_icon_name
                            })}
                          </div>
                          <div className={`text-sm ${box.text_color} font-medium`}>{box.title}</div>
                        </div>
                      </div>
                      <p className={`text-xs ${box.text_color}`}>
                        {box.description}
                      </p>
                    </div>
                  ))}
                </div>
                
                {/* Compliance Badges */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {section.compliance_badges.map((badge, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                      <div className="flex justify-center mb-3">
                        <div className={badge.icon_color}>
                          {renderIcon({
                            icon_type: badge.icon_type,
                            icon: badge.icon,
                            icon_url: badge.icon_url,
                            lucide_icon_name: badge.lucide_icon_name
                          }, 'w-8 h-8')}
                        </div>
                      </div>
                      <div className="text-sm text-gray-900 font-medium">{badge.title}</div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                {((section.enable_learn_more && section.button_text) || section.audio_url || section.audio_duration) && (
                  <div className="flex w-auto rounded-lg overflow-hidden border-2 border-primary/40 bg-primary/10 backdrop-blur-sm mt-6">
                    {section.enable_learn_more && section.button_text && (
                      <button
                        onClick={() => {
                          if (section.button_url) {
                            if (section.button_url.startsWith('http')) {
                              window.open(section.button_url, '_blank');
                            } else {
                              window.location.href = section.button_url;
                            }
                          }
                        }}
                        disabled={!section.button_url}
                        className={`px-4 py-2 text-sm font-medium text-primary transition-colors ${
                          (section.audio_url || section.audio_duration) ? 'border-r-2 border-primary/40' : ''
                        } ${
                          section.button_url ? 'hover:bg-primary hover:text-white cursor-pointer' : 'opacity-60 cursor-not-allowed'
                        }`}
                      >
                        <span>{section.button_text}</span>
                        <span className="ml-1">▼</span>
                      </button>
                    )}
                    
                    {(section.audio_url || section.audio_duration) && (
                      <>
                        <button
                          onClick={() => section.audio_url && handleAudioPlay(section.audio_url)}
                          disabled={!section.audio_url}
                          className={`px-3 py-2 text-sm font-medium text-primary transition-colors flex items-center gap-1 ${
                            playingAudio ? 'border-r-2 border-primary/40' : ''
                          } ${
                            section.audio_url ? 'hover:bg-primary hover:text-white cursor-pointer' : 'opacity-60 cursor-not-allowed'
                          }`}
                        >
                          {playingAudio ? (
                            <Pause className="w-3.5 h-3.5" />
                          ) : (
                            <Play className="w-3.5 h-3.5" />
                          )}
                          <span>Listen</span>
                          {section.audio_duration && (
                            <span className="text-xs opacity-70 ml-1">{section.audio_duration}</span>
                          )}
                        </button>
                        {playingAudio && (
                          <button
                            onClick={handleAudioStop}
                            className="px-2 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-white transition-colors"
                          >
                            <i className="fa-solid fa-stop text-sm"></i>
                          </button>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {currentAudio && (
        <audio ref={audioRef} src={currentAudio} />
      )}
    </section>
  );
};

export default PrivacySectionDynamic;
