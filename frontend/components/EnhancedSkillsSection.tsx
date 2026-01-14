'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import api from '@/lib/api'
import {
    // Simple Icons (Si prefix)
    SiReact, SiNextdotjs, SiVuedotjs, SiAngular, SiSvelte, SiTypescript, SiJavascript,
    SiTailwindcss, SiBootstrap, SiMui, SiChakraui, SiStyledcomponents, SiSass, SiCss3, SiHtml5,
    SiFramer, SiGreensock, SiRedux, SiMobx, SiReactquery, SiApollographql,
    SiNodedotjs, SiExpress, SiNestjs, SiFastify, SiPython, SiDjango, SiFastapi, SiFlask,
    SiPhp, SiLaravel, SiSpring, SiSharp, SiDotnet, SiGo, SiRust,
    SiMongodb, SiPostgresql, SiMysql, SiSqlite, SiRedis, SiFirebase, SiSupabase, SiPlanetscale, SiPrisma,
    SiAmazon, SiGooglecloud, SiVercel, SiNetlify, SiHeroku, SiDocker, SiKubernetes, SiJenkins,
    SiGithubactions, SiGitlab, SiGit, SiGithub, SiFigma, SiAdobexd, SiSketch, SiWebpack, SiVite,
    SiEslint, SiPrettier, SiJest, SiCypress, SiStorybook,
    SiFlutter, SiExpo, SiIonic, SiGraphql, SiSocketdotio, SiPostman, SiInsomnia,
    SiStrapi, SiContentful, SiSanity, SiGhost, SiStripe, SiPaypal, SiRazorpay,
    SiGoogleanalytics, SiMixpanel, SiSentry, SiAuth0, SiPassport,
    SiEthereum, SiSolidity, SiWeb3Dotjs, SiElasticsearch, SiOpenai,
    SiWordpress
} from 'react-icons/si'
import {
    // Font Awesome Icons (Fa prefix)
    FaTools, FaBell, FaEnvelope, FaSms, FaCreditCard, FaLock, FaChartLine, FaRobot, FaBuilding, FaJava, FaMobile, FaTasks
} from 'react-icons/fa'


interface Skill {
    name: string
    level: number
    category: string
    color: string
    icon: React.ComponentType<any>
}

interface BackendSkillItem {
    name: string
    level: number
}

interface BackendSkill {
    _id: string
    category: string
    items: BackendSkillItem[]
}

