import { Suspense } from 'react'
import Sidebar from '@/components/Sidebar'
import AboutSection from '@/components/AboutSection'

export const metadata = {
    title: 'About - Aman Kumar',
    description: 'Learn more about Aman Kumar, full-stack developer',
}

export default function AboutPage() {
    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar />
            <main className="flex-1 p-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">About</h1>
                    <Suspense fallback={<div>Loading...</div>}>
                        <AboutSection />
                    </Suspense>
                </div>
            </main>
        </div>
    )
}