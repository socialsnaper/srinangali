'use client';

import { useState } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/cartStore';
import { Product } from '@/types';
import toast from 'react-hot-toast';

export function ProductDetailClient({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const { addItem, updateQuantity, items, openCart } = useCartStore();

  const existingItem = items.find((i) => i.productId === product.id);
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;

    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + qty);
    } else {
      for (let i = 0; i < qty; i++) {
        addItem({
          id: `cart-${product.id}`,
          productId: product.id,
          name: product.name,
          price: product.price,
          mrp: product.mrp,
          image: product.image,
          stock: product.stock,
        });
      }
    }

    toast.success(`${qty} × ${product.name} added to cart!`);
    openCart();
  };

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700">Quantity:</span>
        <div className="flex items-center gap-2 border border-gray-200 rounded-xl p-1">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="h-9 w-9 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
            disabled={qty <= 1}
          >
            <Minus className="h-4 w-4 text-gray-600" />
          </button>
          <span className="w-10 text-center font-bold text-gray-800">
            {qty}
          </span>
          <button
            onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
            className="h-9 w-9 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
            disabled={qty >= product.stock}
          >
            <Plus className="h-4 w-4 text-gray-600" />
          </button>
        </div>
        <span className="text-sm text-gray-500">
          {product.unit} available: {product.stock}
        </span>
      </div>

      <Button
        size="lg"
        fullWidth
        disabled={isOutOfStock}
        onClick={handleAddToCart}
        className="text-base"
      >
        <ShoppingCart className="h-5 w-5" />
        {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
      </Button>
    </div>
  );
}