// Default skill configurations with React Icons and brand colors
const skillDefaults: Record<string, { color: string; icon: React.ComponentType<any> }> = {
    // Frontend Technologies
    'React.js': { color: '#61DAFB', icon: SiReact },
    'React': { color: '#61DAFB', icon: SiReact },
    'Next.js': { color: '#4FC08D', icon: SiNextdotjs },
    'Vue.js': { color: '#4FC08D', icon: SiVuedotjs },
    'Angular': { color: '#DD0031', icon: SiAngular },
    'Svelte': { color: '#FF3E00', icon: SiSvelte },
    'TypeScript': { color: '#3178C6', icon: SiTypescript },
    'JavaScript': { color: '#F7DF1E', icon: SiJavascript },

    // CSS Frameworks & Preprocessors
    'Tailwind CSS': { color: '#06B6D4', icon: SiTailwindcss },
    'Bootstrap': { color: '#7952B3', icon: SiBootstrap },
    'Bootstrap 5': { color: '#7952B3', icon: SiBootstrap },
    'Material-UI': { color: '#0081CB', icon: SiMui },
    'MUI': { color: '#0081CB', icon: SiMui },
    'Chakra UI': { color: '#319795', icon: SiChakraui },
    'Styled Components': { color: '#DB7093', icon: SiStyledcomponents },
    'Emotion': { color: '#D36AC2', icon: FaTools },
    'Sass': { color: '#CC6699', icon: SiSass },
    'SCSS': { color: '#CC6699', icon: SiSass },
    'Less': { color: '#1E40AF', icon: FaTools },
    'CSS3': { color: '#1572B6', icon: SiCss3 },
    'HTML5': { color: '#E34F26', icon: SiHtml5 },

    // Animation & Motion
    'Framer Motion': { color: '#0055FF', icon: SiFramer },
    'GSAP': { color: '#88CE02', icon: SiGreensock },
    'Lottie': { color: '#00D4AA', icon: FaTools },

    // State Management
    'Redux': { color: '#764ABC', icon: SiRedux },
    'Redux Toolkit': { color: '#764ABC', icon: SiRedux },
    'Zustand': { color: '#8B5CF6', icon: FaTools },
    'MobX': { color: '#FF9955', icon: SiMobx },
    'Recoil': { color: '#3578E5', icon: SiReact },

    // Query Libraries
    'React Query': { color: '#FF4154', icon: SiReactquery },
    'SWR': { color: '#059669', icon: FaTools },
    'Apollo Client': { color: '#311C87', icon: SiApollographql },
    'RTK Query': { color: '#764ABC', icon: SiRedux },

    // Backend Technologies
    'Node.js': { color: '#339933', icon: SiNodedotjs },
    'Express.js': { color: '#68D391', icon: SiExpress },
    'Nest.js': { color: '#E0234E', icon: SiNestjs },
    'Fastify': { color: '#F59E0B', icon: SiFastify },
    'Koa.js': { color: '#10B981', icon: FaTools },
    'Python': { color: '#3776AB', icon: SiPython },
    'Django': { color: '#0F766E', icon: SiDjango },
    'FastAPI': { color: '#009688', icon: SiFastapi },
    'Flask': { color: '#DC2626', icon: SiFlask },
    'PHP': { color: '#777BB4', icon: SiPhp },
    'Laravel': { color: '#FF2D20', icon: SiLaravel },
    'Java': { color: '#ED8B00', icon: FaJava },
    'Spring Boot': { color: '#6DB33F', icon: SiSpring },
    'C#': { color: '#239120', icon: SiSharp },
    '.NET': { color: '#512BD4', icon: SiDotnet },
    'Go': { color: '#00ADD8', icon: SiGo },
    'Rust': { color: '#CE422B', icon: SiRust },

    // Databases
    'MongoDB': { color: '#47A248', icon: SiMongodb },
    'PostgreSQL': { color: '#336791', icon: SiPostgresql },
    'MySQL': { color: '#4479A1', icon: SiMysql },
    'SQLite': { color: '#0EA5E9', icon: SiSqlite },
    'Redis': { color: '#DC382D', icon: SiRedis },
    'Firebase': { color: '#FFCA28', icon: SiFirebase },
    'Supabase': { color: '#3ECF8E', icon: SiSupabase },
    'PlanetScale': { color: '#7C3AED', icon: SiPlanetscale },
    'Prisma': { color: '#2563EB', icon: SiPrisma },
    'Mongoose': { color: '#880000', icon: SiMongodb },
    'Sequelize': { color: '#52B0E7', icon: FaTools },

    // Cloud & DevOps
    'AWS': { color: '#FF9900', icon: SiAmazon },
    'Google Cloud': { color: '#4285F4', icon: SiGooglecloud },
    'Azure': { color: '#0078D4', icon: FaTools },
    'Vercel': { color: '#6366F1', icon: SiVercel },
    'Netlify': { color: '#00C7B7', icon: SiNetlify },
    'Heroku': { color: '#430098', icon: SiHeroku },
    'Docker': { color: '#2496ED', icon: SiDocker },
    'Kubernetes': { color: '#326CE5', icon: SiKubernetes },
    'Jenkins': { color: '#D33833', icon: SiJenkins },
    'GitHub Actions': { color: '#2088FF', icon: SiGithubactions },
    'GitLab CI': { color: '#FC6D26', icon: SiGitlab },

    // Tools & Development
    'Git': { color: '#F05032', icon: SiGit },
    'GitHub': { color: '#6366F1', icon: SiGithub },
    'GitLab': { color: '#FC6D26', icon: SiGitlab },
    'Figma': { color: '#F24E1E', icon: SiFigma },
    'Adobe XD': { color: '#FF61F6', icon: SiAdobexd },
    'Sketch': { color: '#F7B500', icon: SiSketch },
    'Webpack': { color: '#8DD6F9', icon: SiWebpack },
    'Vite': { color: '#646CFF', icon: SiVite },
    'Rollup': { color: '#EC4A3F', icon: FaTools },
    'Parcel': { color: '#E7A93F', icon: FaTools },
    'ESLint': { color: '#4B32C3', icon: SiEslint },
    'Prettier': { color: '#F7B93E', icon: SiPrettier },
    'Jest': { color: '#C21325', icon: SiJest },
    'Cypress': { color: '#17202C', icon: SiCypress },
    'Playwright': { color: '#2EAD33', icon: FaTools },
    'Storybook': { color: '#FF4785', icon: SiStorybook },

    // Mobile Development
    'React Native': { color: '#61DAFB', icon: FaMobile },
    'Flutter': { color: '#02569B', icon: SiFlutter },
    'Expo': { color: '#4630EB', icon: SiExpo },
    'Ionic': { color: '#3880FF', icon: SiIonic },

    // API & Communication
    'GraphQL': { color: '#E10098', icon: SiGraphql },
    'REST API': { color: '#FF6B35', icon: FaTools },
    'WebSocket': { color: '#4A90E2', icon: FaTools },
    'gRPC': { color: '#4FC3F7', icon: FaTools },
    'Socket.io': { color: '#25C2A0', icon: SiSocketdotio },
    'Postman': { color: '#FF6C37', icon: SiPostman },
    'Insomnia': { color: '#4000BF', icon: SiInsomnia },

    // CMS & Headless
    'Strapi': { color: '#2F2E8B', icon: SiStrapi },
    'Contentful': { color: '#2478CC', icon: SiContentful },
    'Sanity': { color: '#F03E2F', icon: SiSanity },
    'Ghost': { color: '#738A94', icon: SiGhost },

    // Payment & Integrations
    'Stripe': { color: '#635BFF', icon: SiStripe },
    'PayPal': { color: '#00457C', icon: SiPaypal },
    'Razorpay': { color: '#3395FF', icon: SiRazorpay },

    // Analytics & Monitoring
    'Google Analytics': { color: '#E37400', icon: SiGoogleanalytics },
    'Mixpanel': { color: '#7856FF', icon: SiMixpanel },
    'Sentry': { color: '#362D59', icon: SiSentry },
    'LogRocket': { color: '#764ABC', icon: FaTools },

    // Authentication
    'Auth0': { color: '#EB5424', icon: SiAuth0 },
    'Firebase Auth': { color: '#FFCA28', icon: SiFirebase },
    'NextAuth.js': { color: '#0070F3', icon: FaLock },
    'Passport.js': { color: '#34E27A', icon: SiPassport },

    // Blockchain & Web3
    'Ethereum': { color: '#627EEA', icon: SiEthereum },
    'Solidity': { color: '#363636', icon: SiSolidity },
    'Web3.js': { color: '#F16822', icon: SiWeb3Dotjs },
    'MetaMask': { color: '#F6851B', icon: FaTools },

    // Additional skills that might be in your backend
    'Microservices Architecture': { color: '#6366F1', icon: FaBuilding },
    'Elastic Search': { color: '#005571', icon: SiElasticsearch },
    'OpenAI API': { color: '#412991', icon: SiOpenai },
    'Gemini API': { color: '#4285F4', icon: FaRobot },
    'Elasticsearch': { color: '#005571', icon: SiElasticsearch },
    'OpenAI': { color: '#412991', icon: SiOpenai },
    'Gemini': { color: '#4285F4', icon: FaRobot },
    'BullMQ': { color: '#E0234E', icon: FaTasks },
    'Bull MQ': { color: '#E0234E', icon: FaTasks },

    // Additional Tools & Others
    'Performance Tuning': { color: '#6366F1', icon: FaChartLine },
    'Real-time Notifications': { color: '#6366F1', icon: FaBell },
    'WordPress': { color: '#21759B', icon: SiWordpress },
    'SEO Optimization': { color: '#4285F4', icon: FaChartLine },
    'Email APIs': { color: '#EA4335', icon: FaEnvelope },
    'SMS APIs': { color: '#0066CC', icon: FaSms },
    'ICICI Payment Gateway': { color: '#F37021', icon: FaCreditCard },
    'Webhooks': { color: '#6366F1', icon: FaTools },
    'OTP': { color: '#FF6B35', icon: FaLock },
}

