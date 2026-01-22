'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface BracketTypeOption {
    id: string;
    name: string;
    description?: string;
    price?: number;
    image?: string;
}

interface BracketTypeSelectorProps {
    options: BracketTypeOption[];
    selectedBracket: string | null;
    onBracketChange: (bracketId: string) => void;
}

const BracketTypeSelector = ({ options, selectedBracket, onBracketChange }: BracketTypeSelectorProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, width: 0 });
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
                menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (isOpen && buttonRef.current) {
            const updateMenuPosition = () => {
                if (buttonRef.current) {
                    const buttonRect = buttonRef.current.getBoundingClientRect();
                    
                    // Calculate position - always open below
                    const left = buttonRect.left;
                    const width = buttonRect.width;
                    
                    setMenuPosition({
                        top: buttonRect.bottom + 4,
                        left,
                        width,
                    });
                }
            };

            updateMenuPosition();
            
            window.addEventListener('scroll', updateMenuPosition, true);
            window.addEventListener('resize', updateMenuPosition);
            
            return () => {
                window.removeEventListener('scroll', updateMenuPosition, true);
                window.removeEventListener('resize', updateMenuPosition);
            };
        }
    }, [isOpen]);

    const selectedOption = options.find(opt => opt.id === selectedBracket);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium text-[#3a3a3a]">Bracket Type</h3>
                <button
                    type="button"
                    className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center text-gray-400 text-xs hover:border-gray-600 hover:text-gray-600"
                >
                    ?
                </button>
            </div>

            {/* Custom Dropdown */}
            <div className="relative" ref={dropdownRef}>
                <button
                    ref={buttonRef}
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full border-2 border-gray-300 rounded-lg p-3 bg-white text-left flex items-center justify-between hover:border-[#00473c] transition-colors"
                >
                    <span className="text-[#3a3a3a] font-medium">
                        {selectedOption ? selectedOption.name : 'Select option'}
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
                    <>
                        {/* Backdrop to capture clicks outside */}
                        <div 
                            className="fixed inset-0 z-[99998]" 
                            onClick={() => setIsOpen(false)}
                        />
                        {/* Dropdown menu with fixed positioning to escape overflow constraints - always opens below */}
                        <div
                            ref={menuRef}
                            className="fixed z-[99999] bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-y-auto"
                            style={{
                                top: `${menuPosition.top}px`,
                                left: `${menuPosition.left}px`,
                                width: `${menuPosition.width}px`,
                                maxHeight: '320px',
                            }}
                        >
                        {options.map((option) => (
                            <button
                                key={option.id}
                                type="button"
                                onClick={() => {
                                    onBracketChange(option.id);
                                    setIsOpen(false);
                                }}
                                className={`w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100 last:border-0 ${selectedBracket === option.id ? 'bg-[#f6fffd]' : ''
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
                                    <p className={`text-sm font-medium ${selectedBracket === option.id ? 'text-[#00473c]' : 'text-[#3a3a3a]'}`}>
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
                    </>
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
                        {selectedOption.description && (
                            <p className="text-gray-500 text-sm mt-1">{selectedOption.description}</p>
                        )}
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

export default BracketTypeSelector;
