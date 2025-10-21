'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FolderOpen, Code, Mail } from 'lucide-react'
import api from '@/lib/api'

interface SummaryData {
    totalProjects: number
    totalSkills: number
    totalMessages: number
}

export default function DashboardSummary() {
    const [summary, setSummary] = useState<SummaryData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const response = await api.get('/dashboard/summary')
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
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
            title: 'Total Projects',
            value: summary?.totalProjects || 0,
            icon: FolderOpen,
            color: 'text-blue-500',
        },
        {
            title: 'Total Skills',
            value: summary?.totalSkills || 0,
            icon: Code,
            color: 'text-green-500',
        },
        {
            title: 'Messages',
            value: summary?.totalMessages || 0,
            icon: Mail,
            color: 'text-purple-500',
        },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cards.map((card, index) => (
                <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                    className="bg-card p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">{card.title}</p>
                            <p className="text-3xl font-bold">{card.value}</p>
                        </div>
                        <card.icon className={`h-8 w-8 ${card.color}`} />
                    </div>
                </motion.div>
            ))}
        </div>
    )
}