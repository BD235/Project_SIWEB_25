'use client';

import Image from 'next/image';
import RomanticButton from '../ui/RomanticButton';
import { FaHeart, FaStar } from 'react-icons/fa';
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  size?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  rating?: number | string;
  reviewCount?: number;
  ingredients?: string[];
  allergens?: string[];
  decorations?: string[];
  isFavorite?: boolean;
}

export default function ProductCard({ product }: { product: Product }) {
  const [isFavorite, setIsFavorite] = useState(product.isFavorite || false);
  const toggleFavorite = () => setIsFavorite(!isFavorite);

  const formatRating = (rating?: number | string) => {
    if (rating === undefined || rating === null) return null;
    const num = Number(rating);
    if (isNaN(num)) return null;
    return num.toFixed(1);
  };

  const ratingFormatted = formatRating(product.rating);

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group flex flex-col">
      {/* Bagian Gambar */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image 
          src={product.image} 
          alt={product.name} 
          layout="fill" 
          className="object-cover transition-transform duration-300 group-hover:scale-105" 
          priority
        />

        {/* Badge NEW & Rating */}
        <div className="absolute top-3 left-3 flex space-x-2 z-10">
          {product.isNew && (
            <span className="bg-rose-500 text-white text-xs font-semibold px-3 py-0.5 rounded-full shadow">
              NEW
            </span>
          )}
          {ratingFormatted && (
            <span className="bg-white text-amber-500 text-xs font-semibold px-3 py-0.5 rounded-full flex items-center shadow">
              <FaStar className="mr-1" /> {ratingFormatted}
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button 
          onClick={toggleFavorite}
          aria-label={isFavorite ? 'Hapus dari favorit' : 'Tambahkan ke favorit'}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-colors duration-300 z-10
            ${isFavorite ? 'text-rose-600 bg-rose-100 hover:bg-rose-200' : 'text-gray-400 bg-white hover:bg-gray-100'}`}
        >
          <FaHeart size={18} />
        </button>

        {/* Tombol Tambahkan ke Keranjang */}
        <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
          <RomanticButton size="sm" fullWidth icon="cart" animate="pulse">
            Tambahkan ke Keranjang
          </RomanticButton>
        </div>
      </div>

      {/* Info Produk */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-extrabold text-rose-900 mb-1 truncate">{product.name}</h3>
        <span className="text-rose-600 font-semibold text-xl mb-3">Rp {product.price.toLocaleString('id-ID')}</span>

        <p className="text-gray-700 text-sm mb-4 line-clamp-3">{product.description}</p>

        <div className="flex justify-between items-center mt-auto">
          {product.size && (
            <span className="text-xs text-rose-700 bg-rose-100 font-semibold px-3 py-1 rounded-full">
              {product.size}
            </span>
          )}

          <RomanticButton variant="outline" size="sm" icon="arrow">
            Lihat Detail
          </RomanticButton>
        </div>
      </div>
    </div>
  );
}
