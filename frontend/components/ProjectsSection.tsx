'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import api from '@/lib/api'

interface Project {
    _id: string
    title: string
    description: string
    techStack: string[]
    liveLinks: string[]
    imageUrls: string[]
}

// Image Carousel Component
function ImageCarousel({ images, title }: { images: string[], title: string }) {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
    }

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    if (!images || images.length === 0) {
        return (
            <div className="relative h-56 w-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">No image available</span>
            </div>
        )
    }

    return (
        <div className="relative h-56 w-full overflow-hidden group">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                >
                    <Image
                        src={images[currentIndex]}
                        alt={`${title} - Image ${currentIndex + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                    >
                        <ChevronRight size={20} />
                    </button>

                    {/* Dots indicator */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? 'bg-white' : 'bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default function ProjectsSection() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await api.get('/projects')
                setProjects(response.data)
            } catch (error) {
                console.error('Failed to fetch projects:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchProjects()
    }, [])

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-card rounded-lg border overflow-hidden animate-pulse">
                        <div className="h-48 bg-muted"></div>
                        <div className="p-6">
                            <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-muted rounded mb-4"></div>
                            <div className="flex gap-2">
                                <div className="h-6 bg-muted rounded w-16"></div>
                                <div className="h-6 bg-muted rounded w-20"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    if (projects.length === 0) {
        return (
            <div className="bg-card p-8 rounded-lg border text-center">
                <p className="text-muted-foreground">No projects available.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
                <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -12, scale: 1.02 }}
                    className="group relative bg-card rounded-2xl border overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                    {/* Project Images Carousel */}
                    <ImageCarousel images={project.imageUrls || []} title={project.title} />

                    <div className="p-6">
                        <motion.h3
                            className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                        >
                            {project.title}
                        </motion.h3>

                        <motion.p
                            className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                        >
                            {project.description}
                        </motion.p>

                        <motion.div
                            className="flex flex-wrap gap-2 mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                        >
                            {project.techStack.map((tech, techIndex) => (
                                <motion.span
                                    key={techIndex}
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.3,
                                        delay: index * 0.1 + 0.5 + (techIndex * 0.05),
                                        type: "spring",
                                        stiffness: 200
                                    }}
                                    whileHover={{ scale: 1.1 }}
                                    className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium"
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </motion.div>

                        {/* Multiple Live Links */}
                        {project.liveLinks && project.liveLinks.length > 0 && (
                            <motion.div
                                className="flex flex-wrap gap-2 max-sm:justify-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 + 0.6 }}
                            >
                                {project.liveLinks.map((link, linkIndex) => (
                                    <motion.a
                                        key={linkIndex}
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 max-sm:px-3 max-sm:py-1.5 max-sm:text-sm bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all duration-300"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <ExternalLink size={16} />
                                        {project.liveLinks.length > 1 ? `Link ${linkIndex + 1}` : 'Live Demo'}
                                    </motion.a>
                                ))}
                            </motion.div>
                        )}
                    </div>

                    {/* Decorative gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </motion.div>
            ))}
        </div>
    )
}