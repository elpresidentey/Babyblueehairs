import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ShoppingBag, Heart, Star, ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { useCart } from '../context/CartContext'
import StockImage from '../components/StockImage'

// Mock product data
const productData: Record<string, any> = {
  '1': {
    id: '1',
    name: 'Silky Straight Bundle',
    price: 850000,
    imageKeyword: 'silky straight hair',
    images: ['silky straight hair', 'silky straight hair', 'silky straight hair'],
    category: 'Bundles',
    description:
      'Premium silky straight human hair bundle. 100% virgin hair, double drawn, and tangle-free. Perfect for a sleek, elegant look.',
    specifications: {
      origin: 'Brazilian',
      density: '150%',
      lifespan: '12-18 months',
      length: '18"',
      texture: 'Silky Straight',
      weight: '100g',
    },
    inStock: true,
    reviews: [
      {
        id: 1,
        name: 'Amina Okafor',
        rating: 5,
        comment: 'Absolutely love this hair! The quality is exceptional and it blends perfectly.',
        date: '2024-01-15',
      },
      {
        id: 2,
        name: 'Chioma Adeleke',
        rating: 5,
        comment: 'Best hair I\'ve ever purchased. Worth every naira!',
        date: '2024-01-10',
      },
    ],
  },
  '2': {
    id: '2',
    name: 'Body Wave Closure',
    price: 650000,
    imageKeyword: 'body wave hair',
    images: ['body wave hair', 'body wave hair'],
    category: 'Closures & Frontals',
    description:
      'Natural body wave closure with realistic hairline. Perfect for protective styling.',
    specifications: {
      origin: 'Peruvian',
      density: '130%',
      lifespan: '10-15 months',
      length: '14"',
      texture: 'Body Wave',
      weight: '50g',
    },
    inStock: true,
    reviews: [],
  },
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

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
    product.reviews.length > 0
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
      })
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setSelectedImageIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    )
  }

  return (
    <div className="min-h-screen bg-ivory py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate('/products')}
          className="text-baby-blue-600 hover:text-baby-blue-700 mb-6 flex items-center"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Products
        </button>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-white">
              <StockImage
                width={800}
                height={800}
                keyword={product.images[selectedImageIndex] || product.imageKeyword || 'hair'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === index
                        ? 'border-baby-blue-600'
                        : 'border-transparent'
                    }`}
                  >
                    <StockImage
                      width={200}
                      height={200}
                      keyword={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <span className="text-baby-blue-600 font-medium">{product.category}</span>
            </div>
            <h1 className="text-4xl font-serif font-bold text-charcoal mb-4">
              {product.name}
            </h1>

            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(averageRating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                ({product.reviews.length} reviews)
              </span>
            </div>

            <div className="mb-6">
              <span className="text-4xl font-bold text-charcoal">
                ₦{product.price.toLocaleString()}
              </span>
            </div>

            <p className="text-gray-700 mb-8 leading-relaxed">{product.description}</p>

            {/* Specifications */}
            <div className="mb-8 p-6 bg-white rounded-xl">
              <h3 className="font-semibold mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Origin:</span>
                  <span className="ml-2 font-medium">{product.specifications.origin}</span>
                </div>
                <div>
                  <span className="text-gray-600">Density:</span>
                  <span className="ml-2 font-medium">{product.specifications.density}</span>
                </div>
                <div>
                  <span className="text-gray-600">Lifespan:</span>
                  <span className="ml-2 font-medium">{product.specifications.lifespan}</span>
                </div>
                <div>
                  <span className="text-gray-600">Length:</span>
                  <span className="ml-2 font-medium">{product.specifications.length}</span>
                </div>
                <div>
                  <span className="text-gray-600">Texture:</span>
                  <span className="ml-2 font-medium">{product.specifications.texture}</span>
                </div>
                <div>
                  <span className="text-gray-600">Weight:</span>
                  <span className="ml-2 font-medium">{product.specifications.weight}</span>
                </div>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="mb-6">
              <label className="block mb-2 font-medium">Quantity</label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border rounded-lg flex items-center justify-center"
                >
                  −
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border rounded-lg flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`btn-primary flex-1 flex items-center justify-center ${
                  added ? 'bg-green-600 hover:bg-green-700' : ''
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Add to Cart
                  </>
                )}
              </button>
              <button className="btn-secondary p-4" aria-label="Add to wishlist">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {!product.inStock && (
              <p className="text-red-600 mt-4">Out of Stock</p>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        {product.reviews.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-serif font-bold text-charcoal mb-8">
              Customer Reviews
            </h2>
            <div className="space-y-6">
              {product.reviews.map((review: any) => (
                <div key={review.id} className="bg-white rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold">{review.name}</h4>
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
