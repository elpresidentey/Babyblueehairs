import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import StockImage from '../components/StockImage'

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
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center bg-white overflow-hidden">
        {/* Banner Image */}
        <StockImage
          width={1920}
          height={1080}
          keyword="salon,hair"
          alt="Hair salon"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-dark-blue mb-6">
            Luxury Hair for the
            <br />
            <span className="text-dark-blue">Modern Woman</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 font-light">
            Premium Nigerian hair products crafted with elegance and authenticity
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="btn-primary inline-flex items-center justify-center">
              Shop Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link to="/products" className="btn-secondary inline-flex items-center justify-center">
              Explore Collections
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Brand Story */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
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
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
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
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-luxury p-6"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Sparkles key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold text-dark-blue">— {testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark-blue mb-6">
              Ready to Elevate Your Style?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of women who trust Baby Blue for their luxury hair needs
            </p>
            <Link to="/products" className="btn-primary inline-flex items-center">
              Start Shopping
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
