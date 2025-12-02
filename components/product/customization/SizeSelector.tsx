'use client';

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
    <div className="space-y-4">
      <h3 className="text-base font-medium text-[#3a3a3a]">Choose Your Size</h3>
      
      <div className="space-y-3">
        {/* Width */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 w-24">
            <span className="text-sm font-medium text-[#3a3a3a]">Width</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
          <div className="flex gap-3 flex-1">
            <div className="flex-1">
              <div className="border border-gray-300 rounded-lg px-3 py-2">
                <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">Inches</div>
                <div className="flex items-center justify-between">
                  <select
                    value={width}
                    onChange={(e) => onWidthChange(Number(e.target.value))}
                    className="text-base font-medium text-[#3a3a3a] bg-transparent border-none p-0 appearance-none cursor-pointer focus:outline-none w-full"
                  >
                    {Array.from({ length: 85 }, (_, i) => i + 12).map((val) => (
                      <option key={val} value={val}>{val}</option>
                    ))}
                  </select>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="border border-gray-300 rounded-lg px-3 py-2">
                <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">Eighths</div>
                <div className="flex items-center justify-between">
                  <select
                    value={widthFraction}
                    onChange={(e) => onWidthFractionChange(e.target.value)}
                    className="text-base font-medium text-[#3a3a3a] bg-transparent border-none p-0 appearance-none cursor-pointer focus:outline-none w-full"
                  >
                    {fractions.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Height */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 w-24">
            <span className="text-sm font-medium text-[#3a3a3a]">Height</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
          <div className="flex gap-3 flex-1">
            <div className="flex-1">
              <div className="border border-gray-300 rounded-lg px-3 py-2">
                <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">Inches</div>
                <div className="flex items-center justify-between">
                  <select
                    value={height}
                    onChange={(e) => onHeightChange(Number(e.target.value))}
                    className="text-base font-medium text-[#3a3a3a] bg-transparent border-none p-0 appearance-none cursor-pointer focus:outline-none w-full"
                  >
                    {Array.from({ length: 109 }, (_, i) => i + 12).map((val) => (
                      <option key={val} value={val}>{val}</option>
                    ))}
                  </select>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="border border-gray-300 rounded-lg px-3 py-2">
                <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">Eighths</div>
                <div className="flex items-center justify-between">
                  <select
                    value={heightFraction}
                    onChange={(e) => onHeightFractionChange(e.target.value)}
                    className="text-base font-medium text-[#3a3a3a] bg-transparent border-none p-0 appearance-none cursor-pointer focus:outline-none w-full"
                  >
                    {fractions.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* How to Measure Link */}
      <button className="flex items-center gap-2 text-sm text-[#00473c] hover:underline">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        How to Measure Width and Height
      </button>
    </div>
  );
};

export default SizeSelector;
