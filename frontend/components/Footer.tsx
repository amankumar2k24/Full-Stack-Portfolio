'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowUp, Code, Coffee } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAbout } from '@/hooks/useAbout'

export default function Footer() {
    const [showScrollTop, setShowScrollTop] = useState(false)
    const { about } = useAbout()

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 500)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const currentYear = new Date().getFullYear()

    return (
        <footer className="relative bg-card border-t border-border overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-6 py-8 sm:py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 sm:w-8 sm:h-8 bg-primary rounded-lg flex items-center justify-center">
                                <Code size={20} className="text-primary-foreground sm:w-4 sm:h-4" />
                            </div>
                            <span className="text-2xl sm:text-xl font-bold">Aman Kumar</span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-base sm:text-sm">
                            Crafting high-performance web applications with React, Node.js, AI integrations, and DevOps.
                        </p>
                        <div className="flex items-center gap-2 text-base sm:text-sm text-muted-foreground">
                            <Coffee size={18} className="sm:w-4 sm:h-4" />
                            <span>Fueled by coffee and creativity</span>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="space-y-4"
                    >
                        <h3 className="text-xl sm:text-lg font-semibold">Quick Links</h3>
                        <div className="grid grid-cols-2 gap-3 sm:gap-2">
                            {[
                                { name: 'About', href: '#about' },
                                { name: 'Skills', href: '#skills' },
                                { name: 'Projects', href: '#projects' },
                                { name: 'Contact', href: '#contact' },
                            ].map((link) => (
                                <motion.button
                                    key={link.name}
                                    onClick={() => {
                                        const sectionId = link.href.substring(1)
                                        const element = document.getElementById(sectionId)
                                        if (element) {
                                            // Dynamic header offset based on screen size
                                            const isMobile = window.innerWidth < 768
                                            const headerOffset = isMobile ? 120 : 80

                                            // Get the section heading element for better positioning
                                            const sectionHeading = element.querySelector('h1, h2')
                                            const targetElement = sectionHeading || element

                                            const elementPosition = targetElement.getBoundingClientRect().top
                                            const offsetPosition = elementPosition + window.pageYOffset - headerOffset

                                            window.scrollTo({
                                                top: offsetPosition,
                                                behavior: 'smooth'
                                            })
                                        }
                                    }}
                                    className="text-left text-muted-foreground hover:text-primary transition-colors text-base sm:text-sm"
                                    whileHover={{ x: 4 }}
                                >
                                    {link.name}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-4"
                    >
                        <h3 className="text-xl sm:text-lg font-semibold">Let's Connect</h3>
                        <p className="text-muted-foreground text-base sm:text-sm">
                            Ready to start your next project? I'm always excited to work on new challenges.
                        </p>
                        <div className="flex gap-4">
                            {about?.socials?.github && (
                                <motion.a
                                    href={about.socials.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 sm:p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                    title="GitHub"
                                >
                                    <Github size={22} className="sm:w-[18px] sm:h-[18px]" />
                                </motion.a>
                            )}
                            {about?.socials?.linkedin && (
                                <motion.a
                                    href={about.socials.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 sm:p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                    title="LinkedIn"
                                >
                                    <Linkedin size={22} className="sm:w-[18px] sm:h-[18px]" />
                                </motion.a>
                            )}
                            {about?.socials?.email && (
                                <motion.a
                                    href={`mailto:${about.socials.email}`}
                                    className="p-3 sm:p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                    title="Email"
                                >
                                    <Mail size={22} className="sm:w-[18px] sm:h-[18px]" />
                                </motion.a>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4"
                >
                    <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
                        <span>&copy; {currentYear} Aman Kumar. Open to collaboration 🤝</span>
                    </div>

                    <div className="flex items-center gap-4 text-xs sm:text-xs text-muted-foreground">
                        <span>Powered by Next.js, Nest.js & TypeScript</span>
                    </div>
                </motion.div>
            </div>

            {/* Scroll to Top Button */}
            <motion.button
                onClick={scrollToTop}
                className={`fixed bottom-16 right-[18px] sm:bottom-24 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                    }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0 }}
                animate={{
                    opacity: showScrollTop ? 1 : 0,
                    y: showScrollTop ? 0 : 40
                }}
                transition={{ duration: 0.3 }}
            >
                <ArrowUp size={18} className="sm:w-6 sm:h-6" />
            </motion.button>
        </footer>
    )
}