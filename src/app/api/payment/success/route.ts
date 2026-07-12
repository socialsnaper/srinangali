import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyPayUResponseHash } from '@/lib/payment';
import { PayUResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const response: Record<string, string> = {};

    formData.forEach((value, key) => {
      response[key] = value.toString();
    });

    const payuResponse = response as unknown as PayUResponse;
    const isValid = verifyPayUResponseHash(payuResponse);

    if (!isValid) {
      console.error('PayU hash verification failed', response);
      return NextResponse.redirect(
        new URL(`/order-failed?reason=hash_mismatch`, request.url)
      );
    }

    const orderId = response.udf1;
    if (!orderId) {
      return NextResponse.redirect(
        new URL(`/order-failed?reason=missing_order`, request.url)
      );
    }

    const isSuccess = response.status === 'success';

    // Update order
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: isSuccess ? 'SUCCESS' : 'FAILED',
        status: isSuccess ? 'CONFIRMED' : 'CANCELLED',
        paymentId: response.mihpayid || null,
        paymentMethod: response.mode || null,
        payuMihpayid: response.mihpayid || null,
      },
      include: { items: true },
    });

    // Reduce stock on successful payment
    if (isSuccess) {
      for (const item of order.items) {
        await prisma.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        }).catch((e) => console.error('Stock update error:', e));
      }
    }

    if (isSuccess) {
      return NextResponse.redirect(
        new URL(
          `/order-success?order=${order.orderNumber}&txn=${response.mihpayid || response.txnid}`,
          request.url
        )
      );
    } else {
      return NextResponse.redirect(
        new URL(
          `/order-failed?order=${order.orderNumber}&reason=${response.error_Message || 'Payment failed'}`,
          request.url
        )
      );
    }
  } catch (error) {
    console.error('Payment success handler error:', error);
    return NextResponse.redirect(
      new URL('/order-failed?reason=server_error', request.url)
    );
  }
}
