import Link from 'next/link';
import Image from 'next/image';

// Footer - Site footer with links, contact info, and social media
const Footer = () => {
  return (
    <footer className="bg-white px-6 lg:px-20 py-12 lg:py-16">
      <div className="max-w-[1200px] mx-auto flex flex-col">
        {/* Top Section - Logo/Description and Nav */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 justify-between items-start">
          {/* Left Column - Logo and Description */}
          <div className="flex flex-col gap-5 max-w-[360px]">
            {/* Logo */}
            <Link href="/" className="flex gap-2 items-center">
              <Image src="/icons/logo.svg" alt="Your Next Blinds" width={19} height={23} />
              <span className="font-medium text-lg lg:text-xl text-[#00473c] leading-tight">
                Your <span className="italic">Next </span>Blinds
              </span>
            </Link>
            
            {/* Description */}
            <p className="text-sm text-[#666] leading-relaxed">
              The first free end-to-end analytics service for the site, designed to work with enterprises of various levels and business segments.
            </p>
          </div>
          
          {/* Right Column - Navigation Links */}
          <nav className="flex flex-wrap gap-6 lg:gap-8 text-sm text-[#484848]">
            <a href="#" className="hover:text-[#00473c] transition-colors">About.</a>
            <a href="#" className="hover:text-[#00473c] transition-colors">Testimonials.</a>
            <a href="#" className="hover:text-[#00473c] transition-colors">Pricing.</a>
            <a href="#" className="hover:text-[#00473c] transition-colors">Contacts.</a>
          </nav>
        </div>
        
        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mt-16 lg:mt-24">
          {/* Social Media Icons */}
          <div className="flex flex-col gap-3">
            <div className="flex gap-5">
              <a href="#" className="hover:opacity-70 transition-opacity">
                <Image src="/icons/okru.svg" alt="OK.ru" width={12} height={18} />
              </a>
            </div>
            <div className="flex gap-5">
              <a href="#" className="hover:opacity-70 transition-opacity">
                <Image src="/icons/vk.svg" alt="VK" width={18} height={11} />
              </a>
              <a href="#" className="hover:opacity-70 transition-opacity">
                <Image src="/icons/facebook.svg" alt="Facebook" width={16} height={16} />
              </a>
            </div>
            <div className="flex gap-5">
              <a href="#" className="hover:opacity-70 transition-opacity">
                <Image src="/icons/telegram.svg" alt="Telegram" width={17} height={14} />
              </a>
              <a href="#" className="hover:opacity-70 transition-opacity">
                <Image src="/icons/instagram.svg" alt="Instagram" width={16} height={16} />
              </a>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="text-xs text-[#666] leading-relaxed text-center">
            <p>© {new Date().getFullYear()} — Copyright</p>
            <p>All Rights reserved</p>
          </div>
          
          {/* Contact and Location */}
          <div className="flex flex-col gap-4">
            {/* Contact Info */}
            <div className="text-sm text-[#484848] leading-relaxed">
              <p>+1 (999) 888-77-66</p>
              <p>hello@logoipsum.com</p>
            </div>
            
            {/* Location */}
            <div className="text-sm text-[#484848] leading-relaxed">
              <p>483920, Moscow,</p>
              <p>Myasnitskaya 22/2/5, Office 4</p>
            </div>
          </div>
          
          {/* Languages */}
          <div className="flex gap-4 text-sm text-[#666]">
            <span className="hover:text-[#00473c] transition-colors cursor-pointer">Es</span>
            <span className="hover:text-[#00473c] transition-colors cursor-pointer">Fr</span>
            <span className="hover:text-[#00473c] transition-colors cursor-pointer">De</span>
            <span className="hover:text-[#00473c] transition-colors cursor-pointer">Ru</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
