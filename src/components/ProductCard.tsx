import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, Check, Star, Heart } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import StockImage from './StockImage'
import { crudToasts } from '../utils/toast'

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

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const navigate = useNavigate()
  const [added, setAdded] = useState(false)
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.colors?.[0] || null
  )
  
  const isWishlisted = isInWishlist(product.id)

  const rating = product.rating || 4.5
  const reviews = product.reviews || Math.floor(Math.random() * 200) + 10
  const inStock = product.inStock !== false
  const onSale = product.onSale || false
  const displayPrice = product.price
  const originalPrice = product.originalPrice

  // Hair color variants (common hair colors)
  const hairColors: { [key: string]: string } = {
    '#1B1B1B': 'Black',
    '#3D2817': 'Dark Brown',
    '#6B4423': 'Brown',
    '#8B4513': 'Light Brown',
    '#D2691E': 'Auburn',
    '#F5DEB3': 'Blonde',
    '#FFD700': 'Golden',
    '#C0C0C0': 'Silver',
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Adding to cart:', product.name, product.price)
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      imageKeyword: product.imageKeyword,
    })
    crudToasts.addToCart(product.name)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
    
    // Navigate to cart immediately with scroll to top
    navigate('/cart', { state: { scrollToTop: true } })
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Wishlist button clicked:', product.name, 'isWishlisted:', isWishlisted)
    if (isWishlisted) {
      console.log('Removing from wishlist:', product.id)
      removeFromWishlist(product.id)
      crudToasts.wishlistRemoved(product.name)
    } else {
      console.log('Adding to wishlist:', product.id)
      addToWishlist(product)
      crudToasts.wishlistAdded(product.name)
    }
  }

  const renderStars = () => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      )
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />
      )
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      )
    }

    return stars
  }

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 h-full flex flex-col"
    >
      <div className="relative overflow-hidden">
        <Link to={`/products/${product.id}`}>
          <StockImage
            width={500}
            height={320}
            keyword={product.imageKeyword || product.name.toLowerCase() + ' hair'}
            alt={product.name}
            className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </Link>

        {/* Enhanced Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {onSale && (
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg backdrop-blur-sm">
              SALE
            </div>
          )}
          {!inStock && (
            <div className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg backdrop-blur-sm">
              OUT OF STOCK
            </div>
          )}
        </div>

        {/* Enhanced Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleWishlist}
            className={`p-3 rounded-full backdrop-blur-md shadow-lg transition-all duration-200 ${
              isWishlisted
                ? 'bg-red-500 text-white'
                : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500'
            }`}
          >
            <Heart
              className={`w-5 h-5 flex items-center justify-center ${isWishlisted ? 'fill-current' : ''}`}
            />
          </motion.button>

          <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-3 py-1.5 rounded-lg text-xs font-medium shadow-lg backdrop-blur-sm">
            {product.category}
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>

      {/* Enhanced Content Section */}
      <div className="p-6">
        <Link to={`/products/${product.id}`} className="block">
          <h3 className="text-lg font-bold text-gray-900 hover:text-gray-700 transition-colors leading-tight line-clamp-2 mb-2 min-h-[3.5rem] group-hover:text-gray-800">
            {product.name}
          </h3>
        </Link>

        {/* Enhanced Ratings */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            {renderStars()}
          </div>
          <span className="text-sm text-gray-600 font-medium">
            {rating.toFixed(1)} ({reviews})
          </span>
        </div>

        {/* Enhanced Color Variants */}
        {product.colors && product.colors.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Available Colors:</p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setSelectedColor(color)
                  }}
                  className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                    selectedColor === color
                      ? 'border-gray-900 scale-110 shadow-lg'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: color }}
                  title={hairColors[color] || color}
                />
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Pricing */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 mb-4">
          <div className="flex items-center gap-2">
            {onSale && originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₦{originalPrice.toLocaleString()}
              </span>
            )}
            <span className="text-xl font-bold text-gray-900">
              ₦{displayPrice.toLocaleString()}
            </span>
          </div>

          {onSale && (
            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-md text-xs font-semibold">
              {Math.round(((originalPrice! - displayPrice) / originalPrice!) * 100)}% OFF
            </span>
          )}
        </div>

        {/* Add to Cart Button - At Bottom */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          disabled={!inStock}
          className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 ${
            inStock
              ? 'bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:from-gray-800 hover:to-gray-700 shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              {inStock ? 'Add to Cart' : 'Out of Stock'}
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  )
}
