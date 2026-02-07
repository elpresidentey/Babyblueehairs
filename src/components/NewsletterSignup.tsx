import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Check, AlertCircle } from 'lucide-react'

interface NewsletterSignupProps {
  variant?: 'inline' | 'section' | 'footer'
}

export default function NewsletterSignup({ variant = 'section' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }

    setStatus('loading')
    
    // Simulate API call - replace with actual newsletter API
    setTimeout(() => {
      setStatus('success')
      setMessage('Thank you for subscribing! Check your inbox for a welcome discount.')
      setEmail('')
    }, 1500)
  }

  const content = {
    title: 'Join the Baby Blue Family',
    subtitle: 'Subscribe for exclusive offers, hair care tips, and early access to new collections.',
    placeholder: 'Enter your email address',
    buttonText: 'Subscribe',
    successMessage: 'Welcome to the family! 🎉',
    benefits: [
      '10% off your first order',
      'Early access to sales',
      'Hair care tips & tutorials',
      'New product announcements'
    ]
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={content.placeholder}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-baby-blue-600 text-sm"
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-baby-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-baby-blue-700 transition-colors disabled:opacity-50 text-sm whitespace-nowrap"
        >
          {status === 'loading' ? '...' : content.buttonText}
        </button>
      </form>
    )
  }

  if (variant === 'footer') {
    return (
      <div>
        <h4 className="font-semibold text-white mb-3">Stay Updated</h4>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={content.placeholder}
              className="flex-1 px-4 py-2 rounded-l-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-baby-blue-400 text-sm"
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-baby-blue-600 text-white px-4 py-2 rounded-r-lg font-medium hover:bg-baby-blue-700 transition-colors disabled:opacity-50"
            >
              <Mail className="w-5 h-5" />
            </button>
          </div>
          {status === 'success' && (
            <p className="text-green-400 text-sm flex items-center">
              <Check className="w-4 h-4 mr-1" />
              {message}
            </p>
          )}
          {status === 'error' && (
            <p className="text-red-400 text-sm flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {message}
            </p>
          )}
        </form>
      </div>
    )
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-r from-baby-blue-600 to-baby-blue-800 py-16 px-4"
    >
      <div className="max-w-4xl mx-auto text-center">
        <Mail className="w-12 h-12 text-white mx-auto mb-4" />
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
          {content.title}
        </h2>
        <p className="text-baby-blue-100 text-lg mb-8 max-w-2xl mx-auto">
          {content.subtitle}
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={content.placeholder}
              className="flex-1 px-6 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-white text-baby-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              {status === 'loading' ? 'Subscribing...' : content.buttonText}
            </button>
          </div>
          
          {status === 'success' && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-300 mt-3 flex items-center justify-center"
            >
              <Check className="w-5 h-5 mr-2" />
              {message}
            </motion.p>
          )}
          
          {status === 'error' && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-300 mt-3 flex items-center justify-center"
            >
              <AlertCircle className="w-5 h-5 mr-2" />
              {message}
            </motion.p>
          )}
        </form>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-baby-blue-100">
          {content.benefits.map((benefit, index) => (
            <div key={index} className="flex items-center">
              <Check className="w-4 h-4 mr-2" />
              {benefit}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
