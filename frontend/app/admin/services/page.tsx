import AdminLayout from '@/components/admin/AdminLayout'
import AdminServicesManager from '@/components/admin/AdminServicesManager'

export const metadata = {
    title: 'Manage Services - Admin Dashboard',
    description: 'Manage services and offerings',
}

export default function AdminServicesPage() {
    return (
        <AdminLayout>
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Manage Services</h1>
                <AdminServicesManager />
            </div>
        </AdminLayout>
    )
}