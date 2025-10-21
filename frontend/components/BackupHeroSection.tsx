'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Github, Linkedin, Mail, Download } from 'lucide-react'
import api from '@/lib/api'

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

export default function BackupHeroSection() {
    const [about, setAbout] = useState<AboutData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const response = await api.get('/about')
                setAbout(response.data)
            } catch (error) {
                console.error('Failed to fetch about data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchAbout()
    }, [])

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        element?.scrollIntoView({ behavior: 'smooth' })
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <motion.div
                    className="text-center space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <motion.div
                        className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <p className="text-muted-foreground">Loading portfolio...</p>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden">
            {/* Animated background gradients */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [360, 180, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />
            </div>

            <div className="relative z-10 text-center max-w-4xl mx-auto">
                <motion.h1
                    className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {about?.name || 'Aman Kumar'}
                </motion.h1>

                <motion.h2
                    className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {about?.title || 'Full Stack Developer'}
                </motion.h2>

                <motion.p
                    className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    {about?.bio || 'Passionate about creating innovative solutions and beautiful user experiences'}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
                >
                    {/* {about?.resumeLink && (
                        <motion.a
                            href={about.resumeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Download size={20} />
                            Download Resume
                        </motion.a>
                    )} */}

                    <motion.button
                        onClick={() => scrollToSection('contact')}
                        className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Mail size={20} />
                        Get In Touch
                    </motion.button>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="flex justify-center gap-6 mb-16"
                >
                    {about?.socials?.github && (
                        <motion.a
                            href={about.socials.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full border border-muted hover:border-primary hover:bg-primary/10 transition-all duration-300"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Github size={24} />
                        </motion.a>
                    )}
                    {about?.socials?.linkedin && (
                        <motion.a
                            href={about.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full border border-muted hover:border-primary hover:bg-primary/10 transition-all duration-300"
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Linkedin size={24} />
                        </motion.a>
                    )}
                    {about?.socials?.email && (
                        <motion.a
                            href={`mailto:${about.socials.email}`}
                            className="p-3 rounded-full border border-muted hover:border-primary hover:bg-primary/10 transition-all duration-300"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Mail size={24} />
                        </motion.a>
                    )}
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                    <motion.button
                        onClick={() => scrollToSection('about')}
                        className="p-2 rounded-full hover:bg-accent transition-colors"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <ChevronDown size={24} />
                    </motion.button>
                </motion.div>
            </div>
        </div>
    )
}