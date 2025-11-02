import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AlertTriangle, Shield, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Typewriter } from '@/components/ui/typewriter-text';

interface CardData {
  title: string;
  subtitle: string;
  content: string;
  icon_url: string;
  button_text: string;
  button_url: string;
  button_enabled: boolean;
}

interface SectionData {
  title: string;
  subtitle: string;
  metadata: {
    cards: CardData[];
  };
}

const iconMap: Record<string, any> = {
  'Clinical Crisis': AlertTriangle,
  'Privacy Crisis': Shield,
  'Technology Gap': Wrench,
};

const colorMap: Record<number, { bg: string; border: string; text: string; icon: string }> = {
  0: { bg: 'bg-red-50/50', border: 'border-red-600', text: 'text-red-800', icon: 'text-red-600' },
  1: { bg: 'bg-purple-50/50', border: 'border-purple-600', text: 'text-purple-800', icon: 'text-purple-600' },
  2: { bg: 'bg-orange-50/50', border: 'border-orange-600', text: 'text-orange-800', icon: 'text-orange-600' },
};

const CriticalGapSectionDynamic = () => {
  const [section, setSection] = useState<SectionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSection();
  }, []);

  const fetchSection = async () => {
    try {
      const { data: pageData, error: pageError } = await supabase
        .from('content_pages')
        .select('id')
        .eq('page_slug', 'home')
        .maybeSingle();

      if (pageError || !pageData) {
        console.log('Page not found');
        return;
      }

      const pageId = (pageData as any).id;

      const { data: sectionData, error: sectionError } = await supabase
        .from('page_sections')
        .select('*')
        .eq('page_id', pageId)
        .eq('section_type', 'critical_gap')
        .maybeSingle();

      if (sectionError || !sectionData) return;
      
      setSection(sectionData as any);
    } catch (error) {
      console.error('Error fetching section:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="bg-white w-full py-16 lg:py-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </section>
    );
  }

  if (!section) {
    return null;
  }

  return (
    <section className="bg-white w-full py-16 lg:py-20 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-gray-900 text-4xl leading-none self-center max-md:max-w-full">
              <Typewriter
                text={section.title}
                speed={50}
                loop={false}
                className="text-gray-900 text-4xl leading-none"
              />
            </h2>
            <p className="text-gray-600 text-xl leading-7 mt-[29px] max-md:max-w-full">
              {section.subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {section.metadata.cards.map((card, index) => {
            const Icon = card.icon_url ? null : iconMap[card.title] || AlertTriangle;
            const colors = colorMap[index] || colorMap[0];

            return (
              <article
                key={index}
                className={`${colors.bg} border-l-[6px] ${colors.border} flex flex-col px-8 py-8 h-full`}
              >
                <div className="flex items-center gap-4 mb-6">
                  {card.icon_url ? (
                    <img src={card.icon_url} alt={card.title} className="w-8 h-8 flex-shrink-0" />
                  ) : Icon ? (
                    <Icon className={`w-8 h-8 ${colors.icon} flex-shrink-0`} />
                  ) : null}
                  <div>
                    <h3 className={`text-2xl font-bold ${colors.text}`}>{card.title}</h3>
                    {card.subtitle && (
                      <p className={`text-sm ${colors.text} opacity-80 mt-1`}>{card.subtitle}</p>
                    )}
                  </div>
                </div>
                <div
                  className={`text-base ${colors.text.replace('800', '700')} flex-1 [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:space-y-2 [&_li]:pl-1`}
                  dangerouslySetInnerHTML={{ __html: card.content }}
                />
                {card.button_enabled && card.button_text && (
                  <div className="mt-6">
                    <Button
                      variant="outline"
                      className={`${colors.border} ${colors.text}`}
                      onClick={() => {
                        if (card.button_url) {
                          if (card.button_url.startsWith('http')) {
                            window.open(card.button_url, '_blank');
                          } else {
                            window.location.href = card.button_url;
                          }
                        }
                      }}
                    >
                      {card.button_text}
                    </Button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CriticalGapSectionDynamic;