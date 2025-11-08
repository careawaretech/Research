import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Headphones, BookOpen, Video, Square, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionTagBadge } from './admin/SectionTagBadge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import VideoPlayer from '@/components/ui/video-player';

interface ExpansionCard {
  number: string;
  title: string;
  description: string;
  months: string;
  facilities: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
}

interface HealthcarePartner {
  name: string;
  description: string;
  bgColor: string;
  iconBgColor: string;
  icon: string;
}

interface SeniorLivingChain {
  name: string;
  description: string;
  bgColor: string;
  iconBgColor: string;
  icon: string;
}

interface TimelineCard {
  year: string;
  description: string;
  facilities: string;
  revenue: string;
  bgColor: string;
  textColor: string;
  dotColor: string;
}

interface SectionData {
  title: string;
  subtitle: string;
  listen_button?: {
    text: string;
    url: string;
    enabled: boolean;
  };
  read_button?: {
    text: string;
    url: string;
    enabled: boolean;
  };
  watch_button?: {
    text: string;
    url: string;
    enabled: boolean;
  };
  expansion_strategy: {
    heading: string;
    description: string;
    cards: ExpansionCard[];
  };
  strategic_partners: {
    heading: string;
    healthcare_systems: {
      title: string;
      partners: HealthcarePartner[];
    };
    senior_living_chains: {
      title: string;
      chains: SeniorLivingChain[];
    };
    partnership_benefits: {
      title: string;
      gradient: string;
      benefits: string[];
    };
  };
  market_timeline: {
    heading: string;
    cards: TimelineCard[];
  };
}

