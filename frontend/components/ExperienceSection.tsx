'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Calendar, MapPin, Award, TrendingUp, Users, Code2 } from 'lucide-react'

const experiences = [
    {
        title: "Senior Full Stack Developer",
        company: "TechCorp Solutions",
        location: "Remote",
        duration: "2022 - Present",
        description: "Led development of scalable web applications serving 100K+ users. Implemented microservices architecture and improved system performance by 40%.",
        achievements: [
            "Reduced API response time by 60%",
            "Led team of 5 developers",
            "Implemented CI/CD pipeline"
        ],
        technologies: ["React", "Node.js", "AWS", "Docker", "MongoDB"],
        icon: Code2,
        color: "#3b82f6"
    },
    {
        title: "Full Stack Developer",
        company: "StartupXYZ",
        location: "San Francisco, CA",
        duration: "2021 - 2022",
        description: "Built MVP from scratch that secured $2M in Series A funding. Developed real-time features and integrated payment systems.",
        achievements: [
            "Built MVP in 3 months",
            "Integrated Stripe payments",
            "Implemented real-time chat"
        ],
        technologies: ["Next.js", "Python", "PostgreSQL", "Redis", "Stripe"],
        icon: TrendingUp,
        color: "#10b981"
    },
    {
        title: "Frontend Developer",
        company: "Digital Agency Pro",
        location: "New York, NY",
        duration: "2020 - 2021",
        description: "Created responsive web applications for Fortune 500 clients. Collaborated with design teams to deliver pixel-perfect implementations.",
        achievements: [
            "Delivered 15+ client projects",
            "Improved page load speed by 50%",
            "Mentored junior developers"
        ],
        technologies: ["React", "TypeScript", "Sass", "Webpack", "Figma"],
        icon: Users,
        color: "#8b5cf6"
    }
]

const stats = [
    { label: "Years Experience", value: "3+", icon: Calendar },
    { label: "Projects Completed", value: "50+", icon: Award },
    { label: "Happy Clients", value: "25+", icon: Users },
    { label: "Code Commits", value: "2000+", icon: Code2 }
]

function ExperienceCard({ experience, index }: { experience: typeof experiences[0], index: number }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const Icon = experience.icon

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
                        style={{ backgroundColor: `${experience.color}20` }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                        <Icon size={24} style={{ color: experience.color }} />
                    </motion.div>

                    <div className="flex-1">
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                            {experience.title}
                        </h3>
                        <p className="text-primary font-semibold">{experience.company}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-1">
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

                <p className="text-muted-foreground mb-4 leading-relaxed">
                    {experience.description}
                </p>

                <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-sm">Key Achievements:</h4>
                    <ul className="space-y-1">
                        {experience.achievements.map((achievement, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.5, delay: index * 0.2 + 0.5 + i * 0.1 }}
                                className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                {achievement}
                            </motion.li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, i) => (
                        <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.3, delay: index * 0.2 + 0.7 + i * 0.05 }}
                            className="px-2 py-1 bg-accent text-accent-foreground rounded-md text-xs font-medium"
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

function StatCard({ stat, index }: { stat: typeof stats[0], index: number }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const Icon = stat.icon

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="text-center group"
        >
            <motion.div
                className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
            >
                <Icon size={28} className="text-primary" />
            </motion.div>
            <motion.div
                className="text-3xl font-bold text-primary mb-2"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3, type: "spring" }}
            >
                {stat.value}
            </motion.div>
            <p className="text-muted-foreground font-medium">{stat.label}</p>
        </motion.div>
    )
}

export default function ExperienceSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

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
                    <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                        A journey of growth, innovation, and delivering exceptional results
                    </p>
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
                    {stats.map((stat, index) => (
                        <StatCard key={stat.label} stat={stat} index={index} />
                    ))}
                </div>

                {/* Experience Timeline */}
                <div className="space-y-8 sm:space-y-12">
                    {experiences.map((experience, index) => (
                        <ExperienceCard key={experience.company} experience={experience} index={index} />
                    ))}
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