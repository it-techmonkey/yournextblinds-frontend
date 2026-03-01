'use client';

import { useState } from 'react';

interface ProductDescriptionProps {
  description: string;
}

const ProductDescription = ({ description }: ProductDescriptionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const shortDescription = description.slice(0, 200);
  const needsExpansion = description.length > 200;

  return (
    <div className="flex flex-col gap-4 border-t border-[#e0e0e0] pt-6">
      <h3 className="text-base font-medium text-[#3a3a3a]">Product Details</h3>
      <p className="text-sm text-[#484848] leading-relaxed">
        {isExpanded || !needsExpansion ? description : `${shortDescription}...`}
      </p>
      {needsExpansion && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-[#00473c] font-medium hover:underline self-start"
        >
          {isExpanded ? 'Read less' : 'Read more'}
        </button>
      )}
    </div>
  );
};

export default ProductDescription;
