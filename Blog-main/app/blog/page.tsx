'use client'

import { useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter } from 'lucide-react'
import BlogCard from '../components/BlogCard'

const blogPosts = [
  {
    id: '1',
    title: 'Kenya Ranks #3 in African Cybersecurity Threats',
    excerpt: 'Recent data shows Kenya has experienced a 201% surge in cyber threats in 2024, making it critical for businesses to strengthen their security posture...',
    category: 'News',
    date: '2025-01-15',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'How to Protect Your Startup from Ransomware',
    excerpt: 'Practical steps Kenyan businesses can take to avoid falling victim to ransomware attacks that are targeting SMEs in East Africa...',
    category: 'Tutorial',
    date: '2025-01-12',
    readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'CTF Writeup: Kenyan Banking System Penetration Test',
    excerpt: 'Deep dive into how we identified and exploited vulnerabilities in a local banking system, with step-by-step analysis and remediation advice...',
    category: 'CTF Writeup',
    date: '2025-01-10',
    readTime: '12 min',
    image: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'M-Pesa Security: What You Need to Know',
    excerpt: 'Understanding the security measures behind Kenya\'s most popular mobile money platform and how to protect yourself from fraud...',
    category: 'Security',
    date: '2025-01-08',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1615497001839-b2b3e46b1a3a?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '5',
    title: 'The Rise of AI-Powered Cyber Attacks in Kenya',
    excerpt: 'How artificial intelligence is being used by threat actors to launch sophisticated attacks on Kenyan organizations...',
    category: 'Analysis',
    date: '2025-01-05',
    readTime: '11 min',
    image: 'https://images.unsplash.com/photo-1542831371-d531d36971e6?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '6',
    title: 'Kenya Data Protection Act: A Complete Guide',
    excerpt: 'Everything you need to know about Kenya\'s Data Protection Act and how it affects businesses in the country...',
    category: 'Legal',
    date: '2025-01-03',
    readTime: '15 min',
    image: 'https://images.unsplash.com/photo-1555371363-9ec9c172b72e?q=80&w=1200&auto=format&fit=crop',
  },
  // Added related Kenya-focused tech/cyber articles
  {
    id: '7',
    title: 'Inside Kenya’s SIM Swap Fraud: How to Stay Safe',
    excerpt: 'A practical guide to SIM swap tactics in Kenya, how attackers hijack numbers, and what you can do to prevent it.',
    category: 'Security',
    date: '2025-01-18',
    readTime: '9 min',
    image: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '8',
    title: 'Bug Bounty in Kenya: Getting Started the Right Way',
    excerpt: 'Where to practice, how to report responsibly, and how Kenyan hunters are earning with ethics.',
    category: 'Tutorial',
    date: '2025-01-14',
    readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '9',
    title: 'SOC on a Budget: Blueprint for Kenyan SMEs',
    excerpt: 'Build visibility, detection, and response without breaking the bank—tools, process, and playbooks.',
    category: 'Analysis',
    date: '2025-01-11',
    readTime: '9 min',
    image: 'https://images.unsplash.com/photo-1542831371-d531d36971e6?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '10',
    title: 'CTF Writeup: Nairobi Smart Parking Vulnerabilities',
    excerpt: 'A CTF-style exploration of common misconfigurations found in smart city integrations, and how to mitigate them.',
    category: 'CTF Writeup',
    date: '2025-01-07',
    readTime: '12 min',
    image: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?q=80&w=1200&auto=format&fit=crop',
  },
]

// Hidden international batch to load on demand
const moreArticles = [
  {
    id: '11',
    title: 'Global DeFi & Blockchain Security: 2025 Threats to Watch',
    excerpt: 'From smart contract exploits to cross-chain bridge attacks, how blockchain security is evolving worldwide—and what teams must do now.',
    category: 'International',
    date: '2025-01-21',
    readTime: '9 min',
  },
  {
    id: '12',
    title: 'Post-Quantum Cryptography: Preparing for a World After RSA',
    excerpt: 'Why governments and tech giants are migrating to PQC, what NIST is standardizing, and how it impacts everyday products.',
    category: 'International',
    date: '2025-01-20',
    readTime: '10 min',
  },
  {
    id: '13',
    title: 'AI-Driven Phishing Goes Global: Defenses That Actually Work',
    excerpt: 'LLM-crafted lures and deepfake voice scams are exploding. We break down practical, high-signal defenses that scale.',
    category: 'International',
    date: '2025-01-19',
    readTime: '8 min',
  },
]

const categories = ['All', 'News', 'Tutorial', 'CTF Writeup', 'Security', 'Analysis', 'Legal', 'International']

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [showMore, setShowMore] = useState<boolean>(false)

  // When showing international only, default category to International
  useEffect(() => {
    if (showMore) {
      setSelectedCategory('International')
    }
  }, [showMore])

  const allPosts = useMemo(() => (showMore ? moreArticles : blogPosts), [showMore])

  const filteredPosts = useMemo(() => {
    return allPosts
      .filter((post) => {
        if (selectedCategory === 'All') return true
        return post.category === selectedCategory
      })
      .filter((post) => {
        if (!searchQuery) return true
        return post.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [selectedCategory, searchQuery, allPosts])

  return (
    <div className="pt-20 pb-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent">
            Blog Articles & News
          </h1> 
          <br/>
          <p className="text-xl text-gray-400">
            Stay informed with the latest cybersecurity news, tutorials, and CTF writeups from Kenya and beyond
          </p>
        </motion.div>
      </section>

      {/* Search and Filter */}
      <section className="container mx-auto px-4 mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-cyber-darkGray border border-cyber-green/20 rounded-lg text-gray-100 placeholder-gray-500 focus:border-cyber-green focus:outline-none"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  disabled={showMore && category !== 'International' && category !== 'All'}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                    selectedCategory === category
                      ? 'bg-cyber-green text-black'
                      : 'bg-cyber-darkGray border border-cyber-green/20 text-gray-300 hover:border-cyber-green'
                  } ${showMore && category !== 'International' && category !== 'All' ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((blog, index) => (
            <BlogCard key={blog.id} blog={blog} index={index} />
          ))}
        </div>

        {/* Load More Articles */}
        <div className="text-center mt-12">
          {!showMore ? (
            <button onClick={() => setShowMore(true)} className="cyber-button">
              Load More Articles
            </button>
          ) : null}
        </div>
      </section>
    </div>
  )
}

