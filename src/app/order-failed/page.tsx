'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { XCircle } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';

function OrderFailedContent() {
  const searchParams = useSearchParams();
  const reason = searchParams.get('reason') || 'Payment was not completed';
  const orderNumber = searchParams.get('order');

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 flex items-center justify-center py-16">
        <div className="max-w-lg w-full mx-4">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 text-center">
            <div className="h-24 w-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="h-12 w-12 text-red-500" />
            </div>

            <h1 className="font-heading text-3xl font-bold text-gray-900 mb-3">
              Payment Failed
            </h1>
            <p className="text-gray-500 mb-6">
              Your payment could not be processed. Please try again.
            </p>

            {orderNumber && (
              <p className="text-sm text-gray-500 mb-6">
                Order Reference:{' '}
                <span className="font-mono text-saffron">
                  #{orderNumber}
                </span>
              </p>
            )}

            <div className="bg-red-50 rounded-xl p-4 mb-8 text-left">
              <p className="text-sm text-red-600">
                <strong>Reason:</strong> {decodeURIComponent(reason)}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/checkout" className="flex-1 inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base bg-saffron hover:bg-saffron-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-sm">
                Try Again
              </Link>
              <Link href="/products" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base border-2 border-saffron text-saffron hover:bg-saffron hover:text-white font-semibold rounded-lg transition-all duration-200">
                Browse Products
              </Link>
            </div>

            <p className="mt-6 text-xs text-gray-400">
              Need help?{' '}
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_COMPANY_EMAIL}`}
                className="text-saffron hover:underline"
              >
                Contact us
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function OrderFailedPage() {
  return (
    <Suspense fallback={null}>
      <OrderFailedContent />
    </Suspense>
  );
}
