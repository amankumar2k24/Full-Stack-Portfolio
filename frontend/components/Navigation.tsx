'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Home, User, Code, Briefcase, Mail } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { useUI } from './UIProvider'

const navItems = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: User },
    { name: 'Skills', href: '#skills', icon: Code },
    { name: 'Projects', href: '#projects', icon: Briefcase },
    { name: 'Contact', href: '#contact', icon: Mail },
]

export default function Navigation() {
    const { toggleMobileMenu: setIsOpen, isChatOpen } = useUI()
    const [activeSection, setActiveSection] = useState('home')
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)

            // Update active section based on scroll position
            const sections = navItems.map(item => item.href.substring(1))
            const isMobile = window.innerWidth < 768
            const headerOffset = isMobile ? 100 : 80
            const threshold = isMobile ? 100 : 50

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
            // Close mobile menu first
            setIsOpen(false)

            // Small delay to allow menu animation to complete
            setTimeout(() => {
                // Dynamic header offset based on screen size
                const isMobile = window.innerWidth < 768
                const headerOffset = isMobile ? 120 : 80 // More offset for mobile

                // Get the section heading element for better positioning
                const sectionHeading = element.querySelector('h1, h2')
                const targetElement = sectionHeading || element

                const elementPosition = targetElement.getBoundingClientRect().top
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                })
            }, 150) // Small delay to allow state change to propagate
        } else {
            setIsOpen(false)
        }
    }

    return (
        <>
            {/* Desktop Navigation */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden md:block ${scrolled
                    ? 'bg-background/80 backdrop-blur-md border-b border-border'
                    : 'bg-transparent'
                    }`}
            >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
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
                        </div>
                    </div>
                </div>
            </motion.nav>
        </>
    )
}