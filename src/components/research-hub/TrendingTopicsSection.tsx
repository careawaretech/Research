import React from 'react';

interface TrendingTopicProps {
  rank: number;
  title: string;
  paperCount: number;
  growth: string;
  icon: string;
  color: string;
  borderColor: string;
}

const TrendingTopicCard: React.FC<TrendingTopicProps> = ({
  rank,
  title,
  paperCount,
  growth,
  icon,
  color,
  borderColor
}) => {
  return (
    <article className={`border flex w-full flex-col items-stretch p-[25px] rounded-xl ${borderColor} border-solid max-md:mt-6 max-md:px-5`}>
      <div className="flex items-stretch gap-5 text-sm font-bold whitespace-nowrap leading-none justify-between">
        <img
          src={icon}
          className="aspect-[1] object-contain w-12 shrink-0 rounded-lg"
          alt={`${title} icon`}
        />
        <div className={`my-auto ${color}`}>
          #{rank}
        </div>
      </div>
      <h3 className="text-gray-900 text-base font-bold mt-4">
        {title}
      </h3>
      <p className="text-gray-600 text-sm font-normal leading-none mt-4">
        {paperCount} new papers this month
      </p>
      <div className="flex w-full items-stretch gap-1 mt-[19px] py-0.5">
        <div className="flex min-h-3 items-center overflow-hidden justify-center mt-1">
          <img
            src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/26d622b26db4b5684c961aa97227ba769892735a?placeholderIfAbsent=true"
            className="aspect-[0.75] object-contain w-[9px] self-stretch my-auto"
            alt="Growth icon"
          />
        </div>
        <div className="text-gray-500 text-sm font-normal leading-none grow shrink w-[221px]">
          {growth} from last month
        </div>
      </div>
    </article>
  );
};

export const TrendingTopicsSection: React.FC = () => {
  const trendingTopics = [
    {
      rank: 1,
      title: "Contactless Health Monitoring",
      paperCount: 127,
      growth: "+23%",
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/45e4af670a8cc0ec18cbe483b141e030cc1be17d?placeholderIfAbsent=true",
      color: "text-[rgba(255,111,97,1)]",
      borderColor: "border-[rgba(255,111,97,0.2)]"
    },
    {
      rank: 2,
      title: "AI in Healthcare",
      paperCount: 89,
      growth: "+18%",
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/b837ac0503e84e1be0630abf5d3da2f27d0d6d4b?placeholderIfAbsent=true",
      color: "text-[rgba(26,188,156,1)]",
      borderColor: "border-[rgba(26,188,156,0.2)]"
    },
    {
      rank: 3,
      title: "Privacy-Preserving Tech",
      paperCount: 64,
      growth: "+15%",
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/147590c7852ffb6350499decbb5b6218074c9153?placeholderIfAbsent=true",
      color: "text-purple-500",
      borderColor: "border-[rgba(168,85,247,0.2)]"
    },
    {
      rank: 4,
      title: "Elderly Care Solutions",
      paperCount: 52,
      growth: "+12%",
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/d99a8b2c0d4041f8690c15a5d994a3760d319374?placeholderIfAbsent=true",
      color: "text-orange-500",
      borderColor: "border-[rgba(249,115,22,0.2)]"
    }
  ];

  return (
    <section className="bg-white flex flex-col items-stretch justify-center px-20 py-16 max-md:max-w-full max-md:px-5">
      <div className="w-full px-8 max-md:max-w-full max-md:px-5">
        <div className="flex flex-col items-center text-center pb-2.5 px-20 max-md:max-w-full max-md:px-5">
          <div className="flex w-[455px] max-w-full flex-col items-stretch">
            <h2 className="text-[rgba(44,62,80,1)] text-3xl font-bold leading-[1.2] self-center">
              Trending Research Topics
            </h2>
            <p className="text-gray-600 text-lg font-normal leading-loose mt-[22px] max-md:max-w-full">
              Discover what researchers are focusing on this month
            </p>
          </div>
        </div>
        
        <div className="mt-12 max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            {trendingTopics.map((topic, index) => (
              <div key={index} className="w-3/12 max-md:w-full max-md:ml-0">
                <TrendingTopicCard {...topic} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
