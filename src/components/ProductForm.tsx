import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { Product } from '../store/crudStore'

interface ProductFormProps {
  product?: Product
  isOpen: boolean
  onClose: () => void
  onSubmit: (product: any) => void
}

export default function ProductForm({ product, isOpen, onClose, onSubmit }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    imageKeyword: '',
    category: 'Bundles',
    hairType: 'Brazilian',
    length: '18"',
    texture: 'Straight',
    rating: 5,
    reviews: 0,
    colors: ['Natural Black'],
    inStock: true,
    onSale: false,
    description: '',
    specifications: {} as Record<string, any>,
    images: [] as string[],
  })

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        imageKeyword: product.imageKeyword,
        category: product.category,
        hairType: product.hairType,
        length: product.length,
        texture: product.texture,
        rating: product.rating,
        reviews: product.reviews,
        colors: product.colors,
        inStock: product.inStock,
        onSale: product.onSale,
        description: product.description || '',
        specifications: product.specifications || {},
        images: product.images || [],
      })
    }
  }, [product])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : 
               type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const addColor = () => {
    const newColor = prompt('Enter color name:')
    if (newColor && !formData.colors.includes(newColor)) {
      setFormData(prev => ({
        ...prev,
        colors: [...prev.colors, newColor]
      }))
    }
  }

  const removeColor = (colorToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter(color => color !== colorToRemove)
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-blue-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Price (₦) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-blue-600 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-blue-600 focus:border-transparent"
              >
                <option value="Bundles">Bundles</option>
                <option value="Wigs">Wigs</option>
                <option value="Closures">Closures</option>
                <option value="Frontals">Frontals</option>
                <option value="Extensions">Extensions</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Hair Type</label>
              <select
                name="hairType"
                value={formData.hairType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-blue-600 focus:border-transparent"
              >
                <option value="Brazilian">Brazilian</option>
                <option value="Peruvian">Peruvian</option>
                <option value="Malaysian">Malaysian</option>
                <option value="Indian">Indian</option>
                <option value="Cambodian">Cambodian</option>
                <option value="Eurasian">Eurasian</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Length</label>
              <select
                name="length"
                value={formData.length}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-blue-600 focus:border-transparent"
              >
                <option value="12&quot;">12"</option>
                <option value="14&quot;">14"</option>
                <option value="16&quot;">16"</option>
                <option value="18&quot;">18"</option>
                <option value="20&quot;">20"</option>
                <option value="22&quot;">22"</option>
                <option value="24&quot;">24"</option>
                <option value="26&quot;">26"</option>
                <option value="28&quot;">28"</option>
                <option value="30&quot;">30"</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Texture</label>
              <select
                name="texture"
                value={formData.texture}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-blue-600 focus:border-transparent"
              >
                <option value="Straight">Straight</option>
                <option value="Body Wave">Body Wave</option>
                <option value="Loose Wave">Loose Wave</option>
                <option value="Deep Wave">Deep Wave</option>
                <option value="Water Wave">Water Wave</option>
                <option value="Curly">Curly</option>
                <option value="Kinky Curly">Kinky Curly</option>
                <option value="Kinky Straight">Kinky Straight</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Image Keyword</label>
              <input
                type="text"
                name="imageKeyword"
                value={formData.imageKeyword}
                onChange={handleChange}
                placeholder="e.g., brazilian straight hair"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-blue-600 focus:border-transparent"
              />
            </div>
          </div>

          {/* Colors */}
          <div>
            <label className="block text-sm font-medium mb-2">Available Colors</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.colors.map((color) => (
                <span
                  key={color}
                  className="px-3 py-1 bg-baby-blue-100 text-baby-blue-700 rounded-full text-sm flex items-center gap-1"
                >
                  {color}
                  <button
                    type="button"
                    onClick={() => removeColor(color)}
                    className="text-baby-blue-500 hover:text-baby-blue-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={addColor}
              className="px-3 py-1 border border-baby-blue-600 text-baby-blue-600 rounded-lg text-sm hover:bg-baby-blue-50"
            >
              + Add Color
            </button>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Enter product description..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-blue-600 focus:border-transparent"
            />
          </div>

          {/* Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="inStock"
                checked={formData.inStock}
                onChange={handleChange}
                className="w-4 h-4 text-baby-blue-600 border-gray-300 rounded focus:ring-baby-blue-600"
              />
              <label className="text-sm font-medium">In Stock</label>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="onSale"
                checked={formData.onSale}
                onChange={handleChange}
                className="w-4 h-4 text-baby-blue-600 border-gray-300 rounded focus:ring-baby-blue-600"
              />
              <label className="text-sm font-medium">On Sale</label>
            </div>
          </div>

          {/* Rating */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              <select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-blue-600 focus:border-transparent"
              >
                <option value={1}>1 Star</option>
                <option value={2}>2 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={5}>5 Stars</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Number of Reviews</label>
              <input
                type="number"
                name="reviews"
                value={formData.reviews}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-blue-600 focus:border-transparent"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-baby-blue-600 text-white rounded-lg hover:bg-baby-blue-700"
            >
              {product ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
