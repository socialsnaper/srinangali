import { Truck, ShieldCheck, Award, RotateCcw } from 'lucide-react';

const badges = [
  {
    icon: Truck,
    title: 'Free Delivery',
    desc: 'On orders above ₹500',
    color: 'text-saffron',
    bg: 'bg-saffron-50',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payments',
    desc: 'PayU | Cards | UPI',
    color: 'text-forest',
    bg: 'bg-forest-50',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    desc: 'Certified & tested grains',
    color: 'text-gold',
    bg: 'bg-gold-50',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    desc: '7-day return policy',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
];

export function TrustBadges() {
  return (
    <section className="py-10 bg-white border-b border-gray-100">
      <div className="page-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.title}
              className="flex items-center gap-4 p-4 rounded-2xl hover:shadow-sm transition-shadow"
            >
              <div
                className={`h-12 w-12 rounded-xl ${badge.bg} flex items-center justify-center flex-shrink-0`}
              >
                <badge.icon className={`h-6 w-6 ${badge.color}`} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">
                  {badge.title}
                </h3>
                <p className="text-gray-500 text-xs mt-0.5">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
