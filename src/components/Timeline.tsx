import React from 'react';

const Timeline = () => {
  const timelineEvents = [
    {
      year: "2022",
      color: "bg-blue-600",
      title: "Company Founded",
      description: "Dr. Sarah Chen and Marcus Rodriguez establish Care Aware Tech with a vision for privacy-first elderly care solutions.",
      side: "right"
    },
    {
      year: "2023",
      color: "bg-emerald-600",
      title: "Seed Funding",
      description: "Secured $2.5M in seed funding from healthcare-focused VCs and angel investors committed to ethical technology.",
      side: "left"
    },
    {
      year: "2024",
      color: "bg-violet-600",
      title: "First Pilot Program",
      description: "Launched pilot programs with 5 senior living facilities to test our privacy-first monitoring solutions.",
      side: "right"
    },
    {
      year: "2025",
      color: "bg-orange-600",
      title: "Platform Launch",
      description: "Official launch of our comprehensive care platform, serving 50+ facilities and 10,000+ seniors nationwide.",
      side: "left"
    }
  ];

  return (
    <section id="timeline" className="bg-gray-50 flex flex-col items-stretch justify-center px-20 py-[68px] max-md:max-w-full max-md:px-5">
      <div className="bg-[rgba(0,0,0,0)] px-[9px] max-md:max-w-full">
        <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center font-normal text-center mx-[15px] pb-2 px-20 max-md:max-w-full max-md:mr-2.5 max-md:px-5">
          <div className="flex w-[727px] max-w-full flex-col items-stretch">
            <h2 className="text-slate-800 text-4xl leading-none self-center">Our Journey</h2>
            <p className="text-gray-700 text-xl leading-7 mt-[33px] max-md:max-w-full">
              From initial concept to transformative solutions, here's how we're building the future of elderly care technology.
            </p>
          </div>
        </div>
        <div className="bg-[rgba(0,0,0,0)] mt-[59px] max-md:max-w-full max-md:mt-10">
          <div className="bg-[rgba(0,0,0,0)] w-full max-md:max-w-full">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-600 h-full max-md:hidden"></div>
              
              {timelineEvents.map((event, index) => (
                <div key={index} className={`flex items-center mb-16 max-md:flex-col max-md:text-center ${event.side === 'left' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-1/2 ${event.side === 'left' ? 'pl-8' : 'pr-8'} max-md:w-full max-md:px-4`}>
                    <div className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] p-6 rounded-xl">
                      <h3 className="text-xl text-slate-800 font-semibold mb-4">{event.title}</h3>
                      <p className="text-base text-gray-700">{event.description}</p>
                    </div>
                  </div>
                  
                  {/* Year badge */}
                  <div className={`${event.color} flex flex-col items-stretch text-sm text-white font-bold whitespace-nowrap justify-center py-3 px-4 rounded-full z-10 max-md:my-4`}>
                    {event.year}
                  </div>
                  
                  <div className="w-1/2 max-md:hidden"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
