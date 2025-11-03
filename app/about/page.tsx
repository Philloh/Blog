'use client'

import { motion } from 'framer-motion'
import { Shield, Target, Users, Trophy, Code, Network } from 'lucide-react'

export default function AboutPage() {
  const stats = [
    { icon: Users, value: '2,500+', label: 'Active Members' },
    { icon: Target, value: '150+', label: 'CTF Challenges' },
    { icon: Code, value: '200+', label: 'Articles Published' },
    { icon: Trophy, value: '15+', label: 'Events Organized' },
  ]

  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'We prioritize ethical hacking and responsible disclosure. All challenges are designed for educational purposes.',
    },
    {
      icon: Network,
      title: 'Community Driven',
      description: 'Built by and for the Kenyan cybersecurity community. We grow together and support each other.',
    },
    {
      icon: Target,
      title: 'Real-World Focus',
      description: 'Our challenges are based on real scenarios from Kenyan infrastructure, making them highly relevant.',
    },
    {
      icon: Code,
      title: 'Continuous Learning',
      description: 'We provide the latest cybersecurity news, tutorials, and expert insights to keep you ahead.',
    },
  ]

  const milestones = [
    { year: '2020', event: 'Launched with 10 CTF challenges' },
    { year: '2021', event: 'Reached 500 active members' },
    { year: '2022', event: 'First in-person CTF event in Nairobi' },
    { year: '2023', event: 'Partnership with Kenya CERT' },
    { year: '2024', event: '2000+ members milestone achieved' },
  ]

  return (
    <div className="pt-20 pb-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyber-green to-cyber-blue bg-clip-text text-transparent">
            About CyberPulse KE
          </h1>
          <p className="text-xl text-gray-400">
            Empowering Kenya's cybersecurity community through education, challenges, and collaboration
          </p>
        </motion.div>
      </section>

      {/* Stats */}
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
              <stat.icon className="h-8 w-8 text-cyber-green mx-auto mb-2" />
              <div className="text-3xl font-bold text-cyber-green">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="cyber-card p-12 max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            CyberPulse KE was born from a simple vision: to create a platform where cybersecurity enthusiasts, 
            students, and professionals can come together to learn, practice, and grow their skills. In a country 
            experiencing rapid digital transformation and an exponential increase in cyber threats, we recognized 
            the need for a dedicated space that combines hands-on learning with local context.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Our challenges are inspired by real-world scenarios from Kenyan infrastructure—from banking systems 
            to government portals, from mobile money platforms to IoT devices. We believe that practical, 
            context-aware learning is the most effective way to build a strong cybersecurity workforce for Kenya's future.
          </p>
        </motion.div>
      </section>

      {/* Values */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="cyber-card"
            >
              <value.icon className="h-12 w-12 text-cyber-green mb-4" />
              <h3 className="text-2xl font-bold mb-2">{value.title}</h3>
              <p className="text-gray-400">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="container mx-auto px-4 py-12 bg-cyber-darker/50">
        <h2 className="text-4xl font-bold text-center mb-12">Our Journey</h2>
        <div className="max-w-3xl mx-auto">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center mb-8"
            >
              <div className="flex-shrink-0 w-24 text-right mr-8">
                <div className="font-bold text-cyber-green text-2xl">{milestone.year}</div>
              </div>
              <div className="flex-grow">
                <div className="cyber-card">
                  <p className="text-gray-300">{milestone.event}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Join CTA */}
      <section className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="cyber-card max-w-3xl mx-auto text-center glow-effect"
        >
          <Shield className="h-16 w-16 text-cyber-green mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl text-gray-400 mb-8">
            Ready to level up your cybersecurity skills? Join thousands of Kenyan hackers and start your journey today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/ctf" className="cyber-button">
              Start Hacking
            </a>
            <a href="/blog" className="px-6 py-3 border-2 border-cyber-green text-cyber-green font-bold rounded-lg hover:bg-cyber-green/10 transition-all">
              Read Articles
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

