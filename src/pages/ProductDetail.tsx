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
    imageKeyword: 'body wave closure hair',
    images: ['body wave closure hair', 'body wave closure hair', 'body wave closure hair'],
    category: 'Closures & Frontals',
    description:
      'Premium body wave closure piece made with 100% human hair. Perfect for creating natural-looking hairlines and seamless blends.',
    specifications: {
      origin: 'Brazilian',
      density: '150%',
      lifespan: '12-18 months',
      length: '14"',
      texture: 'Body Wave',
      weight: '80g',
    },
    inStock: true,
    reviews: [
      {
        id: 1,
        name: 'Funke Akindele',
        rating: 5,
        comment: 'Perfect closure! Matches my body wave bundles perfectly.',
        date: '2024-01-20',
      },
      {
        id: 2,
        name: 'Bisi Olatunji',
        rating: 4,
        comment: 'Great quality and the wave pattern is beautiful.',
        date: '2024-01-18',
      },
    ],
  },
  '3': {
    id: '3',
    name: 'Curly Lace Front Wig',
    price: 920000,
    imageKeyword: 'curly lace front wig',
    images: ['curly lace front wig', 'curly lace front wig', 'curly lace front wig'],
    category: 'Wigs',
    description:
      'Premium curly lace front wig made with 100% human hair. Perfect for natural-looking curls and versatile styling.',
    specifications: {
      origin: 'Brazilian',
      density: '150%',
      lifespan: '12-18 months',
      length: '20"',
      texture: 'Curly',
      weight: '180g',
    },
    inStock: true,
    reviews: [
      {
        id: 1,
        name: 'Fatima Bello',
        rating: 5,
        comment: 'The curls are perfect! So natural and bouncy.',
        date: '2024-01-20',
      },
    ],
  },
  '4': {
    id: '4',
    name: 'Deep Wave Bundle',
    price: 780000,
    imageKeyword: 'deep wave bundle hair',
    images: ['deep wave bundle hair', 'deep wave bundle hair'],
    category: 'Bundles',
    description:
      'Luxurious deep wave human hair bundle. Perfect for beachy waves and voluminous styles.',
    specifications: {
      origin: 'Peruvian',
      density: '150%',
      lifespan: '12-18 months',
      length: '22"',
      texture: 'Deep Wave',
      weight: '100g',
    },
    inStock: true,
    reviews: [
      {
        id: 1,
        name: 'Aisha Lawal',
        rating: 4,
        comment: 'Great quality hair, holds waves beautifully.',
        date: '2024-01-18',
      },
    ],
  },
  '5': {
    id: '5',
    name: 'Loose Wave Frontal',
    price: 680000,
    imageKeyword: 'loose wave frontal hair',
    images: ['loose wave frontal hair', 'loose wave frontal hair'],
    category: 'Closures & Frontals',
    description:
      'High-quality loose wave frontal. Perfect for seamless blends and natural hairlines.',
    specifications: {
      origin: 'Brazilian',
      density: '130%',
      lifespan: '12-18 months',
      length: '16"',
      texture: 'Loose Wave',
      weight: '50g',
    },
    inStock: true,
    reviews: [
      {
        id: 1,
        name: 'Ngozi Eze',
        rating: 5,
        comment: 'Best frontal I have ever used!',
        date: '2024-01-12',
      },
    ],
  },
  '6': {
    id: '6',
    name: 'Straight Bob Wig',
    price: 520000,
    imageKeyword: 'straight bob wig',
    images: ['straight bob wig', 'straight bob wig'],
    category: 'Wigs',
    description:
      'Chic straight bob wig with 100% human hair. Perfect for sophisticated, professional looks.',
    specifications: {
      origin: 'Brazilian',
      density: '120%',
      lifespan: '12-18 months',
      length: '12"',
      texture: 'Silky Straight',
      weight: '120g',
    },
    inStock: true,
    reviews: [
      {
        id: 1,
        name: 'Zainab Ahmed',
        rating: 4,
        comment: 'Perfect bob cut! Looks so professional.',
        date: '2024-01-25',
      },
    ],
  },
  '7': {
    id: '7',
    name: 'Kinky Curly Bundle',
    price: 890000,
    imageKeyword: 'kinky curly bundle hair',
    images: ['kinky curly bundle hair', 'kinky curly bundle hair'],
    category: 'Bundles',
    description: 'Authentic kinky curly human hair bundle. Perfect for natural texture and volume.',
    specifications: {
      origin: 'African',
      density: '150%',
      lifespan: '12-18 months',
      length: '16"',
      texture: 'Kinky Curly',
      weight: '100g',
    },
    inStock: true,
    reviews: [],
  },
  '8': {
    id: '8',
    name: 'HD Lace Closure',
    price: 420000,
    imageKeyword: 'hd lace closure hair',
    images: ['hd lace closure hair', 'hd lace closure hair'],
    category: 'Closures & Frontals',
    description: 'Invisible HD lace closure with perfect bleach knots. Seamless blend guaranteed.',
    specifications: {
      origin: 'Chinese',
      density: '130%',
      lifespan: '10-15 months',
      length: '4"',
      texture: 'Natural Straight',
      weight: '50g',
    },
    inStock: true,
    reviews: [],
  },
  '9': {
    id: '9',
    name: 'Water Wave Bundle',
    price: 750000,
    imageKeyword: 'water wave bundle hair',
    images: ['water wave bundle hair', 'water wave bundle hair'],
    category: 'Bundles',
    description: 'Beautiful water wave human hair bundle. Soft waves with natural movement.',
    specifications: {
      origin: 'Cambodian',
      density: '150%',
      lifespan: '12-18 months',
      length: '18"',
      texture: 'Water Wave',
      weight: '100g',
    },
    inStock: true,
    reviews: [],
  },
  '10': {
    id: '10',
    name: '360 Lace Frontal',
    price: 880000,
    imageKeyword: '360 lace frontal hair',
    images: ['360 lace frontal hair', '360 lace frontal hair'],
    category: 'Closures & Frontals',
    description: 'Premium 360 lace frontal for full head protection. Versatile styling options.',
    specifications: {
      origin: 'Brazilian',
      density: '150%',
      lifespan: '12-18 months',
      length: '18"',
      texture: 'Body Wave',
      weight: '80g',
    },
    inStock: true,
    reviews: [],
  },
  '11': {
    id: '11',
    name: 'Bone Straight Bundle',
    price: 920000,
    imageKeyword: 'bone straight bundle hair',
    images: ['bone straight bundle hair', 'bone straight bundle hair'],
    category: 'Bundles',
    description: 'Premium bone straight human hair. Sleek and smooth texture.',
    specifications: {
      origin: 'Vietnamese',
      density: '150%',
      lifespan: '12-18 months',
      length: '20"',
      texture: 'Bone Straight',
      weight: '100g',
    },
    inStock: true,
    reviews: [],
  },
  '12': {
    id: '12',
    name: 'Colored Bundle',
    price: 680000,
    imageKeyword: 'colored bundle hair',
    images: ['colored bundle hair', 'colored bundle hair'],
    category: 'Bundles',
    description: 'Vibrant colored human hair bundle. Pre-colored and ready to install.',
    specifications: {
      origin: 'Chinese',
      density: '150%',
      lifespan: '12-18 months',
      length: '16"',
      texture: 'Silky Straight',
      weight: '100g',
    },
    inStock: true,
    reviews: [],
  },
  '13': {
    id: '13',
    name: 'Short Curly Wig',
    price: 450000,
    imageKeyword: 'short curly wig',
    images: ['short curly wig', 'short curly wig'],
    category: 'Wigs',
    description: 'Cute short curly wig with natural curls. Easy to maintain and style.',
    specifications: {
      origin: 'Brazilian',
      density: '120%',
      lifespan: '12-18 months',
      length: '8"',
      texture: 'Curly',
      weight: '120g',
    },
    inStock: true,
    reviews: [],
  },
  '14': {
    id: '14',
    name: 'U-Part Wig',
    price: 580000,
    imageKeyword: 'u part wig',
    images: ['u part wig', 'u part wig'],
    category: 'Wigs',
    description: 'Versatile U-part wig with leave-out. Perfect for natural blends.',
    specifications: {
      origin: 'Peruvian',
      density: '130%',
      lifespan: '12-18 months',
      length: '14"',
      texture: 'Body Wave',
      weight: '140g',
    },
    inStock: true,
    reviews: [],
  },
  '15': {
    id: '15',
    name: 'Clip-In Extensions',
    price: 350000,
    imageKeyword: 'clip in extensions hair',
    images: ['clip in extensions hair', 'clip in extensions hair'],
    category: 'Extensions',
    description: 'Easy to install clip-in extensions. Temporary length and volume.',
    specifications: {
      origin: 'Chinese',
      density: '120%',
      lifespan: '6-12 months',
      length: '14"',
      texture: 'Silky Straight',
      weight: '80g',
    },
    inStock: true,
    reviews: [],
  },
  '16': {
    id: '16',
    name: 'Tape-In Extensions',
    price: 380000,
    imageKeyword: 'tape in extensions hair',
    images: ['tape in extensions hair', 'tape in extensions hair'],
    category: 'Extensions',
    description: 'Professional tape-in extensions. Seamless and long-lasting hold.',
    specifications: {
      origin: 'Malaysian',
      density: '130%',
      lifespan: '6-12 months',
      length: '16"',
      texture: 'Body Wave',
      weight: '100g',
    },
    inStock: true,
    reviews: [],
  },
  '17': {
    id: '17',
    name: 'Fusion Extensions',
    price: 420000,
    imageKeyword: 'fusion extensions hair',
    images: ['fusion extensions hair', 'fusion extensions hair'],
    category: 'Extensions',
    description: 'Keratin tip fusion extensions. Natural movement and durable bond.',
    specifications: {
      origin: 'Indian',
      density: '140%',
      lifespan: '3-6 months',
      length: '18"',
      texture: 'Natural Wave',
      weight: '100g',
    },
    inStock: true,
    reviews: [],
  },
  '18': {
    id: '18',
    name: 'Micro Link Extensions',
    price: 480000,
    imageKeyword: 'micro link extensions hair',
    images: ['micro link extensions hair', 'micro link extensions hair'],
    category: 'Extensions',
    description: 'Micro bead link extensions. Gentle on natural hair and secure hold.',
    specifications: {
      origin: 'Brazilian',
      density: '130%',
      lifespan: '4-8 months',
      length: '14"',
      texture: 'Silky Straight',
      weight: '80g',
    },
    inStock: true,
    reviews: [],
  },
  '19': {
    id: '19',
    name: 'Raw Virgin Bundle',
    price: 980000,
    imageKeyword: 'raw virgin bundle hair',
    images: ['raw virgin bundle hair', 'raw virgin bundle hair'],
    category: 'Bundles',
    description: '100% raw virgin human hair. Unprocessed and completely natural.',
    specifications: {
      origin: 'Cambodian',
      density: '150%',
      lifespan: '18-24 months',
      length: '22"',
      texture: 'Natural Straight',
      weight: '100g',
    },
    inStock: true,
    reviews: [],
  },
  '20': {
    id: '20',
    name: 'Blonde Bundle',
    price: 850000,
    imageKeyword: 'blonde bundle hair',
    images: ['blonde bundle hair', 'blonde bundle hair'],
    category: 'Bundles',
    description: 'Premium blonde human hair bundle. Multiple shades available.',
    specifications: {
      origin: 'European',
      density: '150%',
      lifespan: '12-18 months',
      length: '18"',
      texture: 'Silky Straight',
      weight: '100g',
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
