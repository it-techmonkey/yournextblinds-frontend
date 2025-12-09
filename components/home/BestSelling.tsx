'use client';

import { useRef } from 'react';
import { ProductCard } from '@/components/product';
import productsData from '@/data/products.json';

// Use actual products from JSON - use first 5 products
const products = productsData.products.slice(0, 5).map((product) => ({
  id: product.id,
  name: product.name,
  slug: product.slug,
  price: product.price,
  originalPrice: product.originalPrice,
  rating: product.rating,
  image: product.images[0], // Use first image from the images array
}));

// BestSelling - Best selling products section with horizontal scroll
const BestSelling = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 327; // card width + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="bg-white py-12 md:py-16 lg:py-24 overflow-hidden">
      <div className="flex flex-col gap-6 md:gap-6 lg:gap-8">
        {/* Header with Navigation */}
        <div className="flex items-center justify-between px-4 md:px-6 lg:px-20">
          <h2 className="text-xl md:text-2xl lg:text-[32px] font-medium text-[#3a3a3a]">
            Best Selling Products
          </h2>
          <div className="hidden lg:flex gap-3">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="w-10 h-10 rounded-full border border-[#3a3a3a] flex items-center justify-center hover:bg-[#00473c] hover:border-[#00473c] hover:text-white transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="w-10 h-10 rounded-full border border-[#3a3a3a] flex items-center justify-center hover:bg-[#00473c] hover:border-[#00473c] hover:text-white transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Products Horizontal Scroll */}
        <div ref={scrollRef} className="w-full overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 pl-4 md:pl-6 lg:pl-20">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                className="shrink-0 w-[250px] md:w-[280px] lg:w-[311px]"
              />
            ))}
            {/* Spacer for right padding when scrolled to end */}
            <div className="shrink-0 w-4 md:w-6 lg:w-12 h-px" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSelling;
