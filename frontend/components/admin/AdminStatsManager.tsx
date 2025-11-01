'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Save, X, ArrowUp, ArrowDown, BarChart3 } from 'lucide-react'
import api from '@/lib/api'
import DeleteConfirmationModal from '@/components/ui/DeleteConfirmationModal'

interface Stat {
    _id: string
    key: string
    label: string
    value: string
    icon: string
    color: string
    order: number
    isActive: boolean
    description?: string
}

export default function AdminStatsManager() {
    const [stats, setStats] = useState<Stat[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [showAddForm, setShowAddForm] = useState(false)
    const [formData, setFormData] = useState({
        key: '',
        label: '',
        value: '',
        icon: 'Award',
        color: '#3B82F6',
        order: 0,
        isActive: true,
        description: ''
    })
    const [deleteModal, setDeleteModal] = useState<{
        isOpen: boolean
        statId: string | null
        statLabel: string
    }>({
        isOpen: false,
        statId: null,
        statLabel: ''
    })
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        fetchStats()
    }, [])

    const fetchStats = async () => {
        try {
            const response = await api.get('/stats/admin/all')
            setStats(response.data.sort((a: Stat, b: Stat) => a.order - b.order))
        } catch (error) {
            console.error('Failed to fetch stats:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleAdd = async () => {
        try {
            await api.post('/stats', formData)
            setFormData({
                key: '',
                label: '',
                value: '',
                icon: 'Award',
                color: '#3B82F6',
                order: 0,
                isActive: true,
                description: ''
            })
            setShowAddForm(false)
            fetchStats()
        } catch (error) {
            console.error('Failed to add stat:', error)
        }
    }

    const handleUpdate = async (id: string) => {
        try {
            const stat = stats.find(s => s._id === id)
            if (stat) {
                await api.put(`/stats/${id}`, stat)
                setEditingId(null)
                fetchStats()
            }
        } catch (error) {
            console.error('Failed to update stat:', error)
        }
    }

    const openDeleteModal = (statId: string, statLabel: string) => {
        setDeleteModal({
            isOpen: true,
            statId,
            statLabel
        })
    }

    const closeDeleteModal = () => {
        setDeleteModal({
            isOpen: false,
            statId: null,
            statLabel: ''
        })
    }

    const handleDelete = async () => {
        if (!deleteModal.statId) return

        setIsDeleting(true)
        try {
            await api.delete(`/stats/${deleteModal.statId}`)
            fetchStats()
            closeDeleteModal()
        } catch (error) {
            console.error('Failed to delete stat:', error)
            alert('Failed to delete statistic. Please try again.')
        } finally {
            setIsDeleting(false)
        }
    }

    const updateStat = (id: string, field: string, value: any) => {
        setStats(stats.map(stat =>
            stat._id === id ? { ...stat, [field]: value } : stat
        ))
    }

    const moveStat = async (id: string, direction: 'up' | 'down') => {
        const currentIndex = stats.findIndex(stat => stat._id === id)
        if (
            (direction === 'up' && currentIndex === 0) ||
            (direction === 'down' && currentIndex === stats.length - 1)
        ) return

        const newStats = [...stats]
        const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1

            // Swap positions
            ;[newStats[currentIndex], newStats[targetIndex]] =
                [newStats[targetIndex], newStats[currentIndex]]

        // Update order values
        newStats.forEach((stat, index) => {
            stat.order = index
        })

        setStats(newStats)

        // Update in backend
        try {
            await Promise.all(
                newStats.map(stat =>
                    api.put(`/stats/${stat._id}`, { ...stat, order: stat.order })
                )
            )
        } catch (error) {
            console.error('Failed to update order:', error)
            fetchStats() // Revert on error
        }
    }

    const iconOptions = ['Calendar', 'Award', 'Users', 'Code2', 'TrendingUp', 'Zap', 'Star', 'Heart', 'Target', 'Trophy']

    if (loading) {
        return (
            <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
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
                <p className="text-muted-foreground">Manage your portfolio statistics and achievements</p>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap"
                >
                    <Plus size={16} />
                    Add Statistic
                </button>
            </div>

            {showAddForm && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card p-6 rounded-lg border"
                >
                    <h3 className="text-lg font-semibold mb-4">Add New Statistic</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Key (unique identifier)</label>
                            <input
                                type="text"
                                value={formData.key}
                                onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="years_experience"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Label</label>
                            <input
                                type="text"
                                value={formData.label}
                                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="Years Experience"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Value</label>
                            <input
                                type="text"
                                value={formData.value}
                                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="3+"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Icon</label>
                            <select
                                value={formData.icon}
                                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                            >
                                {iconOptions.map(icon => (
                                    <option key={icon} value={icon}>{icon}</option>
                                ))}
                            </select>
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
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2">Description (optional)</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                                rows={2}
                                placeholder="Brief description of this statistic"
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
                                    key: '',
                                    label: '',
                                    value: '',
                                    icon: 'Award',
                                    color: '#3B82F6',
                                    order: 0,
                                    isActive: true,
                                    description: ''
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
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-card p-6 rounded-lg border"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                {editingId === stat._id ? (
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-sm font-medium mb-1">Key</label>
                                                <input
                                                    type="text"
                                                    value={stat.key}
                                                    onChange={(e) => updateStat(stat._id, 'key', e.target.value)}
                                                    className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">Label</label>
                                                <input
                                                    type="text"
                                                    value={stat.label}
                                                    onChange={(e) => updateStat(stat._id, 'label', e.target.value)}
                                                    className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                            <div>
                                                <label className="block text-sm font-medium mb-1">Value</label>
                                                <input
                                                    type="text"
                                                    value={stat.value}
                                                    onChange={(e) => updateStat(stat._id, 'value', e.target.value)}
                                                    className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">Icon</label>
                                                <select
                                                    value={stat.icon}
                                                    onChange={(e) => updateStat(stat._id, 'icon', e.target.value)}
                                                    className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                                >
                                                    {iconOptions.map(icon => (
                                                        <option key={icon} value={icon}>{icon}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">Color</label>
                                                <input
                                                    type="color"
                                                    value={stat.color}
                                                    onChange={(e) => updateStat(stat._id, 'color', e.target.value)}
                                                    className="w-full h-10 border border-input rounded-lg bg-background"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Description</label>
                                            <textarea
                                                value={stat.description || ''}
                                                onChange={(e) => updateStat(stat._id, 'description', e.target.value)}
                                                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                                                rows={2}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <div
                                                className="w-8 h-8 rounded-lg flex items-center justify-center"
                                                style={{ backgroundColor: `${stat.color}20` }}
                                            >
                                                <BarChart3 size={16} style={{ color: stat.color }} />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold">{stat.label}</h3>
                                                <p className="text-sm text-muted-foreground">Key: {stat.key}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <span className="font-bold text-2xl" style={{ color: stat.color }}>{stat.value}</span>
                                            <span>Icon: {stat.icon}</span>
                                            <span>Order: {stat.order}</span>
                                            <span className={stat.isActive ? 'text-green-600' : 'text-red-600'}>
                                                {stat.isActive ? '✅ Active' : '❌ Inactive'}
                                            </span>
                                        </div>
                                        {stat.description && (
                                            <p className="text-sm text-muted-foreground mt-2">{stat.description}</p>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-2 ml-4">
                                <button
                                    onClick={() => moveStat(stat._id, 'up')}
                                    disabled={index === 0}
                                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    <ArrowUp size={16} />
                                </button>
                                <button
                                    onClick={() => moveStat(stat._id, 'down')}
                                    disabled={index === stats.length - 1}
                                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    <ArrowDown size={16} />
                                </button>
                                {editingId === stat._id ? (
                                    <>
                                        <button
                                            onClick={() => handleUpdate(stat._id)}
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
                                            onClick={() => setEditingId(stat._id)}
                                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => openDeleteModal(stat._id, stat.label)}
                                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {stats.length === 0 && !loading && (
                <div className="text-center py-12">
                    <BarChart3 size={48} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No statistics found. Add your first statistic!</p>
                </div>
            )}

            <DeleteConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={closeDeleteModal}
                onConfirm={handleDelete}
                title="Delete Statistic"
                message="Are you sure you want to delete this statistic?"
                itemName={deleteModal.statLabel}
                isDeleting={isDeleting}
            />
        </div>
    )
}