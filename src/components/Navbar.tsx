import { Link } from 'react-router-dom'
import { ShoppingBag, Menu, X, User, Heart } from 'lucide-react'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { easeLuxury } from '../utils/motion'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'

const menuVariants = {
  closed: { opacity: 0, height: 0, transition: { duration: 0.2 } },
  open: { opacity: 1, height: 'auto', transition: { duration: 0.25, ease: easeLuxury } },
}

const itemVariants = {
  closed: { opacity: 0, y: -6 },
  open: { opacity: 1, y: 0 },
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { getItemCount } = useCart()
  const { getWishlistCount } = useWishlist()
  const { isAuthenticated, user, logout } = useAuth()
  const cartCount = getItemCount()
  const wishlistCount = getWishlistCount()

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div>
            <Link 
              to="/" 
              className="flex items-center space-x-2"
              onClick={(e) => {
                console.log('Logo clicked:', e.detail)
                if (e.detail === 2) {
                  console.log('Double click detected on logo')
                }
              }}
            >
              <span className="text-2xl font-serif font-bold text-baby-blue-600">
                Baby Blue
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { to: '/', label: 'Home' },
              { to: '/products', label: 'Shop' },
              { to: '/about', label: 'About' },
              { to: '/orders', label: 'Orders' },
              { to: '/contact', label: 'Contact' },
            ].map((item) => (
              item.to === '/' ? (
                <div key={item.to}>
                  <Link
                    to={item.to}
                    className="text-charcoal hover:text-baby-blue-600 transition-colors font-medium"
                    onClick={(e) => {
                      console.log('Navbar link clicked:', item.to, e.detail)
                      if (e.detail === 2) {
                        console.log('Double click detected on:', item.to)
                      }
                    }}
                  >
                    {item.label}
                  </Link>
                </div>
              ) : (
                <motion.div key={item.to} whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to={item.to}
                    className="text-charcoal hover:text-baby-blue-600 transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              )
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="hidden md:flex items-center space-x-1 text-charcoal hover:text-baby-blue-600 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm">{user?.name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="hidden md:block text-sm text-charcoal hover:text-baby-blue-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center space-x-1 text-charcoal hover:text-baby-blue-600 transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="text-sm">Login</span>
              </Link>
            )}

            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/wishlist"
                className="text-charcoal hover:text-baby-blue-600 transition-colors relative"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/cart"
                className="relative text-charcoal hover:text-baby-blue-600 transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.6, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className="absolute -top-2 -right-2 bg-baby-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-charcoal"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence initial={false}>
          {isMenuOpen && (
            <motion.div
              key="mobile-menu"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden overflow-hidden border-t"
            >
              <motion.div
                variants={{
                  open: {
                    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
                  },
                }}
                className="py-4"
              >
                {[ 
                  { to: '/', label: 'Home' },
                  { to: '/products', label: 'Shop' },
                  { to: '/about', label: 'About' },
                  { to: '/orders', label: 'Orders' },
                  { to: '/wishlist', label: 'Wishlist' },
                  { to: '/contact', label: 'Contact' },
                ].map((item) => (
                  item.to === '/' ? (
                    <div key={item.to}>
                      <Link
                        to={item.to}
                        className="block py-2 text-charcoal hover:text-baby-blue-600"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </div>
                  ) : (
                    <motion.div key={item.to} variants={itemVariants}>
                      <Link
                        to={item.to}
                        className="block py-2 text-charcoal hover:text-baby-blue-600"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  )
                ))}

                {isAuthenticated ? (
                  <>
                    <motion.div variants={itemVariants}>
                      <Link
                        to="/dashboard"
                        className="block py-2 text-charcoal hover:text-baby-blue-600"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <Link
                        to="/profile"
                        className="block py-2 text-charcoal hover:text-baby-blue-600"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Profile
                      </Link>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <button
                        onClick={() => {
                          logout()
                          setIsMenuOpen(false)
                        }}
                        className="block py-2 text-charcoal hover:text-baby-blue-600 w-full text-left"
                      >
                        Logout
                      </button>
                    </motion.div>
                  </>
                ) : (
                  <motion.div variants={itemVariants}>
                    <Link
                      to="/login"
                      className="block py-2 text-charcoal hover:text-baby-blue-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}


