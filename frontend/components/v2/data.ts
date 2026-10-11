'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/api'

export interface AboutData {
    name: string
    title: string
    bio: string
    location: string
    email: string
    phone?: string
    resumeLink?: string
    socials?: { github?: string; linkedin?: string; twitter?: string; email?: string }
}

export interface ExperienceItem {
    _id?: string
    title: string
    company: string
    location: string
    startDate: string
    endDate: string
    current?: boolean
    description: string
    achievements: string[]
    technologies: string[]
}

export interface ProjectItem {
    _id?: string
    title: string
    description: string
    technologies: string[]
    image?: string
    liveUrl?: string
    liveLinks?: string[]
    githubUrl?: string
}

export interface SkillItem { name: string; level: number }
export interface SkillCategory { category: string; items: SkillItem[] }

export interface ServiceItem {
    _id?: string
    title: string
    description: string
    features: string[]
}

export interface StatsData {
    yearsExperience: string
    projectsCompleted: string
    happyClients: string
    codeCommits: string
}

/* ---------------- Fallbacks (mirror of live site content) ---------------- */

const FALLBACK_ABOUT: AboutData = {
    name: 'Aman Kumar',
    title: 'Senior Full-Stack Developer',
    bio: 'Passionate full-stack developer crafting scalable, AI-enhanced applications with cutting-edge web technologies. I transform complex problems into intelligent digital experiences that drive business growth — from high-converting websites to full-scale platforms.',
    location: 'India (Haryana)',
    email: 'aman.kumar2k15@gmail.com',
    socials: {
        github: 'https://github.com/amankumar2k24',
        email: 'aman.kumar2k15@gmail.com',
    },
}

const FALLBACK_STATS: StatsData = {
    yearsExperience: '3.5+',
    projectsCompleted: '20+',
    happyClients: '10+',
    codeCommits: '2000+',
}

const FALLBACK_EXPERIENCE: ExperienceItem[] = [
    {
        title: 'Senior MERN Stack Developer',
        company: 'Webito Infotech Pvt Ltd',
        location: 'Surat, Gujarat, India (Remote)',
        startDate: 'Dec 2024',
        endDate: 'Present',
        current: true,
        description: 'Leading full-stack development using the MERN stack with TypeScript — delivering scalable web applications with advanced features and integrations.',
        achievements: [
            'Leading the backend development team — overseeing architecture design, code quality, and high-performance API implementation.',
            'Developed optimized Node.js APIs with TypeScript, AWS S3, cron jobs, and OpenAI services for high performance.',
            'Built a secure role-based access control (RBAC) system with dynamic permissions and authentication mechanisms.',
        ],
        technologies: ['TypeScript', 'Node.js', 'Express.js', 'React.js', 'MongoDB', 'AWS S3', 'OpenAI', 'Stripe', 'Razorpay'],
    },
    {
        title: 'Full Stack Developer',
        company: 'Vigorus HealthTech Pvt Ltd',
        location: 'Jaipur, Rajasthan, India (On-site)',
        startDate: 'Jun 2024',
        endDate: 'Nov 2024',
        description: 'Developed and maintained scalable healthcare web applications with Next.js frontend and Node.js backend, focusing on performance and user experience.',
        achievements: [
            'Handled frontend in Next.js and backend in Node.js across healthcare products.',
            'Built and integrated RESTful APIs, ensuring seamless communication between frontend and backend.',
        ],
        technologies: ['Next.js', 'Node.js', 'React.js', 'TypeScript', 'MongoDB', 'PostgreSQL', 'Tailwind CSS', 'AWS', 'Docker'],
    },
    {
        title: 'Full Stack Developer',
        company: 'Numero Web Services Pvt Ltd',
        location: 'New Delhi, India (On-site)',
        startDate: 'Apr 2023',
        endDate: 'Jun 2024',
        description: 'Led the frontend team while contributing as a Full Stack Developer — designing scalable solutions and ensuring high-quality code standards.',
        achievements: [
            'Led the frontend team while actively contributing as a Full Stack Developer.',
            'Designed and implemented scalable frontend solutions using Next.js and React.',
        ],
        technologies: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'Redux Toolkit', 'Tailwind CSS', 'RESTful APIs'],
    },
]

