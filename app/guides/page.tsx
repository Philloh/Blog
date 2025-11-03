'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { BookOpen, Target, Shield, ExternalLink } from 'lucide-react'

export default function GuidesPage() {
  const guides = [
    {
      title: 'Start Here: Cybersecurity Learning Path (Kenya Edition)'.trim(),
      items: [
        'Foundations: Networking, Linux, Web basics',
        'Web Security: OWASP Top 10, PortSwigger Academy',
        'Practice: Hack The Box, TryHackMe, PicoCTF',
        'Certs: eJPT, Security+, CC, local workshops',
      ],
    },
    {
      title: 'CTF Playbook',
      items: [
        'Recon, enumeration, and note-taking discipline',
        'Web: IDOR, XSS, SQLi; Crypto: classic ciphers; Forensics: PCAPs',
        'Tools: Burp Suite, FFUF, Nmap, Wireshark, Ghidra',
        'Writeups: learning from others, reproducing steps',
      ],
    },
    {
      title: 'Kenyan Communities & Opportunities',
      items: [
        'Meetups: spaceyatech, Bug Bounty Kenya, local OWASP chapters',
        'Events: university CTFs, cyber conferences, hackathons',
        'Responsible disclosure and ethical guidelines',
      ],
    },
  ]

  const links = [
    { label: 'PortSwigger Academy', href: 'https://portswigger.net/web-security' },
    { label: 'OWASP Top 10', href: 'https://owasp.org/www-project-top-ten/' },
    { label: 'Hack The Box', href: 'https://www.hackthebox.com/' },
    { label: 'TryHackMe', href: 'https://tryhackme.com/' },
  ]

  return (
    <div className="pt-20 pb-20">
      <section className="container mx-auto px-4 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <BookOpen className="h-8 w-8 text-cyber-green" />
            <h1 className="text-4xl md:text-5xl font-bold">Guides & Resources</h1>
          </div>
          <p className="text-gray-400 text-lg">Curated learning paths, practice platforms, and Kenyan community links to level up faster.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guides.map((g) => (
            <div key={g.title} className="cyber-card">
              <h2 className="text-2xl font-bold mb-3">{g.title}</h2>
              <ul className="space-y-2 text-gray-300">
                {g.items.map((i) => (
                  <li key={i} className="flex items-start">
                    <Shield className="h-4 w-4 text-cyber-green mr-2 mt-1" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 cyber-card">
          <h3 className="text-xl font-bold mb-3">Useful Links</h3>
          <div className="flex flex-wrap gap-3">
            {links.map((l) => (
              <Link key={l.href} href={l.href} target="_blank" className="px-4 py-2 border border-cyber-green/40 rounded-lg text-cyber-green hover:bg-cyber-green/10 flex items-center">
                {l.label}
                <ExternalLink className="h-4 w-4 ml-2" />
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <Link href="/ctf" className="cyber-button">Start a CTF Challenge</Link>
        </div>
      </section>
    </div>
  )
}
