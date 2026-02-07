import { useState } from 'react'
import { motion } from 'framer-motion'
import React from 'react'
import {
  Package,
  MapPin,
  CreditCard,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  RefreshCw
} from 'lucide-react'
import { useCRUDStore, type Order } from '../store/crudStore'
import { useAuth } from '../context/AuthContext'
import SEO from '../components/SEO'
import { crudToasts } from '../utils/toast'

export default function OrderHistory() {
  const { orders, updateOrder, getOrdersByCustomer } = useCRUDStore()
  const { user } = useAuth()
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [isUpdating, setIsUpdating] = useState(false)

  // Get orders for the authenticated user
  const customerOrders = user ? getOrdersByCustomer(user.id) : []
  
  // Apply status filter
  const filteredOrders = filterStatus === 'all' 
    ? customerOrders 
    : customerOrders.filter(order => order.status === filterStatus)

  const statusColors = {
    pending: 'bg-orange-100 text-orange-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  }

  const statusIcons = {
    pending: Clock,
    processing: RefreshCw,
    shipped: Truck,
    delivered: CheckCircle,
    cancelled: XCircle
  }

  const handleStatusUpdate = async (orderId: string, newStatus: Order['status']) => {
    setIsUpdating(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      updateOrder(orderId, { 
        status: newStatus,
        ...(newStatus === 'shipped' && { 
          trackingNumber: `TRK-${Date.now()}`,
          estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        })
      })
      crudToasts.orderUpdated(orderId)
    } catch (error) {
      crudToasts.genericError('Failed to update order status')
    } finally {
      setIsUpdating(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`
  }

  return (
    <>
      <SEO 
        title="Order History - Baby Blue"
        description="View and track your Baby Blue hair orders"
        keywords="order history, track order, baby blue orders"
      />
      
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-serif font-bold text-dark-blue mb-4">
              Order History
            </h1>
            <p className="text-gray-600">
              Track and manage all your Baby Blue orders
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6 mb-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Filter by status:</span>
                <div className="flex space-x-2">
                  {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        filterStatus === status
                          ? 'bg-baby-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''} found
              </div>
            </div>
          </motion.div>

          {/* Orders List */}
          <div className="space-y-6">
            {filteredOrders.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm p-12 text-center"
              >
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No orders found
                </h3>
                <p className="text-gray-600">
                  {filterStatus === 'all'
                    ? "You haven't placed any orders yet"
                    : `No orders with status "${filterStatus}"`
                  }
                </p>
                <button
                  onClick={() => window.location.href = '/products'}
                  className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Start Shopping
                </button>
              </motion.div>
            ) : (
              filteredOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <div className="p-6">
                    {/* Order Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-dark-blue">
                          Order {order.id}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Placed on {formatDate(order.orderDate)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${statusColors[order.status]}`}>
                          {React.createElement(statusIcons[order.status], { className: 'w-4 h-4' })}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 text-gray-600 hover:text-baby-blue-600 hover:bg-gray-50 rounded-lg"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-3 mb-4">
                      {order.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center justify-between py-3 border-b last:border-b-0">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                            <div>
                              <p className="font-medium text-gray-900">{item.name}</p>
                              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="font-medium text-dark-blue">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Order Footer */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{order.shippingAddress.street}, {order.shippingAddress.city}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <CreditCard className="w-4 h-4" />
                          <span>{order.paymentMethod}</span>
                        </div>
                        {order.trackingNumber && (
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Package className="w-4 h-4" />
                            <span>Tracking: {order.trackingNumber}</span>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="text-xl font-bold text-dark-blue">
                          {formatPrice(order.totalAmount)}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {order.status === 'pending' && (
                      <div className="flex justify-end space-x-3 mt-4 pt-4 border-t">
                        <button
                          onClick={() => window.location.href = `/contact?subject=Order ${order.id}`}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                          Contact Support
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                          disabled={isUpdating}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                        >
                          Cancel Order
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Order Detail Modal */}
          {selectedOrder && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedOrder(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-dark-blue">
                      Order {selectedOrder.id}
                    </h2>
                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Order Details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">Order Information</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Order Date:</span>
                          <p className="font-medium">{formatDate(selectedOrder.orderDate)}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Status:</span>
                          <p className="font-medium">{selectedOrder.status}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Payment Method:</span>
                          <p className="font-medium">{selectedOrder.paymentMethod}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Payment Status:</span>
                          <p className="font-medium">{selectedOrder.paymentStatus}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Shipping Address</h3>
                      <div className="text-sm space-y-1">
                        <p>{selectedOrder.shippingAddress.street}</p>
                        <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}</p>
                        <p>{selectedOrder.shippingAddress.postalCode}</p>
                        <p>{selectedOrder.shippingAddress.country}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Order Items</h3>
                      <div className="space-y-2">
                        {selectedOrder.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center py-2 border-b">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                            </div>
                            <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t">
                      <span className="font-semibold">Total Amount:</span>
                      <span className="text-xl font-bold text-dark-blue">
                        {formatPrice(selectedOrder.totalAmount)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}
