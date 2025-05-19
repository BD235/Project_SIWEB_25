// import { CAKE_CATEGORIES } from './constants';

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
//   description: string;
//   category: string;
//   size?: string;
//   isNew?: boolean;
//   isFeatured?: boolean;
//   isBestSeller?: boolean;
//   rating?: number;
//   reviewCount?: number;
//   ingredients?: string[];
//   allergens?: string[];
//   decorations?: string[];
// }

// interface Testimonial {
//   id: number;
//   name: string;
//   role?: string;
//   comment: string;
//   rating: number;
//   image?: string;
//   date?: string;
// }

// export const featuredProducts: Product[] = [
//   {
//     id: 1,
//     name: 'Enchanted Heart Cake',
//     price: 350.000,
//     image: '/images/cakes/kue1.jpg',
//     description: 'Kue red velvet berbentuk hati yang lezat dengan frosting cream cheese dan detail daun emas yang dapat dimakan.',
//     category: 'romantic',
//     size: '8"',
//     isNew: true,
//     isFeatured: true,
//     rating: 4.8,
//     reviewCount: 42,
//     ingredients: ['Red velvet', 'Cream cheese', 'Fresh raspberries', 'Edible gold'],
//     allergens: ['Gluten', 'Dairy', 'Eggs'],
//     decorations: ['Heart-shaped', 'Gold leaf', 'Fresh flowers']
//   },
//   {
//     id: 2,
//     name: 'Eternal Love Chocolate',
//     price: 150.000,
//     image: '/images/cakes/kue2.jpg',
//     description: 'Kue coklat kaya dengan lapisan ganache coklat dan stroberi segar, dihias dengan keriting coklat.',
//     category: 'anniversary',
//     size: '9"',
//     isBestSeller: true,
//     rating: 4.9,
//     reviewCount: 56,
//     ingredients: ['Dark chocolate', 'Fresh cream', 'Strawberries', 'Chocolate curls'],
//     allergens: ['Gluten', 'Dairy', 'Eggs'],
//     decorations: ['Chocolate heart', 'Berry compote', 'Edible flowers']
//   },
//   {
//     id: 3,
//     name: 'Blushing Romance',
//     price: 250.000,
//     image: '/images/cakes/kue3.jpg',
//     description: 'Kue sponge vanilla halus dengan buttercream infus mawar dan isian raspberry, dihias dengan bunga gula.',
//     category: 'valentine',
//     size: '10"',
//     isFeatured: true,
//     rating: 5.0,
//     reviewCount: 38,
//     ingredients: ['Vanilla bean', 'Rose water', 'Raspberry jam', 'Edible flowers'],
//     allergens: ['Gluten', 'Dairy', 'Eggs'],
//     decorations: ['Sugar flowers', 'Pink ombre', 'Pearl details']
//   }
// ];

// export const allProducts: Product[] = [
//   ...featuredProducts,
//   {
//     id: 4,
//     name: 'Sweetheart Surprise',
//     price: 550.000,
//     image: '/images/cakes/kue4.jpg',
//     description: 'Kue stroberi lembut dengan buttercream vanilla dan isian raspberry berbentuk hati yang tersembunyi.',
//     category: 'romantic',
//     size: '6"',
//     rating: 4.7,
//     reviewCount: 29,
//     ingredients: ['Fresh strawberries', 'Vanilla bean', 'Raspberry coulis'],
//     allergens: ['Gluten', 'Dairy', 'Eggs'],
//     decorations: ['Heart-shaped', 'Pink drizzle', 'White chocolate']
//   },
//   {
//     id: 5,
//     name: 'Golden Anniversary',
//     price: 600.000,
//     image: '/images/cakes/kue5.jpg',
//     description: 'Kue dua tingkat elegan rasa vanilla dengan aksen emas dan buttercream yang terinfus dengan sampanye.',
//     category: 'anniversary',
//     size: '8" + 6"',
//     isNew: true,
//     rating: 4.9,
//     reviewCount: 18,
//     ingredients: ['Vanilla bean', 'Champagne', 'Edible gold', 'White chocolate'],
//     allergens: ['Gluten', 'Dairy', 'Eggs'],
//     decorations: ['Two-tier', 'Gold leaf', 'Sugar pearls']
//   },
//   {
//     id: 6,
//     name: 'Cupid\'s Delight',
//     price: 450.000,
//     image: '/images/cakes/kue6.jpg', 
//     description: 'Kue vanilla lembut dengan isian mousse stroberi dan ganache coklat putih.',
//     category: 'valentine',
//     size: '8"',
//     isBestSeller: true,
//     rating: 4.8,
//     reviewCount: 47,
//     ingredients: ['Vanilla', 'Strawberry mousse', 'White chocolate', 'Fresh berries'],
//     allergens: ['Gluten', 'Dairy', 'Eggs'],
//     decorations: ['Heart sprinkles', 'Chocolate drizzle', 'Berry topping']
//   }
// ];