const NationalPartnershipOpportunitiesDynamic = () => {
  const [section, setSection] = useState<SectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [audioSrc, setAudioSrc] = useState<string>('');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>('');

  useEffect(() => {
    fetchSection();
  }, []);

  const fetchSection = async () => {
    try {
      const { data, error } = await supabase
        .from('section_content')
        .select('content')
        .eq('section_key', 'partnership_opportunities')
        .single();

      if (error) throw error;

      if (data) {
        setSection(data.content as unknown as SectionData);
      }
    } catch (error) {
      console.error('Error fetching section:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAudioPlay = (url: string, id: string) => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    if (playingAudio === id) {
      audioRef.current.pause();
      setPlayingAudio(null);
    } else {
      if (playingAudio) {
        audioRef.current.pause();
      }
      audioRef.current.src = url;
      audioRef.current.play();
      setPlayingAudio(id);
      setAudioSrc(url);

      audioRef.current.onended = () => {
        setPlayingAudio(null);
      };
    }
  };

  const handleAudioStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPlayingAudio(null);
    setAudioSrc('');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!section) {
    return null;
  }

  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <SectionTagBadge 
        sectionTag="partnership-opportunities" 
        adminPath="/admin/partnership-opportunities" 
        enabled={true} 
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 font-serif mb-6">
            {section.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {section.subtitle}
          </p>

          {/* Action Buttons */}
          {(section.listen_button?.enabled || section.read_button?.enabled || section.watch_button?.enabled) && (
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              {section.listen_button?.enabled && (
                <>
                  <Button
                    onClick={() => {
                      if (section.listen_button?.url) {
                        if (playingAudio === 'section-listen') {
                          handleAudioStop();
                        } else {
                          handleAudioPlay(section.listen_button.url, 'section-listen');
                        }
                      }
                    }}
                    variant="default"
                    size="lg"
                    className="gap-2"
                  >
                    {playingAudio === 'section-listen' ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Headphones className="w-4 h-4" />
                    )}
                    {section.listen_button.text || 'Listen More'}
                  </Button>
                  {playingAudio === 'section-listen' && (
                    <Button
                      onClick={handleAudioStop}
                      variant="destructive"
                      size="lg"
                      className="gap-2"
                    >
                      <Square className="w-4 h-4" />
                      Stop
                    </Button>
                  )}
                </>
              )}

              {section.read_button?.enabled && (
                <Button
                  onClick={() => {
                    if (section.read_button?.url) {
                      if (section.read_button.url.startsWith('http')) {
                        window.open(section.read_button.url, '_blank');
                      } else {
                        window.location.href = section.read_button.url;
                      }
                    }
                  }}
                  variant="outline"
                  size="lg"
                  className="gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  {section.read_button.text || 'Read More'}
                </Button>
              )}

              {section.watch_button?.enabled && (
                <Button
                  onClick={() => {
                    if (section.watch_button?.url) {
                      const url = section.watch_button.url;
                      const isVideoFile = url.match(/\.(mp4|webm|ogg|mov)$/i) || url.includes('/media-library/');
                      
                      if (isVideoFile) {
                        setCurrentVideoUrl(url);
                        setVideoModalOpen(true);
                      } else if (url.startsWith('http')) {
                        window.open(url, '_blank');
                      } else {
                        window.location.href = url;
                      }
                    }
                  }}
                  variant="outline"
                  size="lg"
                  className="gap-2"
                >
                  <Video className="w-4 h-4" />
                  {section.watch_button.text || 'Watch More'}
                </Button>
              )}
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 font-serif mb-6">
                {section.expansion_strategy.heading}
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                {section.expansion_strategy.description}
              </p>
            </div>

            <div className="space-y-6">
              {section.expansion_strategy.cards.map((card, index) => (
                <div 
                  key={index} 
                  className={`bg-white rounded-xl p-6 border-l-4 ${card.borderColor} shadow-lg`}
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-10 h-10 ${card.bgColor} rounded-full flex items-center justify-center mr-4`}>
                      <span className={`font-bold ${card.textColor}`}>{card.number}</span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">{card.title}</h4>
                  </div>
                  <p className="text-gray-600 mb-4">{card.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`text-center p-3 ${card.bgColor} rounded-lg`}>
                      <div className={`font-bold ${card.textColor}`}>{card.months}</div>
                      <div className="text-sm text-gray-600">Months</div>
                    </div>
                    <div className={`text-center p-3 ${card.bgColor} rounded-lg`}>
                      <div className={`font-bold ${card.textColor}`}>{card.facilities}</div>
                      <div className="text-sm text-gray-600">Facilities</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-gray-900 font-serif mb-6">
              {section.strategic_partners.heading}
            </h3>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h4 className="text-xl font-bold text-gray-900 mb-6">
                {section.strategic_partners.healthcare_systems.title}
              </h4>
              <div className="grid grid-cols-2 gap-6">
                {section.strategic_partners.healthcare_systems.partners.map((partner, index) => (
                  <div key={index} className={`text-center p-4 ${partner.bgColor} rounded-lg`}>
                    <div className={`w-16 h-16 ${partner.iconBgColor} rounded-full mx-auto mb-3 flex items-center justify-center`}>
                      <i className={`fa-solid ${partner.icon} text-white text-2xl`}></i>
                    </div>
                    <h5 className="font-semibold text-gray-900 mb-2">{partner.name}</h5>
                    <p className="text-sm text-gray-600">{partner.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h4 className="text-xl font-bold text-gray-900 mb-6">
                {section.strategic_partners.senior_living_chains.title}
              </h4>
              <div className="space-y-4">
                {section.strategic_partners.senior_living_chains.chains.map((chain, index) => (
                  <div key={index} className={`flex items-center space-x-4 p-4 ${chain.bgColor} rounded-lg`}>
                    <div className={`w-12 h-12 ${chain.iconBgColor} rounded-lg flex items-center justify-center`}>
                      <i className={`fa-solid ${chain.icon} text-xl`}></i>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">{chain.name}</h5>
                      <p className="text-sm text-gray-600">{chain.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`bg-gradient-to-r ${section.strategic_partners.partnership_benefits.gradient} rounded-2xl p-8 text-white`}>
              <h4 className="text-xl font-bold mb-4">
                {section.strategic_partners.partnership_benefits.title}
              </h4>
              <ul className="space-y-3">
                {section.strategic_partners.partnership_benefits.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <i className="fa-solid fa-check-circle text-green-300 mr-3"></i>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            {section.market_timeline.heading}
          </h3>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {section.market_timeline.cards.map((card, index) => (
                <div key={index} className="relative">
                  <div className={`absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 ${card.dotColor} rounded-full border-4 border-white shadow-lg top-0`}></div>
                  <div className={`${card.bgColor} rounded-xl p-6 mt-8`}>
                    <h4 className={`font-bold ${card.textColor} mb-2`}>{card.year}</h4>
                    <p className={`${card.textColor} text-sm mb-4`}>{card.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Facilities:</span>
                        <span className={`font-semibold ${card.textColor}`}>{card.facilities}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Revenue:</span>
                        <span className={`font-semibold ${card.textColor}`}>{card.revenue}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={videoModalOpen} onOpenChange={setVideoModalOpen}>
        <DialogContent className="max-w-5xl p-6 bg-transparent border-none">
          {currentVideoUrl && <VideoPlayer src={currentVideoUrl} onClose={() => setVideoModalOpen(false)} />}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default NationalPartnershipOpportunitiesDynamic;
