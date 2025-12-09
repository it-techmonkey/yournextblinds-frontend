'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductCard, StarRating } from '@/components/product';
import CollectionFilters from './CollectionFilters';

interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  images: string[];
}

interface ProductGridProps {
  products: Product[];
  currentCategory: string;
  activeFilters: {
    pattern?: string;
    color?: string;
  };
}

export default function CollectionProductGrid({ products, currentCategory, activeFilters }: ProductGridProps) {
  const [sortBy, setSortBy] = useState('best-selling');
  const [visibleProducts, setVisibleProducts] = useState(24);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name-az':
        return a.name.localeCompare(b.name);
      case 'name-za':
        return b.name.localeCompare(a.name);
      default:
        return 0; // best-selling - keep original order
    }
  });

  const displayedProducts = sortedProducts.slice(0, visibleProducts);
  const hasMore = visibleProducts < sortedProducts.length;

  const loadMore = () => {
    setVisibleProducts((prev) => Math.min(prev + 24, sortedProducts.length));
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
        {/* Mobile Filter Button */}
        <button
          onClick={() => setShowMobileFilters(true)}
          className="lg:hidden flex items-center gap-2 px-3 py-2 bg-[#00473c] text-white rounded-md text-sm font-medium hover:bg-[#003f1a] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span className="hidden sm:inline">Filters</span>
        </button>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-3">
          <label htmlFor="sort" className="text-sm font-medium text-gray-700 hidden sm:block">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#00473c] focus:border-[#00473c]"
          >
            <option value="best-selling">Best selling</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-az">Name: A to Z</option>
            <option value="name-za">Name: Z to A</option>
          </select>
        </div>
      </div>

      {/* Product Grid/List */}
      {displayedProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your filters to find what you're looking for.</p>
        </div>
      ) : (
        <>
          {/* Mobile Filter Drawer */}
          {showMobileFilters && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in"
                onClick={() => setShowMobileFilters(false)}
              />
              
              {/* Drawer */}
              <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-white z-50 overflow-y-auto lg:hidden animate-slide-in-left shadow-2xl">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Close filters"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="p-4">
                  <CollectionFilters 
                    currentCategory={currentCategory}
                    activeFilters={activeFilters}
                  />
                </div>
              </div>
            </>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  ...product,
                  image: product.images[0]
                }}
              />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center pt-6 md:pt-8">
              <button
                onClick={loadMore}
                className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-white border-2 border-[#00473c] text-[#00473c] rounded-md text-sm sm:text-base font-medium hover:bg-[#00473c] hover:text-white transition-colors"
              >
                Load More Products
              </button>
            </div>
          )}

          {/* Pagination Info */}
          <div className="text-center text-xs sm:text-sm text-gray-600">
            Showing {displayedProducts.length} of {sortedProducts.length} products
          </div>
        </>
      )}
    </div>
  );
}
