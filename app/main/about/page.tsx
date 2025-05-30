'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaHeart, FaBirthdayCake, FaUsers } from 'react-icons/fa';
import dynamic from 'next/dynamic';

// Dynamic imports for components that might be causing the issue
const RomanticNavbar = dynamic(() => import('@/components/main/RomanticNavbar'), {
  ssr: false
});
const HeartFooter = dynamic(() => import('@/components/main/HeartFooter'), {
  ssr: false
});

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <RomanticNavbar />
      
      <main className="py-16 px-20 container mx-auto max-w-7xl center"> {/* Added container class */}
        <motion.div 
          className="w-full" // Changed from max-w-4xl to w-full
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="text-5xl font-bold text-rose-800 mb-12 text-center font-serif relative"
            {...fadeIn}
          >
            <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-rose-300 text-4xl"></span>
            Kisah Cinta Kami
          </motion.h1>
          
          <motion.div 
            className="bg-white rounded-2xl shadow-xl p-8 mb-12 relative overflow-hidden"
            {...fadeIn}
          >
            {/* Decorative background pattern */}
            <div className="absolute inset-0 bg-rose-50 opacity-5 pattern-hearts"></div>
            
            <div className="flex flex-col md:flex-row gap-12 items-center mb-12">
              <motion.div 
                className="w-full md:w-1/2"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
                  <Image 
                    src="/images/kami.jpg" 
                    alt="Our Love Story"
                    fill
                    className="object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </motion.div>
              
              <div className="w-full md:w-1/2 space-y-6">
                <h2 className="text-3xl font-bold text-rose-700 mb-4 font-serif flex items-center gap-3">
                  Bagaimana Semua Dimulai
                </h2>
                <p className="text-rose-900 leading-relaxed">
                  Itu adalah sore yang hujan di Paris ketika kami pertama kali bertemu di sebuah patiseri kecil. 
                  Cinta kami yang sama terhadap kue membawa kami bersama, dan tak lama kemudian kami mulai membuat 
                  kue-kue indah yang menceritakan kisah cinta.
                </p>
                <p className="text-rose-900 leading-relaxed italic border-l-4 border-rose-300 pl-4">
                  Pada tahun 2020, kami memutuskan untuk mengubah passion kami menjadi bisnis, dan Sweet Love Bakery pun lahir.
                </p>
              </div>
            </div>
            
            <motion.div 
              className="mb-12 p-8 bg-rose-50 rounded-xl"
              {...fadeIn}
            >
              <h2 className="text-3xl font-bold text-rose-700 mb-6 font-serif flex items-center gap-3">
                <FaBirthdayCake className="text-rose-500" />
                Filosofi Kami
              </h2>
              <p className="text-rose-900 leading-relaxed">
                Kami percaya setiap kue haruslah unik seperti cinta yang dirayakannya. 
                Itulah sebabnya kami menuangkan hati kami ke dalam setiap kreasi, menggunakan hanya bahan-bahan terbaik 
                dan teknik-teknik yang diturunkan dari generasi ke generasi.
              </p>
            </motion.div>
            
            <motion.div {...fadeIn}>
              <h2 className="text-3xl font-bold text-rose-700 mb-8 font-serif flex items-center gap-3">
                <FaUsers className="text-rose-500" />
                Kenali Tim Kami
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    name: "Dicky",
                    role: "Koki Kue & Co-Founder",
                    quote: "Saya fokus pada pembuatan kue-kue dengan sentuhan klasik yang selalu membuat orang jatuh cinta pada rasa dan penampilannya."
                  },
                  {
                    name: "Aldo",
                    role: "Koki Pastry & Koordinator Kreatif",
                    quote: "Saya menggabungkan teknik pastry tradisional dengan kreativitas modern untuk menghasilkan rasa yang luar biasa."
                  },
                  {
                    name: "Yosia",
                    role: "Manajer Operasional & Co-Founder",
                    quote: "Saya memastikan semua proses operasional berjalan dengan lancar dan membantu dalam pengembangan produk baru yang menarik."
                  }
                ].map((member, index) => (
                  <motion.div
                    key={member.name}
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <h3 className="text-2xl font-semibold text-rose-800 mb-2">{member.name}</h3>
                    <p className="text-rose-700 font-medium mb-3">{member.role}</p>
                    <p className="text-rose-600 italic">&quot;{member.quote}&quot;</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>

      <HeartFooter />
    </div>
  );
}