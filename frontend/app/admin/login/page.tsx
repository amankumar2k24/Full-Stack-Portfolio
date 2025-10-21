import LoginForm from '@/components/admin/LoginForm'

export const metadata = {
    title: 'Admin Login - Aman Kumar Portfolio',
    description: 'Admin login for portfolio management',
}

export default function AdminLoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold">Admin Login</h1>
                    <p className="text-muted-foreground mt-2">
                        Sign in to manage your portfolio
                    </p>
                </div>
                <LoginForm />
            </div>
        </div>
    )
}