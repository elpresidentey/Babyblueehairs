import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MessageCircle, MapPin, Send, Clock, Shield, Truck, Users } from 'lucide-react'
import SEO from '../components/SEO'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Support',
      detail: 'hello@babyblue.com',
      action: 'Get quick responses to your inquiries'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      detail: '+234 800 123 4567',
      action: 'Mon-Fri, 9am-6pm WAT'
    },
    {
      icon: MapPin,
      title: 'Visit Our Showroom',
      detail: '123 Luxury Street, Victoria Island, Lagos',
      action: 'By appointment only'
    },
    {
      icon: Truck,
      title: 'Nationwide Delivery',
      detail: 'Free delivery on orders over ₦50,000',
      action: '2-3 business days nationwide'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Support',
      detail: '+234 800 987 6543',
      action: 'Instant chat support'
    }
  ]

  return (
    <>
      <SEO 
        title="Contact Baby Blue - Customer Support"
        description="Get in touch with Baby Blue for customer support, orders, and inquiries. Contact information, location, and multiple contact channels."
        keywords="contact baby blue, customer support, nigerian hair store, hair shop contact"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                Get in Touch
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl leading-relaxed">
                We're here to help you with orders, styling advice, and any questions about our premium hair products.
              </p>
            </motion.div>

            {/* Contact Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200 group"
                >
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-baby-blue-500 to-baby-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <info.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{info.title}</h3>
                    <p className="text-gray-600 mb-4">{info.detail}</p>
                    <p className="text-sm text-baby-blue-600 font-medium">{info.action}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Info Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Send Us a Message</h2>
                <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-baby-blue-600 focus:border-transparent"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-baby-blue-600 focus:border-transparent"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-baby-blue-600 focus:border-transparent"
                      placeholder="How can We help you?"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-baby-blue-600 focus:border-transparent resize-none"
                      placeholder="Tell us more about your inquiry..."
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-baby-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-baby-blue-700 transition-colors flex items-center justify-center"
                  >
                    {submitted ? (
                      <>
                        <div className="w-6 h-6 border-2 border-gray-300 rounded-full animate-spin" />
                        <span className="text-white">Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-center"
                  >
                    <div className="flex items-center text-green-700">
                      <Shield className="w-6 h-6 mr-2" />
                      <span className="font-medium">Thank you! Your message has been sent successfully.</span>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Business Hours */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gray-50 rounded-xl p-8"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-8">Business Hours</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-gray-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Monday - Friday</p>
                      <p className="text-gray-600">9:00 AM - 6:00 PM WAT</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 text-gray-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Saturday</p>
                      <p className="text-gray-600">10:00 AM - 4:00 PM WAT</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 text-gray-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Sunday</p>
                      <p className="text-gray-600">Closed</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">Why Choose Baby Blue?</h2>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-baby-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-baby-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Premium Quality</h3>
                  <p className="text-gray-600">100% human hair sourced directly from trusted suppliers</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-baby-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Truck className="w-8 h-8 text-baby-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Fast Delivery</h3>
                  <p className="text-gray-600">Same-day delivery in Lagos, 2-3 days nationwide</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-baby-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-baby-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Support</h3>
                  <p className="text-gray-600">Personalized styling advice and customer care</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
