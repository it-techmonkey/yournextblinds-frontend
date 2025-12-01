/**
 * Home Page - Your Next Blinds Landing Page
 * 
 * Figma Frame: Frame 1:13 - Landing Page
 * Figma URL: https://www.figma.com/design/cfiX2KehxmiRyV2HGi9h1F/Untitled--Copy-?node-id=1-13&m=dev
 * 
 * Component Breakdown:
 * - TopBar: Utility navigation bar with phone number and quick links (Get Help, Measure Size, etc.)
 * - Header: Logo and action icons (Search, User, Cart)
 * - NavBar: Main navigation with dropdown menus (Blind Types, Room, etc.)
 * - Hero: Hero section with background image, headline, and CTA button
 * - WindowTypes: "Find Your Match" section with 4 window type options
 * - Categories: "Popular Categories" grid with 5 category cards
 * - Installation: Professional installation service section with image
 * - BestSelling: Best selling products horizontal scroll/grid
 * - Craftsmanship: Yorkshire craftsmanship banner with background image
 * - FreeSamples: Free samples info section with features list and image
 * - FlashSale: Promotional flash sale banner
 * - FAQ: Accordion FAQ section
 * - Footer: Site footer with logo, links, contact info, social media, and languages
 */

import {
  TopBar,
  Header,
  NavBar,
  Hero,
  WindowTypes,
  Categories,
  Installation,
  BestSelling,
  Craftsmanship,
  FreeSamples,
  FlashSale,
  FAQ,
  Footer,
} from '@/components';

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header Section */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <TopBar />
        <Header />
        <NavBar />
      </header>

      {/* Main Content */}
      <main>
        <Hero />
        <WindowTypes />
        <Categories />
        <Installation />
        <BestSelling />
        <Craftsmanship />
        <FreeSamples />
        <FlashSale />
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
