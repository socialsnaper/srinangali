import crypto from 'crypto';
import { PayUParams, PayUResponse } from '@/types';

const PAYU_KEY = process.env.PAYU_MERCHANT_KEY || 'gtKFFx';
const PAYU_SALT = process.env.PAYU_MERCHANT_SALT || 'eCwWELxi';
const PAYU_BASE_URL = process.env.PAYU_BASE_URL || 'https://test.payu.in/_payment';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export function generatePayUHash(params: {
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
}): string {
  const {
    txnid,
    amount,
    productinfo,
    firstname,
    email,
    udf1 = '',
    udf2 = '',
    udf3 = '',
    udf4 = '',
    udf5 = '',
  } = params;

  // PayU hash formula: sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT)
  const hashString = `${PAYU_KEY}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}||||||${PAYU_SALT}`;
  return crypto.createHash('sha512').update(hashString).digest('hex');
}

export function verifyPayUResponseHash(response: PayUResponse): boolean {
  const {
    status,
    udf5 = '',
    udf4 = '',
    udf3 = '',
    udf2 = '',
    udf1 = '',
    email,
    firstname,
    productinfo,
    amount,
    txnid,
    key,
    hash,
  } = response;

  // PayU reverse hash: sha512(SALT|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key)
  const hashString = `${PAYU_SALT}|${status}||||||${udf5}|${udf4}|${udf3}|${udf2}|${udf1}|${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;
  const computedHash = crypto
    .createHash('sha512')
    .update(hashString)
    .digest('hex');

  return computedHash === hash;
}

export function createPayUParams(params: {
  txnid: string;
  amount: number;
  productinfo: string;
  firstname: string;
  email: string;
  phone: string;
  udf1?: string;
}): { payuParams: PayUParams; payuUrl: string } {
  const amountStr = params.amount.toFixed(2);
  const hash = generatePayUHash({
    txnid: params.txnid,
    amount: amountStr,
    productinfo: params.productinfo,
    firstname: params.firstname,
    email: params.email,
    udf1: params.udf1 || '',
  });

  const payuParams: PayUParams = {
    key: PAYU_KEY,
    txnid: params.txnid,
    amount: amountStr,
    productinfo: params.productinfo,
    firstname: params.firstname,
    email: params.email,
    phone: params.phone,
    surl: `${APP_URL}/api/payment/success`,
    furl: `${APP_URL}/api/payment/failure`,
    hash,
    udf1: params.udf1 || '',
  };

  return { payuParams, payuUrl: PAYU_BASE_URL };
}

export function generateTxnId(): string {
  return `SNO${Date.now()}${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
}
