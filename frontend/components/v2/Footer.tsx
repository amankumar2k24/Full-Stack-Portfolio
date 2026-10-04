'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { Reveal } from './ui'

export default function Footer({ name }: { name: string }) {
    const [time, setTime] = useState('')

    useEffect(() => {
        const update = () => {
            setTime(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' }))
        }
        update()
        const t = setInterval(update, 30000)
        return () => clearInterval(t)
    }, [])

    return (
        <footer className="relative bg-nova-ink border-t border-white/10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-5 md:px-8 pt-16 pb-8">
                <Reveal>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-14">
                        <div>
                            <p className="text-xs font-display tracking-[0.3em] uppercase text-nova-mute mb-2">Local time — India</p>
                            <p className="font-display font-bold text-3xl text-nova-bone tabular-nums">{time || '--:--'} IST</p>
                        </div>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="group inline-flex items-center gap-3 text-nova-mute hover:text-nova-lime transition-colors"
                        >
                            <span className="text-sm font-display tracking-[0.25em] uppercase">Back to top</span>
                            <span className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center group-hover:border-nova-lime group-hover:-translate-y-1 transition-all">
                                <ArrowUp size={18} />
                            </span>
                        </button>
                    </div>
                </Reveal>

                <div className="select-none pointer-events-none" aria-hidden>
                    <p className="font-display font-bold tracking-[-0.03em] leading-none text-center text-[13.5vw] text-stroke-faint whitespace-nowrap">
                        {name.toUpperCase()}
                    </p>
                </div>

                <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-nova-mute">
                    <p>© 2026 {name}. All rights reserved.</p>
                    <p className="font-display tracking-[0.2em] uppercase text-xs">
                        Designed & built with <span className="text-nova-lime">obsession</span>
                    </p>
                </div>
            </div>
        </footer>
    )
}
