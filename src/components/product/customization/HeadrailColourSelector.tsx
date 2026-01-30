'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { PriceOption } from '@/types';

interface HeadrailColourSelectorProps {
    options: PriceOption[];
    selectedColour: string | null;
    onColourChange: (colourId: string) => void;
}

const HeadrailColourSelector = ({ options, selectedColour, onColourChange }: HeadrailColourSelectorProps) => {
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
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find((opt) => opt.id === selectedColour);

    const handleSelect = (optionId: string) => {
        onColourChange(optionId);
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium text-[#3a3a3a]">Headrail Colour</h3>
                <button
                    type="button"
                    className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center text-gray-400 text-xs hover:border-gray-600 hover:text-gray-600"
                >
                    ?
                </button>
            </div>

            {/* Custom Dropdown */}
            <div className="relative" ref={dropdownRef}>
                {/* Dropdown Trigger */}
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full px-4 py-3 pr-10 border-2 rounded-lg text-left cursor-pointer transition-colors bg-white ${isOpen ? 'border-[#00473c]' : 'border-gray-300'
                        } hover:border-[#00473c] focus:border-[#00473c] focus:outline-none`}
                >
                    {selectedOption ? (
                        <div className="flex items-center gap-3">
                            {/* Selected Option Image */}
                            {selectedOption.image && (
                                <div className="relative h-8 w-8 bg-gray-50 rounded border border-gray-200 flex-shrink-0">
                                    <Image
                                        src={selectedOption.image}
                                        alt={selectedOption.name}
                                        fill
                                        className="object-contain p-0.5"
                                    />
                                </div>
                            )}
                            {/* Selected Option Text */}
                            <span className="text-sm text-[#3a3a3a]">
                                {selectedOption.name}
                                {selectedOption.price != null && selectedOption.price > 0 && (
                                    <span className="text-[#00473c] font-medium ml-2">
                                        (+ ${selectedOption.price.toFixed(2)})
                                    </span>
                                )}
                            </span>
                        </div>
                    ) : (
                        <span className="text-sm text-gray-400">Select a headrail colour</span>
                    )}
                </button>

                {/* Dropdown Arrow */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                        className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-lg max-h-[320px] overflow-y-auto">
                        {options.map((option) => (
                            <button
                                key={option.id}
                                type="button"
                                onClick={() => handleSelect(option.id)}
                                className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${selectedColour === option.id ? 'bg-[#f6fffd]' : ''
                                    }`}
                            >
                                {/* Option Image */}
                                {option.image && (
                                    <div className="relative h-10 w-10 bg-gray-50 rounded border border-gray-200 flex-shrink-0">
                                        <Image
                                            src={option.image}
                                            alt={option.name}
                                            fill
                                            className="object-contain p-1"
                                        />
                                    </div>
                                )}

                                {/* Option Text */}
                                <div className="flex-1 text-left">
                                    <p className="text-sm font-medium text-[#3a3a3a]">{option.name}</p>
                                    {option.price != null && option.price > 0 && (
                                        <p className="text-xs text-[#00473c] font-semibold mt-0.5">
                                            + ${option.price.toFixed(2)}
                                        </p>
                                    )}
                                </div>

                                {/* Checkmark for selected */}
                                {selectedColour === option.id && (
                                    <div className="w-5 h-5 bg-[#00473c] rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Visual Preview with Images */}
            {selectedColour && (
                <div className="p-4 border-2 border-[#00473c] bg-[#f6fffd] rounded-lg">
                    {options
                        .filter((option) => option.id === selectedColour)
                        .map((option) => (
                            <div key={option.id} className="flex items-center gap-4">
                                {/* Image Preview */}
                                {option.image && (
                                    <div className="relative h-16 w-16 bg-white rounded border border-gray-200 flex-shrink-0">
                                        <Image
                                            src={option.image}
                                            alt={option.name}
                                            fill
                                            className="object-contain p-1"
                                        />
                                    </div>
                                )}

                                {/* Selected Option Details */}
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-[#3a3a3a]">{option.name}</p>
                                    {option.price != null && option.price > 0 && (
                                        <p className="text-xs text-[#00473c] font-semibold mt-1">
                                            +${option.price.toFixed(2)}
                                        </p>
                                    )}
                                </div>

                                {/* Checkmark */}
                                <div className="w-6 h-6 bg-[#00473c] rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default HeadrailColourSelector;
