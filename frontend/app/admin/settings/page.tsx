import AdminLayout from '@/components/admin/AdminLayout'
import AdminSettingsManager from '@/components/admin/AdminSettingsManager'

export const metadata = {
    title: 'Settings - Admin Dashboard',
    description: 'Manage website settings and configuration',
}

export default function AdminSettingsPage() {
    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Website Settings</h1>
                <AdminSettingsManager />
            </div>
        </AdminLayout>
    )
}