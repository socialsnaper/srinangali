'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ImageUpload } from '@/components/ui/ImageUpload';
import toast from 'react-hot-toast';

const productSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  category: z.enum(['RICE', 'PULSES', 'FMCG', 'OTHER']),
  description: z.string().optional(),
  price: z.coerce.number().positive('Price must be positive'),
  mrp: z.coerce.number().positive('MRP must be positive'),
  stock: z.coerce.number().min(0, 'Stock cannot be negative'),
  unit: z.string().default('kg'),
  isFeatured: z.boolean().default(false),
});

type ProductForm = z.infer<typeof productSchema>;

const CATEGORIES = [
  { value: 'RICE', label: 'Rice' },
  { value: 'PULSES', label: 'Pulses' },
  { value: 'FMCG', label: 'FMCG' },
  { value: 'OTHER', label: 'Other' },
];

export default function NewProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      category: 'RICE',
      unit: 'kg',
      stock: 0,
      isFeatured: false,
    },
  });

  const onSubmit = async (data: ProductForm) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          image: imageUrl || null,
        }),
      });

      const result = await res.json();
      if (result.success) {
        toast.success('Product created successfully!');
        router.push('/admin/products');
      } else {
        toast.error(result.error || 'Failed to create product');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link
            href="/admin/products"
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-500" />
          </Link>
          <div>
            <h1 className="font-heading text-2xl font-bold text-gray-900">
              Add New Product
            </h1>
            <p className="text-gray-500 text-sm">
              Fill in the details to add a new product
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Image */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-800 mb-1">Product Image</h2>
            <p className="text-xs text-gray-400 mb-4">Upload from your device or paste an image URL</p>
            <ImageUpload value={imageUrl} onChange={setImageUrl} />
          </div>

          {/* Basic Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
            <h2 className="font-semibold text-gray-800">Product Details</h2>
            <Input
              label="Product Name"
              placeholder="e.g., Gold 1121 Steam Basmati Rice"
              required
              {...register('name')}
              error={errors.name?.message}
            />
            <Select
              label="Category"
              required
              options={CATEGORIES}
              {...register('category')}
              error={errors.category?.message}
            />
            <Textarea
              label="Description"
              placeholder="Describe the product quality, origin, usage..."
              rows={3}
              {...register('description')}
            />
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="featured"
                {...register('isFeatured')}
                className="h-4 w-4 accent-saffron cursor-pointer"
              />
              <label
                htmlFor="featured"
                className="text-sm text-gray-700 cursor-pointer"
              >
                Mark as Featured Product (shows on homepage)
              </label>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
            <h2 className="font-semibold text-gray-800">Pricing & Inventory</h2>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Selling Price (₹)"
                type="number"
                step="0.01"
                placeholder="120.00"
                required
                {...register('price')}
                error={errors.price?.message}
              />
              <Input
                label="MRP (₹)"
                type="number"
                step="0.01"
                placeholder="150.00"
                required
                {...register('mrp')}
                error={errors.mrp?.message}
              />
              <Input
                label="Stock Quantity"
                type="number"
                placeholder="100"
                required
                {...register('stock')}
                error={errors.stock?.message}
              />
              <Select
                label="Unit"
                options={[
                  { value: 'kg', label: 'kg' },
                  { value: 'g', label: 'grams' },
                  { value: 'pack', label: 'pack' },
                  { value: 'piece', label: 'piece' },
                ]}
                {...register('unit')}
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-3">
            <Button
              type="submit"
              loading={isLoading}
              size="lg"
              className="flex-1"
            >
              Create Product
            </Button>
            <Link href="/admin/products">
              <Button type="button" variant="ghost" size="lg">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
