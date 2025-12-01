'use client';

import Image from 'next/image';
import { PriceOption } from '@/types/product';

interface ControlSelectorProps {
  options: PriceOption[];
  selectedControl: string | null;
  onControlChange: (controlId: string) => void;
  positionOptions?: PriceOption[];
  selectedPosition?: string | null;
  onPositionChange?: (positionId: string) => void;
}

const ControlSelector = ({ 
  options, 
  selectedControl, 
  onControlChange,
  positionOptions,
  selectedPosition,
  onPositionChange
}: ControlSelectorProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-base font-medium text-[#3a3a3a]">Control</h3>
      
      {/* Control Type Tabs */}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onControlChange(option.id)}
            className={`px-4 py-2 text-sm rounded border transition-all ${
              selectedControl === option.id
                ? 'border-[#00473c] bg-[#f5fffd] text-[#00473c]'
                : 'border-[#e0e0e0] text-[#666] hover:border-[#00473c]'
            }`}
          >
            {option.name}
          </button>
        ))}
      </div>
      
      {/* Position Options */}
      {positionOptions && selectedControl === 'manual' && (
        <div className="grid grid-cols-2 gap-4 mt-2">
          {positionOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onPositionChange?.(option.id)}
              className={`flex flex-col rounded border overflow-hidden transition-all ${
                selectedPosition === option.id
                  ? 'border-[#00473c] ring-1 ring-[#00473c]'
                  : 'border-[#e0e0e0] hover:border-[#00473c]'
              }`}
            >
              <div className="p-3 bg-[#f5f5f5]">
                <h4 className="text-sm font-medium text-[#3a3a3a]">{option.name}</h4>
              </div>
              {option.image && (
                <div className="relative h-[100px] bg-white">
                  <Image
                    src={option.image}
                    alt={option.name}
                    fill
                    className="object-contain p-3"
                  />
                  {selectedPosition === option.id && (
                    <span className="absolute bottom-2 left-2 bg-[#00473c] text-white text-xs px-2 py-1 rounded">
                      Adds $0.00
                    </span>
                  )}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ControlSelector;
