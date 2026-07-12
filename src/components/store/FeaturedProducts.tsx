import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { Product } from '@/types';

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="page-container">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-saffron font-semibold text-sm uppercase tracking-widest mb-2">
              Handpicked for You
            </p>
            <h2 className="section-title">Featured Products</h2>
          </div>
          <Link
            href="/products"
            className="hidden sm:flex items-center gap-2 text-saffron font-semibold text-sm hover:gap-3 transition-all"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-saffron font-semibold"
          >
            View All Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
