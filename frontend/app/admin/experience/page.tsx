import AdminExperienceManager from '@/components/admin/AdminExperienceManager'
import AdminLayout from '@/components/admin/AdminLayout'

export const metadata = {
    title: 'Manage Experience - Admin Dashboard',
    description: 'Manage work experience and career history',
}

export default function AdminExperiencePage() {
    return (
        <AdminLayout>
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Manage Experience</h1>
                <AdminExperienceManager />
            </div>
        </AdminLayout>
    )
}