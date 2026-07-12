import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductImage } from '@/components/ui/ProductImage';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductDetailClient } from './ProductDetailClient';
import { prisma } from '@/lib/db';
import { getProductImageUrl, formatPrice, getDiscountPercentage } from '@/lib/utils';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { slug: id, isActive: true },
  });
  if (!product) return { title: 'Product Not Found' };
  return {
    title: product.name,
    description: product.description || undefined,
  };
}

async function getRelatedProducts(category: string, excludeId: string) {
  return prisma.product.findMany({
    where: { category: category as 'RICE' | 'PULSES' | 'FMCG' | 'OTHER', isActive: true, id: { not: excludeId } },
    take: 4,
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { slug: id, isActive: true },
  });

  if (!product) notFound();

  const related = await getRelatedProducts(product.category, product.id);
  const discount = getDiscountPercentage(product.price, product.mrp);

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen">
        <div className="page-container py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-saffron">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/products" className="hover:text-saffron">
              Products
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link
              href={`/products?category=${product.category}`}
              className="hover:text-saffron"
            >
              {product.category}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gray-800 font-medium truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>

          {/* Product Detail */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative aspect-square bg-gray-50">
                <ProductImage
                  src={getProductImageUrl(product.image)}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                {discount > 0 && (
                  <div className="absolute top-4 left-4 bg-saffron text-white px-3 py-1 rounded-full text-sm font-bold">
                    -{discount}% OFF
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-8 md:p-10">
                <div className="mb-3">
                  <span className="text-xs font-bold text-saffron uppercase tracking-wider bg-saffron-50 px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>

                <h1 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-gray-500 text-lg">/ {product.unit}</span>
                  {product.mrp > product.price && (
                    <span className="text-xl text-gray-400 line-through">
                      {formatPrice(product.mrp)}
                    </span>
                  )}
                </div>

                {/* Stock */}
                <div className="flex items-center gap-2 mb-6">
                  <div
                    className={`h-2 w-2 rounded-full ${product.stock > 10 ? 'bg-green-500' : product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  />
                  <span
                    className={`text-sm font-medium ${product.stock > 10 ? 'text-green-700' : product.stock > 0 ? 'text-yellow-700' : 'text-red-700'}`}
                  >
                    {product.stock > 10
                      ? 'In Stock'
                      : product.stock > 0
                      ? `Only ${product.stock} left`
                      : 'Out of Stock'}
                  </span>
                </div>

                {/* Description */}
                {product.description && (
                  <div className="mb-8">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      About this product
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                )}

                {/* Add to Cart */}
                <ProductDetailClient product={product} />

                {/* Trust Info */}
                <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl mb-1">🚚</div>
                    <p className="text-xs text-gray-500">Free delivery above ₹500</p>
                  </div>
                  <div>
                    <div className="text-2xl mb-1">🔒</div>
                    <p className="text-xs text-gray-500">Secure payment</p>
                  </div>
                  <div>
                    <div className="text-2xl mb-1">✅</div>
                    <p className="text-xs text-gray-500">Quality certified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div className="mt-14">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">
                Related Products
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {related.map((p) => (
                  <Link
                    key={p.id}
                    href={`/products/${p.slug}`}
                    className="product-card p-4 group"
                  >
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3">
                      <ProductImage
                        src={getProductImageUrl(p.image)}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <p className="font-medium text-sm text-gray-800 group-hover:text-saffron transition-colors line-clamp-2">
                      {p.name}
                    </p>
                    <p className="font-bold text-gray-900 mt-1">
                      {formatPrice(p.price)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
