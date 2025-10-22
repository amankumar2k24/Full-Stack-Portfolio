'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Save, X } from 'lucide-react'
import api from '@/lib/api'

interface Skill {
    _id: string
    category: string
    items: string[]
}

export default function AdminSkillsManager() {
    const [skills, setSkills] = useState<Skill[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [showAddForm, setShowAddForm] = useState(false)
    const [formData, setFormData] = useState({ category: '', items: '' })

    useEffect(() => {
        fetchSkills()
    }, [])

    const fetchSkills = async () => {
        try {
            const response = await api.get('/skills')
            setSkills(response.data)
        } catch (error) {
            console.error('Failed to fetch skills:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleAdd = async () => {
        try {
            const skillData = {
                category: formData.category,
                items: formData.items.split(',').map(item => item.trim()).filter(item => item)
            }
            await api.post('/skills', skillData)
            setFormData({ category: '', items: '' })
            setShowAddForm(false)
            fetchSkills()
        } catch (error) {
            console.error('Failed to add skill:', error)
        }
    }

    const handleUpdate = async (id: string) => {
        try {
            const skill = skills.find(s => s._id === id)
            if (skill) {
                await api.put(`/skills/${id}`, skill)
                setEditingId(null)
                fetchSkills()
            }
        } catch (error) {
            console.error('Failed to update skill:', error)
        }
    }

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this skill category?')) {
            try {
                await api.delete(`/skills/${id}`)
                fetchSkills()
            } catch (error) {
                console.error('Failed to delete skill:', error)
            }
        }
    }

    const updateSkill = (id: string, field: string, value: any) => {
        setSkills(skills.map(skill =>
            skill._id === id ? { ...skill, [field]: value } : skill
        ))
    }

    if (loading) {
        return (
            <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-card p-6 rounded-lg border animate-pulse">
                        <div className="h-6 bg-muted rounded w-1/4 mb-4"></div>
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
                <p className="text-muted-foreground">Manage your skill categories and items</p>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap"
                >
                    <Plus size={16} />
                    Add Category
                </button>
            </div>

            {showAddForm && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card p-6 rounded-lg border"
                >
                    <h3 className="text-lg font-semibold mb-4">Add New Skill Category</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Category Name</label>
                            <input
                                type="text"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="e.g., Frontend, Backend, Tools"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Skills (comma-separated)</label>
                            <textarea
                                value={formData.items}
                                onChange={(e) => setFormData({ ...formData, items: e.target.value })}
                                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                                rows={3}
                                placeholder="React, Next.js, TypeScript, JavaScript"
                            />
                        </div>
                        <div className="flex gap-2">
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
                                    setFormData({ category: '', items: '' })
                                }}
                                className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
                            >
                                <X size={16} />
                                Cancel
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            <div className="space-y-4">
                {skills.map((skill, index) => (
                    <motion.div
                        key={skill._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-card p-6 rounded-lg border"
                    >
                        <div className="flex items-start justify-between mb-4">
                            {editingId === skill._id ? (
                                <input
                                    type="text"
                                    value={skill.category}
                                    onChange={(e) => updateSkill(skill._id, 'category', e.target.value)}
                                    className="text-lg font-semibold bg-background border border-input rounded px-2 py-1"
                                />
                            ) : (
                                <h3 className="text-lg font-semibold">{skill.category}</h3>
                            )}

                            <div className="flex gap-2">
                                {editingId === skill._id ? (
                                    <>
                                        <button
                                            onClick={() => handleUpdate(skill._id)}
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
                                            onClick={() => setEditingId(skill._id)}
                                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(skill._id)}
                                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {editingId === skill._id ? (
                            <textarea
                                value={skill.items.join(', ')}
                                onChange={(e) => updateSkill(skill._id, 'items', e.target.value.split(',').map(item => item.trim()))}
                                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                                rows={3}
                            />
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {skill.items.map((item, itemIndex) => (
                                    <span
                                        key={itemIndex}
                                        className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {skills.length === 0 && !loading && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No skill categories found. Add your first category!</p>
                </div>
            )}
        </div>
    )
}