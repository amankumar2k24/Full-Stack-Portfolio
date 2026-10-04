'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { Magnetic } from './ui'

const LINKS = [
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#work' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
]

export default function Navbar({ name }: { name: string }) {
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [open ])

    const go = (href: string) => {
        setOpen(false)
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }

    const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

    return (
        <>
            <motion.header
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 inset-x-0 z-[80] transition-all duration-300 ${scrolled
                    ? 'bg-nova-ink/85 backdrop-blur-xl border-b border-white/10'
                    : 'bg-transparent border-b border-transparent'
                    }`}
            >
                <nav className="max-w-7xl mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
                    <button onClick={() => go('#top')} className="flex items-center gap-3 group">
                        <span className="w-9 h-9 rounded-full bg-nova-lime text-nova-ink font-display font-bold text-sm flex items-center justify-center group-hover:rotate-[20deg] transition-transform duration-300">
                            {initials}
                        </span>
                        <span className="font-display font-bold tracking-tight text-nova-bone text-lg hidden sm:block">
                            {name}
                        </span>
                    </button>

                    <div className="hidden md:flex items-center gap-8">
                        {LINKS.map(l => (
                            <button
                                key={l.href}
                                onClick={() => go(l.href)}
                                className="relative text-sm text-nova-mute hover:text-nova-bone transition-colors font-medium tracking-wide group"
                            >
                                {l.name}
                                <span className="absolute -bottom-1 left-0 h-px w-0 bg-nova-lime group-hover:w-full transition-all duration-300" />
                            </button>
                        ))}
                        <Magnetic>
                            <button
                                onClick={() => go('#contact')}
                                className="ml-2 inline-flex items-center gap-1.5 bg-nova-lime text-nova-ink font-display font-bold text-sm px-5 py-2.5 rounded-full hover:bg-white transition-colors"
                            >
                                Hire Me <ArrowUpRight size={16} />
                            </button>
                        </Magnetic>
                    </div>

                    <button
                        onClick={() => setOpen(true)}
                        className="md:hidden w-10 h-10 flex items-center justify-center rounded-full border border-white/15 text-nova-bone"
                        aria-label="Open menu"
                    >
                        <Menu size={20} />
                    </button>
                </nav>
            </motion.header>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-[90] bg-nova-ink/95 backdrop-blur-2xl md:hidden flex flex-col"
                    >
                        <div className="flex items-center justify-between px-5 h-16">
                            <span className="font-display font-bold text-nova-bone text-lg">{name}</span>
                            <button
                                onClick={() => setOpen(false)}
                                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/15 text-nova-bone"
                                aria-label="Close menu"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="flex-1 flex flex-col justify-center px-8 gap-2">
                            {LINKS.map((l, i) => (
                                <motion.button
                                    key={l.href}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.06 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    onClick={() => go(l.href)}
                                    className="text-left font-display font-bold text-4xl text-nova-bone py-2 hover:text-nova-lime transition-colors"
                                >
                                    <span className="text-sm text-nova-lime mr-3 align-top">0{i + 1}</span>
                                    {l.name}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
