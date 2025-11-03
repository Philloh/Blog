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

  const commands = {
    help: 'Available commands: ls, cat, grep, ip, help',
    ls: (challenge.files || []).map((f) => f.name).join('\n') || 'No files provided',
    ip: challenge.roomIp || (challenge.externalRoom ? `External platform: ${challenge.externalRoom.platform}` : 'Room IP will be available during events'),
    'cat index.php': '<?php\\n// sample login logic\\n?>',
    grep: 'Usage: grep <pattern> <file>',
  } as Record<string, string>

  const handleCommand = (command: string) => {
    const key = command.trim().toLowerCase()
    const value = commands[key]
    if (value) {
      setTerminalOutput(`${challenge.title} > ${command}\n${value}`)
    } else {
      setTerminalOutput(`${challenge.title} > ${command}\nCommand not found: ${command}`)
    }
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
                  <div className="text-green-400 mb-2 font-mono whitespace-pre-wrap">{terminalOutput}</div>
                  <div className="flex items-center mt-4">
                    <ChevronRight className="h-5 w-5 text-cyber-green mr-2" />
                    <input
                      type="text"
                      placeholder="Enter command..."
                      className="flex-1 bg-transparent outline-none text-gray-300 font-mono"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleCommand((e.currentTarget as HTMLInputElement).value)
                          ;(e.currentTarget as HTMLInputElement).value = ''
                        }
                      }}
                    />
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
                  Complete the linked TryHackMe room to get the correct flags.
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
                <input type="text" placeholder="THM{...}" value={flag} onChange={(e) => setFlag(e.target.value)} className="w-full px-4 py-3 bg-cyber-dark border border-cyber-green/20 rounded-lg text-gray-100 placeholder-gray-500 focus:border-cyber-green focus:outline-none" />
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

