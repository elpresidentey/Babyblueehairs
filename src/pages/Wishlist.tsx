import { motion } from 'framer-motion'
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import ProductCard from '../components/ProductCard'
import { fadeUpItem, staggerContainer } from '../utils/motion'
import { Link } from 'react-router-dom'

export default function Wishlist() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-ivory py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6 flex items-center justify-center" />
          <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">
            Your wishlist is empty
          </h2>
          <p className="text-gray-600 mb-8">
            Start adding items you love to your wishlist
          </p>
          <Link to="/products" className="btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ivory py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-serif font-bold text-charcoal mb-2">
              My Wishlist
            </h1>
            <p className="text-gray-600">
              {items.length} {items.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          <button
            onClick={clearWishlist}
            className="text-red-600 hover:text-red-700 font-medium flex items-center gap-2"
          >
            Clear All
          </button>
        </motion.div>

        {/* Wishlist Items */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {items.map((product) => (
            <motion.div
              key={product.id}
              variants={fadeUpItem}
              className="relative"
            >
              <ProductCard product={product} />
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-red-50 hover:text-red-600 transition-colors"
                aria-label="Remove from wishlist"
              >
                <Heart className="w-4 h-4 fill-current flex items-center justify-center" />
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center bg-white rounded-2xl p-8 shadow-sm"
        >
          <h2 className="text-2xl font-serif font-bold text-charcoal mb-4">
            Ready to checkout?
          </h2>
          <p className="text-gray-600 mb-6">
            Add your favorite items to cart and complete your purchase
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/cart" className="btn-primary inline-flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Go to Cart
            </Link>
            <Link to="/products" className="btn-secondary inline-flex items-center justify-center">
              Continue Shopping
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
