import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer?: string;
}

const faqItems: FAQItem[] = [
  { question: "How long does the pilot program last?" },
  { question: "What equipment do facilities need to provide?" },
  { question: "Is there any cost to join the pilot program?" },
  { question: "How is our data protected and used?" },
  { question: "When will results be available from the pilot?" },
  { question: "What makes Care Aware Tech different from camera-based systems?" },
  { question: "Can we see a demonstration of the technology?" },
  { question: "What is the current status of NIH funding?" }
];

const FAQ = () => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section className="bg-white flex flex-col items-center justify-center p-20 max-md:max-w-full max-md:px-5">
      <div className="bg-[rgba(0,0,0,0)] w-[896px] max-w-full px-8 max-md:px-5">
        <div className="bg-[rgba(0,0,0,0)] flex flex-col items-stretch font-normal text-center pb-[9px] px-[66px] max-md:max-w-full max-md:px-5">
          <div className="text-gray-900 text-4xl leading-none self-center max-md:max-w-full">
            Frequently Asked Questions
          </div>
          <div className="text-gray-600 text-xl leading-[1.4] mt-[30px] max-md:max-w-full">
            Quick answers to common questions about partnerships and collaboration
          </div>
        </div>
        <div className="bg-[rgba(0,0,0,0)] text-base text-gray-900 font-semibold mt-16 max-md:max-w-full max-md:mt-10">
          {faqItems.map((item, index) => (
            <div key={index} className="bg-gray-50 border border flex w-full flex-col items-stretch justify-center mt-6 first:mt-0 p-px rounded-lg border-solid max-md:max-w-full">
              <button
                className="bg-[rgba(0,0,0,0)] flex items-stretch gap-5 flex-wrap justify-between px-6 py-4 max-md:max-w-full max-md:px-5 text-left hover:bg-gray-100 transition-colors"
                onClick={() => toggleItem(index)}
              >
                <div className={index === 5 ? "max-md:max-w-full" : ""}>
                  {item.question}
                </div>
                <ChevronDown 
                  className={`w-4 h-4 transition-transform ${openItems.has(index) ? 'rotate-180' : ''}`}
                />
              </button>
              {openItems.has(index) && item.answer && (
                <div className="px-6 pb-4 text-gray-600 font-normal">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
