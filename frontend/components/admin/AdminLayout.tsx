'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store'
import AdminSidebar from './AdminSidebar'

interface AdminLayoutProps {
    children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const { isAuthenticated } = useAuthStore()
    const router = useRouter()
    const [isVerySmall, setIsVerySmall] = useState(false)
    const [isMobile, setIsMobile] = useState(false)


    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/admin/login')
        }
    }, [isAuthenticated, router])

    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth
            setIsVerySmall(width < 420)
            setIsMobile(width >= 420 && width < 720)
        }

        checkScreenSize()
        window.addEventListener('resize', checkScreenSize)
        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p>Checking authentication...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            <AdminSidebar />

            <main className={`p-6 transition-all duration-300 ${isVerySmall ? 'w-full ml-0' :
                isMobile ? 'pt-20 ml-0' :
                    'ml-72'
                }`}>
                {children}
            </main>
        </div>
    )
}