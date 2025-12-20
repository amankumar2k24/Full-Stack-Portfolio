import { Suspense } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import AiConfigManager from '@/components/admin/AiConfigManager'

export const metadata = {
    title: 'AI Assistant Configuration - Admin Dashboard',
    description: 'Manage AI assistant settings and API keys',
}

export default function AiConfigPage() {
    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto">
                <Suspense fallback={<div>Loading...</div>}>
                    <AiConfigManager />
                </Suspense>
            </div>
        </AdminLayout>
    )
}