import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      {/* Main Footer */}
      <div className="page-container py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-11 w-11 rounded-full bg-gradient-to-br from-saffron to-gold flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-xl font-heading">S</span>
              </div>
              <div>
                <div className="text-white font-bold text-xl font-heading leading-tight">
                  Sri Nangali
                </div>
                <div className="text-saffron-400 text-xs font-semibold tracking-wider uppercase">
                  Overseas
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Top manufacturer, exporter, supplier and retailer of premium 1121
              Basmati Rice and quality pulses. Serving India and the world with
              the finest grains.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="h-9 w-9 bg-gray-800 hover:bg-saffron rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="h-9 w-9 bg-gray-800 hover:bg-saffron rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="h-9 w-9 bg-gray-800 hover:bg-saffron rounded-full flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="h-9 w-9 bg-gray-800 hover:bg-saffron rounded-full flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-base mb-5 font-heading">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/products', label: 'All Products' },
                { href: '/products?category=RICE', label: 'Rice' },
                { href: '/products?category=PULSES', label: 'Pulses' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-saffron-400 text-sm transition-colors flex items-center gap-2"
                  >
                    <span className="text-saffron text-xs">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold text-base mb-5 font-heading">
              Our Products
            </h4>
            <ul className="space-y-3">
              {[
                'Silver 1121 Steam Basmati Rice',
                'Gold 1121 Basmati Rice',
                'Diamond Basmati Rice',
                'Chana Dal',
                'Arhar Dal Bold',
                'Kabuli Chana',
                'Rajma Varieties',
                'Moong Dal',
              ].map((product) => (
                <li key={product}>
                  <Link
                    href="/products"
                    className="text-gray-400 hover:text-saffron-400 text-sm transition-colors flex items-center gap-2"
                  >
                    <span className="text-saffron text-xs">›</span>
                    {product}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-base mb-5 font-heading">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-saffron mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  {process.env.NEXT_PUBLIC_COMPANY_ADDRESS ||
                    'Sri Nangali Overseas, India'}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-saffron flex-shrink-0" />
                <a
                  href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE}`}
                  className="text-gray-400 hover:text-saffron-400 text-sm transition-colors"
                >
                  {process.env.NEXT_PUBLIC_COMPANY_PHONE || '+91 98765 43210'}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-saffron flex-shrink-0" />
                <a
                  href={`mailto:${process.env.NEXT_PUBLIC_COMPANY_EMAIL}`}
                  className="text-gray-400 hover:text-saffron-400 text-sm transition-colors"
                >
                  {process.env.NEXT_PUBLIC_COMPANY_EMAIL ||
                    'info@srinangalioverseas.com'}
                </a>
              </li>
            </ul>

            {/* GST */}
            <div className="mt-6 p-3 bg-gray-900 rounded-lg">
              <p className="text-gray-500 text-xs">
                GSTIN:{' '}
                <span className="text-gray-300">
                  {process.env.NEXT_PUBLIC_GST_NUMBER || '[GST Number]'}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="page-container py-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs text-center">
            © {new Date().getFullYear()} Sri Nangali Overseas. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="text-gray-500 hover:text-gray-300 text-xs transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-500 hover:text-gray-300 text-xs transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/refund-policy"
              className="text-gray-500 hover:text-gray-300 text-xs transition-colors"
            >
              Refund Policy
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-xs">Secure Payments via PayU</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
