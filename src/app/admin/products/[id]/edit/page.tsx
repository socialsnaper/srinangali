'use client';

import { use, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft } from 'lucide-react';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { Product } from '@/types';
import toast from 'react-hot-toast';

const productSchema = z.object({
  name: z.string().min(2),
  category: z.enum(['RICE', 'PULSES', 'FMCG', 'OTHER']),
  description: z.string().optional(),
  price: z.coerce.number().positive(),
  mrp: z.coerce.number().positive(),
  stock: z.coerce.number().min(0),
  unit: z.string(),
  isFeatured: z.boolean(),
  isActive: z.boolean(),
});
type ProductForm = z.infer<typeof productSchema>;

const CATEGORIES = [
  { value: 'RICE', label: 'Rice' },
  { value: 'PULSES', label: 'Pulses' },
  { value: 'FMCG', label: 'FMCG' },
  { value: 'OTHER', label: 'Other' },
];

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
  });

  const fetchProduct = useCallback(async () => {
    try {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      if (data.success) {
        setProduct(data.data);
        setImageUrl(data.data.image || '');
        reset({
          name: data.data.name,
          category: data.data.category,
          description: data.data.description || '',
          price: data.data.price,
          mrp: data.data.mrp,
          stock: data.data.stock,
          unit: data.data.unit,
          isFeatured: data.data.isFeatured,
          isActive: data.data.isActive,
        });
      } else {
        toast.error('Product not found');
        router.push('/admin/products');
      }
    } catch {
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  }, [id, reset, router]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const onSubmit = async (data: ProductForm) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, image: imageUrl || null }),
      });
      const result = await res.json();
      if (result.success) {
        toast.success('Product updated!');
        router.push('/admin/products');
      } else {
        toast.error(result.error || 'Failed to update');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-saffron border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/admin/products" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <ArrowLeft className="h-5 w-5 text-gray-500" />
          </Link>
          <div>
            <h1 className="font-heading text-2xl font-bold text-gray-900">Edit Product</h1>
            <p className="text-gray-500 text-sm">{product?.name}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Image */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-800 mb-1">Product Image</h2>
            <p className="text-xs text-gray-400 mb-4">Upload from your device or paste an image URL</p>
            <ImageUpload value={imageUrl} onChange={setImageUrl} />
          </div>

          {/* Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
            <h2 className="font-semibold text-gray-800">Product Details</h2>
            <Input label="Product Name" required {...register('name')} error={errors.name?.message} />
            <Select label="Category" required options={CATEGORIES} {...register('category')} />
            <Textarea label="Description" rows={3} {...register('description')} />
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...register('isFeatured')} className="h-4 w-4 accent-saffron" />
                <span className="text-sm text-gray-700">Featured</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...register('isActive')} className="h-4 w-4 accent-forest" />
                <span className="text-sm text-gray-700">Active</span>
              </label>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
            <h2 className="font-semibold text-gray-800">Pricing & Inventory</h2>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Price (₹)" type="number" step="0.01" required {...register('price')} error={errors.price?.message} />
              <Input label="MRP (₹)" type="number" step="0.01" required {...register('mrp')} error={errors.mrp?.message} />
              <Input label="Stock" type="number" required {...register('stock')} error={errors.stock?.message} />
              <Select label="Unit" options={[
                { value: 'kg', label: 'kg' },
                { value: 'g', label: 'grams' },
                { value: 'pack', label: 'pack' },
              ]} {...register('unit')} />
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="submit" loading={saving} size="lg" className="flex-1">Save Changes</Button>
            <Link href="/admin/products">
              <Button type="button" variant="ghost" size="lg">Cancel</Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
