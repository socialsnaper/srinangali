import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us — Sri Nangali Overseas',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-gradient-to-r from-saffron to-saffron-800 text-white py-12">
          <div className="page-container text-center">
            <h1 className="font-heading text-4xl font-bold mb-3">Contact Us</h1>
            <p className="text-white/80">
              Get in touch for bulk orders, enquiries, or any assistance
            </p>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="page-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-6">
                <h2 className="font-heading text-3xl font-bold text-gray-900">
                  Get In Touch
                </h2>
                <p className="text-gray-600">
                  Whether you are a retailer, restaurant, exporter or household
                  buyer — we are here to serve you with the finest quality rice
                  and pulses.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-gray-100">
                    <div className="h-10 w-10 bg-saffron-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-saffron" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Phone</p>
                      <a
                        href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE}`}
                        className="text-saffron hover:underline"
                      >
                        {process.env.NEXT_PUBLIC_COMPANY_PHONE || '+91 98765 43210'}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-gray-100">
                    <div className="h-10 w-10 bg-saffron-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-saffron" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Email</p>
                      <a
                        href={`mailto:${process.env.NEXT_PUBLIC_COMPANY_EMAIL}`}
                        className="text-saffron hover:underline"
                      >
                        {process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'info@srinangalioverseas.com'}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-gray-100">
                    <div className="h-10 w-10 bg-saffron-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-saffron" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Address</p>
                      <p className="text-gray-600">
                        {process.env.NEXT_PUBLIC_COMPANY_ADDRESS || 'Sri Nangali Overseas, India'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-gray-100">
                    <div className="h-10 w-10 bg-saffron-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-saffron" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Business Hours</p>
                      <p className="text-gray-600">Mon – Sat: 9:00 AM – 6:00 PM</p>
                      <p className="text-gray-500 text-sm">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Enquiry */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <h3 className="font-heading text-2xl font-bold text-gray-900 mb-6">
                  Send Enquiry
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-saffron/30 focus:border-saffron"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-saffron/30 focus:border-saffron"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Products Interested In
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-saffron/30 focus:border-saffron">
                      <option value="">Select category</option>
                      <option>1121 Basmati Rice</option>
                      <option>Pulses & Dals</option>
                      <option>Both Rice & Pulses</option>
                      <option>Bulk/Wholesale Order</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Describe your requirements, quantity needed, etc."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-saffron/30 focus:border-saffron resize-none"
                    />
                  </div>
                  <a
                    href={`https://wa.me/${(process.env.NEXT_PUBLIC_COMPANY_PHONE || '919876543210').replace(/[^0-9]/g, '')}?text=Hello, I am interested in your products`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full justify-center text-center py-3 rounded-xl font-semibold inline-flex items-center gap-2"
                  >
                    💬 Send via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
