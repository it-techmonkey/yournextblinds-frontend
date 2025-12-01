'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';

interface RelatedProductsProps {
  products: Product[];
}

// StarRating component with gold stars
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-[18px] h-[18px] ${star <= rating ? 'text-[#e7b66b]' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  if (products.length === 0) return null;

  return (
    <section className="py-12">
      <h2 className="text-2xl font-medium text-[#3a3a3a] mb-8">Related Products</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col">
            {/* Product Image */}
            <Link href={`/product/${product.slug}`} className="group">
              <div className="relative h-[291px] bg-gray-100 overflow-hidden">
                <Image
                  src={product.images[0] || '/home/products/vertical-blinds-1.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
            </Link>
            
            {/* Product Info */}
            <div className="bg-white p-4 flex items-end justify-between">
              <div className="flex flex-col gap-2">
                {/* Name & Price */}
                <div className="flex flex-col gap-0.5">
                  <Link href={`/product/${product.slug}`}>
                    <h3 className="text-lg font-normal text-black capitalize">{product.name}</h3>
                  </Link>
                  <div className="flex items-end gap-3">
                    <span className="text-[21px] font-bold text-black">€ {product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-base text-[#474747] line-through">€ {product.originalPrice}</span>
                    )}
                  </div>
                </div>
                {/* Stars */}
                <StarRating rating={product.rating} />
              </div>
              
              {/* Add to Cart Button */}
              <button 
                onClick={(e) => e.stopPropagation()}
                className="px-2.5 py-2.5 border border-black bg-white text-base text-black hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
