import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import * as LucideIcons from 'lucide-react';

interface TrendingTopicProps {
  rank: number;
  title: string;
  paperCount: number;
  growth: string;
  iconUrl?: string;
  iconType: 'upload' | 'lucide';
  lucideIconName?: string;
  color: string;
  borderColor: string;
}

const TrendingTopicCard: React.FC<TrendingTopicProps> = ({
  rank,
  title,
  paperCount,
  growth,
  iconUrl,
  iconType,
  lucideIconName,
  color,
  borderColor
}) => {
  const renderIcon = () => {
    if (iconType === 'lucide' && lucideIconName) {
      const IconComponent = LucideIcons[lucideIconName as keyof typeof LucideIcons] as React.ComponentType<any>;
      if (IconComponent) {
        return <IconComponent className="w-12 h-12 rounded-lg" />;
      }
    }
    if (iconUrl) {
      return (
        <img
          src={iconUrl}
          className="aspect-[1] object-contain w-12 shrink-0 rounded-lg"
          alt={`${title} icon`}
        />
      );
    }
    return null;
  };

  // Helper to check if color is a custom color (hex, rgb, hsl) or Tailwind class
  const isCustomColor = (colorValue: string) => {
    return colorValue.startsWith('#') || colorValue.startsWith('rgb') || colorValue.startsWith('hsl');
  };

  const isCustomBorderColor = (borderValue: string) => {
    return borderValue.startsWith('#') || borderValue.startsWith('rgb') || borderValue.startsWith('hsl');
  };

  return (
    <article 
      className={`border flex w-full flex-col items-stretch p-[25px] rounded-xl border-solid max-md:mt-6 max-md:px-5 ${!isCustomBorderColor(borderColor) ? borderColor : ''}`}
      style={isCustomBorderColor(borderColor) ? { borderColor: borderColor } : {}}
    >
      <div className="flex items-stretch gap-5 text-sm font-bold whitespace-nowrap leading-none justify-between">
        {renderIcon()}
        <div 
          className={`my-auto ${!isCustomColor(color) ? color : ''}`}
          style={isCustomColor(color) ? { color: color } : {}}
        >
          #{rank}
        </div>
      </div>
      <h3 className="text-gray-900 text-base font-bold mt-4">
        {title}
      </h3>
      <p className="text-gray-600 text-sm font-normal leading-none mt-4">
        {paperCount} new papers this month
      </p>
      <div className="flex w-full items-stretch gap-1 mt-[19px] py-0.5">
        <div className="flex min-h-3 items-center overflow-hidden justify-center mt-1">
          <img
            src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/26d622b26db4b5684c961aa97227ba769892735a?placeholderIfAbsent=true"
            className="aspect-[0.75] object-contain w-[9px] self-stretch my-auto"
            alt="Growth icon"
          />
        </div>
        <div className="text-gray-500 text-sm font-normal leading-none grow shrink w-[221px]">
          {growth} from last month
        </div>
      </div>
    </article>
  );
};

export const TrendingTopicsSection: React.FC = () => {
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopicProps[]>([]);

  useEffect(() => {
    const fetchTrendingTopics = async () => {
      const { data } = await (supabase as any)
        .from('research_hub_trending_topics')
        .select('*')
        .order('display_order', { ascending: true });

      if (data) {
        setTrendingTopics(data.map((topic: any) => ({
          rank: topic.rank,
          title: topic.title,
          paperCount: topic.paper_count,
          growth: topic.growth,
          iconUrl: topic.icon_url,
          iconType: topic.icon_type,
          lucideIconName: topic.lucide_icon_name,
          color: topic.color,
          borderColor: topic.border_color,
        })));
      }
    };

    fetchTrendingTopics();
  }, []);

  if (trendingTopics.length === 0) return null;

  return (
    <section className="bg-white flex flex-col items-stretch justify-center px-20 py-16 max-md:max-w-full max-md:px-5">
      <div className="w-full px-8 max-md:max-w-full max-md:px-5">
        <div className="flex flex-col items-center text-center pb-2.5 px-20 max-md:max-w-full max-md:px-5">
          <div className="flex w-[455px] max-w-full flex-col items-stretch">
            <h2 className="text-[rgba(44,62,80,1)] text-3xl font-bold leading-[1.2] self-center">
              Trending Research Topics
            </h2>
            <p className="text-gray-600 text-lg font-normal leading-loose mt-[22px] max-md:max-w-full">
              Discover what researchers are focusing on this month
            </p>
          </div>
        </div>
        
        <div className="mt-12 max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            {trendingTopics.map((topic, index) => (
              <div key={index} className="w-3/12 max-md:w-full max-md:ml-0">
                <TrendingTopicCard {...topic} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
