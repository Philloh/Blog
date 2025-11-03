'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Terminal, Code, Lock, Flag, CheckCircle, XCircle, Download, Copy, ChevronRight, Share2, Award, ExternalLink, Play } from 'lucide-react'

interface Challenge {
  id: string
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert'
  category: string
  points: number
  solved: number
  description: string
  hints?: string[]
  files?: { name: string; size: string; href?: string }[]
  roomIp?: string
  externalRoom?: {
    platform: 'TryHackMe' | 'HackTheBox'
    roomId: string
    roomUrl: string
    note: string
  }
  flags?: { id: string; description: string; format: string }[]
}

interface Props {
  challenge: Challenge
}

export default function CTFChallenge({ challenge }: Props) {
  const [activeTab, setActiveTab] = useState<'description' | 'files' | 'terminal' | 'hints' | 'platform'>('description')
  const [flag, setFlag] = useState('')
  const [flags, setFlags] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState<boolean | null>(null)
  const [submissionResults, setSubmissionResults] = useState<Record<string, { success: boolean; message: string }>>({})
  const [submitting, setSubmitting] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const [terminalOutput, setTerminalOutput] = useState('Ready. Type commands to interact with the challenge...')
  const [terminalHistory, setTerminalHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number>(-1)
  const [inputValue, setInputValue] = useState<string>('')
  const [fileCache, setFileCache] = useState<Record<string, string>>({})
  const [cwd, setCwd] = useState<string>('/')
  const [shareOpen, setShareOpen] = useState(false)
  const [shareUrl, setShareUrl] = useState('')
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.origin + `/ctf/${challenge.id}`)
      const done = window.localStorage.getItem(`ctf_done_${challenge.id}`) === '1'
      setCompleted(done)
    }
  }, [challenge.id])

  const normalizePath = (name: string) => name.replace(/\\+/g, '/')
  const listFiles = () => (challenge.files || []).map((f) => f.name).join('\n') || 'No files provided'

  const getFile = (name: string) => {
    const files = challenge.files || []
    const exact = files.find(f => f.name === name)
    if (exact) return exact
    // try basename match
    const base = name.split('/').pop()
    return files.find(f => f.name.endsWith(`/${base}`) || f.name === base)
  }

  const fetchFileContent = async (name: string) => {
    const key = normalizePath(name)
    if (fileCache[key]) return fileCache[key]
    const f = getFile(name)
    if (!f || !f.href) throw new Error('file-not-found')
    const res = await fetch(f.href)
    if (!res.ok) throw new Error('fetch-failed')
    const text = await res.text()
    setFileCache(prev => ({ ...prev, [key]: text }))
    return text
  }

  const toUint8 = (text: string) => new TextEncoder().encode(text)
  const fromUint8 = (arr: Uint8Array) => new TextDecoder().decode(arr)
  const toHex = (arr: Uint8Array) => Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join(' ')
  const hashText = async (algo: 'SHA-256' | 'SHA-1' | 'MD5', text: string) => {
    // MD5 not supported by SubtleCrypto; simulate via fallback to SHA-1 tag with note
    if (algo === 'MD5') return 'md5: not available in browser SubtleCrypto'
    const data = toUint8(text)
    const buf = await crypto.subtle.digest(algo, data)
    const hashArr = new Uint8Array(buf)
    return Array.from(hashArr).map(b => b.toString(16).padStart(2, '0')).join('')
  }

  const runBuiltin = async (args: string[]): Promise<string> => {
    const cmd = (args[0] || '').toLowerCase()
    if (cmd === 'help') {
      return [
        'Available commands:',
        '  ls                           List available files',
        '  cat <file>                   Print file contents',
        '  grep <pat> <file>            Search pattern in file (regex)',
        '  head [-n N] <file>           First N lines (default 10)',
        '  tail [-n N] <file>           Last N lines (default 10)',
        '  strings <file>               Extract printable strings',
        '  base64 [-d] <file>           Encode or decode file',
        '  xxd <file>                   Hexdump of file (text)',
        '  sha256 <file>                SHA-256 hash of file',
        '  sha1 <file>                  SHA-1 hash of file',
        '  wc [-l|-c] <file>            Count lines/bytes',
        '  echo <text>                  Print text',
        '  ping <host>                  Measure reachability (simulated)',
        '  curl <url>                   Fetch URL (CORS dependent)',
        '  ip                           Show room or platform info',
        '  clear                        Clear the terminal',
        '  help                         Show this help',
      ].join('\n')
    }
    if (cmd === 'clear') {
      setTerminalHistory([])
      return ''
    }
    if (cmd === 'ip') {
      return challenge.roomIp || (challenge.externalRoom ? `External platform: ${challenge.externalRoom.platform}` : 'Room IP will be available during events')
    }
    if (cmd === 'ls') {
      return listFiles()
    }
    if (cmd === 'cat') {
      if (args.length < 2) return 'Usage: cat <file>'
      try {
        const content = await fetchFileContent(args.slice(1).join(' '))
        return content
      } catch (e: any) {
        if (e?.message === 'file-not-found') return 'cat: file not found'
        return 'cat: unable to read file'
      }
    }
    if (cmd === 'head' || cmd === 'tail') {
      if (args.length < 2) return `Usage: ${cmd} [-n N] <file>`
      let n = 10
      let idx = 1
      if (args[1] === '-n' && args[2]) { n = Math.max(1, parseInt(args[2], 10) || 10); idx = 3 }
      const file = args.slice(idx).join(' ')
      try {
        const content = await fetchFileContent(file)
        const lines = content.split(/\r?\n/)
        return cmd === 'head' ? lines.slice(0, n).join('\n') : lines.slice(-n).join('\n')
      } catch {
        return `${cmd}: unable to read file`
      }
    }
    if (cmd === 'strings') {
      if (args.length < 2) return 'Usage: strings <file>'
      try {
        const content = await fetchFileContent(args.slice(1).join(' '))
        const matches = content.match(/[\x20-\x7E]{4,}/g) || []
        return matches.join('\n')
      } catch {
        return 'strings: unable to read file'
      }
    }
    if (cmd === 'base64') {
      if (args.length < 2) return 'Usage: base64 [-d] <file>'
      const decode = args[1] === '-d'
      const file = decode ? args.slice(2).join(' ') : args.slice(1).join(' ')
      try {
        const content = await fetchFileContent(file)
        if (decode) {
          try {
            const decoded = atob(content.trim())
            return decoded
          } catch { return 'base64: invalid input' }
        } else {
          return btoa(content)
        }
      } catch {
        return 'base64: unable to read file'
      }
    }
    if (cmd === 'xxd') {
      if (args.length < 2) return 'Usage: xxd <file>'
      try {
        const content = await fetchFileContent(args.slice(1).join(' '))
        const bytes = toUint8(content)
        const lines: string[] = []
        for (let i = 0; i < bytes.length; i += 16) {
          const chunk = bytes.slice(i, i + 16)
          const hex = Array.from(chunk).map(b => b.toString(16).padStart(2, '0')).join(' ')
          const ascii = Array.from(chunk).map(b => (b >= 32 && b <= 126 ? String.fromCharCode(b) : '.')).join('')
          lines.push(`${i.toString(16).padStart(8, '0')}: ${hex.padEnd(16*3-1, ' ')}  ${ascii}`)
        }
        return lines.join('\n')
      } catch {
        return 'xxd: unable to read file'
      }
    }
    if (cmd === 'sha256' || cmd === 'sha1' || cmd === 'md5') {
      if (args.length < 2) return `Usage: ${cmd} <file>`
      try {
        const content = await fetchFileContent(args.slice(1).join(' '))
        const algo = cmd === 'sha256' ? 'SHA-256' : cmd === 'sha1' ? 'SHA-1' : 'MD5'
        const digest = await hashText(algo as any, content)
        return `${digest}  ${args.slice(1).join(' ')}`
      } catch {
        return `${cmd}: unable to read file`
      }
    }
    if (cmd === 'wc') {
      if (args.length < 2) return 'Usage: wc [-l|-c] <file>'
      const mode = ['-l','-c'].includes(args[1]) ? args[1] : null
      const file = mode ? args.slice(2).join(' ') : args.slice(1).join(' ')
      try {
        const content = await fetchFileContent(file)
        if (mode === '-l') return `${content.split(/\r?\n/).length} ${file}`
        if (mode === '-c') return `${toUint8(content).length} ${file}`
        return `${toUint8(content).length} ${content.split(/\r?\n/).length} ${file}`
      } catch {
        return 'wc: unable to read file'
      }
    }
    if (cmd === 'echo') {
      return args.slice(1).join(' ')
    }
    if (cmd === 'ping') {
      if (args.length < 2) return 'Usage: ping <host>'
      const host = args[1]
      const attempts = 4
      const lines: string[] = []
      const tryFetch = async () => {
        const url = host.startsWith('http') ? host : `https://${host}`
        const t0 = performance.now()
        try {
          await Promise.race([
            fetch(url, { mode: 'no-cors' }),
            new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 2000))
          ])
          const dt = Math.round(performance.now() - t0)
          return dt
        } catch {
          return -1
        }
      }
      for (let i = 0; i < attempts; i++) {
        // eslint-disable-next-line no-await-in-loop
        const ms = await tryFetch()
        if (ms >= 0) lines.push(`Reply from ${host}: time=${ms}ms`) 
        else lines.push(`Request to ${host} timed out (browser/CORS). Simulated time=${Math.floor(20+Math.random()*60)}ms`)
      }
      return lines.join('\n')
    }
    if (cmd === 'curl') {
      if (args.length < 2) return 'Usage: curl <url>'
      const url = args[1]
      try {
        const res = await fetch(url)
        const text = await res.text()
        const body = text.length > 2048 ? text.slice(0, 2048) + '\n... [truncated]' : text
        return [`HTTP/${res.headers.get('via') ? '' : ''}${res.status}`, body].join('\n')
      } catch {
        return 'curl: failed (likely CORS in browser)'
      }
    }
    if (cmd === 'grep') {
      if (args.length < 3) return 'Usage: grep <pattern> <file>'
      const pattern = args[1]
      const file = args.slice(2).join(' ')
      try {
        const content = await fetchFileContent(file)
        const lines = content.split(/\r?\n/)
        const rx = new RegExp(pattern)
        const out = lines.filter(l => rx.test(l)).join('\n')
        return out || ''
      } catch (e: any) {
        if (e?.message === 'file-not-found') return 'grep: file not found'
        return 'grep: unable to read file'
      }
    }
    return `Command not found: ${args[0]}`
  }

  const runLine = async (line: string) => {
    const trimmed = line.trim()
    if (!trimmed) return
    // support single pipe: cmd1 | cmd2 (only grep | cat minimal support)
    if (trimmed.includes('|')) {
      const [left, right] = trimmed.split('|').map(s => s.trim())
      // execute left
      const leftArgs = left.split(/\s+/)
      let leftOut = await runBuiltin(leftArgs)
      // only support piping into grep as stdin content
      const rightArgs = right.split(/\s+/)
      if (rightArgs[0].toLowerCase() === 'grep' && rightArgs.length >= 2) {
        const rx = new RegExp(rightArgs[1])
        const out = (leftOut || '').split(/\r?\n/).filter(l => rx.test(l)).join('\n')
        return out
      }
      return `pipe: unsupported combination`
    }
    const args = trimmed.split(/\s+/)
    const out = await runBuiltin(args)
    return out
  }

  async function submitFlag(flagId?: string) {
    const flagToSubmit = flagId ? flags[flagId] : flag
    if (!flagToSubmit?.trim()) return

    setSubmitting(true)
    try {
      const res = await fetch('/api/ctf/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          challengeId: challenge.id, 
          flag: flagToSubmit.trim(),
          flagId: flagId || 'main'
        }),
      })
      const data = await res.json()
      
      if (flagId) {
        setSubmissionResults(prev => ({
          ...prev,
          [flagId]: { success: data.ok, message: data.message || (data.ok ? 'Correct!' : 'Incorrect flag') }
        }))
      } else {
        if (data.ok) {
          setSubmitted(true)
          setCompleted(true)
          if (typeof window !== 'undefined') {
            window.localStorage.setItem(`ctf_done_${challenge.id}`, '1')
          }
          setTerminalOutput(`✅ Correct! Flag accepted. You earned ${challenge.points} points.`)
        } else {
          setSubmitted(false)
          setTerminalOutput('❌ Incorrect flag. Try again.')
        }
      }
    } catch (e) {
      if (flagId) {
        setSubmissionResults(prev => ({
          ...prev,
          [flagId]: { success: false, message: 'Error submitting flag' }
        }))
      } else {
        setSubmitted(false)
        setTerminalOutput('❌ Submission failed. Please try again later.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  const badge = useMemo(() => {
    if (!completed) return null
    return {
      label: `${challenge.category} Challenger`,
      color: 'text-cyber-green',
    }
  }, [completed, challenge.category])

  const shareLinks = useMemo(() => {
    const text = encodeURIComponent(`I completed: ${challenge.title}`)
    const url = encodeURIComponent(shareUrl)
    return {
      x: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      whatsapp: `https://api.whatsapp.com/send?text=${text}%20${url}`,
    }
  }, [shareUrl, challenge.title])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="flex border-b border-cyber-green/20 mb-6 overflow-x-auto">
          {[
            { id: 'description', label: 'Description', icon: BookOpen },
            { id: 'files', label: 'Files', icon: Code },
            { id: 'terminal', label: 'Terminal', icon: Terminal },
            { id: 'hints', label: 'Hints', icon: Lock },
            ...(challenge.externalRoom ? [{ id: 'platform' as const, label: 'External Platform', icon: Play }] : []),
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-6 py-3 border-b-2 transition-colors ${
                activeTab === (tab.id as any)
                  ? 'border-cyber-green text-cyber-green'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="cyber-card min-h-[400px]">
            {activeTab === 'description' && (
              <div>
                <h3 className="text-2xl font-bold mb-4">Challenge Description</h3>
                <p className="text-gray-300 leading-relaxed mb-6">{challenge.description}</p>
                <div className="bg-cyber-darker p-4 rounded-lg border border-cyber-green/20">
                  <h4 className="font-bold mb-2">Room Info</h4>
                  {challenge.externalRoom ? (
                    <>
                      <div className="text-gray-300">Platform: <span className="text-cyber-green">{challenge.externalRoom.platform}</span></div>
                      <div className="text-gray-300">Category: {challenge.category}</div>
                      <div className="text-gray-300">Difficulty: {challenge.difficulty}</div>
                      <div className="text-gray-400 text-sm mt-2">This is a file-based challenge. You can solve it offline, or use the linked {challenge.externalRoom.platform} room for hands-on practice.</div>
                    </>
                  ) : (
                    <>
                      <div className="text-gray-300">Room IP: {challenge.roomIp || 'Provided during live events'}</div>
                      <div className="text-gray-300">Category: {challenge.category}</div>
                      <div className="text-gray-300">Difficulty: {challenge.difficulty}</div>
                    </>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'files' && (
              <div>
                <h3 className="text-2xl font-bold mb-4">Challenge Files</h3>
                <div className="space-y-3">
                  {(challenge.files || []).map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-cyber-darker rounded-lg border border-cyber-green/20">
                      <div className="flex items-center space-x-3">
                        <Code className="h-6 w-6 text-cyber-green" />
                        <div>
                          <div className="font-bold">{file.name}</div>
                          <div className="text-sm text-gray-400">{file.size}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {file.href ? (
                          <a className="p-2 hover:bg-cyber-green/20 rounded transition-colors" href={file.href} download>
                            <Download className="h-5 w-5" />
                          </a>
                        ) : (
                          <button className="p-2 hover:bg-cyber-green/20 rounded transition-colors" disabled>
                            <Download className="h-5 w-5 opacity-50" />
                          </button>
                        )}
                        <button className="p-2 hover:bg-cyber-green/20 rounded transition-colors" onClick={() => navigator.clipboard.writeText(file.name)}>
                          <Copy className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'terminal' && (
              <div>
                <h3 className="text-2xl font-bold mb-4">Virtual Terminal</h3>
                <div className="code-container">
                  <div className="text-green-400 mb-2 font-mono whitespace-pre-wrap max-h-64 overflow-auto">
                    {terminalHistory.join('\n') || terminalOutput}
                  </div>
                  <div className="flex items-center mt-4">
                    <ChevronRight className="h-5 w-5 text-cyber-green mr-2" />
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Enter command... (try: help)"
                      className="flex-1 bg-transparent outline-none text-gray-300 font-mono"
                      onKeyDown={async (e) => {
                        const el = e.currentTarget as HTMLInputElement
                        if (e.key === 'Enter') {
                          const cmd = inputValue
                          setTerminalHistory(prev => [...prev, `${challenge.title} > ${cmd}`])
                          setInputValue('')
                          setHistoryIndex(-1)
                          const out = await runLine(cmd)
                          if (out) setTerminalHistory(prev => [...prev, out])
                          return
                        }
                        if (e.key === 'ArrowUp') {
                          e.preventDefault()
                          setHistoryIndex(prev => {
                            const next = prev < 0 ? terminalHistory.length - 1 : Math.max(0, prev - 2)
                            const commandsOnly = terminalHistory.filter((_, i) => i % 2 === 0)
                            const index = Math.min(commandsOnly.length - 1, Math.max(0, (prev < 0 ? commandsOnly.length - 1 : prev - 1)))
                            const value = commandsOnly[index]?.split(' > ').slice(1).join(' > ') || ''
                            setInputValue(value)
                            return index
                          })
                        }
                        if (e.key === 'ArrowDown') {
                          e.preventDefault()
                          setHistoryIndex(prev => {
                            const commandsOnly = terminalHistory.filter((_, i) => i % 2 === 0)
                            const index = Math.min(commandsOnly.length - 1, Math.max(0, prev + 1))
                            const value = commandsOnly[index]?.split(' > ').slice(1).join(' > ') || ''
                            setInputValue(value)
                            return index
                          })
                        }
                        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'l') {
                          e.preventDefault()
                          setTerminalHistory([])
                        }
                        if (e.key === 'Tab') {
                          e.preventDefault()
                          const parts = inputValue.trim().split(/\s+/)
                          const last = parts[parts.length - 1] || ''
                          const names = (challenge.files || []).map(f => f.name.split('/').pop() || f.name)
                          const matches = names.filter(n => n.startsWith(last))
                          if (matches.length === 1) {
                            parts[parts.length - 1] = matches[0]
                            setInputValue(parts.join(' '))
                          }
                        }
                      }}
                    />
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button className="px-3 py-1 text-xs border border-cyber-green/40 rounded text-cyber-green hover:bg-cyber-green/10" onClick={() => navigator.clipboard.writeText(terminalHistory.join('\n'))}>Copy Output</button>
                    <button className="px-3 py-1 text-xs border border-cyber-green/40 rounded text-cyber-green hover:bg-cyber-green/10" onClick={() => setTerminalHistory([])}>Clear</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'hints' && (
              <div>
                <h3 className="text-2xl font-bold mb-4">Hints</h3>
                <div className="space-y-4">
                  {(challenge.hints || []).map((hint, index) => (
                    <div key={index} className={`p-4 rounded-lg border transition-all ${showHints || index === 0 ? 'bg-cyber-darker border-cyber-green/50' : 'bg-cyber-darker/50 border-gray-700 blur-sm'}`}>
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-cyber-yellow/20 text-cyber-yellow rounded-full flex items-center justify-center font-bold">{index + 1}</div>
                        <p className="text-gray-300">{hint}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {!showHints && (
                  <button onClick={() => setShowHints(true)} className="mt-4 cyber-button w-full">Reveal All Hints</button>
                )}
              </div>
            )}

            {activeTab === 'platform' && challenge.externalRoom && (
              <div>
                <h3 className="text-2xl font-bold mb-4">External Platform Access</h3>
                <div className="space-y-4">
                  <div className="bg-cyber-darker p-4 rounded-lg border border-cyber-green/20">
                    <p className="text-gray-300 mb-4">{challenge.externalRoom.note}</p>
                    <a 
                      href={challenge.externalRoom.roomUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="cyber-button flex items-center w-full justify-center"
                    >
                      <ExternalLink className="h-5 w-5 mr-2" />
                      Open on {challenge.externalRoom.platform}
                    </a>
                  </div>
                  <div className="bg-cyber-blue/10 p-4 rounded-lg border border-cyber-blue/20">
                    <p className="text-sm text-gray-300"><strong className="text-cyber-blue">How this works:</strong></p>
                    <ol className="text-sm text-gray-400 mt-2 space-y-1 list-decimal list-inside">
                      <li>Download the challenge files from the Files tab</li>
                      <li>Analyze them locally with your tools (optional but recommended)</li>
                      <li>Optionally complete the {challenge.externalRoom.platform} room for hands-on practice</li>
                      <li>Return here to submit your flag (works with either method!)</li>
                    </ol>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="cyber-card">
          <div className="flex items-center space-x-2 mb-4">
            <Flag className="h-6 w-6 text-cyber-green" />
            <h3 className="text-xl font-bold">Submit Flags</h3>
          </div>
          <div className="space-y-4">
            {challenge.flags && challenge.flags.length > 0 ? (
              <div className="space-y-4">
                <p className="text-gray-300 text-sm mb-4">
                  This challenge has {challenge.flags.length} flag{challenge.flags.length > 1 ? 's' : ''} to find. 
                  Complete the linked {challenge.externalRoom?.platform || 'room'} to get the correct flag{challenge.flags.length > 1 ? 's' : ''}.
                </p>
                {challenge.flags.map((flagInfo, index) => (
                  <div key={flagInfo.id} className="bg-cyber-dark p-4 rounded-lg border border-cyber-green/10">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-cyber-green">Flag {index + 1}: {flagInfo.id}</h4>
                      <span className="text-xs text-gray-400">{flagInfo.format}</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-3">{flagInfo.description}</p>
                    <div className="flex flex-col">
                      <input
                        type="text"
                        value={flags[flagInfo.id] || ''}
                        onChange={(e) => setFlags(prev => ({ ...prev, [flagInfo.id]: e.target.value }))}
                        placeholder={`Enter ${flagInfo.id} flag here...`}
                        className="w-full px-4 py-2 bg-cyber-darker border border-cyber-green/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyber-green"
                      />
                      <button
                        onClick={() => submitFlag(flagInfo.id)}
                        disabled={submitting}
                        className="w-full mt-3 px-4 py-2 bg-cyber-green text-black font-bold rounded-lg hover:bg-cyber-green/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {submitting ? '...' : 'Submit'}
                      </button>
                    </div>
                    {submissionResults[flagInfo.id] && (
                      <div className={`mt-2 p-3 rounded-lg ${submissionResults[flagInfo.id].success ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        <div className="flex items-center">
                          {submissionResults[flagInfo.id].success ? <CheckCircle className="h-4 w-4 mr-2" /> : <XCircle className="h-4 w-4 mr-2" />}
                          <span className="text-sm font-medium">{submissionResults[flagInfo.id].message}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <input type="text" placeholder={challenge.externalRoom?.platform === 'HackTheBox' ? 'HTB{...}' : 'THM{...}'} value={flag} onChange={(e) => setFlag(e.target.value)} className="w-full px-4 py-3 bg-cyber-dark border border-cyber-green/20 rounded-lg text-gray-100 placeholder-gray-500 focus:border-cyber-green focus:outline-none" />
                <button onClick={() => submitFlag()} className="w-full cyber-button flex items-center justify-center mt-4">Submit Flag</button>
                {submitted === true && (
                  <div className="flex items-center space-x-2 text-green-500 p-4 bg-green-500/10 rounded-lg border border-green-500/50 mt-4">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-bold">Correct! You solved this challenge!</span>
                  </div>
                )}
                {submitted === false && (
                  <div className="flex items-center space-x-2 text-red-500 p-4 bg-red-500/10 rounded-lg border border-red-500/50 mt-4">
                    <XCircle className="h-5 w-5" />
                    <span className="font-bold">Incorrect flag. Try again!</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="cyber-card">
          <h3 className="text-xl font-bold mb-4">Challenge Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between"><span className="text-gray-400">Difficulty:</span><span className="font-bold text-green-500">{challenge.difficulty}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Points:</span><span className="font-bold text-cyber-yellow">{challenge.points}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Solved By:</span><span className="font-bold">{challenge.solved} hackers</span></div>
            {challenge.externalRoom ? (
              <div className="flex justify-between"><span className="text-gray-400">Platform:</span><span className="font-bold text-cyber-blue">{challenge.externalRoom.platform}</span></div>
            ) : (
              <div className="flex justify-between"><span className="text-gray-400">Room IP:</span><span className="font-bold text-cyber-blue">{challenge.roomIp || 'File-Based'}</span></div>
            )}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="cyber-card">
          <h3 className="text-xl font-bold mb-4">Rewards</h3>
          {badge ? (
            <div className="flex items-center space-x-3 text-cyber-green">
              <Award className="h-6 w-6" />
              <span className="font-bold">Badge Unlocked: {badge.label}</span>
            </div>
          ) : (
            <div className="text-gray-400">Solve this room to unlock a badge.</div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="cyber-card">
          <h3 className="text-xl font-bold mb-4">Share</h3>
          <div className="flex flex-wrap gap-3">
            <a href={shareLinks.x} target="_blank" className="px-3 py-2 border border-cyber-green/40 rounded-lg text-cyber-green hover:bg-cyber-green/10">X</a>
            <a href={shareLinks.linkedin} target="_blank" className="px-3 py-2 border border-cyber-green/40 rounded-lg text-cyber-green hover:bg-cyber-green/10">LinkedIn</a>
            <a href={shareLinks.facebook} target="_blank" className="px-3 py-2 border border-cyber-green/40 rounded-lg text-cyber-green hover:bg-cyber-green/10">Facebook</a>
            <a href={shareLinks.whatsapp} target="_blank" className="px-3 py-2 border border-cyber-green/40 rounded-lg text-cyber-green hover:bg-cyber-green/10">WhatsApp</a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

