'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Upload, X, Link2, ImageIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  className?: string;
}

export function ImageUpload({ value, onChange, className }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [tab, setTab] = useState<'upload' | 'url'>('upload');
  const [urlInput, setUrlInput] = useState(value.startsWith('http') ? value : '');
  const fileRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(async (file: File) => {
    if (!file) return;

    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowed.includes(file.type)) {
      toast.error('Only JPEG, PNG, WebP and GIF images allowed');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be smaller than 5MB');
      return;
    }

    setUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);

      const res = await fetch('/api/upload', { method: 'POST', body: form });
      const data = await res.json();

      if (data.success) {
        onChange(data.url);
        toast.success('Image uploaded!');
      } else {
        toast.error(data.error || 'Upload failed');
      }
    } catch {
      toast.error('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  }, [onChange]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    // Reset input so same file can be re-selected
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const handleUrlApply = () => {
    if (!urlInput.trim()) return;
    onChange(urlInput.trim());
    toast.success('Image URL applied!');
  };

  const handleRemove = () => {
    onChange('');
    setUrlInput('');
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className={cn('space-y-3', className)}>
      {/* Preview */}
      {value ? (
        <div className="relative group rounded-xl overflow-hidden bg-gray-100 border border-gray-200 aspect-video max-h-52">
          <Image
            src={value}
            alt="Product preview"
            fill
            className="object-contain"
            unoptimized={value.startsWith('/uploads')}
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/product-placeholder.svg';
            }}
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="bg-white text-gray-800 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-gray-100 flex items-center gap-1.5"
            >
              <Upload className="h-3.5 w-3.5" />
              Replace
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-600 flex items-center gap-1.5"
            >
              <X className="h-3.5 w-3.5" />
              Remove
            </button>
          </div>
        </div>
      ) : (
        /* Drop zone */
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => tab === 'upload' && fileRef.current?.click()}
          className={cn(
            'relative border-2 border-dashed rounded-xl transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-2 py-10',
            dragOver
              ? 'border-saffron bg-saffron-50 scale-[1.01]'
              : 'border-gray-200 hover:border-saffron hover:bg-gray-50',
            tab === 'url' && 'cursor-default'
          )}
        >
          {uploading ? (
            <>
              <Loader2 className="h-8 w-8 text-saffron animate-spin" />
              <p className="text-sm text-gray-500">Uploading…</p>
            </>
          ) : (
            <>
              <div className="h-12 w-12 bg-saffron-50 rounded-xl flex items-center justify-center">
                <ImageIcon className="h-6 w-6 text-saffron" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700">
                  {tab === 'upload' ? 'Click to upload or drag & drop' : 'Enter image URL below'}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  PNG, JPG, WebP up to 5MB
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Tab switcher */}
      <div className="flex rounded-xl bg-gray-100 p-1 gap-1">
        <button
          type="button"
          onClick={() => setTab('upload')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all',
            tab === 'upload'
              ? 'bg-white text-gray-800 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          )}
        >
          <Upload className="h-3.5 w-3.5" />
          Upload File
        </button>
        <button
          type="button"
          onClick={() => setTab('url')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all',
            tab === 'url'
              ? 'bg-white text-gray-800 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          )}
        >
          <Link2 className="h-3.5 w-3.5" />
          Paste URL
        </button>
      </div>

      {/* Upload button (visible only when no preview) */}
      {tab === 'upload' && !value && (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-saffron hover:text-saffron transition-all disabled:opacity-50"
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          {uploading ? 'Uploading...' : 'Choose Image'}
        </button>
      )}

      {/* URL input */}
      {tab === 'url' && (
        <div className="flex gap-2">
          <input
            type="url"
            placeholder="https://example.com/image.jpg"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleUrlApply())}
            className="flex-1 px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-saffron/30 focus:border-saffron"
          />
          <button
            type="button"
            onClick={handleUrlApply}
            disabled={!urlInput.trim()}
            className="px-4 py-2.5 bg-saffron text-white rounded-xl text-sm font-semibold hover:bg-saffron-800 transition-colors disabled:opacity-40"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
}
