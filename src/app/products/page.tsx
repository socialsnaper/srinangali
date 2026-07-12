import { Metadata } from 'next';
import { Suspense } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductsClient } from './ProductsClient';
import { prisma } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Products — Premium Rice & Pulses',
  description:
    'Browse our complete range of premium 1121 Basmati Rice varieties and quality pulses. Silver, Gold, Diamond grades and more.',
};

async function getProducts(category?: string) {
  try {
    return await prisma.product.findMany({
      where: {
        isActive: true,
        ...(category && category !== 'ALL' ? { category: category as 'RICE' | 'PULSES' | 'FMCG' | 'OTHER' } : {}),
      },
      orderBy: [{ isFeatured: 'desc' }, { category: 'asc' }, { name: 'asc' }],
    });
  } catch {
    return [];
  }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  const category = searchParams.category;
  const products = await getProducts(category);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-saffron to-saffron-800 text-white py-12">
          <div className="page-container">
            <p className="text-saffron-200 text-sm font-medium mb-2">
              🏠 Home / Products
            </p>
            <h1 className="font-heading text-3xl md:text-4xl font-bold">
              {category === 'RICE'
                ? '🌾 Premium Basmati Rice'
                : category === 'PULSES'
                ? '🫘 Quality Pulses & Dals'
                : 'All Products'}
            </h1>
            <p className="text-white/80 mt-2">
              {products.length} products available
            </p>
          </div>
        </div>

        <div className="page-container py-8">
          <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
            <ProductsClient
              initialProducts={products}
              initialCategory={category || 'ALL'}
            />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
