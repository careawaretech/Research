import React from 'react';

interface ActionButtonProps {
  type: 'watch' | 'listen' | 'read';
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

const buttonConfig = {
  watch: {
    icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/b2ed10395cff7305a4153657985e25f5566e4514?placeholderIfAbsent=true",
    text: "Watch"
  },
  listen: {
    icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/47500699e32f6a3dfd22b9aee552162c2ac6ae41?placeholderIfAbsent=true",
    text: "Listen"
  },
  read: {
    icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/6f6c1b1dc2d05ea2078d93f5bcd512600dffb1db?placeholderIfAbsent=true",
    text: "Read"
  }
};

export const ActionButton: React.FC<ActionButtonProps> = ({ 
  type, 
  variant = 'secondary',
  onClick 
}) => {
  const config = buttonConfig[type];
  const baseClasses = "flex items-stretch gap-1 px-2 py-1 rounded-full text-xs font-normal whitespace-nowrap text-center";
  const variantClasses = variant === 'primary' 
    ? "bg-[rgba(44,62,80,1)] text-white px-3" 
    : "bg-[rgba(255,255,255,0.2)] text-white";

  return (
    <button 
      onClick={onClick}
      className={`${baseClasses} ${variantClasses}`}
    >
      <img
        src={config.icon}
        className="aspect-[0.56] object-contain w-[9px] shrink-0"
        alt={`${config.text} icon`}
      />
      <span className="pb-[9px]">
        {config.text}
      </span>
    </button>
  );
};
