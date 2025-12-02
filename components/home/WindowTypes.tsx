import Image from 'next/image';

// Window type data
const windowTypes = [
  {
    id: 1,
    name: 'Standard Window',
    icon: '/home/categories/standard-window.svg',
    width: 88,
    height: 140,
  },
  {
    id: 2,
    name: 'French Door',
    icon: '/home/categories/french-door.svg',
    width: 199,
    height: 140,
  },
  {
    id: 3,
    name: 'Specialty Window',
    icon: '/home/categories/specialty-window.svg',
    width: 93,
    height: 140,
  },
  {
    id: 4,
    name: 'Sliding Window',
    icon: '/home/categories/sliding-window.svg',
    width: 138,
    height: 140,
  },
];

// WindowTypes - "Find Your Match" section with window type options
const WindowTypes = () => {
  return (
    <section className="bg-[#f5fffd] px-6 lg:px-20 py-16 lg:py-20">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-10 lg:gap-14 items-center">
        {/* Header */}
        <div className="text-center max-w-[600px]">
          <h2 className="text-2xl md:text-3xl lg:text-[32px] font-medium text-black tracking-tight mb-3">
            Find Your Match
          </h2>
          <p className="text-base lg:text-lg text-[#484848] leading-relaxed">
            Start by selecting the shape of your window or door
          </p>
        </div>
        
        {/* Window Types Grid */}
        <div className="w-full flex flex-wrap justify-center lg:justify-between gap-8 lg:gap-4">
          {windowTypes.map((type) => (
            <button
              key={type.id}
              className="flex flex-col gap-5 items-center w-[174px] group"
            >
              <div className="h-[140px] flex items-center justify-center">
                <div 
                  className="relative transition-transform group-hover:scale-105"
                  style={{ width: type.width, height: type.height }}
                >
                  <Image
                    src={type.icon}
                    alt={type.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <span className="text-base lg:text-lg font-normal text-[#3a3a3a] text-center leading-snug">
                {type.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WindowTypes;
