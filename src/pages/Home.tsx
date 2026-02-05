import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useMemo } from 'react'
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
  const sparkles = useMemo(() => {
    const seeded = (n: number) => {
      const x = (n * 9301 + 49297) % 233280
      return x / 233280
    }

    return Array.from({ length: 18 }).map((_, i) => {
      const left = Math.round(seeded(i + 1) * 90 + 5)
      const top = Math.round(seeded(i + 11) * 70 + 10)
      const delay = seeded(i + 21) * 2.2
      const size = Math.round(seeded(i + 31) * 10 + 12)
      const duration = 2.2 + seeded(i + 41) * 2.4
      const opacity = 0.4 + seeded(i + 51) * 0.3
      return { id: i, left, top, delay, size, duration, opacity }
    })
  }, [])

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-white">
        <div 
          className="absolute inset-0 w-full h-full object-cover opacity-[0.04]"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          }}
        />

        <div className="absolute inset-0" aria-hidden="true">
          <motion.div
            className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-dark-blue/40 bg-white/80 backdrop-blur px-3 py-1 rounded-full shadow-sm"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ✨ Drag the sparkles
          </motion.div>
          {sparkles.slice(0, 3).map((s) => ( // Reduced from 8 to 3 sparkles
            <motion.div
              key={s.id}
              drag
              dragMomentum={false}
              dragElastic={0.15}
              whileHover={{ scale: 1.2 }}
              whileDrag={{ scale: 1.1 }}
              animate={{
                x: 0,
                y: 0,
                scale: [1, 1.1, 1],
              }}
              transition={{
                x: { type: 'spring', stiffness: 100, damping: 15, delay: 0.5 },
                y: { type: 'spring', stiffness: 100, damping: 15, delay: 0.5 },
                scale: { duration: s.duration, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="absolute rounded-full bg-gradient-to-br from-white to-baby-blue-100 cursor-grab active:cursor-grabbing"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: s.size,
                height: s.size,
                opacity: s.opacity,
                boxShadow: '0 0 28px rgba(255,255,255,0.6), 0 0 44px rgba(59,130,246,0.2)',
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-dark-blue/12 bg-white px-4 py-2 text-xs font-semibold tracking-wide text-dark-blue shadow-sm transition-all hover:border-dark-blue/20 hover:shadow-md"
          >
            <Sparkles className="h-4 w-4 text-baby-blue-600" />
            Premium Nigerian Hair
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif font-bold text-dark-blue mb-6 mt-6"
          >
            Luxury Hair for the
            <br />
            <span className="text-shimmer">Modern Woman</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-600 mb-8 font-light"
          >
            Premium hair products crafted with elegance, authenticity, and lasting quality
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div
              whileHover={{ y: -3, scale: 1.03, boxShadow: '0 8px 20px rgba(10,22,40,0.12)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              <Link to="/products" className="btn-primary inline-flex items-center justify-center">
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ y: -3, scale: 1.03, boxShadow: '0 8px 20px rgba(10,22,40,0.08)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              <Link to="/products" className="btn-secondary inline-flex items-center justify-center">
                Explore Collections
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 flex items-center justify-center gap-6 text-sm text-dark-blue/70"
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="rounded-full bg-white px-3 py-1 border border-dark-blue/12 shadow-sm transition-shadow cursor-default"
            >
              100% Human Hair
            </motion.span>
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="rounded-full bg-white px-3 py-1 border border-dark-blue/12 shadow-sm transition-shadow cursor-default"
            >
              Fast Shipping
            </motion.span>
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="rounded-full bg-white px-3 py-1 border border-dark-blue/12 shadow-sm transition-shadow cursor-default"
            >
              Luxury Finish
            </motion.span>
          </motion.div>
        </motion.div>

        <motion.div
          aria-hidden="true"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 h-10 w-6 rounded-full border border-dark-blue/20 bg-white shadow-sm"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="absolute left-1/2 top-2 -translate-x-1/2 h-2 w-1 rounded-full bg-dark-blue/50"
            animate={{ y: [0, 10, 0], opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </section>

      {/* Brand Story */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-serif font-bold text-dark-blue mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Baby Blue was born from a passion for excellence and a commitment to
                providing Nigerian women with the finest quality human hair. We source
                our hair directly from trusted suppliers, ensuring authenticity and
                premium craftsmanship in every product.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our mission is to empower women to express their unique beauty with
                confidence, offering luxury hair products that blend seamlessly with
                natural textures while maintaining the highest standards of quality.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-96 rounded-xl overflow-hidden shadow-2xl"
            >
              <div 
                className="w-full h-full object-cover"
                style={{
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4">
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
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-dark-blue mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600">Trusted by thousands of satisfied customers</p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-luxury p-6 relative group"
              >
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-baby-blue-100/40 via-white/10 to-transparent" />
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Sparkles key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold text-dark-blue">— {testimonial.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center px-6 sm:px-10 py-16 rounded-3xl border border-dark-blue/8 bg-gradient-to-br from-white via-baby-blue-50/30 to-white shadow-xl"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark-blue mb-6">
            Ready to Elevate Your Style?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of women who trust Baby Blue for their luxury hair needs
          </p>
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/products" className="btn-primary inline-flex items-center">
              Start Shopping
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
