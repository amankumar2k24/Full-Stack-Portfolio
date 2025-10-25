'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Save, X, ArrowUp, ArrowDown } from 'lucide-react'
import api from '@/lib/api'

interface Experience {
    _id: string
    title: string
    company: string
    location: string
    duration: string
    description: string
    achievements: string[]
    technologies: string[]
    icon: string
    color: string
    order: number
    isActive: boolean
}

export default function AdminExperienceManager() {
    const [experiences, setExperiences] = useState<Experience[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [showAddForm, setShowAddForm] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        duration: '',
        description: '',
        achievements: '',
        technologies: '',
        icon: '',
        color: '#3B82F6',
        order: 0,
        isActive: true
    })

    useEffect(() => {
        fetchExperiences()
    }, [])

    const fetchExperiences = async () => {
        try {
            const response = await api.get('/experience')
            setExperiences(response.data.sort((a: Experience, b: Experience) => a.order - b.order))
        } catch (error) {
            console.error('Failed to fetch experiences:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleAdd = async () => {
        try {
            const experienceData = {
                ...formData,
                achievements: formData.achievements.split('\n').filter(item => item.trim()),
                technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech)
            }
            await api.post('/experience', experienceData)
            setFormData({
                title: '',
                company: '',
                location: '',
                duration: '',
                description: '',
                achievements: '',
                technologies: '',
                icon: '',
                color: '#3B82F6',
                order: 0,
                isActive: true
            })
            setShowAddForm(false)
            fetchExperiences()
        } catch (error) {
            console.error('Failed to add experience:', error)
        }
    }

    const handleUpdate = async (id: string) => {
        try {
            const experience = experiences.find(e => e._id === id)
            if (experience) {
                await api.put(`/experience/${id}`, experience)
                setEditingId(null)
                fetchExperiences()
            }
        } catch (error) {
            console.error('Failed to update experience:', error)
        }
    }

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this experience?')) {
            try {
                await api.delete(`/experience/${id}`)
                fetchExperiences()
            } catch (error) {
                console.error('Failed to delete experience:', error)
            }
        }
    }

    const updateExperience = (id: string, field: string, value: any) => {
        setExperiences(experiences.map(exp =>
            exp._id === id ? { ...exp, [field]: value } : exp
        ))
    }

    const moveExperience = async (id: string, direction: 'up' | 'down') => {
        const currentIndex = experiences.findIndex(exp => exp._id === id)
        if (
            (direction === 'up' && currentIndex === 0) ||
            (direction === 'down' && currentIndex === experiences.length - 1)
        ) return

        const newExperiences = [...experiences]
        const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1

            // Swap positions
            ;[newExperiences[currentIndex], newExperiences[targetIndex]] =
                [newExperiences[targetIndex], newExperiences[currentIndex]]

        // Update order values
        newExperiences.forEach((exp, index) => {
            exp.order = index
        })

        setExperiences(newExperiences)

        // Update in backend
        try {
            await Promise.all(
                newExperiences.map(exp =>
                    api.put(`/experience/${exp._id}`, { ...exp, order: exp.order })
                )
            )
        } catch (error) {
            console.error('Failed to update order:', error)
            fetchExperiences() // Revert on error
        }
    }

    if (loading) {
        return (
            <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-card p-6 rounded-lg border animate-pulse">
                        <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-muted rounded"></div>
                            <div className="h-4 bg-muted rounded w-3/4"></div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <p className="text-muted-foreground">Manage your work experience and career history</p>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap"
                >
                    <Plus size={16} />
                    Add Experience
                </button>
            </div>

            {showAddForm && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card p-6 rounded-lg border"
                >
                    <h3 className="text-lg font-semibold mb-4">Add New Experience</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Job Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="Senior Developer"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Company</label>
                            <input
                                type="text"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="Tech Company Inc."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Location</label>
                            <input
                                type="text"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="New York, NY"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Duration</label>
                            <input
                                type="text"
                                value={formData.duration}
                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="Jan 2020 - Present"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                                rows={3}
                                placeholder="Brief description of your role and responsibilities"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2">Achievements (one per line)</label>
                            <textarea
                                value={formData.achievements}
                                onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                                rows={4}
                                placeholder="Led a team of 5 developers&#10;Increased performance by 40%&#10;Implemented new architecture"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Technologies (comma-separated)</label>
                            <input
                                type="text"
                                value={formData.technologies}
                                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="React, Node.js, MongoDB"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Icon (Lucide icon name)</label>
                            <input
                                type="text"
                                value={formData.icon}
                                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="Briefcase"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Color</label>
                            <input
                                type="color"
                                value={formData.color}
                                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                className="w-full h-10 border border-input rounded-lg bg-background"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Order</label>
                            <input
                                type="number"
                                value={formData.order}
                                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="0"
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
                                    company: '',
                                    location: '',
                                    duration: '',
                                    description: '',
                                    achievements: '',
                                    technologies: '',
                                    icon: '',
                                    color: '#3B82F6',
                                    order: 0,
                                    isActive: true
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

            <div className="space-y-4">
                {experiences.map((experience, index) => (
                    <motion.div
                        key={experience._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-card p-6 rounded-lg border"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                {editingId === experience._id ? (
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Job Title</label>
                                            <input
                                                type="text"
                                                value={experience.title}
                                                onChange={(e) => updateExperience(experience._id, 'title', e.target.value)}
                                                className="text-lg font-semibold bg-background border border-input rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-ring"
                                                placeholder="Senior Developer"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-sm font-medium mb-1">Company</label>
                                                <input
                                                    type="text"
                                                    value={experience.company}
                                                    onChange={(e) => updateExperience(experience._id, 'company', e.target.value)}
                                                    className="text-base bg-background border border-input rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-ring"
                                                    placeholder="Tech Company Inc."
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">Location</label>
                                                <input
                                                    type="text"
                                                    value={experience.location}
                                                    onChange={(e) => updateExperience(experience._id, 'location', e.target.value)}
                                                    className="text-base bg-background border border-input rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-ring"
                                                    placeholder="New York, NY"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Duration</label>
                                            <input
                                                type="text"
                                                value={experience.duration}
                                                onChange={(e) => updateExperience(experience._id, 'duration', e.target.value)}
                                                className="text-base bg-background border border-input rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-ring"
                                                placeholder="Jan 2020 - Present"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <h3 className="text-lg font-semibold">{experience.title}</h3>
                                        <p className="text-muted-foreground">{experience.company} • {experience.location}</p>
                                        <p className="text-sm text-muted-foreground">{experience.duration}</p>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-2 ml-4">
                                <button
                                    onClick={() => moveExperience(experience._id, 'up')}
                                    disabled={index === 0}
                                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    <ArrowUp size={16} />
                                </button>
                                <button
                                    onClick={() => moveExperience(experience._id, 'down')}
                                    disabled={index === experiences.length - 1}
                                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    <ArrowDown size={16} />
                                </button>
                                {editingId === experience._id ? (
                                    <>
                                        <button
                                            onClick={() => handleUpdate(experience._id)}
                                            className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                                        >
                                            <Save size={16} />
                                        </button>
                                        <button
                                            onClick={() => setEditingId(null)}
                                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                        >
                                            <X size={16} />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => setEditingId(experience._id)}
                                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(experience._id)}
                                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {editingId === experience._id ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Description</label>
                                    <textarea
                                        value={experience.description}
                                        onChange={(e) => updateExperience(experience._id, 'description', e.target.value)}
                                        className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                                        rows={3}
                                        placeholder="Brief description of your role and responsibilities"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Key Achievements (one per line)</label>
                                    <textarea
                                        value={experience.achievements.join('\n')}
                                        onChange={(e) => updateExperience(experience._id, 'achievements', e.target.value.split('\n').filter(item => item.trim()))}
                                        className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                                        rows={4}
                                        placeholder="Led a team of 5 developers&#10;Increased performance by 40%&#10;Implemented new architecture"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Technologies (comma-separated)</label>
                                    <input
                                        type="text"
                                        value={experience.technologies.join(', ')}
                                        onChange={(e) => updateExperience(experience._id, 'technologies', e.target.value.split(',').map(tech => tech.trim()))}
                                        className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                        placeholder="React, Node.js, MongoDB"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <p className="text-foreground">{experience.description}</p>
                                {experience.achievements.length > 0 && (
                                    <div>
                                        <h4 className="font-medium mb-2">Key Achievements:</h4>
                                        <ul className="list-disc list-inside space-y-1">
                                            {experience.achievements.map((achievement, idx) => (
                                                <li key={idx} className="text-sm text-muted-foreground">{achievement}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <div className="flex flex-wrap gap-2">
                                    {experience.technologies.map((tech, techIndex) => (
                                        <span
                                            key={techIndex}
                                            className="px-2 py-1 bg-accent text-accent-foreground rounded text-xs"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {experiences.length === 0 && !loading && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No experience entries found. Add your first experience!</p>
                </div>
            )}
        </div>
    )
}