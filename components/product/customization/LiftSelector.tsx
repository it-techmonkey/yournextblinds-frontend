'use client';

import Image from 'next/image';
import { PriceOption } from '@/types/product';

interface LiftSelectorProps {
  options: PriceOption[];
  selectedLift: string | null;
  onLiftChange: (liftId: string) => void;
  positionOptions?: PriceOption[];
  selectedPosition?: string | null;
  onPositionChange?: (positionId: string) => void;
}

const LiftSelector = ({ 
  options, 
  selectedLift, 
  onLiftChange,
  positionOptions,
  selectedPosition,
  onPositionChange
}: LiftSelectorProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-base font-medium text-[#3a3a3a]">Choose Your Lift</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onLiftChange(option.id)}
            className={`flex flex-col rounded border overflow-hidden transition-all text-left ${
              selectedLift === option.id
                ? 'border-[#00473c] ring-1 ring-[#00473c]'
                : 'border-[#e0e0e0] hover:border-[#00473c]'
            }`}
          >
            <div className={`p-3 ${selectedLift === option.id ? 'bg-[#00473c]' : 'bg-[#f5f5f5]'}`}>
              <h4 className={`text-sm font-medium ${selectedLift === option.id ? 'text-white' : 'text-[#3a3a3a]'}`}>
                {option.name}
              </h4>
              {option.description && (
                <p className={`text-xs mt-1 leading-relaxed ${selectedLift === option.id ? 'text-white/80' : 'text-[#666]'}`}>
                  {option.description}
                </p>
              )}
            </div>
            {option.image && (
              <div className="relative h-[100px] bg-white">
                <Image
                  src={option.image}
                  alt={option.name}
                  fill
                  className="object-contain p-3"
                />
                {option.price > 0 && selectedLift === option.id && (
                  <span className="absolute bottom-2 left-2 bg-[#00473c] text-white text-xs px-2 py-1 rounded">
                    Adds ${option.price}
                  </span>
                )}
              </div>
            )}
          </button>
        ))}
      </div>
      
      {/* Position Options */}
      {positionOptions && selectedLift && selectedLift !== 'motorized' && (
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

export default LiftSelector;
