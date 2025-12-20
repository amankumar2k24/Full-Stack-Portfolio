'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import api from '@/lib/api'
import {
    SiReact, SiNextdotjs, SiNestjs, SiNodedotjs, SiTypescript,
    SiExpress, SiMongodb, SiPostgresql, SiStripe, SiAmazon
} from 'react-icons/si'

interface BackendSkillItem {
    name: string
    level: number
}

interface BackendSkill {
    _id: string
    category: string
    items: BackendSkillItem[]
}

// Icon mapping for the featured skills
const skillIconMap: Record<string, { icon: React.ComponentType<any>; color: string; category: string }> = {
    'React': { icon: SiReact, color: '#61DAFB', category: 'Frontend' },
    'React.js': { icon: SiReact, color: '#61DAFB', category: 'Frontend' },
    'Next.js': { icon: SiNextdotjs, color: '#FBBF24', category: 'Frontend' }, // Changed to yellow
    'NextJS': { icon: SiNextdotjs, color: '#FBBF24', category: 'Frontend' }, // Changed to yellow
    'NestJS': { icon: SiNestjs, color: '#E0234E', category: 'Backend' },
    'Nest.js': { icon: SiNestjs, color: '#E0234E', category: 'Backend' },
    'Node.js': { icon: SiNodedotjs, color: '#339933', category: 'Backend' },
    'NodeJS': { icon: SiNodedotjs, color: '#339933', category: 'Backend' },
    'TypeScript': { icon: SiTypescript, color: '#3178C6', category: 'Language' },
    'Express.js': { icon: SiExpress, color: '#68D391', category: 'Backend' }, // Changed from black to green
    'Express': { icon: SiExpress, color: '#68D391', category: 'Backend' }, // Changed from black to green
    'ExpressJS': { icon: SiExpress, color: '#68D391', category: 'Backend' }, // Changed from black to green
    'MongoDB': { icon: SiMongodb, color: '#47A248', category: 'Database' },
    'PostgreSQL': { icon: SiPostgresql, color: '#336791', category: 'Database' },
    'Stripe': { icon: SiStripe, color: '#635BFF', category: 'Payment' },
    'AWS': { icon: SiAmazon, color: '#FF9900', category: 'Cloud' },
    'Amazon Web Services': { icon: SiAmazon, color: '#FF9900', category: 'Cloud' }
}

// Priority order for featured skills
const featuredSkillNames = [
    'React', 'React.js', 'Next.js', 'NextJS', 'NestJS', 'Nest.js',
    'Node.js', 'NodeJS', 'TypeScript', 'Express.js', 'Express', 'ExpressJS',
    'MongoDB', 'PostgreSQL', 'Stripe', 'AWS', 'Amazon Web Services'
]

interface FeaturedSkill {
    name: string
    level: number
    icon: React.ComponentType<any>
    color: string
    category: string
}

