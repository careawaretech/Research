import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface HowItWorksCard {
  id: string;
  title: string;
  description: string | null;
  icon_url: string | null;
  display_order: number;
}

const HowItWorksCardsSection = () => {
  const [cards, setCards] = useState<HowItWorksCard[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCards = async () => {
      const { data, error } = await supabase
        .from('how_it_works_cards')
        .select('*')
        .order('display_order');

      if (error) {
        console.error('Error fetching cards:', error);
        return;
      }

      setCards(data || []);
    };

    fetchCards();
  }, []);


  if (cards.length === 0) return null;

  return (
    <>
      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .scroll-animation {
          animation: scroll-left 40s linear infinite;
        }
        
        .scroll-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      <section className="py-8 md:py-12 bg-background overflow-hidden">
        <div className="flex gap-4 scroll-animation px-4">
          {cards.concat(cards).map((card, index) => (
            <Card
              key={`${card.id}-${index}`}
              className="bg-[hsl(var(--feature-card))] hover:opacity-90 transition-all duration-300 flex-shrink-0 w-[280px]"
            >
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                {card.icon_url ? (
                  <img
                    src={card.icon_url}
                    alt={card.title}
                    className="w-16 h-16 object-contain"
                  />
                ) : (
                  <div className="w-16 h-16 border-2 border-dashed border-primary-foreground/30 rounded-lg flex items-center justify-center">
                    <span className="text-xs text-primary-foreground/50">Icon</span>
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-[hsl(var(--feature-card-foreground))]">
                  {card.title}
                </h3>
                
                {card.description && (
                  <p className="text-sm text-[hsl(var(--feature-card-foreground))]/80">
                    {card.description}
                  </p>
                )}
                
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    if (index === 0) {
                      navigate('/how-it-works');
                    }
                  }}
                  className="mt-auto"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
};

export default HowItWorksCardsSection;
