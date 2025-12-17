'use client';

import { useCart } from '@/context/CartContext';
import { TopBar, Header, NavBar, Footer } from '@/components';
import { formatPriceWithCurrency } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const shippingCost = cart.total >= 100 ? 0 : 15;
  const tax = cart.total * 0.1;
  const finalTotal = cart.total + shippingCost + tax;

  const formatConfiguration = (config: any) => {
    const parts = [];
    
    const widthStr = `${config.width}${config.widthFraction !== '0' ? ` ${config.widthFraction}` : ''}"`;
    const heightStr = `${config.height}${config.heightFraction !== '0' ? ` ${config.heightFraction}` : ''}"`;
    parts.push(`Size: ${widthStr} × ${heightStr}`);
    
    if (config.mount) {
      parts.push(`Mount: ${config.mount.charAt(0).toUpperCase() + config.mount.slice(1)}`);
    }
    if (config.room) parts.push(`Room: ${config.room}`);
    if (config.colour) parts.push(`Color: ${config.colour}`);
    if (config.headrail) parts.push(`Headrail: ${config.headrail}`);
    if (config.valance) parts.push(`Valance: ${config.valance}`);
    if (config.control) parts.push(`Control: ${config.control}`);
    if (config.lift) parts.push(`Lift: ${config.lift}`);
    
    return parts;
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-[#fafafa]">
        <header className="sticky top-0 z-50 bg-white shadow-sm">
          <TopBar />
          <Header />
          <NavBar />
        </header>

        <div className="px-4 md:px-6 lg:px-20 py-12 md:py-16">
          <div className="max-w-[1200px] mx-auto">
            <div className="bg-white rounded-lg p-8 md:p-12 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                  <Image src="/icons/cart.svg" alt="Empty Cart" width={48} height={48} className="opacity-50" />
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#3a3a3a] mb-3">Your Cart is Empty</h1>
              <p className="text-gray-600 mb-8">Looks like you haven&apos;t added any items to your cart yet.</p>
              <Link
                href="/"
                className="inline-block bg-[#00473c] text-white py-3 px-8 rounded-lg text-base font-medium hover:bg-[#003830] transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <TopBar />
        <Header />
        <NavBar />
      </header>

      <div className="bg-white px-4 md:px-6 lg:px-20 py-4">
        <div className="max-w-[1200px] mx-auto">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#00473c]">Home</Link>
            <span>&gt;</span>
            <span className="text-[#3a3a3a] font-medium">Shopping Cart</span>
          </nav>
        </div>
      </div>

      <div className="px-4 md:px-6 lg:px-20 py-8 md:py-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <div className="flex-1">
              <div className="bg-white rounded-lg p-4 md:p-6">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl md:text-3xl font-bold text-[#3a3a3a]">
                    Shopping Cart ({cart.itemCount} {cart.itemCount === 1 ? 'item' : 'items'})
                  </h1>
                  {cart.items.length > 0 && (
                    <button
                      onClick={() => setShowClearConfirm(true)}
                      className="text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      Clear Cart
                    </button>
                  )}
                </div>

                <div className="divide-y divide-gray-200">
                  {cart.items.map((item) => (
                    <div key={item.id} className="py-6 first:pt-0 last:pb-0">
                      <div className="flex gap-4 md:gap-6">
                        <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between gap-4 mb-2">
                            <div>
                              <Link
                                href={`/product/${item.product.slug}`}
                                className="text-base md:text-lg font-semibold text-[#3a3a3a] hover:text-[#00473c] line-clamp-2"
                              >
                                {item.product.name}
                              </Link>
                              <p className="text-sm text-gray-500 mt-1">{item.product.category}</p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-red-600 transition-colors flex-shrink-0"
                              aria-label="Remove item"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>

                          <div className="mb-3">
                            {formatConfiguration(item.configuration).map((detail, idx) => (
                              <p key={idx} className="text-xs md:text-sm text-gray-600">
                                {detail}
                              </p>
                            ))}
                          </div>

                          <div className="flex items-center justify-between gap-4 flex-wrap">
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-gray-600">Quantity:</span>
                              <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="px-3 py-1.5 hover:bg-gray-100 transition-colors"
                                  aria-label="Decrease quantity"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                  </svg>
                                </button>
                                <span className="px-4 py-1.5 text-sm font-medium min-w-[40px] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="px-3 py-1.5 hover:bg-gray-100 transition-colors"
                                  aria-label="Increase quantity"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <div className="text-lg md:text-xl font-bold text-[#3a3a3a]">
                              {formatPriceWithCurrency(item.product.price * item.quantity, item.product.currency)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-[#00473c] hover:text-[#003830] font-medium"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>

            <div className="lg:w-[380px]">
              <div className="bg-white rounded-lg p-6 sticky top-6">
                <h2 className="text-xl font-bold text-[#3a3a3a] mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-[#3a3a3a]">{formatPriceWithCurrency(cart.total)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-[#3a3a3a]">
                      {shippingCost === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        formatPriceWithCurrency(shippingCost)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Estimated Tax</span>
                    <span className="font-medium text-[#3a3a3a]">{formatPriceWithCurrency(tax)}</span>
                  </div>
                </div>

                {cart.total < 100 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                    <p className="text-xs text-blue-800">
                      Add {formatPriceWithCurrency(100 - cart.total)} more to get FREE shipping!
                    </p>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-bold text-[#3a3a3a]">Total</span>
                    <span className="text-2xl font-bold text-[#00473c]">{formatPriceWithCurrency(finalTotal)}</span>
                  </div>
                </div>

                <button className="w-full bg-[#00473c] text-white py-3 px-6 rounded-lg text-base font-medium hover:bg-[#003830] transition-colors mb-3">
                  Proceed to Checkout
                </button>

                <button className="w-full border border-gray-300 text-[#3a3a3a] py-3 px-6 rounded-lg text-base font-medium hover:bg-gray-50 transition-colors">
                  Request Free Samples
                </button>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-600">Free shipping on orders over £100</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-600">30-day return policy</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-600">Secure checkout</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showClearConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-[#3a3a3a] mb-3">Clear Cart?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to remove all items from your cart? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 border border-gray-300 text-[#3a3a3a] py-2.5 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  clearCart();
                  setShowClearConfirm(false);
                }}
                className="flex-1 bg-red-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
