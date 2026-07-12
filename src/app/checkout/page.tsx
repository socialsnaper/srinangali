'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Loader2 } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/cartStore';
import { formatPrice, INDIAN_STATES } from '@/lib/utils';
import Image from 'next/image';
import toast from 'react-hot-toast';

const checkoutSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerEmail: z.string().email('Invalid email address'),
  customerPhone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  addressLine1: z.string().min(5, 'Address is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(1, 'State is required'),
  pincode: z.string().regex(/^\d{6}$/, 'Enter a valid 6-digit PIN code'),
  notes: z.string().optional(),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

const FREE_SHIPPING_THRESHOLD = 500;
const SHIPPING_COST = 60;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);

  const subtotal = getSubtotal();
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shippingCost;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutForm) => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          items: items.map((i) => ({
            productId: i.productId,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            image: i.image,
          })),
          subtotal,
          shippingCost,
          total,
        }),
      });

      const result = await res.json();

      if (!result.success) {
        toast.error(result.error || 'Something went wrong');
        return;
      }

      // Create and auto-submit PayU form
      const { payuParams, payuUrl } = result.data;
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = payuUrl;

      Object.entries(payuParams).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      toast.error('Failed to initiate payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center py-20 px-6">
            <div className="text-7xl mb-4">🛒</div>
            <h2 className="font-heading text-2xl font-bold text-gray-800 mb-3">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-6">
              Add products to your cart before checkout
            </p>
            <Link href="/products" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm bg-saffron text-white font-semibold rounded-lg hover:bg-saffron-800 transition-all">
              Browse Products
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="page-container">
          {/* Back */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-saffron mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>

          <h1 className="font-heading text-3xl font-bold text-gray-900 mb-8">
            Checkout
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left — Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Contact */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h2 className="font-heading font-bold text-lg text-gray-900 mb-5">
                    Contact Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      placeholder="Enter your full name"
                      required
                      {...register('customerName')}
                      error={errors.customerName?.message}
                    />
                    <Input
                      label="Mobile Number"
                      placeholder="10-digit mobile number"
                      required
                      {...register('customerPhone')}
                      error={errors.customerPhone?.message}
                    />
                    <div className="sm:col-span-2">
                      <Input
                        label="Email Address"
                        type="email"
                        placeholder="your@email.com"
                        required
                        {...register('customerEmail')}
                        error={errors.customerEmail?.message}
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h2 className="font-heading font-bold text-lg text-gray-900 mb-5">
                    Delivery Address
                  </h2>
                  <div className="space-y-4">
                    <Input
                      label="Address Line 1"
                      placeholder="House/Flat No., Street, Colony"
                      required
                      {...register('addressLine1')}
                      error={errors.addressLine1?.message}
                    />
                    <Input
                      label="Address Line 2"
                      placeholder="Landmark (optional)"
                      {...register('addressLine2')}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="City"
                        placeholder="City"
                        required
                        {...register('city')}
                        error={errors.city?.message}
                      />
                      <Input
                        label="PIN Code"
                        placeholder="6-digit PIN"
                        required
                        {...register('pincode')}
                        error={errors.pincode?.message}
                      />
                    </div>
                    <Select
                      label="State"
                      required
                      options={INDIAN_STATES.map((s) => ({
                        value: s,
                        label: s,
                      }))}
                      placeholder="Select State"
                      {...register('state')}
                      error={errors.state?.message}
                    />
                    <Textarea
                      label="Order Notes"
                      placeholder="Any special instructions for your order? (optional)"
                      {...register('notes')}
                    />
                  </div>
                </div>

                {/* Payment Method Info */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h2 className="font-heading font-bold text-lg text-gray-900 mb-5">
                    Payment Method
                  </h2>
                  <div className="flex items-center gap-4 p-4 border-2 border-saffron rounded-xl bg-saffron-50">
                    <div className="h-10 w-10 bg-saffron rounded-full flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        Secure Payment via PayU
                      </p>
                      <p className="text-sm text-gray-500">
                        Credit Card, Debit Card, Net Banking, UPI, Google Pay
                      </p>
                    </div>
                  </div>

                  {/* Payment logos */}
                  <div className="mt-4 flex items-center gap-3 flex-wrap">
                    {['Visa', 'Mastercard', 'UPI', 'GPay', 'Paytm'].map(
                      (p) => (
                        <span
                          key={p}
                          className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-medium text-gray-600"
                        >
                          {p}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Right — Order Summary */}
              <div className="space-y-4">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                  <h2 className="font-heading font-bold text-lg text-gray-900 mb-5">
                    Order Summary
                  </h2>

                  {/* Items */}
                  <div className="space-y-3 mb-5 max-h-60 overflow-y-auto">
                    {items.map((item) => (
                      <div
                        key={item.productId}
                        className="flex items-center gap-3"
                      >
                        <div className="relative h-14 w-14 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                          <Image
                            src={item.image || '/images/product-placeholder.svg'}
                            alt={item.name}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                '/images/product-placeholder.svg';
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.quantity} × {formatPrice(item.price)}
                          </p>
                        </div>
                        <p className="text-sm font-bold text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="border-t border-gray-100 pt-4 space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Shipping</span>
                      <span
                        className={
                          shippingCost === 0
                            ? 'text-forest font-medium'
                            : ''
                        }
                      >
                        {shippingCost === 0
                          ? 'FREE'
                          : formatPrice(shippingCost)}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold text-gray-900 text-lg pt-2 border-t border-gray-100">
                      <span>Total</span>
                      <span className="text-saffron">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    loading={isLoading}
                    className="mt-6"
                  >
                    {isLoading ? (
                      'Redirecting to PayU...'
                    ) : (
                      <>
                        <ShieldCheck className="h-5 w-5" />
                        Pay {formatPrice(total)} Securely
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-gray-400 text-center mt-3 flex items-center justify-center gap-1">
                    <ShieldCheck className="h-3 w-3" />
                    Secured by PayU Payment Gateway
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