export default function SimpleSkillsSection() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [featuredSkills, setFeaturedSkills] = useState<FeaturedSkill[]>([])

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await api.get('/skills')

                // Extract and filter featured skills
                const allSkillItems: BackendSkillItem[] = []
                response.data.forEach((skillCategory: BackendSkill) => {
                    allSkillItems.push(...skillCategory.items)
                })

                // Filter and map featured skills
                const filtered: FeaturedSkill[] = []

                featuredSkillNames.forEach(skillName => {
                    const foundSkill = allSkillItems.find(item =>
                        item.name.toLowerCase() === skillName.toLowerCase() ||
                        item.name.toLowerCase().includes(skillName.toLowerCase()) ||
                        skillName.toLowerCase().includes(item.name.toLowerCase())
                    )

                    if (foundSkill && skillIconMap[skillName]) {
                        const existing = filtered.find(f => f.name.toLowerCase() === foundSkill.name.toLowerCase())
                        if (!existing) {
                            filtered.push({
                                name: foundSkill.name,
                                level: foundSkill.level,
                                icon: skillIconMap[skillName].icon,
                                color: skillIconMap[skillName].color,
                                category: skillIconMap[skillName].category
                            })
                        }
                    }
                })

                // Limit to 10 skills and sort by priority
                setFeaturedSkills(filtered.slice(0, 10))
            } catch (error) {
                console.error('Failed to fetch skills:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchSkills()
    }, [])

    if (loading) {
        return (
            <section className="py-16 sm:py-20 px-6 bg-gradient-to-br from-muted/20 via-background to-muted/20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse text-center mb-12">
                        <div className="h-12 bg-muted rounded w-1/2 mx-auto mb-4"></div>
                        <div className="h-6 bg-muted rounded w-3/4 mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 mb-12">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="bg-card p-6 rounded-2xl border animate-pulse">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-muted rounded-xl"></div>
                                    <div className="flex-1">
                                        <div className="h-5 bg-muted rounded mb-2"></div>
                                        <div className="h-3 bg-muted rounded w-1/2"></div>
                                    </div>
                                    <div className="h-8 w-12 bg-muted rounded"></div>
                                </div>
                                <div className="h-2 bg-muted rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="py-16 sm:py-20 px-6 bg-gradient-to-br from-muted/20 via-background to-muted/20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                        Skills & Technologies
                    </h2>
                    <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
                        Core technologies I use to build modern, scalable applications
                    </p>
                </motion.div>

                {/* Skills Grid */}
                {featuredSkills.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 mb-12">
                        {featuredSkills.map((skill, index) => {
                            const Icon = skill.icon
                            return (
                                <motion.div
                                    key={skill.name}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    whileHover={{ y: -4, scale: 1.02 }}
                                    className="group relative bg-card/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-border/60 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                                >
                                    {/* Background gradient effect */}
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl"
                                        style={{ backgroundColor: skill.color }}
                                    />

                                    {/* Percentage Badge - Top Right Corner with Half Curve */}
                                    <div className="absolute top-0 right-0 z-20 hidden sm-480:block group-hover:block">
                                        <div
                                            className="px-3 py-2 rounded-bl-2xl bg-black/80 backdrop-blur-sm shadow-lg text-xs sm:text-sm font-bold"
                                            style={{ color: skill.color }}
                                        >
                                            {skill.level}%
                                        </div>
                                    </div>

                                    <div className="relative z-10">
                                        {/* Header with Icon and Name */}
                                        <div className="flex items-center gap-3 mb-3 sm:mb-4 pr-12">
                                            <motion.div
                                                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl flex-shrink-0"
                                                style={{ backgroundColor: `${skill.color}15` }}
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <Icon size={20} style={{ color: skill.color }} className="sm:w-6 sm:h-6" />
                                            </motion.div>
                                            <div className="min-w-0 flex-1">
                                                <h3 className="text-sm sm:text-lg font-bold group-hover:text-primary transition-colors duration-300">
                                                    {skill.name}
                                                </h3>
                                                <p className="text-xs sm:text-sm text-muted-foreground">
                                                    {skill.category}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="relative">
                                            <div className="w-full h-1.5 sm:h-2 bg-muted rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full rounded-full"
                                                    style={{ backgroundColor: skill.color }}
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${skill.level}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Decorative elements */}
                                    <div
                                        className="absolute top-2 right-2 w-12 h-12 sm:w-16 sm:h-16 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                                        style={{ backgroundColor: skill.color }}
                                    />
                                </motion.div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">No featured skills available.</p>
                    </div>
                )}

                {/* See All Skills Button */}
                <div className="flex justify-center">
                    <motion.button
                        onClick={() => router.push('/skills-technologies')}
                        className="group relative px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            See All Skills
                            <motion.svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </motion.svg>
                        </span>

                        {/* Animated background */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.button>
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 -right-32 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -left-32 w-64 h-64 bg-gradient-to-br from-green-500/10 to-cyan-500/10 rounded-full blur-3xl" />
            </div>
        </section>
    )
}