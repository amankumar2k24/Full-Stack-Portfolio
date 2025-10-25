import AdminStatsManager from '@/components/admin/AdminStatsManager'
import AdminLayout from '@/components/admin/AdminLayout'

export const metadata = {
    title: 'Manage Statistics - Admin Dashboard',
    description: 'Manage portfolio statistics and achievements',
}

export default function AdminStatsPage() {
    return (
        <AdminLayout>
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Manage Statistics</h1>
                <AdminStatsManager />
            </div>
        </AdminLayout>
    )
}