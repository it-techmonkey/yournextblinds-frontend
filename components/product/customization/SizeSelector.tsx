'use client';

import Image from 'next/image';

interface SizeSelectorProps {
  width: number;
  widthFraction: string;
  height: number;
  heightFraction: string;
  onWidthChange: (value: number) => void;
  onWidthFractionChange: (value: string) => void;
  onHeightChange: (value: number) => void;
  onHeightFractionChange: (value: string) => void;
}

const fractions = ['0', '1/8', '1/4', '3/8', '1/2', '5/8', '3/4', '7/8'];

const SizeSelector = ({
  width,
  widthFraction,
  height,
  heightFraction,
  onWidthChange,
  onWidthFractionChange,
  onHeightChange,
  onHeightFractionChange,
}: SizeSelectorProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-base font-medium text-[#3a3a3a]">Choose Your Size</h3>
      
      <div className="flex flex-col gap-3">
        {/* Width */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 w-16">
            <span className="text-sm text-[#3a3a3a]">Width</span>
            <Image src="/icons/width-arrow.svg" alt="" width={16} height={16} className="opacity-60" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#666]">Inches</span>
            <select
              value={width}
              onChange={(e) => onWidthChange(Number(e.target.value))}
              className="border border-[#e0e0e0] rounded px-3 py-2 text-sm text-[#3a3a3a] bg-white min-w-[70px]"
            >
              {Array.from({ length: 85 }, (_, i) => i + 12).map((val) => (
                <option key={val} value={val}>{val}</option>
              ))}
            </select>
            <span className="text-xs text-[#666]">Eighths</span>
            <select
              value={widthFraction}
              onChange={(e) => onWidthFractionChange(e.target.value)}
              className="border border-[#e0e0e0] rounded px-3 py-2 text-sm text-[#3a3a3a] bg-white min-w-[70px]"
            >
              {fractions.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Height */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 w-16">
            <span className="text-sm text-[#3a3a3a]">Height</span>
            <Image src="/icons/height-arrow.svg" alt="" width={16} height={16} className="opacity-60" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#666]">Inches</span>
            <select
              value={height}
              onChange={(e) => onHeightChange(Number(e.target.value))}
              className="border border-[#e0e0e0] rounded px-3 py-2 text-sm text-[#3a3a3a] bg-white min-w-[70px]"
            >
              {Array.from({ length: 109 }, (_, i) => i + 12).map((val) => (
                <option key={val} value={val}>{val}</option>
              ))}
            </select>
            <span className="text-xs text-[#666]">Eighths</span>
            <select
              value={heightFraction}
              onChange={(e) => onHeightFractionChange(e.target.value)}
              className="border border-[#e0e0e0] rounded px-3 py-2 text-sm text-[#3a3a3a] bg-white min-w-[70px]"
            >
              {fractions.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* How to Measure Link */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" className="w-4 h-4 border-[#e0e0e0] rounded" />
        <span className="text-sm text-[#3a3a3a]">How to Measure Width and Height</span>
      </label>
    </div>
  );
};

export default SizeSelector;
