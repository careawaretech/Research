import React, { useEffect, useState, useRef } from 'react';
import { Check, X, Headphones, BookOpen, Video, Play, Pause, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { SectionTagBadge } from '@/components/admin/SectionTagBadge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import VideoPlayer from '@/components/ui/video-player';

interface CellData {
  text: string;
  bg: string;
  textColor: string;
  icon: 'check' | 'x' | null;
}

interface RowData {
  technology: string;
  cells: CellData[];
}

interface SectionData {
  title: string;
  subtitle?: string;
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
  columns: string[];
  rows: RowData[];
}

const TechnologyComparisonDynamic = () => {
  const [sectionData, setSectionData] = useState<SectionData | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPausedAudio, setIsPausedAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>('');

  useEffect(() => {
    fetchSectionData();
  }, []);

  const fetchSectionData = async () => {
    try {
      const { data, error } = await supabase
        .from('section_content')
        .select('content')
        .eq('section_key', 'technology-comparison')
        .single();

      if (error) throw error;
      if (data?.content) {
        setSectionData(data.content as unknown as SectionData);
      }
    } catch (error) {
      console.error('Error fetching section data:', error);
    }
  };

  const handleAudioPlayPause = () => {
    if (!audioRef.current) {
      if (sectionData?.listen_button?.url) {
        audioRef.current = new Audio(sectionData.listen_button.url);
        audioRef.current.addEventListener('ended', () => {
          setIsPlayingAudio(false);
          setIsPausedAudio(false);
          audioRef.current = null;
        });
      }
    }

    if (audioRef.current) {
      if (isPlayingAudio && !isPausedAudio) {
        audioRef.current.pause();
        setIsPausedAudio(true);
      } else {
        audioRef.current.play();
        setIsPlayingAudio(true);
        setIsPausedAudio(false);
      }
    }
  };

  const handleAudioStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setIsPlayingAudio(false);
    setIsPausedAudio(false);
  };

  if (!sectionData) {
    return null;
  }

  return (
    <section className="relative bg-gray-50 w-full py-16 lg:py-20 px-6 lg:px-8">
      <SectionTagBadge sectionTag="technology-comparison" adminPath="/admin/technology-comparison" enabled={true} />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {sectionData.title}
          </h2>
          {sectionData.subtitle && (
            <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
              {sectionData.subtitle}
            </p>
          )}
          
          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            {sectionData.listen_button?.enabled && (
              <div className="flex gap-2">
                <Button
                  onClick={sectionData.listen_button.url ? handleAudioPlayPause : undefined}
                  variant="outline"
                  className="gap-2"
                  disabled={!sectionData.listen_button.url}
                >
                  {isPlayingAudio && !isPausedAudio ? (
                    <>
                      <Pause className="w-4 h-4" />
                      Pause
                    </>
                  ) : (
                    <>
                      {isPausedAudio ? <Play className="w-4 h-4" /> : <Headphones className="w-4 h-4" />}
                      {sectionData.listen_button.text || 'Listen More'}
                    </>
                  )}
                </Button>
                {isPlayingAudio && (
                  <Button
                    onClick={handleAudioStop}
                    variant="outline"
                    size="icon"
                  >
                    <Square className="w-4 h-4" />
                  </Button>
                )}
              </div>
            )}

            {sectionData.read_button?.enabled && (
              <Button
                onClick={sectionData.read_button.url ? () => window.open(sectionData.read_button!.url, '_blank') : undefined}
                variant="outline"
                className="gap-2"
                disabled={!sectionData.read_button.url}
              >
                <BookOpen className="w-4 h-4" />
                {sectionData.read_button.text || 'Read More'}
              </Button>
            )}

            {sectionData.watch_button?.enabled && (
              <Button
                onClick={() => {
                  if (sectionData.watch_button?.url) {
                    const url = sectionData.watch_button.url;
                    const isVideoFile = url.match(/\.(mp4|webm|ogg|mov)$/i) || url.includes('/media-library/');
                    
                    if (isVideoFile) {
                      setCurrentVideoUrl(url);
                      setVideoModalOpen(true);
                    } else {
                      window.open(url, '_blank');
                    }
                  }
                }}
                variant="outline"
                className="gap-2"
                disabled={!sectionData.watch_button.url}
              >
                <Video className="w-4 h-4" />
                {sectionData.watch_button.text || 'Watch More'}
              </Button>
            )}
          </div>
        </div>

        {/* Desktop & Tablet: Table Layout */}
        <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-sm">
          <table className="w-full border-collapse" role="table" aria-label="Technology comparison matrix">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left p-4 font-semibold text-gray-900 min-w-[140px]">
                  Technology
                </th>
                {sectionData.columns.map((column, index) => (
                  <th key={index} className="text-center p-4 font-semibold text-gray-900 min-w-[140px]">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sectionData.rows.map((row, rowIndex) => (
                <tr 
                  key={rowIndex}
                  className="border-b border-gray-200"
                >
                  <td className="p-4 font-semibold text-gray-900 whitespace-pre-line">
                    {row.technology}
                  </td>
                  {row.cells.map((cell, cellIndex) => (
                    <td key={cellIndex} className={`p-4 text-center ${cell.bg}`}>
                      <div className="flex items-center justify-center gap-2">
                        {cell.icon === "check" && <Check className={`w-4 h-4 ${cell.textColor}`} />}
                        {cell.icon === "x" && <X className={`w-4 h-4 ${cell.textColor}`} />}
                        <span className={`text-sm ${cell.textColor}`}>{cell.text}</span>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: Card Layout */}
        <div className="md:hidden space-y-4">
          {sectionData.rows.map((row, rowIndex) => (
            <div 
              key={rowIndex}
              className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
              role="article"
              aria-label={`Comparison for ${row.technology}`}
            >
              <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                <h3 className="font-bold text-gray-900 text-base whitespace-pre-line">
                  {row.technology}
                </h3>
              </div>
              <div className="p-4 space-y-3">
                {row.cells.map((cell, cellIndex) => (
                  <div key={cellIndex} className="space-y-1">
                    <div className="text-xs font-semibold text-gray-600">{sectionData.columns[cellIndex]}</div>
                    <div className={`p-2 rounded ${cell.bg}`}>
                      <div className="flex items-center gap-2">
                        {cell.icon === "check" && <Check className={`w-4 h-4 ${cell.textColor}`} />}
                        {cell.icon === "x" && <X className={`w-4 h-4 ${cell.textColor}`} />}
                        <span className={`text-sm ${cell.textColor}`}>{cell.text}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
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

export default TechnologyComparisonDynamic;
