import toast from 'react-hot-toast'

// Toast configuration
export const toastConfig = {
  position: 'top-right' as const,
  duration: 4000,
  style: {
    background: '#363636',
    color: '#fff',
    padding: '12px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
  },
  success: {
    duration: 3000,
    iconTheme: {
      primary: '#10b981',
      secondary: '#fff',
    },
  },
  error: {
    duration: 5000,
    iconTheme: {
      primary: '#ef4444',
      secondary: '#fff',
    },
  },
  loading: {
    duration: Infinity,
    iconTheme: {
      primary: '#3b82f6',
      secondary: '#fff',
    },
  },
}

// Custom toast functions
export const showToast = {
  success: (message: string) => toast.success(message, toastConfig.success),
  error: (message: string) => toast.error(message, toastConfig.error),
  loading: (message: string) => toast.loading(message, toastConfig.loading),
  info: (message: string) => toast(message, { ...toastConfig, icon: 'ℹ️' }),
  warning: (message: string) => toast(message, { ...toastConfig, icon: '⚠️' }),
}

// CRUD operation toasts
export const crudToasts = {
  productCreated: (productName: string) => 
    showToast.success(`Product "${productName}" created successfully!`),
  
  productUpdated: (productName: string) => 
    showToast.success(`Product "${productName}" updated successfully!`),
  
  productDeleted: (productName: string) => 
    showToast.warning(`Product "${productName}" deleted`),
  
  orderUpdated: (orderId: string) => 
    showToast.success(`Order ${orderId} updated successfully!`),
  
  customerUpdated: (customerName: string) => 
    showToast.success(`Customer "${customerName}" updated successfully!`),
  
  customerDeleted: (customerName: string) => 
    showToast.warning(`Customer "${customerName}" deleted`),
  
  addToCart: (productName: string) => 
    showToast.success(`${productName} added to cart!`),
  
  removeFromCart: (productName: string) => 
    showToast.warning(`${productName} removed from cart`),
  
  wishlistAdded: (productName: string) => 
    showToast.success(`${productName} added to wishlist!`),
  
  wishlistRemoved: (productName: string) => 
    showToast.warning(`${productName} removed from wishlist`),
  
  orderPlaced: (orderId: string) => 
    showToast.success(`Order ${orderId} placed successfully!`),
  
  paymentSuccess: () => 
    showToast.success('Payment processed successfully!'),
  
  paymentFailed: () => 
    showToast.error('Payment failed. Please try again.'),
  
  loginSuccess: () => 
    showToast.success('Login successful!'),
  
  loginError: () => 
    showToast.error('Login failed. Please check your credentials.'),
  
  registerSuccess: () => 
    showToast.success('Registration successful!'),
  
  registerError: () => 
    showToast.error('Registration failed. Please try again.'),
  
  profileUpdated: () => 
    showToast.success('Profile updated successfully!'),
  
  networkError: () => 
    showToast.error('Network error. Please check your connection.'),
  
  genericError: (message: string) => 
    showToast.error(message),
  
  genericSuccess: (message: string) => 
    showToast.success(message),
}
