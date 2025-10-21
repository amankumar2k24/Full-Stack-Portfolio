'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FolderOpen, Code, Mail, Eye, User, Briefcase, Wrench, Settings } from 'lucide-react'
import Link from 'next/link'
import api from '@/lib/api'

interface SummaryData {
    totalProjects: number
    totalSkills: number
    totalMessages: number
    totalExperience: number
    totalServices: number
    totalSettings: number
}

export default function AdminDashboard() {
    const [summary, setSummary] = useState<SummaryData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const response = await api.get('/dashboard/admin/summary')
                setSummary(response.data)
            } catch (error) {
                console.error('Failed to fetch summary:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchSummary()
    }, [])

    if (loading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-card p-6 rounded-lg border animate-pulse">
                        <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                        <div className="h-8 bg-muted rounded w-1/3"></div>
                    </div>
                ))}
            </div>
        )
    }

    const cards = [
        {
            title: 'Projects',
            value: summary?.totalProjects || 0,
            icon: FolderOpen,
            color: 'text-blue-500',
            href: '/admin/projects',
        },
        {
            title: 'Skills',
            value: summary?.totalSkills || 0,
            icon: Code,
            color: 'text-green-500',
            href: '/admin/skills',
        },
        {
            title: 'Experience',
            value: summary?.totalExperience || 0,
            icon: Briefcase,
            color: 'text-orange-500',
            href: '/admin/experience',
        },
        {
            title: 'Services',
            value: summary?.totalServices || 0,
            icon: Wrench,
            color: 'text-cyan-500',
            href: '/admin/services',
        },
        {
            title: 'Messages',
            value: summary?.totalMessages || 0,
            icon: Mail,
            color: 'text-purple-500',
            href: '/admin/messages',
        },
        {
            title: 'Settings',
            value: summary?.totalSettings || 0,
            icon: Settings,
            color: 'text-gray-500',
            href: '/admin/settings',
        },
    ]

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {cards.map((card, index) => (
                    <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -2 }}
                        className="bg-card p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-sm text-muted-foreground">{card.title}</p>
                                <p className="text-3xl font-bold">{card.value}</p>
                            </div>
                            <card.icon className={`h-8 w-8 ${card.color}`} />
                        </div>
                        <Link
                            href={card.href}
                            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                        >
                            Manage
                            <Eye size={14} />
                        </Link>
                    </motion.div>
                ))}
            </div>

            <div className="bg-card p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <Link
                        href="/admin/about"
                        className="p-4 border border-border rounded-lg hover:bg-accent transition-colors text-center"
                    >
                        <User className="h-6 w-6 mx-auto mb-2" />
                        <p className="text-sm font-medium">Edit About</p>
                    </Link>
                    <Link
                        href="/admin/services"
                        className="p-4 border border-border rounded-lg hover:bg-accent transition-colors text-center"
                    >
                        <Wrench className="h-6 w-6 mx-auto mb-2" />
                        <p className="text-sm font-medium">Manage Services</p>
                    </Link>
                    <Link
                        href="/admin/experience"
                        className="p-4 border border-border rounded-lg hover:bg-accent transition-colors text-center"
                    >
                        <Briefcase className="h-6 w-6 mx-auto mb-2" />
                        <p className="text-sm font-medium">Manage Experience</p>
                    </Link>
                    <Link
                        href="/admin/skills"
                        className="p-4 border border-border rounded-lg hover:bg-accent transition-colors text-center"
                    >
                        <Code className="h-6 w-6 mx-auto mb-2" />
                        <p className="text-sm font-medium">Manage Skills</p>
                    </Link>
                    <Link
                        href="/admin/projects"
                        className="p-4 border border-border rounded-lg hover:bg-accent transition-colors text-center"
                    >
                        <FolderOpen className="h-6 w-6 mx-auto mb-2" />
                        <p className="text-sm font-medium">Manage Projects</p>
                    </Link>
                    <Link
                        href="/admin/messages"
                        className="p-4 border border-border rounded-lg hover:bg-accent transition-colors text-center"
                    >
                        <Mail className="h-6 w-6 mx-auto mb-2" />
                        <p className="text-sm font-medium">View Messages</p>
                    </Link>
                    <Link
                        href="/admin/settings"
                        className="p-4 border border-border rounded-lg hover:bg-accent transition-colors text-center"
                    >
                        <Settings className="h-6 w-6 mx-auto mb-2" />
                        <p className="text-sm font-medium">Website Settings</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}