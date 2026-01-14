import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Aman Kumar - Full Stack Developer Portfolio',
    description: 'Passionate full-stack developer creating innovative solutions and beautiful user experiences. Explore my projects, skills, and get in touch for collaboration.',
}

import MobileNav from '@/components/MobileNav'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider
                    defaultTheme="dark"
                    storageKey="portfolio-theme"
                >
                    <MobileNav />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}