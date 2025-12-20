'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit, X, Bot, Key, Trash2, Power } from 'lucide-react'
import api from '@/lib/api'

interface AiConfig {
    _id: string
    provider: string
    apiKey: string
    modelName: string
    temperature: number
    maxTokens: number
    isActive: boolean
    description?: string
    usageCount?: number
    lastUsed?: number
    createdAt: string
    updatedAt: string
}

interface AiConfigForm {
    provider: string
    apiKey: string
    modelName: string
    temperature: number
    maxTokens: number
    isActive: boolean
    description: string
}

const defaultForm: AiConfigForm = {
    provider: 'gemini',
    apiKey: '',
    modelName: 'gemini-2.5-flash',
    temperature: 0.7,
    maxTokens: 1000,
    isActive: true,
    description: ''
}

const providerOptions = [
    {
        value: 'gemini',
        label: 'Google Gemini',
        models: [
            'gemini-2.5-flash',
            'gemini-1.5-flash-latest',
            'gemini-1.5-pro-latest',
            'gemini-1.0-pro',
            'gemini-pro',
            'gemini-pro-vision'
        ]
    },
    {
        value: 'openai',
        label: 'OpenAI',
        models: [
            'gpt-3.5-turbo',
            'gpt-4',
            'gpt-4-turbo',
            'gpt-4o',
            'gpt-4o-mini'
        ]
    }
]

