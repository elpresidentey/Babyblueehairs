import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Package, 
  ShoppingCart, 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Download,
  Upload,
  BarChart3,
  DollarSign,
  Eye
} from 'lucide-react'
import { useCRUDStore, type Product, type Order, type Customer } from '../store/crudStore'
import SEO from '../components/SEO'
import ProductForm from '../components/ProductForm'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'customers' | 'analytics'>('products')
  const [searchTerm, setSearchTerm] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Product | Order | Customer | null>(null)
  
  const {
    products,
    orders,
    customers,
    addProduct,
    updateProduct,
    deleteProduct,
    deleteOrder,
    deleteCustomer
  } = useCRUDStore()

  // Calculate analytics
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0)
  const totalProducts = products.length
  const totalCustomers = customers.length
  const pendingOrders = orders.filter(order => order.status === 'pending').length

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleProductSubmit = (productData: any) => {
    if (editingItem && 'category' in editingItem) {
      // Update existing product
      updateProduct(editingItem.id, productData)
    } else {
      // Create new product
      addProduct(productData)
    }
    setEditingItem(null)
  }

  const handleEditProduct = (product: Product) => {
    setEditingItem(product)
  }

  const handleCreateProduct = () => {
    setEditingItem(null)
    setIsCreateModalOpen(true)
  }

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <SEO 
        title="Admin Dashboard - Baby Blue"
        description="Manage products, orders, and customers for Baby Blue hair store"
        keywords="admin dashboard, product management, order management, customer management"
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 bg-baby-blue-600 text-white rounded-lg hover:bg-baby-blue-700">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  <Upload className="w-4 h-4" />
                  <span>Import</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Total Revenue', value: `₦${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-green-500' },
              { label: 'Total Products', value: totalProducts, icon: Package, color: 'bg-blue-500' },
              { label: 'Total Customers', value: totalCustomers, icon: Users, color: 'bg-purple-500' },
              { label: 'Pending Orders', value: pendingOrders, icon: ShoppingCart, color: 'bg-orange-500' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-xl shadow-sm mb-6">
            <div className="border-b">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'products', label: 'Products', icon: Package },
                  { id: 'orders', label: 'Orders', icon: ShoppingCart },
                  { id: 'customers', label: 'Customers', icon: Users },
                  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-baby-blue-600 text-baby-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Search and Actions */}
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-blue-600 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={handleCreateProduct}
                  className="flex items-center space-x-2 px-4 py-2 bg-baby-blue-600 text-white rounded-lg hover:bg-baby-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New</span>
                </button>
              </div>

              {/* Content Area */}
              <div className="overflow-x-auto">
                {activeTab === 'products' && (
                  <ProductsTable 
                    products={filteredProducts} 
                    onEdit={handleEditProduct}
                    onDelete={deleteProduct}
                  />
                )}
                {activeTab === 'orders' && (
                  <OrdersTable 
                    orders={filteredOrders}
                    onEdit={setEditingItem}
                    onDelete={deleteOrder}
                  />
                )}
                {activeTab === 'customers' && (
                  <CustomersTable 
                    customers={filteredCustomers}
                    onEdit={setEditingItem}
                    onDelete={deleteCustomer}
                  />
                )}
                {activeTab === 'analytics' && (
                  <AnalyticsSection products={products} orders={orders} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Form Modal */}
      <ProductForm
        product={editingItem && 'category' in editingItem ? editingItem : undefined}
        isOpen={isCreateModalOpen || (editingItem !== null && 'category' in editingItem)}
        onClose={() => {
          setIsCreateModalOpen(false)
          setEditingItem(null)
        }}
        onSubmit={handleProductSubmit}
      />
    </>
  )
}

