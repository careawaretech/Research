import React from 'react';
import * as LucideIcons from 'lucide-react';

interface CategoryCardProps {
  title: string;
  description: string;
  paperCount: number;
  icon?: string;
  iconType: 'upload' | 'lucide';
  lucideIconName?: string;
  color: string;
  bgGradient: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  paperCount,
  icon,
  iconType,
  lucideIconName,
  color,
  bgGradient
}) => {
  const renderIcon = () => {
    if (iconType === 'lucide' && lucideIconName) {
      const IconComponent = LucideIcons[lucideIconName as keyof typeof LucideIcons] as React.ComponentType<any>;
      if (IconComponent) {
        return <IconComponent className="w-16 h-16 rounded-xl" />;
      }
    }
    if (icon) {
      return (
        <img
          src={icon}
          className="aspect-[1] object-contain w-16 rounded-xl"
          alt={`${title} icon`}
        />
      );
    }
    return null;
  };

  return (
    <article 
      className="flex w-full flex-col items-stretch text-white p-6 rounded-xl max-md:mt-6 max-md:px-5 cursor-pointer hover:scale-105 transition-transform"
      style={{ background: bgGradient }}
    >
      {renderIcon()}
      <h3 className="text-xl font-bold leading-[1.4] mt-4">
        {title}
      </h3>
      <p className={`${color} text-sm font-normal leading-5 mt-4`}>
        {description}
      </p>
      <div className="flex items-stretch gap-5 justify-between mt-[25px]">
        <div className="text-sm font-medium leading-none cursor-pointer hover:underline">
          View Papers →
        </div>
        <span className="bg-[rgba(255,255,255,0.2)] text-xs font-normal whitespace-nowrap text-center pt-0.5 pb-[13px] px-[9px] rounded-full">
          {paperCount}
        </span>
      </div>
    </article>
  );
};
