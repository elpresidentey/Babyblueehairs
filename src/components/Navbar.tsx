import { Link } from 'react-router-dom'
import { ShoppingBag, Menu, X, User, Heart } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { getItemCount } = useCart()
  const { isAuthenticated, user, logout } = useAuth()
  const cartCount = getItemCount()

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-serif font-bold text-baby-blue-600">
              Baby Blue
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-charcoal hover:text-baby-blue-600 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-charcoal hover:text-baby-blue-600 transition-colors font-medium"
            >
              Shop
            </Link>
            <Link
              to="/contact"
              className="text-charcoal hover:text-baby-blue-600 transition-colors font-medium"
            >
              Contact
            </Link>
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

            <Link
              to="/dashboard?tab=wishlist"
              className="text-charcoal hover:text-baby-blue-600 transition-colors"
            >
              <Heart className="w-5 h-5" />
            </Link>

            <Link
              to="/cart"
              className="relative text-charcoal hover:text-baby-blue-600 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-baby-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-charcoal"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <Link
              to="/"
              className="block py-2 text-charcoal hover:text-baby-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block py-2 text-charcoal hover:text-baby-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/contact"
              className="block py-2 text-charcoal hover:text-baby-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block py-2 text-charcoal hover:text-baby-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout()
                    setIsMenuOpen(false)
                  }}
                  className="block py-2 text-charcoal hover:text-baby-blue-600 w-full text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block py-2 text-charcoal hover:text-baby-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
