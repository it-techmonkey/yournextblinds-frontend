const FlashSale = () => {
  return (
    <section className="relative bg-[#00473c] overflow-hidden">
      <div className="absolute left-0 top-8 flex flex-col gap-4 w-[306px] -translate-x-1/3 opacity-25 hidden md:flex">
        <div className="h-[43px] bg-white/25" />
        <div className="h-[43px] bg-white/25" />
        <div className="h-[43px] bg-white/25" />
        <div className="h-[43px] bg-white/25" />
      </div>
      
      <div className="relative z-10 px-4 md:px-6 lg:px-20 py-12 md:py-16 lg:py-20 flex flex-col gap-6 md:gap-8 items-center">
        <div className="flex flex-col gap-2 md:gap-3 items-center text-center max-w-[700px]">
          <h2 className="text-xl md:text-2xl lg:text-[40px] font-semibold text-white tracking-tight leading-tight">
            OUR BIGGEST FLASH SALE EVER
          </h2>
          <p className="text-sm md:text-base lg:text-xl text-white/90 leading-relaxed">
            Up to 50% off + Get an Extra 15% Off with Code Sale15
          </p>
        </div>
        
        <button className="w-full md:w-fit bg-white text-[#00473c] px-6 md:px-8 py-3 md:py-4 rounded text-sm md:text-base lg:text-lg font-medium tracking-wider hover:bg-gray-100 transition-colors">
          Order Now
        </button>
      </div>
    </section>
  );
};

export default FlashSale;
