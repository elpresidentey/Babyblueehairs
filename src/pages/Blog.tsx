import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, ArrowRight, BookOpen, Scissors, Droplets, Sparkles } from 'lucide-react'
import SEO from '../components/SEO'

// Blog post data
const blogPosts = [
  {
    id: '1',
    title: 'Essential Hair Care Routine for Nigerian Women',
    excerpt: 'Discover the perfect daily hair care routine tailored for Nigerian hair textures and climate conditions.',
    content: `Taking care of your hair is essential for maintaining its health, beauty, and longevity. Nigerian women often face unique challenges due to our diverse hair textures and tropical climate. Here's a comprehensive guide to building the perfect hair care routine.

**1. Understanding Your Hair Type**
Nigerian hair comes in various textures from 3C to 4C curls. Each type requires specific care approaches. Knowing your hair type is the first step to effective care.

**2. Daily Care Practices**
- Gentle detangling in the morning
- Moisturizing throughout the day
- Protective styling techniques
- Regular scalp massages

**3. Weekly Maintenance**
- Deep conditioning treatments
- Protein treatments for strength
- Scalp exfoliation
- Hair masks and treatments

**4. Seasonal Considerations**
Our tropical climate affects hair differently in rainy and dry seasons. Adjust your routine accordingly to combat humidity and heat damage.`,
    author: 'Adeola Johnson',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'Hair Care',
    tags: ['Routine', 'Maintenance', 'Nigerian Hair', 'Daily Care'],
    image: 'hair care routine nigerian women'
  },
  {
    id: '2',
    title: 'Protective Styles: Best Practices for Healthy Hair',
    excerpt: 'Learn how to protect your natural hair while maintaining beautiful, versatile styles.',
    content: `Protective styling is an art that Nigerian women have mastered over generations. When done correctly, protective styles not only look beautiful but also promote hair health and growth.

**Understanding Protective Styles**
Protective styles involve techniques that minimize manipulation and exposure of the hair ends. This includes braids, weaves, wigs, and various updos that keep the hair safely tucked away.

**Popular Protective Styles:**
- Cornrows and braids
- Marley twists
- Jumbo braids
- Flat top and halo braids
- Bantu knots and two-strand twists
- Weaves and sew-ins

**Maintenance Tips:**
- Regular scalp cleaning
- Moisture retention techniques
- Gentle handling
- Professional installation
- Regular check-ups

**When to Take a Break:**
Knowing when to give your hair a rest is crucial. Signs that it's time for a break include scalp irritation, excessive shedding, or hair feeling consistently dry.`,
    author: 'Ngozi Okoro',
    date: '2024-01-20',
    readTime: '6 min read',
    category: 'Protective Styling',
    tags: ['Protective Styles', 'Braids', 'Weaves', 'Hair Health'],
    image: 'protective hairstyles nigerian women'
  },
  {
    id: '3',
    title: 'Natural Hair Oils: Benefits and How to Use Them',
    excerpt: 'Explore the power of natural oils for nourishing and strengthening Nigerian hair.',
    content: `Natural oils have been used for hair care for centuries, and Nigerian women have long understood their benefits. From coconut oil to shea butter, these natural treasures can transform your hair care routine.

**Essential Nigerian Hair Oils:**

**1. Coconut Oil**
- Penetrates the hair shaft
- Reduces protein loss
- Excellent for deep conditioning
- Best applied warm for better absorption

**2. Shea Butter**
- Rich in vitamins A, E, and F
- Excellent moisture retention
- Natural UV protection
- Perfect for scalp health

**3. Castor Oil**
- Promotes hair growth
- Thickens hair strands
- Natural anti-inflammatory
- Great for eyebrows and edges

**4. Jojoba Oil**
- Mimics natural sebum
- Regulates oil production
- Excellent for all hair types
- Lightweight and non-greasy

**Application Techniques:**
- Scalp massages for growth
- Hair masks for deep conditioning
- Leave-in treatments for daily protection
- Pre-wash treatments for damaged hair

**Storage and Shelf Life:**
Proper storage ensures maximum benefits. Keep oils in cool, dark places and check for rancidity before use.`,
    author: 'Chioma Eze',
    date: '2024-01-25',
    readTime: '7 min read',
    category: 'Natural Oils',
    tags: ['Natural Oils', 'Hair Care', 'Moisturizing', 'Traditional Remedies'],
    image: 'natural hair oils nigerian women'
  },
  {
    id: '4',
    title: 'Hair Growth Journey: Patience and Consistency',
    excerpt: 'Understanding the hair growth process and setting realistic expectations for healthy hair growth.',
    content: `Hair growth is a journey that requires patience, consistency, and proper care. Nigerian women often have high expectations for hair growth, but understanding the natural process is key to success.

**The Hair Growth Cycle:**
Hair grows in three distinct phases:
- **Anagen Phase**: Active growth (2-7 years)
- **Catagen Phase**: Transition (2-3 weeks)
- **Telogen Phase**: Resting (3 months)

**Factors Affecting Growth:**
- Genetics and ethnicity
- Age and hormonal changes
- Nutrition and diet
- Stress levels
- Hair care practices
- Environmental factors

**Realistic Expectations:**
- Natural growth rate: 0.5 inches per month
- Healthy hair grows about 6 inches per year
- Factors can slow or accelerate this process

**Growth Enhancement Strategies:**
- Proper nutrition with protein-rich foods
- Scalp health and circulation
- Gentle handling and manipulation
- Protective styling
- Stress management
- Regular trims to prevent split ends

**Tracking Progress:**
- Monthly measurements
- Before and after photos
- Hair density observations
- Overall hair health assessment

**Patience and Consistency:**
The most important factors in successful hair growth are patience and consistency. Stick to your routine, be gentle with your hair, and celebrate small victories along the way.`,
    author: 'Blessing Adebayo',
    date: '2024-01-30',
    readTime: '5 min read',
    category: 'Hair Growth',
    tags: ['Hair Growth', 'Patience', 'Nutrition', 'Scalp Health'],
    image: 'hair growth journey nigerian women'
  },
  {
    id: '5',
    title: 'Hair Coloring Tips for Nigerian Hair Textures',
    excerpt: 'Safe and effective hair coloring techniques for kinky, coily, and wavy hair types.',
    content: `Hair coloring can be a beautiful way to express yourself, but it's especially challenging for Nigerian hair textures. The key is preparation, proper technique, and aftercare.

**Understanding Hair Porosity:**
Nigerian hair often has low porosity, making it resistant to color penetration. This requires different approaches than coloring straight hair.

**Pre-Color Preparation:**
- Deep conditioning treatments
- Protein treatments for strength
- Scalp sensitivity testing
- Strand testing for color accuracy

**Color Selection:**
- Choose colors that complement your skin tone
- Consider maintenance level
- Think about your lifestyle and hair care routine
- Start with subtle changes if new to coloring

**Application Techniques:**
- Sectioning for even coverage
- Start with ends and work up
- Use professional products when possible
- Consider heat activation for better results

**Aftercare Essentials:**
- Color-safe shampoos and conditioners
- Weekly deep conditioning
- UV protection
- Regular trims to maintain health

**Common Mistakes to Avoid:**
- Skipping strand tests
- Using wrong developer strength
- Neglecting aftercare
- Coloring damaged hair

**Professional vs. DIY:**
While DIY coloring is popular, complex techniques and dark hair lightening should always be done professionally to avoid damage.`,
    author: 'Funmi Adeyemi',
    date: '2024-02-05',
    readTime: '9 min read',
    category: 'Hair Coloring',
    tags: ['Hair Coloring', 'Dyeing', 'Hair Care', 'Styling'],
    image: 'hair coloring nigerian women'
  },
  {
    id: '6',
    title: 'Seasonal Hair Care: Adapting to Nigerian Weather',
    excerpt: 'How to adjust your hair care routine for Nigeria\'s rainy and dry seasons.',
    content: `Nigeria's climate presents unique challenges for hair care. Our weather patterns require seasonal adjustments to maintain healthy, beautiful hair throughout the year.

**Understanding Seasonal Effects:**

**Rainy Season Challenges:**
- High humidity causes frizz and shrinkage
- Mold and mildew growth
- Increased oil production
- Heavy rainfall affects styles

**Dry Season Challenges:**
- Low humidity leads to dryness
- Static electricity issues
- Increased breakage risk
- Dust and environmental pollutants

**Rainy Season Strategies:**
- Anti-frizz products and techniques
- Protective styling options
- Moisture-locking sealants
- Regular scalp cleaning
- Quick-drying products

**Dry Season Strategies:**
- Intensive moisturizing routines
- Anti-static products
- Protective barriers against sun and dust
- Humectant-rich conditioners
- Leave-in conditioners

**Weather-Appropriate Styling:**
- Protective styles for rain
- Moisture-retentive styles for dry weather
- Quick maintenance options
- Versatile protective styles

**Product Adjustments:**
- Humidity-resistant products
- Moisturizing-focused routines
- Anti-frizz serums and creams
- UV-protective sprays

**Year-Round Essentials:**
- Consistent moisture routine
- Regular trims
- Scalp health maintenance
- Gentle handling techniques

**Monitoring and Adjusting:**
Regular hair assessments help you adjust your routine as needed. Pay attention to how your hair responds to seasonal changes and modify accordingly.`,
    author: 'Adaobi Nwosu',
    date: '2024-02-10',
    readTime: '6 min read',
    category: 'Seasonal Care',
    tags: ['Seasonal Care', 'Weather', 'Humidity', 'Hair Health'],
    image: 'seasonal hair care nigerian women'
  }
]

