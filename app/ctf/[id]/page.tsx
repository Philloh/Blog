'use client'

import { motion } from 'framer-motion'
import { Trophy, Users, Clock } from 'lucide-react'
import CTFChallenge from '../components/CTFChallenge'

type Diff = 'Easy' | 'Medium' | 'Hard' | 'Expert'

const CHALLENGES: Record<string, {
  id: string
  title: string
  difficulty: Diff
  category: string
  points: number
  solved: number
  description: string
  hints: string[]
  files: { name: string; size: string; href?: string }[]
  roomIp?: string
  externalRoom?: {
    platform: 'TryHackMe' | 'HackTheBox'
    roomId: string
    roomUrl: string
    note: string
  }
  flags?: { id: string; description: string; format: string }[]
}> = {
  '1': {
    id: '1',
    title: 'Kenya National CTF 2024: Web Login Woes',
    difficulty: 'Easy',
    category: 'Web Security',
    points: 100,
    solved: 45,
    description: 'A classic PHP login hides more than meets the eye. Enumerate, view source, and think about client-side logic vs server-side truth. Download the files and analyze them locally, or practice on TryHackMe with the linked room.',
    hints: ['View page source', 'Is validation happening server-side?', 'Try common info disclosure patterns'],
    files: [
      { name: 'index.php', size: '2.3 KB', href: '/ctf/index.php' },
      { name: 'readme.txt', size: '1.0 KB', href: '/ctf/readme.txt' },
    ],
    externalRoom: {
      platform: 'TryHackMe',
      roomId: 'owasp-top-10',
      roomUrl: 'https://tryhackme.com/room/owasptop10',
      note: 'Complete the OWASP Top 10 room on TryHackMe for hands-on practice. This challenge mirrors the SQL Injection task.',
    },
    flags: [
      { id: 'user', description: 'User flag (found after SQL injection)', format: 'THM{...}' },
      { id: 'root', description: 'Root flag (found after privilege escalation)', format: 'THM{...}' }
    ]
  },
  '2': {
    id: '2',
    title: 'Mombasa Port Authority: Webhook Exploitation',
    difficulty: 'Medium',
    category: 'Web Security',
    points: 200,
    solved: 32,
    description: 'A webhook endpoint in Mombasa Port Authority\'s system has been discovered. Can you exploit it to gain access? This mirrors the Webhook Exploitation room on TryHackMe.',
    hints: ['Check webhook payloads', 'Look for SSRF opportunities', 'Test for command injection'],
    files: [
      { name: 'webhook-sample.json', size: '1.2 KB', href: '/ctf/2-webhook-sample.json' },
      { name: 'notes.txt', size: '0.8 KB', href: '/ctf/2-notes.txt' },
    ],
    externalRoom: {
      platform: 'TryHackMe',
      roomId: 'webhook-exploitation',
      roomUrl: 'https://tryhackme.com/room/webhookexploitation',
      note: 'Complete the Webhook Exploitation room on TryHackMe. This challenge mirrors the SSRF and command injection tasks.',
    },
    flags: [
      { id: 'user', description: 'User flag (found after webhook exploitation)', format: 'THM{...}' },
      { id: 'root', description: 'Root flag (found after privilege escalation)', format: 'THM{...}' }
    ]
  },
  '3': {
    id: '3',
    title: 'Nairobi Fintech API: Broken Authentication',
    difficulty: 'Medium',
    category: 'API Security',
    points: 250,
    solved: 28,
    description: 'A fintech startup in Nairobi has exposed their API. Can you find the authentication bypass? This mirrors the API Security room on TryHackMe.',
    hints: ['Check JWT tokens', 'Look for algorithm confusion', 'Test for parameter pollution'],
    files: [
      { name: 'api-doc.md', size: '3.1 KB', href: '/ctf/3-api-doc.md' },
    ],
    externalRoom: {
      platform: 'TryHackMe',
      roomId: 'api-security',
      roomUrl: 'https://tryhackme.com/room/apisecurity',
      note: 'Complete the API Security room on TryHackMe. This challenge mirrors the JWT exploitation tasks.',
    },
    flags: [
      { id: 'user', description: 'User flag (found after JWT bypass)', format: 'THM{...}' },
      { id: 'admin', description: 'Admin flag (found after privilege escalation)', format: 'THM{...}' }
    ]
  },
  '4': {
    id: '4',
    title: 'Kisumu Network: Packet Analysis',
    difficulty: 'Hard',
    category: 'Network Security',
    points: 300,
    solved: 18,
    description: 'A network capture from Kisumu shows suspicious activity. Can you analyze the packets and find the hidden communication? This mirrors the Network Security room on TryHackMe.',
    hints: ['Look for DNS tunneling', 'Check for hidden protocols', 'Analyze timing patterns'],
    files: [
      { name: 'capture.pcap', size: '2.1 MB', href: '/ctf/4-capture.pcap' },
      { name: 'notes.txt', size: '1.2 KB', href: '/ctf/4-notes.txt' },
    ],
    externalRoom: {
      platform: 'TryHackMe',
      roomId: 'network-security',
      roomUrl: 'https://tryhackme.com/room/networksecurity',
      note: 'Complete the Network Security room on TryHackMe. This challenge mirrors the packet analysis tasks.',
    },
    flags: [
      { id: 'user', description: 'User flag (found in packet analysis)', format: 'THM{...}' },
      { id: 'root', description: 'Root flag (found after network exploitation)', format: 'THM{...}' }
    ]
  },
  '5': {
    id: '5',
    title: 'Eldoret Mobile: Android Reverse Engineering',
    difficulty: 'Hard',
    category: 'Mobile Security',
    points: 350,
    solved: 15,
    description: 'A mobile banking app from Eldoret has been compromised. Can you reverse engineer it to find the vulnerability? This mirrors the Mobile Security room on TryHackMe.',
    hints: ['Decompile the APK', 'Look for hardcoded secrets', 'Check for insecure storage'],
    files: [
      { name: 'banking.apk', size: '15.2 MB', href: '/ctf/5-banking.apk' },
      { name: 'notes.txt', size: '1.5 KB', href: '/ctf/5-notes.txt' },
    ],
    externalRoom: {
      platform: 'TryHackMe',
      roomId: 'mobile-security',
      roomUrl: 'https://tryhackme.com/room/mobilesecurity',
      note: 'Complete the Mobile Security room on TryHackMe. This challenge mirrors the Android reverse engineering tasks.',
    },
    flags: [
      { id: 'user', description: 'User flag (found in APK analysis)', format: 'THM{...}' },
      { id: 'root', description: 'Root flag (found after exploitation)', format: 'THM{...}' }
    ]
  },
  '6': {
    id: '6',
    title: 'Nakuru Web: XSS to RCE',
    difficulty: 'Expert',
    category: 'Web Security',
    points: 400,
    solved: 8,
    description: 'A web application in Nakuru has an XSS vulnerability that can be escalated to RCE. Can you exploit it? This mirrors the Advanced Web Exploitation room on TryHackMe.',
    hints: ['Start with XSS', 'Look for CSP bypasses', 'Test for DOM-based vulnerabilities'],
    files: [
      { name: 'feedback.html', size: '4.2 KB', href: '/ctf/6-feedback.html' },
    ],
    externalRoom: {
      platform: 'TryHackMe',
      roomId: 'advanced-web-exploitation',
      roomUrl: 'https://tryhackme.com/room/advancedwebexploitation',
      note: 'Complete the Advanced Web Exploitation room on TryHackMe. This challenge mirrors the XSS to RCE tasks.',
    },
    flags: [
      { id: 'user', description: 'User flag (found after XSS exploitation)', format: 'THM{...}' },
      { id: 'root', description: 'Root flag (found after RCE)', format: 'THM{...}' }
    ]
  },
  '7': {
    id: '7',
    title: 'Thika Manufacturing: CSRF Attack',
    difficulty: 'Medium',
    category: 'Web Security',
    points: 200,
    solved: 25,
    description: 'A manufacturing company in Thika has a CSRF vulnerability. Can you exploit it to perform unauthorized actions? This mirrors the Web Application Security room on TryHackMe.',
    hints: ['Look for state-changing operations', 'Check for CSRF tokens', 'Test for same-origin policy bypasses'],
    files: [
      { name: 'csrf.html', size: '3.8 KB', href: '/ctf/7-csrf.html' },
    ],
    externalRoom: {
      platform: 'TryHackMe',
      roomId: 'web-application-security',
      roomUrl: 'https://tryhackme.com/room/webapplicationsecurity',
      note: 'Complete the Web Application Security room on TryHackMe. This challenge mirrors the CSRF exploitation tasks.',
    },
    flags: [
      { id: 'user', description: 'User flag (found after CSRF exploitation)', format: 'THM{...}' },
      { id: 'admin', description: 'Admin flag (found after privilege escalation)', format: 'THM{...}' }
    ]
  },
  '8': {
    id: '8',
    title: 'Malindi Crypto: Blockchain Analysis',
    difficulty: 'Expert',
    category: 'Cryptocurrency Security',
    points: 450,
    solved: 5,
    description: 'A cryptocurrency wallet from Malindi has been compromised. Can you analyze the blockchain and recover the funds? This mirrors the Blockchain Security room on TryHackMe.',
    hints: ['Analyze the wallet file', 'Look for weak encryption', 'Check for key derivation issues'],
    files: [
      { name: 'wallet.bin', size: '8.7 MB', href: '/ctf/8-wallet.bin' },
      { name: 'ct.txt', size: '2.1 KB', href: '/ctf/8-ct.txt' },
    ],
    externalRoom: {
      platform: 'TryHackMe',
      roomId: 'blockchain-security',
      roomUrl: 'https://tryhackme.com/room/blockchainsecurity',
      note: 'Complete the Blockchain Security room on TryHackMe. This challenge mirrors the wallet analysis tasks.',
    },
    flags: [
      { id: 'user', description: 'User flag (found in wallet analysis)', format: 'THM{...}' },
      { id: 'root', description: 'Root flag (found after key recovery)', format: 'THM{...}' }
    ]
  },
  '9': {
    id: '9',
    title: 'Garissa IoT: Device Exploitation',
    difficulty: 'Hard',
    category: 'IoT Security',
    points: 300,
    solved: 12,
    description: 'An IoT device in Garissa has been compromised. Can you exploit it to gain access? This mirrors the IoT Security room on TryHackMe.',
    hints: ['Check for default credentials', 'Look for firmware vulnerabilities', 'Test for network services'],
    files: [
      { name: 'firmware.bin', size: '12.3 MB', href: '/ctf/9-firmware.bin' },
      { name: 'network-scan.txt', size: '1.8 KB', href: '/ctf/9-network-scan.txt' },
    ],
    externalRoom: {
      platform: 'TryHackMe',
      roomId: 'iot-security',
      roomUrl: 'https://tryhackme.com/room/iotsecurity',
      note: 'Complete the IoT Security room on TryHackMe. This challenge mirrors the device exploitation tasks.',
    },
    flags: [
      { id: 'user', description: 'User flag (found after device exploitation)', format: 'THM{...}' },
      { id: 'root', description: 'Root flag (found after privilege escalation)', format: 'THM{...}' }
    ]
  },
  '10': {
    id: '10',
    title: 'Kakamega Cloud: Container Escape',
    difficulty: 'Expert',
    category: 'Cloud Security',
    points: 500,
    solved: 3,
    description: 'A cloud container in Kakamega has been compromised. Can you escape to the host system? This mirrors the Cloud Security room on TryHackMe.',
    hints: ['Check for privileged containers', 'Look for volume mounts', 'Test for kernel vulnerabilities'],
    files: [
      { name: 'docker-compose.yml', size: '2.5 KB', href: '/ctf/10-docker-compose.yml' },
      { name: 'container-info.txt', size: '1.2 KB', href: '/ctf/10-container-info.txt' },
    ],
    externalRoom: {
      platform: 'TryHackMe',
      roomId: 'cloud-security',
      roomUrl: 'https://tryhackme.com/room/cloudsecurity',
      note: 'Complete the Cloud Security room on TryHackMe. This challenge mirrors the container escape tasks.',
    },
    flags: [
      { id: 'user', description: 'User flag (found after container escape)', format: 'THM{...}' },
      { id: 'root', description: 'Root flag (found on host system)', format: 'THM{...}' }
    ]
  }
}

