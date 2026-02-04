import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Package, MapPin, CreditCard, LogOut, Eye, Truck, CheckCircle, XCircle } from 'lucide-react'
import { fadeUpItem } from '../utils/motion'

// Mock order history data
const orderHistory = [
  {
    id: 'ORD-2024-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 850000,
    items: [
      { id: '1', name: 'Silky Straight Bundle', price: 450000, quantity: 1, color: 'Black' },
      { id: '2', name: 'Body Wave Closure', price: 350000, quantity: 1, color: 'Dark Brown' },
    ],
    trackingNumber: 'NG123456789',
    deliveryAddress: '123 Ikoyi Road, Lagos, Nigeria',
  },
  {
    id: 'ORD-2024-002',
    date: '2024-01-28',
    status: 'shipped',
    total: 550000,
    items: [
      { id: '3', name: 'Curly Lace Front Wig', price: 550000, quantity: 1, color: 'Light Brown' },
    ],
    trackingNumber: 'NG987654321',
    deliveryAddress: '456 Victoria Island, Lagos, Nigeria',
  },
  {
    id: 'ORD-2024-003',
    date: '2024-02-05',
    status: 'processing',
    total: 980000,
    items: [
      { id: '4', name: 'Deep Wave Bundle', price: 480000, quantity: 1, color: 'Black' },
      { id: '5', name: 'Loose Wave Frontal', price: 400000, quantity: 1, color: 'Brown' },
    ],
    trackingNumber: 'NG456789123',
    deliveryAddress: '789 Lekki Phase 1, Lagos, Nigeria',
  },
]

const statusConfig = {
  delivered: { icon: CheckCircle, color: 'text-green-600 bg-green-50', label: 'Delivered' },
  shipped: { icon: Truck, color: 'text-blue-600 bg-blue-50', label: 'Shipped' },
  processing: { icon: Package, color: 'text-yellow-600 bg-yellow-50', label: 'Processing' },
  cancelled: { icon: XCircle, color: 'text-red-600 bg-red-50', label: 'Cancelled' },
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState<'orders' | 'info' | 'address'>('orders')

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-6 mb-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-baby-blue-400 to-baby-blue-600 flex items-center justify-center text-white text-2xl font-bold">
              JD
            </div>
            <div>
              <h1 className="text-2xl font-bold text-dark-blue">Jane Doe</h1>
              <p className="text-gray-600">jane.doe@example.com</p>
              <p className="text-sm text-gray-500 mt-1">Member since January 2024</p>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { id: 'orders', label: 'Order History', icon: Package },
            { id: 'info', label: 'Account Info', icon: User },
            { id: 'address', label: 'Addresses', icon: MapPin },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-baby-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:text-dark-blue'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-sm p-6"
        >
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-xl font-bold text-dark-blue mb-6">Order History</h2>
              <div className="space-y-4">
                {orderHistory.map((order, index) => {
                  const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon
                  const statusStyle = statusConfig[order.status as keyof typeof statusConfig]

                  return (
                    <motion.div
                      key={order.id}
                      variants={fadeUpItem}
                      initial="hidden"
                      animate="show"
                      transition={{ delay: index * 0.1 }}
                      className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-dark-blue">{order.id}</h3>
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusStyle.color}`}>
                              <StatusIcon className="w-3 h-3" />
                              {statusStyle.label}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                          <p className="text-sm text-gray-600">Tracking: {order.trackingNumber}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-dark-blue">₦{order.total.toLocaleString()}</p>
                          <button className="text-baby-blue-600 hover:text-baby-blue-700 text-sm font-medium mt-1 flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            View Details
                          </button>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Items:</p>
                        <div className="space-y-2">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm">
                              <span className="text-gray-600">
                                {item.name} × {item.quantity} ({item.color})
                              </span>
                              <span className="font-medium">₦{item.price.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm text-gray-600">
                          <strong>Delivery Address:</strong> {order.deliveryAddress}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )}

          {activeTab === 'info' && (
            <div>
              <h2 className="text-xl font-bold text-dark-blue mb-6">Account Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    defaultValue="Jane Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    defaultValue="jane.doe@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    defaultValue="+234 800 123 4567"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="bg-baby-blue-600 text-white px-4 py-2 rounded-lg hover:bg-baby-blue-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'address' && (
            <div>
              <h2 className="text-xl font-bold text-dark-blue mb-6">Delivery Addresses</h2>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-xl p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-dark-blue">Home Address</p>
                      <p className="text-gray-600 mt-1">123 Ikoyi Road, Lagos, Nigeria</p>
                      <p className="text-sm text-gray-500">+234 800 123 4567</p>
                    </div>
                    <button className="text-baby-blue-600 hover:text-baby-blue-700 text-sm">Edit</button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-xl p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-dark-blue">Office Address</p>
                      <p className="text-gray-600 mt-1">456 Victoria Island, Lagos, Nigeria</p>
                      <p className="text-sm text-gray-500">+234 800 987 6543</p>
                    </div>
                    <button className="text-baby-blue-600 hover:text-baby-blue-700 text-sm">Edit</button>
                  </div>
                </div>
                <button className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-baby-blue-400 hover:text-baby-blue-600 transition-colors">
                  + Add New Address
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 flex flex-wrap gap-3"
        >
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:border-baby-blue-300 hover:text-baby-blue-600 transition-colors">
            <CreditCard className="w-4 h-4" />
            Payment Methods
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:border-baby-blue-300 hover:text-baby-blue-600 transition-colors">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </motion.div>
      </div>
    </div>
  )
}
