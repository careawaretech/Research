import React, { useState, useEffect } from 'react';
import { PaperCard } from '@/components/research-hub/PaperCard';
import { supabase } from '@/integrations/supabase/client';
import { SectionTagBadge } from '@/components/admin/SectionTagBadge';

interface Badge {
  text: string;
  color: string;
  bgColor: string;
}

interface LatestPaper {
  id: string;
  title: string;
  description: string;
  author: string;
  year: string;
  views: string;
  comments: string;
  image_url: string;
  badges: Badge[];
  display_order: number;
  category?: string;
}

export const LatestPapersSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('Sort by Date');
  const [papers, setPapers] = useState<LatestPaper[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchPapers = async () => {
      const { data } = await (supabase as any)
        .from('research_hub_latest_papers')
        .select('*')
        .order('display_order', { ascending: true });

      if (data) {
        setPapers(data);
      }
    };

    const fetchCategories = async () => {
      const { data } = await (supabase as any)
        .from('research_hub_categories')
        .select('title')
        .order('display_order', { ascending: true });

      if (data) {
        setCategories(data.map((cat: any) => cat.title));
      }
    };

    fetchPapers();
    fetchCategories();
  }, []);

  // Filter and sort papers based on selections
  const filteredAndSortedPapers = React.useMemo(() => {
    let filtered = papers;

    // Apply category filter
    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(paper => paper.category === selectedCategory);
    }

    // Apply sorting
    const sorted = [...filtered];
    if (sortBy === 'Sort by Views') {
      sorted.sort((a, b) => parseInt(b.views) - parseInt(a.views));
    } else if (sortBy === 'Sort by Comments') {
      sorted.sort((a, b) => parseInt(b.comments) - parseInt(a.comments));
    } else if (sortBy === 'Sort by Date') {
      sorted.sort((a, b) => parseInt(b.year) - parseInt(a.year));
    }

    return sorted;
  }, [papers, selectedCategory, sortBy]);

  return (
    <section className="relative bg-gray-50 flex flex-col items-stretch justify-center px-20 py-16 max-md:max-w-full max-md:px-5">
      <SectionTagBadge sectionTag="research-hub-latest" adminPath="/admin/research-hub?tab=latest" />
      <div className="w-full px-[17px] max-md:max-w-full">
        <div className="flex w-full max-w-[1216px] items-stretch gap-5 flex-wrap justify-between mx-[15px] max-md:max-w-full max-md:mr-2.5">
          <div className="flex flex-col items-stretch pb-[11px]">
            <h2 className="text-[rgba(44,62,80,1)] text-3xl font-bold leading-[1.2]">
              Latest Research Papers
            </h2>
            <p className="text-gray-600 text-lg font-normal leading-loose mt-4">
              Recently published papers across all categories
            </p>
          </div>
          <div className="flex items-stretch gap-4 text-base text-black font-normal my-auto max-md:max-w-full">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white border-gray-300 border px-2.5 py-2 rounded-lg border-solid outline-none"
            >
              <option>All Categories</option>
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border-gray-300 border px-2.5 py-2 rounded-lg border-solid outline-none"
            >
              <option>Sort by Date</option>
              <option>Sort by Views</option>
              <option>Sort by Comments</option>
            </select>
          </div>
        </div>
        
        <div className="w-full mt-[43px] pt-[5px] pb-[25px] px-[15px] max-md:max-w-full max-md:mt-10">
          <div className="max-md:max-w-full">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
              {filteredAndSortedPapers.slice(0, 3).map((paper) => (
                <div key={paper.id} className="w-[33%] max-md:w-full max-md:ml-0">
                  <div className="max-md:mt-8">
                    <PaperCard 
                      title={paper.title}
                      description={paper.description}
                      author={paper.author}
                      year={paper.year}
                      views={paper.views}
                      comments={paper.comments}
                      image={paper.image_url}
                      badges={paper.badges}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {filteredAndSortedPapers.length > 3 && (
            <div className="mt-8 max-md:max-w-full">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                {filteredAndSortedPapers.slice(3, 6).map((paper) => (
                  <div key={paper.id} className="w-[33%] max-md:w-full max-md:ml-0">
                    <div className="max-md:mt-8">
                      <PaperCard 
                        title={paper.title}
                        description={paper.description}
                        author={paper.author}
                        year={paper.year}
                        views={paper.views}
                        comments={paper.comments}
                        image={paper.image_url}
                        badges={paper.badges}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {filteredAndSortedPapers.length > 6 && (
          <div className="flex flex-col items-center text-base text-white font-medium text-center mt-[23px] mx-[15px] px-20 max-md:max-w-full max-md:mr-2.5 max-md:px-5">
            <button className="bg-[rgba(44,62,80,1)] w-[198px] max-w-full pt-[11px] pb-[22px] px-[31px] rounded-lg max-md:px-5 hover:bg-[rgba(44,62,80,0.9)] transition-colors">
              Load More Papers
            </button>
          </div>
        )}
      </div>
    </section>
  );
};