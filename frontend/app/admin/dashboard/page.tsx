import { Suspense } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import AdminDashboard from '@/components/admin/AdminDashboard'

export default function AdminDashboardPage() {
    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
                <Suspense fallback={<div>Loading...</div>}>
                    <AdminDashboard />
                </Suspense>
            </div>
        </AdminLayout>
    )
}