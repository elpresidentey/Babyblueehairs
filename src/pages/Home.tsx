import React from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useTransform, useSpring, useAnimation } from 'framer-motion'
import { ArrowRight, Sparkles, Shield, Truck, Users, Star } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import NewsletterSignup from '../components/NewsletterSignup'

// Enhanced product data with more details
const featuredProducts = [
  {
    id: '1',
    name: 'Silky Straight Bundle',
    price: 850000,
    image: '',
    imageKeyword: 'silky straight hair',
    category: 'Bundles',
    hairType: 'Straight',
    length: '18"',
    texture: 'Silky',
    rating: 4.8,
    reviews: 124,
    colors: ['#1B1B1B', '#3D2817', '#6B4423'],
    inStock: true,
    onSale: false,
    description: 'Premium 100% human hair with natural silky texture',
    features: ['Tangle-free', 'Long-lasting', 'Natural shine']
  },
  {
    id: '2',
    name: 'Body Wave Closure',
    price: 650000,
    image: '',
    imageKeyword: 'body wave closure hair',
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
    description: 'Perfect body wave pattern for natural look',
    features: ['HD lace', 'Breathable', 'Easy install']
  },
  {
    id: '3',
    name: 'Curly Lace Front Wig',
    price: 920000,
    image: '',
    imageKeyword: 'curly lace front wig',
    category: 'Wigs',
    hairType: 'Curly',
    length: '20"',
    texture: 'Curly',
    rating: 4.9,
    reviews: 203,
    colors: ['#1B1B1B', '#3D2817', '#6B4423', '#8B4513', '#D2691E'],
    inStock: true,
    onSale: false,
    description: 'Premium curly lace front wig for versatile styling',
    features: ['100% human hair', 'Lace front', 'Adjustable straps']
  }
]

const testimonials = [
  {
    name: 'Amina Okafor',
    text: 'The quality is absolutely incredible. Best hair I\'ve ever purchased!',
    rating: 5,
    location: 'Lagos, Nigeria'
  },
  {
    name: 'Chioma Adeleke',
    text: 'Fast shipping and hair looks exactly like the pictures. Highly recommend!',
    rating: 5,
    location: 'Abuja, Nigeria'
  },
  {
    name: 'Fatima Bello',
    text: 'Premium quality that lasts. Worth every naira spent.',
    rating: 5,
    location: 'Port Harcourt, Nigeria'
  }
]

const benefits = [
  {
    icon: Shield,
    title: 'Premium Quality',
    description: '100% human hair with exceptional quality and durability'
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Swift and secure delivery across Nigeria'
  },
  {
    icon: Users,
    title: 'Expert Support',
    description: 'Personalized styling advice and customer care'
  }
]

