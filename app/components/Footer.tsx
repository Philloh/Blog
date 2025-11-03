import Link from 'next/link'
import { Github, Twitter, Linkedin, Mail, Shield } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
    { name: 'Email', icon: Mail, href: 'mailto:hello@cyberpulse.ke' },
  ]

  return (
    <footer className="bg-cyber-darker border-t border-cyber-green/20 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-cyber-green" />
              <span className="text-xl font-bold text-cyber-green">CyberPulse KE</span>
            </div>
            <p className="text-gray-400 text-sm">
              Kenya’s neon-lit hub for CTF challenges, cybersecurity news, and hands-on tech intel.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-cyber-green mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-cyber-green transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/ctf" className="text-gray-400 hover:text-cyber-green transition-colors">
                  CTF Challenges
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-cyber-green transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-cyber-green transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-cyber-green mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/ctf/archives" className="text-gray-400 hover:text-cyber-green transition-colors">
                  CTF Archives
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-cyber-green transition-colors">
                  Tech News
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-gray-400 hover:text-cyber-green transition-colors">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-cyber-green transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold text-cyber-green mb-4">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-cyber-green transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <link.icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-cyber-green/20 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} CyberPulse KE. All rights reserved.</p>
          <p className="mt-2">Built with 💚 for the Kenyan cybersecurity community</p>
        </div>
      </div>
    </footer>
  )
}

