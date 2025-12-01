'use client';

import Image from 'next/image';
import { PriceOption } from '@/types/product';

interface HeadrailSelectorProps {
  options: PriceOption[];
  selectedHeadrail: string | null;
  onHeadrailChange: (headrailId: string) => void;
}

const HeadrailSelector = ({ options, selectedHeadrail, onHeadrailChange }: HeadrailSelectorProps) => {
  const selectedOption = options.find((opt) => opt.id === selectedHeadrail);
  
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-base font-medium text-[#3a3a3a]">Choose Your Headrail</h3>
      
      {/* Option Tabs */}
      <div className="flex border border-[#e0e0e0] rounded overflow-hidden">
        {options.map((option, index) => (
          <button
            key={option.id}
            onClick={() => onHeadrailChange(option.id)}
            className={`flex-1 px-4 py-2.5 text-sm transition-all ${
              selectedHeadrail === option.id
                ? 'bg-[#f5fffd] text-[#00473c] border-[#00473c]'
                : 'bg-white text-[#666] hover:bg-gray-50'
            } ${index > 0 ? 'border-l border-[#e0e0e0]' : ''}`}
          >
            {option.name}
          </button>
        ))}
      </div>
      
      {/* Selected Option Preview */}
      {selectedOption && (
        <div className="border border-[#e0e0e0] rounded p-4">
          <p className="text-sm font-medium text-[#3a3a3a] mb-3">
            {selectedOption.id === 'slim' ? 'Slim Headrail' : selectedOption.name.replace(' (free)', '')}
          </p>
          {selectedOption.image && (
            <div className="relative h-[120px] w-[180px] bg-[#f9f9f9] rounded overflow-hidden">
              <Image
                src={selectedOption.image}
                alt={selectedOption.name}
                fill
                className="object-contain"
              />
              {/* Price Badge */}
              <span className="absolute bottom-2 left-2 bg-[#00473c] text-white text-xs px-2 py-1 rounded">
                Adds ${(selectedOption.price || 0).toFixed(2)}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HeadrailSelector;
