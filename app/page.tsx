'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const SpecialOfferBanner = dynamic(() => import('@/components/main/SpecialOfferBanner'), { ssr: false });

import RomanticNavbar from '@/components/main/RomanticNavbar';
import ProductCard from '@/components/main/ProductCard';
import HeartFooter from '@/components/main/HeartFooter';
import TestimonialCard from '@/components/main/TestimonialCard';
import RomanticButton from '@/components/ui/RomanticButton';
import LogoLoading from '@/components/ui/LogoLoading';

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsRes, testimonialsRes] = await Promise.all([
          fetch('/api/featured-products'),
          fetch('/api/testimonials'),
        ]);

        const productsData = await productsRes.json();
        const testimonialsData = await testimonialsRes.json();

        setFeaturedProducts(productsData);
        setTestimonials(testimonialsData);
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <LogoLoading />;

  return (
    <div className="min-h-screen flex flex-col">
      <RomanticNavbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[80vh] min-h-[500px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-600 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('/images/heart-pattern.svg')] bg-repeat opacity-10"></div>

          <div className="relative h-full container mx-auto px-4 flex items-center justify-center">
            <div className="text-center max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-romantic">
                Sweet Love Bakery
              </h1>
              <p className="text-xl text-white mb-8">
                Setiap gigitan adalah cerita cinta yang manis
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/main/products">
                  <RomanticButton size="lg" icon="heart" animate="heartbeat">
                    Lihat Koleksi
                  </RomanticButton>
                </Link>

                <Link href="/main/about">
                  <RomanticButton variant="outline" size="lg" icon="arrow">
                    Kisah Kami
                  </RomanticButton>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Special Offer Banner */}
        <SpecialOfferBanner />

        {/* Featured Products */}
        <section className="py-16 px-4 container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-rose-800 mb-4">Kue Spesial Kami</h2>
            <div className="w-24 h-1 bg-rose-400 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/main/products">
              <RomanticButton size="lg" icon="arrow" animate="float">
                Lihat Semua Produk
              </RomanticButton>
            </Link>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4 container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-rose-800 mb-4">Kata Mereka</h2>
            <p className="text-rose-600 max-w-2xl mx-auto">
              Kebahagiaan pelanggan adalah prioritas kami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial: any) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-rose-500 to-pink-600 text-white py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Siap Membuat Momen Spesial?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Pesan kue romantis Anda hari ini dan buat kenangan manis yang tak terlupakan
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/main/products">
                <RomanticButton size="lg" variant="outline" icon="heart">
                  Pesan Sekarang
                </RomanticButton>
              </Link>
              <Link href="/main/contact">
                <RomanticButton size="lg" variant="secondary" icon="arrow">
                  Konsultasi Desain
                </RomanticButton>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <HeartFooter />
    </div>
  );
};

export default HomePage;
