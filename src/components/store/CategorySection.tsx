import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    name: 'Basmati Rice',
    description: 'Premium 1121 Steam Basmati & more',
    href: '/products?category=RICE',
    emoji: '🌾',
    count: 8,
    gradient: 'from-amber-500 to-saffron',
    bg: 'bg-amber-50',
    accent: 'text-amber-700',
  },
  {
    name: 'Pulses & Dals',
    description: 'Chana, Rajma, Moong, Arhar & more',
    href: '/products?category=PULSES',
    emoji: '🫘',
    count: 20,
    gradient: 'from-forest to-emerald-600',
    bg: 'bg-emerald-50',
    accent: 'text-emerald-700',
  },
  {
    name: 'FMCG Products',
    description: 'Everyday essentials coming soon',
    href: '/products?category=FMCG',
    emoji: '🏪',
    count: 0,
    gradient: 'from-purple-500 to-indigo-600',
    bg: 'bg-purple-50',
    accent: 'text-purple-700',
    comingSoon: true,
  },
];

export function CategorySection() {
  return (
    <section className="py-16 bg-pattern-indian">
      <div className="page-container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-saffron font-semibold text-sm uppercase tracking-widest mb-3">
            Browse by Category
          </p>
          <h2 className="section-title text-gray-900">
            Our Product Range
          </h2>
          <p className="section-subtitle max-w-xl mx-auto">
            From premium basmati rice to nutritious pulses — everything your
            kitchen needs, straight from certified Indian farms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.comingSoon ? '#' : cat.href}
              className={`group relative overflow-hidden rounded-3xl p-8 transition-all duration-300 ${cat.bg} hover:shadow-xl hover:-translate-y-1 border border-white ${cat.comingSoon ? 'cursor-default opacity-80' : ''}`}
            >
              {/* Emoji */}
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300 origin-left">
                {cat.emoji}
              </div>

              {/* Content */}
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-gray-900 text-xl mb-1">
                      {cat.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{cat.description}</p>
                  </div>
                  {!cat.comingSoon && (
                    <ArrowRight
                      className={`h-5 w-5 ${cat.accent} mt-1 group-hover:translate-x-1 transition-transform`}
                    />
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span
                    className={`text-sm font-semibold ${cat.accent}`}
                  >
                    {cat.comingSoon
                      ? 'Coming Soon'
                      : `${cat.count} Products`}
                  </span>
                  {!cat.comingSoon && (
                    <span
                      className={`text-xs font-medium ${cat.accent} bg-white/60 px-3 py-1 rounded-full`}
                    >
                      Shop Now
                    </span>
                  )}
                </div>
              </div>

              {/* Gradient Decoration */}
              <div
                className={`absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br ${cat.gradient} opacity-10 group-hover:opacity-20 transition-opacity`}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
