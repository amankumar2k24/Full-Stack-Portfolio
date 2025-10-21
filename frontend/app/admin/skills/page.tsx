import AdminLayout from '@/components/admin/AdminLayout'
import AdminSkillsManager from '@/components/admin/AdminSkillsManager'

export const metadata = {
    title: 'Manage Skills - Admin Dashboard',
    description: 'Manage skills and categories',
}

export default function AdminSkillsPage() {
    return (
        <AdminLayout>
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Manage Skills</h1>
                <AdminSkillsManager />
            </div>
        </AdminLayout>
    )
}