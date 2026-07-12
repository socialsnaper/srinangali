import { Award, Globe, Leaf, Users } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/Button';

const strengths = [
  {
    icon: Award,
    title: 'Premium Quality',
    desc: 'Every grain is carefully selected, processed with state-of-the-art technology and tested for quality and purity before packing.',
  },
  {
    icon: Globe,
    title: 'Global Exporter',
    desc: 'Exporting our premium basmati rice and pulses to over 20 countries worldwide, bringing the best of Indian agriculture to the world.',
  },
  {
    icon: Leaf,
    title: '100% Natural',
    desc: 'No preservatives, no artificial colors. We believe in delivering the pure goodness of nature in every pack.',
  },
  {
    icon: Users,
    title: 'Trusted by Millions',
    desc: 'Serving households, restaurants, and businesses for over 15 years with consistent quality and reliability.',
  },
];

export function AboutSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-950 to-gray-900 text-white overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 h-64 w-64 rounded-full bg-saffron opacity-5 blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-forest opacity-5 blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="page-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div>
            <p className="text-saffron-400 font-semibold text-sm uppercase tracking-widest mb-4">
              About Sri Nangali Overseas
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              India's Trusted
              <br />
              <span className="text-gradient-saffron bg-gradient-to-r from-gold-300 to-saffron-400 bg-clip-text text-transparent">
                Grain Experts
              </span>
            </h2>
            <p className="text-gray-400 text-base leading-relaxed mb-6">
              Sri Nangali Overseas is a leading manufacturer, exporter, supplier
              and retailer of premium 1121 Basmati Rice and quality pulses. With
              over 15 years of expertise, we have built a reputation for
              delivering consistent quality and authentic taste.
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              From the fertile rice fields of Haryana and Punjab to kitchens
              around the world — we bring you the finest grains, processed with
              modern technology while preserving their natural goodness.
            </p>
            <Link href="/about" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base bg-saffron hover:bg-saffron-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-sm">
              Learn More About Us
            </Link>
          </div>

          {/* Right — Strengths Grid */}
          <div className="grid grid-cols-2 gap-4">
            {strengths.map((s) => (
              <div
                key={s.title}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="h-10 w-10 rounded-xl bg-saffron/20 flex items-center justify-center mb-4">
                  <s.icon className="h-5 w-5 text-saffron-400" />
                </div>
                <h3 className="font-semibold text-white text-sm mb-2">
                  {s.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
