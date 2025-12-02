import Image from 'next/image';

// Navigation items
const navItems = [
  { label: 'Blind Types', hasDropdown: true },
  { label: 'Room', hasDropdown: true },
  { label: 'Drill Blinds', hasDropdown: true },
  { label: 'Window Type', hasDropdown: true },
  { label: 'Solution', hasDropdown: true },
];

// NavBar - Main navigation menu
const NavBar = () => {
  return (
    <nav className="bg-white border-t border-[#eaeaea] backdrop-blur-sm px-6 lg:px-20 py-3">
      <div className="flex gap-6 lg:gap-12 items-center overflow-x-auto scrollbar-hide">
        {navItems.map((item) => (
          <button
            key={item.label}
            className="flex gap-1.5 items-center text-[15px] text-black whitespace-nowrap hover:text-[#00473c] transition-colors"
          >
            <span>{item.label}</span>
            {item.hasDropdown && <Image src="/icons/CaretDown.svg" alt="" width={16} height={16} className="opacity-70" />}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
