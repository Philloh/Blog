'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Trophy, Users, Clock, ArrowRight, Lock, CheckCircle } from 'lucide-react'

interface Challenge {
  id: string
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert'
  category: string
  points: number
  solved: number
  description: string
}

interface Props {
  challenge: Challenge
  index: number
}

const difficultyColors = {
  Easy: 'text-green-500 border-green-500',
  Medium: 'text-yellow-500 border-yellow-500',
  Hard: 'text-orange-500 border-orange-500',
  Expert: 'text-red-500 border-red-500',
}

export default function CTFChallengeCard({ challenge, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/ctf/${challenge.id}`}>
        <div className="cyber-card h-full group hover:scale-105 transition-transform cursor-pointer">
          <div className="flex items-start justify-between mb-4">
            <span className={`px-3 py-1 border rounded-full text-xs font-bold ${difficultyColors[challenge.difficulty]}`}>
              {challenge.difficulty}
            </span>
            <div className="flex items-center space-x-1 text-cyber-yellow">
              <Trophy className="h-4 w-4" />
              <span className="text-sm font-bold">{challenge.points}</span>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-2 group-hover:text-cyber-green transition-colors">
            {challenge.title}
          </h3>
          
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {challenge.description}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>{challenge.solved} solved</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-cyber-purple/20 text-cyber-purple rounded text-xs">
                {challenge.category}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-cyber-green/10 flex items-center justify-between">
            <span className="text-xs text-gray-500">Click to start</span>
            <ArrowRight className="h-4 w-4 text-cyber-green group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

