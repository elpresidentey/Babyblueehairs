import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Package, Heart, MapPin, User, LogOut } from 'lucide-react'
import StockImage from '../components/StockImage'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('orders')

  // Get active tab from URL if present
  const urlParams = new URLSearchParams(window.location.search)
  const tabFromUrl = urlParams.get('tab')
  if (tabFromUrl && tabFromUrl !== activeTab) {
    setActiveTab(tabFromUrl)
  }

  if (!user) {
    navigate('/login')
    return null
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const tabs = [
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'profile', label: 'Profile', icon: User },
  ]

  // Mock data
  const orders = [
    {
      id: 'BB-123456',
      date: '2024-01-15',
      total: 45000,
      status: 'Delivered',
      items: ['Silky Straight Bundle'],
    },
    {
      id: 'BB-123455',
      date: '2024-01-10',
      total: 90000,
      status: 'Processing',
      items: ['Body Wave Closure', 'Curly Lace Front Wig'],
    },
  ]

  const wishlist = [
    {
      id: '1',
      name: 'Deep Wave Bundle',
      price: 48000,
      imageKeyword: 'deep wave hair',
    },
    {
      id: '2',
      name: 'Loose Wave Frontal',
      price: 40000,
      imageKeyword: 'loose wave hair',
    },
  ]

  const addresses = [
    {
      id: '1',
      name: 'Home',
      address: '123 Main Street, Victoria Island',
      city: 'Lagos',
      state: 'Lagos',
      isDefault: true,
    },
  ]

  return (
    <div className="min-h-screen bg-ivory py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-serif font-bold text-charcoal">
            My Account
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-red-600 hover:text-red-700"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6">
              <div className="mb-6">
                <div className="w-16 h-16 bg-baby-blue-100 rounded-full flex items-center justify-center mb-3">
                  <User className="w-8 h-8 text-baby-blue-600" />
                </div>
                <h3 className="font-semibold text-lg">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-baby-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'orders' && (
              <div className="bg-white rounded-xl p-8">
                <h2 className="text-2xl font-serif font-bold mb-6">Order History</h2>
                {orders.length === 0 ? (
                  <p className="text-gray-600">No orders yet</p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="font-semibold">Order #{order.id}</p>
                            <p className="text-sm text-gray-600">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">
                              ₦{order.total.toLocaleString()}
                            </p>
                            <span
                              className={`text-sm ${
                                order.status === 'Delivered'
                                  ? 'text-green-600'
                                  : 'text-yellow-600'
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Items:</p>
                          <ul className="list-disc list-inside text-sm">
                            {order.items.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-xl p-8">
                <h2 className="text-2xl font-serif font-bold mb-6">Wishlist</h2>
                {wishlist.length === 0 ? (
                  <p className="text-gray-600">Your wishlist is empty</p>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {wishlist.map((item) => (
                      <div
                        key={item.id}
                        className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <StockImage
                          width={500}
                          height={192}
                          keyword={item.imageKeyword || item.name.toLowerCase() + ' hair'}
                          alt={item.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="font-semibold mb-2">{item.name}</h3>
                          <p className="text-xl font-bold text-charcoal mb-4">
                            ₦{item.price.toLocaleString()}
                          </p>
                          <button
                            onClick={() => navigate(`/products/${item.id}`)}
                            className="btn-primary w-full"
                          >
                            View Product
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="bg-white rounded-xl p-8">
                <h2 className="text-2xl font-serif font-bold mb-6">Saved Addresses</h2>
                {addresses.length === 0 ? (
                  <p className="text-gray-600 mb-4">No saved addresses</p>
                ) : (
                  <div className="space-y-4 mb-6">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className="border rounded-lg p-6 flex items-start justify-between"
                      >
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold">{address.name}</h3>
                            {address.isDefault && (
                              <span className="bg-baby-blue-100 text-baby-blue-600 text-xs px-2 py-1 rounded">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-gray-700">
                            {address.address}
                            <br />
                            {address.city}, {address.state}
                          </p>
                        </div>
                        <button className="text-baby-blue-600 hover:text-baby-blue-700 text-sm">
                          Edit
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <button className="btn-secondary">Add New Address</button>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl p-8">
                <h2 className="text-2xl font-serif font-bold mb-6">Profile Settings</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block mb-2 font-medium">Full Name</label>
                    <input
                      type="text"
                      defaultValue={user.name}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">Email</label>
                    <input
                      type="email"
                      defaultValue={user.email}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full p-3 border rounded-lg"
                      placeholder="+234 800 000 0000"
                    />
                  </div>
                  <button className="btn-primary">Save Changes</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
