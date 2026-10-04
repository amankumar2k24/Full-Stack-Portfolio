'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Reveal, SectionHead } from './ui'
import type { AboutData, StatsData } from './data'

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })
    const reduce = useReducedMotion()
    const [val, setVal] = useState(0)

    useEffect(() => {
        if (!inView) return
        if (reduce) { setVal(to); return }
        const start = performance.now()
        const dur = 1400
        let raf = 0
        const tick = (t: number) => {
            const p = Math.min(1, (t - start) / dur)
            const eased = 1 - Math.pow(1 - p, 3)
            setVal(Math.round(eased * to))
            if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [inView, to, reduce])

    return <span ref={ref} className="tabular-nums">{val}{suffix}</span>
}

const parseNum = (s: string) => parseInt(s.replace(/\D/g, ''), 10) || 0

export default function About({ about, stats }: { about: AboutData; stats: StatsData }) {
    const cards = [
        { value: parseNum(stats.yearsExperience), suffix: '+', label: 'Years Experience' },
        { value: parseNum(stats.projectsCompleted), suffix: '+', label: 'Projects Shipped' },
        { value: parseNum(stats.happyClients), suffix: '+', label: 'Happy Clients' },
        { value: parseNum(stats.codeCommits), suffix: '+', label: 'Code Commits' },
    ]

    return (
        <section id="about" className="relative bg-nova-ink py-24 md:py-36">
            <div className="max-w-7xl mx-auto px-5 md:px-8">
                <SectionHead
                    index="01"
                    label="About"
                    title={<>Engineer by craft,<br /><span className="text-nova-lime">obsessed</span> by detail.</>}
                    blurb={about.bio}
                />

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                    {cards.map((c, i) => (
                        <Reveal key={c.label} delay={i * 0.08}>
                            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-nova-panel p-6 md:p-8 hover:border-nova-lime/50 transition-colors duration-300">
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-nova-lime/0 group-hover:bg-nova-lime/10 blur-2xl rounded-full transition-all duration-500" />
                                <p className="font-display font-bold text-4xl md:text-5xl text-nova-bone">
                                    <Counter to={c.value} suffix={c.suffix} />
                                </p>
                                <p className="mt-2 text-sm text-nova-mute uppercase tracking-[0.2em] font-display">{c.label}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={0.1} className="mt-10 md:mt-14">
                    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-nova-panel to-nova-ink p-8 md:p-12 relative overflow-hidden">
                        <span className="absolute top-6 left-8 font-display text-nova-lime text-6xl leading-none select-none">"</span>
                        <motion.blockquote
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="font-display text-xl md:text-3xl text-nova-bone/90 leading-snug max-w-3xl relative"
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
