'use client';

import { ProductReview } from '@/types/product';

interface ProductReviewsProps {
  reviews: ProductReview[];
  averageRating: number;
  totalReviews: number;
}

const ProductReviews = ({ reviews, averageRating, totalReviews }: ProductReviewsProps) => {
  // Calculate rating distribution
  const ratingCounts = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length
  }));
  
  const maxCount = Math.max(...ratingCounts.map(r => r.count), 1);

  // Star component
  const Star = ({ filled = true }: { filled?: boolean }) => (
    <svg
      className={`w-[18px] h-[18px] ${filled ? 'text-[#e7b66b]' : 'text-gray-300'}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  const SmallStar = ({ filled = true }: { filled?: boolean }) => (
    <svg
      className={`w-4 h-4 ${filled ? 'text-[#e7b66b]' : 'text-gray-300'}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  return (
    <div className="flex flex-col gap-7">
      {/* Reviews Overview */}
      <div className="bg-white rounded-lg px-4 py-5 border border-gray-200">
        <div className="flex items-start justify-between">
          {/* Left side - Rating summary and bars */}
          <div className="flex items-end gap-8 lg:gap-16">
            {/* Rating Number & Stars */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-medium text-[#0d0c22]">Reviews</h3>
              <div className="flex flex-col gap-1">
                <span className="text-[32px] font-bold text-black leading-[34px]">{averageRating.toFixed(1)}</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} filled={star <= Math.round(averageRating)} />
                  ))}
                </div>
                <span className="text-xs font-medium text-[#858585]">({totalReviews} Reviews)</span>
              </div>
            </div>

            {/* Rating Bars */}
            <div className="flex items-center gap-2">
              {/* Labels */}
              <div className="flex flex-col gap-[7px] items-end">
                {['5 stars', '4 stars', '3 stars', '2 stars', '1 star'].map((label) => (
                  <span key={label} className="text-[10px] font-medium text-black whitespace-nowrap">{label}</span>
                ))}
              </div>
              
              {/* Bars */}
              <div className="flex flex-col gap-4 relative">
                {ratingCounts.map(({ rating, count }) => (
                  <div key={rating} className="relative">
                    <div className="w-[200px] lg:w-[351px] h-1.5 bg-[#f2f6fb] rounded-lg" />
                    <div
                      className="absolute top-0 left-0 h-1.5 bg-[#e7b66b] rounded-lg"
                      style={{ width: `${(count / maxCount) * 100}%` }}
                    />
                  </div>
                ))}
              </div>

              {/* Counts */}
              <div className="flex flex-col gap-1 items-start">
                {ratingCounts.map(({ rating, count }) => (
                  <span
                    key={rating}
                    className={`text-[10px] font-medium leading-[18px] ${count > 0 ? 'text-[#0d0c22]' : 'text-[#858585]'}`}
                  >
                    {count}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Review Button */}
          <button className="bg-black text-white text-sm font-medium px-3 py-3 hover:bg-gray-800 transition-colors">
            Review this Product
          </button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white p-3">
        {reviews.map((review, index) => (
          <div key={review.id}>
            <div className="flex flex-col gap-3 py-3">
              {/* Date */}
              <span className="text-xs font-medium text-[#858585] leading-5">{review.date}</span>
              
              {/* Stars */}
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <SmallStar key={star} filled={star <= review.rating} />
                ))}
              </div>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#f2f6fb] flex items-center justify-center">
                  <span className="text-sm font-medium text-[#5465ff]">
                    {review.author.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                  </span>
                </div>
                <span className="text-sm font-medium text-[#0d0c22]">{review.author}</span>
              </div>
              
              {/* Review Text */}
              <p className="text-sm text-[#0d0c22] leading-[18px]">{review.content}</p>
            </div>
            
            {/* Divider - not on last item */}
            {index < reviews.length - 1 && (
              <div className="h-[2px] w-full bg-[#f8f7f4]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
