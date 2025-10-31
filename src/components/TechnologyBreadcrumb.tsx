import React from 'react';

export const TechnologyBreadcrumb: React.FC = () => {
  return (
    <section className="bg-white border-b w-full py-4 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <nav className="flex items-stretch gap-2 flex-wrap text-sm text-blue-600" aria-label="Breadcrumb">
          <div>Home</div>
          <img
            src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/4d64bb14aa1875cb1c7ca63c7fe23601cc61dc9c?placeholderIfAbsent=true"
            className="aspect-[0.5] object-contain w-2 shrink-0"
            alt="breadcrumb separator"
          />
          <div className="flex items-stretch gap-[3px] whitespace-nowrap">
            <div className="grow">Technology</div>
            <img
              src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/83f2c1726e7e73fdaa188046cc897fc463e2985a?placeholderIfAbsent=true"
              className="aspect-[0.44] object-contain w-[7px] shrink-0"
              alt="dropdown indicator"
            />
          </div>
          <div className="text-gray-700 grow shrink w-[1059px] max-md:max-w-full">
            Radar & WiFi Signal Analysis
          </div>
        </nav>
      </div>
    </section>
  );
};
