'use client'

import { useEffect, useState } from 'react'
import Preloader from '@/components/v2/Preloader'
import Cursor from '@/components/v2/Cursor'
import Navbar from '@/components/v2/Navbar'
import Hero from '@/components/v2/Hero'
import Marquee from '@/components/v2/Marquee'
import About from '@/components/v2/About'
import Experience from '@/components/v2/Experience'
import Skills from '@/components/v2/Skills'
import Projects from '@/components/v2/Projects'
import Services from '@/components/v2/Services'
import Contact from '@/components/v2/Contact'
import Footer from '@/components/v2/Footer'
import AiAssistant from '@/components/AiAssistant'
import { usePortfolioData } from '@/components/v2/data'

const TICKER = [
    'React.js', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB',
    'Nest.js', 'PostgreSQL', 'AWS', 'Stripe', 'Docker', 'AI / LLMs', 'Redux',
]

export default function HomePage() {
    const data = usePortfolioData()
    const [ready, setReady] = useState(false)

    useEffect(() => {
        if (!data.loading) {
            const t = setTimeout(() => setReady(true), 1000)
            return () => clearTimeout(t)
        }
    }, [data.loading])

    useEffect(() => {
        document.body.style.overflow = ready ? '' : 'hidden'
        return () => { document.body.style.overflow = '' }
    }, [ready ])

    return (
        <div className="bg-nova-ink text-nova-bone min-h-screen antialiased selection:bg-nova-lime selection:text-nova-ink">
            <Preloader done={ready} />
            <Cursor />
            <Navbar name={data.about.name} />

            <main>
                <Hero about={data.about} />
                <Marquee items={TICKER} />
                <About about={data.about} stats={data.stats} />
                <Experience items={data.experience} />
                <Skills categories={data.skills} />
                <Projects projects={data.projects} />
                <Marquee items={['Available for freelance', 'Open to full-time roles', 'Remote worldwide']} dark />
                <Services services={data.services} />
                <Contact about={data.about} />
            </main>

            <Footer name={data.about.name} />
            {ready && <AiAssistant />}
        </div>
    )
}
