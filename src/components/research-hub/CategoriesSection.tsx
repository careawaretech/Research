import React, { useEffect, useState } from 'react';
import { CategoryCard } from '@/components/research-hub/CategoryCard';
import { supabase } from '@/integrations/supabase/client';
import { SectionTagBadge } from '@/components/admin/SectionTagBadge';

interface Category {
  id: string;
  title: string;
  description: string;
  paper_count: number;
  icon_url: string;
  icon_type: 'upload' | 'lucide';
  lucide_icon_name?: string;
  color: string;
  bg_gradient: string;
  display_order: number;
}

export const CategoriesSection: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await (supabase as any)
        .from('research_hub_categories')
        .select('*')
        .order('display_order', { ascending: true });

      if (data) {
        setCategories(data);
      }
    };

    fetchCategories();
  }, []);

  // Split categories into rows of 4
  const firstRow = categories.slice(0, 4);
  const secondRow = categories.slice(4, 8);

  return (
    <section className="relative bg-white flex flex-col items-stretch justify-center px-20 py-16 max-md:max-w-full max-md:px-5">
      <SectionTagBadge sectionTag="research-hub-categories" adminPath="/admin/research-hub?tab=categories" />
      <div className="px-8 max-md:max-w-full max-md:px-5">
        <div className="flex flex-col items-center text-center pb-2.5 px-20 max-md:max-w-full max-md:px-5">
          <div className="flex w-[524px] max-w-full flex-col items-stretch">
            <h2 className="text-[rgba(44,62,80,1)] text-3xl font-bold leading-[1.2] self-center max-md:max-w-full">
              Browse by Research Category
            </h2>
            <p className="text-gray-600 text-lg font-normal leading-loose mt-[23px] max-md:max-w-full">
              Explore papers organized by field of study and research focus
            </p>
          </div>
        </div>
        
        <div className="w-full mt-12 max-md:max-w-full max-md:mt-10">
          {firstRow.length > 0 && (
            <div className="max-md:max-w-full">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                {firstRow.map((category) => (
                  <div key={category.id} className="w-3/12 max-md:w-full max-md:ml-0">
                    <CategoryCard 
                      title={category.title}
                      description={category.description}
                      paperCount={category.paper_count}
                      icon={category.icon_url}
                      iconType={category.icon_type || 'upload'}
                      lucideIconName={category.lucide_icon_name}
                      color={category.color}
                      bgGradient={category.bg_gradient}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {secondRow.length > 0 && (
            <div className="mt-6 max-md:max-w-full">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                {secondRow.map((category) => (
                  <div key={category.id} className="w-3/12 max-md:w-full max-md:ml-0">
                    <CategoryCard 
                      title={category.title}
                      description={category.description}
                      paperCount={category.paper_count}
                      icon={category.icon_url}
                      iconType={category.icon_type || 'upload'}
                      lucideIconName={category.lucide_icon_name}
                      color={category.color}
                      bgGradient={category.bg_gradient}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};