import Link from 'next/link';
import { navigationData } from '@/data/navigation';

const EXCLUDED_LABELS = new Set(['All blinds and shades']);

const categoryItems = navigationData
  .filter((item) => item.submenu)
  .flatMap((item) =>
    (item.submenu ?? [])
      .filter((sub) => sub.href && !EXCLUDED_LABELS.has(sub.label))
      .map((sub) => ({
        label: sub.label,
        href: sub.href!,
      }))
  );

const CategoryGrid = () => {
  return (
    <section className="bg-neutral-50 py-12 md:py-16 lg:py-20 border-y border-[#e8e8e8]">
      <div className="px-4 md:px-6 lg:px-20">
        {/* Heading */}
        <div className="mb-8 md:mb-10">
          <h2 className="text-xl md:text-2xl lg:text-[32px] font-medium text-[#3a3a3a] tracking-tight">
            Shop by Category
          </h2>
          <p className="mt-2 text-sm md:text-base text-[#6b6b6b]">
            Browse our full range of made-to-measure window coverings
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {categoryItems.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group flex items-center justify-between px-4 py-3.5 md:px-5 md:py-4 bg-white border border-[#e8e8e8] rounded-sm hover:border-[#00473c] hover:bg-[#f7faf9] transition-all duration-200"
            >
              <span className="text-sm md:text-[15px] font-medium text-[#3a3a3a] leading-snug group-hover:text-[#00473c] transition-colors duration-200">
                {cat.label}
              </span>
              <svg
                className="shrink-0 ml-2 text-[#b0b0b0] group-hover:text-[#00473c] transition-colors duration-200"
                width="16" height="16" viewBox="0 0 16 16" fill="none"
              >
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
