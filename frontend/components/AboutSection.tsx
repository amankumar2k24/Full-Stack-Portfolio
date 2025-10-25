'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'
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

interface Stat {
    _id: string
    key: string
    label: string
    value: string
    icon: string
    color: string
    order: number
    isActive: boolean
    description?: string
}

export default function AboutSection() {
    const [about, setAbout] = useState<AboutData | null>(null)
    const [stats, setStats] = useState<Stat[]>([])
    const [loading, setLoading] = useState(true)
    const [statsLoading, setStatsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch about data
                const aboutResponse = await api.get('/about')
                setAbout(aboutResponse.data)

                // Fetch stats data
                const statsResponse = await api.get('/stats')
                const activeStats = statsResponse.data
                    .filter((stat: Stat) => stat.isActive)
                    .sort((a: Stat, b: Stat) => a.order - b.order)
                    .slice(0, 4) // Only take first 4 stats for the about section
                setStats(activeStats)
            } catch (error) {
                console.error('Failed to fetch data:', error)
            } finally {
                setLoading(false)
                setStatsLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) {
        return (
            <div className="bg-card p-8 rounded-lg border animate-pulse">
                <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
                <div className="h-6 bg-muted rounded w-1/2 mb-6"></div>
                <div className="space-y-3">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                </div>
            </div>
        )
    }

    if (!about) {
        return (
            <div className="bg-card p-8 rounded-lg border text-center">
                <p className="text-muted-foreground">No about information available.</p>
            </div>
        )
    }

    const socialIcons = {
        github: Github,
        linkedin: Linkedin,
        twitter: Twitter,
        email: Mail,
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
            >
                <div>
                    <motion.h3
                        className="text-3xl font-bold mb-2"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {about.name}
                    </motion.h3>
                    <motion.p
                        className="text-xl text-primary mb-2"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        {about.title}
                    </motion.p>
                    <motion.p
                        className="text-muted-foreground"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        📍 {about.location}
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                        {about.bio}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-wrap gap-4 items-center"
                >
                    {/* {about.resumeLink && (
                        <motion.a
                            href={about.resumeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Download size={18} />
                            Download Resume
                        </motion.a>
                    )} */}

                    <div className="flex gap-3">
                        {about.socials && Object.entries(about.socials).map(([platform, url], index) => {
                            if (!url) return null
                            const Icon = socialIcons[platform as keyof typeof socialIcons]
                            if (!Icon) return null

                            return (
                                <motion.a
                                    key={platform}
                                    href={platform === 'email' ? `mailto:${url}` : url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-full border border-muted hover:border-primary hover:bg-primary/10 transition-all duration-300"
                                    whileHover={{ scale: 1.1, rotate: index % 2 === 0 ? 5 : -5 }}
                                    whileTap={{ scale: 0.9 }}
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
                                >
                                    <Icon size={20} />
                                </motion.a>
                            )
                        })}
                    </div>
                </motion.div>
            </motion.div>

            {/* Right side - Visual element */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
            >
                <div className="relative bg-gradient-to-br from-primary/20 via-blue-500/20 to-purple-500/20 rounded-2xl p-6 sm:p-8 backdrop-blur-sm border border-primary/20">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl overflow-hidden"></div>
                    <div className="relative z-10 overflow-hidden">
                        <div className="grid grid-cols-2 gap-4 sm:gap-6">
                            {statsLoading ? (
                                // Loading skeleton for stats
                                [...Array(4)].map((_, index) => (
                                    <div key={index} className="text-center">
                                        <div className="h-8 bg-muted rounded w-16 mx-auto mb-2 animate-pulse"></div>
                                        <div className="h-4 bg-muted rounded w-20 mx-auto animate-pulse"></div>
                                    </div>
                                ))
                            ) : stats.length > 0 ? (
                                stats.map((stat, index) => (
                                    <motion.div
                                        key={stat._id}
                                        className="text-center min-[720px]:hover:scale-105 transition-all duration-200 group"
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        whileHover={{ y: -2 }}
                                    >
                                        <motion.div
                                            className="text-2xl sm:text-3xl font-bold mb-2 group-hover:scale-110 transition-transform duration-200"
                                            style={{ color: stat.color }}
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6, delay: index * 0.1 + 0.2, type: "spring" }}
                                        >
                                            {stat.value}
                                        </motion.div>
                                        <div className="text-xs sm:text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                                            {stat.label}
                                        </div>
                                        {stat.description && (
                                            <div className="text-xs text-muted-foreground/70 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                {stat.description}
                                            </div>
                                        )}
                                    </motion.div>
                                ))
                            ) : (
                                // Fallback to default stats if no stats available
                                <>
                                    <div className="text-center min-[720px]:hover:scale-105 transition-transform duration-200">
                                        <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">2.8+</div>
                                        <div className="text-xs sm:text-sm text-muted-foreground">Years Experience</div>
                                    </div>
                                    <div className="text-center min-[720px]:hover:scale-105 transition-transform duration-200">
                                        <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">50+</div>
                                        <div className="text-xs sm:text-sm text-muted-foreground">Projects Completed</div>
                                    </div>
                                    <div className="text-center min-[720px]:hover:scale-105 transition-transform duration-200">
                                        <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">20+</div>
                                        <div className="text-xs sm:text-sm text-muted-foreground">Technologies</div>
                                    </div>
                                    <div className="text-center min-[720px]:hover:scale-105 transition-transform duration-200">
                                        <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">100%</div>
                                        <div className="text-xs sm:text-sm text-muted-foreground">Client Satisfaction</div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}