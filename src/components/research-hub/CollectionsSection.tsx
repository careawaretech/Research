import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface CollectionCardProps {
  title: string;
  description: string;
  paperCount: number;
  backgroundImage?: string;
  features: string[];
}

const CollectionCard: React.FC<CollectionCardProps> = ({
  title,
  description,
  paperCount,
  backgroundImage,
  features
}) => {
  return (
    <article className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] border border grow overflow-hidden w-full p-px rounded-xl border-solid max-md:mt-[37px]">
      <div className="text-white">
        <div 
          className="bg-[rgba(0,0,0,0.2)] pt-[120px] pb-4 px-4 max-md:pt-[100px]"
          style={{
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="flex flex-col pr-[62px] pb-1.5 max-md:pr-5">
            <h3 className="text-xl font-bold leading-[1.4]">
              {title}
            </h3>
            <p className="text-sm font-normal leading-none mt-5">
              {description}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full text-sm p-6 max-md:px-5">
        <div className="flex items-stretch gap-5 font-medium justify-between">
          <div className="text-gray-600 leading-none">
            {paperCount} Papers
          </div>
          <button className="text-[rgba(26,188,156,1)] text-center pb-2 px-0.5 hover:underline">
            Explore →
          </button>
        </div>
        <div className="text-gray-700 font-normal mt-4">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col pb-[7px] max-md:pr-5 mt-2">
              <div>• {feature}</div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

export const CollectionsSection: React.FC = () => {
  const [collections, setCollections] = useState<CollectionCardProps[]>([]);

  useEffect(() => {
    const fetchCollections = async () => {
      const { data } = await (supabase as any)
        .from('research_hub_collections')
        .select('*')
        .order('display_order', { ascending: true });

      if (data) {
        setCollections(data.map((coll: any) => ({
          title: coll.title,
          description: coll.description,
          paperCount: coll.paper_count,
          backgroundImage: coll.background_image,
          features: coll.features || [],
        })));
      }
    };

    fetchCollections();
  }, []);

  if (collections.length === 0) return null;

  return (
    <section className="bg-gray-50 pt-16 pb-[39px] px-20 max-md:max-w-full max-md:px-5">
      <div className="w-full px-[17px] max-md:max-w-full">
        <div className="flex flex-col items-center text-center mx-[15px] pb-[11px] px-20 max-md:max-w-full max-md:mr-2.5 max-md:px-5">
          <div className="flex w-[610px] max-w-full flex-col items-stretch">
            <h2 className="text-[rgba(44,62,80,1)] text-3xl font-bold leading-[1.2] self-center max-md:max-w-full">
              Curated Research Collections
            </h2>
            <p className="text-gray-600 text-lg font-normal leading-7 mt-[29px] max-md:max-w-full">
              Expertly curated collections of research papers organized by theme and application area
            </p>
          </div>
        </div>
        
        <div className="mt-[43px] pt-[5px] pb-[25px] px-[15px] max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            {collections.map((collection, index) => (
              <div key={index} className="w-[33%] max-md:w-full max-md:ml-0">
                <CollectionCard {...collection} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
