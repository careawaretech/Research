import React, { useState } from 'react';

interface SearchFilters {
  query: string;
  researchArea: string;
  publicationType: string;
  yearRange: string;
  sortBy: string;
}

interface PublicationSearchProps {
  onFiltersChange: (filters: SearchFilters) => void;
}

export const PublicationSearch: React.FC<PublicationSearchProps> = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    researchArea: 'all',
    publicationType: 'all',
    yearRange: 'all',
    sortBy: 'recent'
  });

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const categories = [
    { id: 'all', label: 'All (47)', active: true },
    { id: 'radar', label: 'Radar (18)', active: false },
    { id: 'wifi', label: 'WiFi (12)', active: false },
    { id: 'privacy', label: 'Privacy (15)', active: false },
    { id: 'healthcare', label: 'Healthcare (23)', active: false },
    { id: 'high-impact', label: 'High Impact (8)', active: false }
  ];

  return (
    <div className="bg-gray-50 ml-[15px] mr-[22px] mt-16 p-8 rounded-2xl max-md:max-w-full max-md:mr-2.5 max-md:mt-10 max-md:px-5">
      <form className="bg-[rgba(0,0,0,0)] flex items-stretch gap-6 flex-wrap">
        <div className="flex items-stretch grow shrink basis-auto">
          <div className="bg-[rgba(0,0,0,0)] py-0.5 max-md:-mr-1">
            <label className="bg-[rgba(0,0,0,0)] flex w-[211px] max-w-full flex-col text-sm text-gray-700 font-medium pb-2.5 max-md:pr-5">
              Search Publications
            </label>
            <div className="bg-[rgba(0,0,0,0)] w-full text-base text-[rgba(173,174,188,1)] font-normal mt-2">
              <div className="bg-white border-gray-300 border flex items-start gap-3 pt-4 pb-2.5 px-3 rounded-lg border-solid">
                <img
                  src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/54e19c84527962e13225b5e02321225aeaf89348?placeholderIfAbsent=true"
                  className="aspect-[0.67] object-contain w-4 shrink-0"
                  alt=""
                />
                <input
                  type="text"
                  placeholder="Keywords, authors, titles..."
                  value={filters.query}
                  onChange={(e) => handleFilterChange('query', e.target.value)}
                  className="grow shrink w-[184px] my-auto bg-transparent border-none outline-none text-black"
                />
              </div>
            </div>
          </div>
          <div className="bg-[rgba(0,0,0,0)]">
            <label className="bg-[rgba(0,0,0,0)] flex flex-col text-sm text-gray-700 font-medium pb-[11px] max-md:pr-5">
              Research Area
            </label>
            <select
              value={filters.researchArea}
              onChange={(e) => handleFilterChange('researchArea', e.target.value)}
              className="bg-white border-gray-300 border flex items-stretch gap-5 text-base text-black font-normal justify-between mt-2 px-2.5 py-2 rounded-lg border-solid"
            >
              <option value="all">All Areas</option>
              <option value="radar">Radar Systems</option>
              <option value="wifi">WiFi CSI</option>
              <option value="privacy">Privacy Technology</option>
              <option value="healthcare">Healthcare Sensing</option>
            </select>
          </div>
        </div>
        <div className="flex items-stretch gap-6 flex-wrap grow shrink basis-auto">
          <div className="bg-[rgba(0,0,0,0)]">
            <label className="bg-[rgba(0,0,0,0)] flex flex-col text-sm text-gray-700 font-medium pb-2 max-md:pr-5">
              Publication Type
            </label>
            <select
              value={filters.publicationType}
              onChange={(e) => handleFilterChange('publicationType', e.target.value)}
              className="bg-white border-gray-300 border flex items-stretch gap-5 text-base text-black font-normal justify-between mt-2 px-2.5 py-2 rounded-lg border-solid"
            >
              <option value="all">All Types</option>
              <option value="journal">Journal Articles</option>
              <option value="conference">Conference Papers</option>
              <option value="patent">Patents</option>
            </select>
          </div>
          <div className="bg-[rgba(0,0,0,0)]">
            <label className="bg-[rgba(0,0,0,0)] flex flex-col text-sm text-gray-700 font-medium pb-2 max-md:pr-5">
              Year Range
            </label>
            <select
              value={filters.yearRange}
              onChange={(e) => handleFilterChange('yearRange', e.target.value)}
              className="bg-white border-gray-300 border flex items-stretch gap-5 text-base text-black font-normal justify-between mt-2 px-2.5 py-2 rounded-lg border-solid"
            >
              <option value="all">All Years</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>
          <div className="bg-[rgba(0,0,0,0)]">
            <label className="bg-[rgba(0,0,0,0)] flex flex-col text-sm text-gray-700 font-medium pb-2 max-md:pr-5">
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="bg-white border-gray-300 border flex items-stretch gap-5 text-base text-black font-normal justify-between mt-2 px-2.5 py-2 rounded-lg border-solid"
            >
              <option value="recent">Recent First</option>
              <option value="citations">Most Cited</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
        </div>
      </form>
      <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-3 text-sm text-black font-medium text-center flex-wrap mt-6 pr-20 max-md:pr-5">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`pt-2 pb-[17px] px-[15px] rounded-full ${
              category.active
                ? 'text-white bg-blue-600'
                : 'bg-white border-gray-300 border border-solid hover:bg-gray-50'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
};
