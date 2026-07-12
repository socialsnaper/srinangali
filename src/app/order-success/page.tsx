'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Package, Home } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/cartStore';

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order');
  const txnId = searchParams.get('txn');
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 flex items-center justify-center py-16">
        <div className="max-w-lg w-full mx-4">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 text-center">
            {/* Success Icon */}
            <div className="relative inline-flex mb-6">
              <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
              </div>
              <div className="absolute -top-1 -right-1 h-8 w-8 bg-saffron rounded-full flex items-center justify-center">
                <span className="text-white text-base">🎉</span>
              </div>
            </div>

            <h1 className="font-heading text-3xl font-bold text-gray-900 mb-3">
              Order Placed Successfully!
            </h1>
            <p className="text-gray-500 mb-8">
              Thank you for shopping with Sri Nangali Overseas. Your order has
              been confirmed and will be processed shortly.
            </p>

            {/* Order Details */}
            <div className="bg-gray-50 rounded-2xl p-5 mb-8 text-left space-y-3">
              {orderNumber && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Order Number</span>
                  <span className="font-mono font-bold text-saffron">
                    #{orderNumber}
                  </span>
                </div>
              )}
              {txnId && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Transaction ID</span>
                  <span className="font-mono text-gray-700 text-xs">{txnId}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Status</span>
                <span className="text-green-600 font-semibold">Payment Successful</span>
              </div>
            </div>

            {/* What's Next */}
            <div className="bg-saffron-50 rounded-2xl p-5 mb-8 text-left">
              <p className="font-semibold text-saffron-800 text-sm mb-3">
                What happens next?
              </p>
              <ul className="space-y-2 text-sm text-saffron-700">
                <li className="flex items-start gap-2">
                  <span className="text-saffron mt-0.5">✓</span>
                  Order confirmation sent to your email
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-saffron mt-0.5">✓</span>
                  Our team will process your order within 24 hours
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-saffron mt-0.5">✓</span>
                  You will receive tracking details once shipped
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/products" className="flex-1 inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base bg-saffron hover:bg-saffron-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-sm">
                <Package className="h-4 w-4" />
                Continue Shopping
              </Link>
              <Link href="/" className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-base border-2 border-saffron text-saffron hover:bg-saffron hover:text-white font-semibold rounded-lg transition-all duration-200">
                <Home className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
