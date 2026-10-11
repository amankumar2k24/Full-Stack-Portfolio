'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ArrowDown, ArrowUpRight, MapPin, Github, Linkedin, Mail } from 'lucide-react'
import { SplitChars, Magnetic } from './ui'
import type { AboutData } from './data'

const ROLES = ['Full-Stack Developer', 'MERN Specialist', 'AI Integrator', 'Freelancer']

function RoleTicker() {
    const [idx, setIdx] = useState(0)
    const longest = ROLES.reduce((a, b) => (a.length >= b.length ? a : b))
    useEffect(() => {
        const t = setInterval(() => setIdx(i => (i + 1) % ROLES.length), 2400)
        return () => clearInterval(t)
    }, [])
    return (
        <span className="relative block overflow-hidden font-display font-bold tracking-tight text-nova-lime text-4xl md:text-6xl leading-[1.1] mt-1 mb-1">
            {/* Invisible sizer keeps layout stable across roles */}
            <span className="invisible whitespace-nowrap" aria-hidden>{longest}</span>
            {ROLES.map((r, i) => (
                <motion.span
                    key={r}
                    className="absolute left-0 top-0 whitespace-nowrap"
                    initial={false}
                    animate={{ y: `${(i - idx) * 112}%`, opacity: i === idx ? 1 : 0 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    aria-hidden={i !== idx}
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

            {/* Right-side visual cluster (xl screens only) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                className="hidden xl:block absolute right-[4%] top-[calc(30%-10px)] -translate-y-1/2 pointer-events-none"
                aria-hidden
            >
                <div className="relative w-[300px] h-[380px]">
                    {/* Soft lime glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-nova-lime/[0.07] blur-[70px] rounded-full" />

                    {/* Rotating badge */}
                    <div className="absolute top-[70px] left-[30px] w-[240px] h-[240px]">
                        <svg viewBox="0 0 200 200" className="w-full h-full animate-spin-slower">
                            <defs>
                                <path id="badge-circle" d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0" />
                            </defs>
                            <text className="fill-nova-mute uppercase" style={{ fontSize: '12.5px', letterSpacing: '0.32em' }}>
                                <textPath href="#badge-circle">Open to work • Let's build • Open to work •</textPath>
                            </text>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-nova-lime flex items-center justify-center shadow-[0_0_50px_rgba(215,253,68,0.4)]">
                                <ArrowUpRight size={28} className="text-nova-ink" strokeWidth={2.4} />
                            </div>
                        </div>
                    </div>

                    {/* Floating tech pills */}
                    <div className="absolute top-2 left-6 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/12 backdrop-blur text-xs font-medium text-nova-bone/80 animate-float" style={{ animationDelay: '0s' }}>
                        React
                    </div>
                    <div className="absolute top-16 right-0 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/12 backdrop-blur text-xs font-medium text-nova-bone/80 animate-float" style={{ animationDelay: '0.8s' }}>
                        Next.js
                    </div>
                    <div className="absolute bottom-16 left-0 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/12 backdrop-blur text-xs font-medium text-nova-bone/80 animate-float" style={{ animationDelay: '1.6s' }}>
                        Node.js
                    </div>
                    <div className="absolute bottom-4 right-10 px-3.5 py-1.5 rounded-full bg-nova-lime/10 border border-nova-lime/30 backdrop-blur text-xs font-medium text-nova-lime animate-float" style={{ animationDelay: '2.4s' }}>
                        TypeScript
                    </div>

                    {/* Decorative dotted ring */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[200px] h-[200px] rounded-full border border-dashed border-white/10" />
                </div>
            </motion.div>

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
                    <span className="block overflow-hidden text-[15vw] md:text-[9rem] lg:text-[11rem]">
                        <SplitChars text={(first || 'AMAN').toUpperCase()} delay={0.55} />
                    </span>
                    <span className="block overflow-hidden text-[15vw] md:text-[9rem] lg:text-[11rem]">
                        <span className="text-stroke-lime">
                            <SplitChars text={(last || 'KUMAR').toUpperCase()} delay={0.75} />
                        </span>
                    </span>
                </h1>

                {/* Sub row */}
                <div className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.15, duration: 0.7 }}
                    >
                        <p className="font-display text-lg md:text-xl text-nova-bone/50 tracking-wide">I'm a</p>
                        <RoleTicker />
                        <p className="font-display text-lg md:text-xl text-nova-bone/90 leading-relaxed max-w-md">
                            building fast, intelligent web experiences that ship.
                        </p>
                    </motion.div>

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
