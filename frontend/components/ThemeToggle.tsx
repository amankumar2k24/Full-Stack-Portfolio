'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from './ThemeProvider'

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const themes = [
        { name: 'light', icon: Sun, label: 'Light' },
        { name: 'dark', icon: Moon, label: 'Dark' },
    ] as const

    const currentIndex = themes.findIndex(t => t.name === theme)
    const nextTheme = themes[(currentIndex + 1) % themes.length]

    if (!mounted) {
        return (
            <div className="relative p-3 rounded-full bg-card border border-border w-11 h-11" />
        )
    }

    return (
        <motion.button
            onClick={() => setTheme(nextTheme.name)}
            className="relative p-3 rounded-full bg-card border border-border hover:bg-accent transition-all duration-300 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={`Switch to ${nextTheme.label} theme`}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={theme}
                    initial={{ y: -20, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 20, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                    className="w-5 h-5"
                >
                    {themes.map(({ name, icon: Icon }) =>
                        name === theme ? <Icon key={name} size={20} /> : null
                    )}
                </motion.div>
            </AnimatePresence>
        </motion.button>
    )
}