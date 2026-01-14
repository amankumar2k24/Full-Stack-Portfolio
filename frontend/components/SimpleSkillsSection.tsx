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
    'Next.js': { icon: SiNextdotjs, color: '#FBBF24', category: 'Frontend' },
    'NextJS': { icon: SiNextdotjs, color: '#FBBF24', category: 'Frontend' },
    'NestJS': { icon: SiNestjs, color: '#E0234E', category: 'Backend' },
    'Nest.js': { icon: SiNestjs, color: '#E0234E', category: 'Backend' },
    'Node.js': { icon: SiNodedotjs, color: '#339933', category: 'Backend' },
    'NodeJS': { icon: SiNodedotjs, color: '#339933', category: 'Backend' },
    'TypeScript': { icon: SiTypescript, color: '#3178C6', category: 'Language' },
    'Express.js': { icon: SiExpress, color: '#68D391', category: 'Backend' },
    'Express': { icon: SiExpress, color: '#68D391', category: 'Backend' },
    'ExpressJS': { icon: SiExpress, color: '#68D391', category: 'Backend' },
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
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
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
        <section id="skills" className="py-16 sm:py-24 px-6 relative overflow-hidden bg-gradient-to-br from-muted/20 via-background to-muted/20">
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

            {/* Radial gradients */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent pb-2">
                        Skills & Technologies
                    </h2>
                    <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
                        Core technologies I use to build modern, scalable applications
                    </p>
                </motion.div>

                {/* Skills Grid */}
                {featuredSkills.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-16">
                        {featuredSkills.map((skill, index) => {
                            const Icon = skill.icon
                            const circumference = 2 * Math.PI * 40
                            const strokeDashoffset = circumference - (skill.level / 100) * circumference

                            return (
                                <motion.div
                                    key={skill.name}
                                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.05,
                                        type: "spring",
                                        stiffness: 100
                                    }}
                                    className="group relative"
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    <motion.div
                                        className="relative p-5 transition-all duration-500 flex flex-col items-center justify-center"
                                        animate={{
                                            y: hoveredIndex === index ? -10 : 0,
                                            scale: hoveredIndex === index ? 1.05 : 1
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >

                                        {/* Top Pill Label */}
                                        <div className="mb-4">
                                            <div
                                                className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors duration-300 bg-white/50 dark:bg-transparent whitespace-nowrap"
                                                style={{
                                                    color: 'var(--foreground)', // Will need to ensure this variable exists or use darker text for light mode
                                                    borderColor: `${skill.color}50`
                                                }}
                                            >
                                                <span className="text-gray-800 dark:text-slate-200">{skill.name}</span>
                                            </div>
                                        </div>

                                        {/* Circular Progress with Icon in Center */}
                                        <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                                            <svg className="transform -rotate-90 w-full h-full relative z-10" viewBox="0 0 100 100">
                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r="40"
                                                    stroke={skill.color}
                                                    strokeWidth="6"
                                                    strokeOpacity="0.2"
                                                    fill="none"
                                                />
                                                <motion.circle
                                                    cx="50"
                                                    cy="50"
                                                    r="40"
                                                    stroke={skill.color}
                                                    strokeWidth="6"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
                                                    whileInView={{
                                                        strokeDashoffset: strokeDashoffset
                                                    }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1.5, delay: index * 0.05 + 0.3, ease: "easeOut" }}
                                                />
                                            </svg>

                                            {/* Icon in center */}
                                            <div
                                                className="absolute inset-0 flex items-center justify-center"
                                                style={{ perspective: '1000px' }}
                                            >
                                                <motion.div
                                                    animate={{
                                                        scale: hoveredIndex === index ? 1.15 : 1,
                                                        rotateY: hoveredIndex === index ? 360 : 0
                                                    }}
                                                    transition={{ duration: 0.6 }}
                                                >
                                                    <Icon size={32} style={{ color: skill.color }} className="sm:w-9 sm:h-9" />
                                                </motion.div>
                                            </div>

                                            {/* Percentage badge - Solid background, no glassmorphism */}
                                            <motion.div
                                                className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full border bg-white dark:bg-[#0a0e1a]"
                                                style={{
                                                    borderColor: `${skill.color}40`
                                                }}
                                                initial={{ scale: 0, opacity: 0 }}
                                                whileInView={{ scale: 1, opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.4, delay: index * 0.05 + 0.8, type: "spring" }}
                                            >
                                                <span
                                                    className="text-xs font-bold"
                                                    style={{ color: skill.color }}
                                                >
                                                    {skill.level}%
                                                </span>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-400">No featured skills available.</p>
                    </div>
                )}

                <motion.div
                    className="flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <motion.button
                        onClick={() => router.push('/skills-technologies')}
                        className="group relative px-8 py-3 bg-white text-gray-900 rounded-full font-semibold transition-all duration-300 hover:bg-gray-50 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background border border-gray-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <span>See All Skills</span>
                            <motion.svg
                                width="20"
                                height="20"
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
                    </motion.button>
                </motion.div>
            </div>
        </section>
    )
}
