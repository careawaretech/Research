import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  variant?: 'blue' | 'green' | 'purple';
  badge?: {
    text: string;
    color: 'green' | 'yellow' | 'gray';
  };
  iconOnly?: boolean;
  horizontal?: boolean;
}

const FeatureCard = ({ icon: Icon, title, description, variant = 'blue', badge, iconOnly = false, horizontal = false }: FeatureCardProps) => {
  const variantStyles = {
    blue: {
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    green: {
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    purple: {
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
  };

  const badgeStyles = {
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    gray: 'bg-gray-100 text-gray-800',
  };

  if (horizontal) {
    return (
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-lg ${variantStyles[variant].iconBg} flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-6 h-6 ${variantStyles[variant].iconColor}`} />
        </div>
        <div className="flex-1">
          <h4 className="text-gray-900 font-semibold text-base">{title}</h4>
          {description && <p className="text-gray-600 text-sm leading-6 mt-2">{description}</p>}
        </div>
      </div>
    );
  }

  if (iconOnly) {
    return (
      <Card className="hover:shadow-md transition-shadow min-h-[128px] flex flex-col">
        <CardContent className="p-6 flex flex-col items-center justify-center flex-1">
          <div className={`w-12 h-12 rounded-lg ${variantStyles[variant].iconBg} flex items-center justify-center flex-shrink-0 mb-3`}>
            <Icon className={`w-6 h-6 ${variantStyles[variant].iconColor}`} />
          </div>
          <h4 className="text-gray-900 font-semibold text-base leading-tight text-center">{title}</h4>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-md transition-shadow min-h-[128px] flex flex-col">
      <CardContent className="p-6 flex flex-col gap-3 flex-1">
        <div className={`w-12 h-12 rounded-lg ${variantStyles[variant].iconBg} flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-6 h-6 ${variantStyles[variant].iconColor}`} />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h4 className="text-gray-900 font-semibold text-base leading-tight">{title}</h4>
            {description && <p className="text-gray-600 text-sm mt-2 leading-relaxed">{description}</p>}
          </div>
          {badge && (
            <div className="mt-3">
              <span className={`${badgeStyles[badge.color]} px-3 py-1 rounded-full text-xs font-medium`}>
                {badge.text}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
