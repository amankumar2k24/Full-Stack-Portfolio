'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Reveal, SectionHead } from './ui'
import type { ServiceItem } from './data'

export default function Services({ services }: { services: ServiceItem[] }) {
    const [open, setOpen] = useState<number | null>(0)

    return (
        <section id="services" className="relative bg-nova-ink py-24 md:py-36">
            <div className="max-w-7xl mx-auto px-5 md:px-8">
                <SectionHead
                    index="05"
                    label="Services"
                    title={<>What I can do <span className="text-nova-lime">for you.</span></>}
                    blurb="End-to-end product development — you bring the idea, I ship the rest."
                />

                <div className="border-t border-white/10">
                    {services.map((s, i) => {
                        const isOpen = open === i
                        return (
                            <Reveal key={s._id || s.title} delay={0.04}>
                                <div className="border-b border-white/10">
                                    <button
                                        onClick={() => setOpen(isOpen ? null : i)}
                                        className="w-full flex items-center gap-5 md:gap-8 py-6 md:py-8 text-left group"
                                        aria-expanded={isOpen}
                                    >
                                        <span className="font-display text-sm text-nova-mute w-8 shrink-0">
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <span className={`font-display font-bold text-xl md:text-3xl tracking-tight flex-1 transition-colors ${isOpen ? 'text-nova-lime' : 'text-nova-bone group-hover:text-nova-lime'}`}>
                                            {s.title}
                                        </span>
                                        <motion.span
                                            animate={{ rotate: isOpen ? 45 : 0 }}
                                            transition={{ duration: 0.3 }}
                                            className={`w-11 h-11 shrink-0 rounded-full border flex items-center justify-center transition-colors ${isOpen ? 'bg-nova-lime border-nova-lime text-nova-ink' : 'border-white/20 text-nova-bone'}`}
                                        >
                                            <Plus size={18} />
                                        </motion.span>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pb-8 pl-12 md:pl-16 pr-4">
                                                    <p className="text-nova-mute max-w-2xl leading-relaxed">{s.description}</p>
                                                    {s.features?.length > 0 && (
                                                        <div className="mt-4 flex flex-wrap gap-1.5">
                                                            {s.features.map(f => (
                                                                <span key={f} className="text-xs px-3 py-1.5 rounded-full bg-nova-lime/10 border border-nova-lime/25 text-nova-lime">
                                                                    {f}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </Reveal>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
