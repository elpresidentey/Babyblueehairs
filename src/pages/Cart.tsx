import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import StockImage from '../components/StockImage'

export default function Cart() {
  const { items, updateQuantity, removeFromCart, getTotal, clearCart } = useCart()

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
    <div className="min-h-screen bg-ivory py-12 px-4">
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

              <Link to="/checkout" className="btn-primary w-full block text-center mb-4">
                Proceed to Checkout
              </Link>
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
