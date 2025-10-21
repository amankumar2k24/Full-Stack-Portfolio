'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

interface Skill {
    name: string
    level: number
    category: string
    color: string
}

const skillsData: Skill[] = [
    { name: 'React', level: 95, category: 'Frontend', color: '#61DAFB' },
    { name: 'Next.js', level: 90, category: 'Frontend', color: '#000000' },
    { name: 'TypeScript', level: 88, category: 'Language', color: '#3178C6' },
    { name: 'Node.js', level: 85, category: 'Backend', color: '#339933' },
    { name: 'Python', level: 82, category: 'Language', color: '#3776AB' },
    { name: 'MongoDB', level: 80, category: 'Database', color: '#47A248' },
    { name: 'PostgreSQL', level: 78, category: 'Database', color: '#336791' },
    { name: 'Docker', level: 75, category: 'DevOps', color: '#2496ED' },
    { name: 'AWS', level: 70, category: 'Cloud', color: '#FF9900' },
    { name: 'GraphQL', level: 72, category: 'API', color: '#E10098' },
    { name: 'Redis', level: 68, category: 'Database', color: '#DC382D' },
    { name: 'Kubernetes', level: 65, category: 'DevOps', color: '#326CE5' },
]

function SkillOrb({ skill, index, totalSkills }: { skill: Skill, index: number, totalSkills: number }) {
    const controls = useAnimation()
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    useEffect(() => {
        if (isInView) {
            controls.start({
                scale: [0, 1.2, 1],
                opacity: [0, 1],
                rotate: [0, 360],
                transition: {
                    duration: 1.5,
                    delay: index * 0.1,
                    ease: "easeOut"
                }
            })
        }
    }, [isInView, controls, index])

    const angle = (index / totalSkills) * 2 * Math.PI
    const radius = 200 + Math.sin(index * 0.5) * 50
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius

    return (
        <motion.div
            ref={ref}
            animate={controls}
            className="absolute"
            style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
            }}
            whileHover={{
                scale: 1.3,
                zIndex: 10,
                transition: { duration: 0.2 }
            }}
        >
            <motion.div
                className="relative group cursor-pointer"
                animate={{
                    y: [0, -10, 0],
                }}
                transition={{
                    duration: 3 + index * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                {/* Skill orb */}
                <div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg border-2 border-white/20 backdrop-blur-sm"
                    style={{
                        backgroundColor: skill.color,
                        boxShadow: `0 0 20px ${skill.color}40`
                    }}
                >
                    {skill.name.slice(0, 3)}
                </div>

                {/* Tooltip */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-3 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20">
                    {skill.name} - {skill.level}%
                </div>

                {/* Connecting lines */}
                <motion.div
                    className="absolute top-1/2 left-1/2 w-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                    style={{
                        height: `${radius * 0.3}px`,
                        transformOrigin: 'top',
                        transform: `translate(-50%, -50%) rotate(${angle + Math.PI / 2}rad)`
                    }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                />
            </motion.div>
        </motion.div>
    )
}

function FloatingParticles() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-primary/30 rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                    }}
                    transition={{
                        duration: 4 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    )
}

export default function FlowingSkills() {
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: true })

    const categories = Array.from(new Set(skillsData.map(skill => skill.category)))

    return (
        <div ref={containerRef} className="relative min-h-[600px] sm:min-h-[800px] overflow-hidden">
            <FloatingParticles />

            {/* Central hub */}
            <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
            >
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-primary via-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-2xl border-4 border-white/20">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        ⚡
                    </motion.div>
                </div>
            </motion.div>

            {/* Skills orbiting around */}
            {skillsData.map((skill, index) => (
                <SkillOrb
                    key={skill.name}
                    skill={skill}
                    index={index}
                    totalSkills={skillsData.length}
                />
            ))}

            {/* Category filters */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-wrap gap-2 justify-center px-4">
                <motion.button
                    className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${hoveredCategory === null
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-accent'
                        }`}
                    onClick={() => setHoveredCategory(null)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    All
                </motion.button>
                {categories.map(category => (
                    <motion.button
                        key={category}
                        className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${hoveredCategory === category
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground hover:bg-accent'
                            }`}
                        onClick={() => setHoveredCategory(category === hoveredCategory ? null : category)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {category}
                    </motion.button>
                ))}
            </div>

            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 pointer-events-none" />
        </div>
    )
}