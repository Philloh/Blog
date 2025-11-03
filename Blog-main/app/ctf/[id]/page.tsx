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
    title: 'Web Login Woes',
    difficulty: 'Easy',
    category: 'Web Security',
    points: 100,
    solved: 45,
    description: 'A classic PHP login hides more than meets the eye. Enumerate, view source, and think about client-side logic vs server-side truth. This challenge is linked to BasicPentesting on TryHackMe, which covers web enumeration, directory brute-forcing, SQL injection, and privilege escalation.',
    hints: ['Enumerate directories and files', 'View page source', 'Check for SQL injection vulnerabilities', 'Try common credentials'],
    files: [],
    externalRoom: {
      platform: 'TryHackMe',
      roomId: 'basicpentestingj3rks',
      roomUrl: 'https://tryhackme.com/room/basicpentestingj3rks',
      note: 'Complete the BasicPentesting room on TryHackMe for hands-on web security practice. This room covers directory enumeration, SQL injection, password cracking, and privilege escalation. The flags you find in BasicPentesting will work here.',
    },
    // Single-flag TryHackMe-style challenge
  },
  '2': {
    id: '2',
    title: 'Payment API Security Audit',
    difficulty: 'Medium',
    category: 'Mobile Security',
    points: 250,
    solved: 12,
    description: 'A payment gateway API has been discovered with multiple security vulnerabilities. Can you audit the API endpoints and identify the flaws? This challenge is linked to the UltraTech room on TryHackMe, which focuses on API security, directory enumeration, and reverse engineering.',
    hints: ['Enumerate API endpoints', 'Check for insecure direct object references', 'Look for authentication bypasses', 'Examine API documentation carefully'],
    files: [],
    externalRoom: {
      platform: 'HackTheBox',
      roomId: 'Postman',
      roomUrl: 'https://app.hackthebox.com/machines/Postman',
      note: 'Complete the Postman machine on HackTheBox for hands-on API token and endpoint exploitation. The flags you find in Postman will work here.',
    },
    flags: [
      { id: 'user', description: 'User flag (found after initial API exploitation)', format: 'HTB{...}' },
      { id: 'root', description: 'Root flag (found after privilege escalation)', format: 'HTB{...}' }
    ]
  },
  '3': {
    id: '3',
    title: 'Enterprise Portal SQLi',
    difficulty: 'Hard',
    category: 'Database Security',
    points: 500,
    solved: 3,
    description: 'A government portal has a critical SQL injection vulnerability. Can you exploit it to extract sensitive data and gain system access? This challenge is linked to Pickle Rick on TryHackMe, which focuses on web enumeration, SQL injection, command injection, and privilege escalation.',
    hints: ['Enumerate directories and subdomains', 'Find SQL injection points', 'Use SQLMap or manual SQL injection', 'Check for file inclusion vulnerabilities'],
    files: [],
    externalRoom: {
      platform: 'HackTheBox',
      roomId: 'Vaccine',
      roomUrl: 'https://app.hackthebox.com/machines/Vaccine',
      note: 'Complete the Vaccine machine on HackTheBox for hands-on SQL injection and web exploitation. The flags you find in Vaccine will work here.',
    },
    flags: [
      { id: 'user', description: 'User flag (found after SQL injection)', format: 'HTB{...}' },
      { id: 'root', description: 'Root flag (found after privilege escalation)', format: 'HTB{...}' }
    ]
  },
  '4': {
    id: '4',
    title: 'ISP Network Traffic Analysis',
    difficulty: 'Medium',
    category: 'Network Security',
    points: 300,
    solved: 8,
    description: 'A network capture from Safaricom shows suspicious activity. Can you analyze the packets using Wireshark and identify the hidden flag? This challenge is linked to Snort Challenge - The Basics on TryHackMe, which covers network traffic analysis, packet inspection, and intrusion detection.',
    hints: ['Use Wireshark to analyze the PCAP file', 'Follow TCP streams', 'Look for HTTP traffic', 'Check for file transfers', 'Examine DNS queries'],
    files: [],
    externalRoom: {
      platform: 'TryHackMe',
      roomId: 'snortchallenges1',
      roomUrl: 'https://tryhackme.com/room/snortchallenges1',
      note: 'Complete the Snort Challenge - The Basics room on TryHackMe for hands-on network traffic analysis practice. This room covers packet analysis, protocol identification, and intrusion detection. The flag you find in Snort Challenge will work here.',
    },
    // Single-flag TryHackMe-style challenge
  },
  '5': {
    id: '5',
    title: 'Banking App Reverse Engineering',
    difficulty: 'Hard',
    category: 'Reverse Engineering',
    points: 450,
    solved: 5,
    description: 'A mobile banking app APK has been discovered. Can you reverse engineer it using JADX, analyze the code, and extract the hidden flag? This challenge is linked to Android App on TryHackMe, which covers APK decompilation, static analysis, and mobile security testing.',
    hints: ['Use JADX or apktool to decompile the APK', 'Look for hardcoded strings and credentials', 'Analyze the MainActivity and other classes', 'Check for insecure data storage', 'Look for API endpoints and keys'],
    files: [],
    externalRoom: {
      platform: 'TryHackMe',
      roomId: 'androidapp',
      roomUrl: 'https://tryhackme.com/room/androidapp',
      note: 'Complete the Android App room on TryHackMe for hands-on mobile reverse engineering practice. This room covers APK decompilation, static code analysis, and finding hardcoded credentials. The flag you find in Android App will work here.',
    },
    // Single-flag TryHackMe-style challenge
  },
  '6': {
    id: '6',
    title: 'Airline Booking System XSS',
    difficulty: 'Easy',
    category: 'Web Security',
    points: 150,
    solved: 28,
    description: 'A booking system has a cross-site scripting (XSS) vulnerability. Can you craft a payload to exploit it and steal cookies or execute malicious scripts? This challenge is linked to the XSS room on TryHackMe, which covers reflected XSS, stored XSS, DOM-based XSS, and bypassing filters.',
    hints: ['Test for reflected XSS in search forms', 'Check for stored XSS in comment fields', 'Try different encoding techniques', 'Bypass XSS filters using event handlers', 'Test with alert(), prompt(), or document.cookie'],
    files: [],
    externalRoom: {
      platform: 'TryHackMe',
      roomId: 'xss',
      roomUrl: 'https://tryhackme.com/room/xss',
      note: 'Complete the XSS room on TryHackMe for hands-on cross-site scripting practice. This room covers all types of XSS vulnerabilities, filter evasion, and exploitation techniques. The flag you find in the XSS room will work here.',
    },
    // Single-flag TryHackMe-style challenge
  },
  '7': {
    id: '7',
    title: 'Tax Portal CSRF Attack',
    difficulty: 'Medium',
    category: 'Web Security',
    points: 275,
    solved: 15,
    description: 'A tax portal has a Cross-Site Request Forgery (CSRF) vulnerability. Can you craft a malicious HTML page that performs unauthorized actions when a logged-in admin visits it? This challenge is linked to Web Fundamentals on TryHackMe, which covers CSRF attacks, session management, and web security basics.',
    hints: ['Identify state-changing operations', 'Check if CSRF tokens are implemented', 'Create an HTML form that submits to the target endpoint', 'Host the malicious HTML page and trick admin to visit', 'Use auto-submit forms or image tags'],
    files: [],
    externalRoom: {
      platform: 'TryHackMe',
      roomId: 'webfundamentals',
      roomUrl: 'https://tryhackme.com/room/webfundamentals',
      note: 'Complete the Web Fundamentals room on TryHackMe for hands-on CSRF practice. This room covers web security basics including CSRF, session management, and authentication. The flag you find in Web Fundamentals will work here.',
    },
    // Single-flag TryHackMe-style challenge
  },
  '8': {
    id: '8',
    title: 'Cryptocurrency Wallet Forensics',
    difficulty: 'Expert',
    category: 'Cryptography',
    points: 750,
    solved: 1,
    description: 'An encrypted wallet file has been discovered. Can you break the encryption and recover the hidden flag? This challenge is linked to Encryption - Crypto 101 on TryHackMe, which covers encryption algorithms, hashing, symmetric/asymmetric cryptography, and crypto attacks.',
    hints: ['Identify the encryption algorithm used', 'Look for weak passwords or keys', 'Try dictionary attacks on encrypted files', 'Analyze the ciphertext for patterns', 'Check if common encryption tools were used'],
    files: [],
    externalRoom: {
      platform: 'TryHackMe',
      roomId: 'encryptioncrypto101',
      roomUrl: 'https://tryhackme.com/room/encryptioncrypto101',
      note: 'Complete the Encryption - Crypto 101 room on TryHackMe for hands-on cryptography practice. This room covers encryption fundamentals, common algorithms, and crypto attacks. The flag you find in Encryption - Crypto 101 will work here.',
    },
    // Single-flag TryHackMe-style challenge
  },
  '9': {
    id: '9',
    title: 'IoT Device Exploitation',
    difficulty: 'Hard',
    category: 'IoT Security',
    points: 300,
    solved: 12,
    description: 'An IoT device in Garissa has been compromised. Can you exploit it to gain access? This mirrors the IoT Security room on TryHackMe.',
    hints: ['Check for default credentials', 'Look for firmware vulnerabilities', 'Test for network services'],
    files: [],
    externalRoom: {
      platform: 'TryHackMe',
      roomId: 'iot-security',
      roomUrl: 'https://tryhackme.com/room/iotsecurity',
      note: 'Complete the IoT Security room on TryHackMe. This challenge mirrors the device exploitation tasks.',
    },
    // Single-flag TryHackMe-style challenge
  },
  '10': {
    id: '10',
    title: 'Cloud Container Escape',
    difficulty: 'Expert',
    category: 'Cloud Security',
    points: 500,
    solved: 3,
    description: 'A cloud container in Kakamega has been compromised. Can you escape to the host system? This mirrors the Cloud Security room on TryHackMe.',
    hints: ['Check for privileged containers', 'Look for volume mounts', 'Test for kernel vulnerabilities'],
    files: [],
    externalRoom: {
      platform: 'HackTheBox',
      roomId: 'Registry',
      roomUrl: 'https://app.hackthebox.com/machines/Registry',
      note: 'Complete the Registry machine on HackTheBox for hands-on Docker and registry exploitation. The flags you find in Registry will work here.',
    },
    flags: [
      { id: 'user', description: 'User flag (found after container escape)', format: 'HTB{...}' },
      { id: 'root', description: 'Root flag (found on host system)', format: 'HTB{...}' }
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

