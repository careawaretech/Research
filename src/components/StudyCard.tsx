import React from 'react';
import { Users, Calendar, Award, FileText, ExternalLink } from 'lucide-react';

interface StudyCardProps {
  title: string;
  description: string;
  participants: string;
  duration: string;
  status: string;
  statusColor: string;
  metrics: Array<{
    value: string;
    label: string;
    color: string;
  }>;
  findings: string[];
  publication: string;
  icon: React.ReactNode;
}

const StudyCard: React.FC<StudyCardProps> = ({
  title,
  description,
  participants,
  duration,
  status,
  statusColor,
  metrics,
  findings,
  publication,
  icon
}) => {
  return (
    <article className="bg-white shadow-[0px_8px_10px_rgba(0,0,0,0.1)] w-full mx-auto px-8 py-7 rounded-2xl max-md:max-w-full max-md:mt-10 max-md:px-5">
      <div className="flex gap-4 font-normal flex-wrap max-md:mr-0.5">
        <div className="flex flex-col grow shrink-0 basis-0 w-fit mt-[9px] max-md:max-w-full">
          <h3 className="text-gray-900 text-2xl font-bold leading-none">{title}</h3>
          <p className="text-gray-600 text-base mt-[17px]">{description}</p>
          <div className="self-stretch flex items-stretch gap-4 text-sm mt-[25px] pr-[79px] max-md:pr-5">
            <span className="bg-blue-100 flex items-stretch gap-1 text-blue-800 px-2 py-[5px] rounded-full">
              <Users className="w-[18px] h-[18px] mt-1" />
              {participants}
            </span>
            <span className="bg-green-100 flex items-stretch gap-1 text-green-800 px-2 py-[5px] rounded-full">
              <Calendar className="w-3 h-3 mt-1" />
              {duration}
            </span>
            <span className={`${statusColor} flex items-stretch gap-1 px-2 py-[5px] rounded-full text-xs font-medium`}>
              <Award className="w-3.5 h-3.5 mt-1" />
              {status}
            </span>
          </div>
        </div>
        <div className="flex-shrink-0">
          {icon}
        </div>
      </div>
      
      <div className="w-full mt-6 max-md:max-w-full">
        <div className="flex items-stretch gap-4 text-center flex-wrap max-md:mr-0.5">
          {metrics.map((metric, index) => (
            <div key={index} className={`${metric.color} flex-1 grow shrink-0 basis-0 w-fit p-4 rounded-lg`}>
              <div className="text-3xl font-bold pb-[19px] px-[68px] max-md:px-5">
                <div className="z-10 -mt-1.5">{metric.value}</div>
              </div>
              <div className="flex flex-col items-center text-sm font-normal pb-2 px-[70px] max-md:px-5">
                <div className="z-10">{metric.label}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col items-stretch text-base mt-6 p-6 rounded-lg max-md:max-w-full max-md:mr-0.5 max-md:px-5">
          <h4 className="text-gray-900 font-semibold">Key Findings</h4>
          <ul className="text-gray-700 font-normal mt-6 max-md:max-w-full">
            {findings.map((finding, index) => (
              <li key={index} className="pb-[13px] max-md:max-w-full max-md:pr-5">
                <div className="z-10 max-md:max-w-full">• {finding}</div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex w-full items-stretch gap-5 text-sm flex-wrap justify-between mt-6 pt-[17px] max-md:max-w-full">
          <div className="text-gray-600 font-normal leading-none">{publication}</div>
          <div className="flex items-stretch gap-2 font-medium text-center">
            <button className="text-blue-600 pb-[11px] px-0.5 hover:text-blue-800 transition-colors flex items-center gap-1">
              <FileText className="w-4 h-4" />
              PDF
            </button>
            <button className="text-gray-600 pb-2.5 px-px hover:text-gray-800 transition-colors flex items-center gap-1">
              <ExternalLink className="w-4 h-4" />
              Cite
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default StudyCard;
