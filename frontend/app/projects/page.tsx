'use client'

import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import AllProjectsSection from '@/components/AllProjectsSection'

export default function ProjectsPage() {
    return (
        <div className="min-h-screen pt-10 pb-12 px-6 bg-gradient-to-br from-muted/20 via-background to-muted/20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
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

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent leading-tight pb-2">
                        All Projects
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        Showcasing innovative solutions and cutting-edge development work
                    </p>
                </motion.div>

                {/* All Projects Section */}
                <AllProjectsSection />
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 -right-32 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -left-32 w-64 h-64 bg-gradient-to-br from-green-500/10 to-cyan-500/10 rounded-full blur-3xl" />
            </div>
        </div>
    )
}