'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import {
    Code,
    Smartphone,
    Cloud,
    Database,
    Palette,
    Zap,
    Shield,
    BarChart3,
    Rocket,
    Globe,
    // Additional icons for more variety
    Monitor,
    Server,
    ShoppingCart,
    Layers,
    Settings,
    Lock,
    TrendingUp,
    Brush,
    Cpu,
    Network,
    FileCode,
    Blocks,
    Package,
    Wrench,
    Layout,
    Smartphone as Mobile,
    CloudLightning,
    HardDrive,
    PaintBucket,
    Gauge,
    ShieldCheck,
    Activity,
    Briefcase,
    Target
} from 'lucide-react'
import api from '@/lib/api'

interface Service {
    _id: string
    title: string
    description: string
    features: string[]
    icon: string
    color: string
    gradient: string
    order: number
}

const iconMap: Record<string, any> = {
    Code,
    Smartphone,
    Cloud,
    Database,
    Palette,
    Zap,
    Shield,
    BarChart3,
    Rocket,
    Globe,
    // Additional icons
    Monitor,
    Server,
    ShoppingCart,
    Layers,
    Settings,
    Lock,
    TrendingUp,
    Brush,
    Cpu,
    Network,
    FileCode,
    Blocks,
    Package,
    Wrench,
    Layout,
    Mobile,
    CloudLightning,
    HardDrive,
    PaintBucket,
    Gauge,
    ShieldCheck,
    Activity,
    Briefcase,
    Target
}

const processSteps = [
    {
        step: "01",
        title: "Discovery & Planning",
        description: "Understanding your requirements and creating a detailed project roadmap.",
        icon: BarChart3
    },
    {
        step: "02",
        title: "Design & Prototype",
        description: "Creating wireframes and interactive prototypes for validation.",
        icon: Palette
    },
    {
        step: "03",
        title: "Development",
        description: "Building your application with clean, maintainable, and scalable code.",
        icon: Code
    },
    {
        step: "04",
        title: "Testing & Security",
        description: "Comprehensive testing and security implementation for reliability.",
        icon: Shield
    },
    {
        step: "05",
        title: "Deployment & Launch",
        description: "Deploying to production with monitoring and performance optimization.",
        icon: Rocket
    },
    {
        step: "06",
        title: "Support & Maintenance",
        description: "Ongoing support, updates, and feature enhancements.",
        icon: Globe
    }
]

function ServiceCard({ service, index }: { service: Service, index: number }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const Icon = iconMap[service.icon] || Code

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative"
        >
            <div className="h-full bg-card rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden border border-border/60 hover:border-border/80">
                {/* Enhanced border glow effect */}
                <div className="absolute inset-0 rounded-2xl border border-white/20 group-hover:border-white/30 transition-all duration-500"></div>

                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`} />

                {/* Color-wise background overlay */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl"
                    style={{ backgroundColor: service.color }}
                />

                <div className="relative z-10">
                    <motion.div
                        className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center group-hover:shadow-lg transition-all duration-300"
                        style={{
                            backgroundColor: `${service.color}15`,
                        }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Icon size={28} style={{ color: service.color }} className="group-hover:scale-110 transition-transform duration-300" />
                    </motion.div>

                    <h3 className="text-xl font-bold mb-3 transition-colors duration-300 group-hover:opacity-90">
                        <span
                            className="group-hover:text-current transition-colors duration-300"
                            style={{ '--hover-color': service.color } as React.CSSProperties}
                        >
                            {service.title}
                        </span>
                    </h3>

                    <p className="text-muted-foreground mb-6 leading-relaxed">
                        {service.description}
                    </p>

                    <ul className="space-y-2">
                        {service.features.map((feature, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.4, delay: index * 0.1 + 0.3 + i * 0.1 }}
                                className="flex items-center gap-3 text-sm"
                            >
                                <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: service.color }}
                                />
                                <span className="text-muted-foreground">{feature}</span>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    )
}

function ProcessStep({ step, index }: { step: typeof processSteps[0], index: number }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const Icon = step.icon

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative group"
        >
            <div className="text-center p-4 bg-card rounded-xl border hover:shadow-lg transition-all duration-300 h-48 flex flex-col justify-between">
                <div className="flex flex-col items-center">
                    <motion.div
                        className="w-16 h-16 mx-auto mb-3 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors relative"
                        whileHover={{ scale: 1.1 }}
                    >
                        <Icon size={24} className="text-primary" />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                            {step.step}
                        </div>
                    </motion.div>

                    <h3 className="text-sm font-bold mb-2 group-hover:text-primary transition-colors text-center">
                        {step.title}
                    </h3>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed text-center mt-auto">
                    {step.description}
                </p>
            </div>
        </motion.div>
    )
}

export default function ServicesSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const [services, setServices] = useState<Service[]>([])
    const [settings, setSettings] = useState<Record<string, string>>({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [servicesRes, settingsRes] = await Promise.all([
                    api.get('/services'),
                    api.get('/settings')
                ])
                setServices(servicesRes.data)

                // Convert settings array to object
                const settingsObj = settingsRes.data.reduce((acc: Record<string, string>, setting: any) => {
                    acc[setting.key] = setting.value
                    return acc
                }, {})
                setSettings(settingsObj)
            } catch (error) {
                console.error('Failed to fetch data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) {
        return (
            <section className="pt-16 pb-12 sm:pt-20 sm:pb-20 px-3 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse text-center mb-12">
                        <div className="h-12 bg-muted rounded w-1/2 mx-auto mb-4"></div>
                        <div className="h-6 bg-muted rounded w-3/4 mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-card p-6 rounded-2xl border animate-pulse">
                                <div className="w-14 h-14 bg-muted rounded-xl mb-6"></div>
                                <div className="h-6 bg-muted rounded mb-3"></div>
                                <div className="h-4 bg-muted rounded mb-6"></div>
                                <div className="space-y-2">
                                    <div className="h-3 bg-muted rounded"></div>
                                    <div className="h-3 bg-muted rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="pt-16 pb-12 sm:pt-20 sm:pb-20 px-3 sm:px-6 bg-gradient-to-br from-muted/20 via-background to-muted/20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                        Services I Offer
                    </h2>
                    <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
                        Comprehensive development solutions to bring your ideas to life with cutting-edge technology and exceptional quality
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
                    {services.length > 0 ? (
                        services.map((service, index) => (
                            <ServiceCard key={service.title} service={service} index={index} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-muted-foreground">No services available. Please add services from the admin panel.</p>
                        </div>
                    )}
                </div>

                {/* Process Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-6 sm:mb-8"
                >
                    <h3 className="text-2xl sm:text-3xl font-bold mb-4">My Development Process</h3>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        A proven methodology that ensures quality, efficiency, and client satisfaction
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 lg:gap-6">
                    {processSteps.map((step, index) => (
                        <ProcessStep key={step.step} step={step} index={index} />
                    ))}
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 -right-32 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -left-32 w-64 h-64 bg-gradient-to-br from-green-500/10 to-cyan-500/10 rounded-full blur-3xl" />
            </div>
        </section >
    )
}