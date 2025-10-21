import AdminLayout from '@/components/admin/AdminLayout'
import AdminMessagesViewer from '@/components/admin/AdminMessagesViewer'

export const metadata = {
    title: 'Messages - Admin Dashboard',
    description: 'View contact messages',
}

export default function AdminMessagesPage() {
    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Contact Messages</h1>
                <AdminMessagesViewer />
            </div>
        </AdminLayout>
    )
}