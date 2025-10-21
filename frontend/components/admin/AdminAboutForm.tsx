'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Save } from 'lucide-react'
import api from '@/lib/api'

const aboutSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    title: z.string().min(2, 'Title must be at least 2 characters'),
    bio: z.string().min(10, 'Bio must be at least 10 characters'),
    location: z.string().min(2, 'Location must be at least 2 characters'),
    resumeLink: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
    github: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
    linkedin: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
    twitter: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
    email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
})

type AboutFormData = z.infer<typeof aboutSchema>

export default function AdminAboutForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)
    const [loading, setLoading] = useState(true)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<AboutFormData>({
        resolver: zodResolver(aboutSchema),
    })

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const response = await api.get('/about')
                const data = response.data
                if (data) {
                    reset({
                        name: data.name || '',
                        title: data.title || '',
                        bio: data.bio || '',
                        location: data.location || '',
                        resumeLink: data.resumeLink || '',
                        github: data.socials?.github || '',
                        linkedin: data.socials?.linkedin || '',
                        twitter: data.socials?.twitter || '',
                        email: data.socials?.email || '',
                    })
                }
            } catch (error) {
                console.error('Failed to fetch about data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchAbout()
    }, [reset])

    const onSubmit = async (data: AboutFormData) => {
        setIsSubmitting(true)
        setSubmitStatus(null)

        try {
            const payload = {
                name: data.name,
                title: data.title,
                bio: data.bio,
                location: data.location,
                resumeLink: data.resumeLink || undefined,
                socials: {
                    github: data.github || undefined,
                    linkedin: data.linkedin || undefined,
                    twitter: data.twitter || undefined,
                    email: data.email || undefined,
                },
            }

            await api.put('/about', payload)
            setSubmitStatus('success')
        } catch (error) {
            console.error('Failed to update about:', error)
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (loading) {
        return (
            <div className="bg-card p-8 rounded-lg border animate-pulse">
                <div className="space-y-6">
                    {[...Array(5)].map((_, i) => (
                        <div key={i}>
                            <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
                            <div className="h-10 bg-muted rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card p-8 rounded-lg border"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                            Name
                        </label>
                        <input
                            {...register('name')}
                            type="text"
                            id="name"
                            className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                            placeholder="Your full name"
                        />
                        {errors.name && (
                            <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="title" className="block text-sm font-medium mb-2">
                            Title
                        </label>
                        <input
                            {...register('title')}
                            type="text"
                            id="title"
                            className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                            placeholder="Your professional title"
                        />
                        {errors.title && (
                            <p className="text-destructive text-sm mt-1">{errors.title.message}</p>
                        )}
                    </div>
                </div>

                <div>
                    <label htmlFor="bio" className="block text-sm font-medium mb-2">
                        Bio
                    </label>
                    <textarea
                        {...register('bio')}
                        id="bio"
                        rows={4}
                        className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                        placeholder="Tell us about yourself..."
                    />
                    {errors.bio && (
                        <p className="text-destructive text-sm mt-1">{errors.bio.message}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium mb-2">
                            Location
                        </label>
                        <input
                            {...register('location')}
                            type="text"
                            id="location"
                            className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                            placeholder="Your location"
                        />
                        {errors.location && (
                            <p className="text-destructive text-sm mt-1">{errors.location.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="resumeLink" className="block text-sm font-medium mb-2">
                            Resume Link
                        </label>
                        <input
                            {...register('resumeLink')}
                            type="url"
                            id="resumeLink"
                            className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                            placeholder="https://example.com/resume.pdf"
                        />
                        {errors.resumeLink && (
                            <p className="text-destructive text-sm mt-1">{errors.resumeLink.message}</p>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Social Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="github" className="block text-sm font-medium mb-2">
                                GitHub
                            </label>
                            <input
                                {...register('github')}
                                type="url"
                                id="github"
                                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="https://github.com/username"
                            />
                            {errors.github && (
                                <p className="text-destructive text-sm mt-1">{errors.github.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="linkedin" className="block text-sm font-medium mb-2">
                                LinkedIn
                            </label>
                            <input
                                {...register('linkedin')}
                                type="url"
                                id="linkedin"
                                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="https://linkedin.com/in/username"
                            />
                            {errors.linkedin && (
                                <p className="text-destructive text-sm mt-1">{errors.linkedin.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="twitter" className="block text-sm font-medium mb-2">
                                Twitter
                            </label>
                            <input
                                {...register('twitter')}
                                type="url"
                                id="twitter"
                                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="https://twitter.com/username"
                            />
                            {errors.twitter && (
                                <p className="text-destructive text-sm mt-1">{errors.twitter.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2">
                                Email
                            </label>
                            <input
                                {...register('email')}
                                type="email"
                                id="email"
                                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="your.email@example.com"
                            />
                            {errors.email && (
                                <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {isSubmitting ? (
                        'Saving...'
                    ) : (
                        <>
                            <Save size={16} />
                            Save Changes
                        </>
                    )}
                </button>

                {submitStatus === 'success' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-600"
                    >
                        About section updated successfully!
                    </motion.div>
                )}

                {submitStatus === 'error' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600"
                    >
                        Failed to update about section. Please try again.
                    </motion.div>
                )}
            </form>
        </motion.div>
    )
}