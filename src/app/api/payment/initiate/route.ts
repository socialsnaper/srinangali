import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { createPayUParams, generateTxnId } from '@/lib/payment';
import { generateOrderNumber } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      items,
      subtotal,
      shippingCost,
      total,
      notes,
    } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Cart is empty' },
        { status: 400 }
      );
    }

    // Create pending order
    const orderNumber = generateOrderNumber();
    const txnId = generateTxnId();

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        customerEmail,
        customerPhone,
        addressLine1,
        addressLine2: addressLine2 || null,
        city,
        state,
        pincode,
        subtotal: parseFloat(subtotal),
        shippingCost: parseFloat(shippingCost || '0'),
        discount: 0,
        total: parseFloat(total),
        notes: notes || null,
        payuTxnId: txnId,
        status: 'PENDING',
        paymentStatus: 'PENDING',
        items: {
          create: items.map((item: {
            productId: string;
            name: string;
            price: number;
            quantity: number;
            image?: string;
          }) => ({
            productId: item.productId,
            name: item.name,
            price: parseFloat(item.price.toString()),
            quantity: item.quantity,
            image: item.image || null,
          })),
        },
      },
    });

    // Generate PayU params
    const { payuParams, payuUrl } = createPayUParams({
      txnid: txnId,
      amount: parseFloat(total),
      productinfo: `Order ${orderNumber}`,
      firstname: customerName.split(' ')[0],
      email: customerEmail,
      phone: customerPhone,
      udf1: order.id, // Store our order ID in udf1
    });

    return NextResponse.json({
      success: true,
      data: { payuParams, payuUrl, orderId: order.id, orderNumber },
    });
  } catch (error) {
    console.error('Payment initiate error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to initiate payment' },
      { status: 500 }
    );
  }
}
