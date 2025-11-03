'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, Share2, Heart } from 'lucide-react'
import Link from 'next/link'

const articles = {
  '1': {
    title: 'Kenya Ranks #3 in African Cybersecurity Threats: What Businesses Need to Know',
    category: 'News',
    date: '2025-01-15',
    readTime: '5 min',
    author: 'Security Team',
    image: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=1400&auto=format&fit=crop',
    content: `Kenya is now the third most targeted country in Africa for cyber attacks—an uncomfortable milestone driven by rapid digitization, heavy mobile money adoption, and expanding attack surfaces across public and private sectors. Here's what this means, and what leaders can do about it today.

## What’s Driving the Spike
- High mobile/fintech penetration (M‑Pesa, banking apps) creates lucrative targets
- Widespread use of legacy systems and unpatched software in SMEs
- Cloud adoption outpaces governance, creating misconfigurations
- Human factor remains weak: phishing and social engineering dominate

## Top Threats Facing Kenyan Organizations
1) Ransomware-as-a-Service (RaaS)
- SMBs hit hardest—limited backups, weak segmentation
- Typical vectors: credential stuffing, phishing, exposed RDP/SSH
- Business impact: downtime, reputation loss, data theft (double extortion)

2) Business Email Compromise (BEC)
- Invoice fraud using lookalike domains and supplier impersonation
- Poor DMARC/SPF/DKIM adoption increases exposure

3) Cloud Misconfigurations
- Open S3 buckets, public dashboards, weak IAM roles
- Shadow IT adds unmanaged risk

## Sector Snapshot
- Finance/Fintech: phishing + credential stuffing against customers and staff
- Healthcare: data exfiltration and ransomware, weak network segmentation
- Government: phishing and web exploits targeting citizen data systems

## 30/60/90-Day Action Plan
- 0–30 days: enforce MFA, review email security (SPF/DKIM/DMARC), patch critical vulns, test restores
- 30–60 days: EDR rollout, privileged access review, phishing simulations, cloud config audit
- 60–90 days: tabletop IR exercises, network segmentation, vendor risk reviews, join threat intel groups (CIRT‑KE)

## Real-World Scenario: Nairobi Fintech
A startup suffered a ransomware hit via unpatched CMS plugin. Data encrypted, ransom demanded, and leak threats issued. Recovery succeeded due to recent offsite backups and a pre‑defined IR playbook. Lessons: patching and IR readiness are priceless.

## Bottom Line
Threat volume is rising—but so can your resilience. Start with identity controls, email protections, patching, backups, and clear incident playbooks. Security is a continuous practice, not a project.

### Quick Wins Checklist
- MFA on everything
- Verified backups and restore drills
- Email authentication (SPF/DKIM/DMARC) enforced
- Admin accounts reviewed and rotated
- Phishing simulations with localized lures
`,
  },
  '2': {
    title: 'How to Protect Your Startup from Ransomware',
    category: 'Tutorial',
    date: '2025-01-12',
    readTime: '8 min',
    author: 'Security Team',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1400&auto=format&fit=crop',
    content: `Ransomware is a business problem, not just an IT issue. Kenyan startups—lean teams, fast growth, limited budgets—are ideal targets. Here’s a pragmatic, founder‑friendly roadmap that prioritizes impact over expense.

## 1) Stop the Common Entry Points
- Email: Enable SPF, DKIM, DMARC; use an email security filter; train for phishing
- Identity: Enforce MFA on email, VPN, cloud console, billing; block legacy auth
- Remote Access: Disable public RDP/SSH; use VPN or zero‑trust access with device checks
- Vulnerabilities: Patch internet‑facing services weekly; auto‑update SaaS connectors

## 2) Limit Blast Radius with Smart Architecture
- Least privilege: role‑based access, time‑boxed admin rights
- Segmentation: keep production, dev, and backups separate networks/tenants
- SaaS hygiene: remove ex‑employee accounts; rotate tokens and API keys regularly

## 3) Backups that Actually Save You
- 3‑2‑1 rule: 3 copies, 2 media types, 1 offsite/immutable
- Test restores monthly; measure RTO and RPO
- Back up SaaS data (email, docs, code repos) via provider or third‑party

## 4) Detect Fast, Respond Faster
- Deploy endpoint protection/EDR across laptops and servers
- Centralize logs for suspicious sign‑ins and file encryption patterns
- Create a 1‑page IR plan: who decides, who communicates, when to call law enforcement/insurer

## 5) People and Process Win
- 15‑minute monthly drills: phishing spotting, reporting procedure, lost laptop flow
- Vendor risk: ensure your payment, HR, and CRM providers have MFA, logging, and breach SLAs

### Budget‑Friendly Starter Stack
- Identity/MFA, reputable cloud AV/EDR, immutable backups, DMARC enforcement

### Playbook Snapshot (When Hit)
1) Disconnect affected systems
2) Preserve evidence; engage IR
3) Prioritized restore; stakeholder comms

Ransomware thrives on the unprepared. A disciplined, lightweight program beats expensive, unfocused tools every time.

> Tip: Assign an on‑call founder for security. A single accountable owner accelerates decisions when minutes matter.
`,
  },
  '3': {
    title: 'CTF Writeup: Kenyan Banking System Penetration Test',
    category: 'CTF Writeup',
    date: '2025-01-10',
    readTime: '12 min',
    author: 'Security Team',
    image: 'https://images.unsplash.com/photo-1556741533-f6acd6477e87?q=80&w=1400&auto=format&fit=crop',
    content: `This simulated banking system mirrors common flaws we still see in regional platforms. The goal: enumerate, exploit, and responsibly report—while mapping lessons to real‑world controls.

## Reconnaissance
- Subdomains: auth, api, portal; robots.txt hinted at /beta/
- TLS config allowed outdated ciphers; noted but not exploited

## Authentication Weaknesses
- Username enumeration via response timing on /auth/login
- Missing rate limiting enabled credential stuffing
- Password reset revealed whether an email existed

## Web Application Findings
1) IDOR on /api/v1/accounts/{id}: any authenticated user could fetch other users’ balances by iterating IDs. Fix: enforce ownership checks.
2) SQLi in search: q parameter not parameterized; boolean‑based payloads extracted schema. Fix: prepared statements and allowlists.
3) CSRF on funds transfer: missing CSRF token and SameSite cookies allowed silent transfers. Fix: CSRF tokens + SameSite.
4) Weak session cookies: long‑lived, not rotated after privilege change. Fix: short TTLs and rotation.

## API/Auth Hardening
- MFA for high‑risk actions (beneficiary add, large transfer)
- Rate limit by IP, user, and device fingerprint
- Lock accounts on anomalous behavior; step‑up auth when risk spikes

## SDLC Uplift
- Secret linting; SAST/DAST; fuzzing for parsers
- Threat modeling per sprint; abuse case checklists for payments

## Data Protection
- Encrypt PII at rest/in transit; tokenize PANs; redact logs; minimize retention

### Takeaways
The fixes aren’t exotic—they’re disciplined. Identity, authorization, and secure defaults stop most bank‑grade issues before they start.
`,
  },
  '4': {
    title: 'M-Pesa Security: What You Need to Know',
    category: 'Security',
    date: '2025-01-08',
    readTime: '6 min',
    author: 'Security Team',
    image: 'https://images.unsplash.com/photo-1615497001839-b2b3e46b1a3a?q=80&w=1400&auto=format&fit=crop',
    content: `M‑Pesa is essential infrastructure. Fraudsters know this. Most incidents aren’t platform breaches—they’re social engineering, weak device hygiene, or integration mistakes.

## How Users Get Hit
- Social engineering: fake reversal requests, support impersonation, “erroneous” payment scams
- SIM swap: number takeover to reset app access
- Malware: sideloaded APKs stealing SMS/OTP or abusing accessibility

## Merchant/Developer Pitfalls
- Leaked API keys in client apps or repos
- Insecure webhooks (no signature verification/TLS pinning)
- Missing idempotency keys on callbacks

## Protect Yourself
- Lock SIM; enable device PIN/biometrics
- Never share codes; verify callers via official channels
- Only install from official stores; keep OS updated

## Secure Integrations (Teams)
- Use a secrets vault; rotate keys
- Verify webhook signatures; enforce TLS
- Implement idempotency; monitor for anomalies

M‑Pesa’s core is strong. Most risk lives at the edge—users and integrations. Harden there.

> Pro tip: Set transaction alerts with limits. Real‑time visibility is free detection.
`,
  },
  '5': {
    title: 'The Rise of AI-Powered Cyber Attacks in Kenya',
    category: 'Analysis',
    date: '2025-01-05',
    readTime: '10 min',
    author: 'Security Team',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1400&auto=format&fit=crop',
    content: `AI lowers the cost of deception and speeds up exploitation. Kenyan organizations are seeing three trends: hyper‑real social engineering, automated vulnerability discovery, and evasive malware.

## 1) Social Engineering at Scale
- Deepfake voices to rush payments
- Localized phishing authored by LLMs
- Chatbots posing as support to elicit credentials

## 2) Faster Recon and Exploitation
- Automated scanning chains weaponize fresh CVEs
- AI tools generate cleaner payloads faster than patch cycles

## 3) Evasion and Living‑off‑the‑Land
- Polymorphic malware avoiding signatures
- Fileless techniques riding on admin tools

## What to Do Now
- Email defenses + DMARC; sandbox attachments
- Patch continuously; WAF/EDR as virtual shields
- Strong identity (MFA, phishing‑resistant methods)
- Behavioral analytics and tailored awareness on AI lures

## Policy & Talent
- Internal AI usage guardrails; data egress limits
- Exercises simulating AI‑assisted attacks

AI is an amplifier. With fundamentals in place, its advantage shrinks. Without them, it’s a force multiplier for attackers.
`,
  },
  '6': {
    title: 'Kenya Data Protection Act: A Complete Guide',
    category: 'Legal',
    date: '2025-01-03',
    readTime: '15 min',
    author: 'Security Team',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1400&auto=format&fit=crop',
    content: `Kenya’s Data Protection Act (DPA) 2019 and regulations are in active enforcement. Fines, audits, and mandatory breach notifications are real.

## Who Must Comply
- Controllers/processors handling personal data in or about Kenya

## Core Principles
- Lawfulness, fairness, transparency; purpose limitation; minimization; integrity and accountability

## Lawful Bases
- Consent, contract, legal obligation, vital interests, public task, legitimate interests

## Individual Rights
- Access, rectification, erasure, restriction, portability, objection

## Governance
- DPO where required; ROPAs; DPIAs for high‑risk; processor DPAs

## Security & Breach
- Encryption, MFA, logging; notify ODPC and subjects without undue delay

## Cross‑Border Transfers
- Adequacy, SCCs, or explicit consent with risk notice

## 90‑Day Plan
- 0–30: appoint DPO, map data, fix obvious gaps
- 30–60: policies, breach playbook
- 60–90: DPIAs, vendor contracts, training, DSR tests

Compliance builds trust. Do the right basics well, then iterate.
`,
  },
  '7': {
    title: 'Inside Kenya’s SIM Swap Fraud: How to Stay Safe',
    category: 'Security',
    date: '2025-01-18',
    readTime: '7 min',
    author: 'Security Team',
    image: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=1400&auto=format&fit=crop',
    content: `SIM swap fraud lets attackers hijack your number—intercepting OTPs, resetting accounts, and draining wallets.

## How Attacks Work
- Social engineering at telco shops or via insider collusion
- Phishing gathers ID numbers, dates of birth, or M‑Pesa clues
- Port‑out or replacement SIM activated; victim loses signal

## Early Warning Signs
- Sudden signal loss
- Account alerts for password resets or new device logins

## Prevention
- Set a strong SIM PIN and account PIN with your carrier
- Reduce oversharing of personal data and KYC photos
- Use app‑based authenticators where possible
- Add extra verification flags with your provider

## If Compromised
- Call your carrier to freeze the line immediately
- Reset credentials for email, banking, and M‑Pesa
- Review transactions and file reports promptly

SIM swaps target identity weak points. Strong PINs, cautious sharing, and fast response are your best defense.
`,
  },
  '8': {
    title: 'Bug Bounty in Kenya: Getting Started the Right Way',
    category: 'Tutorial',
    date: '2025-01-14',
    readTime: '9 min',
    author: 'Security Team',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1400&auto=format&fit=crop',
    content: `Bug bounty is a structured way to learn, earn, and help organizations secure systems—if done ethically.

## Foundations
- Practice in legal labs: Hack The Box, PortSwigger Academy, OWASP Juice Shop
- Learn scopes and rules; never test systems without permission

## Recon First
- Asset discovery (subdomains, IPs), tech fingerprinting, sensitive endpoints
- Read prior writeups to avoid noisy testing

## High‑Value Findings
- IDORs in APIs, auth bypass, SSRF, stored XSS, logic flaws

## Reporting Like a Pro
- Clear steps to reproduce, impact, affected endpoints, and remediation ideas
- Proofs that are safe and legal; no data exfiltration

## Kenya Context
- Focus on fintech, e‑commerce, logistics, gov portals—common web and API integrations
- Join local communities for mentorship and responsible disclosure culture

Bug bounty rewards discipline and empathy. Think like an attacker, act like a partner.
`,
  },
  '9': {
    title: 'SOC on a Budget: Blueprint for Kenyan SMEs',
    category: 'Analysis',
    date: '2025-01-11',
    readTime: '8 min',
    author: 'Security Team',
    image: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?q=80&w=1400&auto=format&fit=crop',
    content: `You don’t need a 24/7 war room to get real detection and response.

## Core Outcomes
- Visibility: logs from identity, endpoints, perimeter, and cloud
- Detection: rules for brute force, impossible travel, privilege abuse, encryption spikes
- Response: documented playbooks and on‑call responsibilities

## Stack Suggestions
- Centralized logging (lightweight SIEM or cloud‑native)
- EDR on endpoints; alerts routed to chat with ticketing
- WAF for web apps; threat intel feeds for enrichment

## Process
- Weekly triage; monthly tune‑up of rules
- Tabletop exercises; metrics for MTTD/MTTR

For SMEs, consistency beats complexity. Start small, automate, and iterate.
`,
  },
  '10': {
    title: 'CTF Writeup: Nairobi Smart Parking Vulnerabilities',
    category: 'CTF Writeup',
    date: '2025-01-07',
    readTime: '11 min',
    author: 'Security Team',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1400&auto=format&fit=crop',
    content: `This challenge emulates smart city pitfalls seen in parking systems.

## Findings
- Exposed admin interface with default credentials
- Insecure API allowing tariff manipulation via IDOR
- MQTT broker misconfigured without auth; data leakage

## Mitigations
- Enforce auth and RBAC on management UIs
- Strict object ownership checks across APIs
- Broker authentication, TLS, and topic ACLs

City tech must meet enterprise security standards—especially where payments and safety intersect.
`,
  },
  '11': {
    title: 'Global DeFi & Blockchain Security: 2025 Threats to Watch',
    category: 'International',
    date: '2025-01-21',
    readTime: '9 min',
    author: 'Security Team',
    image: 'https://images.unsplash.com/photo-1640340434866-8883c291c1b2?q=80&w=1400&auto=format&fit=crop',
    content: `Billions in DeFi losses have reshaped blockchain security priorities. Cross-chain bridges, oracle manipulation, and governance attacks are the new battlegrounds.

## Key Risks
- Bridge exploits via message validation flaws
- Economic attacks: oracle price manipulation and flash loans
- Governance takeovers through token concentration and voter apathy

## Defenses
- Formal verification + audits with bug bounty follow-up
- Rate limits and circuit breakers for abnormal flows
- Decentralized oracles with data diversity and slashing

## 2025 Outlook
- More regulation and mandatory disclosures
- Blue-team automation to detect MEV-style anomalies in real time

Security isn’t just code—it’s economics and governance.
`,
  },
  '12': {
    title: 'Post-Quantum Cryptography: Preparing for a World After RSA',
    category: 'International',
    date: '2025-01-20',
    readTime: '10 min',
    author: 'Security Team',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1400&auto=format&fit=crop',
    content: `Quantum threats turn long-term confidentiality into a ticking clock. Harvest-now-decrypt-later campaigns are already collecting encrypted traffic.

## What’s Changing
- NIST is standardizing PQC (e.g., CRYSTALS-Kyber for KEM)
- Hybrid TLS handshakes pair classical + PQC for safer migration

## Migration Plan
- Inventory crypto usage: TLS, data at rest, code signing, VPNs
- Prioritize long-lived secrets (PII, health, legal, IP)
- Test PQC libraries; monitor performance and message sizes

Don’t wait for a quantum headline—plan, test, and phase in now.
`,
  },
  '13': {
    title: 'AI-Driven Phishing Goes Global: Defenses That Actually Work',
    category: 'International',
    date: '2025-01-19',
    readTime: '8 min',
    author: 'Security Team',
    image: 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?q=80&w=1400&auto=format&fit=crop',
    content: `LLMs produce fluent, localized lures at scale; voice cloning closes the deal. The solution blends tech and training.

## Attacker Playbook
- Personalization via breached data + OSINT
- Deepfake voice to escalate urgency
- Chat assistants to persist in conversation

## Defenses
- DMARC enforcement; attachment sandboxing
- Out-of-band verification for payments/urgent requests
- Role-based anti-phishing training with real examples

Humans are targets—and defenders. Equip them.
`,
  },
}

