'use client'

import { motion } from 'framer-motion'

export default function SimpleFloatingElements() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Floating geometric shapes - more spread out for full width */}
            <motion.div
                className="absolute top-20 left-5 w-16 h-16 bg-primary/20 rounded-lg backdrop-blur-sm"
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 180, 360],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <motion.div
                className="absolute top-40 right-5 w-12 h-12 bg-blue-500/20 rounded-full backdrop-blur-sm"
                animate={{
                    y: [0, -30, 0],
                    x: [0, 10, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
            />

            <motion.div
                className="absolute bottom-32 left-5 w-20 h-8 bg-purple-500/20 rounded-full backdrop-blur-sm"
                animate={{
                    y: [0, -25, 0],
                    rotate: [0, -180, -360],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
            />

            <motion.div
                className="absolute bottom-20 right-5 w-14 h-14 bg-green-500/20 rounded-lg backdrop-blur-sm"
                animate={{
                    y: [0, -15, 0],
                    rotate: [0, 90, 180, 270, 360],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                }}
            />

            <motion.div
                className="absolute top-60 left-1/4 w-10 h-10 bg-yellow-500/20 rounded-full backdrop-blur-sm"
                animate={{
                    y: [0, -40, 0],
                    x: [0, -20, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3
                }}
            />

            <motion.div
                className="absolute top-32 right-1/4 w-8 h-8 bg-cyan-500/20 rounded-lg backdrop-blur-sm"
                animate={{
                    y: [0, -35, 0],
                    rotate: [0, 45, 90, 135, 180],
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5
                }}
            />

            <motion.div
                className="absolute bottom-40 right-1/3 w-6 h-6 bg-pink-500/20 rounded-full backdrop-blur-sm"
                animate={{
                    y: [0, -20, 0],
                    scale: [1, 1.5, 1],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 4
                }}
            />

            <motion.div
                className="absolute top-1/2 left-10 w-12 h-4 bg-orange-500/20 rounded-full backdrop-blur-sm"
                animate={{
                    x: [0, 30, 0],
                    rotate: [0, 360],
                }}
                transition={{
                    duration: 11,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2.5
                }}
            />
        </div>
    )
}