'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Save, X, ArrowUp, ArrowDown } from 'lucide-react'
import api from '@/lib/api'

interface Service {
    _id: string
    title: string
    description: string
    features: string[]
    icon: string
    color: string
    gradient: string
    order: number
    isActive: boolean
}

export default function AdminServicesManager() {
    const [services, setServices] = useState<Service[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [showAddForm, setShowAddForm] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        features: '',
        icon: '',
        color: '#3B82F6',
        gradient: 'from-blue-500 to-purple-600',
        order: 0,
        isActive: true
    })

    useEffect(() => {
        fetchServices()
    }, [])

    const fetchServices = async () => {
        try {
            const response = await api.get('/services')
            setServices(response.data.sort((a: Service, b: Service) => a.order - b.order))
        } catch (error) {
            console.error('Failed to fetch services:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleAdd = async () => {
        try {
            const serviceData = {
                ...formData,
                features: formData.features.split('\n').filter(item => item.trim())
            }
            await api.post('/services', serviceData)
            setFormData({
                title: '',
                description: '',
                features: '',
                icon: '',
                color: '#3B82F6',
                gradient: 'from-blue-500 to-purple-600',
                order: 0,
                isActive: true
            })
            setShowAddForm(false)
            fetchServices()
        } catch (error) {
            console.error('Failed to add service:', error)
        }
    }

    const handleUpdate = async (id: string) => {
        try {
            const service = services.find(s => s._id === id)
            if (service) {
                await api.put(`/services/${id}`, service)
                setEditingId(null)
                fetchServices()
            }
        } catch (error) {
            console.error('Failed to update service:', error)
        }
    }

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this service?')) {
            try {
                await api.delete(`/services/${id}`)
                fetchServices()
            } catch (error) {
                console.error('Failed to delete service:', error)
            }
        }
    }

    const updateService = (id: string, field: string, value: any) => {
        setServices(services.map(service =>
            service._id === id ? { ...service, [field]: value } : service
        ))
    }

    const moveService = async (id: string, direction: 'up' | 'down') => {
        const currentIndex = services.findIndex(service => service._id === id)
        if (
            (direction === 'up' && currentIndex === 0) ||
            (direction === 'down' && currentIndex === services.length - 1)
        ) return

        const newServices = [...services]
        const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1

            // Swap positions
            ;[newServices[currentIndex], newServices[targetIndex]] =
                [newServices[targetIndex], newServices[currentIndex]]

        // Update order values
        newServices.forEach((service, index) => {
            service.order = index
        })

        setServices(newServices)

        // Update in backend
        try {
            await Promise.all(
                newServices.map(service =>
                    api.put(`/services/${service._id}`, { ...service, order: service.order })
                )
            )
        } catch (error) {
            console.error('Failed to update order:', error)
            fetchServices() // Revert on error
        }
    }

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-card p-6 rounded-lg border animate-pulse">
                        <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
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
                <p className="text-muted-foreground">Manage your services and offerings</p>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                    <Plus size={16} />
                    Add Service
                </button>
            </div>

            {showAddForm && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card p-6 rounded-lg border"
                >
                    <h3 className="text-lg font-semibold mb-4">Add New Service</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Service Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="Web Development"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Icon (Lucide icon name)</label>
                            <input
                                type="text"
                                value={formData.icon}
                                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="Code"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                                rows={3}
                                placeholder="Brief description of the service"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2">Features (one per line)</label>
                            <textarea
                                value={formData.features}
                                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                                rows={4}
                                placeholder="Responsive Design&#10;Modern UI/UX&#10;Performance Optimization&#10;SEO Friendly"
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
                            <label className="block text-sm font-medium mb-2">Gradient Classes</label>
                            <input
                                type="text"
                                value={formData.gradient}
                                onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
                                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="from-blue-500 to-purple-600"
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
                                    description: '',
                                    features: '',
                                    icon: '',
                                    color: '#3B82F6',
                                    gradient: 'from-blue-500 to-purple-600',
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                    <motion.div
                        key={service._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-card p-6 rounded-lg border relative"
                    >
                        <div className="flex items-start justify-between mb-4">
                            {editingId === service._id ? (
                                <input
                                    type="text"
                                    value={service.title}
                                    onChange={(e) => updateService(service._id, 'title', e.target.value)}
                                    className="text-lg font-semibold bg-background border border-input rounded px-2 py-1 w-full"
                                />
                            ) : (
                                <h3 className="text-lg font-semibold">{service.title}</h3>
                            )}

                            <div className="flex gap-1 ml-2">
                                <button
                                    onClick={() => moveService(service._id, 'up')}
                                    disabled={index === 0}
                                    className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors disabled:opacity-50"
                                >
                                    <ArrowUp size={14} />
                                </button>
                                <button
                                    onClick={() => moveService(service._id, 'down')}
                                    disabled={index === services.length - 1}
                                    className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors disabled:opacity-50"
                                >
                                    <ArrowDown size={14} />
                                </button>
                                {editingId === service._id ? (
                                    <>
                                        <button
                                            onClick={() => handleUpdate(service._id)}
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
                                            onClick={() => setEditingId(service._id)}
                                            className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                                        >
                                            <Edit size={14} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(service._id)}
                                            className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {editingId === service._id ? (
                            <div className="space-y-4">
                                <textarea
                                    value={service.description}
                                    onChange={(e) => updateService(service._id, 'description', e.target.value)}
                                    className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                                    rows={3}
                                />
                                <textarea
                                    value={service.features.join('\n')}
                                    onChange={(e) => updateService(service._id, 'features', e.target.value.split('\n').filter(item => item.trim()))}
                                    className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                                    rows={4}
                                    placeholder="Features (one per line)"
                                />
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="text"
                                        value={service.icon}
                                        onChange={(e) => updateService(service._id, 'icon', e.target.value)}
                                        className="px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                        placeholder="Icon name"
                                    />
                                    <input
                                        type="color"
                                        value={service.color}
                                        onChange={(e) => updateService(service._id, 'color', e.target.value)}
                                        className="h-10 border border-input rounded-lg bg-background"
                                    />
                                </div>
                                <input
                                    type="text"
                                    value={service.gradient}
                                    onChange={(e) => updateService(service._id, 'gradient', e.target.value)}
                                    className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                    placeholder="Gradient classes"
                                />
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <p className="text-muted-foreground text-sm">{service.description}</p>
                                {service.features.length > 0 && (
                                    <ul className="space-y-1">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                                                <span className="w-1 h-1 bg-primary rounded-full"></span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <span>Icon: {service.icon}</span>
                                    <span>•</span>
                                    <div className="flex items-center gap-1">
                                        <span>Color:</span>
                                        <div
                                            className="w-3 h-3 rounded-full border"
                                            style={{ backgroundColor: service.color }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {services.length === 0 && !loading && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No services found. Add your first service!</p>
                </div>
            )}
        </div>
    )
}