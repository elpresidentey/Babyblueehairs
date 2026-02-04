import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, Check, Star, Heart } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import StockImage from './StockImage'

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
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
    
    // Navigate to cart immediately with scroll to top
    navigate('/cart', { state: { scrollToTop: true } })
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isWishlisted) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
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
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="card-luxury group flex flex-col h-full"
    >
      <div className="relative overflow-hidden flex-shrink-0">
        <Link to={`/products/${product.id}`}>
          <StockImage
            width={500}
            height={320}
            keyword={product.imageKeyword || product.name.toLowerCase() + ' hair'}
            alt={product.name}
            className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {onSale && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              SALE
            </span>
          )}
          {!inStock && (
            <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              OUT OF STOCK
            </span>
          )}
        </div>

        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            onClick={handleWishlist}
            className={`p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md transition-all ${
              isWishlisted ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
            }`}
          >
            <Heart
              className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`}
            />
          </button>
          <span className="bg-baby-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-medium">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow min-h-[280px]">
        <Link to={`/products/${product.id}`} className="mb-2">
          <h3 className="text-base font-semibold text-charcoal hover:text-baby-blue-600 transition-colors leading-tight line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>

        {/* Ratings */}
        <div className="mb-3 flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {renderStars()}
          </div>
          <span className="text-xs text-gray-600">
            ({rating.toFixed(1)}) · {reviews}
          </span>
        </div>

        {/* Color Variants */}
        {product.colors && product.colors.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-gray-600 mb-1.5">Colors:</p>
            <div className="flex flex-wrap gap-1.5">
              {product.colors.map((color, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setSelectedColor(color)
                  }}
                  className={`w-7 h-7 rounded-full border-2 transition-all ${
                    selectedColor === color
                      ? 'border-dark-blue scale-110 shadow-md'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: color }}
                  title={hairColors[color] || color}
                />
              ))}
            </div>
          </div>
        )}

        {/* Price */}
        <div className="mb-4 mt-auto">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-dark-blue">
              ₦{displayPrice.toLocaleString()}
            </span>
            {originalPrice && originalPrice > displayPrice && (
              <span className="text-xs text-gray-500 line-through">
                ₦{originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* CTA Button - Fixed at bottom */}
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className={`btn-primary w-full flex items-center justify-center gap-2 text-sm py-2.5 mt-auto ${
            added ? 'bg-green-600 hover:bg-green-700' : ''
          } ${!inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added!</span>
            </>
          ) : !inStock ? (
            <>
              <span>Out of Stock</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  )
}
