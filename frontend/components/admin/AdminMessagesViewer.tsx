'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Calendar, User, Trash2 } from 'lucide-react'
import api from '@/lib/api'

interface Message {
    _id: string
    name: string
    email: string
    message: string
    createdAt: string
}

export default function AdminMessagesViewer() {
    const [messages, setMessages] = useState<Message[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchMessages()
    }, [])

    const fetchMessages = async () => {
        try {
            const response = await api.get('/contact')
            setMessages(response.data)
        } catch (error) {
            console.error('Failed to fetch messages:', error)
        } finally {
            setLoading(false)
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const handleDelete = async (messageId: string) => {
        if (confirm('Are you sure you want to permanently delete this message? This action cannot be undone.')) {
            try {
                await api.delete(`/contact/${messageId}`)
                setMessages(messages.filter(message => message._id !== messageId))
            } catch (error) {
                console.error('Failed to delete message:', error)
                alert('Failed to delete message. Please try again.')
            }
        }
    }

    if (loading) {
        return (
            <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="bg-card p-6 rounded-lg border animate-pulse">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-4 bg-muted rounded w-1/4"></div>
                            <div className="h-4 bg-muted rounded w-1/6"></div>
                        </div>
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
            <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                    {messages.length} message{messages.length !== 1 ? 's' : ''} received
                </p>
            </div>

            <div className="space-y-4">
                {messages.map((message, index) => (
                    <motion.div
                        key={message._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-card p-6 rounded-lg border hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <User size={16} />
                                    <span className="font-medium text-foreground">{message.name}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Mail size={16} />
                                    <a
                                        href={`mailto:${message.email}`}
                                        className="hover:text-primary transition-colors"
                                    >
                                        {message.email}
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar size={16} />
                                <span>{formatDate(message.createdAt)}</span>
                            </div>
                        </div>

                        <div className="bg-muted/50 p-4 rounded-lg">
                            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                                {message.message}
                            </p>
                        </div>

                        <div className="mt-4 flex gap-2 justify-between">
                            <a
                                href={`mailto:${message.email}?subject=Re: Your message&body=Hi ${message.name},%0D%0A%0D%0AThank you for your message:%0D%0A"${message.message}"%0D%0A%0D%0A`}
                                className="inline-flex items-center gap-2 px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
                            >
                                <Mail size={14} />
                                Reply
                            </a>
                            <button
                                onClick={() => handleDelete(message._id)}
                                className="inline-flex items-center gap-2 px-3 py-1 text-sm bg-destructive text-destructive-foreground rounded hover:bg-destructive/90 transition-colors"
                                title="Delete message permanently"
                            >
                                <Trash2 size={14} />
                                Delete
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {messages.length === 0 && !loading && (
                <div className="text-center py-12">
                    <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No messages received yet.</p>
                    <p className="text-sm text-muted-foreground mt-2">
                        Messages from your contact form will appear here.
                    </p>
                </div>
            )}
        </div>
    )
}