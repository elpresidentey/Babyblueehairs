import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUpItem } from '../utils/motion'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
      <motion.div
        initial="hidden"
        animate="show"
        className="text-center max-w-md"
      >
        <motion.div variants={fadeUpItem} className="mb-8">
          <h1 className="text-9xl font-bold text-baby-blue-600 mb-4">404</h1>
          <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </motion.div>

        <motion.div variants={fadeUpItem} className="space-y-4">
          <Link
            to="/"
            className="btn-primary inline-flex items-center justify-center w-full"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-secondary inline-flex items-center justify-center w-full"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}