const categories = [
  { name: 'All Posts', count: blogPosts.length, icon: BookOpen },
  { name: 'Hair Care', count: blogPosts.filter(p => p.category === 'Hair Care').length, icon: Droplets },
  { name: 'Protective Styling', count: blogPosts.filter(p => p.category === 'Protective Styling').length, icon: Scissors },
  { name: 'Natural Oils', count: blogPosts.filter(p => p.category === 'Natural Oils').length, icon: Sparkles },
  { name: 'Hair Growth', count: blogPosts.filter(p => p.category === 'Hair Growth').length, icon: User },
  { name: 'Hair Coloring', count: blogPosts.filter(p => p.category === 'Hair Coloring').length, icon: Sparkles },
  { name: 'Seasonal Care', count: blogPosts.filter(p => p.category === 'Seasonal Care').length, icon: Calendar }
]

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All Posts')
  const [selectedPost, setSelectedPost] = useState<any>(null)

  const filteredPosts = selectedCategory === 'All Posts'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory)

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <SEO
            title={`${selectedPost.title} - Baby Blue Blog`}
            description={selectedPost.excerpt}
            keywords={selectedPost.tags.join(', ')}
          />

          {/* Back Button */}
          <button
            onClick={() => setSelectedPost(null)}
            className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2"
          >
            ← Back to Blog
          </button>

          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-gray-900 text-white text-xs rounded-full">
                {selectedPost.category}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {selectedPost.title}
            </h1>

            <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{selectedPost.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(selectedPost.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{selectedPost.readTime}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {selectedPost.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="prose prose-lg max-w-none"
          >
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              {selectedPost.content.split('\n\n').map((paragraph: string, index: number) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEO
        title="Hair Care Blog - Baby Blue"
        description="Expert hair care tips, styling guides, and beauty advice for Nigerian women"
        keywords="hair care blog, nigerian hair, hair styling, beauty tips, hair maintenance"
      />

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Hair Care Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert tips, styling guides, and beauty advice for Nigerian women. Discover the secrets to healthy, beautiful hair.
            </p>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category.name
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <category.icon className="w-4 h-4" />
                {category.name}
                <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                  selectedCategory === category.name
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {category.count}
                </span>
              </motion.button>
            ))}
          </motion.div>

          {/* Blog Posts Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                {/* Featured Image */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-gray-400" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-gray-900 text-white text-xs rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                    <div className="flex items-center gap-1 text-gray-900 font-medium group-hover:translate-x-1 transition-transform">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No posts found
              </h3>
              <p className="text-gray-600">
                {selectedCategory === 'All Posts'
                  ? "Check back later for new articles!"
                  : `No articles found in "${selectedCategory}" category.`
                }
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}
