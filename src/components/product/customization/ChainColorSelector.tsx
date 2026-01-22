'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface ChainColorOption {
    id: string;
    name: string;
    price?: number;
    image?: string;
}

interface ChainColorSelectorProps {
    options: ChainColorOption[];
    selectedColor: string | null;
    onColorChange: (colorId: string) => void;
}

const ChainColorSelector = ({ options, selectedColor, onColorChange }: ChainColorSelectorProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const selectedOption = options.find(opt => opt.id === selectedColor);

    return (
        <div className="flex flex-col gap-4">
            {/* Custom Dropdown */}
            <div className="relative" ref={dropdownRef}>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full border-2 border-gray-300 rounded-lg p-3 bg-white text-left flex items-center justify-between hover:border-[#00473c] transition-colors"
                >
                    <span className="text-[#3a3a3a] font-medium">
                        {selectedOption ? selectedOption.name : 'Select chain color'}
                    </span>
                    <svg
                        className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
                        {options.map((option) => (
                            <button
                                key={option.id}
                                type="button"
                                onClick={() => {
                                    onColorChange(option.id);
                                    setIsOpen(false);
                                }}
                                className={`w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100 last:border-0 ${selectedColor === option.id ? 'bg-[#f6fffd]' : ''
                                    }`}
                            >
                                {/* Thumbnail Image */}
                                {option.image && (
                                    <div className="w-10 h-10 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 border border-gray-200">
                                        <Image
                                            src={option.image}
                                            alt={option.name}
                                            width={40}
                                            height={40}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                )}

                                <div className="flex-grow">
                                    <p className={`text-sm font-medium ${selectedColor === option.id ? 'text-[#00473c]' : 'text-[#3a3a3a]'}`}>
                                        {option.name}
                                    </p>
                                </div>

                                {option.price && option.price > 0 ? (
                                    <span className="text-xs font-semibold bg-[#00473c] text-white px-2 py-1 rounded">
                                        +£{option.price.toFixed(2)}
                                    </span>
                                ) : null}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Preview of selected option */}
            {selectedOption && (
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex items-center gap-4">
                    {selectedOption.image && (
                        <div className="w-20 h-20 bg-white rounded-md overflow-hidden border border-gray-200 flex-shrink-0 flex items-center justify-center">
                            <Image
                                src={selectedOption.image}
                                alt={selectedOption.name}
                                width={80}
                                height={80}
                                className="object-contain"
                            />
                        </div>
                    )}
                    <div>
                        <p className="font-medium text-[#3a3a3a]">{selectedOption.name}</p>
                        {selectedOption.price && selectedOption.price > 0 ? (
                            <p className="text-[#00473c] font-bold mt-1">+£{selectedOption.price.toFixed(2)}</p>
                        ) : (
                            <p className="text-gray-500 text-sm mt-1">Included in price</p>
                        )}
                        <div className="flex items-center gap-1 mt-2 text-[#00473c] text-xs font-medium">
                            <div className="w-4 h-4 rounded-full bg-[#00473c] flex items-center justify-center">
                                <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            Selected
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChainColorSelector;
