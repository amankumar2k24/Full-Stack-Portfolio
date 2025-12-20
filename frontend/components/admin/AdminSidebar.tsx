'use client'

import { useState, useEffect } from 'react'
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
    X,
    BarChart3,
    Bot
} from 'lucide-react'
import { useAuthStore } from '@/lib/store'

const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
    { name: 'About', href: '/admin/about', icon: User },
    { name: 'Services', href: '/admin/services', icon: Wrench },
    { name: 'Experience', href: '/admin/experience', icon: Briefcase },
    { name: 'Skills', href: '/admin/skills', icon: Code },
    { name: 'Projects', href: '/admin/projects', icon: FolderOpen },
    { name: 'Statistics', href: '/admin/stats', icon: BarChart3 },
    { name: 'AI Assistant', href: '/admin/ai-config', icon: Bot },
    { name: 'Messages', href: '/admin/messages', icon: Mail },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminSidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [isVerySmall, setIsVerySmall] = useState(false)
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)
    const pathname = usePathname()
    const router = useRouter()
    const { logout, user } = useAuthStore()

    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth
            const verySmall = width < 420
            const mobile = width >= 420 && width < 720

            setIsVerySmall(verySmall)
            setIsMobile(mobile)

            if (verySmall) {
                // On very small screens, hide sidebar completely
                setIsOverlayOpen(false)
            } else if (mobile) {
                // On mobile (420-720px), show collapsed sidebar
                setIsCollapsed(true)
                setIsOverlayOpen(false)
            } else {
                // On desktop (>720px), show expanded sidebar
                setIsCollapsed(false)
                setIsOverlayOpen(false)
            }
        }

        // Check initial screen size
        checkScreenSize()

        // Add event listener for window resize
        window.addEventListener('resize', checkScreenSize)

        // Cleanup event listener
        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])

    const handleToggle = () => {
        if (isVerySmall) {
            // On very small screens, toggle overlay
            setIsOverlayOpen(!isOverlayOpen)
        } else if (isMobile) {
            // On mobile (420-720px), toggle overlay for expanded view
            setIsOverlayOpen(!isOverlayOpen)
        } else {
            // On desktop, toggle normal collapse
            setIsCollapsed(!isCollapsed)
        }
    }

    const handleNavClick = () => {
        // Close overlay when clicking navigation items on very small screens
        if (isVerySmall) {
            setIsOverlayOpen(false)
        }
    }

    const handleLogout = () => {
        logout()
        router.push('/admin/login')
    }

    return (
        <>
            {/* Mobile Header for 420px-720px screens */}
            {isMobile && (
                <motion.header
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="fixed top-0 left-0 right-0 z-30 bg-card border-b border-border p-4 flex items-center justify-between"
                >
                    <h1 className="text-lg font-semibold">
                        {navigation.find(item => item.href === pathname)?.name || 'Dashboard'}
                    </h1>
                    <button
                        onClick={() => setIsOverlayOpen(true)}
                        className="p-3 bg-white rounded-full hover:opacity-80 transition-opacity shadow-md"
                    >
                        <Menu size={20} className="text-black" />
                    </button>
                </motion.header>
            )}

            {/* Floating hamburger button for very small screens when sidebar is hidden */}
            {isVerySmall && !isOverlayOpen && (
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOverlayOpen(true)}
                    className="fixed top-4 right-4 z-30 p-3 bg-white rounded-full hover:opacity-80 transition-opacity shadow-md"
                >
                    <Menu size={20} className="text-black" />
                </motion.button>
            )}

            {/* Overlay background for mobile and very small screens */}
            {(isVerySmall || isMobile) && isOverlayOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsOverlayOpen(false)}
                />
            )}

            {/* Render sidebar based on screen size and state */}
            {((isVerySmall || isMobile) && !isOverlayOpen) ? null : (

                <motion.div
                    initial={{
                        width: (isVerySmall || isMobile) ? 256 : (isCollapsed ? 80 : 256)
                    }}
                    animate={{
                        width: (isVerySmall || isMobile) ? 256 : (isCollapsed ? 80 : 256)
                    }}
                    className={`bg-card border-r border-border flex flex-col ${(isVerySmall || isMobile) ? 'fixed left-0 top-0 h-full z-50' : 'fixed left-0 top-0 h-screen z-0'
                        }`}
                >
                    <div className="p-4 border-b border-border">
                        <div className="flex items-center justify-between">
                            {(isVerySmall || isMobile || !isCollapsed) && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <h2 className="text-lg font-semibold">Aman Kumar</h2>
                                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                                </motion.div>
                            )}
                            {(isVerySmall || (!isMobile && !isVerySmall)) && (
                                <button
                                    onClick={handleToggle}
                                    className="p-2 hover:bg-accent rounded-lg transition-colors"
                                    title={isVerySmall ? 'Close menu' : 'Toggle sidebar'}
                                >
                                    {isVerySmall ? <X size={20} /> : (isCollapsed ? <Menu size={20} /> : <X size={20} />)}
                                </button>
                            )}
                        </div>
                    </div>

                    <nav className="flex-1 p-4">
                        <ul className="space-y-2">
                            {navigation.map((item) => {
                                const isActive = pathname === item.href
                                return (
                                    <li key={item.name} className="relative group">
                                        <Link
                                            href={item.href}
                                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive
                                                ? 'bg-primary text-primary-foreground'
                                                : 'hover:bg-accent'
                                                }`}
                                            onClick={handleNavClick}
                                        >
                                            <item.icon size={20} />
                                            {(isVerySmall || isMobile || !isCollapsed) && (
                                                <motion.span
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                >
                                                    {item.name}
                                                </motion.span>
                                            )}
                                        </Link>

                                        {/* Tooltip for collapsed state */}
                                        {!isVerySmall && isCollapsed && (
                                            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                                                {item.name}
                                                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-popover"></div>
                                            </div>
                                        )}
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>

                    <div className="p-4 border-t border-border relative group">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors w-full text-left"
                        >
                            <LogOut size={20} />
                            {(isVerySmall || isMobile || !isCollapsed) && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    Logout
                                </motion.span>
                            )}
                        </button>

                        {/* Tooltip for logout button when collapsed */}
                        {!isVerySmall && isCollapsed && (
                            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                                Logout
                                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-popover"></div>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </>
    )
}