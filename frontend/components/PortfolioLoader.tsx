'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Code, Zap, Sparkles, Terminal, Coffee, Heart } from 'lucide-react'
import { useEffect, useState } from 'react'

interface PortfolioLoaderProps {
    isLoading: boolean
    onComplete: () => void
}

const codeSnippets = [
    "const developer = 'Aman Kumar';",
    "function createMagic() {",
    "  return innovation + passion;",
    "}",
    "// Building dreams with code ✨"
]

const techStack = ['React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB']

export default function PortfolioLoader({ isLoading, onComplete }: PortfolioLoaderProps) {
    const [progress, setProgress] = useState(0)
    const [currentCodeIndex, setCurrentCodeIndex] = useState(0)
    const [displayedCode, setDisplayedCode] = useState('')
    const [charIndex, setCharIndex] = useState(0)

    useEffect(() => {
        if (!isLoading) return

        // Progress animation
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval)
                    setTimeout(onComplete, 500)
                    return 100
                }
                return prev + Math.random() * 15
            })
        }, 200)

        return () => clearInterval(progressInterval)
    }, [isLoading, onComplete])

    // Typewriter effect for code
    useEffect(() => {
        if (!isLoading) return

        const currentSnippet = codeSnippets[currentCodeIndex]

        if (charIndex < currentSnippet.length) {
            const timeout = setTimeout(() => {
                setDisplayedCode(prev => prev + currentSnippet[charIndex])
                setCharIndex(prev => prev + 1)
            }, 50)
            return () => clearTimeout(timeout)
        } else {
            // Move to next snippet after delay
            const timeout = setTimeout(() => {
                setCurrentCodeIndex(prev => (prev + 1) % codeSnippets.length)
                setDisplayedCode('')
                setCharIndex(0)
            }, 1500)
            return () => clearTimeout(timeout)
        }
    }, [charIndex, currentCodeIndex, isLoading])

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[9999] bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center overflow-hidden"
                >
                    {/* Animated background elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        {/* Floating code symbols */}
                        {[
                            { symbol: '<', left: 10, top: 20, duration: 4, delay: 0 },
                            { symbol: '>', left: 80, top: 15, duration: 5, delay: 0.5 },
                            { symbol: '{', left: 15, top: 70, duration: 3.5, delay: 1 },
                            { symbol: '}', left: 85, top: 75, duration: 4.5, delay: 1.5 },
                            { symbol: '(', left: 25, top: 40, duration: 3, delay: 0.3 },
                            { symbol: ')', left: 75, top: 45, duration: 4, delay: 0.8 },
                            { symbol: ';', left: 40, top: 25, duration: 3.5, delay: 1.2 },
                            { symbol: '=', left: 60, top: 65, duration: 4, delay: 0.7 },
                            { symbol: '<', left: 5, top: 50, duration: 5, delay: 1.8 },
                            { symbol: '>', left: 90, top: 35, duration: 3, delay: 0.2 },
                            { symbol: '{', left: 30, top: 80, duration: 4.5, delay: 1.4 },
                            { symbol: '}', left: 70, top: 10, duration: 3.5, delay: 0.9 },
                            { symbol: '(', left: 50, top: 85, duration: 4, delay: 0.6 },
                            { symbol: ')', left: 20, top: 60, duration: 3, delay: 1.6 },
                            { symbol: ';', left: 80, top: 55, duration: 4.5, delay: 0.4 },
                            { symbol: '=', left: 35, top: 30, duration: 3.5, delay: 1.1 },
                            { symbol: '<', left: 65, top: 20, duration: 4, delay: 1.7 },
                            { symbol: '>', left: 45, top: 75, duration: 5, delay: 0.1 },
                            { symbol: '{', left: 10, top: 35, duration: 3, delay: 1.3 },
                            { symbol: '}', left: 85, top: 60, duration: 4, delay: 0.5 }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-primary/10 text-2xl font-mono"
                                style={{
                                    left: `${item.left}%`,
                                    top: `${item.top}%`,
                                }}
                                animate={{
                                    y: [-20, -100],
                                    opacity: [0, 0.5, 0],
                                    rotate: [0, 360]
                                }}
                                transition={{
                                    duration: item.duration,
                                    repeat: Infinity,
                                    delay: item.delay
                                }}
                            >
                                {item.symbol}
                            </motion.div>
                        ))}

                        {/* Gradient orbs */}
                        <motion.div
                            className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-full blur-3xl"
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 180, 360]
                            }}
                            transition={{ duration: 8, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
                            animate={{
                                scale: [1.2, 1, 1.2],
                                rotate: [360, 180, 0]
                            }}
                            transition={{ duration: 6, repeat: Infinity }}
                        />
                    </div>

                    {/* Main loader content */}
                    <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
                        {/* Logo/Brand */}
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                            className="mb-8"
                        >
                            <div className="relative inline-block">
                                <motion.div
                                    className="w-20 h-20 bg-gradient-to-br from-primary to-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-2xl"
                                    animate={{
                                        boxShadow: [
                                            "0 0 20px rgba(59, 130, 246, 0.3)",
                                            "0 0 40px rgba(59, 130, 246, 0.6)",
                                            "0 0 20px rgba(59, 130, 246, 0.3)"
                                        ]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    AK
                                </motion.div>

                                {/* Orbiting icons */}
                                {[Code, Zap, Sparkles].map((Icon, index) => (
                                    <motion.div
                                        key={index}
                                        className="absolute text-primary"
                                        style={{
                                            left: '50%',
                                            top: '50%',
                                        }}
                                        animate={{
                                            rotate: [0, 360],
                                            x: [0, Math.cos(index * 120 * Math.PI / 180) * 60],
                                            y: [0, Math.sin(index * 120 * Math.PI / 180) * 60],
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "linear",
                                            delay: index * 0.5
                                        }}
                                    >
                                        <Icon size={20} />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Name and title */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="mb-6"
                        >
                            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
                                Aman Kumar
                            </h1>
                            <p className="text-muted-foreground text-lg">
                                Senior Full-Stack Developer
                            </p>
                        </motion.div>

                        {/* Code typewriter */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 0.6 }}
                            className="mb-8"
                        >
                            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 font-mono text-sm">
                                <div className="flex items-center gap-2 mb-2">
                                    <Terminal size={16} className="text-primary" />
                                    <span className="text-muted-foreground">portfolio.js</span>
                                </div>
                                <div className="text-left">
                                    <span className="text-green-500">// </span>
                                    <span className="text-muted-foreground">Crafting digital experiences...</span>
                                    <br />
                                    <span className="text-foreground">{displayedCode}</span>
                                    <motion.span
                                        animate={{ opacity: [1, 0] }}
                                        transition={{ duration: 0.8, repeat: Infinity }}
                                        className="inline-block w-2 h-4 bg-primary ml-1"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Tech stack pills */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5, duration: 0.6 }}
                            className="flex flex-wrap justify-center gap-2 mb-8"
                        >
                            {techStack.map((tech, index) => (
                                <motion.span
                                    key={tech}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        delay: 1.5 + index * 0.1,
                                        type: "spring",
                                        bounce: 0.4
                                    }}
                                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </motion.div>

                        {/* Progress bar */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 2, duration: 0.6 }}
                            className="space-y-3"
                        >
                            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                                <Coffee size={16} />
                                <span>Loading portfolio magic...</span>
                                <Heart size={16} className="text-red-500" />
                            </div>

                            <div className="w-64 mx-auto">
                                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                    <span>Initializing</span>
                                    <span>{Math.round(progress)}%</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Loading dots */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2.5 }}
                            className="flex justify-center gap-1 mt-6"
                        >
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    className="w-2 h-2 bg-primary rounded-full"
                                    animate={{
                                        scale: [1, 1.5, 1],
                                        opacity: [0.5, 1, 0.5]
                                    }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        delay: i * 0.2
                                    }}
                                />
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}