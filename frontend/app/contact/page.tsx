import { Suspense } from 'react'
import Sidebar from '@/components/Sidebar'
import ContactForm from '@/components/ContactForm'

export const metadata = {
    title: 'Contact - Aman Kumar',
    description: 'Get in touch with Aman Kumar',
}

export default function ContactPage() {
    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar />
            <main className="flex-1 p-6">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Contact</h1>
                    <Suspense fallback={<div>Loading...</div>}>
                        <ContactForm />
                    </Suspense>
                </div>
            </main>
        </div>
    )
}