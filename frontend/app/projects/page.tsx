import { Suspense } from 'react'
import Sidebar from '@/components/Sidebar'
import ProjectsSection from '@/components/ProjectsSection'

export const metadata = {
    title: 'Projects - Aman Kumar',
    description: 'Portfolio projects by Aman Kumar',
}

export default function ProjectsPage() {
    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar />
            <main className="flex-1 p-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Projects</h1>
                    <Suspense fallback={<div>Loading...</div>}>
                        <ProjectsSection />
                    </Suspense>
                </div>
            </main>
        </div>
    )
}