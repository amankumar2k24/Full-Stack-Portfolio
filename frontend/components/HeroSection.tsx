'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Github, Linkedin, Mail, Sparkles, Code, Zap } from 'lucide-react'
import api from '@/lib/api'
import SimpleFloatingElements from './SimpleFloatingElements'

interface AboutData {
    name: string
    title: string
    bio: string
    location: string
    resumeLink?: string
    socials?: {
        github?: string
        linkedin?: string
        twitter?: string
        email?: string
    }
}

function RotatingTypewriter() {
    const titles = ['Senior Full Stack Developer', 'Freelancer']
    const [currentTitleIndex, setCurrentTitleIndex] = useState(0)
    const [displayText, setDisplayText] = useState('')
    const [isTyping, setIsTyping] = useState(true)
    const [currentCharIndex, setCurrentCharIndex] = useState(0)

    useEffect(() => {
        const currentTitle = titles[currentTitleIndex]

        if (isTyping) {
            if (currentCharIndex < currentTitle.length) {
                const timeout = setTimeout(() => {
                    setDisplayText(prev => prev + currentTitle[currentCharIndex])
                    setCurrentCharIndex(prev => prev + 1)
                }, 100)
                return () => clearTimeout(timeout)
            } else {
                // Finished typing, wait then start erasing
                const timeout = setTimeout(() => {
                    setIsTyping(false)
                }, 2000)
                return () => clearTimeout(timeout)
            }
        } else {
            // Erasing
            if (displayText.length > 0) {
                const timeout = setTimeout(() => {
                    setDisplayText(prev => prev.slice(0, -1))
                }, 50)
                return () => clearTimeout(timeout)
            } else {
                // Finished erasing, move to next title
                setCurrentTitleIndex(prev => (prev + 1) % titles.length)
                setCurrentCharIndex(0)
                setIsTyping(true)
            }
        }
    }, [currentTitleIndex, displayText, isTyping, currentCharIndex, titles])

    return (
        <span className="inline-block min-h-[2rem]">
            {displayText}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-0.5 h-6 bg-primary ml-1"
            />
        </span>
    )
}

function FloatingIcons() {
    const icons = [
        { Icon: Code, delay: 0, position: { x: -20, y: -30 } },
        { Icon: Zap, delay: 0.5, position: { x: 30, y: -20 } },
        { Icon: Sparkles, delay: 1, position: { x: -30, y: 20 } },
    ]

    return (
        <>
            {icons.map(({ Icon, delay, position }, index) => (
                <motion.div
                    key={index}
                    className="absolute text-primary/30"
                    style={{
                        left: `calc(50% + ${position.x}px)`,
                        top: `calc(50% + ${position.y}px)`
                    }}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                        rotate: [0, 180, 360],
                        y: [0, -50, -100]
                    }}
                    transition={{
                        duration: 4,
                        delay,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <Icon size={24} />
                </motion.div>
            ))}
        </>
    )
}

export default function HeroSection() {
    const [about, setAbout] = useState<AboutData | null>(null)
    const [showTypewriter, setShowTypewriter] = useState(false)

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const response = await api.get('/about')
                setAbout(response.data)
            } catch (error) {
                console.error('Failed to fetch about data:', error)
            } finally {
                setTimeout(() => setShowTypewriter(true), 1000)
            }
        }

        fetchAbout()
    }, [])

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        element?.scrollIntoView({ behavior: 'smooth' })
    }

    // Remove the loading state since we have the main portfolio loader
    // if (loading) {
    //     return (
    //         <div className="flex items-center justify-center min-h-screen">
    //             <motion.div
    //                 className="text-center space-y-4"
    //                 initial={{ opacity: 0 }}
    //                 animate={{ opacity: 1 }}
    //             >
    //                 <motion.div
    //                     className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto"
    //                     animate={{ rotate: 360 }}
    //                     transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    //                 />
    //                 <p className="text-muted-foreground">Loading amazing portfolio...</p>
    //             </motion.div>
    //         </div>
    //     )
    // }

    return (
        <div className="relative min-h-screen w-full max-w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 max-[719px]:bg-background pt-0">
            {/* Simple Floating Elements */}
            <SimpleFloatingElements />

            {/* Animated background gradients - hidden on mobile for performance */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none hidden min-[720px]:block">
                <motion.div
                    className="absolute -top-20 -right-20 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 180, 360]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute -bottom-20 -left-20 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1.1, 1, 1.1],
                        rotate: [360, 180, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            {/* Simple mobile background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none min-[720px]:hidden">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-2xl" />
            </div>

            {/* Floating Icons - hidden on mobile for performance */}
            <div className="hidden min-[720px]:block">
                <FloatingIcons />
            </div>

            <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 w-full">
                {/* Main heading */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <motion.h1
                        className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent leading-tight"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        {about?.name || 'Aman Kumar'}
                    </motion.h1>
                </motion.div>

                {/* Animated subtitle */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mb-6 sm:mb-8"
                >
                    <h2 className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-2">
                        {showTypewriter ? (
                            <span className="hidden min-[720px]:inline">
                                <RotatingTypewriter />
                            </span>
                        ) : null}
                        <span className="min-[720px]:hidden">
                            Senior Full Stack Developer
                        </span>
                    </h2>
                    <motion.div
                        className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2 }}
                    >
                        {['🚀 Innovative', '💡 Creative', '⚡ Fast', '🎯 Precise'].map((tag, index) => (
                            <motion.span
                                key={tag}
                                className="px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-medium"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 2.5 + index * 0.2, type: "spring" }}
                                whileHover={{ scale: 1.1 }}
                            >
                                {tag}
                            </motion.span>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Bio */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mb-8 sm:mb-12"
                >
                    <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
                        {about?.bio || 'Passionate about creating innovative solutions and beautiful user experiences that make a difference in the digital world.'}
                    </p>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="flex justify-center mb-8 sm:mb-12 px-4"
                >
                    <motion.button
                        onClick={() => scrollToSection('contact')}
                        className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all duration-300 text-sm sm:text-base font-medium"
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Mail size={18} />
                        Let's Collaborate
                    </motion.button>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="flex justify-center gap-4 sm:gap-6 mb-16 sm:mb-20"
                >
                    {about?.socials?.github && (
                        <motion.a
                            href={about.socials.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 sm:p-4 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 group"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Github size={20} className="group-hover:text-primary transition-colors" />
                        </motion.a>
                    )}
                    {about?.socials?.linkedin && (
                        <motion.a
                            href={about.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 sm:p-4 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 group"
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Linkedin size={20} className="group-hover:text-primary transition-colors" />
                        </motion.a>
                    )}
                    {about?.socials?.email && (
                        <motion.a
                            href={`mailto:${about.socials.email}`}
                            className="p-3 sm:p-4 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 group"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Mail size={20} className="group-hover:text-primary transition-colors" />
                        </motion.a>
                    )}
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                    className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
                >
                    <motion.button
                        onClick={() => scrollToSection('about')}
                        className="p-2 rounded-full hover:bg-accent transition-colors group"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        whileHover={{ scale: 1.1 }}
                    >
                        <ChevronDown size={24} className="group-hover:text-primary transition-colors" />
                    </motion.button>
                </motion.div>
            </div>
        </div>
    )
}