// Array of vibrant colors for skills that don't have specific colors defined
const defaultColors = [
    '#6366F1', // Indigo
    '#8B5CF6', // Violet
    '#EC4899', // Pink
    '#EF4444', // Red
    '#F59E0B', // Amber
    '#10B981', // Emerald
    '#06B6D4', // Cyan
    '#3B82F6', // Blue
    '#8B5A2B', // Brown
    '#059669', // Green
    '#DC2626', // Red
    '#7C3AED', // Purple
    '#0EA5E9', // Sky
    '#F97316', // Orange
    '#84CC16', // Lime
    '#14B8A6', // Teal
    '#6366F1', // Indigo
    '#F472B6', // Pink
    '#A855F7', // Purple
    '#22C55E'  // Green
]

// Function to get a random color from the default colors array
const getRandomColor = (skillName: string): string => {
    let hash = 0
    for (let i = 0; i < skillName.length; i++) {
        const char = skillName.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash
    }
    const index = Math.abs(hash) % defaultColors.length
    return defaultColors[index]
}

// Function to transform backend data to frontend format
const transformSkillsData = (backendSkills: BackendSkill[]): Skill[] => {
    const transformedSkills: Skill[] = []

    backendSkills.forEach(skillCategory => {
        skillCategory.items.forEach(skillItem => {
            const defaults = skillDefaults[skillItem.name] || {
                color: getRandomColor(skillItem.name), // Random color based on skill name
                icon: FaTools // Default icon
            }

            transformedSkills.push({
                name: skillItem.name,
                level: skillItem.level, // Use dynamic level from backend
                category: skillCategory.category,
                color: defaults.color,
                icon: defaults.icon
            })
        })
    })

    return transformedSkills
}

