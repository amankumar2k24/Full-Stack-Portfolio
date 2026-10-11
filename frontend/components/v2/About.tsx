'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Reveal, SectionHead } from './ui'
import type { AboutData, StatsData } from './data'

function Counter({ text }: { text: string }) {
    const ref = useRef<HTMLSpanElement>(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })
    const reduce = useReducedMotion()
    // Parse "2.11+" -> { value: 2.11, decimals: 2, suffix: "+" }
    const m = text.match(/([\d.]+)/)
    const target = m ? parseFloat(m[1]) : 0
    const decimals = m && m[1].includes('.') ? m[1].split('.')[1].length : 0
    const suffix = text.replace(/[\d.\s]/g, '')
    const [val, setVal] = useState(0)

    useEffect(() => {
        if (!inView) return
        if (reduce) { setVal(target); return }
        const start = performance.now()
        const dur = 1400
        let raf = 0
        const tick = (t: number) => {
            const p = Math.min(1, (t - start) / dur)
            const eased = 1 - Math.pow(1 - p, 3)
            setVal(eased * target)
            if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [inView, target, reduce])

    return <span ref={ref} className="tabular-nums">{val.toFixed(decimals)}{suffix}</span>
}

export default function About({ about, stats }: { about: AboutData; stats: StatsData }) {
    const cards = [
        { text: stats.yearsExperience, label: 'Years Experience' },
        { text: stats.projectsCompleted, label: 'Projects Shipped' },
        { text: stats.happyClients, label: 'Happy Clients' },
        { text: stats.codeCommits, label: 'Code Commits' },
    ]

    return (
        <section id="about" className="relative bg-nova-ink py-24 md:py-36">
            <div className="max-w-7xl mx-auto px-5 md:px-8">
                <div className="grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-14 items-start">
                    <SectionHead
                        index="01"
                        label="About"
                        title={<>Engineer by craft,<br /><span className="text-nova-lime">obsessed</span> by detail.</>}
                        blurb={about.bio}
                    />

                    {/* Terminal-style profile card */}
                    <Reveal delay={0.2} className="hidden lg:block">
                        <div className="rounded-2xl border border-white/10 bg-nova-panel/80 backdrop-blur overflow-hidden">
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                                <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                                <span className="ml-2 text-xs text-nova-mute font-mono">aman@dev — zsh</span>
                            </div>
                            <div className="p-5 font-mono text-[13px] leading-relaxed">
                                <p><span className="text-nova-lime">$</span> <span className="text-nova-bone/90">whoami</span></p>
                                <p className="text-nova-mute mb-3">full-stack developer · 3.5+ yrs</p>
                                <p><span className="text-nova-lime">$</span> <span className="text-nova-bone/90">cat current_focus.txt</span></p>
                                <p className="text-nova-mute mb-3">AI-enhanced web apps & freelance builds</p>
                                <p><span className="text-nova-lime">$</span> <span className="text-nova-bone/90">cat location.txt</span></p>
                                <p className="text-nova-mute mb-3">India · working worldwide</p>
                                <p><span className="text-nova-lime">$</span> <span className="text-nova-bone/90">./availability.sh</span></p>
                                <p className="text-nova-lime">● open for projects <span className="animate-pulse">▊</span></p>
                            </div>
                        </div>
                    </Reveal>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                    {cards.map((c, i) => (
                        <Reveal key={c.label} delay={i * 0.08}>
                            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-nova-panel p-6 md:p-8 hover:border-nova-lime/50 transition-colors duration-300">
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-nova-lime/0 group-hover:bg-nova-lime/10 blur-2xl rounded-full transition-all duration-500" />
                                <p className="font-display font-bold text-4xl md:text-5xl text-nova-bone">
                                    <Counter text={c.text} />
                                </p>
                                <p className="mt-2 text-sm text-nova-mute uppercase tracking-[0.2em] font-display">{c.label}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={0.1} className="mt-10 md:mt-14">
                    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-nova-panel to-nova-ink p-8 md:p-12 relative overflow-hidden">
                        <span className="absolute top-8 left-8 md:left-12 font-display text-nova-lime text-7xl leading-none select-none opacity-90">"</span>
                        <motion.blockquote
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="font-display text-xl md:text-3xl text-nova-bone/90 leading-snug max-w-3xl relative pl-10 md:pl-14"
                        >
                            I don't just write code — I build products. Every pixel has intent, every API has a reason,
                            and every millisecond of load time matters.
                        </motion.blockquote>
                        <p className="mt-6 text-nova-mute text-sm tracking-[0.25em] uppercase font-display">
                            — {about.name}, {about.title}
                        </p>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}
