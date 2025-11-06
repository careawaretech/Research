import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Play, Headphones, BookOpen } from 'lucide-react';
import { SectionTagBadge } from '@/components/admin/SectionTagBadge';

interface StatItem {
  value: string;
  label: string;
  color: string;
}

interface FocusDetail {
  label: string;
  value: string;
}

interface RegionFocus {
  title: string;
  details: FocusDetail[];
  bgColor: string;
}

interface RegionData {
  name: string;
  title: string;
  stats: StatItem[];
  focus: RegionFocus;
}

interface CardData {
  id: string;
  title: string;
  regions?: RegionData[];
  items?: string[];
  revenueItems?: { label: string; value: string; color: string }[];
  audio_url?: string;
  audio_duration?: string;
  button_url?: string;
  button_text?: string;
  enable_learn_more?: boolean;
}

interface SectionData {
  title: string;
  cards: CardData[];
}

const RegionalFocusStrategyDynamic = () => {
  const [selectedRegion, setSelectedRegion] = useState<'oregon' | 'us'>('oregon');
  const [section, setSection] = useState<SectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
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
        .eq('section_key', 'regional_focus_strategy')
        .single();

      if (error) throw error;
      if (data?.content) {
        setSection(data.content as unknown as SectionData);
      }
    } catch (error) {
      console.error('Error fetching section:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAudioPlay = (audioUrl: string, cardId: string) => {
    if (playingAudio === cardId) {
      audioRef.current?.pause();
      setPlayingAudio(null);
      setCurrentAudio(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (currentAudio !== audioUrl) {
        audioRef.current = new Audio(audioUrl);
        setCurrentAudio(audioUrl);
      }
      audioRef.current?.play();
      setPlayingAudio(cardId);
      audioRef.current!.onended = () => {
        setPlayingAudio(null);
      };
    }
  };

  const handleAudioStop = () => {
    audioRef.current?.pause();
    setPlayingAudio(null);
    setCurrentAudio(null);
  };

  if (loading || !section) return null;

  const marketEntryCard = section.cards.find(c => c.id === 'market_entry');
  const firstMoverCard = section.cards.find(c => c.id === 'first_mover');
  const revenueCard = section.cards.find(c => c.id === 'revenue_model');
  const currentRegion = marketEntryCard?.regions?.find(r => r.name.toLowerCase() === selectedRegion);

  return (
    <div className="relative grid lg:grid-cols-2 gap-12 items-start">
      <SectionTagBadge sectionTag="regional-focus" adminPath="/admin/regional-focus-strategy" />
      <div>
        <h3 className="text-3xl font-bold text-gray-900 font-serif mb-6">{section.title}</h3>
        
        {/* Market Entry Card */}
        {marketEntryCard && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-bold text-gray-900">{marketEntryCard.title}</h4>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedRegion('oregon')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    selectedRegion === 'oregon'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Oregon
                </button>
                <button
                  onClick={() => setSelectedRegion('us')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    selectedRegion === 'us'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  US
                </button>
              </div>
            </div>
            
            {currentRegion && (
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">{currentRegion.title}</h5>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {currentRegion.stats.map((stat, idx) => (
                    <div key={idx} className={`text-center p-3 ${stat.color} rounded-lg`}>
                      <div className={`text-xl font-bold ${stat.color.replace('bg-', 'text-').replace('-50', '-600')}`}>
                        {stat.value}
                      </div>
                      <div className={`text-xs ${stat.color.replace('bg-', 'text-').replace('-50', '-800')}`}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
                <div className={`${currentRegion.focus.bgColor} p-4 rounded-lg mb-4`}>
                  <h6 className={`font-medium ${currentRegion.focus.bgColor.replace('bg-', 'text-').replace('-50', '-800')} mb-2`}>
                    {currentRegion.focus.title}
                  </h6>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {currentRegion.focus.details.map((detail, idx) => (
                      <div key={idx}>{detail.label}: {detail.value}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => marketEntryCard.audio_url && handleAudioPlay(marketEntryCard.audio_url, 'market_entry')}
                disabled={!marketEntryCard.audio_url}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#2C3E50] text-white hover:bg-[#2C3E50]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {playingAudio === 'market_entry' ? <Play className="w-3.5 h-3.5" /> : <Headphones className="w-3.5 h-3.5" />}
                <span>{playingAudio === 'market_entry' ? 'Playing...' : 'Listen'}</span>
              </button>
              {(marketEntryCard.enable_learn_more ?? true) && (
                <a
                  href={marketEntryCard.button_url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{marketEntryCard.button_text || 'Learn More'}</span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-gray-900 font-serif mb-6">Competitive Advantage</h3>
        
        {/* First-Mover Advantage Card */}
        {firstMoverCard && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
            <h4 className="font-bold text-gray-900 mb-4 text-lg">{firstMoverCard.title}</h4>
            <ul className="space-y-2 text-gray-700 mb-4">
              {firstMoverCard.items?.map((item, idx) => (
                <li key={idx} className="flex items-center">
                  <i className="fa-solid fa-check-circle text-green-500 mr-3"></i>
                  {item}
                </li>
              ))}
            </ul>
            
            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => firstMoverCard.audio_url && handleAudioPlay(firstMoverCard.audio_url, 'first_mover')}
                disabled={!firstMoverCard.audio_url}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#2C3E50] text-white hover:bg-[#2C3E50]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {playingAudio === 'first_mover' ? <Play className="w-3.5 h-3.5" /> : <Headphones className="w-3.5 h-3.5" />}
                <span>{playingAudio === 'first_mover' ? 'Playing...' : 'Listen'}</span>
              </button>
              {(firstMoverCard.enable_learn_more ?? true) && (
                <a
                  href={firstMoverCard.button_url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{firstMoverCard.button_text || 'Learn More'}</span>
                </a>
              )}
            </div>
          </div>
        )}
        
        {/* Revenue Model Card */}
        {revenueCard && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-4 text-lg">{revenueCard.title}</h4>
            <div className="space-y-3 mb-4">
              {revenueCard.revenueItems?.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">{item.label}</span>
                  <span className={`font-bold ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => revenueCard.audio_url && handleAudioPlay(revenueCard.audio_url, 'revenue_model')}
                disabled={!revenueCard.audio_url}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#2C3E50] text-white hover:bg-[#2C3E50]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {playingAudio === 'revenue_model' ? <Play className="w-3.5 h-3.5" /> : <Headphones className="w-3.5 h-3.5" />}
                <span>{playingAudio === 'revenue_model' ? 'Playing...' : 'Listen'}</span>
              </button>
              {(revenueCard.enable_learn_more ?? true) && (
                <a
                  href={revenueCard.button_url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{revenueCard.button_text || 'Learn More'}</span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegionalFocusStrategyDynamic;
