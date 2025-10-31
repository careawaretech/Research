import React from 'react';

interface Tag {
  label: string;
  color: string;
  icon: string;
}

interface PublicationCardProps {
  title: string;
  authors: string;
  journal: string;
  journalColor: string;
  abstract: string;
  tags: Tag[];
  year: string;
  citations: string;
  citationColor: string;
  badges?: string[];
  isFeatured?: boolean;
}

export const PublicationCard: React.FC<PublicationCardProps> = ({
  title,
  authors,
  journal,
  journalColor,
  abstract,
  tags,
  year,
  citations,
  citationColor,
  badges = [],
  isFeatured = false
}) => {
  return (
    <article className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] w-full mx-auto p-6 rounded-xl max-md:max-w-full max-md:mt-8 max-md:pl-5">
      <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-4 flex-wrap">
        <div className="bg-[rgba(0,0,0,0)] flex flex-col text-sm leading-none grow shrink-0 basis-0 w-fit pr-[21px] pb-[7px] max-md:max-w-full">
          <h3 className="text-gray-900 text-xl font-bold leading-7 self-stretch max-md:max-w-full">
            {title}
          </h3>
          <p className="text-gray-600 font-normal mt-4">
            {authors}
          </p>
          <p className={`font-semibold mt-3.5 ${journalColor}`}>
            {journal}
          </p>
        </div>
        <div className="bg-[rgba(0,0,0,0)] whitespace-nowrap text-center">
          <div className={`bg-[rgba(0,0,0,0)] text-xl font-bold pb-[15px] px-3 max-md:mr-[3px] ${citationColor}`}>
            <div className="z-10">{citations}</div>
          </div>
          <div className="bg-[rgba(0,0,0,0)] text-xs text-gray-600 font-normal pb-[9px] px-px">
            <div className="z-10">Citations</div>
          </div>
        </div>
      </div>
      <p className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch text-sm text-gray-600 font-normal mt-4 pb-2 max-md:max-w-full">
        {abstract}
      </p>
      <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-2 text-xs font-medium flex-wrap mt-4 pr-20 max-md:mr-2.5 max-md:pr-5">
        {tags.map((tag, index) => (
          <span key={index} className={`flex items-stretch gap-1 px-2 py-[3px] rounded-full ${tag.color}`}>
            <img
              src={tag.icon}
              className="aspect-[0.75] object-contain w-3 shrink-0"
              alt=""
            />
            <span>{tag.label}</span>
          </span>
        ))}
      </div>
      <div className="bg-[rgba(0,0,0,0)] flex w-full items-stretch gap-5 flex-wrap justify-between mt-4 max-md:max-w-full max-md:mr-2.5">
        <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-2.5">
          <span className="text-gray-500 text-sm font-normal leading-none grow">
            {year}
          </span>
          {badges.map((badge, index) => (
            <span key={index} className="bg-yellow-100 text-xs text-yellow-800 font-medium text-center pt-0.5 pb-[11px] px-2.5 rounded-full">
              {badge}
            </span>
          ))}
        </div>
        <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-3 text-sm font-medium whitespace-nowrap text-center my-auto">
          <button className="bg-[rgba(0,0,0,0)] text-blue-600 pb-[11px] px-0.5 hover:underline">
            PDF
          </button>
          <button className="bg-[rgba(0,0,0,0)] text-gray-600 pb-2.5 px-px hover:underline">
            Cite
          </button>
        </div>
      </div>
    </article>
  );
};
