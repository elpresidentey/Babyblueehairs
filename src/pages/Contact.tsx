import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MessageCircle, MapPin, Send } from 'lucide-react'
import SEO from '../components/SEO'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
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

  return (
    <>
      <SEO 
        title="Contact Baby Blue - Customer Support"
        description="Get in touch with Baby Blue for customer support, orders, and inquiries. Contact information, location, and social media links."
        keywords="contact baby blue, customer support, nigerian hair store, hair shop contact"
      />
      <div className="min-h-screen bg-ivory py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4">
              Get in Touch
            </h1>
            <p className="text-gray-700 text-lg">
              We'd love to hear from you. Send us a message and we'll respond as soon as
              possible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl p-8"
            >
              <h2 className="text-2xl font-serif font-bold mb-6">Send us a Message</h2>

              {submitted && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                  Thank you! Your message has been sent successfully.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block mb-2 font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-baby-blue-600"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-baby-blue-600"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-baby-blue-600"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-baby-blue-600"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary w-full flex items-center justify-center">
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl p-8">
                <h2 className="text-2xl font-serif font-bold mb-6">Contact Information</h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-baby-blue-100 p-3 rounded-lg">
                      <Mail className="w-6 h-6 text-baby-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a
                        href="mailto:hello@babyblue.com"
                        className="text-baby-blue-600 hover:text-baby-blue-700"
                      >
                        hello@babyblue.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-baby-blue-100 p-3 rounded-lg">
                      <Phone className="w-6 h-6 text-baby-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <a
                        href="tel:+2348000000000"
                        className="text-baby-blue-600 hover:text-baby-blue-700"
                      >
                        +234 800 000 0000
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-baby-blue-100 p-3 rounded-lg">
                      <MapPin className="w-6 h-6 text-baby-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Address</h3>
                      <p className="text-gray-700">
                        123 Luxury Street
                        <br />
                        Victoria Island
                        <br />
                        Lagos, Nigeria
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-baby-blue-100 p-3 rounded-lg">
                      <MessageCircle className="w-6 h-6 text-baby-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">WhatsApp</h3>
                      <a
                        href="https://wa.me/2348000000000"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-baby-blue-600 hover:text-baby-blue-700"
                      >
                        Chat with us on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQs */}
              <div className="bg-white rounded-xl p-8">
                <h2 className="text-2xl font-serif font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">What is your return policy?</h3>
                    <p className="text-gray-700 text-sm">
                      We offer a 7-day return policy for unused items in original packaging.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">How long does shipping take?</h3>
                    <p className="text-gray-700 text-sm">
                      Standard shipping within Nigeria takes 3-5 business days.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Do you ship internationally?</h3>
                    <p className="text-gray-700 text-sm">
                      Yes, we ship worldwide. International shipping takes 7-14 business days.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}
