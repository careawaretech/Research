import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Play, Pause, Headphones, BookOpen, Video, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionTagBadge } from "@/components/admin/SectionTagBadge";

interface ComparisonCard {
  title: string;
  type: "problem" | "solution";
  bullet_points: string[];
  border_color?: string;
  text_color?: string;
}

interface TechnologyBox {
  title: string;
  subtitle: string;
  icon_url?: string;
  icon_type?: string;
  lucide_icon_name?: string;
  bg_color: string;
  text_color: string;
  sub_text_color: string;
  description?: string;
  details?: {
    section_title: string;
    items: string[];
    bg_color: string;
    text_color: string;
  }[];
  footer_text?: string;
  footer_bg?: string;
  footer_icon?: string;
}

interface SectionData {
  title: string;
  subtitle: string;
  icon_url?: string;
  icon_type?: string;
  lucide_icon_name?: string;
  comparison_title: string;
  comparison_subtitle: string;
  comparison_cards: ComparisonCard[];
  tech_comparison_title: string;
  technology_boxes: TechnologyBox[];
  listen_button?: {
    text: string;
    url: string;
    audio_url?: string;
    audio_duration?: string;
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
}

const FeatureComparisonDynamic = () => {
  const [section, setSection] = useState<SectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [playingAudio, setPlayingAudio] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetchSection();
  }, []);

  const fetchSection = async () => {
    try {
      const { data, error } = await supabase
        .from("section_content")
        .select("content")
        .eq("section_key", "feature_comparison")
        .single();

      if (error) throw error;
      if (data?.content) {
        setSection(data.content as unknown as SectionData);
      }
    } catch (error) {
      console.error("Error fetching feature comparison section:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAudioPlay = (url: string) => {
    if (audioSrc === url && playingAudio) {
      audioRef.current?.pause();
      setPlayingAudio(false);
    } else {
      setAudioSrc(url);
      setPlayingAudio(true);
      setTimeout(() => {
        audioRef.current?.play();
      }, 100);
    }
  };

  const handleAudioStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPlayingAudio(false);
    setAudioSrc(null);
  };

  const renderIcon = (iconType?: string, iconUrl?: string, lucideIconName?: string) => {
    if (iconType === "upload" && iconUrl) {
      return <img src={iconUrl} alt="icon" className="w-20 h-20 rounded-full" />;
    }
    return null;
  };

  if (loading || !section) return null;

  return (
    <section className="relative bg-white w-full py-16 lg:py-20 px-6 lg:px-8">
      <SectionTagBadge sectionTag="Feature Comparison" adminPath="/admin/feature-comparison" />
      
      <div className="max-w-6xl mx-auto">
        {/* Main Header */}
        <div className="flex flex-col items-center text-center pb-8">
          {renderIcon(section.icon_type, section.icon_url, section.lucide_icon_name)}
          <h2 className="text-gray-900 text-5xl font-bold mt-6 max-md:text-4xl">
            {section.title}
          </h2>
          <p className="text-gray-600 text-xl mt-4 max-w-4xl">
            {section.subtitle}
          </p>
        </div>

        {/* Action Buttons */}
        {(section.listen_button?.enabled || section.read_button?.enabled || section.watch_button?.enabled) && (
          <div className="flex flex-wrap justify-center gap-4 mt-8 mb-12">
            {section.listen_button?.enabled && (
              <Button
                variant="outline"
                size="lg"
                onClick={() => section.listen_button?.audio_url && handleAudioPlay(section.listen_button.audio_url)}
                className="gap-2"
              >
                {playingAudio && audioSrc === section.listen_button.audio_url ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Headphones className="w-4 h-4" />
                )}
                {section.listen_button.text}
              </Button>
            )}
            {section.read_button?.enabled && (
              <Button
                variant="outline"
                size="lg"
                onClick={() => section.read_button?.url && window.open(section.read_button.url, '_blank')}
                className="gap-2"
              >
                <BookOpen className="w-4 h-4" />
                {section.read_button.text}
              </Button>
            )}
            {section.watch_button?.enabled && (
              <Button
                variant="outline"
                size="lg"
                onClick={() => section.watch_button?.url && window.open(section.watch_button.url, '_blank')}
                className="gap-2"
              >
                <Video className="w-4 h-4" />
                {section.watch_button.text}
              </Button>
            )}
          </div>
        )}

        {/* The Privacy Revolution Section */}
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">
            {section.comparison_title}
          </h3>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            {section.comparison_subtitle}
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {section.comparison_cards?.map((card, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-2xl border-4 ${card.border_color || 'border-gray-200'}`}
            >
              <h4 className={`text-2xl font-bold mb-6 ${card.text_color || 'text-gray-900'}`}>
                {card.title}
              </h4>
              <ul className="space-y-3">
                {card.bullet_points?.map((point, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* What Different Technologies See */}
        <div className="bg-gray-50 rounded-3xl p-12">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {section.tech_comparison_title}
          </h3>

          {/* Technology Boxes */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {section.technology_boxes?.slice(0, 2).map((box, idx) => (
              <div
                key={idx}
                className={`${box.bg_color} p-8 rounded-2xl border-4 ${box.text_color}`}
              >
                <div className="text-center mb-6">
                  {renderIcon(box.icon_type, box.icon_url, box.lucide_icon_name)}
                  <h4 className="text-2xl font-bold mt-4">{box.title}</h4>
                  <p className={`${box.sub_text_color} mt-2`}>{box.subtitle}</p>
                </div>

                {box.details?.map((detail, i) => (
                  <div key={i} className={`${detail.bg_color} p-6 rounded-xl mt-6`}>
                    <h5 className={`font-semibold mb-3 ${detail.text_color}`}>
                      {detail.section_title}
                    </h5>
                    <ul className="space-y-2">
                      {detail.items?.map((item, j) => (
                        <li key={j} className="text-sm">{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}

                {box.footer_text && (
                  <div className={`${box.footer_bg} p-4 rounded-lg mt-4 font-medium text-center`}>
                    {box.footer_text}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom 3 Boxes */}
          <div className="grid md:grid-cols-3 gap-6">
            {section.technology_boxes?.slice(2, 5).map((box, idx) => (
              <div
                key={idx}
                className={`${box.bg_color} p-6 rounded-xl text-center`}
              >
                {renderIcon(box.icon_type, box.icon_url, box.lucide_icon_name)}
                <h5 className={`font-semibold mt-4 ${box.text_color}`}>{box.title}</h5>
                {box.description && (
                  <p className={`text-sm mt-2 ${box.sub_text_color}`}>{box.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {audioSrc && (
        <audio
          ref={audioRef}
          src={audioSrc}
          onEnded={handleAudioStop}
          onPause={() => setPlayingAudio(false)}
          onPlay={() => setPlayingAudio(true)}
        />
      )}
    </section>
  );
};

export default FeatureComparisonDynamic;
