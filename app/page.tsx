'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Trophy, Shield, Zap, Target, Code, Network, Lock } from 'lucide-react'
import CTFChallengeCard from './components/CTFChallengeCard'
import BlogCard from './components/BlogCard'

const featuredChallenges: Array<{
  id: string
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert'
  category: string
  points: number
  solved: number
  description: string
}> = [
  {
    id: '1',
    title: 'Kenya National CTF 2024 Challenge #1',
    difficulty: 'Easy' as const,
    category: 'Web Security',
    points: 100,
    solved: 45,
    description: 'Analyze this PHP application for common vulnerabilities',
  },
  {
    id: '2',
    title: 'M-Pesa API Security Audit',
    difficulty: 'Medium' as const,
    category: 'Mobile Security',
    points: 250,
    solved: 12,
    description: 'Identify security flaws in the payment gateway implementation',
  },
  {
    id: '3',
    title: 'Kenya Government Portal SQLi',
    difficulty: 'Hard' as const,
    category: 'Database Security',
    points: 500,
    solved: 3,
    description: 'Exploit the SQL injection in the government portal',
  },
]

const recentBlogs = [
  {
    id: '1',
    title: 'Kenya Ranks #3 in African Cybersecurity Threats',
    excerpt: 'Recent data shows Kenya has experienced a 201% surge in cyber threats in 2024...',
    category: 'News',
    date: '2024-01-15',
    readTime: '5 min',
  },
  {
    id: '2',
    title: 'How to Protect Your Startup from Ransomware',
    excerpt: 'Practical steps Kenyan businesses can take to avoid falling victim to ransomware attacks...',
    category: 'Tutorial',
    date: '2024-01-12',
    readTime: '8 min',
  },
  {
    id: '3',
    title: 'CTF Writeup: Kenyan Banking System Penetration Test',
    excerpt: 'Deep dive into how we identified and exploited vulnerabilities in a local banking system...',
    category: 'CTF Writeup',
    date: '2024-01-10',
    readTime: '12 min',
  },
]

export default function Home() {
  const features = [
    { icon: Target, title: 'CTF Challenges', description: 'Hands-on challenges based on Kenyan infrastructure' },
    { icon: Shield, title: 'Security News', description: 'Latest cybersecurity updates from Kenya and beyond' },
    { icon: Network, title: 'Community', description: 'Connect with Kenyan cybersecurity professionals' },
    { icon: Zap, title: 'Real-time Updates', description: 'Stay ahead with instant threat intelligence' },
  ]

  const stats = [
    { label: 'Active Members', value: '2,500+' },
    { label: 'CTF Challenges', value: '150+' },
    { label: 'Articles Published', value: '200+' },
    { label: 'Events Organized', value: '15+' },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-block mb-6">
            <motion.div
              className="px-4 py-2 bg-cyber-green/10 border border-cyber-green/30 rounded-full text-cyber-green"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
             Explore Cutting-Edge Intel & Tech Buzz
            </motion.div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyber-green via-cyber-blue to-cyber-purple bg-clip-text text-transparent leading-tight">
            Empowering Kenya's Digital Frontier.  
          </h1>
          
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Join Kenya's largest community of ethical hackers, compete in CTF challenges, 
            and stay updated with the latest cybersecurity news from across the continent.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/ctf" className="cyber-button">
              Start Hacking <ArrowRight className="inline ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="/blog"
              className="px-6 py-3 border-2 border-cyber-green text-cyber-green font-bold rounded-lg hover:bg-cyber-green/10 transition-all"
            >
              Read Articles
            </Link>
          </div>
        </motion.div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyber-purple/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-cyber-blue/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyber-green/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="cyber-card text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-cyber-green mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Join <span className="text-cyber-green">CyberPulse KE</span>?
          </h2>
          <p className="text-xl text-gray-400">Everything you need to excel in cybersecurity</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="cyber-card group"
            >
              <feature.icon className="h-12 w-12 text-cyber-green mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured CTF Challenges */}
      <section className="container mx-auto px-4 py-20 bg-cyber-darker/50">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-2">
              Featured <span className="text-cyber-green">CTF Challenges</span>
            </h2>
            <p className="text-gray-400">Test your skills with real-world scenarios</p>
          </div>
          <Link href="/ctf" className="hidden md:flex items-center text-cyber-green hover:underline">
            View All <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredChallenges.map((challenge, index) => (
            <CTFChallengeCard key={challenge.id} challenge={challenge} index={index} />
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link href="/ctf" className="cyber-button">
            View All Challenges <ArrowRight className="inline ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-2">
              Latest <span className="text-cyber-blue">Articles</span>
            </h2>
            <p className="text-gray-400">Stay informed with the latest cybersecurity news</p>
          </div>
          <Link href="/blog" className="hidden md:flex items-center text-cyber-blue hover:underline">
            View All <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentBlogs.map((blog, index) => (
            <BlogCard key={blog.id} blog={blog} index={index} />
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link href="/blog" className="cyber-button">
            View All Articles <ArrowRight className="inline ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="cyber-card max-w-4xl mx-auto text-center glow-effect"
        >
          <Lock className="h-16 w-16 text-cyber-green mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to Level Up Your Skills?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of Kenyan cybersecurity enthusiasts. Compete, learn, and grow together.
          </p>
          <Link href="/ctf" className="cyber-button text-lg">
            Get Started Now <ArrowRight className="inline ml-2 h-6 w-6" />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}

