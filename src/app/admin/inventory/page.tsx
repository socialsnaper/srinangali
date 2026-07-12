'use client';

import { useEffect, useState, useCallback } from 'react';
import { AlertTriangle, Package, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function AdminInventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [stockUpdates, setStockUpdates] = useState<Record<string, string>>({});

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products?limit=100');
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleStockUpdate = async (productId: string) => {
    const newStock = stockUpdates[productId];
    if (!newStock || isNaN(parseInt(newStock))) {
      toast.error('Please enter a valid stock number');
      return;
    }

    setUpdating(productId);
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: parseInt(newStock) }),
      });
      if (res.ok) {
        toast.success('Stock updated!');
        setStockUpdates((prev) => {
          const updated = { ...prev };
          delete updated[productId];
          return updated;
        });
        fetchProducts();
      }
    } catch {
      toast.error('Failed to update stock');
    } finally {
      setUpdating(null);
    }
  };

  const lowStock = products.filter((p) => p.stock <= 10 && p.isActive);
  const outOfStock = products.filter((p) => p.stock === 0 && p.isActive);

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-gray-900">
            Inventory Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage stock levels for all products
          </p>
        </div>
        <Button variant="ghost" onClick={fetchProducts}>
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Alerts */}
      {outOfStock.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-700 text-sm">
              {outOfStock.length} product(s) out of stock!
            </p>
            <p className="text-red-600 text-xs mt-1">
              {outOfStock.map((p) => p.name).join(', ')}
            </p>
          </div>
        </div>
      )}

      {lowStock.length > 0 && outOfStock.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-yellow-700 text-sm">
              {lowStock.length} product(s) running low on stock
            </p>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin h-8 w-8 border-2 border-saffron border-t-transparent rounded-full mx-auto" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 bg-gray-50">
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Current Stock</th>
                  <th className="px-6 py-3">Update Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className={`hover:bg-gray-50 transition-colors ${
                      product.stock === 0 ? 'bg-red-50/30' : product.stock <= 10 ? 'bg-yellow-50/30' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {product.stock <= 10 && (
                          <AlertTriangle
                            className={`h-4 w-4 flex-shrink-0 ${product.stock === 0 ? 'text-red-500' : 'text-yellow-500'}`}
                          />
                        )}
                        {product.stock > 10 && (
                          <Package className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        )}
                        <span className="text-sm font-medium text-gray-800">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {formatPrice(product.price)} / {product.unit}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-sm font-bold ${
                          product.stock === 0
                            ? 'text-red-600'
                            : product.stock <= 10
                            ? 'text-yellow-600'
                            : 'text-green-600'
                        }`}
                      >
                        {product.stock} {product.unit}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          placeholder={String(product.stock)}
                          value={stockUpdates[product.id] || ''}
                          onChange={(e) =>
                            setStockUpdates((prev) => ({
                              ...prev,
                              [product.id]: e.target.value,
                            }))
                          }
                          className="w-24 px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-saffron/30 focus:border-saffron"
                        />
                        <Button
                          size="sm"
                          onClick={() => handleStockUpdate(product.id)}
                          loading={updating === product.id}
                          disabled={!stockUpdates[product.id]}
                        >
                          Update
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
