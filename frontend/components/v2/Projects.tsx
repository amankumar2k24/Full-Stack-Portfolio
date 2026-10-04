'use client'

import { useRef, useState, type MouseEvent } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Github } from 'lucide-react'
import { Reveal, SectionHead } from './ui'
import type { ProjectItem } from './data'

/* Deterministic gradient artwork per project (no external assets needed) */
const PALETTES = [
    ['#D7FD44', '#0A0A0B'],
    ['#7C5CFF', '#0A0A0B'],
    ['#FF6B4A', '#0A0A0B'],
    ['#4AD6FF', '#0A0A0B'],
    ['#FF4AD8', '#0A0A0B'],
    ['#4AFF9E', '#0A0A0B'],
]

function ProjectArt({ title, index, image }: { title: string; index: number; image?: string }) {
    const [c1] = PALETTES[index % PALETTES.length]
    if (image) {
        return (
            <div className="relative w-full h-full overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nova-ink/60 via-transparent to-transparent" />
            </div>
        )
    }
    return (
        <div className="relative w-full h-full overflow-hidden bg-nova-ink flex items-center justify-center" aria-hidden>
            <div
                className="absolute inset-0 opacity-90 transition-transform duration-700 group-hover:scale-110"
                style={{ background: `radial-gradient(circle at 30% 20%, ${c1}55, transparent 55%), radial-gradient(circle at 75% 80%, ${c1}33, transparent 50%), #101012` }}
            />
            <div className="absolute inset-0 bg-grid-fade opacity-60" />
            <span className="relative font-display font-bold text-[22vw] md:text-[10rem] leading-none text-white/[0.07] select-none">
                {String(index + 1).padStart(2, '0')}
            </span>
            <span className="absolute bottom-6 left-6 font-display font-bold text-2xl md:text-4xl text-nova-bone/90 tracking-tight max-w-[80%]">
                {title}
            </span>
        </div>
    )
}

function TiltCard({ children, index }: { children: React.ReactNode; index: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const reduce = useReducedMotion()
    const [t, setT] = useState({ rx: 0, ry: 0 })

    const onMove = (e: MouseEvent) => {
        if (reduce || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        setT({ rx: -py * 7, ry: px * 9 })
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={() => setT({ rx: 0, ry: 0 })}
            animate={{ rotateX: t.rx, rotateY: t.ry }}
            transition={{ type: 'spring', stiffness: 180, damping: 20 }}
            style={{ transformPerspective: 1000 }}
            className="group relative rounded-3xl border border-white/10 bg-nova-panel overflow-hidden hover:border-nova-lime/40 transition-colors duration-300 will-change-transform"
        >
            {children}
            <span className="absolute top-5 right-6 font-display text-white/20 text-sm tracking-[0.3em]">
                {String(index + 1).padStart(2, '0')}
            </span>
        </motion.div>
    )
}

export default function Projects({ projects }: { projects: ProjectItem[] }) {
    const featured = projects.slice(0, 6)

    return (
        <section id="work" className="relative bg-nova-ink py-24 md:py-36">
            <div className="max-w-7xl mx-auto px-5 md:px-8">
                <SectionHead
                    index="04"
                    label="Selected Work"
                    title={<>Work that <span className="text-nova-lime">works.</span></>}
                    blurb="Real products, real users, real revenue — not tutorial clones."
                />

                <div className="grid md:grid-cols-2 gap-5 md:gap-7">
                    {featured.map((p, i) => (
                        <Reveal key={p._id || p.title} delay={(i % 2) * 0.1} y={36}>
                            <TiltCard index={i}>
                                <div className="aspect-[16/10] relative">
                                    <ProjectArt title={p.title} index={i} image={p.image} />
                                </div>
                                <div className="p-6 md:p-8">
                                    <div className="flex items-start justify-between gap-4">
                                        <h3 className="font-display font-bold text-2xl md:text-[1.7rem] text-nova-bone tracking-tight">
                                            {p.title}
                                        </h3>
                                        <div className="flex gap-2 shrink-0">
                                            {p.liveUrl && (
                                                <a
                                                    href={p.liveUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    aria-label={`Open ${p.title}`}
                                                    className="w-10 h-10 rounded-full bg-nova-lime text-nova-ink flex items-center justify-center hover:bg-white hover:rotate-45 transition-all duration-300"
                                                >
                                                    <ArrowUpRight size={18} />
                                                </a>
                                            )}
                                            {p.githubUrl && (
                                                <a
                                                    href={p.githubUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    aria-label={`${p.title} source`}
                                                    className="w-10 h-10 rounded-full border border-white/15 text-nova-bone flex items-center justify-center hover:border-nova-lime hover:text-nova-lime transition-colors"
                                                >
                                                    <Github size={18} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <p className="mt-3 text-nova-mute leading-relaxed text-[15px] line-clamp-2">
                                        {p.description}
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {p.technologies.slice(0, 5).map(t => (
                                            <span key={t} className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-nova-bone/70">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </TiltCard>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
