'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Save, X, ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'
import api from '@/lib/api'

interface Project {
    _id: string
    title: string
    description: string
    techStack: string[]
    githubLink?: string
    liveLink?: string
    imageUrl?: string
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
        githubLink: '',
        liveLink: '',
        imageUrl: ''
    })

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
                techStack: formData.techStack.split(',').map(tech => tech.trim()).filter(tech => tech)
            }
            await api.post('/projects', projectData)
            setFormData({
                title: '',
                description: '',
                techStack: '',
                githubLink: '',
                liveLink: '',
                imageUrl: ''
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
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
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
                            <label className="block text-sm font-medium mb-2">Image URL</label>
                            <input
                                type="url"
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="https://example.com/image.jpg"
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
                            <label className="block text-sm font-medium mb-2">GitHub Link</label>
                            <input
                                type="url"
                                value={formData.githubLink}
                                onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="https://github.com/username/repo"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Live Link</label>
                            <input
                                type="url"
                                value={formData.liveLink}
                                onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
                                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="https://project-demo.com"
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
                                    githubLink: '',
                                    liveLink: '',
                                    imageUrl: ''
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
                        className="bg-card rounded-lg border overflow-hidden"
                    >
                        {project.imageUrl && (
                            <div className="relative h-48 w-full">
                                <Image
                                    src={project.imageUrl}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}

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
                                    <h3 className="text-xl font-semibold">{project.title}</h3>
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
                                <textarea
                                    value={project.description}
                                    onChange={(e) => updateProject(project._id, 'description', e.target.value)}
                                    className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none mb-4"
                                    rows={3}
                                />
                            ) : (
                                <p className="text-muted-foreground mb-4 line-clamp-3">
                                    {project.description}
                                </p>
                            )}

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

                            <div className="flex gap-3">
                                {project.githubLink && (
                                    <a
                                        href={project.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-sm hover:text-primary transition-colors"
                                    >
                                        <Github size={16} />
                                        Code
                                    </a>
                                )}
                                {project.liveLink && (
                                    <a
                                        href={project.liveLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-sm hover:text-primary transition-colors"
                                    >
                                        <ExternalLink size={16} />
                                        Live Demo
                                    </a>
                                )}
                            </div>
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