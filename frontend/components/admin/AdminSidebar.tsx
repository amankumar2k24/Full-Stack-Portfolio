'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
    Home,
    User,
    Code,
    FolderOpen,
    Mail,
    Briefcase,
    Wrench,
    Settings,
    LogOut,
    Menu,
    X
} from 'lucide-react'
import { useAuthStore } from '@/lib/store'

const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
    { name: 'About', href: '/admin/about', icon: User },
    { name: 'Services', href: '/admin/services', icon: Wrench },
    { name: 'Experience', href: '/admin/experience', icon: Briefcase },
    { name: 'Skills', href: '/admin/skills', icon: Code },
    { name: 'Projects', href: '/admin/projects', icon: FolderOpen },
    { name: 'Messages', href: '/admin/messages', icon: Mail },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminSidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const pathname = usePathname()
    const router = useRouter()
    const { logout, user } = useAuthStore()

    const handleLogout = () => {
        logout()
        router.push('/admin/login')
    }

    return (
        <motion.div
            initial={{ width: 256 }}
            animate={{ width: isCollapsed ? 80 : 256 }}
            className="bg-card border-r border-border flex flex-col"
        >
            <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                    {!isCollapsed && (
                        <div>
                            <h2 className="text-lg font-semibold">Admin Panel</h2>
                            <p className="text-sm text-muted-foreground">{user?.email}</p>
                        </div>
                    )}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-2 hover:bg-accent rounded-lg transition-colors"
                    >
                        {isCollapsed ? <Menu size={20} /> : <X size={20} />}
                    </button>
                </div>
            </div>

            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive
                                        ? 'bg-primary text-primary-foreground'
                                        : 'hover:bg-accent'
                                        }`}
                                >
                                    <item.icon size={20} />
                                    {!isCollapsed && <span>{item.name}</span>}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            <div className="p-4 border-t border-border">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors w-full text-left"
                >
                    <LogOut size={20} />
                    {!isCollapsed && <span>Logout</span>}
                </button>
            </div>
        </motion.div>
    )
}