'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, User, Code, Briefcase, Mail, Sun, Moon, Menu, X } from 'lucide-react'
import { useTheme } from '@/components/ThemeProvider'
import { useUI } from '@/components/UIProvider'

const navItems = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: User },
    { name: 'Skills', href: '#skills', icon: Code },
    { name: 'Projects', href: '#projects', icon: Briefcase },
    { name: 'Contact', href: '#contact', icon: Mail },
]

export default function MobileNav() {
    const { isMobileMenuOpen: isOpen, toggleMobileMenu: setIsOpen, isChatOpen } = useUI()
    const [activeSection, setActiveSection] = useState('home')
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    // Handle scroll to highlight active section
    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(item => item.href.substring(1))
            const headerOffset = 100
            const threshold = 150

            const currentSection = sections.find(section => {
                const element = document.getElementById(section)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    return rect.top <= headerOffset + threshold && rect.bottom >= headerOffset + threshold
                }
                return false
            })

            if (currentSection) {
                setActiveSection(currentSection)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            const headerOffset = 80
            const sectionHeading = element.querySelector('h1, h2')
            const targetElement = sectionHeading || element
            const elementPosition = targetElement.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })
            setIsOpen(false)
        }
    }

    if (isChatOpen) return null

    return (
        <div className="md:hidden">
            {/* Branding (AK) - Relative to scroll away */}
            <div className="relative pt-6 pl-4 z-50 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="relative inline-block pointer-events-auto"
                    onClick={() => scrollToSection('home')}
                >
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent cursor-pointer">
                        AK
                    </span>
                </motion.div>
            </div>

            {/* Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            {/* Trigger Button (Top-Right Floating) */}
            <motion.button
                layout
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed top-4 right-4 z-50 p-2 rounded-full bg-black/90 backdrop-blur-xl border border-white/10 shadow-[0_0_20px_rgba(99,102,241,0.2)] text-white transition-all duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
                <Menu size={22} />
            </motion.button>

            {/* Sliding Half-Sun Menu */}
            <motion.div
                initial={false}
                animate={{
                    top: '120px',
                    right: 0,
                    scale: isOpen ? 1 : 0,
                    opacity: isOpen ? 1 : 0,
                    x: isOpen ? 0 : 50
                }}
                transition={{
                    type: "spring",
                    stiffness: 450,
                    damping: 35
                }}
                className="fixed z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-2xl rounded-l-[3rem] py-10 pr-2 pl-4 pointer-events-auto origin-right"
                style={{
                    boxShadow: '0 0 40px rgba(99, 102, 241, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.05), -10px 0 30px rgba(99, 102, 241, 0.2)',
                    width: '80px',
                    borderRight: 'none'
                }}
            >
                {/* Close Button Inside Menu */}
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                    <X size={20} className="text-white/50" />
                </motion.button>

                <div className="flex flex-col gap-5 mt-6 w-full items-center text-white">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = activeSection === item.href.substring(1)

                        return (
                            <button
                                key={item.name}
                                onClick={() => {
                                    scrollToSection(item.href.substring(1))
                                    setIsOpen(false)
                                }}
                                className="relative flex items-center justify-center p-2 rounded-full transition-all duration-300 w-full group"
                                aria-label={item.name}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="mobileNavMenu"
                                        className="absolute inset-0 bg-white/10 rounded-full mx-1"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <div className={`relative z-10 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                                    <Icon size={22} className={isActive ? "stroke-2" : "stroke-1.5"} />
                                </div>

                                {/* Hover Tooltip */}
                                <div className="absolute right-full mr-4 px-3 py-1.5 bg-black backdrop-blur-xl border border-white/10 rounded-lg text-sm font-medium text-white opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-2xl">
                                    {item.name}
                                    {/* Tooltip Arrow */}
                                    <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-black border-t border-r border-white/10 transform rotate-45" />
                                </div>
                            </button>
                        )
                    })}

                    {/* Divider */}
                    <div className="h-px w-8 bg-white/10" />

                    {/* Theme Toggle */}
                    {mounted && (
                        <button
                            onClick={() => {
                                setTheme(theme === 'dark' ? 'light' : 'dark')
                                setTimeout(() => setIsOpen(false), 200) // Small delay for visual feedback
                            }}
                            className="p-2 rounded-full text-gray-400 hover:text-yellow-400 hover:bg-white/5 transition-colors relative flex items-center justify-center min-h-[40px] w-full group"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={theme}
                                    initial={{ y: -10, opacity: 0, rotate: -90 }}
                                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                                    exit={{ y: 10, opacity: 0, rotate: 90 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute"
                                >
                                    {theme === 'dark' ? <Moon size={22} /> : <Sun size={22} />}
                                </motion.div>
                            </AnimatePresence>

                            {/* Hover Tooltip */}
                            <div className="absolute right-full mr-4 px-3 py-1.5 bg-black backdrop-blur-xl border border-white/10 rounded-lg text-sm font-medium text-white opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-2xl">
                                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                                {/* Tooltip Arrow */}
                                <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-black border-t border-r border-white/10 transform rotate-45" />
                            </div>
                        </button>
                    )}
                </div>
            </motion.div>
        </div>
    )
}
