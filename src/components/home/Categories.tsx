'use client';

import { useRef } from 'react';
import Image from 'next/image';

const categories = [
  { id: 1, name: 'Honeycomb Black Blinds', image: '/home/categories/honeycomb-blinds.jpg' },
  { id: 2, name: 'No Drill Blinds', image: '/home/categories/no-drill-blinds.jpg' },
  { id: 3, name: 'Roller Blinds', image: '/home/categories/roller-blinds.jpg' },
  { id: 4, name: 'Vertical Blinds', image: '/home/categories/vertical-blinds.jpg' },
  { id: 5, name: 'Wooden Blinds', image: '/home/categories/wooden-blinds.jpg' },
];

const Categories = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -354 : 354,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="bg-white py-12 md:py-16 lg:py-24 overflow-hidden">
      <div className="flex flex-col gap-8 md:gap-[41px] items-center">
        <div className="w-full flex items-center justify-between px-4 md:px-6 lg:px-20">
          <h2 className="text-xl md:text-2xl lg:text-[32px] font-medium text-[#3a3a3a] tracking-tight">
            Popular Categories
          </h2>
          <div className="hidden lg:flex gap-3">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="w-10 h-10 rounded-full border border-[#3a3a3a] flex items-center justify-center hover:bg-[#00473c] hover:border-[#00473c] hover:text-white transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="w-10 h-10 rounded-full border border-[#3a3a3a] flex items-center justify-center hover:bg-[#00473c] hover:border-[#00473c] hover:text-white transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div ref={scrollRef} className="w-full overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 md:gap-6 h-[350px] md:h-[420px] items-center pl-4 md:pl-6 lg:pl-20">
            {categories.map((category) => (
              <a
                key={category.id}
                href="#"
                className="flex flex-col gap-3 md:gap-4 shrink-0 w-[250px] md:w-[300px] h-full group"
              >
                <div className="relative flex-1 w-full overflow-hidden rounded-sm">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-sm md:text-base lg:text-lg font-medium text-[#3a3a3a] text-center w-full">
                  {category.name}
                </h3>
              </a>
            ))}
            <div className="shrink-0 w-6 lg:w-[68px] h-px" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
