'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="pt-20 pb-20 min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto px-4"
      >
        <h1 className="text-9xl font-bold text-cyber-green mb-4">404</h1>
        <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
        <p className="text-xl text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="cyber-button">
            <Home className="inline mr-2 h-5 w-5" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 border-2 border-cyber-green text-cyber-green font-bold rounded-lg hover:bg-cyber-green/10 transition-all"
          >
            <ArrowLeft className="inline mr-2 h-5 w-5" />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  )
}

