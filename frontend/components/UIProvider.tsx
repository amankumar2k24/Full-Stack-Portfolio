'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface UIContextType {
    isMobileMenuOpen: boolean
    isChatOpen: boolean
    toggleMobileMenu: (open?: boolean) => void
    toggleChat: (open?: boolean) => void
}

const UIContext = createContext<UIContextType | undefined>(undefined)

export function UIProvider({ children }: { children: React.ReactNode }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isChatOpen, setIsChatOpen] = useState(false)

    const toggleMobileMenu = (open?: boolean) => {
        setIsMobileMenuOpen(prev => (open !== undefined ? open : !prev))
    }

    const toggleChat = (open?: boolean) => {
        setIsChatOpen(prev => (open !== undefined ? open : !prev))
    }

    // Handle scroll locking
    useEffect(() => {
        const shouldLock = isMobileMenuOpen || isChatOpen
        if (shouldLock) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }

        return () => {
            document.body.style.overflow = ''
        }
    }, [isMobileMenuOpen, isChatOpen])

    return (
        <UIContext.Provider value={{
            isMobileMenuOpen,
            isChatOpen,
            toggleMobileMenu,
            toggleChat
        }}>
            {children}
        </UIContext.Provider>
    )
}

export function useUI() {
    const context = useContext(UIContext)
    if (context === undefined) {
        throw new Error('useUI must be used within a UIProvider')
    }
    return context
}
