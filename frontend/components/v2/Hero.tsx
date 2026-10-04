'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ArrowDown, ArrowUpRight, MapPin, Github, Linkedin, Mail } from 'lucide-react'
import { SplitChars, Magnetic } from './ui'
import type { AboutData } from './data'

const ROLES = ['Full-Stack Developer', 'MERN Specialist', 'AI Integrator', 'Freelancer']

function RoleTicker() {
    const [idx, setIdx] = useState(0)
    useEffect(() => {
        const t = setInterval(() => setIdx(i => (i + 1) % ROLES.length), 2400)
        return () => clearInterval(t)
    }, [])
    return (
        <span className="relative inline-flex h-[1.2em] overflow-hidden align-bottom min-w-[11ch]">
            {ROLES.map((r, i) => (
                <motion.span
                    key={r}
                    className="absolute left-0 top-0 whitespace-nowrap text-nova-lime"
                    initial={false}
                    animate={{ y: `${(i - idx) * 120}%`, opacity: i === idx ? 1 : 0 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                    {r}
                </motion.span>
            ))}
        </span>
    )
}

export default function Hero({ about }: { about: AboutData }) {
    const reduce = useReducedMotion()
    const [first, last] = about.name.split(' ')
    const socials = [
        about.socials?.github && { icon: Github, href: about.socials.github, label: 'GitHub' },
        about.socials?.linkedin && { icon: Linkedin, href: about.socials.linkedin, label: 'LinkedIn' },
        about.socials?.email && { icon: Mail, href: `mailto:${about.socials.email}`, label: 'Email' },
    ].filter(Boolean) as { icon: typeof Github; href: string; label: string }[]

    return (
        <section id="top" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-nova-ink">
            {/* Backdrop: grid + glow + noise (CSS only) */}
            <div className="absolute inset-0 bg-grid-fade" aria-hidden />
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-nova-lime/10 blur-[140px] rounded-full pointer-events-none" aria-hidden />
            <div className="absolute inset-0 noise" aria-hidden />

            <div className="relative max-w-7xl mx-auto px-5 md:px-8 w-full pt-32 pb-20">
                {/* Availability badge */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="inline-flex items-center gap-2.5 border border-white/12 bg-white/5 backdrop-blur rounded-full pl-3 pr-4 py-1.5 mb-8"
                >
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nova-lime opacity-60" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-nova-lime" />
                    </span>
                    <span className="text-xs md:text-sm text-nova-bone/80 font-medium tracking-wide">
                        Available for new projects
                    </span>
                    {about.location && (
                        <span className="hidden sm:inline-flex items-center gap-1 text-xs text-nova-mute">
                            <MapPin size={12} /> {about.location}
                        </span>
                    )}
                </motion.div>

                {/* Giant kinetic type */}
                <h1 className="font-display font-bold tracking-[-0.03em] leading-[0.92] text-nova-bone select-none">
                    <span className="block overflow-hidden text-[17vw] md:text-[11rem] lg:text-[13rem]">
                        <SplitChars text={(first || 'AMAN').toUpperCase()} delay={0.55} />
                    </span>
                    <span className="block overflow-hidden text-[17vw] md:text-[11rem] lg:text-[13rem]">
                        <span className="text-stroke-lime">
                            <SplitChars text={(last || 'KUMAR').toUpperCase()} delay={0.75} />
                        </span>
                    </span>
                </h1>

                {/* Sub row */}
                <div className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.15, duration: 0.7 }}
                        className="font-display text-xl md:text-2xl text-nova-bone/90 max-w-md"
                    >
                        I'm a <RoleTicker /> building fast, intelligent web experiences that ship.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.3, duration: 0.7 }}
                        className="flex flex-wrap items-center gap-4"
                    >
                        <Magnetic>
                            <a
                                href="#work"
                                onClick={e => { e.preventDefault(); document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' }) }}
                                className="inline-flex items-center gap-2 bg-nova-lime text-nova-ink font-display font-bold px-7 py-3.5 rounded-full hover:bg-white transition-colors"
                            >
                                View Work <ArrowUpRight size={18} />
                            </a>
                        </Magnetic>
                        <Magnetic>
                            <a
                                href="#contact"
                                onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                                className="inline-flex items-center gap-2 border border-white/20 text-nova-bone font-display font-bold px-7 py-3.5 rounded-full hover:border-nova-lime hover:text-nova-lime transition-colors"
                            >
                                Get in Touch
                            </a>
                        </Magnetic>
                        {socials.length > 0 && (
                            <div className="flex items-center gap-2 ml-1">
                                {socials.map(s => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={s.label}
                                        className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-nova-mute hover:text-nova-ink hover:bg-nova-lime hover:border-nova-lime transition-colors"
                                    >
                                        <s.icon size={18} />
                                    </a>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Scroll cue */}
            {!reduce && (
                <motion.a
                    href="#about"
                    onClick={e => { e.preventDefault(); document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }) }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-nova-mute hover:text-nova-lime transition-colors"
                    aria-label="Scroll to about"
                >
                    <span className="text-[11px] tracking-[0.3em] uppercase font-display">Scroll</span>
                    <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
                        <ArrowDown size={18} />
                    </motion.span>
                </motion.a>
            )}
        </section>
    )
}
