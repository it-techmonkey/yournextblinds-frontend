'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product, Room, MountOption, ProductConfiguration, defaultConfiguration } from '@/types/product';
import ProductGallery from './ProductGallery';
import ProductReviews from './ProductReviews';
import RelatedProducts from './RelatedProducts';
import CustomizationModal from './CustomizationModal';

interface ProductPageProps {
  product: Product;
  relatedProducts: Product[];
  rooms: Room[];
  mountOptions: MountOption[];
}

const ProductPage = ({ product, relatedProducts, rooms, mountOptions }: ProductPageProps) => {
  const [showCustomization, setShowCustomization] = useState(false);
  const [config, setConfig] = useState<ProductConfiguration>({
    ...defaultConfiguration,
    width: 24,
    widthFraction: '0',
    height: 24,
    heightFraction: '0',
  });

  // Generate star rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-[#00473c]' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  // Calculate discount percentage
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  if (showCustomization) {
    return (
      <CustomizationModal
        product={product}
        rooms={rooms}
        mountOptions={mountOptions}
        config={config}
        setConfig={setConfig}
        onClose={() => setShowCustomization(false)}
      />
    );
  }

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="px-6 lg:px-20 py-4">
        <div className="max-w-[1200px] mx-auto">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#00473c]">{product.category}</Link>
            <span>&gt;</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <section className="px-6 lg:px-20 pb-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left - Gallery with Thumbnails on Left */}
            <div className="w-full lg:w-1/2">
              <div className="flex gap-4">
                {/* Thumbnails Column */}
                <div className="hidden md:flex flex-col gap-2 w-20">
                  {product.images.slice(0, 6).map((image, index) => (
                    <div
                      key={index}
                      className={`relative w-20 h-[72px] rounded-lg overflow-hidden cursor-pointer border-2 ${
                        index === 0 ? 'border-[#00473c]' : 'border-gray-200'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      {index === 5 && product.images.length > 6 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-medium">+{product.images.length - 6}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {/* Main Image */}
                <div className="flex-1 relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Right - Product Info */}
            <div className="w-full lg:w-1/2">
              {/* Product Title */}
              <h1 className="text-2xl lg:text-3xl font-medium text-[#3a3a3a] mb-2">
                {product.name}
              </h1>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {product.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                <div className="flex">{renderStars(product.rating)}</div>
              </div>

              {/* Discount & Shipping Info Box */}
              <div className="flex items-center border border-gray-200 rounded-lg mb-6 overflow-hidden">
                {/* Discount Badge */}
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50/50">
                  <div className="w-12 h-12 bg-[#00473c] rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-[#3a3a3a]">{discountPercentage}% off on First Order</span>
                    <div className="text-xs text-gray-500">Code:FIRSTPURCHASE</div>
                  </div>
                </div>
                {/* Shipping Date */}
                <div className="flex items-center gap-3 px-4 py-3 ml-auto border-l border-gray-200">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#00473c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Estimated Shipping Date</div>
                    <div className="text-sm font-semibold text-[#00473c]">{product.estimatedDelivery}</div>
                  </div>
                </div>
              </div>

              {/* Size & Price Section */}
              <div className="border border-gray-200 rounded-lg p-5 mb-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Size Selection - Left Side */}
                  <div className="flex-1">
                    {/* Width */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2 w-24">
                        <span className="text-sm font-medium text-[#3a3a3a]">Width</span>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                        </svg>
                      </div>
                      <div className="flex gap-3 flex-1">
                        <div className="flex-1">
                          <div className="border border-gray-300 rounded-lg px-3 py-2">
                            <div className="text-[10px] text-gray-400 uppercase tracking-wide">Inches</div>
                            <div className="flex items-center justify-between">
                              <select
                                value={config.width}
                                onChange={(e) => setConfig({ ...config, width: parseInt(e.target.value) })}
                                className="text-base font-medium text-[#3a3a3a] bg-transparent border-none p-0 appearance-none cursor-pointer focus:outline-none w-full"
                              >
                                {Array.from({ length: 85 }, (_, i) => i + 12).map((inch) => (
                                  <option key={inch} value={inch}>{inch}</option>
                                ))}
                              </select>
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="border border-gray-300 rounded-lg px-3 py-2">
                            <div className="text-[10px] text-gray-400 uppercase tracking-wide">Eighths</div>
                            <div className="flex items-center justify-between">
                              <select
                                value={config.widthFraction}
                                onChange={(e) => setConfig({ ...config, widthFraction: e.target.value })}
                                className="text-base font-medium text-[#3a3a3a] bg-transparent border-none p-0 appearance-none cursor-pointer focus:outline-none w-full"
                              >
                                <option value="0">0</option>
                                <option value="1/8">1/8</option>
                                <option value="1/4">2/8</option>
                                <option value="3/8">3/8</option>
                                <option value="1/2">4/8</option>
                                <option value="5/8">5/8</option>
                                <option value="3/4">6/8</option>
                                <option value="7/8">7/8</option>
                              </select>
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Height */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 w-24">
                        <span className="text-sm font-medium text-[#3a3a3a]">Height</span>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                        </svg>
                      </div>
                      <div className="flex gap-3 flex-1">
                        <div className="flex-1">
                          <div className="border border-gray-300 rounded-lg px-3 py-2">
                            <div className="text-[10px] text-gray-400 uppercase tracking-wide">Inches</div>
                            <div className="flex items-center justify-between">
                              <select
                                value={config.height}
                                onChange={(e) => setConfig({ ...config, height: parseInt(e.target.value) })}
                                className="text-base font-medium text-[#3a3a3a] bg-transparent border-none p-0 appearance-none cursor-pointer focus:outline-none w-full"
                              >
                                {Array.from({ length: 109 }, (_, i) => i + 12).map((inch) => (
                                  <option key={inch} value={inch}>{inch}</option>
                                ))}
                              </select>
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="border border-gray-300 rounded-lg px-3 py-2">
                            <div className="text-[10px] text-gray-400 uppercase tracking-wide">Eighths</div>
                            <div className="flex items-center justify-between">
                              <select
                                value={config.heightFraction}
                                onChange={(e) => setConfig({ ...config, heightFraction: e.target.value })}
                                className="text-base font-medium text-[#3a3a3a] bg-transparent border-none p-0 appearance-none cursor-pointer focus:outline-none w-full"
                              >
                                <option value="0">0</option>
                                <option value="1/8">1/8</option>
                                <option value="1/4">2/8</option>
                                <option value="3/8">3/8</option>
                                <option value="1/2">4/8</option>
                                <option value="5/8">5/8</option>
                                <option value="3/4">6/8</option>
                                <option value="7/8">7/8</option>
                              </select>
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price & CTA - Right Side */}
                  <div className="lg:border-l lg:border-gray-200 lg:pl-6">
                    <div className="text-sm text-[#0F9D49] mb-1">{discountPercentage}% off on First Order</div>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-2xl font-bold text-[#3a3a3a]">$ {product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-400 line-through">€ {product.originalPrice}</span>
                      )}
                    </div>
                    <button
                      onClick={() => setShowCustomization(true)}
                      className="w-full bg-[#00473c] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#003830] transition-colors"
                    >
                      Customize and Buy
                    </button>
                  </div>
                </div>

                {/* How to Measure Link */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="flex items-center gap-2 text-sm text-[#00473c] hover:underline">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    How to Measure Width and Height
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Section - Full Width */}
      <section className="px-6 lg:px-20 py-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="bg-white rounded-lg border border-gray-200 px-4 py-6">
            <div className="flex flex-col gap-8">
              {/* Product Details */}
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-medium text-black">Product Details</h3>
                <div className="text-sm text-[#141414] leading-[1.3]">
                  <p className="mb-3">
                    Textured Vinyl Vertical Blinds give large windows and sliding glass doors a high-design style not often found in vertical blinds products. Featuring 3 1/2" wide slats that come in an alluring assortment of soft pastels and richly-tinted jewel tones, their hues are enhanced by textural appeal.
                  </p>
                  <p className="mb-3">
                    These blinds' beauty is matched with durability, too. They include a deluxe track with self-aligning carriers, a heavy-duty aluminum channel designed to ensure equal spacing, and synchronized slats action. It all adds up to functionality and aesthetics you'll love to live with every day.
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
      <section className="px-6 lg:px-20 py-12 bg-white border-t border-gray-100">
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
        <section className="px-6 lg:px-20 py-12 bg-white">
          <div className="max-w-[1200px] mx-auto">
            <RelatedProducts products={relatedProducts} />
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductPage;
