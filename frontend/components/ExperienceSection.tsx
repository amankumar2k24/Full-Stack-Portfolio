'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Calendar, MapPin, Award, TrendingUp, Users, Code2, Zap } from 'lucide-react'
import api from '@/lib/api'

interface Experience {
    _id: string
    title: string
    company: string
    location: string
    duration: string
    description: string
    achievements: string[]
    technologies: string[]
    icon: string
    color: string
    order: number
    isActive: boolean
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





function ExperienceCard({ experience, index }: { experience: Experience, index: number }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const [showAll, setShowAll] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    // Check if screen is mobile (below 720px)
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 720)
        }

        checkScreenSize()
        window.addEventListener('resize', checkScreenSize)
        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])

    // Use icon and color from API data, with fallbacks
    const icons = [Code2, TrendingUp, Users, Award]
    const colors = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b"]
    const Icon = icons[index % icons.length] // Could be enhanced to map experience.icon to actual icon
    const color = experience.color || colors[index % colors.length]

    // Determine which achievements to show
    const achievementsToShow = isMobile && !showAll
        ? experience.achievements.slice(0, 3)
        : experience.achievements
    const hasMoreAchievements = isMobile && experience.achievements.length > 3

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="relative"
        >
            {/* Timeline line */}
            <div className="absolute left-4 top-16 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-transparent hidden md:block" />

            {/* Timeline dot */}
            <motion.div
                className="absolute left-2 top-6 w-4 h-4 rounded-full border-2 border-primary bg-background hidden md:block"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
            />

            <div className="md:ml-12 bg-card rounded-2xl p-6 border shadow-sm hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-start gap-4 mb-4">
                    <motion.div
                        className="p-3 rounded-xl"
                        style={{ backgroundColor: `${color}20` }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                        <Icon size={24} style={{ color: color }} />
                    </motion.div>

                    <div className="flex-1">
                        <h3 className="text-sm max-[420px]:text-xs md:text-lg font-bold group-hover:text-primary transition-colors">
                            {experience.title}
                        </h3>
                        <p className="text-xs max-[420px]:text-[12px] md:text-sm text-primary font-semibold">{experience.company}</p>
                        <div className="flex flex-wrap gap-4 text-[12px] max-[420px]:text-[10px] md:text-xs text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                                <MapPin size={14} />
                                {experience.location}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar size={14} />
                                {experience.duration}
                            </span>
                        </div>
                    </div>
                </div>

                <p className="text-[12px] max-[420px]:text-[12px] sm:text-[15px] text-muted-foreground mb-4 leading-relaxed">
                    {experience.description}
                </p>

                <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-[12px] max-[420px]:text-[12px] sm:text-[16px]">Key Achievements:</h4>
                    <ul className="space-y-2">
                        {achievementsToShow.map((achievement, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.5, delay: index * 0.2 + 0.5 + i * 0.1 }}
                                className="flex items-start gap-3 text-[12px] max-[420px]:text-[12px] sm:text-[15px] text-muted-foreground"
                            >
                                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                                <span className="leading-relaxed">{achievement}</span>
                            </motion.li>
                        ))}
                    </ul>

                    {/* Show More/Less Button for Mobile */}
                    {hasMoreAchievements && (
                        <motion.button
                            onClick={() => setShowAll(!showAll)}
                            className="mt-3 text-xs text-primary hover:text-primary/80 transition-colors font-medium flex items-center gap-1"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {showAll ? 'Show Less' : `Show More (${experience.achievements.length - 5} more)`}
                            <motion.div
                                animate={{ rotate: showAll ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                ▼
                            </motion.div>
                        </motion.button>
                    )}
                </div>

                <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, i) => (
                        <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.3, delay: index * 0.2 + 0.7 + i * 0.05 }}
                            className="px-2 py-1 bg-accent text-accent-foreground rounded-md text-[10px] sm:text-xs font-medium"
                            whileHover={{ scale: 1.05 }}
                        >
                            {tech}
                        </motion.span>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

function StatCard({ stat, index }: { stat: Stat, index: number }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    // Map icon names to actual icons
    const iconMap: { [key: string]: any } = {
        Calendar,
        Award,
        Users,
        Code2,
        TrendingUp,
        Zap,
        Star: Award, // fallback
        Heart: Users, // fallback
    }

    const Icon = iconMap[stat.icon] || Award // fallback to Award icon

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="text-center group"
        >
            <motion.div
                className="w-16 h-16 max-[480px]:w-12 max-[480px]:h-12 mx-auto mb-4 max-[480px]:mb-2 rounded-2xl max-[480px]:rounded-xl flex items-center justify-center group-hover:opacity-80 transition-colors"
                style={{ backgroundColor: `${stat.color}20` }}
                whileHover={{ scale: 1.1, rotate: 5 }}
            >
                <Icon size={28} className="max-[480px]:w-5 max-[480px]:h-5" style={{ color: stat.color }} />
            </motion.div>
            <motion.div
                className="text-3xl max-[480px]:text-xl font-bold mb-2 max-[480px]:mb-1"
                style={{ color: stat.color }}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3, type: "spring" }}
            >
                {stat.value}
            </motion.div>
            <p className="text-muted-foreground font-medium max-[480px]:text-sm">{stat.label}</p>
            {stat.description && (
                <p className="text-xs max-[480px]:text-[10px] text-muted-foreground/70 mt-1">{stat.description}</p>
            )}
        </motion.div>
    )
}

export default function ExperienceSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const [experiences, setExperiences] = useState<Experience[]>([])
    const [stats, setStats] = useState<Stat[]>([])
    const [loading, setLoading] = useState(true)
    const [statsLoading, setStatsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch experiences
                const experienceResponse = await api.get('/experience')
                const activeExperiences = experienceResponse.data
                    .filter((exp: Experience) => exp.isActive)
                    .sort((a: Experience, b: Experience) => a.order - b.order)
                setExperiences(activeExperiences)

                // Fetch stats
                const statsResponse = await api.get('/stats')
                const activeStats = statsResponse.data
                    .filter((stat: Stat) => stat.isActive)
                    .sort((a: Stat, b: Stat) => a.order - b.order)
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

    return (
        <section className="py-12 sm:py-20 px-3 sm:px-6 relative overflow-hidden">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                        Professional Experience
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
                        A journey of growth, innovation, and delivering exceptional results
                    </p>
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16 place-items-center">
                    {statsLoading ? (
                        // Loading skeleton for stats
                        [...Array(4)].map((_, index) => (
                            <div key={index} className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-2xl animate-pulse"></div>
                                <div className="h-8 bg-muted rounded w-16 mx-auto mb-2 animate-pulse"></div>
                                <div className="h-4 bg-muted rounded w-24 mx-auto animate-pulse"></div>
                            </div>
                        ))
                    ) : stats.length > 0 ? (
                        stats.map((stat, index) => (
                            <StatCard key={stat._id} stat={stat} index={index} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-8">
                            <p className="text-muted-foreground">No statistics available. Add some stats in the admin panel!</p>
                        </div>
                    )}
                </div>

                {/* Experience Timeline */}
                <div className="space-y-8 sm:space-y-12">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    ) : experiences.length > 0 ? (
                        experiences.map((experience, index) => (
                            <ExperienceCard key={experience._id} experience={experience} index={index} />
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">No experience data available.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 -right-32 w-64 h-64 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -left-32 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
            </div>
        </section>
    )
}