export default function Home() {
  // Enhanced anti-gravity physics animations inspired by Google Antigravity
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Transform mouse position into dramatic parallax effects
  const x = useTransform(mouseX, [0, window.innerWidth], [-30, 30])
  const y = useTransform(mouseY, [0, window.innerHeight], [-30, 30])

  // Spring physics for smooth, weightless animations
  const springX = useSpring(x, { stiffness: 150, damping: 20 })
  const springY = useSpring(y, { stiffness: 150, damping: 20 })

  // Magnetic button effect with stronger pull
  const buttonControls = useAnimation()

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
  }

  // Debug logging for animations
  React.useEffect(() => {
    console.log('🚀 Anti-Gravity Animations Loaded!')
    console.log('Move your mouse around to see parallax effects!')
    console.log('Watch the floating particles and magnetic fields!')
  }, [])

  const handleButtonHover = () => {
    buttonControls.start({
      scale: 1.05,
      rotate: [0, -2, 2, -1, 1, 0],
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 400,
        damping: 15
      }
    })
  }

  const handleButtonLeave = () => {
    buttonControls.start({
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    })
  }

  return (
    <div className="w-full" onMouseMove={handleMouseMove}>
      {/* Enhanced Hero Section - Google Antigravity-Inspired Physics */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white py-20">
        {/* Enhanced Animated Background Elements - Anti-Gravity Field */}
        <motion.div
          className="absolute inset-0"
          style={{ x: springX, y: springY }}
        >
          {/* Floating geometric shapes with anti-gravity physics */}
          <motion.div
            className="absolute top-20 left-20 w-40 h-40 bg-gray-200 rounded-full opacity-40"
            animate={{
              y: [0, -80, 0],
              rotate: [0, 360, 720],
              scale: [1, 1.3, 0.8, 1],
              x: [0, 40, -20, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              type: "spring",
              stiffness: 50,
              damping: 10
            }}
          />
          <motion.div
            className="absolute top-40 right-32 w-32 h-32 bg-gray-300 rounded-2xl opacity-50"
            animate={{
              y: [0, 60, -30, 0],
              rotate: [0, -180, 180, 0],
              x: [0, -30, 20, 0],
              scale: [0.8, 1.2, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
              type: "spring",
              stiffness: 40,
              damping: 15
            }}
          />
          <motion.div
            className="absolute bottom-32 left-1/4 w-28 h-28 bg-gray-200 rounded-full opacity-45"
            animate={{
              y: [0, -100, 50, 0],
              x: [0, -40, 30, 0],
              scale: [1, 0.7, 1.1, 1],
              rotate: [0, 180, -180, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
              type: "spring",
              stiffness: 30,
              damping: 20
            }}
          />

          {/* Additional anti-gravity orbs */}
          <motion.div
            className="absolute top-1/2 right-1/4 w-24 h-24 bg-gray-400 rounded-full opacity-35"
            animate={{
              y: [0, 120, -60, 0],
              rotate: [0, 720, 0],
              scale: [0.6, 1.4, 0.9, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
              delay: 0.5,
              type: "spring",
              stiffness: 25,
              damping: 12
            }}
          />

          {/* Google Antigravity-style exact grainy particles with multiple colors and hover interaction */}
          {/* Primary grainy particles - multiple colors with hover reaction */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => {
            const colors = ['bg-gray-900', 'bg-gray-800', 'bg-gray-700', 'bg-gray-600', 'bg-blue-900', 'bg-blue-800', 'bg-purple-900', 'bg-purple-800'];
            const colorClass = colors[i % colors.length];
            return (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 ${colorClass} rounded-full cursor-pointer`}
                style={{
                  left: `${5 + (i * 6)}%`,
                  top: `${10 + (i * 3)}%`,
                  opacity: Math.random() * 0.4 + 0.1
                }}
                animate={{
                  y: [0, -80 + (i * 8), 0],
                  x: [0, (i % 2 === 0 ? 20 : -20) + (i * 2), 0],
                  opacity: [0.1, 0.5, 0.1],
                  scale: [0.8, 1.3, 0.8],
                }}
                whileHover={{
                  scale: 3,
                  opacity: 1,
                  rotate: 180,
                  transition: {
                    duration: 0.3,
                    type: "spring",
                    stiffness: 400,
                    damping: 10
                  }
                }}
                transition={{
                  duration: 8 + (i * 0.6),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                  type: "spring",
                  stiffness: 80 + (i * 3),
                  damping: 20
                }}
              />
            );
          })}

          {/* Secondary grainy particles - different color palette with hover reaction */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map((i) => {
            const colors = ['bg-gray-700', 'bg-gray-600', 'bg-gray-500', 'bg-blue-700', 'bg-blue-600', 'bg-purple-700', 'bg-purple-600', 'bg-indigo-800', 'bg-indigo-700'];
            const colorClass = colors[i % colors.length];
            return (
              <motion.div
                key={`grain-${i}`}
                className={`absolute w-0.5 h-0.5 ${colorClass} rounded-full cursor-pointer`}
                style={{
                  left: `${3 + (i * 4.5)}%`,
                  top: `${15 + (i * 2.5)}%`,
                  opacity: Math.random() * 0.3 + 0.05
                }}
                animate={{
                  y: [0, -60 + (i * 6), 0],
                  x: [0, (i % 2 === 0 ? 15 : -15) + (i * 1.5), 0],
                  opacity: [0.05, 0.3, 0.05],
                  scale: [0.7, 1.4, 0.7],
                }}
                whileHover={{
                  scale: 4,
                  opacity: 1,
                  rotate: -180,
                  transition: {
                    duration: 0.25,
                    type: "spring",
                    stiffness: 500,
                    damping: 8
                  }
                }}
                transition={{
                  duration: 6 + (i * 0.4),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.15,
                  type: "spring",
                  stiffness: 100 + (i * 2),
                  damping: 25
                }}
              />
            );
          })}

          {/* Micro grainy particles - accent colors with hover reaction */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map((i) => {
            const colors = ['bg-gray-600', 'bg-gray-500', 'bg-blue-600', 'bg-purple-600', 'bg-indigo-600', 'bg-cyan-700', 'bg-cyan-600', 'bg-teal-700'];
            const colorClass = colors[i % colors.length];
            return (
              <motion.div
                key={`micro-${i}`}
                className={`absolute w-0.5 h-0.5 ${colorClass} rounded-full cursor-pointer`}
                style={{
                  left: `${2 + (i * 3.8)}%`,
                  top: `${5 + (i * 2)}%`,
                  opacity: Math.random() * 0.25 + 0.02
                }}
                animate={{
                  y: [0, -40 + (i * 4), 0],
                  x: [0, (i % 2 === 0 ? 10 : -10) + (i), 0],
                  opacity: [0.02, 0.25, 0.02],
                  scale: [0.6, 1.5, 0.6],
                }}
                whileHover={{
                  scale: 5,
                  opacity: 1,
                  rotate: 360,
                  transition: {
                    duration: 0.2,
                    type: "spring",
                    stiffness: 600,
                    damping: 5
                  }
                }}
                transition={{
                  duration: 4 + (i * 0.3),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.1,
                  type: "spring",
                  stiffness: 120 + (i * 1.5),
                  damping: 30
                }}
              />
            );
          })}

          {/* Ultra-fine accent particles - bright colors with hover reaction */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => {
            const colors = ['bg-blue-500', 'bg-purple-500', 'bg-indigo-500', 'bg-cyan-500', 'bg-teal-500', 'bg-gray-400'];
            const colorClass = colors[i % colors.length];
            return (
              <motion.div
                key={`accent-${i}`}
                className={`absolute w-0.5 h-0.5 ${colorClass} rounded-full cursor-pointer`}
                style={{
                  left: `${1 + (i * 5.5)}%`,
                  top: `${8 + (i * 3.5)}%`,
                  opacity: Math.random() * 0.2 + 0.01
                }}
                animate={{
                  y: [0, -30 + (i * 3), 0],
                  x: [0, (i % 2 === 0 ? 8 : -8) + (i * 0.8), 0],
                  opacity: [0.01, 0.2, 0.01],
                  scale: [0.5, 1.6, 0.5],
                }}
                whileHover={{
                  scale: 6,
                  opacity: 1,
                  rotate: -360,
                  boxShadow: "0 0 20px rgba(0,0,0,0.3)",
                  transition: {
                    duration: 0.15,
                    type: "spring",
                    stiffness: 700,
                    damping: 3
                  }
                }}
                transition={{
                  duration: 3 + (i * 0.2),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.08,
                  type: "spring",
                  stiffness: 140 + (i * 1),
                  damping: 35
                }}
              />
            );
          })}

          {/* Interactive hover zone particles - larger, more reactive */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
            const colors = ['bg-blue-400', 'bg-purple-400', 'bg-indigo-400', 'bg-cyan-400', 'bg-teal-400'];
            const colorClass = colors[i % colors.length];
            return (
              <motion.div
                key={`hover-${i}`}
                className={`absolute w-2 h-2 ${colorClass} rounded-full cursor-pointer`}
                style={{
                  left: `${10 + (i * 8)}%`,
                  top: `${20 + (i * 6)}%`,
                  opacity: Math.random() * 0.3 + 0.1
                }}
                animate={{
                  y: [0, -50 + (i * 5), 0],
                  x: [0, (i % 2 === 0 ? 25 : -25) + (i * 2), 0],
                  opacity: [0.1, 0.4, 0.1],
                  scale: [0.9, 1.2, 0.9],
                }}
                whileHover={{
                  scale: 8,
                  opacity: 1,
                  rotate: 720,
                  boxShadow: "0 0 30px rgba(0,0,0,0.4)",
                  transition: {
                    duration: 0.1,
                    type: "spring",
                    stiffness: 800,
                    damping: 2
                  }
                }}
                transition={{
                  duration: 5 + (i * 0.3),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.25,
                  type: "spring",
                  stiffness: 90 + (i * 2),
                  damping: 20
                }}
              />
            );
          })}

          {/* Interactive Magnetic Fields - Enhanced */}
          <motion.div
            className="absolute top-1/3 left-1/3 w-60 h-60 border-2 border-gray-300 rounded-full opacity-30"
            animate={{
              scale: [1, 1.5, 0.8, 1.2, 1],
              opacity: [0.1, 0.4, 0.2, 0.3, 0.1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              type: "spring",
              stiffness: 40,
              damping: 20
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/3 w-48 h-48 border-2 border-gray-400 rounded-full opacity-25"
            animate={{
              scale: [1.5, 0.8, 1.3, 1],
              opacity: [0.3, 0.1, 0.4, 0.2],
              rotate: [0, -180, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
              type: "spring",
              stiffness: 35,
              damping: 25
            }}
          />

          {/* Energy waves */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`wave-${i}`}
              className="absolute top-1/2 left-1/2 w-96 h-96 border border-gray-300 rounded-full opacity-10"
              animate={{
                scale: [1, 2, 3],
                opacity: [0.3, 0.1, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 2
              }}
              style={{
                transform: 'translate(-50%, -50%)'
              }}
            />
          ))}
        </motion.div>

        <div className="absolute inset-0">
          {/* Enhanced multi-color grainy texture overlay */}
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `
                url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0.2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E"),
                url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='colorNoise'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.9' numOctaves='2' seed='5'/%3E%3CfeColorMatrix values='0 0 0 0 0.1 0 0 0 0 0.2 0 0 0 0 0.3 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23colorNoise)' opacity='0.08'/%3E%3C/svg%3E")
              `,
              backgroundSize: '200px 200px, 100px 100px',
              backgroundRepeat: 'repeat, repeat',
              backgroundBlendMode: 'multiply, screen'
            }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-50/5 via-purple-50/3 to-cyan-50/5"
            animate={{
              opacity: [0.02, 0.12, 0.02],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-7xl mx-auto w-full">
          {/* Animated Badge with anti-gravity effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            transition={{
              duration: 1.2,
              type: "spring",
              stiffness: 150,
              damping: 15,
              delay: 0.1
            }}
            className="mb-6"
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200 mb-6"
              whileHover={{
                scale: 1.1,
                y: -5,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                borderColor: "rgba(0,0,0,0.2)"
              }}
              transition={{ 
                duration: 0.4,
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Sparkles className="w-5 h-5 text-gray-600" />
              </motion.div>
              <span className="text-sm font-medium text-gray-700 tracking-widest uppercase">Premium Nigerian Hair</span>
            </motion.div>
          </motion.div>

          {/* Main Heading with enhanced anti-gravity animation */}
          <motion.h1
            initial={{ opacity: 0, y: 100, scale: 0.5, rotate: -5 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            transition={{
              duration: 1.8,
              type: "spring",
              stiffness: 80,
              damping: 12,
              delay: 0.2
            }}
            className="text-6xl md:text-8xl font-bold text-gray-900 mb-4 leading-tight tracking-tight"
          >
            <motion.span
              className="block"
              animate={{
                textShadow: [
                  "0 0 20px rgba(0,0,0,0.1)",
                  "0 0 30px rgba(0,0,0,0.15)",
                  "0 0 25px rgba(0,0,0,0.1)",
                  "0 0 20px rgba(0,0,0,0.1)"
                ],
                y: [0, -5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Luxury Hair Collection
            </motion.span>
            <motion.span
              className="block text-3xl md:text-4xl text-gray-600 font-normal mt-2 leading-snug"
              initial={{ opacity: 0, x: -50, rotate: -2 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.8,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
            >
              For the Modern Nigerian Woman
            </motion.span>
          </motion.h1>

          {/* Description with enhanced magnetic effect */}
          <motion.p
            initial={{ opacity: 0, y: 60, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 1.4,
              delay: 0.6,
              type: "spring",
              stiffness: 90,
              damping: 18
            }}
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            Discover our premium collection of luxury hair products crafted with excellence and designed for your unique style.
          </motion.p>

          {/* Interactive Buttons with enhanced anti-gravity physics */}
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.7 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 1.6,
              delay: 0.8,
              type: "spring",
              stiffness: 70,
              damping: 20
            }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.div
              animate={buttonControls}
              onHoverStart={handleButtonHover}
              onHoverEnd={handleButtonLeave}
              whileHover={{
                y: -12,
                scale: 1.05,
                boxShadow: "0 30px 60px rgba(0,0,0,0.2)",
                transition: {
                  duration: 0.4,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }
              }}
              whileTap={{
                scale: 0.92,
                rotate: [0, -2, 2, 0],
                transition: { duration: 0.2 }
              }}
            >
              <Link
                to="/products"
                className="bg-gray-900 text-white px-10 py-5 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center gap-3 shadow-xl"
              >
                <motion.span
                  animate={{ 
                    x: [0, 6, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Shop Collection
                </motion.span>
                <motion.div
                  animate={{ 
                    x: [0, 8, 0],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.8
                  }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{
                y: -10,
                scale: 1.03,
                borderColor: "rgba(0,0,0,0.4)",
                boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                transition: {
                  duration: 0.4,
                  type: "spring",
                  stiffness: 180,
                  damping: 18
                }
              }}
              whileTap={{ 
                scale: 0.95,
                rotate: [0, 1, -1, 0]
              }}
            >
              <Link
                to="/products"
                className="border-2 border-gray-300 text-gray-700 px-10 py-5 rounded-xl font-semibold hover:border-gray-400 hover:text-gray-900 transition-all duration-300 hover:shadow-xl"
              >
                View All Products
              </Link>
            </motion.div>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-gray-400 rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-3/4 right-1/4 w-1 h-1 bg-gray-500 rounded-full"
            animate={{
              y: [0, 15, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-gray-300 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>
      </section>

      {/* Enhanced Benefits Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Why Choose Baby Blue?</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              We're committed to providing you with the finest quality hair products and exceptional service
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 items-start">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 h-full flex flex-col"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-transparent rounded-2xl"></div>
                </div>

                <div className="p-6 relative z-10 pointer-events-auto">
                  {/* Enhanced Icon */}
                  <div className="relative w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <benefit.icon className="w-10 h-10 text-gray-700" />
                  </div>

                  {/* Enhanced Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 relative">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed relative mb-6">
                    {benefit.description}
                  </p>

                  {/* CTA Button */}
                  <Link
                    to="/about"
                    className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium flex items-center justify-center relative z-10 pointer-events-auto"
                  >
                    <benefit.icon className="w-4 h-4 mr-2" />
                    Learn More
                  </Link>

                  {/* Subtle Accent Line */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-gray-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Featured Products */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Featured Products</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Hand-picked premium hair products for the discerning Nigerian woman
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Social Proof */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 mb-12">Trusted by thousands of satisfied customers across Nigeria</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 items-start">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 h-full flex flex-col"
              >
                {/* Decorative Element */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                </div>

                <div className="p-6">
                  {/* Enhanced Star Ratings */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>

                  {/* Enhanced Quote */}
                  <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 font-medium relative">
                    <span className="text-4xl text-gray-300 font-serif absolute -top-2 -left-2">"</span>
                    {testimonial.text}
                    <span className="text-4xl text-gray-300 font-serif absolute -bottom-4 -right-2">"</span>
                  </blockquote>

                  {/* Enhanced Attribution */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-bold text-gray-900 text-base">— {testimonial.name}</p>
                      <p className="text-sm text-gray-600 mt-1">{testimonial.location}</p>
                    </div>

                    {/* Trust Indicator & CTA */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-gray-600 font-medium">Verified</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    to="/contact"
                    className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium flex items-center justify-center"
                  >
                    Contact
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center px-8 py-16 rounded-2xl bg-white shadow-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Ready to Elevate Your Style?</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of Nigerian women who trust Baby Blue for their luxury hair needs
            </p>
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to="/products"
                className="bg-gray-900 text-white px-4 py-4 rounded-md font-semibold hover:bg-gray-800 transition-colors flex items-center"
              >
                Shop Now
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <NewsletterSignup />
    </div>
  )
}
