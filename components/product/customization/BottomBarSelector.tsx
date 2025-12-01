'use client';

import Image from 'next/image';
import { PriceOption } from '@/types/product';

interface BottomBarSelectorProps {
  options: PriceOption[];
  selectedBar: string | null;
  onBarChange: (barId: string) => void;
}

const BottomBarSelector = ({ options, selectedBar, onBarChange }: BottomBarSelectorProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-base font-medium text-[#3a3a3a]">Bottom Bar</h3>
        <p className="text-sm text-[#666] mt-1">
          Adding a valance gives a more finished designer look and provides easier installation. Valances cannot be added later.
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onBarChange(option.id)}
            className={`flex flex-col rounded border overflow-hidden transition-all ${
              selectedBar === option.id
                ? 'border-[#00473c] ring-1 ring-[#00473c]'
                : 'border-[#e0e0e0] hover:border-[#00473c]'
            }`}
          >
            <div className={`p-3 ${selectedBar === option.id ? 'bg-[#00473c]' : 'bg-[#f5f5f5]'}`}>
              <h4 className={`text-xs font-medium text-left ${selectedBar === option.id ? 'text-white' : 'text-[#3a3a3a]'}`}>
                {option.name}
              </h4>
            </div>
            <div className="relative h-[80px] bg-white">
              {option.image && (
                <Image
                  src={option.image}
                  alt={option.name}
                  fill
                  className="object-contain p-2"
                />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomBarSelector;
