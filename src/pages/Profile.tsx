import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Package, MapPin, CreditCard, LogOut, Eye, Truck, CheckCircle, XCircle, Edit3, Save, X, Plus, MapPin as MapPinIcon, RefreshCw, ExternalLink } from 'lucide-react'
import { fadeUpItem } from '../utils/motion'
import { useAuth } from '../context/AuthContext'
import { showToast } from '../utils/toast'
import { useCRUDStore } from '../store/crudStore'
import { useCart } from '../context/CartContext'

const statusConfig = {
  delivered: { icon: CheckCircle, color: 'text-green-600 bg-green-50', label: 'Delivered' },
  shipped: { icon: Truck, color: 'text-blue-600 bg-blue-50', label: 'Shipped' },
  processing: { icon: Package, color: 'text-yellow-600 bg-yellow-50', label: 'Processing' },
  cancelled: { icon: XCircle, color: 'text-red-600 bg-red-50', label: 'Cancelled' },
  pending: { icon: Package, color: 'text-gray-600 bg-gray-50', label: 'Pending' },
}

export default function Profile() {
  const { user, logout } = useAuth()
  const { getOrdersByCustomer, updateOrder } = useCRUDStore()
  const { addToCart } = useCart()
  const [activeTab, setActiveTab] = useState<'orders' | 'info' | 'address'>('orders')
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isEditingAddress, setIsEditingAddress] = useState<string | null>(null)
  const [isAddingAddress, setIsAddingAddress] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Jane Doe',
    email: user?.email || 'jane.doe@example.com',
    phone: '+234 800 123 4567'
  })
  const [addresses, setAddresses] = useState([
    {
      id: '1',
      type: 'Home',
      name: 'Home Address',
      address: '123 Ikoyi Road, Lagos, Nigeria',
      phone: '+234 800 123 4567'
    },
    {
      id: '2',
      type: 'Office',
      name: 'Office Address',
      address: '456 Victoria Island, Lagos, Nigeria',
      phone: '+234 800 987 6543'
    }
  ])
  const [newAddress, setNewAddress] = useState({
    type: 'Home',
    name: '',
    address: '',
    phone: ''
  })

  // Get live orders for the current user
  const orderHistory = user ? getOrdersByCustomer(user.id) : []

  // Transform orders to match the display format
  const formattedOrders = orderHistory.map(order => ({
    id: order.id,
    date: order.orderDate,
    status: order.status,
    total: order.totalAmount,
    items: order.items.map(item => ({
      id: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      color: 'N/A' // Color info not stored in order items
    })),
    trackingNumber: order.trackingNumber || 'Pending',
    deliveryAddress: `${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.country}`
  }))

  const handleProfileUpdate = async () => {
    try {
      await showToast.success('Profile updated successfully!')
      showToast.success('Profile updated successfully!')
      setIsEditingProfile(false)
    } catch (error) {
      showToast.error('Failed to update profile. Please try again.')
    }
  }

  const handleAddressUpdate = (addressId: string, updatedAddress: any) => {
    setAddresses(addresses.map(addr =>
      addr.id === addressId ? { ...addr, ...updatedAddress } : addr
    ))
    setIsEditingAddress(null)
    showToast.success('Address updated successfully!')
  }

  
  const handleAddAddress = () => {
    if (newAddress.name && newAddress.address && newAddress.phone) {
      setAddresses([...addresses, {
        id: Date.now().toString(),
        ...newAddress
      }])
      setNewAddress({ type: 'Home', name: '', address: '', phone: '' })
      setIsAddingAddress(false)
      showToast.success('Address added successfully!')
    } else {
      showToast.error('Please fill in all address fields.')
    }
  }

  const handleDeleteAddress = (addressId: string) => {
    setAddresses(addresses.filter(addr => addr.id !== addressId))
    showToast.success('Address deleted successfully!')
  }

  const handleLogout = () => {
    logout()
    showToast.info('You have been signed out.')
  }

  const handleOrderTracking = (orderId: string) => {
    // Simulate tracking functionality
    showToast.info('Opening tracking information...')
    setTimeout(() => {
      showToast.info(`Tracking for ${orderId}: Package is in transit and will arrive within 2-3 business days.`)
    }, 1000)
  }

  const handleCancelOrder = async (orderId: string) => {
    try {
      await updateOrder(orderId, { status: 'cancelled' })
      showToast.success('Order cancelled successfully!')
    } catch (error) {
      showToast.error('Failed to cancel order. Please try again.')
    }
  }

  const handleReorder = (order: any) => {
    // Add all items from the order back to cart
    order.items.forEach((item: any) => {
      addToCart({
        id: item.productId,
        name: item.name,
        price: item.price,
        image: item.imageKeyword,
      })
    })
    showToast.success('Items added to cart! Proceed to checkout.')
  }

  const handleViewOrderDetails = (order: any) => {
    setSelectedOrder(order)
  }

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'shipped': return 'bg-blue-100 text-blue-800'
      case 'processing': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getOrderStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return CheckCircle
      case 'shipped': return Truck
      case 'processing': return Package
      case 'cancelled': return XCircle
      default: return Package
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-6 mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center text-white text-2xl font-bold">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user?.name || 'User'}</h1>
                <p className="text-gray-600">{user?.email || 'user@example.com'}</p>
                <p className="text-sm text-gray-500 mt-1">Member since {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('info')}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </button>
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
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 hover:text-gray-900'
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
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order History</h2>
              <div className="space-y-4">
                {formattedOrders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                    <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
                    <a
                      href="/products"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Start Shopping
                    </a>
                  </div>
                ) : (
                  formattedOrders.map((order, index) => {
                    const StatusIcon = statusConfig[order.status as keyof typeof statusConfig]?.icon || Package
                    const statusStyle = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.pending

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
                              <h3 className="font-semibold text-gray-900">{order.id}</h3>
                              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusStyle.color}`}>
                                <StatusIcon className="w-3 h-3" />
                                {statusStyle.label}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-600">Tracking: {order.trackingNumber}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-gray-900">₦{order.total.toLocaleString()}</p>
                            <div className="flex flex-col gap-2 mt-2">
                              <button
                                onClick={() => handleViewOrderDetails(order)}
                                className="text-gray-600 hover:text-gray-900 text-sm font-medium flex items-center gap-1"
                              >
                                <Eye className="w-3 h-3" />
                                View Details
                              </button>
                              {order.status === 'shipped' && (
                                <button
                                  onClick={() => handleOrderTracking(order.id)}
                                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                                >
                                  <MapPinIcon className="w-3 h-3" />
                                  Track Order
                                </button>
                              )}
                            </div>
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

                        {/* Order Management Actions */}
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex flex-wrap gap-2">
                            {order.status === 'processing' && (
                              <button
                                onClick={() => handleCancelOrder(order.id)}
                                className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-xs font-medium flex items-center gap-1"
                              >
                                <X className="w-3 h-3" />
                                Cancel Order
                              </button>
                            )}
                            <button
                              onClick={() => handleReorder(order)}
                              className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-xs font-medium flex items-center gap-1"
                            >
                              <RefreshCw className="w-3 h-3" />
                              Reorder
                            </button>
                            {order.trackingNumber !== 'Pending' && (
                              <button
                                onClick={() => handleOrderTracking(order.id)}
                                className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-xs font-medium flex items-center gap-1"
                              >
                                <ExternalLink className="w-3 h-3" />
                                Track Package
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })
                )}
              </div>
            </div>
          )}

          {activeTab === 'info' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Account Information</h2>
                {!isEditingProfile && (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit Profile
                  </button>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  {isEditingProfile ? (
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                      {profileData.name}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  {isEditingProfile ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
                      placeholder="Enter your email address"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                      {profileData.email}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  {isEditingProfile ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                      {profileData.phone}
                    </div>
                  )}
                </div>

                {isEditingProfile && (
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleProfileUpdate}
                      className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setProfileData({
                          name: user?.name || 'Jane Doe',
                          email: user?.email || 'jane.doe@example.com',
                          phone: '+234 800 123 4567'
                        })
                        setIsEditingProfile(false)
                      }}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'address' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Delivery Addresses</h2>
                {!isAddingAddress && (
                  <button
                    onClick={() => setIsAddingAddress(true)}
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add New Address
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {/* Add New Address Form */}
                {isAddingAddress && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Address</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address Type</label>
                        <select
                          value={newAddress.type}
                          onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        >
                          <option value="Home">Home</option>
                          <option value="Office">Office</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address Name</label>
                        <input
                          type="text"
                          value={newAddress.name}
                          onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                          placeholder="e.g., My Home Address"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Address</label>
                        <textarea
                          value={newAddress.address}
                          onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                          placeholder="Enter your full address"
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={newAddress.phone}
                          onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                          placeholder="+234 800 123 4567"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        />
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={handleAddAddress}
                          className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
                        >
                          <Save className="w-4 h-4" />
                          Save Address
                        </button>
                        <button
                          onClick={() => {
                            setNewAddress({ type: 'Home', name: '', address: '', phone: '' })
                            setIsAddingAddress(false)
                          }}
                          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Existing Addresses */}
                {addresses.map((address) => (
                  <motion.div
                    key={address.id}
                    className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    {isEditingAddress === address.id ? (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Edit Address</h3>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Address Type</label>
                          <select
                            value={address.type}
                            onChange={(e) => handleAddressUpdate(address.id, { type: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                          >
                            <option value="Home">Home</option>
                            <option value="Office">Office</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Address Name</label>
                          <input
                            type="text"
                            value={address.name}
                            onChange={(e) => handleAddressUpdate(address.id, { name: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Full Address</label>
                          <textarea
                            value={address.address}
                            onChange={(e) => handleAddressUpdate(address.id, { address: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                          <input
                            type="tel"
                            value={address.phone}
                            onChange={(e) => handleAddressUpdate(address.id, { phone: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                          />
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => setIsEditingAddress(null)}
                            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
                          >
                            <Save className="w-4 h-4" />
                            Save Changes
                          </button>
                          <button
                            onClick={() => setIsEditingAddress(null)}
                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                          >
                            <X className="w-4 h-4" />
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <p className="font-semibold text-gray-900">{address.name}</p>
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                              {address.type}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-1">{address.address}</p>
                          <p className="text-sm text-gray-500">{address.phone}</p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => setIsEditingAddress(address.id)}
                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                            title="Edit Address"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteAddress(address.id)}
                            className="p-2 text-red-400 hover:text-red-600 transition-colors"
                            title="Delete Address"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}

                {!isAddingAddress && addresses.length === 0 && (
                  <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">No addresses added yet</p>
                    <button
                      onClick={() => setIsAddingAddress(true)}
                      className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 mx-auto"
                    >
                      <Plus className="w-4 h-4" />
                      Add Your First Address
                    </button>
                  </div>
                )}
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
          <button
            onClick={() => showToast.info('Payment methods feature coming soon!')}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <CreditCard className="w-4 h-4" />
            Payment Methods
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg border border-red-200 hover:bg-red-100 hover:border-red-300 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </motion.div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Order Details</h3>
                    <p className="text-gray-600">Order #{selectedOrder.id}</p>
                  </div>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Order Status & Tracking */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Order Status</h4>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-full ${getOrderStatusColor(selectedOrder.status)}`}>
                        {(() => {
                          const IconComponent = getOrderStatusIcon(selectedOrder.status);
                          return <IconComponent className="w-6 h-6" />;
                        })()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 capitalize">{selectedOrder.status}</p>
                        <p className="text-sm text-gray-600">Placed on {new Date(selectedOrder.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="text-2xl font-bold text-gray-900">₦{selectedOrder.total.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Tracking Timeline */}
                  <div className="space-y-4">
                    <h5 className="font-medium text-gray-900">Tracking Timeline</h5>
                    <div className="space-y-3">
                      <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                          <div className="w-0.5 h-8 bg-green-500"></div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Order Placed</p>
                          <p className="text-sm text-gray-600">{new Date(selectedOrder.date).toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-4 h-4 rounded-full ${selectedOrder.status !== 'pending' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          <div className={`w-0.5 h-8 ${selectedOrder.status !== 'pending' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Order Confirmed</p>
                          <p className="text-sm text-gray-600">Payment received and order processed</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-4 h-4 rounded-full ${['shipped', 'delivered'].includes(selectedOrder.status) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          <div className={`w-0.5 h-8 ${['shipped', 'delivered'].includes(selectedOrder.status) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Shipped</p>
                          <p className="text-sm text-gray-600">
                            {selectedOrder.trackingNumber !== 'Pending' ? `Tracking: ${selectedOrder.trackingNumber}` : 'Preparing for shipment'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-4 h-4 rounded-full ${selectedOrder.status === 'delivered' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Delivered</p>
                          <p className="text-sm text-gray-600">Package delivered successfully</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h4>
                  <div className="space-y-4">
                    {selectedOrder.items.map((item: any, index: number) => (
                      <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Package className="w-8 h-8 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity} • Color: {item.color}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">₦{item.price.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping & Payment Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Shipping Information</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <MapPinIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{selectedOrder.deliveryAddress}</span>
                      </div>
                      {selectedOrder.trackingNumber !== 'Pending' && (
                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">Tracking: {selectedOrder.trackingNumber}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Paid via {selectedOrder.paymentMethod || 'Card'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600">Payment confirmed</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => handleReorder(selectedOrder)}
                    className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reorder Items
                  </button>
                  {selectedOrder.status === 'processing' && (
                    <button
                      onClick={() => {
                        handleCancelOrder(selectedOrder.id)
                        setSelectedOrder(null)
                      }}
                      className="px-6 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancel Order
                    </button>
                  )}
                  {selectedOrder.trackingNumber !== 'Pending' && (
                    <button
                      onClick={() => handleOrderTracking(selectedOrder.id)}
                      className="px-6 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Track Package
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