function cleanContent(raw: string): string {
  return raw
    .split('\n')
    .map((line) => line.replace(/^\s*#{1,6}\s*/g, '')) // remove markdown headings
    .join('\n')
}

function getQuote(category: string): { text: string; author: string } {
  switch (category) {
    case 'Security':
      return { text: 'Security is not a product, but a process.', author: 'Bruce Schneier' }
    case 'Analysis':
      return { text: 'In God we trust; all others must bring data.', author: 'W. Edwards Deming' }
    case 'Tutorial':
      return { text: 'The only way to learn a new programming language is by writing programs in it.', author: 'Dennis Ritchie' }
    case 'CTF Writeup':
      return { text: 'The most secure system is one that does nothing.', author: 'Unknown' }
    case 'International':
      return { text: 'The future is already here — it’s just not evenly distributed.', author: 'William Gibson' }
    default:
      return { text: 'Simplicity is the soul of efficiency.', author: 'Austin Freeman' }
  }
}

function getCitations(category: string): { title: string; url: string }[] {
  switch (category) {
    case 'Security':
      return [
        { title: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/' },
        { title: 'CISA Alerts & Guidance', url: 'https://www.cisa.gov/' },
        { title: 'NCSC Phishing Guidance', url: 'https://www.ncsc.gov.uk/collection/phishing-scams' },
      ]
    case 'Tutorial':
      return [
        { title: 'NIST Cybersecurity Framework', url: 'https://www.nist.gov/cyberframework' },
        { title: 'Microsoft Security Response Center', url: 'https://msrc.microsoft.com/' },
        { title: 'Google Cloud Security Foundations', url: 'https://cloud.google.com/architecture/security-foundations' },
      ]
    case 'Analysis':
      return [
        { title: 'Verizon DBIR', url: 'https://www.verizon.com/business/resources/reports/dbir/' },
        { title: 'ENISA Threat Landscape', url: 'https://www.enisa.europa.eu/topics/threat-risk-management/threats-and-trends' },
        { title: 'MITRE ATT&CK', url: 'https://attack.mitre.org/' },
      ]
    case 'Legal':
      return [
        { title: 'OECD Privacy Guidelines', url: 'https://www.oecd.org/sti/ieconomy/privacy-guidelines.htm' },
        { title: 'EDPB Guidelines', url: 'https://edpb.europa.eu/' },
        { title: 'NIST Privacy Framework', url: 'https://www.nist.gov/privacy-framework' },
      ]
    case 'CTF Writeup':
      return [
        { title: 'TryHackMe Learn', url: 'https://tryhackme.com/paths' },
        { title: 'Hack The Box Academy', url: 'https://academy.hackthebox.com/' },
        { title: 'PortSwigger Web Security Academy', url: 'https://portswigger.net/web-security' },
      ]
    case 'International':
      return [
        { title: 'NIST PQC Project', url: 'https://csrc.nist.gov/projects/post-quantum-cryptography' },
        { title: 'ChainSecurity Research', url: 'https://chainsecurity.com/research/' },
        { title: 'Ethereum Security', url: 'https://consensys.github.io/smart-contract-best-practices/' },
      ]
    default:
      return [
        { title: 'CIS Critical Security Controls', url: 'https://www.cisecurity.org/controls' },
      ]
  }
}

function parseReadMinutes(readTime: string): number {
  const n = parseInt(readTime, 10)
  return Number.isFinite(n) ? n : 6
}

function getAppendixSections(category: string, readTime: string): string[] {
  const minutes = parseReadMinutes(readTime)
  const base: string[] = []
  if (minutes >= 7) {
    base.push(`## Key Takeaways\n- Prioritize fundamentals; they reduce the majority of risk\n- Measure outcomes (detection time, restore time) rather than activity\n- Treat security as a product with owners, roadmap, and UX`)
  }
  if (minutes >= 9) {
    base.push(`## Case Study (Condensed)\n- Context: real-world environment with common constraints\n- Issue: gap in identity, logging, or review\n- Fix: minimal viable control that meaningfully reduces risk`)
  }
  if (minutes >= 11) {
    base.push(`## Checklist\n- Identity hardened (MFA, least privilege, rotation)\n- Exposure minimized (patching, WAF, backups)\n- Telemetry actionable (alerts with playbooks)\n- Exercises recurring (tabletops, red/blue drills)`)
  }
  if (minutes >= 13) {
    base.push(`## Further Improvements\n- Automate toil before scaling headcount\n- Codify standards (baseline configs, policy-as-code)\n- Share lessons learned internally to compound wins`)
  }
  return base
}

export default function BlogPost({ params }: { params: { id: string } }) {
  const [currentId, setCurrentId] = useState<string>(params.id)
  const post = useMemo(() => articles[currentId as keyof typeof articles] || articles['1'], [currentId])

  const [liked, setLiked] = useState<boolean>(false)
  const [shareOpen, setShareOpen] = useState<boolean>(false)
  const [shareUrl, setShareUrl] = useState<string>('')
  const [showRelated, setShowRelated] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.origin + `/blog/${currentId}`)
    }
  }, [currentId])

  useEffect(() => {
    setLiked(false)
    setShareOpen(false)
    setShowRelated(false)
  }, [currentId])

  const shareLinks = useMemo(() => {
    const text = encodeURIComponent(post.title)
    const url = encodeURIComponent(shareUrl)
    return {
      x: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      whatsapp: `https://api.whatsapp.com/send?text=${text}%20${url}`,
    }
  }, [post.title, shareUrl])

  const related = useMemo(() => {
    return Object.entries(articles)
      .filter(([id, a]) => id !== currentId && a.category === post.category)
      .map(([id, a]) => ({ id, title: a.title, date: a.date }))
  }, [currentId, post.category])

  const quote = getQuote(post.category)
  const citations = getCitations(post.category)
  const cover = post.image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop'
  const appendix = getAppendixSections(post.category, post.readTime)
  const formatStableDate = (iso: string) => {
    const d = new Date(iso)
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${day}/${m}/${y}`
  }

  return (
    <div className="pt-20 pb-20">
      <article className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="px-4 py-2 bg-cyber-blue/20 text-cyber-blue rounded-full text-sm font-bold">
              {post.category}
            </span>
            <div className="flex items-center text-gray-500 text-sm">
              <Clock className="h-4 w-4 mr-1" />
              {post.readTime}
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              {formatStableDate(post.date)}
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between border-t border-b border-cyber-green/20 py-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-cyber-green rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-black" />
              </div>
              <div>
                <div className="font-bold italic">Written by: Philip C. Ndolo</div>
                <div className="text-sm text-gray-500">{formatStableDate(post.date)}</div>
              </div>
            </div>
            <div className="relative flex items-center space-x-3">
              <button
                className={`p-2 hover:bg-cyber-darkGray rounded-lg transition-colors ${liked ? 'text-red-500' : 'text-gray-400'}`}
                onClick={() => setLiked((v) => !v)}
                aria-label="Like"
              >
                <Heart className="h-5 w-5" />
              </button>
              <button
                className="p-2 hover:bg-cyber-darkGray rounded-lg transition-colors"
                onClick={() => setShareOpen((o) => !o)}
                aria-label="Share"
              >
                <Share2 className="h-5 w-5 text-gray-400" />
              </button>
              {shareOpen && (
                <div className="absolute z-10 right-0 top-10 bg-cyber-darker border border-cyber-green/20 rounded-lg p-3 flex flex-wrap gap-3 max-w-[min(90vw,320px)]">
                  <a href={shareLinks.x} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-cyber-green">X</a>
                  <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-cyber-green">LinkedIn</a>
                  <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-cyber-green">Facebook</a>
                  <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-cyber-green">WhatsApp</a>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Cover Image */}
        <div className="mb-8">
          <img src={cover} alt={post.title} className="w-full h-64 md:h-96 object-cover rounded-lg border border-cyber-green/20" />
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          <div className="cyber-card p-8 space-y-8">
            <blockquote className="italic text-gray-300 border-l-4 border-cyber-green pl-4">
              “{quote.text}” — <span className="text-cyber-green">{quote.author}</span>
            </blockquote>
            <div className="blog-content text-gray-300 leading-relaxed whitespace-pre-wrap">
              {cleanContent(post.content)}
            </div>
            {appendix.length > 0 && (
              <div className="blog-appendix text-gray-300 leading-relaxed whitespace-pre-wrap space-y-6">
                {appendix.map((sec, i) => (
                  <div key={i}>{sec}</div>
                ))}
              </div>
            )}
            <div className="bg-cyber-darker/60 border border-cyber-green/20 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-2">Citations & Further Reading</div>
              <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                {citations.map((c) => (
                  <li key={c.url}>
                    <a className="text-cyber-blue hover:underline" href={c.url} target="_blank" rel="noopener noreferrer">{c.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Related Articles Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <button
            className="px-4 py-2 border border-cyber-green/40 rounded-lg text-cyber-green hover:bg-cyber-green/10 transition-colors"
            onClick={() => setShowRelated((s) => !s)}
          >
            Related Articles
          </button>

          {showRelated && (
            <div className="mt-6 space-y-3">
              {related.length === 0 && (
                <div className="text-gray-400">No related articles available.</div>
              )}
              {related.map((r) => (
                <div key={r.id} className="cyber-card p-4 flex items-center justify-between">
                  <div>
                    <div className="font-bold">{r.title}</div>
                    <div className="text-sm text-gray-500">{formatStableDate(r.date)}</div>
                  </div>
                  <Link href={`/blog/${r.id}`} className="px-4 py-2 border border-cyber-green/40 rounded-lg text-cyber-green hover:bg-cyber-green/10 transition-colors">
                    Read
                  </Link>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </article>
    </div>
  )
}

