import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center gap-2 px-20 py-4 text-sm max-md:px-5">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="text-gray-400">/</span>}
          {item.isActive ? (
            <span className="text-gray-900 font-medium">{item.label}</span>
          ) : (
            <Link to={item.href || '/'} className="text-gray-600 hover:text-gray-900 transition-colors">
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
