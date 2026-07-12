'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  ShoppingCart,
  Menu,
  X,
  Search,
  Phone,
  ChevronDown,
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  {
    label: 'Products',
    children: [
      { href: '/products?category=RICE', label: '🌾 Rice' },
      { href: '/products?category=PULSES', label: '🫘 Pulses' },
      { href: '/products', label: 'All Products' },
    ],
  },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const { items, openCart, getItemCount } = useCartStore();
  const itemCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-saffron text-white text-xs py-1.5 hidden md:block">
        <div className="page-container flex justify-between items-center">
          <span className="flex items-center gap-2">
            <Phone className="h-3 w-3" />
            {process.env.NEXT_PUBLIC_COMPANY_PHONE || '+91 98765 43210'}
          </span>
          <span>
            🌾 Premium Rice & Pulses — Manufacturer | Exporter | Supplier
          </span>
          <span>{process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'info@srinangalioverseas.com'}</span>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={cn(
          'sticky top-0 z-40 bg-white transition-all duration-300',
          scrolled ? 'shadow-md' : 'border-b border-gray-100'
        )}
      >
        <div className="page-container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <div className="relative h-10 w-10 md:h-12 md:w-12">
                <div className="h-full w-full rounded-full bg-gradient-to-br from-saffron to-gold flex items-center justify-center shadow-sm">
                  <span className="text-white font-bold text-lg font-heading">S</span>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="text-saffron font-bold text-lg font-heading leading-tight">
                  Sri Nangali
                </div>
                <div className="text-forest text-xs font-semibold tracking-wider uppercase">
                  Overseas
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                if (link.children) {
                  return (
                    <div key={link.label} className="relative group">
                      <button
                        className={cn(
                          'flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-saffron rounded-lg hover:bg-saffron-50 transition-colors',
                        )}
                      >
                        {link.label}
                        <ChevronDown className="h-3.5 w-3.5" />
                      </button>
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top scale-95 group-hover:scale-100 z-50">
                        <div className="p-2">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-saffron hover:bg-saffron-50 rounded-lg transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href!}
                    className={cn(
                      'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                      pathname === link.href
                        ? 'text-saffron bg-saffron-50'
                        : 'text-gray-700 hover:text-saffron hover:bg-saffron-50'
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Cart Button */}
              <button
                onClick={openCart}
                className="relative p-2.5 text-gray-700 hover:text-saffron hover:bg-saffron-50 rounded-full transition-colors"
                aria-label="Open cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-saffron text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2.5 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="page-container py-4 space-y-1">
              <Link
                href="/"
                className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:text-saffron hover:bg-saffron-50 rounded-lg"
              >
                Home
              </Link>
              <div>
                <button
                  onClick={() => setProductsOpen(!productsOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-700 hover:text-saffron hover:bg-saffron-50 rounded-lg"
                >
                  Products
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 transition-transform',
                      productsOpen && 'rotate-180'
                    )}
                  />
                </button>
                {productsOpen && (
                  <div className="pl-4 space-y-1">
                    <Link
                      href="/products?category=RICE"
                      className="flex items-center px-4 py-2.5 text-sm text-gray-600 hover:text-saffron hover:bg-saffron-50 rounded-lg"
                    >
                      🌾 Rice
                    </Link>
                    <Link
                      href="/products?category=PULSES"
                      className="flex items-center px-4 py-2.5 text-sm text-gray-600 hover:text-saffron hover:bg-saffron-50 rounded-lg"
                    >
                      🫘 Pulses
                    </Link>
                    <Link
                      href="/products"
                      className="flex items-center px-4 py-2.5 text-sm text-gray-600 hover:text-saffron hover:bg-saffron-50 rounded-lg"
                    >
                      All Products
                    </Link>
                  </div>
                )}
              </div>
              <Link
                href="/about"
                className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:text-saffron hover:bg-saffron-50 rounded-lg"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:text-saffron hover:bg-saffron-50 rounded-lg"
              >
                Contact
              </Link>
              <div className="pt-2 border-t border-gray-100">
                <a
                  href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE}`}
                  className="flex items-center gap-2 px-4 py-3 text-sm text-saffron font-medium"
                >
                  <Phone className="h-4 w-4" />
                  {process.env.NEXT_PUBLIC_COMPANY_PHONE || '+91 98765 43210'}
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
