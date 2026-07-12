'use client';

import { use, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Package, User, MapPin, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Order } from '@/types';
import {
  formatPrice,
  formatDate,
  ORDER_STATUS_COLORS,
  PAYMENT_STATUS_COLORS,
  ORDER_STATUS_LABELS,
} from '@/lib/utils';
import toast from 'react-hot-toast';

const ORDER_STATUSES = [
  'PENDING',
  'CONFIRMED',
  'PROCESSING',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
];

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  const fetchOrder = useCallback(async () => {
    try {
      const res = await fetch(`/api/orders/${id}`);
      const data = await res.json();
      if (data.success) {
        setOrder(data.data);
        setNewStatus(data.data.status);
      }
    } catch {
      toast.error('Failed to load order');
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const handleUpdateStatus = async () => {
    if (!order || newStatus === order.status) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/orders/${order.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const result = await res.json();
      if (result.success) {
        toast.success('Order status updated!');
        fetchOrder();
      }
    } catch {
      toast.error('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-saffron border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/admin/orders" className="p-2 hover:bg-gray-100 rounded-xl">
            <ArrowLeft className="h-5 w-5 text-gray-500" />
          </Link>
          <div className="flex-1">
            <h1 className="font-heading text-xl font-bold text-gray-900">
              Order #{order.orderNumber}
            </h1>
            <p className="text-gray-500 text-sm">{formatDate(order.createdAt)}</p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${ORDER_STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-700'}`}
            >
              {order.status}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${PAYMENT_STATUS_COLORS[order.paymentStatus] || 'bg-gray-100 text-gray-700'}`}
            >
              Payment: {order.paymentStatus}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left */}
          <div className="md:col-span-2 space-y-5">
            {/* Order Items */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex items-center gap-2 p-5 border-b border-gray-100">
                <Package className="h-4 w-4 text-saffron" />
                <h2 className="font-semibold text-gray-800">
                  Order Items ({order.items.length})
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                {order.items.map((item) => (
                  <div key={item.id} className="p-5 flex items-center gap-4">
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-800">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {item.quantity} × {formatPrice(item.price)}
                      </p>
                    </div>
                    <p className="font-bold text-sm text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="p-5 bg-gray-50 border-t border-gray-100 space-y-1.5">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span>{formatPrice(order.shippingCost)}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 pt-1 border-t border-gray-200">
                  <span>Total</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>

            {/* Customer */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-4">
                <User className="h-4 w-4 text-saffron" />
                <h2 className="font-semibold text-gray-800">Customer</h2>
              </div>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Name:</strong> {order.customerName}
                </p>
                <p>
                  <strong>Email:</strong>{' '}
                  <a
                    href={`mailto:${order.customerEmail}`}
                    className="text-saffron"
                  >
                    {order.customerEmail}
                  </a>
                </p>
                <p>
                  <strong>Phone:</strong>{' '}
                  <a
                    href={`tel:${order.customerPhone}`}
                    className="text-saffron"
                  >
                    {order.customerPhone}
                  </a>
                </p>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-4 w-4 text-saffron" />
                <h2 className="font-semibold text-gray-800">Delivery Address</h2>
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <p>{order.addressLine1}</p>
                {order.addressLine2 && <p>{order.addressLine2}</p>}
                <p>
                  {order.city}, {order.state} — {order.pincode}
                </p>
              </div>
            </div>
          </div>

          {/* Right — Update Status */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="h-4 w-4 text-saffron" />
                <h2 className="font-semibold text-gray-800">Payment Info</h2>
              </div>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Status:</strong>{' '}
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${PAYMENT_STATUS_COLORS[order.paymentStatus]}`}
                  >
                    {order.paymentStatus}
                  </span>
                </p>
                {order.payuTxnId && (
                  <p className="text-xs text-gray-500">
                    <strong>Txn ID:</strong> {order.payuTxnId}
                  </p>
                )}
                {order.payuMihpayid && (
                  <p className="text-xs text-gray-500">
                    <strong>PayU ID:</strong> {order.payuMihpayid}
                  </p>
                )}
                {order.paymentMethod && (
                  <p className="text-xs text-gray-500">
                    <strong>Method:</strong> {order.paymentMethod}
                  </p>
                )}
              </div>
            </div>

            {/* Update Status */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-semibold text-gray-800 mb-4">Update Status</h2>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-saffron/30"
              >
                {ORDER_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {ORDER_STATUS_LABELS[s] || s}
                  </option>
                ))}
              </select>
              <Button
                fullWidth
                onClick={handleUpdateStatus}
                loading={updating}
                disabled={newStatus === order.status}
              >
                Update Status
              </Button>
            </div>

            {order.notes && (
              <div className="bg-amber-50 rounded-2xl border border-amber-100 p-5">
                <h2 className="font-semibold text-amber-800 mb-2 text-sm">
                  Customer Notes
                </h2>
                <p className="text-sm text-amber-700">{order.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
