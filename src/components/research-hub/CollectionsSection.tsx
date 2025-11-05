import React from 'react';

interface CollectionCardProps {
  title: string;
  description: string;
  paperCount: number;
  backgroundImage: string;
  features: string[];
}

const CollectionCard: React.FC<CollectionCardProps> = ({
  title,
  description,
  paperCount,
  backgroundImage,
  features
}) => {
  return (
    <article className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] border border grow overflow-hidden w-full p-px rounded-xl border-solid max-md:mt-[37px]">
      <div className="text-white">
        <div 
          className="bg-[rgba(0,0,0,0.2)] pt-[120px] pb-4 px-4 max-md:pt-[100px]"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="flex flex-col pr-[62px] pb-1.5 max-md:pr-5">
            <h3 className="text-xl font-bold leading-[1.4]">
              {title}
            </h3>
            <p className="text-sm font-normal leading-none mt-5">
              {description}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full text-sm p-6 max-md:px-5">
        <div className="flex items-stretch gap-5 font-medium justify-between">
          <div className="text-gray-600 leading-none">
            {paperCount} Papers
          </div>
          <button className="text-[rgba(26,188,156,1)] text-center pb-2 px-0.5 hover:underline">
            Explore →
          </button>
        </div>
        <div className="text-gray-700 font-normal mt-4">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col pb-[7px] max-md:pr-5 mt-2">
              <div>• {feature}</div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

export const CollectionsSection: React.FC = () => {
  const collections = [
    {
      title: "Healthcare Innovation",
      description: "Latest breakthroughs in medical technology",
      paperCount: 42,
      backgroundImage: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/4dd65a2e889c986fbbad9ce2dc62cbf00aa4cb7b?placeholderIfAbsent=true",
      features: [
        "Contactless monitoring systems",
        "AI-powered diagnostics",
        "Sensor fusion technologies"
      ]
    },
    {
      title: "Elderly Care & Safety",
      description: "Research focused on aging populations",
      paperCount: 28,
      backgroundImage: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/8df256e270578a5e3af89351c13d7bcd5e8c7619?placeholderIfAbsent=true",
      features: [
        "Fall detection systems",
        "Ambient assisted living",
        "Emergency response systems"
      ]
    },
    {
      title: "AI & Machine Learning",
      description: "Cutting-edge AI research and applications",
      paperCount: 35,
      backgroundImage: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/b64bf5dae410b67b68714d99850d0ead464ed164?placeholderIfAbsent=true",
      features: [
        "Deep learning algorithms",
        "Neural network architectures",
        "Machine learning applications"
      ]
    }
  ];

  return (
    <section className="bg-gray-50 pt-16 pb-[39px] px-20 max-md:max-w-full max-md:px-5">
      <div className="w-full px-[17px] max-md:max-w-full">
        <div className="flex flex-col items-center text-center mx-[15px] pb-[11px] px-20 max-md:max-w-full max-md:mr-2.5 max-md:px-5">
          <div className="flex w-[610px] max-w-full flex-col items-stretch">
            <h2 className="text-[rgba(44,62,80,1)] text-3xl font-bold leading-[1.2] self-center max-md:max-w-full">
              Curated Research Collections
            </h2>
            <p className="text-gray-600 text-lg font-normal leading-7 mt-[29px] max-md:max-w-full">
              Expertly curated collections of research papers organized by theme and application area
            </p>
          </div>
        </div>
        
        <div className="mt-[43px] pt-[5px] pb-[25px] px-[15px] max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            {collections.map((collection, index) => (
              <div key={index} className="w-[33%] max-md:w-full max-md:ml-0">
                <CollectionCard {...collection} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
