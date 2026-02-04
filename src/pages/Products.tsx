import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import { fadeUpItem, staggerContainer } from '../utils/motion'

// Mock products data
const allProducts = [
  {
    id: '1',
    name: 'Silky Straight Bundle',
    price: 145000,
    image: '',
    imageKeyword: 'silky straight bundle hair',
    category: 'Bundles',
    hairType: 'Straight',
    length: '18"',
    texture: 'Silky',
    rating: 4.8,
    reviews: 124,
    colors: ['#1B1B1B', '#3D2817', '#6B4423', '#8B4513'],
    inStock: true,
    onSale: false,
  },
  {
    id: '2',
    name: 'Body Wave Closure',
    price: 135000,
    image: '',
    imageKeyword: 'body wave closure hair',
    category: 'Closures & Frontals',
    hairType: 'Body Wave',
    length: '14"',
    texture: 'Natural',
    rating: 4.6,
    reviews: 89,
    colors: ['#1B1B1B', '#3D2817', '#6B4423'],
    inStock: true,
    onSale: true,
    originalPrice: 142000,
  },
  {
    id: '3',
    name: 'Curly Lace Front Wig',
    price: 155000,
    image: '',
    imageKeyword: 'curly lace front wig',
    category: 'Wigs',
    hairType: 'Curly',
    length: '20"',
    texture: 'Curly',
    rating: 4.9,
    reviews: 203,
    colors: ['#1B1B1B', '#3D2817', '#6B4423', '#8B4513', '#D2691E'],
    inStock: true,
    onSale: false,
  },
  {
    id: '4',
    name: 'Deep Wave Bundle',
    price: 148000,
    image: '',
    imageKeyword: 'deep wave bundle hair',
    category: 'Bundles',
    hairType: 'Deep Wave',
    length: '22"',
    texture: 'Wavy',
    rating: 4.7,
    reviews: 156,
    colors: ['#1B1B1B', '#3D2817', '#6B4423'],
    inStock: true,
    onSale: false,
  },
  {
    id: '5',
    name: 'Loose Wave Frontal',
    price: 140000,
    image: '',
    imageKeyword: 'loose wave frontal hair',
    category: 'Closures & Frontals',
    hairType: 'Loose Wave',
    length: '16"',
    texture: 'Wavy',
    rating: 4.5,
    reviews: 67,
    colors: ['#1B1B1B', '#3D2817', '#6B4423', '#8B4513'],
    inStock: true,
    onSale: true,
    originalPrice: 145000,
  },
  {
    id: '6',
    name: 'Straight Bob Wig',
    price: 125000,
    image: '',
    imageKeyword: 'straight bob wig',
    category: 'Wigs',
    hairType: 'Straight',
    length: '12"',
    texture: 'Silky',
    rating: 4.4,
    reviews: 98,
    colors: ['#1B1B1B', '#3D2817', '#F5DEB3'],
    inStock: true,
    onSale: false,
  },
  {
    id: '7',
    name: 'Hair Accessories Set',
    price: 25000,
    image: '',
    imageKeyword: 'hair accessories beauty',
    category: 'Accessories',
    hairType: 'N/A',
    length: 'N/A',
    texture: 'N/A',
    rating: 4.3,
    reviews: 45,
    colors: ['#C0C0C0', '#FFD700', '#F5DEB3', '#D2691E'],
    inStock: true,
    onSale: false,
  },
  {
    id: '8',
    name: 'Kinky Curly Bundle',
    price: 152000,
    image: '',
    imageKeyword: 'kinky curly bundle hair',
    category: 'Bundles',
    hairType: 'Kinky Curly',
    length: '24"',
    texture: 'Curly',
    rating: 4.8,
    reviews: 178,
    colors: ['#1B1B1B', '#3D2817', '#6B4423', '#8B4513', '#D2691E'],
    inStock: false,
    onSale: false,
  },
  {
    id: '9',
    name: 'Water Wave Bundle',
    price: 146000,
    image: '',
    imageKeyword: 'water wave bundle hair',
    category: 'Bundles',
    hairType: 'Water Wave',
    length: '20"',
    texture: 'Wavy',
    rating: 4.7,
    reviews: 142,
    colors: ['#1B1B1B', '#3D2817', '#6B4423', '#8B4513'],
    inStock: true,
    onSale: false,
  },
  {
    id: '10',
    name: 'Straight Lace Front Wig',
    price: 165000,
    image: '',
    imageKeyword: 'straight lace front wig',
    category: 'Wigs',
    hairType: 'Straight',
    length: '22"',
    texture: 'Silky',
    rating: 4.9,
    reviews: 267,
    colors: ['#1B1B1B', '#3D2817', '#6B4423', '#8B4513', '#F5DEB3'],
    inStock: true,
    onSale: true,
    originalPrice: 175000,
  },
  {
    id: '11',
    name: '360 Lace Frontal',
    price: 132000,
    image: '',
    imageKeyword: '360 lace frontal hair',
    category: 'Closures & Frontals',
    hairType: 'Body Wave',
    length: '18"',
    texture: 'Natural',
    rating: 4.8,
    reviews: 189,
    colors: ['#1B1B1B', '#3D2817', '#6B4423', '#8B4513'],
    inStock: true,
    onSale: false,
  },
  {
    id: '12',
    name: 'Curly Bundle Set',
    price: 138000,
    image: '',
    imageKeyword: 'curly bundle hair',
    category: 'Bundles',
    hairType: 'Curly',
    length: '20"',
    texture: 'Curly',
    rating: 4.6,
    reviews: 134,
    colors: ['#1B1B1B', '#3D2817', '#6B4423', '#8B4513', '#D2691E'],
    inStock: true,
    onSale: false,
  },
  {
    id: '13',
    name: 'Wavy Bob Wig',
    price: 118000,
    image: '',
    imageKeyword: 'wavy bob wig',
    category: 'Wigs',
    hairType: 'Body Wave',
    length: '14"',
    texture: 'Wavy',
    rating: 4.5,
    reviews: 112,
    colors: ['#1B1B1B', '#3D2817', '#6B4423'],
    inStock: true,
    onSale: true,
    originalPrice: 125000,
  },
  {
    id: '14',
    name: 'Straight Closure',
    price: 115000,
    image: '',
    imageKeyword: 'straight closure hair',
    category: 'Closures & Frontals',
    hairType: 'Straight',
    length: '16"',
    texture: 'Silky',
    rating: 4.7,
    reviews: 156,
    colors: ['#1B1B1B', '#3D2817', '#6B4423', '#8B4513'],
    inStock: true,
    onSale: false,
  },
  {
    id: '15',
    name: 'Ombre Bundle Set',
    price: 158000,
    image: '',
    imageKeyword: 'ombre bundle hair',
    category: 'Bundles',
    hairType: 'Straight',
    length: '24"',
    texture: 'Silky',
    rating: 4.9,
    reviews: 298,
    colors: ['#1B1B1B', '#3D2817', '#6B4423', '#8B4513', '#F5DEB3', '#FFD700'],
    inStock: true,
    onSale: false,
  },
  {
    id: '16',
    name: 'Curly Pixie Wig',
    price: 105000,
    image: '',
    imageKeyword: 'curly pixie wig',
    category: 'Wigs',
    hairType: 'Curly',
    length: '8"',
    texture: 'Curly',
    rating: 4.4,
    reviews: 87,
    colors: ['#1B1B1B', '#3D2817', '#6B4423'],
    inStock: true,
    onSale: false,
  },
  {
    id: '17',
    name: 'Hair Clips & Pins',
    price: 18000,
    image: '',
    imageKeyword: 'hair accessories beauty',
    category: 'Accessories',
    hairType: 'N/A',
    length: 'N/A',
    texture: 'N/A',
    rating: 4.2,
    reviews: 56,
    colors: ['#C0C0C0', '#FFD700', '#F5DEB3', '#D2691E', '#1B1B1B'],
    inStock: true,
    onSale: false,
  },
  {
    id: '18',
    name: 'Tight Curly Bundle',
    price: 142000,
    image: '',
    imageKeyword: 'tight curly bundle hair',
    category: 'Bundles',
    hairType: 'Kinky Curly',
    length: '22"',
    texture: 'Curly',
    rating: 4.7,
    reviews: 167,
    colors: ['#1B1B1B', '#3D2817', '#6B4423', '#8B4513'],
    inStock: true,
    onSale: false,
  },
  {
    id: '19',
    name: 'Long Straight Wig',
    price: 168000,
    image: '',
    imageKeyword: 'long straight wig',
    category: 'Wigs',
    hairType: 'Straight',
    length: '26"',
    texture: 'Silky',
    rating: 4.9,
    reviews: 312,
    colors: ['#1B1B1B', '#3D2817', '#6B4423', '#8B4513', '#F5DEB3'],
    inStock: true,
    onSale: true,
    originalPrice: 178000,
  },
  {
    id: '20',
    name: 'Hair Scarf Collection',
    price: 22000,
    image: '',
    imageKeyword: 'hair accessories beauty',
    category: 'Accessories',
    hairType: 'N/A',
    length: 'N/A',
    texture: 'N/A',
    rating: 4.5,
    reviews: 78,
    colors: ['#C0C0C0', '#FFD700', '#F5DEB3', '#D2691E', '#1B1B1B', '#3D2817'],
    inStock: true,
    onSale: false,
  },
  {
    id: '21',
    name: 'Beachy Wave Bundle',
    price: 44000,
    image: '',
    imageKeyword: 'beachy wave bundle hair',
    category: 'Bundles',
    hairType: 'Loose Wave',
    length: '20"',
    texture: 'Wavy',
    rating: 4.6,
    reviews: 145,
    colors: ['#1B1B1B', '#3D2817', '#6B4423', '#8B4513', '#F5DEB3'],
    inStock: true,
    onSale: false,
  },
  {
    id: '22',
    name: '13x4 Lace Frontal',
    price: 48000,
    image: '',
    imageKeyword: 'lace frontal hair',
    category: 'Closures & Frontals',
    hairType: 'Body Wave',
    length: '18"',
    texture: 'Natural',
    rating: 4.8,
    reviews: 201,
    colors: ['#1B1B1B', '#3D2817', '#6B4423', '#8B4513'],
    inStock: true,
    onSale: false,
  },
  {
    id: '23',
    name: 'Short Curly Wig',
    price: 39000,
    image: '',
    imageKeyword: 'short curly wig',
    category: 'Wigs',
    hairType: 'Curly',
    length: '10"',
    texture: 'Curly',
    rating: 4.5,
    reviews: 103,
    colors: ['#1B1B1B', '#3D2817', '#6B4423'],
    inStock: true,
    onSale: false,
  },
  {
    id: '24',
    name: 'Hair Brush Set',
    price: 10000,
    image: '',
    imageKeyword: 'hair accessories beauty',
    category: 'Accessories',
    hairType: 'N/A',
    length: 'N/A',
    texture: 'N/A',
    rating: 4.4,
    reviews: 67,
    inStock: true,
    onSale: false,
  },
]

type SortOption = 'price-low' | 'price-high' | 'newest' | 'popular'

export default function Products() {
  const [sortBy, setSortBy] = useState<SortOption>('newest')

  const sortedProducts = useMemo(() => {
    const products = [...allProducts]

    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        products.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        break
      case 'popular':
        products.sort((a, b) => (b.reviews || 0) - (a.reviews || 0))
        break
    }

    return products
  }, [sortBy])

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div variants={fadeUpItem} initial="hidden" animate="show" className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-dark-blue mb-4">Our Products</h1>
          <p className="text-gray-600 text-lg">Discover premium luxury hair products</p>
        </motion.div>

        {/* Sort and Product Count */}
        <motion.div variants={fadeUpItem} initial="hidden" animate="show" className="flex items-center justify-between mb-8">
          <span className="text-sm text-gray-600">{sortedProducts.length} products</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-baby-blue-600"
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="popular">Popular</option>
          </select>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {sortedProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={fadeUpItem}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
