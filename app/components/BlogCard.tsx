'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Clock, Calendar, ArrowRight } from 'lucide-react'

interface Blog {
  id: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
}

interface Props {
  blog: Blog
  index: number
}

export default function BlogCard({ blog, index }: Props) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/blog/${blog.id}`}>
        <div className="cyber-card h-full group hover:scale-105 transition-transform cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 bg-cyber-blue/20 text-cyber-blue rounded-full text-xs font-bold">
              {blog.category}
            </span>
            <div className="flex items-center space-x-1 text-gray-500 text-xs">
              <Clock className="h-3 w-3" />
              <span>{blog.readTime}</span>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-2 group-hover:text-cyber-blue transition-colors line-clamp-2">
            {blog.title}
          </h3>
          
          <p className="text-gray-400 text-sm mb-4 line-clamp-3">
            {blog.excerpt}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(blog.date)}</span>
            </div>
            <ArrowRight className="h-4 w-4 text-cyber-blue group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

