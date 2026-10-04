'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { Reveal, SectionHead } from './ui'
import type { SkillCategory } from './data'

function SkillRow({ s, i }: { s: { name: string; level: number }; i: number }) {
    const ref = useRef<HTMLDivElement>(null)
    // Observe the ROW (always has size) — never the zero-width bar itself
    const inView = useInView(ref, { once: true, margin: '-60px' })
    const reduce = useReducedMotion()

    return (
        <Reveal delay={(i % 2) * 0.08}>
            <div ref={ref} className="group">
                <div className="flex items-baseline justify-between mb-2.5">
                    <span className="font-display font-bold text-lg md:text-xl text-nova-bone group-hover:text-nova-lime transition-colors">
                        {s.name}
                    </span>
                    <span className="font-display text-sm text-nova-mute tabular-nums">{s.level}%</span>
                </div>
                <div className="h-[6px] rounded-full bg-white/[0.08] overflow-hidden">
                    <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-nova-lime/70 to-nova-lime"
                        initial={{ width: 0 }}
                        animate={{ width: inView ? `${s.level}%` : 0 }}
                        transition={{ duration: reduce ? 0 : 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    />
                </div>
            </div>
        </Reveal>
    )
}

export default function Skills({ categories }: { categories: SkillCategory[] }) {
    const reduce = useReducedMotion()
    const all = categories.flatMap(c => c.items.map(i => ({ ...i, category: c.category })))
    const top = all.slice(0, 8)

    return (
        <section id="skills" className="relative bg-nova-ink py-24 md:py-36 overflow-hidden">
            <div className="max-w-7xl mx-auto px-5 md:px-8">
                <SectionHead
                    index="03"
                    label="Skills"
                    title={<>Arsenal, <span className="text-nova-lime">loaded.</span></>}
                    blurb="Battle-tested tools I reach for when it matters."
                />

                <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                    {top.map((s, i) => (
                        <SkillRow key={s.name + i} s={s} i={i} />
                    ))}
                </div>

                {/* Category chips */}
                <Reveal delay={0.1} className="mt-12">
                    <div className="flex flex-wrap gap-2.5">
                        {categories.map(c => (
                            <span
                                key={c.category}
                                className="font-display text-sm px-4 py-2 rounded-full bg-white/5 border border-white/10 text-nova-bone/80 hover:border-nova-lime/60 hover:text-nova-lime transition-colors cursor-default"
                            >
                                {c.category}
                                <span className="ml-2 text-nova-mute">{c.items.length}</span>
                            </span>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    )
}
