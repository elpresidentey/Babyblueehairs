import { Link } from 'react-router-dom'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useMemo } from 'react'
import ProductCard from '../components/ProductCard'
import StockImage from '../components/StockImage'
import { easeLuxury, fadeUpItem, staggerContainer } from '../utils/motion'

// Mock featured products
const featuredProducts = [
  {
    id: '1',
    name: 'Silky Straight Bundle',
    price: 45000,
    image: '',
    imageKeyword: 'silky straight hair',
    category: 'Bundles',
  },
  {
    id: '2',
    name: 'Body Wave Closure',
    price: 35000,
    image: '',
    imageKeyword: 'body wave hair',
    category: 'Closures & Frontals',
  },
  {
    id: '3',
    name: 'Curly Lace Front Wig',
    price: 55000,
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
  const shouldReduceMotion = useReducedMotion()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const spotlight = useMotionTemplate`radial-gradient(520px 520px at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.55), rgba(255,255,255,0) 60%)`

  const sparkles = useMemo(() => {
    const seeded = (n: number) => {
      const x = (n * 9301 + 49297) % 233280
      return x / 233280
    }

    return Array.from({ length: 14 }).map((_, i) => {
      const left = Math.round(seeded(i + 1) * 90 + 5)
      const top = Math.round(seeded(i + 11) * 70 + 10)
      const delay = seeded(i + 21) * 2.2
      const size = Math.round(seeded(i + 31) * 6 + 6)
      const duration = 2.2 + seeded(i + 41) * 2.4
      const opacity = 0.22 + seeded(i + 51) * 0.25
      return { id: i, left, top, delay, size, duration, opacity }
    })
  }, [])

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        className="relative h-[90vh] flex items-center justify-center overflow-hidden"
        onPointerMove={(e) => {
          if (shouldReduceMotion) return
          const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
          mouseX.set(e.clientX - rect.left)
          mouseY.set(e.clientY - rect.top)
        }}
        onPointerLeave={() => {
          if (shouldReduceMotion) return
          mouseX.set(0)
          mouseY.set(0)
        }}
      >
        <div className="absolute inset-0 aurora-bg" />
        <div className="absolute inset-0 noise-overlay opacity-[0.16]" />

        {!shouldReduceMotion && (
          <motion.div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ backgroundImage: spotlight, mixBlendMode: 'overlay' }}
          />
        )}

        <motion.div
          aria-hidden="true"
          className="absolute -top-40 -left-40 h-[34rem] w-[34rem] rounded-full bg-baby-blue-200/60 blur-3xl"
          animate={{ x: [0, 60, 0], y: [0, 35, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          style={{ mixBlendMode: 'multiply' }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute -bottom-44 -right-40 h-[36rem] w-[36rem] rounded-full bg-nude/70 blur-3xl"
          animate={{ x: [0, -55, 0], y: [0, -30, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          style={{ mixBlendMode: 'multiply' }}
        />

        <StockImage
          width={1920}
          height={1080}
          keyword="salon,hair"
          alt="Hair salon"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.10]"
        />

        <div className="absolute inset-0" aria-hidden="true">
          {sparkles.map((s) => (
            <motion.span
              key={s.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: s.size,
                height: s.size,
                opacity: s.opacity,
                boxShadow: '0 0 24px rgba(255,255,255,0.35)',
              }}
              animate={{ y: [0, -12, 0], opacity: [s.opacity, s.opacity + 0.25, s.opacity] }}
              transition={{
                duration: s.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: s.delay,
              }}
            />
          ))}
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <motion.div
            variants={fadeUpItem}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-dark-blue/10 bg-white/60 backdrop-blur px-4 py-2 text-xs font-semibold tracking-wide text-dark-blue shadow-sm"
          >
            <Sparkles className="h-4 w-4 text-baby-blue-600" />
            Premium Nigerian Hair
          </motion.div>

          <motion.h1
            variants={fadeUpItem}
            className="text-5xl md:text-7xl font-serif font-bold text-dark-blue mb-6 mt-6"
          >
            Luxury Hair for the
            <br />
            <span className="text-shimmer">Modern Woman</span>
          </motion.h1>

          <motion.p
            variants={fadeUpItem}
            className="text-xl md:text-2xl text-gray-600 mb-8 font-light"
          >
            Premium hair products crafted with elegance, authenticity, and lasting quality
          </motion.p>

          <motion.div
            variants={fadeUpItem}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link to="/products" className="btn-primary inline-flex items-center justify-center">
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link to="/products" className="btn-secondary inline-flex items-center justify-center">
                Explore Collections
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeUpItem}
            className="mt-10 flex items-center justify-center gap-6 text-sm text-dark-blue/70"
          >
            <span className="rounded-full bg-white/50 backdrop-blur px-3 py-1 border border-dark-blue/10">100% Human Hair</span>
            <span className="rounded-full bg-white/50 backdrop-blur px-3 py-1 border border-dark-blue/10">Fast Shipping</span>
            <span className="rounded-full bg-white/50 backdrop-blur px-3 py-1 border border-dark-blue/10">Luxury Finish</span>
          </motion.div>
        </motion.div>

        <motion.div
          aria-hidden="true"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 h-10 w-6 rounded-full border border-dark-blue/20 bg-white/40 backdrop-blur"
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
              initial={{ opacity: 0, x: -24, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: easeLuxury }}
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
              initial={{ opacity: 0, x: 24, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: easeLuxury }}
              className="relative h-96 rounded-xl overflow-hidden shadow-2xl"
            >
              <StockImage
                width={800}
                height={384}
                keyword="woman,hair"
                alt="Brand story"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-dark-blue mb-4">
              Featured Collections
            </h2>
            <p className="text-gray-600 text-lg">
              Discover our most popular luxury hair products
            </p>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredProducts.map((product) => (
              <motion.div key={product.id} variants={fadeUpItem}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mt-12">
            <Link to="/products" className="btn-secondary">
              View All Products
            </Link>
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
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeUpItem}
                transition={{ duration: 0.45, ease: easeLuxury, delay: index * 0.04 }}
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
        <div className="max-w-4xl mx-auto text-center relative overflow-hidden rounded-3xl border border-dark-blue/10">
          <div className="absolute inset-0 aurora-bg opacity-60" />
          <div className="absolute inset-0 noise-overlay opacity-[0.12]" />
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: easeLuxury }}
            className="relative z-10 px-6 sm:px-10 py-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark-blue mb-6">
              Ready to Elevate Your Style?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of women who trust Baby Blue for their luxury hair needs
            </p>
            <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link to="/products" className="btn-primary inline-flex items-center">
                Start Shopping
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
