import { useState, useEffect } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [showTooltip, setShowTooltip] = useState(false)

  const whatsappNumber = '+2348001234567'
  const businessName = 'Baby Blue'

  useEffect(() => {
    // Show tooltip after 3 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true)
    }, 3000)

    // Hide tooltip after 8 seconds
    const hideTimer = setTimeout(() => {
      setShowTooltip(false)
    }, 11000)

    return () => {
      clearTimeout(timer)
      clearTimeout(hideTimer)
    }
  }, [])

  const handleSendMessage = () => {
    if (message.trim()) {
      const encodedMessage = encodeURIComponent(message)
      window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank')
      setMessage('')
      setIsOpen(false)
    }
  }

  const handleQuickReply = (text: string) => {
    const encodedMessage = encodeURIComponent(text)
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank')
    setIsOpen(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-20 right-0 bg-white rounded-xl shadow-lg p-4 mb-2 w-64 border border-gray-100"
          >
            <p className="text-sm text-gray-700">
              👋 Hi there! Need help with your hair selection? Chat with us on WhatsApp!
            </p>
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white transform rotate-45 border-r border-b border-gray-100" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-2xl w-80 overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-green-500 p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
                  <MessageCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{businessName}</h3>
                  <p className="text-green-100 text-sm">Typically replies in minutes</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-green-600 rounded-full p-1 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Content */}
            <div className="p-4 bg-gray-50 min-h-[200px] max-h-[300px] overflow-y-auto">
              <div className="bg-white rounded-lg p-3 mb-4 shadow-sm">
                <p className="text-gray-700 text-sm">
                  Hello! 👋 Welcome to Baby Blue. How can we help you today?
                </p>
              </div>

              {/* Quick Replies */}
              <div className="space-y-2">
                <p className="text-xs text-gray-500 mb-2">Quick replies:</p>
                <button
                  onClick={() => handleQuickReply('Hi, I need help choosing the right hair texture')}
                  className="block w-full text-left bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:border-green-200 transition-colors"
                >
                  Help me choose hair texture 💁‍♀️
                </button>
                <button
                  onClick={() => handleQuickReply('I want to check my order status')}
                  className="block w-full text-left bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:border-green-200 transition-colors"
                >
                  Check order status 📦
                </button>
                <button
                  onClick={() => handleQuickReply('What are your delivery times?')}
                  className="block w-full text-left bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:border-green-200 transition-colors"
                >
                  Delivery information 🚚
                </button>
                <button
                  onClick={() => handleQuickReply('Do you have any ongoing promotions?')}
                  className="block w-full text-left bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:border-green-200 transition-colors"
                >
                  Current promotions 🎉
                </button>
              </div>
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="bg-green-500 text-white rounded-full p-2 hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`rounded-full p-4 shadow-lg transition-colors ${
          isOpen ? 'bg-gray-700 hover:bg-gray-800' : 'bg-green-500 hover:bg-green-600'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </motion.button>
    </div>
  )
}
