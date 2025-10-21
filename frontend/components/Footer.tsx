'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart, ArrowUp, Code, Coffee } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Footer() {
    const [showScrollTop, setShowScrollTop] = useState(false)

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
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <Code size={16} className="text-primary-foreground" />
                            </div>
                            <span className="text-xl font-bold">Aman Kumar</span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                            Crafting digital experiences with passion, precision, and cutting-edge technology.
                            Let's build something amazing together.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Coffee size={16} />
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
                        <h3 className="text-lg font-semibold">Quick Links</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { name: 'About', href: '#about' },
                                { name: 'Skills', href: '#skills' },
                                { name: 'Projects', href: '#projects' },
                                { name: 'Contact', href: '#contact' },
                            ].map((link) => (
                                <motion.button
                                    key={link.name}
                                    onClick={() => {
                                        const element = document.getElementById(link.href.substring(1))
                                        element?.scrollIntoView({ behavior: 'smooth' })
                                    }}
                                    className="text-left text-muted-foreground hover:text-primary transition-colors text-sm"
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
                        <h3 className="text-lg font-semibold">Let's Connect</h3>
                        <p className="text-muted-foreground text-sm">
                            Ready to start your next project? I'm always excited to work on new challenges.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: Github, href: 'https://github.com', label: 'GitHub' },
                                { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                                { icon: Mail, href: 'mailto:aman.kumar2k15@gmail.com', label: 'Email' },
                            ].map(({ icon: Icon, href, label }) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                    title={label}
                                >
                                    <Icon size={18} />
                                </motion.a>
                            ))}
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
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>&copy; {currentYear} Aman Kumar. Made with</span>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            <Heart size={16} className="text-red-500 fill-current" />
                        </motion.div>
                        <span>and lots of ☕</span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Built with Next.js, TypeScript & Tailwind CSS</span>
                    </div>
                </motion.div>
            </div>

            {/* Scroll to Top Button */}
            <motion.button
                onClick={scrollToTop}
                className={`fixed bottom-6 right-6 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
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
                <ArrowUp size={20} />
            </motion.button>
        </footer>
    )
}