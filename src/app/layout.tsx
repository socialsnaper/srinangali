import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { CartDrawer } from '@/components/store/CartDrawer';

export const metadata: Metadata = {
  title: {
    default: 'Sri Nangali Overseas — Premium Rice & Pulses',
    template: '%s | Sri Nangali Overseas',
  },
  description:
    'Sri Nangali Overseas — Top manufacturer, exporter, supplier and retailer of premium 1121 Basmati Rice, pulses and FMCG products. Shop authentic Indian rice and pulses at best prices.',
  keywords: [
    'Sri Nangali Overseas',
    '1121 Basmati Rice',
    'Basmati Rice',
    'Rice exporter India',
    'Pulses',
    'Chana Dal',
    'Rajma',
    'Indian rice online',
    'buy basmati rice',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'Sri Nangali Overseas',
    title: 'Sri Nangali Overseas — Premium Rice & Pulses',
    description:
      'Top manufacturer, exporter, supplier and retailer of premium 1121 Basmati Rice and pulses.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN">
      <body>
        {children}
        <CartDrawer />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              fontFamily: 'Poppins, sans-serif',
              fontSize: '14px',
              borderRadius: '10px',
            },
            success: {
              style: {
                background: '#f0fdf4',
                color: '#166534',
                border: '1px solid #bbf7d0',
              },
            },
            error: {
              style: {
                background: '#fff1f2',
                color: '#be123c',
                border: '1px solid #fecdd3',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
