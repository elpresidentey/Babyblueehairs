import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Star, ShoppingBag } from 'lucide-react'
import { useEffect } from 'react'
import ProductCard from '../components/ProductCard'

// Mock featured products
const featuredProducts = [
  {
    id: '1',
    name: 'Silky Straight Bundle',
    price: 850000,
    image: '',
    imageKeyword: 'silky straight hair',
    category: 'Bundles',
  },
  {
    id: '2',
    name: 'Body Wave Closure',
    price: 650000,
    image: '',
    imageKeyword: 'body wave hair',
    category: 'Closures & Frontals',
  },
  {
    id: '3',
    name: 'Curly Lace Front Wig',
    price: 920000,
    image: '',
    imageKeyword: 'curly lace front hair',
    category: 'Wigs',
  },
]

const testimonials = [
  {
    name: 'Amina Okafor',
    text: 'The quality is absolutely incredible. Best hair I\'ve ever purchased!',
    rating: 5,
  },
  {
    name: 'Chioma Adeleke',
    text: 'Fast shipping and the hair looks exactly like the pictures. Highly recommend!',
    rating: 5,
  },
  {
    name: 'Fatima Bello',
    text: 'Premium quality that lasts. Worth every naira spent.',
    rating: 5,
  },
]

export default function Home() {
  const scrollY = useScroll()
  
  // Parallax effect for hero section
  const heroY = useTransform(scrollY.scrollY, (y: number) => y * 0.5)

  // Smooth scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
        <motion.div
          style={{ y: heroY }}
          className="relative z-10 text-center px-4 max-w-7xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-7xl font-serif font-bold text-gray-900 mb-4">
              Luxury Hair for the
              <br />
              <span className="text-shimmer bg-clip-text-transparent bg-gradient-to-r from-baby-blue-600 via-purple-600 to-baby-blue-600 bg-clip-text">
                Modern Woman
              </span>
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Premium hair products crafted with elegance, authenticity, and lasting quality
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <Link 
                to="/products" 
                className="relative overflow-hidden rounded-full bg-gradient-to-r from-baby-blue-600 to-purple-600 px-8 py-4 text-white font-semibold"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-baby-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <span className="relative z-10 flex items-center">
                  Shop Now
                  <motion.div
                    initial={{ x: 0 }}
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </motion.div>
                </span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.05)",
              }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <Link 
                to="/products" 
                className="relative overflow-hidden rounded-full border-2 border-gray-300 bg-white px-8 py-4 text-gray-900 font-semibold"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <span className="relative z-10">Explore Collections</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Premium Floating Elements */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2">
            <motion.div
              animate={{
                y: [0, -10, 0],
                transition: { 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }
              }}
              className="relative"
            >
              <motion.div
                animate={{
                  rotate: [0, 180, 360],
                  transition: { 
                    duration: 8, 
                    repeat: Infinity, 
                    ease: "linear" 
                }
                }}
                className="w-1 h-8 bg-gradient-to-b from-baby-blue-600 to-purple-600 rounded-full"
              />
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute -inset-1 bg-gradient-to-b from-baby-blue-400 to-purple-400 rounded-full blur-sm"
              />
            </motion.div>
          </div>

          {/* Side Floating Elements */}
          <motion.div
            className="absolute top-1/4 left-10"
            animate={{
              y: [0, 20, 0],
              rotate: [0, 10, -10],
              transition: { 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }
            }}
          >
            <div className="w-2 h-2 bg-baby-blue-600 rounded-full opacity-60" />
          </motion.div>

          <motion.div
            className="absolute top-1/3 right-10"
            animate={{
              y: [0, -15, 0],
              rotate: [0, -15, 15],
              transition: { 
                duration: 2.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }
            }}
          >
            <div className="w-3 h-3 bg-purple-600 rounded-full opacity-40" />
          </motion.div>

          <motion.div
            className="absolute bottom-1/4 left-20"
            animate={{
              y: [0, 15, 0],
              scale: [1, 1.2, 1],
              transition: { 
                duration: 2.2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }
            }}
          >
            <div className="w-2 h-2 bg-baby-blue-400 rounded-full opacity-50" />
          </motion.div>

          <motion.div
            className="absolute bottom-1/3 right-20"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 20, -20],
              transition: { 
                duration: 2.8, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }
            }}
          >
            <div className="w-4 h-4 bg-purple-400 rounded-full opacity-30" />
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our premium collection of luxury hair products
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-2 italic">"{testimonial.text}"</p>
                <p className="font-semibold text-gray-900">— {testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-baby-blue-600 to-dark-blue">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Ready to Transform Your Look?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Baby Blue for their hair needs
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to="/products"
                className="bg-white text-dark-blue px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                <ShoppingBag className="mr-2 w-5 h-5" />
                Shop Collection
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
