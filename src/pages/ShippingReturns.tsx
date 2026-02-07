import { motion } from 'framer-motion'
import { Truck, Package, Clock, RefreshCw, HelpCircle } from 'lucide-react'
import SEO from '../components/SEO'

export default function ShippingReturns() {
  return (
    <>
      <SEO
        title="Shipping & Returns | Baby Blue"
        description="Learn about our shipping policies and hassle-free return process at Baby Blue."
      />
      <div className="min-h-screen bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Truck className="w-16 h-16 text-baby-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-serif font-bold text-dark-blue mb-4">
              Shipping & Returns
            </h1>
            <p className="text-gray-600">Fast delivery and easy returns for your peace of mind</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-8"
          >
            {/* Shipping Section */}
            <section className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Package className="w-8 h-8 text-baby-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-dark-blue">Shipping Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6">
                  <Clock className="w-6 h-6 text-baby-blue-600 mb-3" />
                  <h3 className="font-bold text-lg mb-2">Delivery Times</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Lagos: 1-2 business days</li>
                    <li>• Abuja & Port Harcourt: 2-3 business days</li>
                    <li>• Other Nigerian cities: 3-5 business days</li>
                    <li>• International: 7-14 business days</li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6">
                  <Truck className="w-6 h-6 text-baby-blue-600 mb-3" />
                  <h3 className="font-bold text-lg mb-2">Shipping Costs</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Lagos: ₦2,500</li>
                    <li>• Other states: ₦3,500 - ₦5,000</li>
                    <li>• Free shipping on orders over ₦100,000</li>
                    <li>• International: Calculated at checkout</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-baby-blue-50 rounded-xl">
                <h3 className="font-bold mb-2">Order Processing</h3>
                <p className="text-gray-700">
                  Orders are processed within 24 hours of payment confirmation. You will receive 
                  a tracking number via email and SMS once your order ships. We partner with 
                  trusted logistics providers including GIG Logistics, DHL, and FedEx for 
                  reliable delivery.
                </p>
              </div>
            </section>

            {/* Returns Section */}
            <section className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <RefreshCw className="w-8 h-8 text-baby-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-dark-blue">Return Policy</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-baby-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-baby-blue-600 font-bold">7</span>
                  </div>
                  <h3 className="font-bold mb-2">7-Day Returns</h3>
                  <p className="text-sm text-gray-600">
                    Return any item within 7 days of delivery
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-baby-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Package className="w-6 h-6 text-baby-blue-600" />
                  </div>
                  <h3 className="font-bold mb-2">Original Condition</h3>
                  <p className="text-sm text-gray-600">
                    Items must be unused with seal intact
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-baby-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-baby-blue-600" />
                  </div>
                  <h3 className="font-bold mb-2">Quick Refunds</h3>
                  <p className="text-sm text-gray-600">
                    Refunds processed within 5-7 business days
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-lg">Eligibility for Returns</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Product must be in original packaging with tags attached</li>
                  <li>Hair bundles must have the hygienic seal unbroken</li>
                  <li>Wigs must not have been worn, styled, or altered</li>
                  <li>Accessories must be unused and in original condition</li>
                  <li>Proof of purchase (order number or receipt) is required</li>
                </ul>
              </div>

              <div className="mt-6 p-4 bg-red-50 rounded-xl">
                <h3 className="font-bold text-red-700 mb-2">Non-Returnable Items</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Sale items marked as final sale</li>
                  <li>Gift cards and promotional items</li>
                  <li>Products damaged due to improper care or styling</li>
                  <li>Custom-made or personalized orders</li>
                </ul>
              </div>
            </section>

            {/* How to Return */}
            <section className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-dark-blue mb-6">How to Return an Item</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-baby-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold">Contact Us</h3>
                    <p className="text-gray-700">
                      Email us at returns@babyblue.com or WhatsApp +234 800 123 4567 
                      with your order number and reason for return.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-baby-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold">Receive Return Authorization</h3>
                    <p className="text-gray-700">
                      We'll review your request and send you a return authorization 
                      code and shipping instructions within 24 hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-baby-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold">Package & Ship</h3>
                    <p className="text-gray-700">
                      Pack the item securely in original packaging, include the return 
                      authorization code, and ship to our Lagos office using a trackable 
                      shipping method.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-baby-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold">Refund Processed</h3>
                    <p className="text-gray-700">
                      Once we receive and inspect your return, we'll process your refund 
                      within 5-7 business days to your original payment method.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Support */}
            <section className="bg-baby-blue-600 text-white rounded-2xl p-8 text-center">
              <HelpCircle className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
              <p className="mb-6">
                Our customer support team is available Monday-Friday, 9am-6pm WAT
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="mailto:support@babyblue.com" 
                  className="bg-white text-baby-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Email Support
                </a>
                <a 
                  href="https://wa.me/2348001234567" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  WhatsApp Us
                </a>
              </div>
            </section>
          </motion.div>
        </div>
      </div>
    </>
  )
}
