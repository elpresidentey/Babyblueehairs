import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  CreditCard,
  Truck,
  Check,
  MapPin,
  User,
  Mail,
  Phone,
  Lock,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import StockImage from '../components/StockImage'

type PaymentMethod = 'paystack' | 'flutterwave' | 'bank-transfer'

export default function Checkout() {
  const navigate = useNavigate()
  const { items, getTotal, clearCart } = useCart()
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('paystack')

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isProcessing, setIsProcessing] = useState(false)

  const subtotal = getTotal()
  const shipping = 5000
  const total = subtotal + shipping

  // Avoid navigating during render (can cause warnings / weird loops).
  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart', { replace: true })
    }
  }, [items.length, navigate])

  if (items.length === 0) {
    return null
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.state.trim()) newErrors.state = 'State is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (step === 1) {
      if (!validateStep1()) return
    }
    setStep(step + 1)
  }

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In a real app, integrate with Paystack/Flutterwave here.
    // (No console logs in production UX.)

    clearCart()
    navigate('/checkout/success', {
      state: { orderId: `BB-${Date.now()}` },
    })
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-dark-blue mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your order in a few simple steps</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center w-full max-w-md">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all ${
                  step >= 1
                    ? 'bg-baby-blue-600 text-white shadow-lg scale-110'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step > 1 ? <Check className="w-6 h-6" /> : '1'}
              </div>
              <p
                className={`text-xs mt-2 ${
                  step >= 1 ? 'text-baby-blue-600 font-medium' : 'text-gray-500'
                }`}
              >
                Delivery
              </p>
            </div>
            <div
              className={`h-1 flex-1 mx-2 transition-all ${
                step >= 2 ? 'bg-baby-blue-600' : 'bg-gray-200'
              }`}
            ></div>
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all ${
                  step >= 2
                    ? 'bg-baby-blue-600 text-white shadow-lg scale-110'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step > 2 ? <Check className="w-6 h-6" /> : '2'}
              </div>
              <p
                className={`text-xs mt-2 ${
                  step >= 2 ? 'text-baby-blue-600 font-medium' : 'text-gray-500'
                }`}
              >
                Payment
              </p>
            </div>
            <div
              className={`h-1 flex-1 mx-2 transition-all ${
                step >= 3 ? 'bg-baby-blue-600' : 'bg-gray-200'
              }`}
            ></div>
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all ${
                  step >= 3
                    ? 'bg-baby-blue-600 text-white shadow-lg scale-110'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                3
              </div>
              <p
                className={`text-xs mt-2 ${
                  step >= 3 ? 'text-baby-blue-600 font-medium' : 'text-gray-500'
                }`}
              >
                Review
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-8"
              >
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 rounded-full bg-baby-blue-100 flex items-center justify-center mr-4">
                    <Truck className="w-6 h-6 text-baby-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-dark-blue">Delivery Details</h2>
                    <p className="text-sm text-gray-600">Where should we deliver your order?</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700 flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full p-3.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-baby-blue-600 transition-all ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-gray-700 flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full p-3.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-baby-blue-600 transition-all ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block mb-2 font-medium text-gray-700 flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full p-3.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-baby-blue-600 transition-all ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="john.doe@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="mb-6">
                  <label className="block mb-2 font-medium text-gray-700 flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full p-3.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-baby-blue-600 transition-all ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+234 800 000 0000"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div className="mb-6">
                  <label className="block mb-2 font-medium text-gray-700 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full p-3.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-baby-blue-600 transition-all ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="123 Main Street"
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full p-3.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-baby-blue-600 transition-all ${
                        errors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Lagos"
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`w-full p-3.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-baby-blue-600 transition-all ${
                        errors.state ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Lagos"
                    />
                    {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Zip Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full p-3.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-baby-blue-600 transition-all"
                      placeholder="100001"
                    />
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base font-semibold"
                >
                  Continue to Payment
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-8"
              >
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 rounded-full bg-baby-blue-100 flex items-center justify-center mr-4">
                    <CreditCard className="w-6 h-6 text-baby-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-dark-blue">Payment Method</h2>
                    <p className="text-sm text-gray-600">Choose your preferred payment option</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <label
                    className={`flex items-center p-5 border-2 rounded-xl cursor-pointer transition-all ${
                      paymentMethod === 'paystack'
                        ? 'border-baby-blue-600 bg-baby-blue-50'
                        : 'border-gray-200 hover:border-baby-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="paystack"
                      checked={paymentMethod === 'paystack'}
                      onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                      className="mr-4 w-5 h-5 text-baby-blue-600"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-dark-blue mb-1">Paystack</div>
                      <div className="text-sm text-gray-600">Pay with card, bank transfer, or USSD</div>
                    </div>
                    <Lock className="w-5 h-5 text-gray-400" />
                  </label>

                  <label
                    className={`flex items-center p-5 border-2 rounded-xl cursor-pointer transition-all ${
                      paymentMethod === 'flutterwave'
                        ? 'border-baby-blue-600 bg-baby-blue-50'
                        : 'border-gray-200 hover:border-baby-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="flutterwave"
                      checked={paymentMethod === 'flutterwave'}
                      onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                      className="mr-4 w-5 h-5 text-baby-blue-600"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-dark-blue mb-1">Flutterwave</div>
                      <div className="text-sm text-gray-600">Secure payment gateway</div>
                    </div>
                    <Lock className="w-5 h-5 text-gray-400" />
                  </label>

                  <label
                    className={`flex items-center p-5 border-2 rounded-xl cursor-pointer transition-all ${
                      paymentMethod === 'bank-transfer'
                        ? 'border-baby-blue-600 bg-baby-blue-50'
                        : 'border-gray-200 hover:border-baby-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="bank-transfer"
                      checked={paymentMethod === 'bank-transfer'}
                      onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                      className="mr-4 w-5 h-5 text-baby-blue-600"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-dark-blue mb-1">Bank Transfer</div>
                      <div className="text-sm text-gray-600">Manual confirmation required</div>
                    </div>
                    <Lock className="w-5 h-5 text-gray-400" />
                  </label>
                </div>

                {paymentMethod === 'bank-transfer' && (
                  <div className="bg-baby-blue-50 border border-baby-blue-200 p-6 rounded-xl mb-8">
                    <p className="font-semibold text-dark-blue mb-3">Bank Transfer Details:</p>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>
                        <span className="font-medium">Account Name:</span> Baby Blue Hair
                      </p>
                      <p>
                        <span className="font-medium">Account Number:</span> 1234567890
                      </p>
                      <p>
                        <span className="font-medium">Bank:</span> Access Bank
                      </p>
                      <p className="mt-3 text-xs text-gray-600">
                        Please include your order reference in the transfer description.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="btn-secondary flex-1 flex items-center justify-center gap-2 py-4"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="btn-primary flex-1 flex items-center justify-center gap-2 py-4"
                  >
                    Review Order
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-8"
              >
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 rounded-full bg-baby-blue-100 flex items-center justify-center mr-4">
                    <Check className="w-6 h-6 text-baby-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-dark-blue">Review Your Order</h2>
                    <p className="text-sm text-gray-600">Please review before completing your purchase</p>
                  </div>
                </div>

                <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <h3 className="font-semibold text-dark-blue mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-baby-blue-600" />
                    Delivery Address
                  </h3>
                  <div className="text-gray-700 space-y-1">
                    <p className="font-medium">
                      {formData.firstName} {formData.lastName}
                    </p>
                    <p>{formData.address}</p>
                    <p>
                      {formData.city}, {formData.state} {formData.zipCode}
                    </p>
                    <p className="flex items-center mt-2">
                      <Phone className="w-4 h-4 mr-2" />
                      {formData.phone}
                    </p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-semibold text-dark-blue mb-4">Order Items</h3>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <StockImage
                            width={80}
                            height={80}
                            keyword={item.imageKeyword || item.image || item.name.toLowerCase() + ' hair'}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div>
                            <p className="font-semibold text-dark-blue">{item.name}</p>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-bold text-dark-blue text-lg">
                          ₦{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8 p-6 bg-baby-blue-50 rounded-xl border border-baby-blue-200">
                  <h3 className="font-semibold text-dark-blue mb-3 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Payment Method
                  </h3>
                  <p className="text-gray-700 capitalize">
                    {paymentMethod === 'paystack' && 'Paystack'}
                    {paymentMethod === 'flutterwave' && 'Flutterwave'}
                    {paymentMethod === 'bank-transfer' && 'Bank Transfer'}
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(2)}
                    className="btn-secondary flex-1 flex items-center justify-center gap-2 py-4"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                  </button>
                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="btn-primary flex-1 flex items-center justify-center gap-2 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5" />
                        Complete Order
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-dark-blue mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-semibold">₦{shipping.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="font-bold text-xl text-dark-blue">Total</span>
                  <span className="font-bold text-xl text-dark-blue">₦{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-600">
                  <Lock className="w-4 h-4 mr-2" />
                  <span>Secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
