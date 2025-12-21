'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRouter } from 'next/navigation'
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


// Utility function to check if URL is a valid image URL
function isValidImageUrl(url: string): boolean {
    // Check if it's a valid image URL (has image extension or is from known image hosting services)
    const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)(\?.*)?$/i;
    const imageHosts = ['res.cloudinary.com', 'images.unsplash.com', 'cdn.jsdelivr.net'];

    return imageExtensions.test(url) || imageHosts.some(host => url.includes(host));
}

// Image Carousel Component
function ImageCarousel({ images, title }: { images: string[], title: string }) {
    const [currentIndex, setCurrentIndex] = useState(0)

    // Filter out invalid image URLs (like website URLs)
    const validImages = images?.filter(isValidImageUrl) || []

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % validImages.length)
    }

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length)
    }

    if (!validImages || validImages.length === 0) {
        return (
            <div className="relative h-56 w-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">No image available</span>
            </div>
        )
    }

    return (
        <div className="relative h-40 sm:h-56 w-full overflow-hidden">
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
                        src={validImages[currentIndex]}
                        alt={`${title} - Image ${currentIndex + 1}`}
                        fill
                        className="object-cover"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            {validImages.length > 1 && (
                <>
                    <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full z-10"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full z-10"
                    >
                        <ChevronRight size={20} />
                    </button>

                    {/* Dots indicator */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                        {validImages.map((_, index) => (
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

function ProjectCard({ project, index }: { project: Project, index: number }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const [expandedDescriptions, setExpandedDescriptions] = useState<Set<string>>(new Set())

    const toggleDescription = (projectId: string) => {
        const newExpanded = new Set(expandedDescriptions)
        if (newExpanded.has(projectId)) {
            newExpanded.delete(projectId)
        } else {
            newExpanded.add(projectId)
        }
        setExpandedDescriptions(newExpanded)
    }

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative bg-card rounded-2xl border overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
        >
            {/* Project Images Carousel */}
            <ImageCarousel images={project.imageUrls || []} title={project.title} />

            <div className="p-4 sm:p-6">
                <motion.h3
                    className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300 cursor-help"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                    title={project.title}
                >
                    {project.title}
                </motion.h3>

                <motion.div
                    className="text-muted-foreground mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                >
                    <p>
                        {expandedDescriptions.has(project._id)
                            ? project.description
                            : (
                                <>
                                    {project.description.length > 90
                                        ? project.description.substring(0, 90)
                                        : project.description
                                    }
                                    {project.description.length > 90 && (
                                        <>
                                            ...{' '}
                                            <button
                                                onClick={() => toggleDescription(project._id)}
                                                className="text-primary hover:text-primary/80 text-sm font-medium transition-colors inline"
                                            >
                                                Show More
                                            </button>
                                        </>
                                    )}
                                </>
                            )
                        }
                        {expandedDescriptions.has(project._id) && project.description.length > 150 && (
                            <>
                                {' '}
                                <button
                                    onClick={() => toggleDescription(project._id)}
                                    className="text-primary hover:text-primary/80 text-sm font-medium transition-colors inline"
                                >
                                    Show Less
                                </button>
                            </>
                        )}
                    </p>
                </motion.div>

                <motion.div
                    className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                >
                    {project.techStack.map((tech, techIndex) => (
                        <motion.span
                            key={techIndex}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{
                                duration: 0.3,
                                delay: index * 0.1 + 0.5 + (techIndex * 0.05),
                                type: "spring",
                                stiffness: 200
                            }}
                            whileHover={{ scale: 1.1 }}
                            className="px-2 sm:px-3 py-0.5 sm:py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium"
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
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: index * 0.1 + 0.6 }}
                    >
                        {project.liveLinks.map((link, linkIndex) => (
                            <motion.a
                                key={linkIndex}
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 max-sm:px-3 max-sm:py-1.5 max-sm:text-sm bg-primary text-xs text-primary-foreground rounded-full hover:bg-primary/90 transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ExternalLink size={10} />
                                {project.liveLinks.length > 1 ? `Link ${linkIndex + 1}` : 'Link 1'}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </div>

            {/* Decorative gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        </motion.div>
    )
}

export default function ProjectsSection() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [itemsPerView, setItemsPerView] = useState(3)
    const [touchStart, setTouchStart] = useState<number | null>(null)
    const [touchEnd, setTouchEnd] = useState<number | null>(null)
    const router = useRouter()

    // Minimum swipe distance (in px)
    const minSwipeDistance = 50

    // Update items per view based on screen size
    useEffect(() => {
        const updateItemsPerView = () => {
            if (window.innerWidth < 768) {
                setItemsPerView(1) // Mobile: 1 item
            } else if (window.innerWidth < 1024) {
                setItemsPerView(2) // Tablet: 2 items
            } else {
                setItemsPerView(3) // Desktop: 3 items
            }
        }

        updateItemsPerView()
        window.addEventListener('resize', updateItemsPerView)
        return () => window.removeEventListener('resize', updateItemsPerView)
    }, [])

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

    const nextSlide = () => {
        if (projects.length > 0) {
            setCurrentIndex((prev) =>
                prev + itemsPerView >= projects.length ? 0 : prev + itemsPerView
            )
        }
    }

    const prevSlide = () => {
        if (projects.length > 0) {
            setCurrentIndex((prev) =>
                prev === 0 ? Math.max(0, projects.length - itemsPerView) : Math.max(0, prev - itemsPerView)
            )
        }
    }

    const canGoNext = projects.length > 0 && currentIndex + itemsPerView < projects.length
    const canGoPrev = currentIndex > 0

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null)
        setTouchStart(e.targetTouches[0].clientX)
    }

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return

        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance

        if (isLeftSwipe) {
            nextSlide()
        } else if (isRightSwipe) {
            prevSlide()
        }
    }

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
        <div className="relative">
            {/* Projects Carousel */}
            {projects.length > 0 ? (
                <div className="relative mb-8 sm:mb-12">
                    {/* Navigation Arrows */}
                    <div className="flex justify-between items-center mb-6">
                        <motion.button
                            onClick={prevSlide}
                            disabled={!canGoPrev}
                            className={`p-3 rounded-full border transition-all duration-300 ${canGoPrev
                                ? 'bg-card hover:bg-primary hover:text-primary-foreground border-border hover:border-primary shadow-sm hover:shadow-md'
                                : 'bg-muted border-muted text-muted-foreground cursor-not-allowed'
                                }`}
                            whileHover={canGoPrev ? { scale: 1.05 } : {}}
                            whileTap={canGoPrev ? { scale: 0.95 } : {}}
                        >
                            <ChevronLeft size={20} />
                        </motion.button>

                        <div className="flex gap-2">
                            {Array.from({ length: Math.ceil(projects.length / itemsPerView) }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index * itemsPerView)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${Math.floor(currentIndex / itemsPerView) === index
                                        ? 'bg-primary w-6'
                                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                                        }`}
                                />
                            ))}
                        </div>

                        <motion.button
                            onClick={nextSlide}
                            disabled={!canGoNext}
                            className={`p-3 rounded-full border transition-all duration-300 ${canGoNext
                                ? 'bg-card hover:bg-primary hover:text-primary-foreground border-border hover:border-primary shadow-sm hover:shadow-md'
                                : 'bg-muted border-muted text-muted-foreground cursor-not-allowed'
                                }`}
                            whileHover={canGoNext ? { scale: 1.05 } : {}}
                            whileTap={canGoNext ? { scale: 0.95 } : {}}
                        >
                            <ChevronRight size={20} />
                        </motion.button>
                    </div>

                    {/* Carousel Container */}
                    <div className="overflow-hidden">
                        <motion.div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(-${(currentIndex / itemsPerView) * 100}%)`,
                            }}
                            onTouchStart={onTouchStart}
                            onTouchMove={onTouchMove}
                            onTouchEnd={onTouchEnd}
                        >
                            {projects.map((project, index) => (
                                <div
                                    key={project._id}
                                    className={`flex-shrink-0 px-3 ${itemsPerView === 1 ? 'w-full' :
                                        itemsPerView === 2 ? 'w-1/2' : 'w-1/3'
                                        }`}
                                >
                                    <ProjectCard project={project} index={index} />
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* See All Projects Button */}
                    <div className="flex justify-center mt-8">
                        <motion.button
                            onClick={() => router.push('/projects')}
                            className="group relative px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                See All Projects
                                <motion.svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                >
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </motion.svg>
                            </span>

                            {/* Animated background */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.button>
                    </div>
                </div>
            ) : (
                <div className="text-center py-12 mb-8 sm:mb-12">
                    <p className="text-muted-foreground">No projects available. Please add projects from the admin panel.</p>
                </div>
            )}
        </div>
    )
}