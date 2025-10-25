import { useState, useEffect } from 'react'
import api from '@/lib/api'

interface AboutData {
    name?: string
    title?: string
    bio?: string
    location?: string
    resumeLink?: string
    socials?: {
        github?: string
        linkedin?: string
        email?: string
        twitter?: string
    }
}

export const useAbout = () => {
    const [about, setAbout] = useState<AboutData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                setLoading(true)
                const response = await api.get('/about')
                setAbout(response.data)
                setError(null)
            } catch (err) {
                console.error('Failed to fetch about data:', err)
                setError('Failed to fetch about data')
            } finally {
                setLoading(false)
            }
        }

        fetchAbout()
    }, [])

    return { about, loading, error }
}