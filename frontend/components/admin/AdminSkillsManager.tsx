'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Save, X, Percent } from 'lucide-react'
import api from '@/lib/api'

interface SkillItem {
    name: string
    level: number
}

interface Skill {
    _id: string
    category: string
    items: SkillItem[]
}

export default function AdminSkillsManager() {
    const [skills, setSkills] = useState<Skill[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [showAddForm, setShowAddForm] = useState(false)
    const [formData, setFormData] = useState({ category: '', items: [{ name: '', level: 0 }] })

    useEffect(() => {
        fetchSkills()
    }, [])

    const fetchSkills = async () => {
        try {
            const response = await api.get('/skills')
            // Ensure all skills have proper structure with default values
            const normalizedSkills = response.data.map((skill: any) => ({
                ...skill,
                category: skill.category || '',
                items: (skill.items || []).map((item: any) => ({
                    name: item.name || '',
                    level: typeof item.level === 'number' ? item.level : 0
                }))
            }))
            setSkills(normalizedSkills)
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
                items: formData.items.filter(item => item.name.trim() !== '')
            }
            await api.post('/skills', skillData)
            setFormData({ category: '', items: [{ name: '', level: 0 }] })
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
                                value={formData.category || ''}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="e.g., Frontend, Backend, Tools"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Skills</label>
                            <div className="space-y-3">
                                {formData.items.map((item, index) => (
                                    <div key={index} className="flex gap-3 items-center">
                                        <input
                                            type="text"
                                            value={item.name || ''}
                                            onChange={(e) => {
                                                const newItems = [...formData.items]
                                                newItems[index].name = e.target.value
                                                setFormData({ ...formData, items: newItems })
                                            }}
                                            className="flex-1 px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                            placeholder="Skill name (e.g., React)"
                                        />
                                        <div className="flex items-center gap-1">
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                value={item.level === 0 ? '' : item.level.toString()}
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/[^0-9]/g, '')
                                                    if (value === '') {
                                                        const newItems = [...formData.items]
                                                        newItems[index].level = 0
                                                        setFormData({ ...formData, items: newItems })
                                                        return
                                                    }
                                                    const numValue = Math.min(100, Math.max(0, parseInt(value, 10)))
                                                    if (!isNaN(numValue)) {
                                                        const newItems = [...formData.items]
                                                        newItems[index].level = numValue
                                                        setFormData({ ...formData, items: newItems })
                                                    }
                                                }}
                                                className="w-16 px-2 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring text-center text-sm font-medium"
                                                placeholder="0"
                                            />
                                            <span className="text-sm text-muted-foreground font-medium">%</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newItems = formData.items.filter((_, i) => i !== index)
                                                setFormData({ ...formData, items: newItems })
                                            }}
                                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                            disabled={formData.items.length === 1}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setFormData({
                                            ...formData,
                                            items: [...formData.items, { name: '', level: 0 }]
                                        })
                                    }}
                                    className="inline-flex items-center gap-2 px-3 py-2 text-sm border border-dashed border-border rounded-lg hover:bg-accent transition-colors"
                                >
                                    <Plus size={16} />
                                    Add Skill
                                </button>
                            </div>
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
                                    setFormData({ category: '', items: [{ name: '', level: 0 }] })
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
                                    value={skill.category || ''}
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
                            <div className="space-y-3">
                                {skill.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className="flex gap-3 items-center">
                                        <input
                                            type="text"
                                            value={item.name || ''}
                                            onChange={(e) => {
                                                const newItems = [...skill.items]
                                                newItems[itemIndex].name = e.target.value
                                                updateSkill(skill._id, 'items', newItems)
                                            }}
                                            className="flex-1 px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                            placeholder="Skill name"
                                        />
                                        <div className="flex items-center gap-1">
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                value={item.level === 0 ? '' : item.level.toString()}
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/[^0-9]/g, '')
                                                    if (value === '') {
                                                        const newItems = [...skill.items]
                                                        newItems[itemIndex].level = 0
                                                        updateSkill(skill._id, 'items', newItems)
                                                        return
                                                    }
                                                    const numValue = Math.min(100, Math.max(0, parseInt(value, 10)))
                                                    if (!isNaN(numValue)) {
                                                        const newItems = [...skill.items]
                                                        newItems[itemIndex].level = numValue
                                                        updateSkill(skill._id, 'items', newItems)
                                                    }
                                                }}
                                                className="w-16 px-2 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring text-center text-sm font-medium"
                                                placeholder="0"
                                            />
                                            <span className="text-sm text-muted-foreground font-medium">%</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newItems = skill.items.filter((_, i) => i !== itemIndex)
                                                updateSkill(skill._id, 'items', newItems)
                                            }}
                                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                            disabled={skill.items.length === 1}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newItems = [...skill.items, { name: '', level: 0 }]
                                        updateSkill(skill._id, 'items', newItems)
                                    }}
                                    className="inline-flex items-center gap-2 px-3 py-2 text-sm border border-dashed border-border rounded-lg hover:bg-accent transition-colors"
                                >
                                    <Plus size={16} />
                                    Add Skill
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {skill.items.map((item, itemIndex) => (
                                    <div
                                        key={itemIndex}
                                        className="flex items-center gap-2 px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm"
                                    >
                                        <span>{item.name}</span>
                                        <span className="text-xs opacity-75">{item.level}%</span>
                                    </div>
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