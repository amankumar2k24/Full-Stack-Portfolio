'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Save, X, Settings as SettingsIcon } from 'lucide-react'
import api from '@/lib/api'

interface Setting {
    _id: string
    key: string
    value: string
    description?: string
    type: 'text' | 'textarea' | 'json' | 'boolean' | 'number'
}

export default function AdminSettingsManager() {
    const [settings, setSettings] = useState<Setting[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [showAddForm, setShowAddForm] = useState(false)
    const [formData, setFormData] = useState({
        key: '',
        value: '',
        description: '',
        type: 'text' as Setting['type']
    })

    useEffect(() => {
        fetchSettings()
    }, [])

    const fetchSettings = async () => {
        try {
            const response = await api.get('/settings')
            setSettings(response.data)
        } catch (error) {
            console.error('Failed to fetch settings:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleAdd = async () => {
        try {
            await api.post('/settings', formData)
            setFormData({
                key: '',
                value: '',
                description: '',
                type: 'text'
            })
            setShowAddForm(false)
            fetchSettings()
        } catch (error) {
            console.error('Failed to add setting:', error)
        }
    }

    const handleUpdate = async (id: string) => {
        try {
            const setting = settings.find(s => s._id === id)
            if (setting) {
                await api.put(`/settings/${id}`, setting)
                setEditingId(null)
                fetchSettings()
            }
        } catch (error) {
            console.error('Failed to update setting:', error)
        }
    }

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this setting?')) {
            try {
                await api.delete(`/settings/${id}`)
                fetchSettings()
            } catch (error) {
                console.error('Failed to delete setting:', error)
            }
        }
    }

    const updateSetting = (id: string, field: string, value: any) => {
        setSettings(settings.map(setting =>
            setting._id === id ? { ...setting, [field]: value } : setting
        ))
    }

    const renderValueInput = (setting: Setting, isEditing: boolean) => {
        if (!isEditing) {
            switch (setting.type) {
                case 'boolean':
                    return (
                        <span className={`px-2 py-1 rounded text-xs ${setting.value === 'true'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                            {setting.value === 'true' ? 'Enabled' : 'Disabled'}
                        </span>
                    )
                case 'json':
                    return (
                        <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                            {JSON.stringify(JSON.parse(setting.value || '{}'), null, 2)}
                        </pre>
                    )
                case 'textarea':
                    return <p className="text-sm whitespace-pre-wrap">{setting.value}</p>
                default:
                    return <p className="text-sm">{setting.value}</p>
            }
        }

        switch (setting.type) {
            case 'boolean':
                return (
                    <select
                        value={setting.value}
                        onChange={(e) => updateSetting(setting._id, 'value', e.target.value)}
                        className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                )
            case 'number':
                return (
                    <input
                        type="number"
                        value={setting.value}
                        onChange={(e) => updateSetting(setting._id, 'value', e.target.value)}
                        className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                )
            case 'textarea':
                return (
                    <textarea
                        value={setting.value}
                        onChange={(e) => updateSetting(setting._id, 'value', e.target.value)}
                        className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                        rows={4}
                    />
                )
            case 'json':
                return (
                    <textarea
                        value={setting.value}
                        onChange={(e) => updateSetting(setting._id, 'value', e.target.value)}
                        className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none font-mono text-sm"
                        rows={6}
                        placeholder='{"key": "value"}'
                    />
                )
            default:
                return (
                    <input
                        type="text"
                        value={setting.value}
                        onChange={(e) => updateSetting(setting._id, 'value', e.target.value)}
                        className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                )
        }
    }

    if (loading) {
        return (
            <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
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
                <p className="text-muted-foreground">Manage website settings and configuration</p>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                    <Plus size={16} />
                    Add Setting
                </button>
            </div>

            {showAddForm && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card p-6 rounded-lg border"
                >
                    <h3 className="text-lg font-semibold mb-4">Add New Setting</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Key</label>
                            <input
                                type="text"
                                value={formData.key}
                                onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="site_title"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Type</label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value as Setting['type'] })}
                                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                            >
                                <option value="text">Text</option>
                                <option value="textarea">Textarea</option>
                                <option value="number">Number</option>
                                <option value="boolean">Boolean</option>
                                <option value="json">JSON</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2">Description</label>
                            <input
                                type="text"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="Brief description of this setting"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2">Value</label>
                            {formData.type === 'textarea' ? (
                                <textarea
                                    value={formData.value}
                                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                                    className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                                    rows={4}
                                    placeholder="Setting value"
                                />
                            ) : formData.type === 'boolean' ? (
                                <select
                                    value={formData.value}
                                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                                    className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                >
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                            ) : formData.type === 'json' ? (
                                <textarea
                                    value={formData.value}
                                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                                    className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none font-mono text-sm"
                                    rows={6}
                                    placeholder='{"key": "value"}'
                                />
                            ) : (
                                <input
                                    type={formData.type === 'number' ? 'number' : 'text'}
                                    value={formData.value}
                                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                                    className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                    placeholder="Setting value"
                                />
                            )}
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
                                    value: '',
                                    description: '',
                                    type: 'text'
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
                {settings.map((setting, index) => (
                    <motion.div
                        key={setting._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-card p-6 rounded-lg border"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                {editingId === setting._id ? (
                                    <div className="space-y-2">
                                        <input
                                            type="text"
                                            value={setting.key}
                                            onChange={(e) => updateSetting(setting._id, 'key', e.target.value)}
                                            className="text-lg font-semibold bg-background border border-input rounded px-2 py-1 w-full"
                                            placeholder="Setting key"
                                        />
                                        <input
                                            type="text"
                                            value={setting.description || ''}
                                            onChange={(e) => updateSetting(setting._id, 'description', e.target.value)}
                                            className="text-sm bg-background border border-input rounded px-2 py-1 w-full"
                                            placeholder="Description"
                                        />
                                        <select
                                            value={setting.type}
                                            onChange={(e) => updateSetting(setting._id, 'type', e.target.value)}
                                            className="text-sm bg-background border border-input rounded px-2 py-1"
                                        >
                                            <option value="text">Text</option>
                                            <option value="textarea">Textarea</option>
                                            <option value="number">Number</option>
                                            <option value="boolean">Boolean</option>
                                            <option value="json">JSON</option>
                                        </select>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <SettingsIcon size={16} className="text-muted-foreground" />
                                            <h3 className="text-lg font-semibold">{setting.key}</h3>
                                            <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                                                {setting.type}
                                            </span>
                                        </div>
                                        {setting.description && (
                                            <p className="text-sm text-muted-foreground mb-2">{setting.description}</p>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-2 ml-4">
                                {editingId === setting._id ? (
                                    <>
                                        <button
                                            onClick={() => handleUpdate(setting._id)}
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
                                            onClick={() => setEditingId(setting._id)}
                                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(setting._id)}
                                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="bg-muted/50 p-4 rounded-lg">
                            {renderValueInput(setting, editingId === setting._id)}
                        </div>
                    </motion.div>
                ))}
            </div>

            {settings.length === 0 && !loading && (
                <div className="text-center py-12">
                    <SettingsIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No settings found. Add your first setting!</p>
                </div>
            )}
        </div>
    )
}