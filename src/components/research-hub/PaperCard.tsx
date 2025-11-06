import React, { useState } from 'react';
import { ActionButton } from '@/components/research-hub/ActionButton';
import { FileText, Eye, Download } from 'lucide-react';
import { PDFViewerDialog } from '@/components/research-hub/PDFViewerDialog';

interface PaperCardProps {
  title: string;
  description: string;
  author: string;
  year: string;
  views: string;
  comments: string;
  image: string;
  pdfUrl?: string;
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
  pdfUrl,
  badges = [],
  variant = 'standard'
}) => {
  const [pdfDialogOpen, setPdfDialogOpen] = useState(false);
  const isHero = variant === 'hero';
  
  const cardClasses = isHero 
    ? "bg-[rgba(255,255,255,0.1)] border w-full mx-auto pt-[25px] pb-[53px] px-[25px] rounded-xl border-[rgba(255,255,255,0.2)] border-solid relative"
    : "bg-white shadow-lg hover:shadow-xl transition-all border border-gray-200 grow w-full rounded-xl cursor-pointer relative";

  const textColor = isHero ? "text-white" : "text-gray-900";
  const descriptionColor = isHero ? "text-white" : "text-gray-600";
  const metaColor = isHero ? "text-white" : "text-gray-500";

  return (
    <>
      <article className={cardClasses}>
        {/* PDF Icon in top-left */}
        {pdfUrl && (
          <button
            onClick={() => setPdfDialogOpen(true)}
            className="absolute top-4 left-4 z-10 bg-white/90 hover:bg-white p-2 rounded-lg shadow-md transition-all"
            title="View PDF"
          >
            <FileText className="w-5 h-5 text-red-600" />
          </button>
        )}
      <div className="w-full p-6 max-md:pl-5">
        <div className="flex items-center gap-5 text-xs font-medium text-center justify-end">
          <div className="flex items-center gap-2">
            {badges.map((badge, index) => (
              <span
                key={index}
                className={`${badge.bgColor} ${badge.color} py-1 px-2.5 rounded-full font-medium`}
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
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Eye className={`w-4 h-4 ${metaColor}`} />
              <div className={`${metaColor} text-sm font-normal leading-none`}>
                {views}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Download className={`w-4 h-4 ${metaColor}`} />
              <div className={`${metaColor} text-sm font-normal leading-none`}>
                {comments}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
          <ActionButton 
            type="read" 
            variant="primary"
            onClick={pdfUrl ? () => setPdfDialogOpen(true) : undefined}
          />
          <ActionButton type="watch" variant="secondary" />
          <ActionButton type="listen" variant="secondary" />
        </div>
      </div>
    </article>

    {pdfUrl && (
      <PDFViewerDialog
        open={pdfDialogOpen}
        onOpenChange={setPdfDialogOpen}
        pdfUrl={pdfUrl}
        title={title}
        author={author}
        year={year}
      />
    )}
    </>
  );
};
