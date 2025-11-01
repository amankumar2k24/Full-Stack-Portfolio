'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Save, X, ExternalLink, ChevronLeft, ChevronRight, ArrowUp, ArrowDown } from 'lucide-react'
import Image from 'next/image'
import api from '@/lib/api'

interface Project {
    _id: string
    title: string
    description: string
    techStack: string[]
    liveLinks: string[]
    imageUrls: string[]
    order: number
}



// Image Carousel Component for Admin
function AdminImageCarousel({ images, title }: { images: string[], title: string }) {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
    }

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    if (!images || images.length === 0) {
        return (
            <div className="relative h-48 w-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground text-sm">No images</span>
            </div>
        )
    }

    return (
        <div className="relative h-48 w-full overflow-hidden group">
            <Image
                src={images[currentIndex]}
                alt={`${title} - Image ${currentIndex + 1}`}
                fill
                className="object-cover"
            />

            {images.length > 1 && (
                <>
                    <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-1 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                    >
                        <ChevronRight size={16} />
                    </button>

                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-1.5 h-1.5 rounded-full transition-colors ${index === currentIndex ? 'bg-white' : 'bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default function AdminProjectsManager() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [showAddForm, setShowAddForm] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        techStack: '',
        liveLinks: '',
        imageUrls: ''
    })
    const [expandedDescriptions, setExpandedDescriptions] = useState<Set<string>>(new Set())

    useEffect(() => {
        fetchProjects()
    }, [])

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

    const handleAdd = async () => {
        try {
            const projectData = {
                ...formData,
                techStack: formData.techStack.split(',').map(tech => tech.trim()).filter(tech => tech),
                liveLinks: formData.liveLinks.split(',').map(link => link.trim()).filter(link => link),
                imageUrls: formData.imageUrls.split(',').map(url => url.trim()).filter(url => url)
            }
            await api.post('/projects', projectData)
            setFormData({
                title: '',
                description: '',
                techStack: '',
                liveLinks: '',
                imageUrls: ''
            })
            setShowAddForm(false)
            fetchProjects()
        } catch (error) {
            console.error('Failed to add project:', error)
        }
    }

    const handleUpdate = async (id: string) => {
        try {
            const project = projects.find(p => p._id === id)
            if (project) {
                await api.put(`/projects/${id}`, project)
                setEditingId(null)
                fetchProjects()
            }
        } catch (error) {
            console.error('Failed to update project:', error)
        }
    }

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this project?')) {
            try {
                await api.delete(`/projects/${id}`)
                fetchProjects()
            } catch (error) {
                console.error('Failed to delete project:', error)
            }
        }
    }

    const updateProject = (id: string, field: string, value: any) => {
        setProjects(projects.map(project =>
            project._id === id ? { ...project, [field]: value } : project
        ))
    }

    const moveProject = async (projectId: string, direction: 'up' | 'down') => {
        const currentIndex = projects.findIndex(p => p._id === projectId)
        if (
            (direction === 'up' && currentIndex === 0) ||
            (direction === 'down' && currentIndex === projects.length - 1)
        ) {
            return
        }

        const newProjects = [...projects]
        const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1

        // Swap the projects
        const temp = newProjects[currentIndex]
        newProjects[currentIndex] = newProjects[targetIndex]
        newProjects[targetIndex] = temp

        setProjects(newProjects)

        // Update order in backend
        const projectIds = newProjects.map(p => p._id)
        try {
            await api.put('/projects/reorder', { projectIds })
        } catch (error) {
            console.error('Failed to reorder projects:', error)
            fetchProjects()
        }
    }



    const toggleDescription = (projectId: string) => {
        const newExpanded = new Set(expandedDescriptions)
        if (newExpanded.has(projectId)) {
            newExpanded.delete(projectId)
        } else {
            newExpanded.add(projectId)
        }
        setExpandedDescriptions(newExpanded)
    }

    const truncateText = (text: string, maxLength: number = 100) => {
        if (text.length <= maxLength) return text
        return text.substring(0, maxLength) + '...'
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

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <p className="text-muted-foreground">Manage your portfolio projects</p>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap"
                >
                    <Plus size={16} />
                    Add Project
                </button>
            </div>

            {showAddForm && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card p-6 rounded-lg border"
                >
                    <h3 className="text-lg font-semibold mb-4">Add New Project</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="Project title"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Image URLs (comma-separated)</label>
                            <input
                                type="text"
                                value={formData.imageUrls}
                                onChange={(e) => setFormData({ ...formData, imageUrls: e.target.value })}
                                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                                rows={3}
                                placeholder="Project description"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Tech Stack (comma-separated)</label>
                            <input
                                type="text"
                                value={formData.techStack}
                                onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="React, Node.js, MongoDB"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Live Links (comma-separated)</label>
                            <input
                                type="text"
                                value={formData.liveLinks}
                                onChange={(e) => setFormData({ ...formData, liveLinks: e.target.value })}
                                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="https://demo1.com, https://demo2.com"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                        <button
                            onClick={handleAdd}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            <Save size={16} />
                            Save
                        </button>
                        <button
                            onClick={() => {
                                setShowAddForm(false)
                                setFormData({
                                    title: '',
                                    description: '',
                                    techStack: '',
                                    liveLinks: '',
                                    imageUrls: ''
                                })
                            }}
                            className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
                        >
                            <X size={16} />
                            Cancel
                        </button>
                    </div>
                </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <motion.div
                        key={project._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-card rounded-lg border overflow-hidden relative group"

                    >


                        {/* Reorder Controls */}
                        <div className="absolute top-2 right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => moveProject(project._id, 'up')}
                                disabled={index === 0}
                                className="p-1 bg-black/50 hover:bg-black/70 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Move up"
                            >
                                <ArrowUp size={14} />
                            </button>
                            <button
                                onClick={() => moveProject(project._id, 'down')}
                                disabled={index === projects.length - 1}
                                className="p-1 bg-black/50 hover:bg-black/70 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Move down"
                            >
                                <ArrowDown size={14} />
                            </button>
                        </div>

                        <AdminImageCarousel images={project.imageUrls || []} title={project.title} />

                        <div className="p-6">
                            <div className="flex items-start justify-between mb-2">
                                {editingId === project._id ? (
                                    <input
                                        type="text"
                                        value={project.title}
                                        onChange={(e) => updateProject(project._id, 'title', e.target.value)}
                                        className="text-xl font-semibold bg-background border border-input rounded px-2 py-1 w-full"
                                    />
                                ) : (
                                    <h3
                                        className="text-xl font-semibold cursor-help"
                                        title={project.title}
                                    >
                                        {project.title}
                                    </h3>
                                )}

                                <div className="flex gap-1 ml-2">
                                    {editingId === project._id ? (
                                        <>
                                            <button
                                                onClick={() => handleUpdate(project._id)}
                                                className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors"
                                            >
                                                <Save size={14} />
                                            </button>
                                            <button
                                                onClick={() => setEditingId(null)}
                                                className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                                            >
                                                <X size={14} />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => setEditingId(project._id)}
                                                className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                                            >
                                                <Edit size={14} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(project._id)}
                                                className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            {editingId === project._id ? (
                                <div className="space-y-4">
                                    <textarea
                                        value={project.description}
                                        onChange={(e) => updateProject(project._id, 'description', e.target.value)}
                                        className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                                        rows={3}
                                        placeholder="Project description"
                                    />
                                    <input
                                        type="text"
                                        value={project.techStack.join(', ')}
                                        onChange={(e) => updateProject(project._id, 'techStack', e.target.value.split(',').map(tech => tech.trim()).filter(tech => tech))}
                                        className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                        placeholder="Tech Stack (comma-separated)"
                                    />
                                    <input
                                        type="text"
                                        value={project.liveLinks.join(', ')}
                                        onChange={(e) => updateProject(project._id, 'liveLinks', e.target.value.split(',').map(link => link.trim()).filter(link => link))}
                                        className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                        placeholder="Live Links (comma-separated)"
                                    />
                                    <input
                                        type="text"
                                        value={project.imageUrls.join(', ')}
                                        onChange={(e) => updateProject(project._id, 'imageUrls', e.target.value.split(',').map(url => url.trim()).filter(url => url))}
                                        className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                        placeholder="Image URLs (comma-separated)"
                                    />
                                </div>
                            ) : (
                                <>
                                    <div className="text-muted-foreground mb-4">
                                        <p>
                                            {expandedDescriptions.has(project._id)
                                                ? project.description
                                                : (
                                                    <>
                                                        {project.description.length > 100
                                                            ? project.description.substring(0, 100)
                                                            : project.description
                                                        }
                                                        {project.description.length > 100 && (
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
                                            {expandedDescriptions.has(project._id) && project.description.length > 100 && (
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
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.techStack.map((tech, techIndex) => (
                                            <span
                                                key={techIndex}
                                                className="px-2 py-1 bg-accent text-accent-foreground rounded text-xs"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {project.liveLinks && project.liveLinks.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {project.liveLinks.map((link, linkIndex) => (
                                                <a
                                                    key={linkIndex}
                                                    href={link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 text-sm px-3 py-1.5 border border-border rounded-lg hover:bg-accent hover:text-primary transition-colors"
                                                >
                                                    <ExternalLink size={12} />
                                                    {project.liveLinks.length > 1 ? `Link ${linkIndex + 1}` : 'Link 1'}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {projects.length === 0 && !loading && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No projects found. Add your first project!</p>
                </div>
            )}
        </div>
    )
}