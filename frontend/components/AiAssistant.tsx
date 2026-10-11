'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Mail, Linkedin, Phone, Github, Zap, FolderKanban, Wrench, Briefcase } from 'lucide-react'
import api from '@/lib/api'
import { useUI } from '@/components/UIProvider'

interface Message {
    id: string
    content: string
    sender: 'user' | 'ai'
    timestamp: string
}

export default function AiAssistant() {
    const { isChatOpen: isOpen, toggleChat: setIsOpen, isMobileMenuOpen } = useUI()
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            content: "Hi! I'm Aman's AI assistant. I can help you learn about his skills, experience, projects, and services. What would you like to know?",
            sender: 'ai',
            timestamp: new Date().toISOString(),
        }
    ])
    const [inputMessage, setInputMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isOpen])

    const sendMessage = async (messageText?: string) => {
        const messageToSend = messageText || inputMessage.trim()
        if (!messageToSend || isLoading) return

        const userMessage: Message = {
            id: Date.now().toString(),
            content: messageToSend,
            sender: 'user',
            timestamp: new Date().toISOString(),
        }

        setMessages(prev => [...prev, userMessage])
        if (!messageText) setInputMessage('') // Only clear input if it's from the input field
        setIsLoading(true)

        try {
            const response = await api.post('/ai-assistant/chat', {
                message: messageToSend
            })

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: response.data.message,
                sender: 'ai',
                timestamp: response.data.timestamp,
            }

            setMessages(prev => [...prev, aiMessage])
        } catch (error) {
            console.error('Error sending message:', error)
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
                sender: 'ai',
                timestamp: new Date().toISOString(),
            }
            setMessages(prev => [...prev, errorMessage])
        } finally {
            setIsLoading(false)
        }
    }

    const handleQuickAction = (message: string) => {
        sendMessage(message)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    const formatTime = (timestamp: string) => {
        return new Date(timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <>
            {/* Chat Widget Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                aria-label="Open AI assistant"
                className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 bg-nova-lime text-nova-ink rounded-full shadow-[0_8px_30px_rgba(215,253,68,0.35)] hover:shadow-[0_8px_40px_rgba(215,253,68,0.55)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center group ${(isOpen || isMobileMenuOpen) ? 'hidden' : 'block'}`}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2, type: "spring", stiffness: 200 }}
            >
                <MessageCircle size={22} className="sm:w-6 sm:h-6" strokeWidth={2.2} />

                {/* Online Badge */}
                <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-nova-lime rounded-full border-2 border-nova-ink animate-pulse" />

                {/* Tooltip */}
                <div className="absolute bottom-full right-0 mb-3 px-3 py-1.5 bg-nova-panel border border-white/10 text-nova-bone text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Ask me about Aman
                    <span className="text-nova-lime"> ↗</span>
                </div>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        className="fixed bottom-2 right-2 left-2 sm:bottom-6 sm:right-6 sm:left-auto sm:w-[420px] z-40 h-[75vh] sm:h-[600px] bg-nova-ink border border-white/10 rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden"
                    >
                        {/* Lime top accent */}
                        <div className="h-[3px] w-full bg-gradient-to-r from-nova-lime via-nova-lime/60 to-transparent shrink-0" />

                        {/* Header */}
                        <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 bg-nova-panel/80 backdrop-blur border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-nova-lime rounded-full flex items-center justify-center shrink-0">
                                    <Bot size={20} className="text-nova-ink" strokeWidth={2.2} />
                                </div>
                                <div>
                                    <h3 className="font-display font-bold text-nova-bone text-[15px] tracking-tight leading-tight">Ai Assistant</h3>
                                    <p className="text-xs text-nova-mute flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-nova-lime rounded-full animate-pulse" />
                                        Ask me about Aman
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                aria-label="Close chat"
                                className="w-8 h-8 flex items-center justify-center text-nova-mute hover:text-nova-bone hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-4 nova-scroll">
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex gap-2.5 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.sender === 'user'
                                        ? 'bg-white/10 text-nova-bone border border-white/10'
                                        : 'bg-nova-lime text-nova-ink'
                                        }`}>
                                        {message.sender === 'user' ? <User size={15} /> : <Bot size={15} strokeWidth={2.2} />}
                                    </div>
                                    <div className={`flex-1 min-w-0 ${message.sender === 'user' ? 'text-right' : ''}`}>
                                        <div className={`inline-block px-4 py-2.5 rounded-2xl max-w-[88%] text-left ${message.sender === 'user'
                                            ? 'bg-nova-lime text-nova-ink rounded-br-md font-medium'
                                            : 'bg-white/[0.06] border border-white/10 text-nova-bone rounded-bl-md'
                                            }`}>
                                            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
                                        </div>
                                        <p className={`text-[11px] text-nova-mute/70 mt-1 ${message.sender === 'user' ? 'text-right' : ''}`}>
                                            {formatTime(message.timestamp)}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Loading indicator */}
                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex gap-2.5"
                                >
                                    <div className="w-8 h-8 bg-nova-lime text-nova-ink rounded-full flex items-center justify-center shrink-0">
                                        <Bot size={15} strokeWidth={2.2} />
                                    </div>
                                    <div className="bg-white/[0.06] border border-white/10 px-4 py-3.5 rounded-2xl rounded-bl-md">
                                        <div className="flex gap-1.5">
                                            <div className="w-1.5 h-1.5 bg-nova-lime rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <div className="w-1.5 h-1.5 bg-nova-lime rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <div className="w-1.5 h-1.5 bg-nova-lime rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Action Buttons */}
                        {messages.length === 1 && (
                            <div className="px-4 sm:px-5 pb-3">
                                <p className="text-[11px] uppercase tracking-[0.2em] text-nova-mute mb-2.5 text-center">Quick actions</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {[
                                        { icon: Mail, label: 'Email', msg: "What's your email address?" },
                                        { icon: Linkedin, label: 'LinkedIn', msg: "LinkedIn profile link?" },
                                        { icon: Phone, label: 'Phone', msg: "What's your phone number?" },
                                        { icon: Github, label: 'GitHub', msg: "GitHub profile?" },
                                        { icon: Zap, label: 'Skills', msg: "Tell me about your skills" },
                                        { icon: FolderKanban, label: 'Projects', msg: "Show me your projects" },
                                        { icon: Wrench, label: 'Services', msg: "What services do you offer?" },
                                        { icon: Briefcase, label: 'Experience', msg: "Tell me about your experience" },
                                    ].map(({ icon: Icon, label, msg }) => (
                                        <button
                                            key={label}
                                            onClick={() => handleQuickAction(msg)}
                                            className="flex items-center gap-2 px-3 py-2.5 text-[13px] font-medium bg-white/[0.04] border border-white/10 hover:border-nova-lime/60 hover:bg-nova-lime/10 text-nova-bone rounded-xl transition-all duration-200 text-left"
                                        >
                                            <Icon size={14} className="text-nova-lime shrink-0" />
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Input */}
                        <div className="px-4 sm:px-5 py-3.5 border-t border-white/10 bg-nova-panel/60">
                            <div className="flex gap-2 items-center">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ask me anything about Aman..."
                                    className="flex-1 px-4 py-2.5 bg-white/[0.05] border border-white/15 rounded-full text-sm text-nova-bone placeholder:text-nova-mute/60 focus:outline-none focus:border-nova-lime/70 focus:ring-1 focus:ring-nova-lime/40 transition-all"
                                    disabled={isLoading}
                                />
                                <button
                                    onClick={() => sendMessage()}
                                    disabled={!inputMessage.trim() || isLoading}
                                    aria-label="Send message"
                                    className="w-10 h-10 shrink-0 bg-nova-lime text-nova-ink rounded-full hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-nova-lime transition-colors flex items-center justify-center"
                                >
                                    <Send size={16} strokeWidth={2.2} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}