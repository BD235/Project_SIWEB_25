import Image from 'next/image';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

interface Testimonial {
  id: number;
  name: string;
  role?: string;
  comment: string;
  rating: number;
  image?: string;
  date?: string;
}

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-rose-100 hover:border-rose-200 transition-colors duration-300 h-full relative">
      <div className="flex items-start mb-4">
        <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4 border-2 border-rose-200">
          {testimonial.image ? (
          <Image
            src={testimonial.image ? `/${testimonial.image}` : '/default-image.png'}
            alt={testimonial.name}
            fill
            className="object-cover"
            sizes="48px"
            priority
          />

          ) : (
            <div className="bg-rose-100 h-full w-full flex items-center justify-center text-rose-600">
              {testimonial.name.charAt(0)}
            </div>
          )}
        </div>

        <div>
          <h4 className="font-bold text-rose-800">{testimonial.name}</h4>
          {testimonial.role && (
            <p className="text-sm text-rose-600">{testimonial.role}</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`${i < testimonial.rating ? 'text-amber-400' : 'text-gray-300'} mr-1`}
            />
          ))}
        </div>

        <FaQuoteLeft className="text-rose-200 text-xl mb-2" />
        <p className="text-gray-600 italic pl-6">"{testimonial.comment}"</p>
      </div>

      {testimonial.date && (
        <p className="text-sm text-gray-400 text-right">{testimonial.date}</p>
      )}

      {/* Decorative elements */}
      <div className="absolute bottom-4 right-4 text-rose-50 text-6xl -z-10">
        <FaQuoteLeft />
      </div>
    </div>
  );
}