// export const testimonials: Testimonial[] = [
//   {
//     id: 1,
//     name: 'Sarah & Michael',
//     role: 'Perayaan Ulang Tahun',
//     comment: 'Kue Enchanted Heart Cake membuat ulang tahun ke-10 kami tak terlupakan. Rasanya luar biasa dan presentasinya memukau!',
//     rating: 5,
//     image: '/images/cakes/kue1.jpg',
//     date: '14 Februari 2025'
//   },
//   {
//     id: 2,
//     name: 'Jessica Wilson',
//     role: 'Kejutkan Hari Valentine',
//     comment: 'Pasangan saya terdiam ketika melihat kue Blushing Romance. Rasa mawar yang lembut dan sempurna. Layak dengan harganya!',
//     rating: 5,
//     image: '/images/cakes/kue2.jpg', 
//     date: '10 Februari 2025'
//   },
//   {
//     id: 3,
//     name: 'David Thompson',
//     role: 'Kue Pertanyaan Lamaran',
//     comment: 'Menggunakan kue Eternal Love Chocolate untuk lamaran saya. Dia mengatakan iya bahkan sebelum saya bertanya! Kuenya sangat enak.',
//     rating: 4,
//     image: '/images/cakes/kue3.jpg',
//     date: '28 Januari 2025'
//   },
//   {
//     id: 4,
//     name: 'Olivia Martinez',
//     role: 'Kue Pernikahan',
//     comment: 'Kue Golden Anniversary kami menjadi pusat perhatian di pernikahan kami. Tamu tak henti-hentinya membicarakan betapa indah dan lezatnya.',
//     rating: 5,
//     image: '/images/cakes/kue4.jpg', 
//     date: '15 Desember 2024'
//   },
//   {
//     id: 5,
//     name: 'Robert Chen',
//     role: 'Kejutkan Ulang Tahun',
//     comment: 'Memesan Cupid\'s Delight untuk ulang tahun istri saya. Isian mousse stroberi sangat lezat. Pasti akan memesan lagi!',
//     rating: 4,
//     image: '/images/cakes/kue5.jpg', 
//     date: '20 November 2024'
//   },
//   {
//     id: 6,
//     name: 'Emily Davis',
//     role: 'Hanya Karena',
//     comment: 'Kue Sweetheart Surprise sangat lucu dan lezat. Sempurna untuk malam kencan kami. Hati tersembunyi adalah sentuhan yang indah!',
//     rating: 5,
//     image: '/images/cakes/kue6.jpg',
//     date: '5 Oktober 2024'
//   }
// ];

// export const getProductsByCategory = (category: string) => {
//   return allProducts.filter(product => product.category === category);
// };

// export const getFeaturedProducts = () => {
//   return featuredProducts;
// };

// export const getProductById = (id: number) => {
//   return allProducts.find(product => product.id === id);
// };

// export const getTestimonials = () => {
//   return testimonials;
// };
