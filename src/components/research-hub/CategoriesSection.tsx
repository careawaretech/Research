import React from 'react';
import { CategoryCard } from '@/components/research-hub/CategoryCard';

export const CategoriesSection: React.FC = () => {
  const categories = [
    {
      title: "AI & Machine Learning",
      description: "147 papers covering deep learning, neural networks, and AI applications in various domains",
      paperCount: 147,
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/4dd65a2e889c986fbbad9ce2dc62cbf00aa4cb7b?placeholderIfAbsent=true",
      color: "text-purple-100",
      bgGradient: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)"
    },
    {
      title: "Healthcare Technology",
      description: "89 papers on medical devices, patient monitoring, and healthcare innovation",
      paperCount: 89,
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/8df256e270578a5e3af89351c13d7bcd5e8c7619?placeholderIfAbsent=true",
      color: "text-green-100",
      bgGradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)"
    },
    {
      title: "Cybersecurity",
      description: "73 papers on privacy, security protocols, and threat detection systems",
      paperCount: 73,
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/b64bf5dae410b67b68714d99850d0ead464ed164?placeholderIfAbsent=true",
      color: "text-red-100",
      bgGradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
    },
    {
      title: "Sustainability",
      description: "56 papers on environmental technology, renewable energy, and green computing",
      paperCount: 56,
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/481d944b3d9b426c1b19a51717e6e82d59896920?placeholderIfAbsent=true",
      color: "text-green-100",
      bgGradient: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"
    },
    {
      title: "Space Technology",
      description: "42 papers on aerospace engineering, satellite systems, and space exploration",
      paperCount: 42,
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/2852f8545fbe5a08dfddd8dc5c8210b3bc187133?placeholderIfAbsent=true",
      color: "text-indigo-100",
      bgGradient: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)"
    },
    {
      title: "Biotechnology",
      description: "38 papers on genetic engineering, biomedical research, and life sciences",
      paperCount: 38,
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/763236cbb38b42c9119c8b50833f9eb05109a9f7?placeholderIfAbsent=true",
      color: "text-pink-100",
      bgGradient: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)"
    },
    {
      title: "Robotics",
      description: "61 papers on autonomous systems, human-robot interaction, and robotics applications",
      paperCount: 61,
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/a9aee84e19962c553ef81f2c19bcfc09fde5db6e?placeholderIfAbsent=true",
      color: "text-orange-100",
      bgGradient: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)"
    },
    {
      title: "Quantum Computing",
      description: "29 papers on quantum algorithms, quantum cryptography, and quantum systems",
      paperCount: 29,
      icon: "https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/0eb291224e333b2ef1b20db1c92f1cd364a48224?placeholderIfAbsent=true",
      color: "text-blue-100",
      bgGradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
    }
  ];

  return (
    <section className="bg-white flex flex-col items-stretch justify-center px-20 py-16 max-md:max-w-full max-md:px-5">
      <div className="px-8 max-md:max-w-full max-md:px-5">
        <div className="flex flex-col items-center text-center pb-2.5 px-20 max-md:max-w-full max-md:px-5">
          <div className="flex w-[524px] max-w-full flex-col items-stretch">
            <h2 className="text-[rgba(44,62,80,1)] text-3xl font-bold leading-[1.2] self-center max-md:max-w-full">
              Browse by Research Category
            </h2>
            <p className="text-gray-600 text-lg font-normal leading-loose mt-[23px] max-md:max-w-full">
              Explore papers organized by field of study and research focus
            </p>
          </div>
        </div>
        
        <div className="w-full mt-12 max-md:max-w-full max-md:mt-10">
          <div className="max-md:max-w-full">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
              {categories.slice(0, 4).map((category, index) => (
                <div key={index} className="w-3/12 max-md:w-full max-md:ml-0">
                  <CategoryCard {...category} />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 max-md:max-w-full">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
              {categories.slice(4, 8).map((category, index) => (
                <div key={index} className="w-3/12 max-md:w-full max-md:ml-0">
                  <CategoryCard {...category} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
