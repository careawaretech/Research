import React from 'react';

interface Testimonial {
  id: string;
  name: string;
  title: string;
  organization: string;
  image: string;
  quote: string;
  rating?: number;
  verified: string;
}

const TestimonialsSection = () => {
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Dr. Sarah Mitchell',
      title: 'Chief Medical Officer',
      organization: 'Sunset Manor Memory Care',
      image: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/1fc1f69cacef4baab990dfea030516cef99970c8?placeholderIfAbsent=true',
      quote: '"The impact on our fall detection capabilities has been transformative. We\'ve seen an 89% improvement in our response times, and most importantly, our residents feel safer while maintaining their privacy and dignity."',
      verified: 'Verified Healthcare Professional'
    },
    {
      id: '2',
      name: 'Michael Chen',
      title: 'Director of Operations',
      organization: 'Riverside Healthcare Center',
      image: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/5a9422f99f0fde4d9f32099a12fdaa9c5ddccae8?placeholderIfAbsent=true',
      quote: '"Implementation was seamless, and the ROI has exceeded our expectations. Our staff efficiency has improved by 45%, and we\'ve reduced emergency incidents significantly. The privacy-first approach was exactly what we needed."',
      verified: 'Verified Healthcare Professional'
    },
    {
      id: '3',
      name: 'Jennifer Rodriguez',
      title: 'Head Nurse',
      organization: 'Golden Years Residence',
      image: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/5ea6c0ac1523b034159ab0b642b0f7725be3aff5?placeholderIfAbsent=true',
      quote: '"As a nurse with 20 years of experience, I can say this technology has revolutionized our approach to resident care. The early warning system has prevented numerous emergency situations, and families have peace of mind."',
      verified: 'Verified Healthcare Professional'
    },
    {
      id: '4',
      name: 'Robert Thompson',
      title: 'Family Member',
      organization: 'Son of Maple Grove Resident',
      image: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/72f1c755d2897d8672ce55c2441d527ea71344c0?placeholderIfAbsent=true',
      quote: '"Knowing that my mother is being monitored 24/7 without invasive cameras gives our entire family incredible peace of mind. The technology caught a fall within seconds, and the response was immediate. It\'s truly life-saving."',
      rating: 5,
      verified: 'Verified Family Member'
    },
    {
      id: '5',
      name: 'Dr. James Wilson',
      title: 'CEO',
      organization: 'Heritage Village CCRC',
      image: 'https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/8571a4d0250f715533d40fbc0f7e5a51db777d34?placeholderIfAbsent=true',
      quote: '"The comprehensive data and insights we receive have transformed our quality assurance processes. We can now proactively address potential issues before they become critical, improving outcomes across all levels of care."',
      rating: 5,
      verified: 'Verified Healthcare Executive'
    }
  ];

  const renderStars = (rating?: number) => {
    if (!rating) return null;
    return (
      <div className="flex items-stretch flex-wrap mt-6 pr-20 max-md:pr-5">
        {Array.from({ length: 5 }, (_, i) => (
          <img
            key={i}
            src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/42907094a1c875f0de2243df5637f5a800a9cdbb?placeholderIfAbsent=true"
            className="aspect-[0.75] object-contain w-[18px] shrink-0"
            alt="Star"
          />
        ))}
      </div>
    );
  };

  return (
    <section className="bg-gray-50 w-full py-16 lg:py-20 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center text-center pb-2 px-20 max-md:max-w-full max-md:px-5">
          <div className="flex w-[760px] max-w-full flex-col items-stretch">
            <h2 className="text-gray-900 text-4xl font-bold leading-none self-center max-md:max-w-full">
              What Healthcare Leaders Say
            </h2>
            <p className="text-gray-600 text-xl font-normal leading-7 mt-[21px] max-md:max-w-full">
              Testimonials from administrators, nurses, and families who have experienced the transformative impact of our technology
            </p>
          </div>
        </div>
        <div className="bg-[rgba(0,0,0,0)] mt-[47px] mx-[38px] max-md:max-w-full max-md:mr-2.5 max-md:mt-10">
          <div className="bg-[rgba(0,0,0,0)] p-0.5 max-md:max-w-full">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
              {testimonials.slice(0, 3).map((testimonial) => (
                <div key={testimonial.id} className="w-[33%] max-md:w-full max-md:ml-0">
                  <div className="bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] w-full font-normal mx-auto p-8 rounded-xl max-md:mt-[33px] max-md:px-5">
                    <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-4 pr-[60px] max-md:pr-5">
                      <img
                        src={testimonial.image}
                        className="aspect-[1] object-contain w-16 shrink-0 rounded-full"
                        alt={testimonial.name}
                      />
                      <div className="bg-[rgba(0,0,0,0)] flex flex-col my-auto px-px py-[3px]">
                        <div className="text-gray-900 text-base font-bold">
                          {testimonial.name}
                        </div>
                        <div className="text-gray-600 text-sm leading-none mt-[11px]">
                          {testimonial.title}
                        </div>
                        <div className="text-gray-500 text-xs leading-none self-stretch mt-[9px]">
                          {testimonial.organization}
                        </div>
                      </div>
                    </div>
                    <img
                      src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/7f593aba5467f1bcba8be398368d22e81ffd5c42?placeholderIfAbsent=true"
                      className="aspect-[12.5] object-contain w-[299px] mt-6"
                      alt="Quote decoration"
                    />
                    <blockquote className="bg-[rgba(0,0,0,0)] flex flex-col text-base text-gray-700 mt-4 pr-[23px] py-[5px] max-md:pr-5">
                      <div>{testimonial.quote}</div>
                    </blockquote>
                    <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-2 text-sm text-gray-500 leading-none mt-4">
                      <img
                        src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/77299224ea4c15786582fc6947b3b00464b99cf3?placeholderIfAbsent=true"
                        className="aspect-[0.6] object-contain w-3 shrink-0"
                        alt="Verified"
                      />
                      <div className="grow shrink w-[277px] basis-auto">
                        {testimonial.verified}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[rgba(0,0,0,0)] mt-7 p-0.5 max-md:max-w-full">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
              {testimonials.slice(3, 5).map((testimonial) => (
                <div key={testimonial.id} className="w-6/12 max-md:w-full max-md:ml-0">
                  <div className="bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] w-full mx-auto p-8 rounded-xl max-md:max-w-full max-md:mt-[33px] max-md:px-5">
                    <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-4 font-normal flex-wrap pr-20 max-md:pr-5">
                      <img
                        src={testimonial.image}
                        className="aspect-[1] object-contain w-16 shrink-0 rounded-full"
                        alt={testimonial.name}
                      />
                      <div className="bg-[rgba(0,0,0,0)] flex flex-col my-auto px-px py-0.5">
                        <div className="text-gray-900 text-base font-bold">
                          {testimonial.name}
                        </div>
                        <div className="text-gray-600 text-sm leading-none mt-[9px]">
                          {testimonial.title}
                        </div>
                        <div className="text-gray-500 text-xs leading-none self-stretch mt-[7px]">
                          {testimonial.organization}
                        </div>
                      </div>
                    </div>
                    {renderStars(testimonial.rating)}
                    <blockquote className="bg-[rgba(0,0,0,0)] flex flex-col text-base text-gray-700 font-normal mt-4 pr-12 py-1 max-md:max-w-full max-md:pr-5">
                      <div className="max-md:max-w-full">
                        {testimonial.quote}
                      </div>
                    </blockquote>
                    <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-2 text-sm text-gray-500 font-normal leading-none flex-wrap mt-4">
                      <img
                        src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/d04a64d7fc3a3dd8c2189bbffd858bfd20f4cf17?placeholderIfAbsent=true"
                        className="aspect-[0.6] object-contain w-3 shrink-0"
                        alt="Verified"
                      />
                      <div className="grow shrink w-[474px] basis-auto max-md:max-w-full">
                        {testimonial.verified}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
