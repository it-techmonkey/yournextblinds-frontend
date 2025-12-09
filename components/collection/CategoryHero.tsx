import Image from 'next/image';

interface CategoryHeroProps {
  category: string;
  productCount: number;
}

// Category descriptions and images
const categoryData: Record<string, { description: string; image: string }> = {
  'Vertical Blinds': {
    description: 'Transform your windows with our elegant vertical blinds collection. Perfect for large windows and patio doors, offering excellent light control and privacy with style.',
    image: '/home/products/vertical-blinds-1.jpg',
  },
  'Roller Blinds': {
    description: 'Discover our versatile roller blinds range, combining sleek design with practical functionality. Ideal for any room, available in various fabrics and styles to suit your needs.',
    image: '/home/products/vertical-blinds-2.jpg',
  },
  'Metal Venetian Blinds': {
    description: 'Explore our premium venetian blinds collection. Timeless elegance meets modern functionality with our high-quality slat blinds in various materials and finishes.',
    image: '/home/products/vertical-blinds-5.jpg',
  },
  'Roman Blinds': {
    description: 'Add a touch of luxury to your space with our Roman blinds. Soft, elegant folds create a sophisticated look while providing excellent light control.',
    image: '/home/products/vertical-blinds-3.jpg',
  },
  'Day and Night Blinds': {
    description: 'Experience versatile light control with our innovative day and night blinds. Switch between privacy and natural light with ease.',
    image: '/home/products/vertical-blinds-4.jpg',
  },
  'Default': {
    description: 'Browse our premium collection of window blinds. Quality craftsmanship meets modern design to transform your living spaces.',
    image: '/home/products/blinds.jpeg',
  },
};

const CategoryHero = ({ category, productCount }: CategoryHeroProps) => {
  const data = categoryData[category] || categoryData['Default'];

  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-48 h-48 md:w-72 md:h-72 bg-[#00473c]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-[#00473c]/3 rounded-full blur-3xl" />
      
      <div className="max-w-[1400px] mx-auto relative">
        <div className="grid lg:grid-cols-2 min-h-[350px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px]">
          {/* Left Content */}
          <div className="flex items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-8 sm:py-10 md:py-12 lg:py-16">
            <div className="max-w-xl space-y-4 sm:space-y-5 md:space-y-6">
              <div className="inline-block">
                <span className="text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-[#00473c] font-semibold bg-[#00473c]/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                  {productCount} {productCount === 1 ? 'Product' : 'Products'} Available
                </span>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black leading-tight">
                  {category}
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                  {data.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-4 sm:gap-6 pt-2 sm:pt-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#00473c]/10 flex items-center justify-center">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#00473c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-700">Free Samples</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#00473c]/10 flex items-center justify-center">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#00473c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-700">Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-[250px] sm:h-[300px] md:h-[400px] lg:h-full">
            <Image
              src={data.image}
              alt={category}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent lg:from-white/60 lg:via-white/20" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryHero;
