import Image from 'next/image';

interface ProductHeaderProps {
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  estimatedDelivery: string;
}

const ProductHeader = ({ name, category, rating, reviewCount, estimatedDelivery }: ProductHeaderProps) => {
  return (
    <div className="flex flex-col gap-3">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#666]">
        <a href="/" className="hover:text-[#00473c] transition-colors">{category}</a>
        <span>›</span>
        <span className="text-[#3a3a3a]">{name}</span>
      </nav>
      
      {/* Title */}
      <h1 className="text-2xl lg:text-3xl font-medium text-[#3a3a3a]">{name}</h1>
      
      {/* Delivery & Rating Row */}
      <div className="flex flex-wrap items-center gap-4">
        <p className="text-sm text-[#666]">
          Estimated Shipping Date: <span className="text-[#3a3a3a] font-medium">{estimatedDelivery}</span>
        </p>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Image
              key={star}
              src={star <= rating ? '/icons/Star.svg' : '/icons/starEmpty.svg'}
              alt=""
              width={16}
              height={16}
            />
          ))}
          <span className="text-sm text-[#666] ml-1">({reviewCount})</span>
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;
