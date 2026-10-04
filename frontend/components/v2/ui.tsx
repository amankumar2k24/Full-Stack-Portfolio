'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useRef, useState, type ReactNode, type MouseEvent } from 'react'

/* Fade-and-rise reveal on scroll — transform/opacity only (GPU cheap) */
export function Reveal({
    children,
    delay = 0,
    y = 28,
    className = '',
}: {
    children: ReactNode
    delay?: number
    y?: number
    className?: string
}) {
    const reduce = useReducedMotion()
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: reduce ? 0 : y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    )
}

/* Editorial section heading: 01 / ABOUT */
export function SectionHead({
    index,
    label,
    title,
    blurb,
}: {
    index: string
    label: string
    title: ReactNode
    blurb?: string
}) {
    return (
        <div className="mb-12 md:mb-16">
            <Reveal>
                <div className="flex items-center gap-4 mb-5">
                    <span className="font-display text-sm tracking-[0.3em] text-nova-lime">{index}</span>
                    <span className="h-px flex-1 bg-white/10" />
                    <span className="font-display text-sm tracking-[0.3em] text-white/40 uppercase">{label}</span>
                </div>
            </Reveal>
            <Reveal delay={0.08}>
                <h2 className="font-display font-bold text-4xl md:text-6xl leading-[1.02] tracking-tight text-nova-bone">
                    {title}
                </h2>
            </Reveal>
            {blurb && (
                <Reveal delay={0.16}>
                    <p className="mt-4 max-w-xl text-nova-mute text-base md:text-lg">{blurb}</p>
                </Reveal>
            )}
        </div>
    )
}

/* Magnetic hover wrapper — springs toward cursor, transform only */
export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const [pos, setPos] = useState({ x: 0, y: 0 })
    const reduce = useReducedMotion()

    const onMove = (e: MouseEvent) => {
        if (reduce || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        setPos({
            x: (e.clientX - (r.left + r.width / 2)) * strength,
            y: (e.clientY - (r.top + r.height / 2)) * strength,
        })
    }
    const onLeave = () => setPos({ x: 0, y: 0 })

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            animate={{ x: pos.x, y: pos.y }}
            transition={{ type: 'spring', stiffness: 200, damping: 16, mass: 0.4 }}
            className="inline-block"
        >
            {children}
        </motion.div>
    )
}

/* Split text into animated chars for the hero */
export function SplitChars({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
    const reduce = useReducedMotion()
    return (
        <span className={className} aria-label={text}>
            {text.split('').map((ch, i) => (
                <motion.span
                    key={i}
                    aria-hidden
                    className="inline-block will-change-transform"
                    initial={{ y: reduce ? 0 : '110%', rotate: reduce ? 0 : 6 }}
                    animate={{ y: '0%', rotate: 0 }}
                    transition={{ duration: 0.9, delay: delay + i * 0.035, ease: [0.22, 1, 0.36, 1] }}
                >
                    {ch === ' ' ? '\u00A0' : ch}
                </motion.span>
            ))}
        </span>
    )
}
