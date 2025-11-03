'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Trophy, Target, Code, Lock, Network } from 'lucide-react'
import CTFChallengeCard from '../components/CTFChallengeCard'

const challenges = [
  {
    id: '1',
    title: 'Kenya National CTF 2024 Challenge #1',
    difficulty: 'Easy' as const,
    category: 'Web Security',
    points: 100,
    solved: 45,
    description: 'Analyze this PHP application for common vulnerabilities and extract the flag',
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
  {
    id: '4',
    title: 'Safaricom Network Traffic Analysis',
    difficulty: 'Medium' as const,
    category: 'Network Security',
    points: 300,
    solved: 8,
    description: 'Analyze network packets and identify the hidden flag',
  },
  {
    id: '5',
    title: 'Kenyan Banking App Reverse Engineering',
    difficulty: 'Hard' as const,
    category: 'Reverse Engineering',
    points: 450,
    solved: 5,
    description: 'Reverse engineer the APK and bypass security measures',
  },
  {
    id: '6',
    title: 'Kenya Airways Booking System XSS',
    difficulty: 'Easy' as const,
    category: 'Web Security',
    points: 150,
    solved: 28,
    description: 'Find and exploit the cross-site scripting vulnerability',
  },
  {
    id: '7',
    title: 'KRA Tax Portal CSRF Attack',
    difficulty: 'Medium' as const,
    category: 'Web Security',
    points: 275,
    solved: 15,
    description: 'Exploit CSRF vulnerability to perform unauthorized actions',
  },
  {
    id: '8',
    title: 'M-Shwari Cryptocurrency Wallet Hacking',
    difficulty: 'Expert' as const,
    category: 'Cryptography',
    points: 750,
    solved: 1,
    description: 'Break the encryption and steal the flag from the wallet',
  },
]

const categories = ['All', 'Web Security', 'Mobile Security', 'Network Security', 'Database Security', 'Reverse Engineering', 'Cryptography']
const difficulties = ['All', 'Easy', 'Medium', 'Hard', 'Expert']

export default function CTFPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredChallenges = challenges.filter(challenge => {
    const matchesCategory = selectedCategory === 'All' || challenge.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'All' || challenge.difficulty === selectedDifficulty
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesDifficulty && matchesSearch
  })

  return (
    <div className="pt-20 pb-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-block mb-6">
            <Target className="h-16 w-16 text-cyber-green mx-auto mb-4" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyber-green to-cyber-blue bg-clip-text text-transparent">
            CTF Challenges
          </h1>
          <p className="text-xl text-gray-400">
            Test your skills with real-world cybersecurity challenges from Kenya
          </p>
        </motion.div>
      </section>

      {/* Stats Cards */}
      <section className="container mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: Trophy, label: 'Total Challenges', value: '150+' },
            { icon: Target, label: 'Participants', value: '2,500+' },
            { icon: Lock, label: 'Flags Found', value: '3,200+' },
            { icon: Network, label: 'Active Now', value: '156' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="cyber-card text-center"
            >
              <stat.icon className="h-8 w-8 text-cyber-green mx-auto mb-2" />
              <div className="text-2xl font-bold text-cyber-green">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Search and Filters */}
      <section className="container mx-auto px-4 mb-12">
        <div className="cyber-card p-6">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search challenges..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-cyber-dark border border-cyber-green/20 rounded-lg text-gray-100 placeholder-gray-500 focus:border-cyber-green focus:outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2 flex-1 min-w-[200px]">
                <Filter className="h-5 w-5 text-gray-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="flex-1 px-4 py-2 bg-cyber-dark border border-cyber-green/20 rounded-lg text-gray-100 focus:border-cyber-green focus:outline-none"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-2 flex-1 min-w-[200px]">
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="flex-1 px-4 py-2 bg-cyber-dark border border-cyber-green/20 rounded-lg text-gray-100 focus:border-cyber-green focus:outline-none"
                >
                  {difficulties.map(diff => (
                    <option key={diff} value={diff}>{diff}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Grid */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {filteredChallenges.length} Challenge{filteredChallenges.length !== 1 ? 's' : ''} Found
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge, index) => (
            <CTFChallengeCard key={challenge.id} challenge={challenge} index={index} />
          ))}
        </div>

        {filteredChallenges.length === 0 && (
          <div className="text-center py-12">
            <Code className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">No challenges found matching your criteria</p>
          </div>
        )}
      </section>
    </div>
  )
}

