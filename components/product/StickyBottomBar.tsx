'use client';

interface StickyBottomBarProps {
  price: number;
  additionalCost: number;
  onBuyClick: () => void;
}

const StickyBottomBar = ({ price, additionalCost, onBuyClick }: StickyBottomBarProps) => {
  const totalPrice = price + additionalCost;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e0e0e0] px-6 py-4 z-40 lg:hidden">
      <div className="flex items-center justify-between max-w-[1200px] mx-auto">
        <div className="flex flex-col">
          <span className="text-xs text-[#666]">Price</span>
          <span className="text-xl font-bold text-[#3a3a3a]">${totalPrice.toFixed(0)}</span>
        </div>
        <button
          onClick={onBuyClick}
          className="bg-[#00473c] text-white px-8 py-3 rounded text-base font-medium hover:bg-[#003a31] transition-colors"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default StickyBottomBar;