// Function to sort skills with proper order for "All" section
const sortSkillsForAll = (skills: Skill[]): Skill[] => {
    // For "All" category, maintain the order from backend (which is sorted by createdAt)
    // This preserves the chronological order you set in the backend
    return skills
}



function SkillCard({ skill, index, isVisible }: { skill: Skill, index: number, isVisible: boolean }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const [isHovered, setIsHovered] = useState(false)

    if (!isVisible) return null

    const circumference = 2 * Math.PI * 50
    const strokeDashoffset = circumference - (skill.level / 100) * circumference

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60, scale: 0.85 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
                duration: 0.6,
                delay: index * 0.03,
                type: "spring",
                stiffness: 100
            }}
            className="group relative w-full max-w-[320px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Main Card */}
            <motion.div
                className="relative p-8 transition-all duration-500"
                animate={{
                    y: isHovered ? -10 : 0,
                    scale: isHovered ? 1.02 : 1
                }}
                transition={{ duration: 0.2 }}
            >
                <div className="relative z-10 flex flex-col items-center space-y-6">

                    {/* Top Pill Label */}
                    <div className="mb-2">
                        <div
                            className="inline-flex items-center justify-center px-5 py-2 rounded-full text-base font-semibold border transition-colors duration-300 bg-white/50 dark:bg-transparent whitespace-nowrap"
                            style={{
                                color: 'var(--foreground)',
                                borderColor: `${skill.color}50`
                            }}
                        >
                            <span className="text-gray-800 dark:text-slate-200">{skill.name}</span>
                        </div>
                    </div>

                    {/* Circular Progress with Icon in Center */}
                    <div className="relative w-36 h-36">
                        <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
                            {/* Background circle */}
                            <circle
                                cx="50"
                                cy="50"
                                r="40"
                                stroke={skill.color}
                                strokeWidth="6"
                                strokeOpacity="0.2"
                                fill="none"
                            />
                            {/* Progress circle */}
                            <motion.circle
                                cx="50"
                                cy="50"
                                r="40"
                                stroke={skill.color}
                                strokeWidth="6"
                                fill="none"
                                strokeLinecap="round"
                                initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
                                animate={isInView ? { strokeDashoffset: strokeDashoffset } : {}}
                                transition={{ duration: 2, delay: index * 0.03 + 0.3, ease: "easeOut" }}
                            />
                        </svg>

                        {/* Icon in center */}
                        <div
                            className="absolute inset-0 flex items-center justify-center"
                            style={{ perspective: '1000px' }}
                        >
                            <motion.div
                                animate={{
                                    scale: isHovered ? 1.1 : 1,
                                    rotateY: isHovered ? 360 : 0
                                }}
                                transition={{ duration: 0.6 }}
                            >
                                <skill.icon size={48} style={{ color: skill.color }} />
                            </motion.div>
                        </div>

                        {/* Percentage badge - Solid background, no glassmorphism */}
                        <motion.div
                            className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full border shadow-sm bg-white dark:bg-[#1e2139]"
                            style={{
                                borderColor: `${skill.color}50`
                            }}
                            initial={{ scale: 0 }}
                            animate={isInView ? { scale: 1 } : {}}
                            transition={{ duration: 0.3, delay: index * 0.03 + 0.8 }}
                        >
                            <span
                                className="text-lg font-bold"
                                style={{ color: skill.color }}
                            >
                                {typeof skill.level === 'number' && !isNaN(skill.level) ? skill.level : 0}%
                            </span>
                        </motion.div>
                    </div>

                    {/* Bottom Text Removed */}
                </div>
            </motion.div>
        </motion.div>
    )
}

