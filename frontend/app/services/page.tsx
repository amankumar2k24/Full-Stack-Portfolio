'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
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
    Target,
    ArrowLeft
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
    Code, Smartphone, Cloud, Database, Palette, Zap, Shield, BarChart3, Rocket, Globe,
    Monitor, Server, ShoppingCart, Layers, Settings, Lock, TrendingUp, Brush, Cpu, Network,
    FileCode, Blocks, Package, Wrench, Layout, Mobile, CloudLightning, HardDrive, PaintBucket,
    Gauge, ShieldCheck, Activity, Briefcase, Target
}

function ServiceCard({ service, index }: { service: Service, index: number }) {
    const Icon = iconMap[service.icon] || Code

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative"
        >
            <div className="h-full bg-card rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden border border-border/60 hover:border-border/80">
                <div className="absolute inset-0 rounded-2xl border border-white/20 group-hover:border-white/30 transition-all duration-500"></div>
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl" style={{ backgroundColor: service.color }} />

                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                        <motion.div
                            className="w-14 h-14 rounded-xl flex items-center justify-center group-hover:shadow-lg transition-all duration-300 flex-shrink-0"
                            style={{ backgroundColor: `${service.color}15` }}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Icon size={24} style={{ color: service.color }} className="group-hover:scale-110 transition-transform duration-300" />
                        </motion.div>
                        <h3 className="text-xl font-bold transition-colors duration-300 group-hover:opacity-90 leading-tight flex-1">
                            {service.title}
                        </h3>
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                    <ul className="space-y-3">
                        {service.features.map((feature, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 + 0.3 + i * 0.1 }}
                                className="flex items-center gap-3 text-sm"
                            >
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: service.color }} />
                                <span className="text-muted-foreground">{feature}</span>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    )
}

export default function ServicesPage() {
    const [services, setServices] = useState<Service[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await api.get('/services')
                setServices(response.data)
            } catch (error) {
                console.error('Failed to fetch services:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchServices()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen pt-20 pb-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.button
                        onClick={() => window.history.back()}
                        className="group flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-card border border-border hover:bg-muted transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ArrowLeft size={18} className="transition-transform duration-300 group-hover:-translate-x-1" />
                        <span className="text-sm font-medium">Back</span>
                    </motion.button>
                    <div className="animate-pulse text-center mb-12">
                        <div className="h-12 bg-muted rounded w-1/2 mx-auto mb-4"></div>
                        <div className="h-6 bg-muted rounded w-3/4 mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            </div>
        )
    }

    return (
        <div className="min-h-screen pt-20 pb-12 px-6 bg-gradient-to-br from-muted/20 via-background to-muted/20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => window.history.back()}
                    className="group flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-card border border-border hover:bg-muted hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <ArrowLeft size={18} className="transition-transform duration-300 group-hover:-translate-x-1" />
                    <span className="text-sm font-medium">Back</span>
                </motion.button>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                        All Services
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        Comprehensive development solutions to bring your ideas to life with cutting-edge technology and exceptional quality
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.length > 0 ? (
                        services.map((service, index) => (
                            <ServiceCard key={service._id} service={service} index={index} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-muted-foreground">No services available.</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 -right-32 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -left-32 w-64 h-64 bg-gradient-to-br from-green-500/10 to-cyan-500/10 rounded-full blur-3xl" />
            </div>
        </div>
    )
}
