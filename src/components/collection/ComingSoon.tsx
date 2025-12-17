import Link from 'next/link';

interface ComingSoonProps {
  categoryName: string;
}

export default function ComingSoon({ categoryName }: ComingSoonProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="text-center py-16 md:py-24 px-6">
        {/* Icon */}
        <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-[#00473c]/10 to-[#00473c]/5 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8">
          <svg 
            className="w-12 h-12 md:w-16 md:h-16 text-[#00473c]" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Coming Soon
        </h2>

        {/* Description */}
        <p className="text-base md:text-lg text-gray-600 max-w-lg mx-auto mb-8">
          We're working hard to bring you an amazing selection of <span className="font-semibold text-[#00473c]">{categoryName}</span>. 
          Check back soon or explore our other collections in the meantime.
        </p>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-5 h-5 text-[#00473c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Premium Quality</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-5 h-5 text-[#00473c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Free Samples</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-5 h-5 text-[#00473c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Fast Delivery</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/collections"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#00473c] text-white rounded-lg font-medium hover:bg-[#003830] transition-colors"
          >
            <span>Browse All Products</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white border-2 border-[#00473c] text-[#00473c] rounded-lg font-medium hover:bg-[#00473c]/5 transition-colors"
          >
            <span>Back to Home</span>
          </Link>
        </div>
      </div>

      {/* Bottom decorative element */}
      <div className="h-1 bg-gradient-to-r from-[#00473c]/20 via-[#00473c] to-[#00473c]/20" />
    </div>
  );
}