const FALLBACK_PROJECTS: ProjectItem[] = [
    {
        title: 'Kreato.ai',
        description: 'Full-stack AI-powered content creation platform with YouTube integration, competitor analysis and automated workflows.',
        technologies: ['Next.js', 'MERN', 'TypeScript', 'Socket.io', 'AWS', 'Stripe', 'Redis'],
        liveUrl: 'https://kreato.ai',
    },
    {
        title: 'Revueo.ai',
        description: 'AI-powered review generation platform helping businesses collect authentic feedback and boost their online reputation.',
        technologies: ['Next.js', 'MERN', 'Razorpay', 'OpenAI', 'AWS EC2'],
        liveUrl: 'https://revueo.ai',
    },
    {
        title: 'Vigorus.ai',
        description: 'AI-driven healthcare platform offering smart EMR, claims automation and intelligent prescription workflows.',
        technologies: ['MERN', 'Next.js', 'PostgreSQL', 'Microservices', 'Kafka', 'Redis'],
        liveUrl: 'https://www.vigorus.ai',
    },
    {
        title: 'Connect Wifi',
        description: 'WiFi subscription and management platform featuring user subscriptions, payment approvals and plan management.',
        technologies: ['Next.js', 'Nest.js', 'TypeScript', 'MongoDB', 'Framer Motion'],
        liveUrl: 'https://aman-connect.vercel.app',
    },
    {
        title: 'Bharat Escrow',
        description: 'Secure digital escrow platform empowering buyers and sellers with trusted payment holds and settlements.',
        technologies: ['MERN', 'Tailwind CSS', 'Razorpay', 'Cloudinary'],
        liveUrl: 'https://bharat-escrow.vercel.app',
    },
    {
        title: 'Tech Gali',
        description: 'Modern e-commerce platform for tech gear with user accounts, admin dashboard and full order management.',
        technologies: ['MERN', 'Next.js', 'AWS S3', 'Elasticsearch', 'Razorpay'],
        liveUrl: 'https://www.techgali.in',
    },
]

const FALLBACK_SKILLS: SkillCategory[] = [
    { category: 'Frontend', items: [{ name: 'React.js', level: 85 }, { name: 'Next.js', level: 80 }] },
    { category: 'Backend', items: [{ name: 'Node.js', level: 85 }, { name: 'Express.js', level: 85 }, { name: 'Nest.js', level: 70 }] },
    { category: 'Language', items: [{ name: 'TypeScript', level: 80 }] },
    { category: 'Database', items: [{ name: 'MongoDB', level: 85 }, { name: 'PostgreSQL', level: 75 }] },
    { category: 'Payments', items: [{ name: 'Stripe', level: 80 }] },
    { category: 'Cloud', items: [{ name: 'AWS', level: 70 }] },
]

const FALLBACK_SERVICES: ServiceItem[] = [
    { title: 'Full-Stack Web Development', description: 'End-to-end web application development using modern technologies like React, Next.js, Node.js, Nest.js and databases.', features: ['Responsive Design', 'API Development', 'Database Integration', 'Authentication & Security'] },
    { title: 'AI Integration & Automation', description: 'AI-powered features, chatbots, automation workflows and intelligent solutions using modern AI technologies.', features: ['AI Chatbot Development', 'OpenAI Integration', 'Workflow Automation', 'Intelligent Data Processing'] },
    { title: 'API Engineering & Integration', description: 'RESTful and GraphQL API development, third-party integrations and microservices architecture.', features: ['RESTful API Development', 'GraphQL Implementation', 'Third-Party Integrations', 'Payment Gateway Setup'] },
    { title: 'Cloud Solutions & DevOps', description: 'Scalable cloud infrastructure setup, deployment automation and continuous integration.', features: ['AWS Setup', 'Docker Containers', 'CI/CD Pipelines', 'Monitoring & Logging'] },
    { title: 'E-commerce Solutions', description: 'Complete e-commerce platforms with payment integration, inventory management and smooth checkout experiences.', features: ['Custom E-commerce Development', 'Payment Gateways', 'Cart & Checkout Systems', 'Order Management'] },
    { title: 'Performance Optimization', description: 'Website and application performance tuning, SEO optimization and speed enhancement.', features: ['Speed Optimization', 'SEO Implementation', 'Code Splitting', 'Caching Strategies'] },
]

/* ---------------- Normalizers (real backend shapes) ---------------- */

const asArray = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : [])

const normalizeProject = (p: any): ProjectItem => {
    const links = asArray<string>(p.liveLinks).filter((l) => l && l.trim())
    return {
        _id: p._id,
        title: p.title || 'Untitled Project',
        description: p.description || '',
        technologies: asArray<string>(p.techStack ?? p.technologies),
        image: (asArray<string>(p.imageUrls)[0] || p.image) as string | undefined,
        liveUrl: (links[0] || p.liveUrl) as string | undefined,
        liveLinks: links.length ? links : p.liveUrl ? [p.liveUrl] : undefined,
        githubUrl: p.githubUrl,
    }
}

const normalizeExperience = (e: any): ExperienceItem => {
    let startDate: string = e.startDate || ''
    let endDate: string = e.endDate || ''
    const duration: string = e.duration || ''
    if (duration.includes(' - ')) {
        const [s, en] = duration.split(' - ')
        startDate = startDate || (s || '').trim()
        endDate = endDate || (en || '').trim()
    } else if (duration) {
        startDate = startDate || duration
    }
    return {
        _id: e._id,
        title: e.title || '',
        company: e.company || '',
        location: e.location || '',
        startDate,
        endDate,
        current: e.current ?? /present/i.test(duration),
        description: e.description || '',
        achievements: asArray<string>(e.achievements),
        technologies: asArray<string>(e.technologies),
    }
}

