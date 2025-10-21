import AdminLayout from '@/components/admin/AdminLayout'
import AdminAboutForm from '@/components/admin/AdminAboutForm'

export const metadata = {
    title: 'Edit About - Admin Dashboard',
    description: 'Edit about section content',
}

export default function AdminAboutPage() {
    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Edit About Section</h1>
                <AdminAboutForm />
            </div>
        </AdminLayout>
    )
}