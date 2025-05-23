import RomanticNavbar from '@/components/main/RomanticNavbar';
import ProductCard from '@/components/main/ProductCard';
import HeartFooter from '@/components/main/HeartFooter';
import { getProducts } from '@/lib/queries/getProducts';
import { space } from 'postcss/lib/list';

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-rose-50">
      <RomanticNavbar />
      
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <h1 className="text-3xl font-bold text-rose-800 mb-8 text-center">Koleksi Kue Romantis Kami</h1>
          
          <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="w-full md:w-1/2">
              <input
                type="text"
                placeholder="Cari kue..."
                className="w-full p-3 border border-rose-300 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
            <div className="w-full md:w-1/2 flex justify-end">
              <select className="p-3 border border-rose-300 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500 text-rose-800">
                <option>Urutkan Berdasarkan</option>
                <option>Terendah ke Tertinggi</option>
                <option>Tertinggi ke Terendah</option>
                <option>Paling Populer</option>
                <option>Terbaru</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>


      <HeartFooter />
    </div>
  );
}