const normalizeService = (s: any): ServiceItem => ({
    _id: s._id,
    title: s.title || '',
    description: s.description || '',
    features: asArray<string>(s.features),
})

const byOrder = (a: any, b: any) => (a.order ?? 0) - (b.order ?? 0)
const isActive = (x: any) => x.isActive !== false

export interface PortfolioData {
    about: AboutData
    stats: StatsData
    experience: ExperienceItem[]
    projects: ProjectItem[]
    skills: SkillCategory[]
    services: ServiceItem[]
    loading: boolean
}

export function usePortfolioData(): PortfolioData {
    const [about, setAbout] = useState<AboutData>(FALLBACK_ABOUT)
    const [stats, setStats] = useState<StatsData>(FALLBACK_STATS)
    const [experience, setExperience] = useState<ExperienceItem[]>(FALLBACK_EXPERIENCE)
    const [projects, setProjects] = useState<ProjectItem[]>(FALLBACK_PROJECTS)
    const [skills, setSkills] = useState<SkillCategory[]>(FALLBACK_SKILLS)
    const [services, setServices] = useState<ServiceItem[]>(FALLBACK_SERVICES)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let alive = true
        const run = async () => {
            const [aboutR, statsR, expR, projR, skillsR, servR] = await Promise.allSettled([
                api.get('/about'),
                api.get('/stats'),
                api.get('/experience'),
                api.get('/projects'),
                api.get('/skills'),
                api.get('/services'),
            ])
            if (!alive) return
            if (aboutR.status === 'fulfilled' && aboutR.value?.data?.name) {
                const d = aboutR.value.data
                setAbout({
                    name: d.name || FALLBACK_ABOUT.name,
                    title: d.title || FALLBACK_ABOUT.title,
                    bio: d.bio || FALLBACK_ABOUT.bio,
                    location: d.location || FALLBACK_ABOUT.location,
                    email: d.socials?.email || d.email || FALLBACK_ABOUT.email,
                    phone: d.phone,
                    resumeLink: d.resumeLink,
                    socials: { ...FALLBACK_ABOUT.socials, ...(d.socials || {}) },
                })
            }
            if (statsR.status === 'fulfilled' && statsR.value?.data) {
                const d = statsR.value.data
                if (Array.isArray(d)) {
                    // Real shape: [{ key: 'years_experience', value: '2.11+', ... }]
                    const get = (key: string) =>
                        d.find((s: any) => s.key === key && s.isActive !== false)?.value
                    setStats({
                        yearsExperience: String(get('years_experience') ?? FALLBACK_STATS.yearsExperience),
                        projectsCompleted: String(get('projects_completed') ?? FALLBACK_STATS.projectsCompleted),
                        happyClients: String(get('happy_clients') ?? FALLBACK_STATS.happyClients),
                        codeCommits: String(get('code_commits') ?? get('commits') ?? FALLBACK_STATS.codeCommits),
                    })
                } else {
                    setStats({
                        yearsExperience: String(d.yearsExperience ?? d.years ?? FALLBACK_STATS.yearsExperience),
                        projectsCompleted: String(d.projectsCompleted ?? d.projects ?? FALLBACK_STATS.projectsCompleted),
                        happyClients: String(d.happyClients ?? d.clients ?? FALLBACK_STATS.happyClients),
                        codeCommits: String(d.codeCommits ?? d.commits ?? FALLBACK_STATS.codeCommits),
                    })
                }
            }
            if (expR.status === 'fulfilled' && Array.isArray(expR.value?.data) && expR.value.data.length) {
                setExperience(
                    expR.value.data.filter(isActive).sort(byOrder).map(normalizeExperience)
                )
            }
            if (projR.status === 'fulfilled' && Array.isArray(projR.value?.data) && projR.value.data.length) {
                setProjects(
                    projR.value.data.filter(isActive).sort(byOrder).map(normalizeProject)
                )
            }
            if (skillsR.status === 'fulfilled' && Array.isArray(skillsR.value?.data) && skillsR.value.data.length) {
                setSkills(skillsR.value.data.filter(isActive).sort(byOrder))
            }
            if (servR.status === 'fulfilled' && Array.isArray(servR.value?.data) && servR.value.data.length) {
                setServices(
                    servR.value.data.filter(isActive).sort(byOrder).map(normalizeService)
                )
            }
            setLoading(false)
        }
        run()
        return () => { alive = false }
    }, [])

    return { about, stats, experience, projects, skills, services, loading }
}
