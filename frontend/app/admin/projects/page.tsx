import AdminLayout from '@/components/admin/AdminLayout'
import AdminProjectsManager from '@/components/admin/AdminProjectsManager'

export const metadata = {
    title: 'Manage Projects - Admin Dashboard',
    description: 'Manage portfolio projects',
}

export default function AdminProjectsPage() {
    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Manage Projects</h1>
                <AdminProjectsManager />
            </div>
        </AdminLayout>
    )
}