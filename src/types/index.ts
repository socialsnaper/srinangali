// Core application types for Srinangali Overseas

export type Category = 'RICE' | 'PULSES' | 'FMCG' | 'OTHER';

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED';

export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: Category | string;
  description?: string | null;
  price: number;
  mrp: number;
  stock: number;
  unit: string;
  image?: string | null;
  images: string;
  isActive: boolean;
  isFeatured: boolean;
  tags: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product?: Product;
  name: string;
  price: number;
  quantity: number;
  image?: string | null;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state: string;
  pincode: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentId?: string | null;
  paymentMethod?: string | null;
  payuTxnId?: string | null;
  payuMihpayid?: string | null;
  notes?: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface Admin {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string | Date;
}

// Cart types
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  mrp: number;
  image?: string | null;
  quantity: number;
  stock: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  subtotal: number;
  itemCount: number;
}

// Checkout types
export interface CheckoutFormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  notes?: string;
}

// PayU types
export interface PayUParams {
  key: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  phone: string;
  surl: string;
  furl: string;
  hash: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
}

export interface PayUResponse {
  mihpayid?: string;
  mode?: string;
  status: string;
  unmappedstatus?: string;
  key: string;
  txnid: string;
  amount: string;
  discount?: string;
  net_amount_debit?: string;
  addedon?: string;
  productinfo: string;
  firstname: string;
  lastname?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  country?: string;
  zipcode?: string;
  email: string;
  phone: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
  hash: string;
  field1?: string;
  field2?: string;
  field3?: string;
  field4?: string;
  field5?: string;
  field6?: string;
  field7?: string;
  field8?: string;
  field9?: string;
  payment_source?: string;
  PG_TYPE?: string;
  bank_ref_no?: string;
  bankcode?: string;
  error?: string;
  error_Message?: string;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Admin stats
export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  pendingOrders: number;
  todayOrders: number;
  todayRevenue: number;
  lowStockProducts: number;
  recentOrders: Order[];
}

export interface SiteSettings {
  id: string;
  freeShippingAbove: number;
  shippingCost: number;
  gstPercentage: number;
  maintenanceMode: boolean;
  bannerText?: string | null;
  bannerActive: boolean;
}
