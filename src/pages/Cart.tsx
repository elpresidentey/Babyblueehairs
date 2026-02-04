import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Trash2, Plus, Minus, ShoppingBag, Eye, Truck, CheckCircle } from 'lucide-react'
import { useEffect } from 'react'
import { useCart } from '../context/CartContext'
import StockImage from '../components/StockImage'

// Mock order history for cart page
const recentOrders = [
  {
    id: 'ORD-2024-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 1500000,
    items: [
      { id: '1', name: 'Silky Straight Bundle', price: 850000, quantity: 1 },
      { id: '2', name: 'Body Wave Closure', price: 650000, quantity: 1 },
    ],
  },
  {
    id: 'ORD-2024-002',
    date: '2024-01-28',
    status: 'shipped',
    total: 920000,
    items: [
      { id: '3', name: 'Curly Lace Front Wig', price: 920000, quantity: 1 },
    ],
  },
]

export default function Cart() {
  const { items, updateQuantity, removeFromCart, getTotal, clearCart } = useCart()
  const location = useLocation()

  useEffect(() => {
    if (location.state?.scrollToTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [location.state])

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-ivory py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8">Start shopping to add items to your cart</p>
          <Link to="/products" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  const subtotal = getTotal()
  const shipping = 5000 // Fixed shipping cost
  const total = subtotal + shipping

  return (
    <div id="cart-top" className="min-h-screen bg-ivory py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-serif font-bold text-charcoal mb-8">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-6 flex flex-col sm:flex-row gap-4"
              >
                <StockImage
                  width={128}
                  height={128}
                  keyword={item.imageKeyword || item.image || item.name.toLowerCase() + ' hair'}
                  alt={item.name}
                  className="w-full sm:w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-charcoal mb-2">
                    {item.name}
                  </h3>
                  <p className="text-2xl font-bold text-charcoal mb-4">
                    ₦{item.price.toLocaleString()}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 border rounded-lg flex items-center justify-center hover:bg-gray-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-lg font-semibold w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 border rounded-lg flex items-center justify-center hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-700 p-2"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-charcoal">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </motion.div>
            ))}

            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Clear Cart
            </button>

            {/* Order History */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-serif font-bold text-charcoal">Recent Orders</h3>
                <Link to="/profile" className="text-baby-blue-600 hover:text-baby-blue-700 text-sm font-medium">
                  View All
                </Link>
              </div>
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-charcoal">{order.id}</p>
                        <p className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {order.status === 'delivered' ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <Truck className="w-4 h-4 text-blue-600" />
                        )}
                        <span className={`text-sm font-medium ${
                          order.status === 'delivered' ? 'text-green-600' : 'text-blue-600'
                        }`}>
                          {order.status === 'delivered' ? 'Delivered' : 'Shipped'}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {order.items.length} item{order.items.length > 1 ? 's' : ''}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-charcoal">₦{order.total.toLocaleString()}</span>
                      <Link
                        to={`/profile?order=${order.id}`}
                        className="text-baby-blue-600 hover:text-baby-blue-700 text-sm font-medium flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        View
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 sticky top-24">
              <h2 className="text-2xl font-serif font-bold text-charcoal mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">₦{shipping.toLocaleString()}</span>
                </div>
                <div className="border-t pt-4 flex justify-between text-xl">
                  <span className="font-bold text-charcoal">Total</span>
                  <span className="font-bold text-charcoal">
                    ₦{total.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                  setTimeout(() => {
                    window.location.href = '/checkout'
                  }, 300)
                }}
                className="btn-primary w-full block text-center mb-4"
              >
                Proceed to Checkout
              </button>
              <Link
                to="/products"
                className="btn-secondary w-full block text-center"
              >
                Continue Shopping
              </Link>

              {/* Promo Code */}
              <div className="mt-6 pt-6 border-t">
                <label className="block mb-2 font-medium text-sm">Promo Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 p-2 border rounded-lg text-sm"
                  />
                  <button className="btn-secondary text-sm px-4">Apply</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
