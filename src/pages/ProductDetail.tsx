import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ShoppingBag, Heart, Star, ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useCRUDStore } from '../store/crudStore'
import StockImage from '../components/StockImage'

// Mock product data (same as Products page)
const productData: Record<string, any> = {
  '1': {
    id: '1',
    name: 'Silky Straight Bundle',
    price: 850000,
    image: '',
    imageKeyword: 'silky straight bundle hair',
    images: ['silky straight bundle hair', 'silky straight bundle hair'],
    category: 'Bundles',
    hairType: 'Straight',
    length: '18"',
    texture: 'Silky',
    rating: 4.8,
    reviews: 124,
    colors: ['#1B1B1B', '#3D2817', '#6B4423', '#8B4513'],
    inStock: true,
    onSale: false,
    description: 'Premium silky straight human hair bundle. 100% virgin hair, double drawn, and tangle-free. Perfect for a sleek, elegant look.',
    specifications: {
      origin: 'Brazilian',
      density: '150%',
      lifespan: '12-18 months',
      length: '18"',
      texture: 'Silky Straight',
      weight: '100g',
    },
  },
  '2': {
    id: '2',
    name: 'Body Wave Closure',
    price: 650000,
    image: '',
    imageKeyword: 'body wave closure hair',
    images: ['body wave closure hair', 'body wave closure hair'],
    category: 'Closures & Frontals',
    hairType: 'Body Wave',
    length: '14"',
    texture: 'Natural',
    rating: 4.6,
    reviews: 89,
    colors: ['#1B1B1B', '#3D2817', '#6B4423'],
    inStock: true,
    onSale: true,
    originalPrice: 750000,
    description: 'High-quality body wave closure with perfect bleach knots. Seamless blend guaranteed.',
    specifications: {
      origin: 'Brazilian',
      density: '130%',
      lifespan: '12-18 months',
      length: '4"',
      texture: 'Body Wave',
      weight: '50g',
    },
  },
  '3': {
    id: '3',
    name: 'Curly Lace Front Wig',
    price: 920000,
    image: '',
    imageKeyword: 'curly lace front wig',
    images: ['curly lace front wig', 'curly lace front wig'],
    category: 'Wigs',
    hairType: 'Curly',
    length: '20"',
    texture: 'Curly',
    rating: 4.9,
    reviews: 203,
    colors: ['#1B1B1B', '#3D2817', '#6B4423', '#8B4513', '#D2691E'],
    inStock: true,
    onSale: false,
    description: 'Premium curly lace front wig made with 100% human hair. Perfect for natural-looking curls and versatile styling.',
    specifications: {
      origin: 'Brazilian',
      density: '150%',
      lifespan: '12-18 months',
      length: '20"',
      texture: 'Curly',
      weight: '180g',
    },
  }
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  // Get product from mock data
  const product = id ? productData[id] : null

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Product not found</p>
          <button onClick={() => navigate('/products')} className="btn-primary">
            Back to Products
          </button>
        </div>
      </div>
    )
  }

  const averageRating =
    product.reviews && product.reviews.length > 0
      ? product.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) /
        product.reviews.length
      : 0

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: '',
        imageKeyword: product.imageKeyword || 'hair',
        quantity: 1
      })
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % (product.images?.length || 1))
  }

  const prevImage = () => {
    setSelectedImageIndex(
      (prev) => (prev - 1 + (product.images?.length || 1)) % (product.images?.length || 1)
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate('/products')}
          className="text-gray-600 hover:text-gray-900 mb-6 flex items-center"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Products
        </button>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-white shadow-lg">
              <StockImage
                width={800}
                height={800}
                keyword={product.images?.[selectedImageIndex] || product.imageKeyword || 'hair'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.images && product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Image Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === index ? 'border-gray-900' : 'border-gray-200'
                    }`}
                  >
                    <StockImage
                      width={64}
                      height={64}
                      keyword={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(averageRating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {averageRating.toFixed(1)} ({product.reviews?.length || 0} reviews)
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">₦{product.price.toLocaleString()}</p>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Specifications */}
            {product.specifications && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600 capitalize">{key}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <label className="text-gray-700 font-medium">Quantity:</label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-50"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2 ${
                added
                  ? 'bg-green-600 text-white'
                  : product.inStock
                  ? 'bg-gray-900 text-white hover:bg-gray-800'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5" />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </>
              )}
            </button>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Customer Reviews
            </h2>
            <div className="space-y-6">
              {product.reviews.map((review: any) => (
                <div key={review.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.name}</h4>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-600">{review.date}</span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
