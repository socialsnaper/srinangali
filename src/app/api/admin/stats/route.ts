import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAdminFromToken } from '@/lib/auth';
import { startOfDay, startOfMonth, subDays } from 'date-fns';

export async function GET(_request: NextRequest) {
  const admin = await getAdminFromToken();
  if (!admin) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const today = startOfDay(new Date());
    const thisMonth = startOfMonth(new Date());

    const [
      totalOrders,
      totalProducts,
      pendingOrders,
      todayOrders,
      successOrders,
      monthOrders,
      lowStockProducts,
      recentOrders,
    ] = await Promise.all([
      prisma.order.count(),
      prisma.product.count({ where: { isActive: true } }),
      prisma.order.count({ where: { status: 'PENDING' } }),
      prisma.order.count({ where: { createdAt: { gte: today } } }),
      prisma.order.findMany({
        where: { paymentStatus: 'SUCCESS' },
        select: { total: true },
      }),
      prisma.order.findMany({
        where: { createdAt: { gte: thisMonth }, paymentStatus: 'SUCCESS' },
        select: { total: true },
      }),
      prisma.product.count({
        where: { stock: { lte: 10 }, isActive: true },
      }),
      prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        take: 8,
        include: {
          items: { select: { name: true, quantity: true, price: true } },
        },
      }),
    ]);

    const totalRevenue = successOrders.reduce((sum, o) => sum + o.total, 0);
    const monthRevenue = monthOrders.reduce((sum, o) => sum + o.total, 0);

    return NextResponse.json({
      success: true,
      data: {
        totalOrders,
        totalRevenue,
        totalProducts,
        pendingOrders,
        todayOrders,
        monthRevenue,
        lowStockProducts,
        recentOrders,
      },
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
