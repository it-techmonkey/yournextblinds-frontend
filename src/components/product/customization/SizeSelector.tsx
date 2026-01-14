'use client';

import { useState, useEffect } from 'react';

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
  const [widthInput, setWidthInput] = useState(width > 0 ? width.toString() : '');
  const [heightInput, setHeightInput] = useState(height > 0 ? height.toString() : '');

  // Sync input state when props change
  useEffect(() => {
    setWidthInput(width > 0 ? width.toString() : '');
  }, [width]);

  useEffect(() => {
    setHeightInput(height > 0 ? height.toString() : '');
  }, [height]);

  const handleWidthChange = (value: string) => {
    setWidthInput(value);
    if (value === '') {
      return; // Allow empty value
    }
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 20 && numValue <= 157) {
      onWidthChange(numValue);
    }
  };

  const handleHeightChange = (value: string) => {
    setHeightInput(value);
    if (value === '') {
      return; // Allow empty value
    }
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 20 && numValue <= 118) {
      onHeightChange(numValue);
    }
  };

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
                <input
                  type="number"
                  min="20"
                  max="157"
                  value={widthInput}
                  onChange={(e) => handleWidthChange(e.target.value)}
                  onBlur={(e) => {
                    if (e.target.value === '') {
                      setWidthInput('');
                      onWidthChange(0);
                      return;
                    }
                    const numValue = parseInt(e.target.value);
                    if (isNaN(numValue) || numValue < 20) {
                      setWidthInput('');
                      onWidthChange(0);
                    } else if (numValue > 157) {
                      setWidthInput('157');
                      onWidthChange(157);
                    } else {
                      setWidthInput(numValue.toString());
                      onWidthChange(numValue);
                    }
                  }}
                  className="text-base font-medium text-[#3a3a3a] bg-transparent border-none p-0 w-full focus:outline-none"
                  placeholder="20-157"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="border border-gray-300 rounded-lg px-3 py-2">
                <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">Eighths</div>
                <select
                  value={widthFraction}
                  onChange={(e) => onWidthFractionChange(e.target.value)}
                  className="text-base font-medium text-[#3a3a3a] bg-transparent border-none p-0 appearance-none cursor-pointer focus:outline-none w-full"
                >
                  {fractions.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
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
                <input
                  type="number"
                  min="20"
                  max="118"
                  value={heightInput}
                  onChange={(e) => handleHeightChange(e.target.value)}
                  onBlur={(e) => {
                    if (e.target.value === '') {
                      setHeightInput('');
                      onHeightChange(0);
                      return;
                    }
                    const numValue = parseInt(e.target.value);
                    if (isNaN(numValue) || numValue < 20) {
                      setHeightInput('');
                      onHeightChange(0);
                    } else if (numValue > 118) {
                      setHeightInput('118');
                      onHeightChange(118);
                    } else {
                      setHeightInput(numValue.toString());
                      onHeightChange(numValue);
                    }
                  }}
                  className="text-base font-medium text-[#3a3a3a] bg-transparent border-none p-0 w-full focus:outline-none"
                  placeholder="20-118"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="border border-gray-300 rounded-lg px-3 py-2">
                <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">Eighths</div>
                <select
                  value={heightFraction}
                  onChange={(e) => onHeightFractionChange(e.target.value)}
                  className="text-base font-medium text-[#3a3a3a] bg-transparent border-none p-0 appearance-none cursor-pointer focus:outline-none w-full"
                >
                  {fractions.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
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
