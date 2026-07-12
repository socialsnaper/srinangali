'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/Button';
import { formatPrice, getProductImageUrl } from '@/lib/utils';

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getSubtotal,
    getItemCount,
  } = useCartStore();

  const drawerRef = useRef<HTMLDivElement>(null);
  const subtotal = getSubtotal();
  const itemCount = getItemCount();
  const FREE_SHIPPING_THRESHOLD = 500;
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 60;
  const total = subtotal + shippingCost;

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(e.target as Node)
      ) {
        closeCart();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closeCart]);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [closeCart]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div className="absolute inset-0 cart-overlay" onClick={closeCart} />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-in-right"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-saffron" />
            <h2 className="font-heading font-bold text-gray-900 text-lg">
              Your Cart
            </h2>
            {itemCount > 0 && (
              <span className="bg-saffron text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Free shipping progress */}
        {subtotal < FREE_SHIPPING_THRESHOLD && subtotal > 0 && (
          <div className="px-5 py-3 bg-saffron-50">
            <p className="text-xs text-saffron-800 mb-1.5">
              Add{' '}
              <strong>{formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)}</strong>{' '}
              more for FREE shipping! 🎉
            </p>
            <div className="h-1.5 bg-saffron-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-saffron rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        )}
        {subtotal >= FREE_SHIPPING_THRESHOLD && items.length > 0 && (
          <div className="px-5 py-3 bg-forest-50">
            <p className="text-xs text-forest-700 font-semibold">
              🎉 You&apos;ve got FREE shipping!
            </p>
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto py-2">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-20 px-6 text-center">
              <div className="text-7xl mb-4">🛒</div>
              <h3 className="font-heading font-semibold text-gray-800 text-lg mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Add some delicious rice and pulses to get started!
              </p>
              <button onClick={closeCart} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm bg-saffron text-white font-semibold rounded-lg hover:bg-saffron-800 transition-all">
                <Link href="/products" onClick={closeCart}>Browse Products</Link>
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {items.map((item) => (
                <li key={item.productId} className="p-4 flex gap-3">
                  {/* Image */}
                  <div className="relative h-18 w-18 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                    <Image
                      src={getProductImageUrl(item.image)}
                      alt={item.name}
                      width={72}
                      height={72}
                      className="object-cover h-full w-full"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          '/images/product-placeholder.svg';
                      }}
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {formatPrice(item.price)} / kg
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity */}
                      <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-0.5">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                          className="h-6 w-6 flex items-center justify-center hover:bg-white rounded-md transition-colors text-gray-600"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-semibold w-5 text-center text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          disabled={item.quantity >= item.stock}
                          className="h-6 w-6 flex items-center justify-center hover:bg-white rounded-md transition-colors text-gray-600 disabled:opacity-40"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="p-1 hover:text-red-500 text-gray-400 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-5 space-y-4 bg-white">
            {/* Summary */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span
                  className={
                    shippingCost === 0 ? 'text-forest font-medium' : ''
                  }
                >
                  {shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-100">
                <span>Total</span>
                <span className="text-lg">{formatPrice(total)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base bg-saffron hover:bg-saffron-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-sm"
            >
              Proceed to Checkout
              <ArrowRight className="h-4 w-4" />
            </Link>

            <button
              onClick={closeCart}
              className="w-full text-sm text-gray-500 hover:text-gray-700 text-center transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
