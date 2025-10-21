'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Skill {
    name: string
    level: number
    category: string
    color: string
    icon: string
}

const skillsData: Skill[] = [
    // Frontend
    { name: 'React', level: 95, category: 'Frontend', color: '#61DAFB', icon: '⚛️' },
    { name: 'Next.js', level: 90, category: 'Frontend', color: '#FFFFFF', icon: '▲' },
    { name: 'Vue.js', level: 85, category: 'Frontend', color: '#4FC08D', icon: '💚' },
    { name: 'TypeScript', level: 88, category: 'Frontend', color: '#3178C6', icon: '📘' },
    { name: 'Tailwind CSS', level: 92, category: 'Frontend', color: '#06B6D4', icon: '🎨' },
    { name: 'HTML5', level: 98, category: 'Frontend', color: '#E34F26', icon: '🌐' },

    // Backend
    { name: 'Node.js', level: 85, category: 'Backend', color: '#68D391', icon: '🟢' },
    { name: 'Python', level: 82, category: 'Backend', color: '#3776AB', icon: '🐍' },
    { name: 'Express.js', level: 88, category: 'Backend', color: '#F7DF1E', icon: '🚀' },
    { name: 'NestJS', level: 80, category: 'Backend', color: '#E0234E', icon: '🏠' },
    { name: 'Django', level: 75, category: 'Backend', color: '#44B78B', icon: '🎯' },
    { name: 'FastAPI', level: 78, category: 'Backend', color: '#009688', icon: '⚡' },

    // Database
    { name: 'MongoDB', level: 85, category: 'Database', color: '#47A248', icon: '🍃' },
    { name: 'PostgreSQL', level: 82, category: 'Database', color: '#336791', icon: '🐘' },
    { name: 'MySQL', level: 88, category: 'Database', color: '#4479A1', icon: '🗄️' },
    { name: 'Redis', level: 75, category: 'Database', color: '#DC382D', icon: '🔴' },
    { name: 'SQLite', level: 80, category: 'Database', color: '#4A90E2', icon: '💾' },
    { name: 'Firebase', level: 78, category: 'Database', color: '#FFCA28', icon: '🔥' },

    // API
    { name: 'GraphQL', level: 72, category: 'API', color: '#E10098', icon: '📊' },
    { name: 'REST API', level: 90, category: 'API', color: '#FF6B35', icon: '🔗' },
    { name: 'WebSocket', level: 75, category: 'API', color: '#4A90E2', icon: '🔌' },
    { name: 'gRPC', level: 65, category: 'API', color: '#4FC3F7', icon: '⚙️' },

    // DevOps
    { name: 'Docker', level: 75, category: 'DevOps', color: '#2496ED', icon: '🐳' },
    { name: 'Kubernetes', level: 65, category: 'DevOps', color: '#326CE5', icon: '☸️' },
    { name: 'AWS', level: 70, category: 'DevOps', color: '#FF9900', icon: '☁️' },
    { name: 'CI/CD', level: 78, category: 'DevOps', color: '#2088FF', icon: '🔄' },
    { name: 'Nginx', level: 72, category: 'DevOps', color: '#009639', icon: '🌐' },
]

const categories = [
    { name: 'All', color: '#6366f1' },
    { name: 'Frontend', color: '#3b82f6' },
    { name: 'Backend', color: '#10b981' },
    { name: 'Database', color: '#f59e0b' },
    { name: 'API', color: '#ef4444' },
    { name: 'DevOps', color: '#8b5cf6' },
]

function SkillCard({ skill, index, isVisible }: { skill: Skill, index: number, isVisible: boolean }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    if (!isVisible) return null

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
            }}
            whileHover={{
                y: -8,
                scale: 1.05,
                transition: { duration: 0.2 }
            }}
            className="group relative bg-card rounded-2xl p-6 border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
            {/* Background gradient effect */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"
                style={{ backgroundColor: skill.color }}
            />

            <div className="relative z-10">
                {/* Skill header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg"
                            style={{ backgroundColor: `${skill.color}20` }}
                        >
                            {skill.icon}
                        </div>
                        <div>
                            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                                {skill.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">{skill.category}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold" style={{ color: skill.color }}>
                            {skill.level}%
                        </div>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="relative">
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: skill.color }}
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${skill.level}%` } : {}}
                            transition={{ duration: 1.5, delay: index * 0.1 + 0.5, ease: "easeOut" }}
                        />
                    </div>

                    {/* Glowing effect */}
                    <motion.div
                        className="absolute top-0 left-0 h-full rounded-full opacity-50 blur-sm"
                        style={{ backgroundColor: skill.color }}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1.5, delay: index * 0.1 + 0.5, ease: "easeOut" }}
                    />
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-20 h-20 rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-300"
                style={{ backgroundColor: skill.color }}
            />
        </motion.div>
    )
}

export default function EnhancedSkillsSection() {
    const [activeCategory, setActiveCategory] = useState('All')
    const [filteredSkills, setFilteredSkills] = useState(skillsData)
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: true })

    useEffect(() => {
        if (activeCategory === 'All') {
            setFilteredSkills(skillsData)
        } else {
            setFilteredSkills(skillsData.filter(skill => skill.category === activeCategory))
        }
    }, [activeCategory])

    return (
        <div ref={containerRef} className="relative">
            {/* Category Filter Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="flex flex-wrap justify-center gap-3 mb-8"
            >
                {categories.map((category, index) => (
                    <motion.button
                        key={category.name}
                        onClick={() => setActiveCategory(category.name)}
                        className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeCategory === category.name
                            ? 'text-white shadow-lg transform scale-105'
                            : 'bg-card text-muted-foreground hover:bg-accent border border-border'
                            }`}
                        style={{
                            backgroundColor: activeCategory === category.name ? category.color : undefined,
                        }}
                        whileHover={{ scale: activeCategory === category.name ? 1.05 : 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                        {category.name}
                        <span className="ml-2 text-sm opacity-75">
                            ({category.name === 'All' ? skillsData.length : skillsData.filter(s => s.category === category.name).length})
                        </span>
                    </motion.button>
                ))}
            </motion.div>

            {/* Skills Grid */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                layout
            >
                {skillsData.map((skill, index) => (
                    <SkillCard
                        key={skill.name}
                        skill={skill}
                        index={filteredSkills.findIndex(s => s.name === skill.name)}
                        isVisible={filteredSkills.includes(skill)}
                    />
                ))}
            </motion.div>

            {/* Stats Summary */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
            >
                {categories.slice(1).map((category, index) => {
                    const categorySkills = skillsData.filter(s => s.category === category.name)
                    const avgLevel = Math.round(categorySkills.reduce((sum, skill) => sum + skill.level, 0) / categorySkills.length)

                    return (
                        <motion.div
                            key={category.name}
                            className="text-center p-4 bg-card rounded-xl border"
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <div
                                className="text-3xl font-bold mb-2"
                                style={{ color: category.color }}
                            >
                                {avgLevel}%
                            </div>
                            <div className="text-sm text-muted-foreground font-medium">
                                {category.name} Avg
                            </div>
                        </motion.div>
                    )
                })}
            </motion.div>

            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-1/4 -right-32 w-48 h-48 bg-gradient-to-br from-primary/3 to-blue-500/3 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 -left-32 w-48 h-48 bg-gradient-to-br from-purple-500/3 to-pink-500/3 rounded-full blur-3xl" />
            </div>
        </div>
    )
}