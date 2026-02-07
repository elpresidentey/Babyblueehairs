import { motion } from 'framer-motion'
import { FileText, ShoppingBag, Truck, RefreshCw, AlertCircle } from 'lucide-react'
import SEO from '../components/SEO'

export default function TermsOfService() {
  return (
    <>
      <SEO
        title="Terms of Service | Baby Blue"
        description="Read our terms of service to understand the rules and guidelines for using our website and services."
      />
      <div className="min-h-screen bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <FileText className="w-16 h-16 text-baby-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-serif font-bold text-dark-blue mb-4">
              Terms of Service
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
              <h2 className="text-2xl font-bold text-dark-blue mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using the Baby Blue website, you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our website or services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-dark-blue mb-4">2. Use of Our Services</h2>
              <p className="text-gray-700 mb-4">
                You agree to use our website and services only for lawful purposes and in accordance with these terms:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>You must be at least 18 years old to make purchases</li>
                <li>You agree to provide accurate and complete information when creating an account</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                <li>You agree not to use our website for any fraudulent or illegal activities</li>
              </ul>
            </section>

            <section className="mb-8">
              <div className="flex items-center mb-4">
                <ShoppingBag className="w-6 h-6 text-baby-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-dark-blue">3. Orders and Payment</h2>
              </div>
              <p className="text-gray-700 mb-4">
                By placing an order on our website, you agree to the following:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>All prices are in Nigerian Naira (₦) and include VAT where applicable</li>
                <li>Payment must be completed before orders are processed</li>
                <li>We accept payment via Paystack, Flutterwave, and bank transfer</li>
                <li>Orders are subject to product availability</li>
                <li>We reserve the right to refuse or cancel any order</li>
              </ul>
            </section>

            <section className="mb-8">
              <div className="flex items-center mb-4">
                <Truck className="w-6 h-6 text-baby-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-dark-blue">4. Shipping and Delivery</h2>
              </div>
              <p className="text-gray-700 mb-4">
                Our shipping policies are as follows:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Delivery times are estimates and may vary based on location</li>
                <li>Shipping costs are calculated at checkout</li>
                <li>We deliver nationwide within Nigeria</li>
                <li>International shipping is available to select countries</li>
                <li>Risk of loss passes to you upon delivery</li>
              </ul>
            </section>

            <section className="mb-8">
              <div className="flex items-center mb-4">
                <RefreshCw className="w-6 h-6 text-baby-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-dark-blue">5. Returns and Refunds</h2>
              </div>
              <p className="text-gray-700 mb-4">
                Our return and refund policy:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Products can be returned within 7 days of delivery</li>
                <li>Items must be unused and in original packaging</li>
                <li>Hair products must have the seal intact to be eligible for return</li>
                <li>Refunds will be processed within 5-7 business days</li>
                <li>Shipping fees for returns are the customer's responsibility unless the product is defective</li>
              </ul>
            </section>

            <section className="mb-8">
              <div className="flex items-center mb-4">
                <AlertCircle className="w-6 h-6 text-baby-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-dark-blue">6. Limitation of Liability</h2>
              </div>
              <p className="text-gray-700 mb-4">
                Baby Blue shall not be liable for any indirect, incidental, special, or consequential 
                damages arising from your use of our website or products. Our total liability shall 
                not exceed the amount you paid for the specific product giving rise to the liability.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-dark-blue mb-4">7. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these Terms of Service at any time. Changes will be 
                effective immediately upon posting to the website. Your continued use of our services 
                constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-dark-blue mb-4">8. Contact Information</h2>
              <p className="text-gray-700">
                For questions about these Terms of Service, please contact us:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mt-2">
                <li>Email: legal@babyblue.com</li>
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
