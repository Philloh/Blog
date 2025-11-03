'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Mail, Send, Twitter, Linkedin, Github } from 'lucide-react'
import React from 'react'

export default function ContactPage() {
  const [sent, setSent] = React.useState(false)

  return (
    <div className="pt-20 pb-20">
      <section className="container mx-auto px-4 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <div className="inline-flex items-center space-x-2 mb-2">
            <Mail className="h-8 w-8 text-cyber-green" />
            <h1 className="text-4xl md:text-5xl font-bold">Contact Us</h1>
          </div>
          <p className="text-gray-400">Questions, partnerships, or guest posts? We’d love to hear from you.</p>
        </motion.div>

        <div className="cyber-card">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
              setTimeout(() => setSent(false), 4000)
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm text-gray-400 mb-1">Your Name</label>
              <input required className="w-full px-4 py-3 bg-cyber-dark border border-cyber-green/20 rounded-lg text-gray-100" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input type="email" required className="w-full px-4 py-3 bg-cyber-dark border border-cyber-green/20 rounded-lg text-gray-100" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Message</label>
              <textarea required rows={5} className="w-full px-4 py-3 bg-cyber-dark border border-cyber-green/20 rounded-lg text-gray-100" />
            </div>
            <button type="submit" className="cyber-button flex items-center">
              Send Message
              <Send className="h-5 w-5 ml-2" />
            </button>
            {sent && <div className="text-cyber-green">Thanks! We’ll get back to you shortly.</div>}
          </form>
        </div>

        <div className="mt-8 text-center">
          <div className="text-gray-400 mb-3">Or reach us on</div>
          <div className="flex items-center justify-center space-x-4">
            <Link href="https://twitter.com" target="_blank" className="text-gray-400 hover:text-cyber-green"><Twitter className="h-6 w-6" /></Link>
            <Link href="https://linkedin.com" target="_blank" className="text-gray-400 hover:text-cyber-green"><Linkedin className="h-6 w-6" /></Link>
            <Link href="https://github.com" target="_blank" className="text-gray-400 hover:text-cyber-green"><Github className="h-6 w-6" /></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
