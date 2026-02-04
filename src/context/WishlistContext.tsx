import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Product {
  id: string
  name: string
  price: number
  image: string
  imageKeyword?: string
  category: string
  rating?: number
  reviews?: number
  colors?: string[]
  inStock?: boolean
  onSale?: boolean
  originalPrice?: number
}

interface WishlistItem extends Product {
  addedAt: Date
}

interface WishlistStore {
  items: WishlistItem[]
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
  getWishlistCount: () => number
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addToWishlist: (product) => {
        set((state) => {
          const exists = state.items.find((item) => item.id === product.id)
          if (exists) return state
          
          return {
            items: [...state.items, { ...product, addedAt: new Date() }],
          }
        })
      },
      
      removeFromWishlist: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }))
      },
      
      isInWishlist: (productId) => {
        return get().items.some((item) => item.id === productId)
      },
      
      clearWishlist: () => {
        set({ items: [] })
      },
      
      getWishlistCount: () => {
        return get().items.length
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
)
