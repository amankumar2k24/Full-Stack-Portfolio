'use client'

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

/* Fast preloader: counts up, then slides away. Never blocks. */
export default function Preloader({ done }: { done: boolean }) {
    const [count, setCount] = useState(0)
    const [gone, setGone] = useState(false)
    const reduce = useReducedMotion()

    useEffect(() => {
        const start = performance.now()
        const dur = reduce ? 200 : 1100
        let raf = 0
        const tick = (t: number) => {
            const p = Math.min(1, (t - start) / dur)
            setCount(Math.round(p * 100))
            if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [reduce])

    useEffect(() => {
        if (done && count >= 100) {
            const t = setTimeout(() => setGone(true), 250)
            return () => clearTimeout(t)
        }
    }, [done, count])

    // Failsafe: never trap the user
    useEffect(() => {
        const t = setTimeout(() => setGone(true), 4000)
        return () => clearTimeout(t)
    }, [])

    return (
        <AnimatePresence>
            {!gone && (
                <motion.div
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-nova-ink"
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                >
                    <div className="overflow-hidden">
                        <motion.p
                            initial={{ y: '100%' }}
                            animate={{ y: '0%' }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="font-display text-nova-bone text-xl md:text-2xl tracking-[0.35em] uppercase"
                        >
                            Aman Kumar
                        </motion.p>
                    </div>
                    <p className="mt-3 font-display text-nova-lime text-sm tracking-[0.25em]">PORTFOLIO © 2026</p>
                    <div className="absolute bottom-8 right-8 font-display text-6xl md:text-8xl font-bold text-white/10 tabular-nums">
                        {count}
                    </div>
                    <div className="absolute bottom-0 left-0 h-[3px] bg-nova-lime" style={{ width: `${count}%` }} />
                </motion.div>
            )}
        </AnimatePresence>
    )
}
