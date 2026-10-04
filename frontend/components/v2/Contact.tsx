'use client'

import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, AlertCircle, Loader2, Mail, Github, Linkedin } from 'lucide-react'
import api from '@/lib/api'
import { Reveal, SectionHead, Magnetic } from './ui'
import type { AboutData } from './data'

export default function Contact({ about }: { about: AboutData }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

    const submit = async (e: FormEvent) => {
        e.preventDefault()
        if (status === 'sending') return
        setStatus('sending')
        try {
            await api.post('/contact', { name, email, message })
            setStatus('success')
            setName(''); setEmail(''); setMessage('')
        } catch {
            setStatus('error')
        }
    }

    const socials = [
        about.socials?.github && { icon: Github, href: about.socials.github, label: 'GitHub' },
        about.socials?.linkedin && { icon: Linkedin, href: about.socials.linkedin, label: 'LinkedIn' },
        { icon: Mail, href: `mailto:${about.email}`, label: 'Email' },
    ].filter(Boolean) as { icon: typeof Github; href: string; label: string }[]

    const inputCls =
        'w-full bg-white/5 border border-white/12 rounded-xl px-5 py-4 text-nova-bone placeholder:text-nova-mute/60 outline-none focus:border-nova-lime/70 focus:bg-white/[0.07] transition-colors'

    return (
        <section id="contact" className="relative bg-nova-ink py-24 md:py-36 overflow-hidden">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-nova-lime/8 blur-[130px] rounded-full pointer-events-none" aria-hidden />
            <div className="relative max-w-7xl mx-auto px-5 md:px-8">
                <SectionHead
                    index="06"
                    label="Contact"
                    title={<>Let's build something<br /><span className="text-nova-lime">unreasonable.</span></>}
                />

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Left: big type + socials */}
                    <div>
                        <Reveal>
                            <p className="text-nova-mute text-lg leading-relaxed max-w-md">
                                Have a project in mind, a role to fill, or just want to talk shop?
                                My inbox is always open — I usually reply within 24 hours.
                            </p>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <a
                                href={`mailto:${about.email}`}
                                className="mt-8 inline-block font-display font-bold text-2xl md:text-4xl text-nova-bone hover:text-nova-lime transition-colors break-all"
                            >
                                {about.email}
                            </a>
                        </Reveal>
                        <Reveal delay={0.16}>
                            <div className="mt-8 flex gap-3">
                                {socials.map(s => (
                                    <Magnetic key={s.label}>
                                        <a
                                            href={s.href}
                                            target={s.href.startsWith('mailto') ? undefined : '_blank'}
                                            rel="noreferrer"
                                            aria-label={s.label}
                                            className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center text-nova-mute hover:text-nova-ink hover:bg-nova-lime hover:border-nova-lime transition-colors"
                                        >
                                            <s.icon size={20} />
                                        </a>
                                    </Magnetic>
                                ))}
                            </div>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <div className="mt-10 inline-flex items-center gap-3 border border-nova-lime/30 bg-nova-lime/5 rounded-full px-5 py-3">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nova-lime opacity-60" />
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-nova-lime" />
                                </span>
                                <span className="text-sm text-nova-bone/80 font-medium">Currently accepting new projects</span>
                            </div>
                        </Reveal>
                    </div>

                    {/* Right: form */}
                    <Reveal delay={0.1}>
                        <form onSubmit={submit} className="rounded-3xl border border-white/10 bg-nova-panel/70 backdrop-blur p-6 md:p-9 space-y-5">
                            <div className="grid sm:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="ct-name" className="block text-xs font-display tracking-[0.2em] uppercase text-nova-mute mb-2">Name</label>
                                    <input id="ct-name" required minLength={2} value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className={inputCls} />
                                </div>
                                <div>
                                    <label htmlFor="ct-email" className="block text-xs font-display tracking-[0.2em] uppercase text-nova-mute mb-2">Email</label>
                                    <input id="ct-email" required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" className={inputCls} />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="ct-msg" className="block text-xs font-display tracking-[0.2em] uppercase text-nova-mute mb-2">Message</label>
                                <textarea id="ct-msg" required minLength={10} rows={5} value={message} onChange={e => setMessage(e.target.value)} placeholder="Tell me about your project..." className={`${inputCls} resize-none`} />
                            </div>

                            <Magnetic strength={0.15}>
                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="w-full inline-flex items-center justify-center gap-2 bg-nova-lime text-nova-ink font-display font-bold text-lg px-7 py-4 rounded-xl hover:bg-white transition-colors disabled:opacity-60"
                                >
                                    {status === 'sending' ? (<><Loader2 size={20} className="animate-spin" /> Sending...</>) : (<>Send Message <ArrowUpRight size={20} /></>)}
                                </button>
                            </Magnetic>

                            {status === 'success' && (
                                <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-nova-lime text-sm font-medium">
                                    <CheckCircle2 size={16} /> Message sent — I'll get back to you within 24 hours.
                                </motion.p>
                            )}
                            {status === 'error' && (
                                <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-red-400 text-sm font-medium">
                                    <AlertCircle size={16} /> Something went wrong. Please email me directly instead.
                                </motion.p>
                            )}
                        </form>
                    </Reveal>
                </div>
            </div>
        </section>
    )
}