export default function AiConfigManager() {
    const [configs, setConfigs] = useState<AiConfig[]>([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [form, setForm] = useState<AiConfigForm>(defaultForm)
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        fetchConfigs()
    }, [])

    const fetchConfigs = async () => {
        try {
            const response = await api.get('/ai-config')
            setConfigs(response.data)
        } catch (error) {
            console.error('Failed to fetch AI configurations:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)

        try {
            if (editingId) {
                await api.put(`/ai-config/${editingId}`, form)
            } else {
                await api.post('/ai-config', form)
            }

            await fetchConfigs()
            resetForm()
        } catch (error) {
            console.error('Failed to save AI configuration:', error)
        } finally {
            setSubmitting(false)
        }
    }

    const handleDelete = async (id: string) => {
        const config = configs.find(c => c._id === id)
        const providerName = config ? getProviderLabel(config.provider) : 'configuration'

        // Check if trying to delete an active configuration
        if (config?.isActive) {
            alert(`Cannot delete the active ${providerName} configuration. Please activate another configuration first, then try deleting this one.`)
            return
        }

        if (!confirm(`Are you sure you want to delete the ${providerName} configuration? This action cannot be undone.`)) return

        try {
            await api.delete(`/ai-config/${id}`)
            await fetchConfigs()
        } catch (error: any) {
            console.error('Failed to delete AI configuration:', error)

            // Handle specific error cases
            if (error.response?.status === 400) {
                alert('Cannot delete this configuration. It may be currently active or in use.')
            } else {
                alert('Failed to delete configuration. Please try again.')
            }
        }
    }

    const handleActivate = async (id: string) => {
        try {
            await api.put(`/ai-config/${id}/activate`)
            await fetchConfigs()
        } catch (error) {
            console.error('Failed to activate AI configuration:', error)
            alert('Failed to activate configuration. Please try again.')
        }
    }

    const handleEdit = (config: AiConfig) => {
        setForm({
            provider: config.provider,
            apiKey: config.apiKey,
            modelName: config.modelName,
            temperature: config.temperature,
            maxTokens: config.maxTokens,
            isActive: config.isActive,
            description: config.description || ''
        })
        setEditingId(config._id)
        setShowForm(true)
    }

    const resetForm = () => {
        setForm(defaultForm)
        setEditingId(null)
        setShowForm(false)
    }

    const getProviderLabel = (provider: string) => {
        return providerOptions.find(p => p.value === provider)?.label || provider
    }

    const getAvailableModels = (provider: string) => {
        return providerOptions.find(p => p.value === provider)?.models || []
    }

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-24 bg-muted rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Bot className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">AI Configuration</h2>
                        <p className="text-muted-foreground">Manage AI assistant settings and API keys. Multiple active configs use round-robin load balancing.</p>
                    </div>
                </div>
                <motion.button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Plus size={16} />
                    Add Configuration
                </motion.button>
            </div>

            {/* Configurations List */}
            <div className="space-y-4">
                {configs.length === 0 ? (
                    <div className="text-center py-12 bg-card rounded-lg border border-dashed">
                        <Bot className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No AI Configurations</h3>
                        <p className="text-muted-foreground mb-4">Add your first AI configuration to enable the assistant</p>
                        <button
                            onClick={() => setShowForm(true)}
                            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            Add Configuration
                        </button>
                    </div>
                ) : (
                    configs.map((config) => (
                        <motion.div
                            key={config._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-6 bg-card rounded-lg border ${config.isActive ? 'border-primary bg-primary/5' : 'border-border'}`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${config.isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                                            <Key size={14} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold flex items-center gap-2">
                                                {getProviderLabel(config.provider)}
                                                {config.isActive && (
                                                    <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                                                        Active
                                                    </span>
                                                )}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">{config.modelName}</p>
                                            {config.isActive && (
                                                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                                    <span>Used: {config.usageCount || 0} times</span>
                                                    {config.lastUsed && (
                                                        <span>Last: {new Date(config.lastUsed).toLocaleString()}</span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 ml-4">
                                    {!config.isActive && (
                                        <button
                                            onClick={() => handleActivate(config._id)}
                                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                            title="Activate"
                                        >
                                            <Power size={16} />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleEdit(config)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(config._id)}
                                        disabled={config.isActive}
                                        className={`p-2 rounded-lg transition-colors ${config.isActive
                                                ? 'text-gray-400 cursor-not-allowed'
                                                : 'text-red-600 hover:bg-red-50'
                                            }`}
                                        title={config.isActive ? "Cannot delete active configuration" : "Delete"}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Form Modal */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={(e) => e.target === e.currentTarget && resetForm()}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-card rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-semibold">
                                    {editingId ? 'Edit AI Configuration' : 'Add AI Configuration'}
                                </h3>
                                <button
                                    onClick={resetForm}
                                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Provider</label>
                                        <select
                                            value={form.provider}
                                            onChange={(e) => {
                                                const provider = e.target.value
                                                const models = getAvailableModels(provider)
                                                setForm(prev => ({
                                                    ...prev,
                                                    provider,
                                                    modelName: models[0] || prev.modelName
                                                }))
                                            }}
                                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                                            required
                                        >
                                            {providerOptions.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Model</label>
                                        <select
                                            value={form.modelName}
                                            onChange={(e) => setForm(prev => ({ ...prev, modelName: e.target.value }))}
                                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                                            required
                                        >
                                            {getAvailableModels(form.provider).map(model => (
                                                <option key={model} value={model}>
                                                    {model}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">API Key</label>
                                    <input
                                        type="password"
                                        value={form.apiKey}
                                        onChange={(e) => setForm(prev => ({ ...prev, apiKey: e.target.value }))}
                                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                                        placeholder="Enter your API key"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Temperature ({form.temperature})</label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="2"
                                            step="0.1"
                                            value={form.temperature}
                                            onChange={(e) => setForm(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
                                            className="w-full"
                                        />
                                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                            <span>Conservative</span>
                                            <span>Creative</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Max Tokens</label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="4000"
                                            value={form.maxTokens}
                                            onChange={(e) => setForm(prev => ({ ...prev, maxTokens: parseInt(e.target.value) }))}
                                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Description (Optional)</label>
                                    <textarea
                                        value={form.description}
                                        onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                                        rows={3}
                                        placeholder="Brief description of this configuration"
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="isActive"
                                        checked={form.isActive}
                                        onChange={(e) => setForm(prev => ({ ...prev, isActive: e.target.checked }))}
                                        className="rounded"
                                    />
                                    <label htmlFor="isActive" className="text-sm">
                                        Set as active configuration
                                    </label>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                                    >
                                        {submitting ? 'Saving...' : editingId ? 'Update Configuration' : 'Add Configuration'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}