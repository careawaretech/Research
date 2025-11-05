import React, { useState } from 'react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log('Newsletter subscription:', email);
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <section className="bg-[rgba(44,62,80,1)] flex flex-col items-center justify-center px-20 py-16 max-md:max-w-full max-md:px-5">
      <div className="flex w-[896px] max-w-full flex-col items-center pb-[7px] px-20 max-md:px-5">
        <h2 className="text-white text-3xl font-bold leading-[1.2] text-center max-md:max-w-full">
          Stay Updated with Latest Research
        </h2>
        <p className="text-white text-xl font-normal leading-7 text-center mt-[23px] max-md:max-w-full">
          Get weekly updates on new papers, trending topics, and research insights delivered to your inbox
        </p>
        
        <form onSubmit={handleSubmit} className="flex w-[448px] max-w-full items-stretch gap-4 text-base mt-[41px] max-md:mt-10">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="bg-white flex flex-col text-[rgba(173,174,188,1)] font-normal justify-center grow shrink-0 basis-0 w-fit px-4 py-[17px] rounded-lg max-md:pr-5 outline-none"
          />
          <button
            type="submit"
            disabled={isSubmitted}
            className="bg-[rgba(255,111,97,1)] text-white font-medium whitespace-nowrap text-center pt-[11px] pb-[25px] px-[22px] rounded-lg max-md:px-5 hover:bg-[rgba(255,111,97,0.9)] transition-colors disabled:opacity-50"
          >
            {isSubmitted ? 'Subscribed!' : 'Subscribe'}
          </button>
        </form>
        
        <p className="text-white text-sm font-normal leading-none text-center mt-4">
          Join 12,000+ researchers already subscribed
        </p>
      </div>
    </section>
  );
};
