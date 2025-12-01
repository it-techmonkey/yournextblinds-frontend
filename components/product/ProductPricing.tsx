'use client';

interface ProductPricingProps {
  price: number;
  originalPrice: number;
  additionalCost: number;
}

const ProductPricing = ({ price, originalPrice, additionalCost }: ProductPricingProps) => {
  const totalPrice = price + additionalCost;
  const discount = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div className="flex flex-col gap-3 bg-[#f9f9f9] p-4 rounded">
      {discount > 0 && (
        <div className="flex items-center gap-2">
          <span className="bg-[#00473c] text-white text-xs px-2 py-1 rounded">
            {discount}% off on First Order
          </span>
          <span className="text-xs text-[#666]">Code: FIRST15 Auto-applied</span>
        </div>
      )}
      
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-[#3a3a3a]">$ {totalPrice.toFixed(0)}</span>
        {originalPrice > price && (
          <span className="text-lg text-[#666] line-through">$ {originalPrice}</span>
        )}
      </div>
      
      <button className="w-full bg-[#00473c] text-white py-3 rounded text-base font-medium hover:bg-[#003a31] transition-colors">
        Customize and Buy
      </button>
    </div>
  );
};

export default ProductPricing;
