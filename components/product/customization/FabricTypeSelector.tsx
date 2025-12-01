'use client';

import Image from 'next/image';
import { PriceOption } from '@/types/product';

interface FabricTypeSelectorProps {
  options: PriceOption[];
  selectedType: string | null;
  onTypeChange: (typeId: string) => void;
}

const FabricTypeSelector = ({ options, selectedType, onTypeChange }: FabricTypeSelectorProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-base font-medium text-[#3a3a3a]">Fabric Type</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onTypeChange(option.id)}
            className={`flex flex-col rounded border overflow-hidden transition-all ${
              selectedType === option.id
                ? 'border-[#00473c] ring-1 ring-[#00473c]'
                : 'border-[#e0e0e0] hover:border-[#00473c]'
            }`}
          >
            <div className={`p-3 ${selectedType === option.id ? 'bg-[#00473c]' : 'bg-[#f5f5f5]'}`}>
              <h4 className={`text-sm font-medium ${selectedType === option.id ? 'text-white' : 'text-[#3a3a3a]'}`}>
                {option.name}
              </h4>
            </div>
            {option.image && (
              <div className="relative h-[100px] bg-white">
                <Image
                  src={option.image}
                  alt={option.name}
                  fill
                  className="object-contain p-3"
                />
                {option.price > 0 && selectedType === option.id && (
                  <span className="absolute bottom-2 left-2 bg-[#00473c] text-white text-xs px-2 py-1 rounded">
                    Adds ${option.price}
                  </span>
                )}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FabricTypeSelector;
