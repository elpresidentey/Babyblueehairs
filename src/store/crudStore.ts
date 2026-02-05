import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Product {
  id: string
  name: string
  price: number
  imageKeyword: string
  category: string
  hairType: string
  length: string
  texture: string
  rating: number
  reviews: number
  colors: string[]
  inStock: boolean
  onSale: boolean
  description?: string
  specifications?: Record<string, any>
  images?: string[]
  createdAt: string
  updatedAt: string
}

export interface Order {
  id: string
  customerId: string
  items: {
    productId: string
    quantity: number
    price: number
    name: string
    imageKeyword: string
  }[]
  totalAmount: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress: {
    street: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  paymentMethod: string
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  orderDate: string
  estimatedDelivery?: string
  trackingNumber?: string
  notes?: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: {
    street: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  joinDate: string
  totalOrders: number
  totalSpent: number
  lastOrderDate?: string
  isActive: boolean
  preferences: {
    hairType?: string
    preferredLength?: string
    favoriteCategories: string[]
  }
}

interface CRUDStore {
  // Products
  products: Product[]
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateProduct: (id: string, updates: Partial<Product>) => void
  deleteProduct: (id: string) => void
  getProduct: (id: string) => Product | undefined
  
  // Orders
  orders: Order[]
  addOrder: (order: Omit<Order, 'id' | 'orderDate'>) => void
  updateOrder: (id: string, updates: Partial<Order>) => void
  deleteOrder: (id: string) => void
  getOrder: (id: string) => Order | undefined
  getOrdersByCustomer: (customerId: string) => Order[]
  
  // Customers
  customers: Customer[]
  addCustomer: (customer: Omit<Customer, 'id' | 'joinDate' | 'totalOrders' | 'totalSpent'>) => void
  updateCustomer: (id: string, updates: Partial<Customer>) => void
  deleteCustomer: (id: string) => void
  getCustomer: (id: string) => Customer | undefined
  getCustomerByEmail: (email: string) => Customer | undefined
}

export const useCRUDStore = create<CRUDStore>()(
  persist(
    (set, get) => ({
      // Products
      products: [],
      addProduct: (productData) => {
        const newProduct: Product = {
          ...productData,
          id: `product-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        set((state) => ({
          products: [...state.products, newProduct]
        }))
      },
      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id
              ? { ...product, ...updates, updatedAt: new Date().toISOString() }
              : product
          )
        }))
      },
      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((product) => product.id !== id)
        }))
      },
      getProduct: (id) => {
        return get().products.find((product) => product.id === id)
      },
      
      // Orders
      orders: [],
      addOrder: (orderData) => {
        const newOrder: Order = {
          ...orderData,
          id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          orderDate: new Date().toISOString(),
        }
        set((state) => ({
          orders: [...state.orders, newOrder]
        }))
      },
      updateOrder: (id, updates) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id ? { ...order, ...updates } : order
          )
        }))
      },
      deleteOrder: (id) => {
        set((state) => ({
          orders: state.orders.filter((order) => order.id !== id)
        }))
      },
      getOrder: (id) => {
        return get().orders.find((order) => order.id === id)
      },
      getOrdersByCustomer: (customerId) => {
        return get().orders.filter((order) => order.customerId === customerId)
      },
      
      // Customers
      customers: [],
      addCustomer: (customerData) => {
        const newCustomer: Customer = {
          ...customerData,
          id: `customer-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          joinDate: new Date().toISOString(),
          totalOrders: 0,
          totalSpent: 0,
        }
        set((state) => ({
          customers: [...state.customers, newCustomer]
        }))
      },
      updateCustomer: (id, updates) => {
        set((state) => ({
          customers: state.customers.map((customer) =>
            customer.id === id ? { ...customer, ...updates } : customer
          )
        }))
      },
      deleteCustomer: (id) => {
        set((state) => ({
          customers: state.customers.filter((customer) => customer.id !== id)
        }))
      },
      getCustomer: (id) => {
        return get().customers.find((customer) => customer.id === id)
      },
      getCustomerByEmail: (email) => {
        return get().customers.find((customer) => customer.email === email)
      },
    }),
    {
      name: 'crud-storage',
    }
  )
)
