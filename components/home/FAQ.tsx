'use client';

import { useState } from 'react';
import Image from 'next/image';

// FAQ data
const faqData = [
  {
    id: 1,
    question: 'How do I measure my windows for blinds?',
    answer: 'We provide easy-to-follow measuring guides on our website. Just follow the step-by-step instructions to get the perfect fit.',
  },
  {
    id: 2,
    question: 'Can I order free samples before buying?',
    answer: 'Yes! We offer up to 10 free samples delivered to your door at zero cost. This allows you to see and feel the quality before making a purchase.',
  },
  {
    id: 3,
    question: 'How long will delivery take?',
    answer: 'Standard delivery takes 5-7 business days. Express delivery options are also available for faster shipping.',
  },
  {
    id: 4,
    question: 'Do you offer made-to-measure blinds?',
    answer: 'Yes, all our blinds are custom made to your exact measurements, ensuring a perfect fit for your windows.',
  },
];

// FAQ - Frequently asked questions accordion section
const FAQ = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-neutral-50 px-6 lg:px-20 py-16 lg:py-24">
      <div className="max-w-[900px] mx-auto flex flex-col gap-8 lg:gap-10">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl lg:text-[40px] font-medium text-[#3a3a3a] text-center tracking-tight">
          FAQ
        </h2>
        
        {/* FAQ List */}
        <div className="flex flex-col gap-5">
          {faqData.map((faq) => (
            <div
              key={faq.id}
              className="border-b border-[#e1dcd4] pb-5"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full flex gap-4 items-start text-left"
                aria-expanded={openId === faq.id}
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-8 h-8 bg-[#00473c] rounded-full flex items-center justify-center">
                  {openId === faq.id ? (
                    <Image src="/icons/cross.svg" alt="" width={13} height={13} />
                  ) : (
                    <Image src="/icons/plus.svg" alt="" width={19} height={19} />
                  )}
                </div>
                
                {/* Question */}
                <span className="text-base lg:text-lg text-[#00473c] leading-relaxed pt-0.5 font-medium">
                  {faq.question}
                </span>
              </button>
              
              {/* Answer */}
              {openId === faq.id && (
                <div className="mt-4 ml-12">
                  <p className="text-sm lg:text-base text-[#484848] leading-relaxed">
                    {faq.answer}
                  </p>
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