export default function ChallengePage({ params }: { params: { id: string } }) {
  const challenge = CHALLENGES[params.id] || CHALLENGES['1']

  return (
    <div className="pt-20 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-4 py-2 bg-green-500/20 text-green-500 border border-green-500 rounded-full text-sm font-bold">{challenge.difficulty}</span>
            <span className="px-4 py-2 bg-cyber-purple/20 text-cyber-purple border border-cyber-purple rounded-full text-sm font-bold">{challenge.category}</span>
            <div className="flex items-center text-cyber-yellow"><Trophy className="h-4 w-4 mr-1" /><span className="font-bold">{challenge.points} points</span></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{challenge.title}</h1>
          <div className="flex flex-wrap items-center gap-6 text-gray-400">
            <div className="flex items-center"><Users className="h-5 w-5 mr-2" /><span>{challenge.solved} solved</span></div>
            <div className="flex items-center"><Clock className="h-5 w-5 mr-2" /><span>Avg. time: {challenge.difficulty === 'Easy' ? '30 min' : challenge.difficulty === 'Medium' ? '60 min' : challenge.difficulty === 'Hard' ? '90 min' : '120+ min'}</span></div>
          </div>
        </motion.div>

        <CTFChallenge challenge={challenge as any} />
      </div>
    </div>
  )
}

