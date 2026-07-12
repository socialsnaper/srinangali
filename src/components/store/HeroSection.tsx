'use client';

import Link from 'next/link';
import { ArrowRight, Award, Leaf, Globe } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1c0a05] via-[#3d1208] to-[#1b6b3a] min-h-[85vh] flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="hero-pattern"
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="40" cy="40" r="1.5" fill="white" opacity="0.6" />
              <circle cx="0" cy="0" r="1" fill="white" opacity="0.4" />
              <circle cx="80" cy="80" r="1" fill="white" opacity="0.4" />
              <path
                d="M40 20 C40 20 45 30 40 40 C35 30 40 20 40 20Z"
                fill="white"
                opacity="0.15"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-pattern)" />
        </svg>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 right-10 h-64 w-64 rounded-full bg-saffron opacity-10 blur-3xl" />
      <div className="absolute bottom-10 left-20 h-96 w-96 rounded-full bg-forest opacity-10 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-gold opacity-5 blur-3xl" />

      <div className="page-container relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white animate-fade-in">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full text-sm font-medium mb-6 border border-white/20">
              <Award className="h-4 w-4 text-gold" />
              <span className="text-gold-300">
                India's Premier Rice & Pulses Brand
              </span>
            </div>

            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="text-white">Finest</span>
              <br />
              <span className="text-gradient-saffron bg-gradient-to-r from-gold-300 to-saffron-300 bg-clip-text text-transparent">
                Basmati Rice
              </span>
              <br />
              <span className="text-white text-4xl md:text-5xl">& Pulses</span>
            </h1>

            <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-lg">
              Sri Nangali Overseas — trusted manufacturer, exporter, supplier
              and retailer of premium 1121 Basmati Rice and finest quality
              pulses. From our farms to your table.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base bg-saffron hover:bg-saffron-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-saffron/30"
              >
                Shop Now
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/30 backdrop-blur transition-all duration-200"
              >
                Our Story
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: '28+', label: 'Products' },
                { value: '500+', label: 'Clients' },
                { value: '15+', label: 'Years' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gold-300 font-heading">
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative hidden lg:flex items-center justify-center">
            <div className="relative">
              {/* Main Circle */}
              <div className="h-80 w-80 rounded-full bg-gradient-to-br from-gold/30 to-saffron/20 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                <div className="h-60 w-60 rounded-full bg-gradient-to-br from-saffron/40 to-gold/20 border border-white/10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-3">🌾</div>
                    <div className="text-white font-heading text-xl font-bold">
                      1121
                    </div>
                    <div className="text-gold-300 text-sm">Basmati Rice</div>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-xl text-center">
                <Globe className="h-6 w-6 text-saffron mx-auto mb-1" />
                <div className="text-gray-800 font-bold text-sm">Exporter</div>
                <div className="text-gray-500 text-xs">Worldwide</div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl text-center">
                <Leaf className="h-6 w-6 text-forest mx-auto mb-1" />
                <div className="text-gray-800 font-bold text-sm">Pure</div>
                <div className="text-gray-500 text-xs">100% Natural</div>
              </div>

              <div className="absolute top-1/2 -right-20 -translate-y-1/2 bg-white rounded-2xl p-4 shadow-xl text-center">
                <Award className="h-6 w-6 text-gold mx-auto mb-1" />
                <div className="text-gray-800 font-bold text-sm">Premium</div>
                <div className="text-gray-500 text-xs">Quality</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full"
        >
          <path
            d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z"
            fill="#fffdf8"
          />
        </svg>
      </div>
    </section>
  );
}
