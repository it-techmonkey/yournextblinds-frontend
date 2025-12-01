'use client';

import Image from 'next/image';
import { PriceOption } from '@/types/product';

interface OpenStyleSelectorProps {
  options: PriceOption[];
  selectedStyle: string | null;
  onStyleChange: (styleId: string) => void;
}

const OpenStyleSelector = ({ options, selectedStyle, onStyleChange }: OpenStyleSelectorProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-base font-medium text-[#3a3a3a]">How do you want your blinds to open</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onStyleChange(option.id)}
            className={`flex flex-col rounded border overflow-hidden transition-all ${
              selectedStyle === option.id
                ? 'border-[#00473c] ring-1 ring-[#00473c]'
                : 'border-[#e0e0e0] hover:border-[#00473c]'
            }`}
          >
            {/* Header */}
            <div className={`p-3 ${selectedStyle === option.id ? 'bg-[#00473c]' : 'bg-[#f5f5f5]'}`}>
              <h4 className={`text-sm font-medium ${selectedStyle === option.id ? 'text-white' : 'text-[#3a3a3a]'}`}>
                {option.name}
              </h4>
            </div>
            
            {/* Image */}
            <div className="relative h-[100px] bg-white">
              {option.image && (
                <Image
                  src={option.image}
                  alt={option.name}
                  fill
                  className="object-contain p-3"
                />
              )}
              {/* Price Badge - Always show */}
              <span className="absolute bottom-2 left-2 bg-[#00473c] text-white text-xs px-2 py-1 rounded">
                Adds ${option.price.toFixed(2)}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default OpenStyleSelector;
