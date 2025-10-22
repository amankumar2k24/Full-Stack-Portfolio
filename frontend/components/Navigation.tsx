'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Home, User, Code, Briefcase, Mail, Settings } from 'lucide-react'
import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'

const navItems = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: User },
    { name: 'Skills', href: '#skills', icon: Code },
    { name: 'Projects', href: '#projects', icon: Briefcase },
    { name: 'Contact', href: '#contact', icon: Mail },
]

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('home')
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)

            // Update active section based on scroll position
            const sections = navItems.map(item => item.href.substring(1))
            const headerOffset = 80
            const currentSection = sections.find(section => {
                const element = document.getElementById(section)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    return rect.top <= headerOffset + 50 && rect.bottom >= headerOffset + 50
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
            const headerOffset = 80 // Account for fixed header height
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })
        }
        setIsOpen(false)
    }

    return (
        <>
            {/* Desktop Navigation */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-background/80 backdrop-blur-md border-b border-border'
                    : 'bg-transparent'
                    }`}
            >
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="text-xl font-bold"
                        >
                            <button onClick={() => scrollToSection('home')}>
                                AK
                            </button>
                        </motion.div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navItems.map((item) => (
                                <motion.button
                                    key={item.name}
                                    onClick={() => scrollToSection(item.href.substring(1))}
                                    className={`relative px-3 py-2 text-sm font-medium transition-colors ${activeSection === item.href.substring(1)
                                        ? 'text-primary'
                                        : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {item.name}
                                    {activeSection === item.href.substring(1) && (
                                        <motion.div
                                            layoutId="activeSection"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </motion.button>
                            ))}

                            <ThemeToggle />

                            {/* <Link href="/admin/login">
                                <motion.button
                                    className="p-2 rounded-full hover:bg-accent transition-colors"
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Settings size={18} />
                                </motion.button>
                            </Link> */}
                        </div>

                        {/* Mobile Menu Button */}
                        <motion.button
                            className="md:hidden p-2 rounded-lg hover:bg-accent"
                            onClick={() => setIsOpen(!isOpen)}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="fixed inset-0 z-40 md:hidden"
                    >
                        <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />
                        <div className="absolute right-0 top-0 h-full w-64 bg-card border-l border-border p-6">
                            <div className="flex flex-col space-y-6 mt-16">
                                {navItems.map((item) => {
                                    const Icon = item.icon
                                    return (
                                        <motion.button
                                            key={item.name}
                                            onClick={() => scrollToSection(item.href.substring(1))}
                                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeSection === item.href.substring(1)
                                                ? 'bg-primary text-primary-foreground'
                                                : 'hover:bg-accent'
                                                }`}
                                            whileHover={{ x: 4 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Icon size={20} />
                                            <span>{item.name}</span>
                                        </motion.button>
                                    )
                                })}

                                <div className="flex items-center justify-between px-4 py-3">
                                    <span className="text-sm font-medium">Theme</span>
                                    <ThemeToggle />
                                </div>

                                {/* <Link href="/admin/login">
                                    <motion.button
                                        className="flex items-center space-x-3 px-4 py-3 rounded-lg text-left hover:bg-accent w-full"
                                        whileHover={{ x: 4 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Settings size={20} />
                                        <span>Admin</span>
                                    </motion.button>
                                </Link> */}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}