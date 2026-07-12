import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Award, Globe, Leaf, Users, Factory, TrendingUp, ShieldCheck, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us — Sri Nangali Overseas',
  description: 'Learn about Sri Nangali Overseas — India\'s trusted manufacturer, exporter, supplier and retailer of premium 1121 Basmati Rice and quality pulses.',
};

const milestones = [
  { year: '2008', event: 'Founded Sri Nangali Overseas' },
  { year: '2012', event: 'Started 1121 Basmati Rice exports' },
  { year: '2016', event: 'Expanded to 15+ export countries' },
  { year: '2020', event: 'Launched FMCG product range' },
  { year: '2024', event: '500+ satisfied clients worldwide' },
];

const values = [
  { icon: Award, title: 'Quality First', desc: 'Every grain is quality-checked and certified before packing.' },
  { icon: Leaf, title: 'Natural & Pure', desc: 'No artificial additives. Pure, natural goodness in every pack.' },
  { icon: Globe, title: 'Global Reach', desc: 'Exporting to 20+ countries with reliable supply chains.' },
  { icon: Users, title: 'Customer Trust', desc: 'Building relationships with 500+ clients through consistent quality.' },
  { icon: Factory, title: 'Modern Processing', desc: 'State-of-the-art milling and processing facilities.' },
  { icon: ShieldCheck, title: 'Certified', desc: 'FSSAI, AGMARK, and export certifications for all products.' },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-r from-saffron to-saffron-800 text-white py-20">
          <div className="page-container text-center">
            <p className="text-saffron-200 text-sm font-medium uppercase tracking-widest mb-4">
              🏠 Home / About Us
            </p>
            <h1 className="font-heading text-5xl font-bold mb-4">
              About Sri Nangali Overseas
            </h1>
            <p className="text-white/80 text-xl max-w-2xl mx-auto">
              India's trusted manufacturer, exporter, supplier and retailer of
              premium 1121 Basmati Rice and quality pulses since 2008.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 bg-white">
          <div className="page-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-saffron font-semibold text-sm uppercase tracking-widest mb-3">
                  Our Story
                </p>
                <h2 className="font-heading text-4xl font-bold text-gray-900 mb-6">
                  From Farm to Your Table
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Sri Nangali Overseas was founded with a simple mission: to
                    bring the finest quality Indian rice and pulses to homes and
                    businesses across India and the world.
                  </p>
                  <p>
                    We are one of the leading manufacturers, exporters, suppliers
                    and retailers of the acclaimed 1121 Basmati Rice — known
                    worldwide for its extraordinary grain length, royal aroma,
                    and exceptional cooking quality.
                  </p>
                  <p>
                    Our processing facilities in the heart of the rice belt use
                    modern technology while preserving the natural goodness of
                    every grain. From paddy procurement to the final polished
                    product, we maintain strict quality standards at every step.
                  </p>
                  <p>
                    Today, we are proud to serve 500+ clients across restaurants,
                    retailers, exporters, and households with a complete range
                    of rice varieties and nutritious pulses.
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-5">
                {[
                  { value: '15+', label: 'Years of Excellence', icon: Star },
                  { value: '28+', label: 'Premium Products', icon: Award },
                  { value: '500+', label: 'Happy Clients', icon: Users },
                  { value: '20+', label: 'Export Countries', icon: Globe },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-cream rounded-2xl p-6 text-center border border-cream-300"
                  >
                    <stat.icon className="h-8 w-8 text-saffron mx-auto mb-3" />
                    <div className="text-4xl font-bold text-gray-900 font-heading mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-pattern-indian">
          <div className="page-container">
            <div className="text-center mb-12">
              <h2 className="section-title">Our Values</h2>
              <p className="section-subtitle">
                What drives us to deliver the best every day
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {values.map((v) => (
                <div key={v.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="h-10 w-10 bg-saffron-50 rounded-xl flex items-center justify-center mb-4">
                    <v.icon className="h-5 w-5 text-saffron" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-500">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Milestones */}
        <section className="py-16 bg-white">
          <div className="page-container">
            <div className="text-center mb-12">
              <h2 className="section-title">Our Journey</h2>
            </div>
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-saffron-100" />
              <div className="space-y-8">
                {milestones.map((m, i) => (
                  <div
                    key={m.year}
                    className={`flex items-center gap-6 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className="flex-1 text-right">
                      {i % 2 === 0 && (
                        <div className="bg-cream rounded-2xl p-4 border border-cream-300 inline-block">
                          <p className="font-semibold text-gray-800 text-sm">
                            {m.event}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="relative z-10 h-12 w-12 bg-saffron rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                      <span className="text-white font-bold text-xs">
                        {m.year.slice(2)}
                      </span>
                    </div>
                    <div className="flex-1">
                      {i % 2 !== 0 && (
                        <div className="bg-cream rounded-2xl p-4 border border-cream-300 inline-block">
                          <p className="font-semibold text-gray-800 text-sm">
                            {m.event}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
