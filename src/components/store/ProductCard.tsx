'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Star, Eye } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DiscountBadge } from '@/components/ui/Badge';
import { useCartStore } from '@/store/cartStore';
import { Product } from '@/types';
import {
  formatPrice,
  getDiscountPercentage,
  getProductImageUrl,
  truncateText,
} from '@/lib/utils';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, openCart } = useCartStore();
  const discount = getDiscountPercentage(product.price, product.mrp);
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOutOfStock) return;

    addItem({
      id: `cart-${product.id}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      mrp: product.mrp,
      image: product.image,
      stock: product.stock,
    });

    toast.success(`${product.name} added to cart!`, {
      icon: '🛒',
    });
    openCart();
  };

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="product-card h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={getProductImageUrl(product.image)}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/product-placeholder.svg';
            }}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {discount > 0 && <DiscountBadge discount={discount} />}
            {product.isFeatured && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-forest text-white">
                Featured
              </span>
            )}
            {isOutOfStock && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-gray-600 text-white">
                Out of Stock
              </span>
            )}
          </div>

          {/* Quick View on hover */}
          <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <button
              onClick={(e) => {
                e.preventDefault();
              }}
              className="w-full bg-white/90 backdrop-blur text-gray-800 text-xs font-semibold py-2 rounded-lg flex items-center justify-center gap-1.5 hover:bg-white transition-colors"
            >
              <Eye className="h-3.5 w-3.5" />
              Quick View
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col flex-1">
          {/* Category */}
          <span className="text-xs font-semibold text-saffron uppercase tracking-wider mb-1">
            {product.category}
          </span>

          {/* Name */}
          <h3 className="font-semibold text-gray-800 text-sm mb-1 leading-snug group-hover:text-saffron transition-colors font-heading">
            {truncateText(product.name, 40)}
          </h3>

          {/* Description */}
          {product.description && (
            <p className="text-gray-500 text-xs leading-relaxed mb-3 flex-1">
              {truncateText(product.description, 70)}
            </p>
          )}

          {/* Rating placeholder */}
          <div className="flex items-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i <= 4 ? 'fill-gold text-gold' : 'text-gray-300'}`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">(4.0)</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.mrp > product.price && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.mrp)}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500">/ {product.unit}</span>
          </div>

          {/* Add to Cart */}
          <Button
            variant="primary"
            size="sm"
            fullWidth
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            className="mt-auto"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </Link>
  );
}