export default function EnhancedSkillsSection() {
    const [activeCategory, setActiveCategory] = useState('All')
    const [skillsData, setSkillsData] = useState<Skill[]>([])
    const [filteredSkills, setFilteredSkills] = useState<Skill[]>([])
    const [displayedSkills, setDisplayedSkills] = useState<Skill[]>([])
    const [categories, setCategories] = useState([{ name: 'All', color: '#6366f1' }])
    const [loading, setLoading] = useState(true)
    const [skillsToShow, setSkillsToShow] = useState(12)
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: true })

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await api.get('/skills')
                const backendSkills: BackendSkill[] = response.data
                const transformedSkills = transformSkillsData(backendSkills)

                console.log('Backend skills:', backendSkills)
                console.log('Transformed skills:', transformedSkills)

                setSkillsData(transformedSkills)

                // Generate categories from the data
                const uniqueCategories = Array.from(new Set(transformedSkills.map(skill => skill.category)))
                const categoryColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']

                const generatedCategories = [
                    { name: 'All', color: '#6366f1' },
                    ...uniqueCategories.map((category, index) => ({
                        name: category,
                        color: categoryColors[index % categoryColors.length]
                    }))
                ]

                setCategories(generatedCategories)
            } catch (error) {
                console.error('Failed to fetch skills:', error)
                setSkillsData([])
            } finally {
                setLoading(false)
            }
        }

        fetchSkills()
    }, [])

    // Filter and sort skills based on active category
    useEffect(() => {
        let filtered: Skill[] = []

        if (activeCategory === 'All') {
            filtered = sortSkillsForAll(skillsData)
        } else {
            filtered = skillsData
                .filter(skill => skill.category === activeCategory)
                .sort((a, b) => b.level - a.level)
        }

        setFilteredSkills(filtered)
        setSkillsToShow(12) // Reset to show first 12 when category changes
    }, [activeCategory, skillsData])

    // Update displayed skills based on skillsToShow
    useEffect(() => {
        setDisplayedSkills(filteredSkills.slice(0, skillsToShow))
    }, [filteredSkills, skillsToShow])

    // Function to show more skills
    const showMoreSkills = () => {
        setSkillsToShow(prev => prev + 12)
    }

    if (loading) {
        return (
            <div ref={containerRef} className="relative">
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-12 w-24 bg-muted rounded-full animate-pulse"></div>
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="bg-card rounded-2xl p-6 border animate-pulse">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-muted rounded-xl"></div>
                                <div className="flex-1">
                                    <div className="h-5 bg-muted rounded w-20 mb-2"></div>
                                    <div className="h-4 bg-muted rounded w-16"></div>
                                </div>
                                <div className="h-8 w-12 bg-muted rounded"></div>
                            </div>
                            <div className="h-2 bg-muted rounded-full"></div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (skillsData.length === 0) {
        return (
            <div ref={containerRef} className="relative text-center py-12">
                <p className="text-muted-foreground mb-4">No skills found.</p>
                <p className="text-sm text-muted-foreground">Add some skills in the admin panel to see them here!</p>
            </div>
        )
    }

    // Debug: Show filtered skills count
    if (filteredSkills.length === 0 && skillsData.length > 0) {
        return (
            <div ref={containerRef} className="relative">
                {/* Category Filter Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="flex flex-wrap justify-center gap-3 mb-8"
                >
                    {categories.map((category, index) => (
                        <motion.button
                            key={category.name}
                            onClick={() => setActiveCategory(category.name)}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeCategory === category.name
                                ? 'text-white shadow-lg transform scale-105'
                                : 'bg-card text-muted-foreground hover:bg-accent border border-border'
                                }`}
                            style={{
                                backgroundColor: activeCategory === category.name ? category.color : undefined,
                            }}
                            whileHover={{ scale: activeCategory === category.name ? 1.05 : 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            {category.name}
                            <span className="ml-2 text-sm opacity-75">
                                ({category.name === 'All' ? skillsData.length : skillsData.filter(s => s.category === category.name).length})
                            </span>
                        </motion.button>
                    ))}
                </motion.div>

                <div className="text-center py-12">
                    <p className="text-muted-foreground">No skills found for "{activeCategory}" category.</p>
                </div>
            </div>
        )
    }

    return (
        <div id="skills" ref={containerRef} className="relative py-8 bg-gradient-to-br from-muted/20 via-background to-muted/20">
            {/* Subtle grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* Radial gradient accents */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/3 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
                {/* Category Filter Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="flex flex-wrap justify-center gap-3 mb-12 px-4"
                >
                    {categories.map((category, index) => {
                        const count = category.name === 'All' ? skillsData.length : skillsData.filter(s => s.category === category.name).length

                        return (
                            <motion.button
                                key={category.name}
                                onClick={() => setActiveCategory(category.name)}
                                className={`relative px-6 py-3 rounded-full font-semibold transition-all duration-300 overflow-hidden ${activeCategory === category.name
                                    ? 'text-white shadow-lg scale-105'
                                    : 'bg-[#1a1f35] text-gray-400 hover:text-white border border-gray-800/50 hover:border-gray-700'
                                    }`}
                                style={{
                                    backgroundColor: activeCategory === category.name ? category.color : undefined,
                                }}
                                whileHover={{ scale: activeCategory === category.name ? 1.05 : 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.05 }}
                            >
                                {/* Active button glow */}
                                {activeCategory === category.name && (
                                    <motion.div
                                        className="absolute inset-0 rounded-full blur-lg opacity-50"
                                        style={{ backgroundColor: category.color }}
                                        animate={{
                                            scale: [1, 1.2, 1],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />
                                )}

                                <span className="relative z-10 flex items-center gap-2">
                                    {category.name}
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${activeCategory === category.name
                                        ? 'bg-white/20'
                                        : 'bg-gray-800'
                                        }`}>
                                        {count}
                                    </span>
                                </span>
                            </motion.button>
                        )
                    })}
                </motion.div>

                {/* Skills Grid */}
                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 px-4 max-w-7xl mx-auto"
                    layout
                >
                    {displayedSkills.map((skill, index) => (
                        <SkillCard
                            key={skill.name}
                            skill={skill}
                            index={index}
                            isVisible={true}
                        />
                    ))}
                </motion.div>

                {/* Show More Button */}
                {filteredSkills.length > skillsToShow && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex justify-center mt-12"
                    >
                        <motion.button
                            onClick={showMoreSkills}
                            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {/* Animated shine */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                animate={{
                                    x: ['-100%', '100%']
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            />

                            <span className="relative z-10 flex items-center gap-2">
                                Show More Skills
                                <span className="px-2 py-0.5 bg-white/20 rounded-full text-sm">
                                    +{filteredSkills.length - skillsToShow}
                                </span>
                            </span>
                        </motion.button>
                    </motion.div>
                )}

                {/* Stats Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mt-24 hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 max-w-5xl mx-auto"
                >
                    {categories.slice(1).map((category, index) => {
                        const categorySkills = skillsData.filter(s => s.category === category.name)
                        const validSkills = categorySkills.filter(skill => typeof skill.level === 'number' && !isNaN(skill.level))
                        const avgLevel = validSkills.length > 0
                            ? Math.round(validSkills.reduce((sum, skill) => sum + skill.level, 0) / validSkills.length)
                            : 0

                        return (
                            <motion.div
                                key={category.name}
                                className="relative bg-[#1a1f35] rounded-2xl p-6 border border-gray-800/50 hover:border-gray-700 transition-all duration-300 overflow-hidden group"
                                whileHover={{ scale: 1.03, y: -4 }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.08 }}
                            >
                                {/* Glow effect */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        background: `radial-gradient(circle at 50% 0%, ${category.color}10, transparent 70%)`
                                    }}
                                />

                                <div className="relative z-10 text-center space-y-2">
                                    <div
                                        className="text-4xl font-bold"
                                        style={{ color: category.color }}
                                    >
                                        {avgLevel}%
                                    </div>
                                    <div className="text-sm text-gray-400 font-medium">
                                        {category.name}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Average Proficiency
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </div>
    )
}