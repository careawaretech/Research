import React, { useState } from 'react';

interface FilterOption {
  id: string;
  label: string;
  count: number;
  checked: boolean;
}

const FilterSection = () => {
  const [facilityTypes, setFacilityTypes] = useState<FilterOption[]>([
    { id: 'assisted-living', label: 'Assisted Living', count: 23, checked: false },
    { id: 'memory-care', label: 'Memory Care', count: 18, checked: true },
    { id: 'skilled-nursing', label: 'Skilled Nursing', count: 31, checked: false },
    { id: 'independent-living', label: 'Independent Living', count: 12, checked: false },
  ]);

  const [technologyFocus, setTechnologyFocus] = useState<FilterOption[]>([
    { id: 'fall-detection', label: 'Fall Detection', count: 42, checked: true },
    { id: 'vital-signs', label: 'Vital Signs Monitoring', count: 38, checked: false },
    { id: 'sleep-pattern', label: 'Sleep Pattern Analysis', count: 29, checked: false },
  ]);

  const [studyPhase, setStudyPhase] = useState<FilterOption[]>([
    { id: 'pilot', label: 'Pilot Program', count: 15, checked: false },
    { id: 'full-deployment', label: 'Full Deployment', count: 28, checked: true },
    { id: 'long-term', label: 'Long-term Study', count: 19, checked: false },
  ]);

  const [outcomesFocus, setOutcomesFocus] = useState<FilterOption[]>([
    { id: 'response-time', label: 'Response Time', count: 34, checked: false },
    { id: 'cost-reduction', label: 'Cost Reduction', count: 25, checked: false },
    { id: 'staff-efficiency', label: 'Staff Efficiency', count: 31, checked: false },
  ]);

  const [activeFilters, setActiveFilters] = useState([
    'Memory Care',
    'Fall Detection',
    'Full Deployment'
  ]);

  const handleFilterChange = (
    filterId: string,
    filterType: 'facility' | 'technology' | 'study' | 'outcomes'
  ) => {
    const updateFilter = (filters: FilterOption[]) =>
      filters.map(filter =>
        filter.id === filterId ? { ...filter, checked: !filter.checked } : filter
      );

    switch (filterType) {
      case 'facility':
        setFacilityTypes(updateFilter);
        break;
      case 'technology':
        setTechnologyFocus(updateFilter);
        break;
      case 'study':
        setStudyPhase(updateFilter);
        break;
      case 'outcomes':
        setOutcomesFocus(updateFilter);
        break;
    }
  };

  const removeFilter = (filterName: string) => {
    setActiveFilters(prev => prev.filter(filter => filter !== filterName));
  };

  const FilterGroup = ({ 
    title, 
    options, 
    filterType 
  }: { 
    title: string; 
    options: FilterOption[]; 
    filterType: 'facility' | 'technology' | 'study' | 'outcomes';
  }) => (
    <div className="bg-[rgba(0,0,0,0)] border border w-full p-px rounded-lg border-solid max-md:max-w-full">
      <button className="bg-[rgba(0,0,0,0)] flex items-stretch gap-5 text-base text-gray-900 font-medium flex-wrap justify-between px-4 py-[17px] max-md:max-w-full w-full">
        <div>{title}</div>
        <img
          src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/cc8c08be2124b01dc2fd7143206c429cf0a8bd40?placeholderIfAbsent=true"
          className="aspect-[0.7] object-contain w-3.5 shrink-0"
          alt="Expand"
        />
      </button>
      <div className="bg-[rgba(0,0,0,0)] w-full font-normal px-4 py-[17px] max-md:max-w-full">
        {options.map((option, index) => (
          <div key={option.id} className={`flex items-stretch gap-3 flex-wrap ${index > 0 ? 'mt-3' : ''}`}>
            <label className="bg-[rgba(0,0,0,0)] flex items-stretch gap-[40px_100px] flex-1 grow shrink basis-auto pb-1.5 cursor-pointer">
              <div className="flex items-stretch gap-3 text-base text-gray-700">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={option.checked}
                    onChange={() => handleFilterChange(option.id, filterType)}
                    className="sr-only"
                  />
                  <div className={`w-[13px] h-[13px] mt-[5px] rounded-[1px] border border-black border-solid flex items-center justify-center ${
                    option.checked ? 'bg-blue-600' : 'bg-white'
                  }`}>
                    {option.checked && (
                      <img
                        src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/4629f9f81b3f72b7d934a290d65ab1f75637391a?placeholderIfAbsent=true"
                        className="aspect-[1.12] object-contain w-[18px] shrink-0 rounded-[1px]"
                        alt="Checked"
                      />
                    )}
                  </div>
                </div>
                <div className="basis-auto">{option.label}</div>
              </div>
              <div className="text-gray-500 text-sm leading-none">
                ({option.count})
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="bg-white border-gray-100 w-full py-16 lg:py-20 px-6 lg:px-8 border-b">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[rgba(0,0,0,0)] flex w-full flex-col items-stretch max-md:max-w-full">
          <h2 className="text-gray-900 text-3xl font-bold leading-[1.2]">
            Filter Case Studies
          </h2>
          <div className="bg-[rgba(0,0,0,0)] mt-11 max-md:max-w-full max-md:mt-10">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
              <div className="w-6/12 max-md:w-full max-md:ml-0">
                <div className="bg-[rgba(0,0,0,0)] grow w-full pb-[168px] max-md:max-w-full max-md:mt-8 max-md:pb-[100px]">
                  <FilterGroup 
                    title="Facility Type" 
                    options={facilityTypes} 
                    filterType="facility"
                  />
                  <div className="mt-6">
                    <FilterGroup 
                      title="Technology Focus" 
                      options={technologyFocus} 
                      filterType="technology"
                    />
                  </div>
                </div>
              </div>
              <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
                <div className="bg-[rgba(0,0,0,0)] grow w-full max-md:max-w-full max-md:mt-8">
                  <FilterGroup 
                    title="Study Phase" 
                    options={studyPhase} 
                    filterType="study"
                  />
                  <div className="mt-6">
                    <FilterGroup 
                      title="Outcomes Focus" 
                      options={outcomesFocus} 
                      filterType="outcomes"
                    />
                  </div>
                  <div className="bg-sky-50 flex w-full flex-col items-stretch text-base mt-6 p-6 rounded-lg max-md:max-w-full max-md:px-5">
                    <h3 className="bg-[rgba(0,0,0,0)] flex flex-col text-gray-900 font-bold pt-px pb-2.5 max-md:max-w-full max-md:pr-5">
                      <div>Research Publications</div>
                    </h3>
                    <p className="bg-[rgba(0,0,0,0)] flex flex-col text-sm text-gray-600 font-normal justify-center mt-3 py-1 max-md:max-w-full max-md:pr-5">
                      <div>Access peer-reviewed studies and clinical validation reports.</div>
                    </p>
                    <button className="bg-[rgba(0,0,0,0)] flex items-stretch gap-2 text-sky-600 font-medium mt-4">
                      <img
                        src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/207d6639adfb75ee85cb8316d0a9329c6cd90e7e?placeholderIfAbsent=true"
                        className="aspect-[0.67] object-contain w-4 shrink-0"
                        alt="View"
                      />
                      <div className="basis-auto">View Publications</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-2 text-sm font-medium flex-wrap mt-8 pr-20 max-md:pr-5">
          {activeFilters.map((filter) => (
            <span key={filter} className={`flex items-stretch gap-2.5 px-3 py-2 rounded-lg ${
              filter === 'Memory Care' ? 'bg-sky-100 text-sky-800' :
              filter === 'Fall Detection' ? 'bg-green-100 text-green-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              <div>{filter}</div>
              <button onClick={() => removeFilter(filter)}>
                <img
                  src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/f94d5389663ff8f3b4175fecf430693688f76aad?placeholderIfAbsent=true"
                  className="aspect-[0.45] object-contain w-[9px] shrink-0"
                  alt="Remove"
                />
              </button>
            </span>
          ))}
        </div>
        <div className="bg-[rgba(0,0,0,0)] flex flex-col text-sm text-gray-500 font-normal justify-center mt-6 py-[3px] max-md:max-w-full max-md:pr-5">
          <div>Showing 24 of 84 case studies</div>
        </div>
      </div>
    </section>
  );
};

export default FilterSection;
