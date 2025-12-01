import Image from 'next/image';

// Sample features data
const features = [
  {
    id: 1,
    title: 'First in your Letterbox',
    description: 'No need to stay in or wait around.',
  },
  {
    id: 2,
    title: 'Delivered in a Day',
    description: 'No need to stay in or wait around.',
  },
  {
    id: 3,
    title: 'Find Your Perfect Blinds',
    description: 'Choose from a wide range of Products',
  },
];

// FreeSamples - Fast, free samples section
const FreeSamples = () => {
  return (
    <section className="bg-neutral-50 px-6 lg:px-20 py-16 lg:py-24">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-10 lg:gap-12">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-medium text-[#3a3a3a] tracking-tight leading-tight">
            Fast, Free Samples
          </h2>
          <p className="text-base lg:text-lg text-[#484848] leading-relaxed max-w-[700px]">
            Feel the quality of blinds for yourself and enjoy up to 10 FREE samples of our blinds delivered at ZERO cost.
          </p>
        </div>
        
        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 justify-between">
          {/* Features */}
          <div className="flex flex-col justify-between h-auto lg:h-[480px] w-full lg:w-[380px]">
            <div className="flex flex-col gap-6 lg:gap-0 lg:justify-between lg:h-[380px]">
              {features.map((feature, index) => (
                <div key={feature.id}>
                  <div className="pb-5">
                    <h3 className="text-lg lg:text-xl font-medium text-[#3a3a3a] leading-snug mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-base lg:text-lg text-[#484848] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  {index < features.length - 1 && (
                    <div className="h-px bg-[#e1dcd4] w-full" />
                  )}
                </div>
              ))}
            </div>
            
            <button className="mt-8 lg:mt-0 w-fit bg-[#00473c] text-white px-8 py-4 rounded text-base lg:text-lg font-medium tracking-wider hover:bg-[#003a31] transition-colors">
              Order Now
            </button>
          </div>
          
          {/* Image */}
          <div className="relative w-full lg:w-[787px] h-[350px] lg:h-[525px]">
            <Image
              src="/home/samples.jpg"
              alt="Free samples"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeSamples;
