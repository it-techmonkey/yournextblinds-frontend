import Image from 'next/image';

// Hero - Hero section with background image, headline, and CTA
const Hero = () => {
  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[734px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/home/hero/hero-background.jpg"
          alt="Elegant window blinds"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/30" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 pt-16 md:pt-24">
        <div className="max-w-[845px] text-center flex flex-col gap-5 md:gap-6 items-center">
          {/* Headline */}
          <h1 className="text-3xl md:text-4xl lg:text-[44px] text-black tracking-wide leading-[1.2]">
            <span className="font-light">Drill-free shutters built for a </span>
            <span className="font-medium italic">perfect fit</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-base md:text-lg lg:text-xl text-[#151515] leading-relaxed max-w-[680px]">
            Discover blinds designed to complement your space and lifestyle crafted for beauty, built to last.
          </p>
          
          {/* CTA Button */}
          <button className="mt-3 bg-[#00473c] text-white px-8 py-4 rounded text-base lg:text-lg font-medium tracking-wider hover:bg-[#003a31] transition-colors">
            Explore Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
