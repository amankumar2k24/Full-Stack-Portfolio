'use client'

import { Suspense, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import SimpleSkillsSection from '@/components/SimpleSkillsSection'
import ExperienceSection from '@/components/ExperienceSection'
import ProjectsSection from '@/components/ProjectsSection'
import ContactForm from '@/components/ContactForm'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import PortfolioLoader from '@/components/PortfolioLoader'
import AiAssistant from '@/components/AiAssistant'

export default function HomePage() {
    const [isLoading, setIsLoading] = useState(true)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)

        // Always show loader on every page load/refresh
        setIsLoading(true)

        // Minimum loading time
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 3000)

        return () => clearTimeout(timer)
    }, [])

    // Don't show anything until mounted to prevent hydration issues
    if (!isMounted) {
        return null
    }

    return (
        <>
            <PortfolioLoader
                isLoading={isLoading}
                onComplete={() => setIsLoading(false)}
            />

            <div className={`min-h-screen bg-background pt-[18px] sm:pt-20 overflow-x-hidden w-full max-w-full transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                <Navigation />

                {/* Hero Section */}
                <section id="home" className="w-full">
                    <Suspense fallback={<div className="animate-pulse min-h-screen flex items-center justify-center">Loading...</div>}>
                        <HeroSection />
                    </Suspense>
                </section>

                {/* About Section */}
                <section id="about" className="py-12 sm:py-20 px-3 sm:px-6">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-8 sm:mb-16"
                        >
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                                About Me
                            </h2>
                            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                                Passionate developer with a mission to create exceptional digital experiences
                            </p>
                        </motion.div>
                        <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
                            <AboutSection />
                        </Suspense>
                    </div>
                </section>

                {/* Services Section */}
                <ServicesSection />

                {/* Experience Section */}
                <ExperienceSection />

                {/* Skills Section */}
                <SimpleSkillsSection />

                {/* Projects Section */}
                <section id="projects" className="py-12 sm:py-20 px-3 sm:px-6">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-8 sm:mb-16"
                        >
                            <h2 className="pb-1 text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                                Featured Projects
                            </h2>
                            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
                                Showcasing innovative solutions and cutting-edge development work
                            </p>
                        </motion.div>
                        <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
                            <ProjectsSection />
                        </Suspense>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="py-12 sm:py-20 px-3 sm:px-6 bg-gradient-to-br from-muted/20 via-background to-muted/20">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-8 sm:mb-16"
                        >
                            <h2 className="pb-1 text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                                Let's Work Together
                            </h2>
                            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
                                Ready to bring your ideas to life? Let's discuss your project and create something amazing together
                            </p>
                        </motion.div>
                        <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
                            <ContactForm />
                        </Suspense>
                    </div>
                </section>

                {/* Footer */}
                <Footer />

                {/* AI Assistant - Only show after loading is complete */}
                {!isLoading && <AiAssistant />}
            </div>
        </>
    )
}