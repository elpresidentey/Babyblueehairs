import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { Heart, Award, Globe, Sparkles } from 'lucide-react'

export default function About() {
  return (
    <>
      <SEO 
        title="About Baby Blue - Premium Nigerian Hair"
        description="Learn about Baby Blue's mission to provide premium quality human hair products to Nigerian women. Our story, values, and commitment to excellence."
        keywords="about baby blue, nigerian hair, premium hair, human hair, luxury hair brand"
      />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-br from-baby-blue-50 via-white to-ivory">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-dark-blue mb-6">
                Our Story
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Empowering Nigerian women with premium quality hair that celebrates natural beauty and confidence
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl font-serif font-bold text-dark-blue mb-6">
                  Our Mission
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Baby Blue was born from a passion for excellence and a deep understanding of what Nigerian women desire in premium hair products. We saw a gap in the market for authentic, high-quality human hair that celebrates our natural beauty while offering versatility and sophistication.
                  </p>
                  <p>
                    Our mission is simple: To provide you with the finest human hair products that blend seamlessly with your natural texture, boost your confidence, and allow you to express your unique style without compromise.
                  </p>
                  <p>
                    Every bundle, wig, and extension in our collection is carefully sourced, quality-tested, and selected with your needs in mind. We believe that luxury should be accessible, and quality should never be a question.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-baby-blue-100 to-ivory opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-16 h-16 text-baby-blue-600 opacity-50" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-serif font-bold text-dark-blue mb-4">
                Our Values
              </h2>
              <p className="text-gray-600 text-lg">
                The principles that guide everything we do
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Award className="w-8 h-8" />,
                  title: "Quality First",
                  description: "We never compromise on quality. Every product is rigorously tested to ensure it meets our premium standards."
                },
                {
                  icon: <Heart className="w-8 h-8 flex items-center justify-center" />,
                  title: "Customer Love",
                  description: "Your satisfaction is our priority. We're here to support you with expert advice and exceptional service."
                },
                {
                  icon: <Globe className="w-8 h-8" />,
                  title: "Authentic Sourcing",
                  description: "We work directly with trusted suppliers to ensure authentic, ethically sourced human hair."
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-xl shadow-lg text-center"
                >
                  <div className="w-16 h-16 bg-baby-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-baby-blue-600">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-dark-blue mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { number: "10,000+", label: "Happy Customers" },
                { number: "50+", label: "Premium Products" },
                { number: "4.9/5", label: "Average Rating" },
                { number: "100%", label: "Authentic Hair" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6"
                >
                  <div className="text-4xl font-bold text-baby-blue-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-baby-blue-600 to-dark-blue">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-serif font-bold text-white mb-6">
                Experience the Baby Blue Difference
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Join thousands of satisfied customers who trust us for their hair needs
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-dark-blue px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                <Link to="/products" className="text-dark-blue hover:text-dark-blue">
                  Shop Our Collection
                </Link>
              </motion.button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
