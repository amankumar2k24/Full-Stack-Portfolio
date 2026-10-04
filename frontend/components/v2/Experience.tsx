'use client'

import { motion, useScroll, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { Briefcase, MapPin } from 'lucide-react'
import { Reveal, SectionHead } from './ui'
import type { ExperienceItem } from './data'

export default function Experience({ items }: { items: ExperienceItem[] }) {
    const listRef = useRef<HTMLDivElement>(null)
    const reduce = useReducedMotion()
    const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.75', 'end 0.6'] })

    return (
        <section id="experience" className="relative bg-nova-ink py-24 md:py-36">
            <div className="max-w-7xl mx-auto px-5 md:px-8">
                <SectionHead
                    index="02"
                    label="Experience"
                    title={<>Where I've <span className="text-nova-lime">shipped.</span></>}
                    blurb="A track record of owning products end-to-end — from architecture to deployment."
                />

                <div ref={listRef} className="relative">
                    {/* Track */}
                    <div className="absolute left-[7px] md:left-[9px] top-2 bottom-2 w-[2px] bg-white/10 rounded-full" aria-hidden />
                    {!reduce && (
                        <motion.div
                            className="absolute left-[7px] md:left-[9px] top-2 bottom-2 w-[2px] bg-nova-lime rounded-full origin-top"
                            style={{ scaleY: scrollYProgress }}
                            aria-hidden
                        />
                    )}

                    <div className="space-y-10 md:space-y-14">
                        {items.map((exp, i) => (
                            <Reveal key={exp._id || exp.company + i} delay={0.05}>
                                <article className="relative pl-10 md:pl-14">
                                    {/* Node */}
                                    <span className={`absolute left-0 top-2 w-4 h-4 md:w-5 md:h-5 rounded-full border-2 ${exp.current ? 'border-nova-lime bg-nova-lime/30' : 'border-white/25 bg-nova-ink'}`}>
                                        {exp.current && <span className="absolute inset-1 rounded-full bg-nova-lime animate-pulse" />}
                                    </span>

                                    <div className="group rounded-2xl border border-white/10 bg-nova-panel/60 p-6 md:p-8 hover:border-nova-lime/40 hover:bg-nova-panel transition-all duration-300">
                                        <div className="flex flex-wrap items-center gap-3 mb-3">
                                            {exp.current && (
                                                <span className="text-[11px] font-display font-bold tracking-[0.2em] uppercase bg-nova-lime text-nova-ink px-3 py-1 rounded-full">
                                                    Current
                                                </span>
                                            )}
                                            <span className="text-xs md:text-sm text-nova-mute font-display tracking-wider">
                                                {exp.startDate} — {exp.endDate}
                                            </span>
                                        </div>

                                        <h3 className="font-display font-bold text-2xl md:text-3xl text-nova-bone group-hover:text-nova-lime transition-colors">
                                            {exp.title}
                                        </h3>
                                        <p className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-nova-mute">
                                            <span className="inline-flex items-center gap-1.5 font-medium text-nova-bone/80">
                                                <Briefcase size={14} className="text-nova-lime" /> {exp.company}
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 text-sm">
                                                <MapPin size={14} /> {exp.location}
                                            </span>
                                        </p>

                                        <p className="mt-4 text-nova-bone/70 leading-relaxed">{exp.description}</p>

                                        {exp.achievements?.length > 0 && (
                                            <ul className="mt-5 space-y-2.5">
                                                {exp.achievements.slice(0, 3).map((a, j) => (
                                                    <li key={j} className="flex gap-3 text-sm md:text-[15px] text-nova-bone/70">
                                                        <span className="text-nova-lime mt-0.5 shrink-0">▸</span>
                                                        <span>{a}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {exp.technologies?.length > 0 && (
                                            <div className="mt-5 flex flex-wrap gap-2">
                                                {exp.technologies.slice(0, 10).map(t => (
                                                    <span key={t} className="text-xs font-medium px-3 py-1.5 rounded-full border border-white/12 text-nova-bone/70 group-hover:border-nova-lime/30 transition-colors">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
