import Image from 'next/image';

// Craftsmanship - Yorkshire craftsmanship banner section
const Craftsmanship = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/home/craftsmanship-bg.jpg"
          alt="Yorkshire craftsmanship"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 px-6 lg:px-20 py-20 lg:py-28">
        <div className="max-w-[900px] flex flex-col gap-8">
          <div className="flex flex-col gap-5">
            <h2 className="text-3xl md:text-4xl lg:text-[46px] font-light text-white tracking-tight leading-[1.2] max-w-[800px]">
              Proudly Designed and Manufactured at{' '}
              <span className="font-medium italic">Yorkshire</span>
            </h2>
            <p className="text-base lg:text-xl text-white/80 leading-relaxed max-w-[700px]">
              Locally crafted in Yorkshire, our blinds are made with care, quality, and sustainability. With local production and skilled craftsmanship, we ensure perfect fit, lasting durability, and quicker lead times.
            </p>
          </div>
          
          <button className="w-fit border border-white text-white px-8 py-3.5 rounded-full text-base lg:text-lg font-medium tracking-wide hover:bg-white hover:text-black transition-colors">
            Discover Craftsmanship
          </button>
        </div>
      </div>
    </section>
  );
};

export default Craftsmanship;
