'use client';

import { PriceOption } from '@/types/product';

interface ColourSelectorProps {
  options: PriceOption[];
  selectedColour: string | null;
  onColourChange: (colourId: string) => void;
}

const ColourSelector = ({ options, selectedColour, onColourChange }: ColourSelectorProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-base font-medium text-[#3a3a3a]">Colour</h3>
      
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onColourChange(option.id)}
            className={`flex flex-col items-center gap-2 p-3 rounded border transition-all ${
              selectedColour === option.id
                ? 'border-[#00473c] ring-1 ring-[#00473c]'
                : 'border-[#e0e0e0] hover:border-[#00473c]'
            }`}
          >
            <div 
              className="w-12 h-12 rounded border border-[#e0e0e0]"
              style={{ backgroundColor: option.hex }}
            />
            <span className="text-xs text-[#3a3a3a]">{option.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColourSelector;
