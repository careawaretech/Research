import React from 'react';
import { ActionButton } from '@/components/research-hub/ActionButton';

interface PaperCardProps {
  title: string;
  description: string;
  author: string;
  year: string;
  views: string;
  comments: string;
  image: string;
  badges?: Array<{
    text: string;
    color: string;
    bgColor: string;
  }>;
  variant?: 'hero' | 'standard';
}

export const PaperCard: React.FC<PaperCardProps> = ({
  title,
  description,
  author,
  year,
  views,
  comments,
  image,
  badges = [],
  variant = 'standard'
}) => {
  const isHero = variant === 'hero';
  
  const cardClasses = isHero 
    ? "bg-[rgba(255,255,255,0.1)] border w-full mx-auto pt-[25px] pb-[53px] px-[25px] rounded-xl border-[rgba(255,255,255,0.2)] border-solid"
    : "bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] border border grow w-full pt-px pb-[21px] px-px rounded-xl border-solid";

  const textColor = isHero ? "text-white" : "text-gray-900";
  const descriptionColor = isHero ? "text-white" : "text-gray-600";
  const metaColor = isHero ? "text-white" : "text-gray-500";

  return (
    <article className={cardClasses}>
      <div className="w-full p-6 max-md:pl-5">
        <div className="flex items-stretch gap-5 text-xs font-medium text-center justify-between">
          <img
            src={image}
            className="aspect-[1] object-contain w-12 shrink-0 rounded-lg"
            alt="Paper thumbnail"
          />
          <div className="flex items-stretch gap-2">
            {badges.map((badge, index) => (
              <span
                key={index}
                className={`${badge.bgColor} ${badge.color} pt-0.5 pb-[13px] px-2.5 rounded-full`}
              >
                {badge.text}
              </span>
            ))}
          </div>
        </div>
        
        <h3 className={`${textColor} text-xl font-bold leading-7 mt-4`}>
          {title}
        </h3>
        
        <p className={`${descriptionColor} text-sm font-normal leading-5 mt-3`}>
          {description}
        </p>
        
        <div className="flex w-full items-stretch gap-5 justify-between mt-4">
          <div className={`${metaColor} text-sm font-normal leading-none`}>
            {author} • {year}
          </div>
          <div className="flex items-stretch gap-[11px] px-px py-0.5">
            <div className="flex items-stretch gap-1">
              <div className="flex min-h-3 items-center overflow-hidden justify-center mt-1">
                <img
                  src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/ff35d4f7b164bbdad7f0c933070ab1ba6eb8867e?placeholderIfAbsent=true"
                  className="aspect-[1.08] object-contain w-[13px] self-stretch my-auto"
                  alt="Views icon"
                />
              </div>
              <div className={`${metaColor} text-sm font-normal leading-none`}>
                {views}
              </div>
            </div>
            <div className="flex items-stretch gap-1">
              <div className="flex min-h-3 items-center overflow-hidden justify-center mt-1">
                <img
                  src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/4007aaca60cf13d1d953522abdf7141d1a3bc3ff?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-3 self-stretch my-auto"
                  alt="Comments icon"
                />
              </div>
              <div className={`${metaColor} text-sm font-normal leading-none`}>
                {comments}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 mt-4 pt-[17px]">
          <ActionButton type="read" variant={isHero ? 'secondary' : 'primary'} />
          <ActionButton type="watch" variant="secondary" />
          <ActionButton type="listen" variant="secondary" />
        </div>
      </div>
    </article>
  );
};
