'use client';

import Image from 'next/image';
import { MountOption } from '@/types/product';

interface MountSelectorProps {
  options: MountOption[];
  selectedMount: string;
  onMountChange: (mountId: string) => void;
}

const MountSelector = ({ options, selectedMount, onMountChange }: MountSelectorProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-base font-medium text-[#3a3a3a]">Choose Inside or Outside Mount</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onMountChange(option.id)}
            className={`flex flex-col rounded border overflow-hidden transition-all ${
              selectedMount === option.id
                ? 'border-[#00473c] ring-1 ring-[#00473c]'
                : 'border-[#e0e0e0] hover:border-[#00473c]'
            }`}
          >
            {/* Header */}
            <div className={`p-4 ${selectedMount === option.id ? 'bg-[#00473c]' : 'bg-[#f5f5f5]'}`}>
              <h4 className={`text-sm font-medium ${selectedMount === option.id ? 'text-white' : 'text-[#3a3a3a]'}`}>
                {option.name}
              </h4>
              <p className={`text-xs mt-1 leading-relaxed ${selectedMount === option.id ? 'text-white/80' : 'text-[#666]'}`}>
                {option.description}
              </p>
            </div>
            
            {/* Image */}
            <div className="relative h-[120px] bg-[#f9f9f9]">
              <Image
                src={option.image}
                alt={option.name}
                fill
                className="object-contain p-4"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MountSelector;
