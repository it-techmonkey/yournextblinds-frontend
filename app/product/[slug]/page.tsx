import { notFound } from 'next/navigation';
import productsData from '@/data/products.json';
import { Product, Room, MountOption } from '@/types/product';
import { ProductPage } from '@/components/product';
import { TopBar, Header, FlashSale, FAQ, Footer } from '@/components';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all products
export async function generateStaticParams() {
  return productsData.products.map((product) => ({
    slug: product.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = productsData.products.find((p) => p.slug === slug);
  
  if (!product) {
    return {
      title: 'Product Not Found | Your Next Blinds',
    };
  }
  
  return {
    title: `${product.name} | Your Next Blinds`,
    description: product.description,
  };
}

export default async function ProductPageRoute({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = productsData.products.find((p) => p.slug === slug) as Product | undefined;
  
  if (!product) {
    notFound();
  }
  
  // Get related products (same category, excluding current product)
  const relatedProducts = productsData.products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4) as Product[];
  
  // If not enough related products in same category, add from other categories
  if (relatedProducts.length < 4) {
    const otherProducts = productsData.products
      .filter((p) => p.slug !== product.slug && !relatedProducts.includes(p as Product))
      .slice(0, 4 - relatedProducts.length) as Product[];
    relatedProducts.push(...otherProducts);
  }
  
  const rooms = productsData.rooms as Room[];
  const mountOptions = productsData.mountOptions as MountOption[];
  
  return (
    <>
      <TopBar />
      <Header />
      <main className="bg-white min-h-screen">
        <ProductPage
          product={product}
          relatedProducts={relatedProducts}
          rooms={rooms}
          mountOptions={mountOptions}
        />
        <FlashSale />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