// Products Table Component
function ProductsTable({ products, onEdit, onDelete }: any) {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="text-left py-3 px-4">Product</th>
          <th className="text-left py-3 px-4">Category</th>
          <th className="text-left py-3 px-4">Price</th>
          <th className="text-left py-3 px-4">Stock</th>
          <th className="text-left py-3 px-4">Status</th>
          <th className="text-left py-3 px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product: Product) => (
          <tr key={product.id} className="border-b hover:bg-gray-50">
            <td className="py-3 px-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.hairType} • {product.length}</p>
                </div>
              </div>
            </td>
            <td className="py-3 px-4">{product.category}</td>
            <td className="py-3 px-4">₦{product.price.toLocaleString()}</td>
            <td className="py-3 px-4">
              <span className={`px-2 py-1 rounded-full text-xs ${
                product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </td>
            <td className="py-3 px-4">
              <span className={`px-2 py-1 rounded-full text-xs ${
                product.onSale ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {product.onSale ? 'On Sale' : 'Regular'}
              </span>
            </td>
            <td className="py-3 px-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onEdit(product)}
                  className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-600 hover:bg-gray-50 rounded">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// Orders Table Component
function OrdersTable({ orders, onEdit }: any) {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="text-left py-3 px-4">Order ID</th>
          <th className="text-left py-3 px-4">Customer</th>
          <th className="text-left py-3 px-4">Date</th>
          <th className="text-left py-3 px-4">Total</th>
          <th className="text-left py-3 px-4">Status</th>
          <th className="text-left py-3 px-4">Payment</th>
          <th className="text-left py-3 px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order: Order) => (
          <tr key={order.id} className="border-b hover:bg-gray-50">
            <td className="py-3 px-4 font-mono text-sm">{order.id}</td>
            <td className="py-3 px-4">{order.customerId}</td>
            <td className="py-3 px-4">{new Date(order.orderDate).toLocaleDateString()}</td>
            <td className="py-3 px-4">₦{order.totalAmount.toLocaleString()}</td>
            <td className="py-3 px-4">
              <span className={`px-2 py-1 rounded-full text-xs ${
                order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {order.status}
              </span>
            </td>
            <td className="py-3 px-4">
              <span className={`px-2 py-1 rounded-full text-xs ${
                order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>
                {order.paymentStatus}
              </span>
            </td>
            <td className="py-3 px-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onEdit(order)}
                  className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-600 hover:bg-gray-50 rounded">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// Customers Table Component
function CustomersTable({ customers, onEdit, onDelete }: any) {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="text-left py-3 px-4">Customer</th>
          <th className="text-left py-3 px-4">Email</th>
          <th className="text-left py-3 px-4">Phone</th>
          <th className="text-left py-3 px-4">Orders</th>
          <th className="text-left py-3 px-4">Total Spent</th>
          <th className="text-left py-3 px-4">Status</th>
          <th className="text-left py-3 px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer: Customer) => (
          <tr key={customer.id} className="border-b hover:bg-gray-50">
            <td className="py-3 px-4">
              <div>
                <p className="font-medium">{customer.name}</p>
                <p className="text-sm text-gray-500">Joined {new Date(customer.joinDate).toLocaleDateString()}</p>
              </div>
            </td>
            <td className="py-3 px-4">{customer.email}</td>
            <td className="py-3 px-4">{customer.phone}</td>
            <td className="py-3 px-4">{customer.totalOrders}</td>
            <td className="py-3 px-4">₦{customer.totalSpent.toLocaleString()}</td>
            <td className="py-3 px-4">
              <span className={`px-2 py-1 rounded-full text-xs ${
                customer.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {customer.isActive ? 'Active' : 'Inactive'}
              </span>
            </td>
            <td className="py-3 px-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onEdit(customer)}
                  className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(customer.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// Analytics Section Component
function AnalyticsSection({ products, orders }: any) {
  const recentOrders = orders.slice(-5).reverse()
  const topProducts = products.slice(0, 5)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
        <div className="space-y-3">
          {recentOrders.map((order: Order) => (
            <div key={order.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{order.id}</p>
                <p className="text-sm text-gray-500">{new Date(order.orderDate).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">₦{order.totalAmount.toLocaleString()}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Top Products</h3>
        <div className="space-y-3">
          {topProducts.map((product: Product) => (
            <div key={product.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-gray-500">{product.category}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">₦{product.price.toLocaleString()}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
