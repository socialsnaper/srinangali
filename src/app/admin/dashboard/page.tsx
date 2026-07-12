'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Package,
  ShoppingBag,
  TrendingUp,
  Clock,
  AlertTriangle,
  ArrowRight,
  IndianRupee,
} from 'lucide-react';
import { formatPrice, formatDate, ORDER_STATUS_COLORS } from '@/lib/utils';
import { DashboardStats } from '@/types';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setStats(data.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    {
      title: 'Total Revenue',
      value: formatPrice(stats?.totalRevenue || 0),
      icon: IndianRupee,
      color: 'text-saffron',
      bg: 'bg-saffron-50',
    },
    {
      title: 'Total Orders',
      value: stats?.totalOrders || 0,
      icon: ShoppingBag,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      title: 'Products',
      value: stats?.totalProducts || 0,
      icon: Package,
      color: 'text-forest',
      bg: 'bg-forest-50',
    },
    {
      title: 'Pending Orders',
      value: stats?.pendingOrders || 0,
      icon: Clock,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
    },
  ];

  if (loading) {
    return (
      <div className="p-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 skeleton rounded-2xl" />
          ))}
        </div>
        <div className="h-64 skeleton rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-gray-900">
          Dashboard
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Overview of your store performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`h-10 w-10 ${card.bg} rounded-xl flex items-center justify-center`}>
                <card.icon className={`h-5 w-5 ${card.color}`} />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{card.value}</div>
            <div className="text-sm text-gray-500 mt-1">{card.title}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/admin/products/new"
          className="flex items-center gap-3 p-5 bg-saffron-50 border border-saffron-100 rounded-2xl hover:bg-saffron-100 transition-colors group"
        >
          <div className="h-10 w-10 bg-saffron rounded-xl flex items-center justify-center flex-shrink-0">
            <Package className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-800">Add Product</p>
            <p className="text-xs text-gray-500">Add new product to catalog</p>
          </div>
          <ArrowRight className="h-4 w-4 text-saffron group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          href="/admin/orders"
          className="flex items-center gap-3 p-5 bg-blue-50 border border-blue-100 rounded-2xl hover:bg-blue-100 transition-colors group"
        >
          <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <ShoppingBag className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-800">View Orders</p>
            <p className="text-xs text-gray-500">
              {stats?.pendingOrders || 0} pending orders
            </p>
          </div>
          <ArrowRight className="h-4 w-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          href="/admin/inventory"
          className="flex items-center gap-3 p-5 bg-amber-50 border border-amber-100 rounded-2xl hover:bg-amber-100 transition-colors group"
        >
          <div className="h-10 w-10 bg-amber-500 rounded-xl flex items-center justify-center">
            <AlertTriangle className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-800">Low Stock</p>
            <p className="text-xs text-gray-500">
              {stats?.lowStockProducts || 0} items need attention
            </p>
          </div>
          <ArrowRight className="h-4 w-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="font-heading font-bold text-gray-900">
            Recent Orders
          </h2>
          <Link
            href="/admin/orders"
            className="text-sm text-saffron font-medium hover:underline"
          >
            View All
          </Link>
        </div>

        {!stats?.recentOrders?.length ? (
          <div className="p-12 text-center">
            <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No orders yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                  <th className="px-6 py-3">Order #</th>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stats.recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-sm text-saffron font-medium">
                      {order.orderNumber}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {order.customerName}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${ORDER_STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-700'}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="text-xs text-saffron hover:underline"
                      >
                        View
                      </Link>
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
