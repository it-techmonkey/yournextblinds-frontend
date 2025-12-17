'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

const MAX_VISIBLE_THUMBNAILS = 5;

const ProductGallery = ({ images, productName }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);

  // Use placeholder if no images
  const displayImages = images.length > 0 ? images : ['/home/products/vertical-blinds-1.jpg'];
  
  const hasMoreImages = displayImages.length > MAX_VISIBLE_THUMBNAILS;
  const visibleThumbnails = displayImages.slice(0, MAX_VISIBLE_THUMBNAILS);
  const remainingCount = displayImages.length - MAX_VISIBLE_THUMBNAILS;

  const handleMoreClick = () => {
    setShowAllImages(true);
  };

  const handleImageSelectFromModal = (index: number) => {
    setSelectedImage(index);
    setShowAllImages(false);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 h-fit">
        {/* Vertical Thumbnail Strip - Hidden on mobile, horizontal on tablet */}
        {displayImages.length > 1 && (
          <>
            {/* Mobile: Horizontal thumbnails below */}
            <div className="md:hidden flex gap-2 overflow-x-auto scrollbar-hide order-2">
              {visibleThumbnails.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-16 h-16 shrink-0 overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-[#00473c]'
                      : 'border-gray-200 hover:border-[#00473c]/50'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${productName} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
              {/* Show +X more button if there are more images */}
              {hasMoreImages && (
                <button
                  onClick={handleMoreClick}
                  className={`relative w-16 h-16 shrink-0 overflow-hidden border-2 transition-all ${
                    selectedImage >= MAX_VISIBLE_THUMBNAILS
                      ? 'border-[#00473c]'
                      : 'border-gray-200 hover:border-[#00473c]/50'
                  }`}
                >
                  <Image
                    src={displayImages[MAX_VISIBLE_THUMBNAILS]}
                    alt={`${productName} view ${MAX_VISIBLE_THUMBNAILS + 1}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-medium text-xs">+{remainingCount}</span>
                  </div>
                </button>
              )}
            </div>
            
            {/* Desktop: Vertical thumbnails on left */}
            <div className="hidden md:flex flex-col gap-2 w-20 shrink-0 order-1">
              {visibleThumbnails.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 shrink-0 overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-[#00473c]'
                      : 'border-gray-200 hover:border-[#00473c]/50'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${productName} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
              {/* Show +X more button if there are more images */}
              {hasMoreImages && (
                <button
                  onClick={handleMoreClick}
                  className={`relative w-20 h-20 shrink-0 overflow-hidden border-2 transition-all ${
                    selectedImage >= MAX_VISIBLE_THUMBNAILS
                      ? 'border-[#00473c]'
                      : 'border-gray-200 hover:border-[#00473c]/50'
                  }`}
                >
                  <Image
                    src={displayImages[MAX_VISIBLE_THUMBNAILS]}
                    alt={`${productName} view ${MAX_VISIBLE_THUMBNAILS + 1}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-medium text-sm">+{remainingCount}</span>
                  </div>
                </button>
              )}
            </div>
          </>
        )}
        
        {/* Main Image */}
        <div className="relative flex-1 bg-[#f5f5f5] overflow-hidden order-1 md:order-2" style={{ aspectRatio: '4/5' }}>
          <Image
            src={displayImages[selectedImage]}
            alt={productName}
            fill
            className="object-cover"
            priority
          />
          
          {/* Navigation arrows for main image */}
          {displayImages.length > 1 && (
            <>
              <button
                onClick={() => setSelectedImage((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1))}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all"
                aria-label="Previous image"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setSelectedImage((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1))}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all"
                aria-label="Next image"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
        

      </div>

      {/* All Images Modal */}
      {showAllImages && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          {/* Close button */}
          <button
            onClick={() => setShowAllImages(false)}
            className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors z-10"
            aria-label="Close gallery"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Modal content */}
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">All Images ({displayImages.length})</h3>
            </div>
            <div className="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {displayImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageSelectFromModal(index)}
                    className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all hover:opacity-90 ${
                      selectedImage === index
                        ? 'border-[#00473c] ring-2 ring-[#00473c]/30'
                        : 'border-gray-200 hover:border-[#00473c]/50'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${productName} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                      {index + 1}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductGallery;
