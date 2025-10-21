import { Suspense } from 'react'
import Sidebar from '@/components/Sidebar'
import SkillsSection from '@/components/SkillsSection'

export const metadata = {
    title: 'Skills - Aman Kumar',
    description: 'Technical skills and expertise of Aman Kumar',
}

export default function SkillsPage() {
    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar />
            <main className="flex-1 p-6">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Skills</h1>
                    <Suspense fallback={<div>Loading...</div>}>
                        <SkillsSection />
                    </Suspense>
                </div>
            </main>
        </div>
    )
}