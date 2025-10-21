import { Suspense } from 'react'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminDashboard from '@/components/admin/AdminDashboard'

export default function AdminDashboardPage() {
    return (
        <div className="flex min-h-screen bg-background">
            <AdminSidebar />
            <main className="flex-1 p-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
                    <Suspense fallback={<div>Loading...</div>}>
                        <AdminDashboard />
                    </Suspense>
                </div>
            </main>
        </div>
    )
}