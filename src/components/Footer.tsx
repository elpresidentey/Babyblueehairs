import { Link } from 'react-router-dom'
import { Instagram, Facebook, Twitter, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white text-dark-blue mt-auto border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4 text-dark-blue">Baby Blue</h3>
            <p className="text-gray-600 text-sm">
              Luxury Nigerian hair brand for the modern, elegant woman.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-dark-blue">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/products" className="hover:text-dark-blue transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-dark-blue transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-dark-blue transition-colors">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4 text-dark-blue">Customer Service</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/contact" className="hover:text-dark-blue transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-dark-blue transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-dark-blue transition-colors">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-dark-blue">Get in Touch</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>hello@babyblue.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+234 800 000 0000</span>
              </div>
            </div>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-dark-blue transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-dark-blue transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-dark-blue transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Baby Blue. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
