'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Product, ProductConfiguration, DEFAULT_CONFIGURATION } from '@/types';
import ProductGallery from './ProductGallery';
import ProductReviews from './ProductReviews';
import RelatedProducts from './RelatedProducts';
import CustomizationModal from './CustomizationModal';
import StarRating from './StarRating';
import { calculatePrice, formatPrice, formatPriceWithCurrency } from '@/lib/api';

interface ProductPageProps {
  product: Product;
  relatedProducts: Product[];
  basePricePerSquareMeter?: number; // Price per m² from backend
  originalPricePerSquareMeter?: number; // Original price per m² from backend
}

const ProductPage = ({ 
  product, 
  relatedProducts,
  basePricePerSquareMeter,
  originalPricePerSquareMeter,
}: ProductPageProps) => {
  const searchParams = useSearchParams();
  const shouldCustomize = searchParams.get('customize') === 'true';
  
  const [showCustomization, setShowCustomization] = useState(shouldCustomize);
  const [config, setConfig] = useState<ProductConfiguration>({
    ...DEFAULT_CONFIGURATION,
    width: 0,
    widthFraction: '0',
    height: 0,
    heightFraction: '0',
  });

  // Auto-open customization if URL parameter is present
  useEffect(() => {
    if (shouldCustomize) {
      setShowCustomization(true);
    }
  }, [shouldCustomize]);

  // Use base price when customization is not open
  const displayPrice = useMemo(() => {
    if (showCustomization && basePricePerSquareMeter) {
      // Calculate dynamic price based on size when customization is open
      return calculatePrice(
        basePricePerSquareMeter,
        config.width,
        config.widthFraction,
        config.height,
        config.heightFraction
      );
    }
    // Show base price when customization is not open - always use basePricePerSquareMeter if available
    // This ensures consistency with category page which shows base price
    if (basePricePerSquareMeter !== undefined && basePricePerSquareMeter !== null) {
      return basePricePerSquareMeter;
    }
    return product.price;
  }, [showCustomization, basePricePerSquareMeter, config.width, config.widthFraction, config.height, config.heightFraction, product.price]);

  const displayOriginalPrice = useMemo(() => {
    if (showCustomization && originalPricePerSquareMeter) {
      // Calculate dynamic original price based on size when customization is open
      return calculatePrice(
        originalPricePerSquareMeter,
        config.width,
        config.widthFraction,
        config.height,
        config.heightFraction
      );
    }
    // Show base original price when customization is not open - always use originalPricePerSquareMeter if available
    // This ensures consistency with category page which shows base price
    if (originalPricePerSquareMeter !== undefined && originalPricePerSquareMeter !== null) {
      return originalPricePerSquareMeter;
    }
    return product.originalPrice;
  }, [showCustomization, originalPricePerSquareMeter, config.width, config.widthFraction, config.height, config.heightFraction, product.originalPrice]);

  // Calculate discount percentage
  const discountPercentage = displayOriginalPrice
    ? Math.round(((displayOriginalPrice - displayPrice) / displayOriginalPrice) * 100)
    : 0;

  if (showCustomization) {
    return (
      <CustomizationModal
        product={product}
        config={config}
        setConfig={setConfig}
        onClose={() => setShowCustomization(false)}
        basePricePerSquareMeter={basePricePerSquareMeter}
        originalPricePerSquareMeter={originalPricePerSquareMeter}
      />
    );
  }

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="px-4 md:px-6 lg:px-20 py-3 md:py-4">
        <div className="max-w-[1200px] mx-auto">
          <nav className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
            <Link href="/" className="hover:text-[#00473c]">{product.category}</Link>
            <span>&gt;</span>
            <span className="text-gray-900 truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <section className="px-4 md:px-6 lg:px-20 pb-8 md:pb-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12">
            {/* Left - Gallery with Thumbnails on Left */}
            <div className="w-full lg:w-1/2">
              <ProductGallery images={product.images} productName={product.name} />
            </div>

            {/* Right - Product Info */}
            <div className="w-full lg:w-1/2">
              {/* Product Title */}
              <h1 className="text-xl md:text-2xl lg:text-3xl font-medium text-[#3a3a3a] mb-2">
                {product.name}
              </h1>

              {/* Description */}
              <p className="text-xs md:text-sm text-gray-600 mb-3 line-clamp-2">
                {product.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4 md:mb-6">
                <StarRating rating={product.rating} />
              </div>

              {/* Discount & Shipping Info Box */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center border border-gray-200 rounded-lg mb-4 md:mb-6 overflow-hidden">
                {/* Discount Badge */}
                <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 bg-gray-50/50">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#00473c] rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs md:text-sm font-semibold text-[#3a3a3a]">{discountPercentage}% off on First Order</span>
                    <div className="text-[10px] md:text-xs text-gray-500">Code:FIRSTPURCHASE</div>
                  </div>
                </div>
                {/* Shipping Date */}
                <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 md:ml-auto border-t md:border-t-0 md:border-l border-gray-200">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-[#00473c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] md:text-xs text-gray-500">Estimated Shipping Date</div>
                    <div className="text-xs md:text-sm font-semibold text-[#00473c]">{product.estimatedDelivery}</div>
                  </div>
                </div>
              </div>

              {/* Price & CTA Section */}
              <div className="border border-gray-200 rounded-lg p-4 md:p-5 mb-4 md:mb-6">
                <div className="flex flex-col items-center lg:items-start">
                  <div className="text-xs md:text-sm text-[#0F9D49] mb-1">{discountPercentage}% off on First Order</div>
                  <div className="flex items-baseline gap-2 mb-3 md:mb-4">
                    <span className="text-xl md:text-2xl font-bold text-[#3a3a3a]">
                      {formatPriceWithCurrency(formatPrice(displayPrice), product.currency)}
                    </span>
                    {displayOriginalPrice > displayPrice && (
                      <span className="text-xs md:text-sm text-gray-400 line-through">
                        {formatPriceWithCurrency(formatPrice(displayOriginalPrice), product.currency)}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setShowCustomization(true)}
                    className="w-full bg-[#00473c] text-white py-2.5 md:py-3 px-4 md:px-6 rounded-lg text-sm md:text-base font-medium hover:bg-[#003830] transition-colors"
                  >
                    Customize and Buy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Section - Full Width */}
      <section className="px-4 md:px-6 lg:px-20 py-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="bg-white rounded-lg border border-gray-200 px-3 md:px-4 py-4 md:py-6">
            <div className="flex flex-col gap-8">
              {/* Product Details */}
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-medium text-black">Product Details</h3>
                <div className="text-sm text-[#141414] leading-[1.3]">
                  <p className="mb-3">
                    Textured Vinyl Vertical Blinds give large windows and sliding glass doors a high-design style not often found in vertical blinds products. Featuring 3 1/2&quot; wide slats that come in an alluring assortment of soft pastels and richly-tinted jewel tones, their hues are enhanced by textural appeal.
                  </p>
                  <p className="mb-3">
                    These blinds&apos; beauty is matched with durability, too. They include a deluxe track with self-aligning carriers, a heavy-duty aluminum channel designed to ensure equal spacing, and synchronized slats action. It all adds up to functionality and aesthetics you&apos;ll love to live with every day.
                  </p>
                  <p>
                    <span className="font-bold">Install Time:</span> 20 - 25 minutes
                  </p>
                </div>
              </div>

              {/* We Recommend */}
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-medium text-black">We Recommend</h3>
                <p className="text-sm text-[#141414] leading-[1.3]">
                  Choose the optional valance to give a well-coordinated, finished look – and to help control dust!
                </p>
              </div>

              {/* Considerations */}
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-medium text-black">Considerations</h3>
                <p className="text-sm text-[#141414] leading-[1.3]">
                  Vinyl Vertical Blinds may be specified to stack on either side of the window or split down the middle when open. Please consider your view before specifying.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="px-4 md:px-6 lg:px-20 py-8 md:py-12 bg-white border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto">
          <ProductReviews
            reviews={product.reviews}
            averageRating={product.rating}
            totalReviews={product.reviewCount}
          />
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="px-4 md:px-6 lg:px-20 py-8 md:py-12 bg-white">
          <div className="max-w-[1200px] mx-auto">
            <RelatedProducts products={relatedProducts} />
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductPage;
