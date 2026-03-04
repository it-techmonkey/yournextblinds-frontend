'use client';

import Image from 'next/image';
import { useState } from 'react';

interface CassetteMatchingBarOption {
    id: string;
    name: string;
    price?: number;
    image?: string;
}

interface CassetteMatchingBarSelectorProps {
    options: CassetteMatchingBarOption[];
    selectedBar: string | null;
    onBarChange: (barId: string) => void;
}

const CassetteMatchingBarSelector = ({ options, selectedBar, onBarChange }: CassetteMatchingBarSelectorProps) => {
    const [hoveredOption, setHoveredOption] = useState<CassetteMatchingBarOption | null>(null);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium text-[#3a3a3a]">Cassette and Bottom Matching Bar</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {options.map((option) => (
                    <div
                        key={option.id}
                        className="relative"
                        onMouseEnter={() => setHoveredOption(option)}
                        onMouseLeave={() => setHoveredOption(null)}
                    >
                        <button
                            type="button"
                            onClick={() => onBarChange(option.id)}
                            className={`relative border-2 rounded-lg p-4 transition-all hover:border-[#00473c] flex flex-col items-center text-center h-full w-full ${
                                selectedBar === option.id
                                    ? 'border-[#00473c] bg-[#f6fffd] shadow-sm'
                                    : 'border-gray-200 bg-white hover:shadow-sm'
                            }`}
                        >
                            {/* Image */}
                            <div className="relative w-full aspect-video mb-3 bg-gray-50 rounded-md overflow-hidden flex items-center justify-center">
                                {option.image ? (
                                    <Image
                                        src={option.image}
                                        alt={option.name}
                                        fill
                                        className="object-contain p-2"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                        <span className="text-xs text-gray-300">No Image</span>
                                    </div>
                                )}
                            </div>

                            {/* Label & price */}
                            <div className="flex flex-col grow justify-between w-full gap-2">
                                <span className="text-sm font-medium text-[#3a3a3a] leading-tight">
                                    {option.name}
                                </span>
                                {option.price != null && option.price > 0 ? (
                                    <span className="text-[#00473c] text-xs font-bold">
                                        +${option.price.toFixed(2)}
                                    </span>
                                ) : (
                                    <span className="text-gray-400 text-xs">Included</span>
                                )}
                            </div>

                            {selectedBar === option.id && (
                                <div className="absolute top-2 right-2 w-5 h-5 bg-[#00473c] rounded-full flex items-center justify-center shadow-md z-10">
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            )}
                        </button>

                        {/* Hover popover */}
                        {hoveredOption?.id === option.id && option.image && (
                            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-20 pointer-events-none">
                                <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-2 max-w-[280px]">
                                    <div className="relative w-[260px] aspect-4/3 rounded-md overflow-hidden bg-gray-50">
                                        <Image
                                            src={option.image}
                                            alt={option.name}
                                            fill
                                            className="object-contain"
                                            sizes="260px"
                                        />
                                    </div>
                                    <p className="text-center text-sm font-medium text-[#3a3a3a] mt-2">
                                        {option.name}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CassetteMatchingBarSelector;

