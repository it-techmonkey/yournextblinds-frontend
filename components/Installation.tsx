import Image from 'next/image';

// Installation - Professional installation section
const Installation = () => {
  return (
    <section className="relative px-6 lg:px-20 py-16 lg:py-24 overflow-hidden">
      {/* Decorative bars on the right - positioned relative to section */}
      <div className="hidden lg:flex flex-col gap-6 absolute top-1/2 -translate-y-1/2 right-0">
        <div className="w-[200px] h-8 bg-[#00473c]" />
        <div className="w-[200px] h-8 bg-[#00473c]" />
        <div className="w-[200px] h-8 bg-[#00473c]" />
      </div>

      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-20 items-center">
        {/* Content */}
        <div className="flex flex-col gap-8 max-w-[520px]">
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl md:text-3xl lg:text-[32px] font-medium text-[#3a3a3a] tracking-tight leading-snug">
              Professional Installation Available at your Doorstep
            </h2>
            <p className="text-base lg:text-lg text-[#484848] leading-relaxed">
              We offer a complete blinds installation service. Simply order your chosen blinds and add contact us about installation once your order is confirmed. Our team will give you a call to arrange a convenient installation date and time.
            </p>
          </div>
          <button className="w-fit bg-[#00473c] text-white px-8 py-4 rounded text-base lg:text-lg font-medium tracking-wider hover:bg-[#003a31] transition-colors">
            Book Now
          </button>
        </div>
        
        {/* Image */}
        <div className="relative w-full lg:w-[578px] h-[350px] lg:h-[488px]">
          <Image
            src="/home/installation.jpg"
            alt="Professional installation"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Installation;
