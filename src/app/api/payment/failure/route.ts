import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const response: Record<string, string> = {};

    formData.forEach((value, key) => {
      response[key] = value.toString();
    });

    // Try to update the order if we have valid data
    const orderId = response['udf1'];
    if (orderId) {
      await prisma.order
        .update({
          where: { id: orderId },
          data: {
            paymentStatus: 'FAILED',
            status: 'CANCELLED',
          },
        })
        .catch(console.error);
    }

    return NextResponse.redirect(
      new URL(
        `/order-failed?reason=${encodeURIComponent(response['error_Message'] || 'Payment failed')}`,
        request.url
      )
    );
  } catch (error) {
    console.error('Payment failure handler error:', error);
    return NextResponse.redirect(
      new URL('/order-failed?reason=server_error', request.url)
    );
  }
}
