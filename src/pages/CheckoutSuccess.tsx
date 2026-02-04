import { useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, Package, Mail, Home, ShoppingBag } from 'lucide-react'

export default function CheckoutSuccess() {
  const location = useLocation()
  const orderId = location.state?.orderId || 'BB-000000'
  
  console.log('CheckoutSuccess - Order ID:', orderId)
  console.log('CheckoutSuccess - Location state:', location.state)

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full text-center"
      >
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mb-8"
          >
            <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-20 h-20 text-green-600" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-dark-blue mb-4"
          >
            Order Confirmed!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 text-lg mb-8"
          >
            Thank you for your purchase. Your order has been received and is being processed.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-baby-blue-50 border-2 border-baby-blue-200 rounded-xl p-6 mb-8"
          >
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Package className="w-6 h-6 text-baby-blue-600" />
              <span className="text-gray-700 font-medium">Order Number:</span>
            </div>
            <p className="text-3xl font-bold text-dark-blue">{orderId}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-50 rounded-xl p-6 mb-8"
          >
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Mail className="w-5 h-5 text-gray-600" />
              <p className="text-gray-700">
                You will receive an email confirmation shortly with your order details and
                tracking information.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link 
              to="/products" 
              className="btn-primary flex items-center justify-center gap-2 py-3 px-6"
            >
              <ShoppingBag className="w-5 h-5" />
              Continue Shopping
            </Link>
            <Link 
              to="/" 
              className="btn-secondary flex items-center justify-center gap-2 py-3 px-6"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
