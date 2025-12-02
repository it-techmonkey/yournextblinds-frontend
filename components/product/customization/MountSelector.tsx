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
      <h3 className="text-lg font-medium text-black">Choose Inside or Outside Mount</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onMountChange(option.id)}
            className={`border border-solid overflow-hidden transition-all ${
              selectedMount === option.id
                ? 'border-[#00473c] bg-[#f6fffd]'
                : 'border-[#d9d9d9] hover:border-[#00473c]/50 bg-white'
            }`}
          >
            {/* Content Section */}
            <div className="flex flex-col p-3 gap-2">
              {/* Text Content */}
              <div className="text-left">
                <h4 className="text-base font-medium text-black mb-2">
                  {option.name}
                </h4>
                <p className="text-xs text-black leading-[100%] mb-4">
                  {option.description}
                </p>
              </div>
              
              {/* Image */}
              <div className="relative w-full h-[180px]">
                <Image
                  src={option.image}
                  alt={option.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MountSelector;
