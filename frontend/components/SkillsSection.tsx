'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import api from '@/lib/api'

interface Skill {
    _id: string
    category: string
    items: string[]
}

export default function SkillsSection() {
    const [skills, setSkills] = useState<Skill[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await api.get('/skills')
                setSkills(response.data)
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-card p-6 rounded-lg border animate-pulse">
                        <div className="h-6 bg-muted rounded w-1/2 mb-4"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-muted rounded"></div>
                            <div className="h-4 bg-muted rounded w-3/4"></div>
                            <div className="h-4 bg-muted rounded w-1/2"></div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    if (skills.length === 0) {
        return (
            <div className="bg-card p-8 rounded-lg border text-center">
                <p className="text-muted-foreground">No skills available.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
                <motion.div
                    key={skill._id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group relative bg-card p-8 rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                    {/* Background gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative z-10">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                            className="flex items-center mb-6"
                        >
                            <div className="w-2 h-8 bg-gradient-to-b from-primary to-blue-500 rounded-full mr-4"></div>
                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                                {skill.category}
                            </h3>
                        </motion.div>

                        <div className="flex flex-wrap gap-3">
                            {skill.items.map((item, itemIndex) => (
                                <motion.span
                                    key={itemIndex}
                                    initial={{ opacity: 0, scale: 0, rotate: -10 }}
                                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.4,
                                        delay: (index * 0.1) + (itemIndex * 0.05) + 0.3,
                                        type: "spring",
                                        stiffness: 200
                                    }}
                                    whileHover={{
                                        scale: 1.1,
                                        rotate: Math.random() > 0.5 ? 2 : -2,
                                        backgroundColor: "hsl(var(--primary))",
                                        color: "hsl(var(--primary-foreground))"
                                    }}
                                    className="px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-medium cursor-default transition-all duration-200 hover:shadow-md"
                                >
                                    {item}
                                </motion.span>
                            ))}
                        </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-br from-purple-500/10 to-primary/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.div>
            ))}
        </div>
    )
}