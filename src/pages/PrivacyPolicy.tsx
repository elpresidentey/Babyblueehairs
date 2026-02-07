import { motion } from 'framer-motion'
import { Shield, Lock, Eye, Server, UserCheck, Mail } from 'lucide-react'
import SEO from '../components/SEO'

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy | Baby Blue"
        description="Read our privacy policy to understand how we protect and handle your personal information at Baby Blue."
      />
      <div className="min-h-screen bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Shield className="w-16 h-16 text-baby-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-serif font-bold text-dark-blue mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-600">Last updated: February 2025</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="prose prose-lg max-w-none"
          >
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <Eye className="w-6 h-6 text-baby-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-dark-blue">1. Information We Collect</h2>
              </div>
              <p className="text-gray-700 mb-4">
                At Baby Blue, we collect the following types of information:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Personal Information:</strong> Name, email address, phone number, and shipping address when you place an order or create an account.</li>
                <li><strong>Payment Information:</strong> Payment details are processed securely through Paystack and Flutterwave. We do not store your card information.</li>
                <li><strong>Order History:</strong> Details of your purchases, preferences, and product reviews.</li>
                <li><strong>Device Information:</strong> IP address, browser type, and device information to improve your shopping experience.</li>
              </ul>
            </section>

            <section className="mb-8">
              <div className="flex items-center mb-4">
                <Lock className="w-6 h-6 text-baby-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-dark-blue">2. How We Use Your Information</h2>
              </div>
              <p className="text-gray-700 mb-4">
                We use your information for the following purposes:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Processing and delivering your orders</li>
                <li>Communicating order updates and shipping information</li>
                <li>Providing customer support and responding to inquiries</li>
                <li>Sending promotional emails and newsletters (with your consent)</li>
                <li>Improving our products and services</li>
                <li>Preventing fraud and ensuring security</li>
              </ul>
            </section>

            <section className="mb-8">
              <div className="flex items-center mb-4">
                <Server className="w-6 h-6 text-baby-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-dark-blue">3. Data Security</h2>
              </div>
              <p className="text-gray-700 mb-4">
                We implement industry-standard security measures to protect your personal information:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>SSL encryption for all data transmission</li>
                <li>Secure payment processing through certified providers</li>
                <li>Regular security audits and updates</li>
                <li>Limited access to personal data by authorized personnel only</li>
              </ul>
            </section>

            <section className="mb-8">
              <div className="flex items-center mb-4">
                <UserCheck className="w-6 h-6 text-baby-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-dark-blue">4. Your Rights</h2>
              </div>
              <p className="text-gray-700 mb-4">
                You have the following rights regarding your personal data:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate or incomplete data</li>
                <li>Request deletion of your personal data</li>
                <li>Opt-out of marketing communications</li>
                <li>Request a copy of your data</li>
              </ul>
            </section>

            <section className="mb-8">
              <div className="flex items-center mb-4">
                <Mail className="w-6 h-6 text-baby-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-dark-blue">5. Contact Us</h2>
              </div>
              <p className="text-gray-700">
                If you have any questions about our Privacy Policy or how we handle your data, please contact us at:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mt-2">
                <li>Email: privacy@babyblue.com</li>
                <li>Phone: +234 800 123 4567</li>
                <li>Address: 123 Victoria Island, Lagos, Nigeria</li>
              </ul>
            </section>
          </motion.div>
        </div>
      </div>
    </>
  )
}
