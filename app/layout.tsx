import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CyberPulse KE — CTF, Cybersecurity News, and Tech Intel',
  description: 'CyberPulse KE: Kenya’s neon-lit hub for CTF challenges, cutting-edge cyber news, and hands-on security learning.',
  keywords: 'CyberPulse KE, Kenya cybersecurity, Kenya CTF, cyber news Kenya, ethical hacking Kenya, tech intel',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col bg-cyber-dark">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

