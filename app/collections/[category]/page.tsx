import { TopBar, Header, NavBar, Footer } from '@/components';
import { CategoryHero, CollectionFilters, CollectionProductGrid } from '@/components/collection';
import productsData from '@/data/products.json';

// Category mapping for URL to display name
const categoryMapping: Record<string, string> = {
  'vertical-blinds': 'Vertical Blinds',
  'roller-blinds': 'Roller Blinds',
  'venetian-blinds': 'Venetian Blinds',
  'roman-blinds': 'Roman Blinds',
  'wooden-blinds': 'Wooden Blinds',
  'skylight-blinds': 'Skylight Blinds',
  'day-and-night-blinds': 'Day and Night Blinds',
  'children': 'Children',
};

// Generate static params for all categories
export function generateStaticParams() {
  return Object.keys(categoryMapping).map((category) => ({
    category,
  }));
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { category } = await params;
  const filters = await searchParams;

  // Get category display name
  const categoryName = categoryMapping[category];

  // Get all products
  let filteredProducts = productsData.products;

  // Apply category filter from URL path
  if (categoryName) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === categoryName
    );
  }

  // Apply pattern filter
  const pattern = filters.pattern;
  if (pattern && typeof pattern === 'string') {
    // Pattern filtering will work when pattern field is added to products
  }

  // Apply color filter
  const color = filters.color;
  if (color && typeof color === 'string') {
    // Color filtering will work when color field is added to products
  }

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <TopBar />
        <Header />
        <NavBar />
      </header>

      {/* Hero Section */}
      <CategoryHero category={categoryName} productCount={filteredProducts.length} />

      {/* Main Collection Page */}
      <div className="min-h-screen bg-gray-50">
        {/* Main Content Area */}
        <div className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8">
            {/* Left Sidebar - Filters (Desktop) */}
            <aside className="w-full lg:w-72 shrink-0 hidden lg:block">
              <div className="sticky top-24">
                <CollectionFilters 
                  currentCategory={category}
                  activeFilters={{
                    pattern: typeof pattern === 'string' ? pattern : undefined,
                    color: typeof color === 'string' ? color : undefined,
                  }}
                />
              </div>
            </aside>

            {/* Right Content - Products */}
            <main className="flex-1 min-w-0">
              <CollectionProductGrid 
                products={filteredProducts}
                currentCategory={category}
                activeFilters={{
                  pattern: typeof pattern === 'string' ? pattern : undefined,
                  color: typeof color === 'string' ? color : undefined,
                }}
              />
            </main>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
