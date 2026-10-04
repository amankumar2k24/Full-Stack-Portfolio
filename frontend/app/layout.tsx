import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', display: 'swap' })

export const metadata: Metadata = {
    title: 'Aman Kumar - Full Stack Developer Portfolio',
    description: 'Passionate full-stack developer creating innovative solutions and beautiful user experiences. Explore my projects, skills, and get in touch for collaboration.',
}

import MobileNav from '@/components/MobileNav'
import { UIProvider } from '@/components/UIProvider'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className} ${spaceGrotesk.variable}`}>
                <ThemeProvider
                    defaultTheme="dark"
                    storageKey="portfolio-theme"
                >
                    <UIProvider>
                        <MobileNav />
                        {children}
                    </UIProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}