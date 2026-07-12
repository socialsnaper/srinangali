import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/store/HeroSection';
import { TrustBadges } from '@/components/store/TrustBadges';
import { CategorySection } from '@/components/store/CategorySection';
import { FeaturedProducts } from '@/components/store/FeaturedProducts';
import { AboutSection } from '@/components/store/AboutSection';
import { prisma } from '@/lib/db';

async function getFeaturedProducts() {
  try {
    return await prisma.product.findMany({
      where: { isActive: true, isFeatured: true },
      orderBy: { updatedAt: 'desc' },
      take: 8,
    });
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TrustBadges />
        <CategorySection />
        <FeaturedProducts products={featuredProducts} />
        <AboutSection />

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-saffron to-saffron-800 text-white text-center">
          <div className="page-container">
            <h2 className="font-heading text-4xl font-bold mb-4">
              Wholesale & Bulk Orders Welcome
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              We supply to retailers, restaurants, exporters and institutions.
              Contact us for competitive bulk pricing on all our products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-saffron font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-lg text-lg"
              >
                📞 Call Us Now
              </a>
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_COMPANY_EMAIL}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition-colors border border-white/30 text-lg"
              >
                ✉️ Send Enquiry
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
