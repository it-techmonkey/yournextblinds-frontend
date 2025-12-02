import Link from 'next/link';
import Image from 'next/image';

// Header - Main header with logo and action icons
const Header = () => {
  return (
    <div className="bg-white backdrop-blur-sm px-6 lg:px-20 py-5 lg:py-6 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex gap-2 items-center">
        <Image src="/icons/logo.svg" alt="Your Next Blinds" width={19} height={23} />
        <span className="font-medium text-lg lg:text-[23px] text-[#00473c] leading-tight">
          Your <span className="italic">Next </span>Blinds
        </span>
      </Link>
      
      {/* Action Icons */}
      <div className="flex gap-5 lg:gap-6 items-center">
        <button aria-label="Search" className="hover:opacity-70 transition-opacity">
          <Image src="/icons/search.svg" alt="Search" width={24} height={24} />
        </button>
        <button aria-label="Account" className="hover:opacity-70 transition-opacity">
          <Image src="/icons/profile.svg" alt="Profile" width={24} height={24} />
        </button>
        <button aria-label="Cart" className="hover:opacity-70 transition-opacity relative">
          <Image src="/icons/cart.svg" alt="Cart" width={24} height={24} />
        </button>
      </div>
    </div>
  );
};

export default Header;
