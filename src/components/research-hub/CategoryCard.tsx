import React from 'react';
import * as LucideIcons from 'lucide-react';
import { ActionButton } from '@/components/research-hub/ActionButton';

interface CategoryCardProps {
  title: string;
  description: string;
  paperCount: number;
  icon?: string;
  iconType: 'upload' | 'lucide';
  lucideIconName?: string;
  color: string;
  textColor?: string;
  borderColor?: string;
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
  textColor,
  borderColor,
  bgGradient
}) => {
  const renderIcon = () => {
    if (iconType === 'lucide' && lucideIconName) {
      const IconComponent = LucideIcons[lucideIconName as keyof typeof LucideIcons] as React.ComponentType<any>;
      if (IconComponent) {
        return <IconComponent className="w-16 h-16 rounded-xl" style={{ color: textColor || '#ffffff' }} />;
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

  // Use gradient if provided, otherwise use solid color
  const backgroundStyle = bgGradient || color;

  return (
    <article 
      className="flex w-full flex-col items-stretch p-6 rounded-xl max-md:mt-6 max-md:px-5 cursor-pointer hover:scale-105 transition-transform border-2"
      style={{ 
        background: backgroundStyle,
        color: textColor || '#ffffff',
        borderColor: borderColor || 'transparent'
      }}
    >
      {renderIcon()}
      <h3 className="text-xl font-bold leading-[1.4] mt-4">
        {title}
      </h3>
      <p className="text-sm font-normal leading-5 mt-4" style={{ color: textColor || '#ffffff' }}>
        {description}
      </p>
      <div className="flex items-stretch gap-5 justify-between mt-[25px]">
        <div className="text-sm font-medium leading-none cursor-pointer hover:underline">
          View Papers →
        </div>
        <span 
          className="text-xs font-normal whitespace-nowrap text-center pt-0.5 pb-[13px] px-[9px] rounded-full"
          style={{ 
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: textColor || '#ffffff'
          }}
        >
          {paperCount}
        </span>
      </div>
      <div className="flex gap-2 mt-4 pt-4" style={{ borderTop: `1px solid ${textColor ? `${textColor}33` : 'rgba(255,255,255,0.2)'}` }}>
        <ActionButton type="read" variant="secondary" />
        <ActionButton type="watch" variant="secondary" />
        <ActionButton type="listen" variant="secondary" />
      </div>
    </article>
  );
};
