'use client';

import Image from 'next/image';
import type { HoneycombSubCategoryCard } from '@/data/honeycombCellularCatalog';

interface SubCategoryCardsProps {
  cards: HoneycombSubCategoryCard[];
  activeId: string;
  onSelect: (id: string) => void;
}

/**
 * Sub-category cards shown above a collection's product grid. Unlike the
 * homepage CategoryGrid these navigate nowhere — each one filters the grid in
 * place, so they are buttons with aria-pressed rather than links.
 */
const SubCategoryCards = ({ cards, activeId, onSelect }: SubCategoryCardsProps) => {
  if (cards.length === 0) return null;

  return (
    <div className="mb-8 md:mb-10">
      <h2 className="mb-3 text-base font-medium text-[#3a3a3a] md:mb-4 md:text-lg">
        Shop by type
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-5">
        {cards.map((card) => {
          const isActive = card.id === activeId;
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => onSelect(card.id)}
              aria-pressed={isActive}
              className={`group flex flex-col overflow-hidden rounded-sm border bg-white text-left transition-all duration-200 ${
                isActive
                  ? 'border-[#00473c] shadow-md ring-1 ring-[#00473c]'
                  : 'border-[#e8e8e8] hover:border-[#00473c] hover:shadow-md'
              }`}
            >
              <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-50">
                <Image
                  src={card.image}
                  alt={card.label}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {isActive && (
                  <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#00473c]">
                    <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                )}
              </div>

              <span
                className={`px-3 py-2.5 text-sm font-medium transition-colors md:text-base ${
                  isActive ? 'text-[#00473c]' : 'text-[#3a3a3a] group-hover:text-[#00473c]'
                }`}
              >
                {card.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SubCategoryCards;
