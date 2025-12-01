'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

const ProductGallery = ({ images, productName }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  // Use placeholder if no images
  const displayImages = images.length > 0 ? images : ['/home/products/vertical-blinds-1.jpg'];

  return (
    <div className="flex gap-4">
      {/* Vertical Thumbnail Strip */}
      {displayImages.length > 1 && (
        <div className="hidden md:flex flex-col gap-2 w-20">
          {displayImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square w-full shrink-0 overflow-hidden border-2 transition-all ${
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
        </div>
      )}
      
      {/* Main Image */}
      <div className="relative aspect-[4/5] flex-1 bg-[#f5f5f5] overflow-hidden">
        <Image
          src={displayImages[selectedImage]}
          alt={productName}
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Mobile Thumbnail Strip */}
      {displayImages.length > 1 && (
        <div className="md:hidden flex gap-2 overflow-x-auto scrollbar-hide absolute bottom-4 left-4 right-4">
          {displayImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative w-14 h-14 shrink-0 overflow-hidden border-2 transition-all ${
                selectedImage === index
                  ? 'border-[#00473c]'
                  : 'border-white hover:border-[#00473c]/50'
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
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
