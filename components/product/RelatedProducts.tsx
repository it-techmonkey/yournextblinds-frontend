'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import StarRating from './StarRating';

interface RelatedProductsProps {
  products: Product[];
}

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
                <StarRating rating={product.rating} size="md" filledColor="text-[#e7b66b]" />
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
