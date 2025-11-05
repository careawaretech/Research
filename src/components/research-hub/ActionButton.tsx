import React from 'react';
import { BookOpen, Play, Headphones } from 'lucide-react';

interface ActionButtonProps {
  type: 'watch' | 'listen' | 'read';
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

const buttonConfig = {
  watch: {
    Icon: Play,
    text: "Watch"
  },
  listen: {
    Icon: Headphones,
    text: "Listen"
  },
  read: {
    Icon: BookOpen,
    text: "Read"
  }
};

export const ActionButton: React.FC<ActionButtonProps> = ({ 
  type, 
  variant = 'primary',
  onClick 
}) => {
  const { Icon, text } = buttonConfig[type];
  const baseClasses = "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors";
  const variantClasses = variant === 'primary' 
    ? "bg-[#2C3E50] text-white hover:bg-[#2C3E50]/80" 
    : "bg-gray-100 text-gray-700 hover:bg-gray-200";

  return (
    <button 
      onClick={onClick}
      className={`${baseClasses} ${variantClasses}`}
    >
      <Icon className="w-3.5 h-3.5" />
      <span>{text}</span>
    </button>
  );
};
