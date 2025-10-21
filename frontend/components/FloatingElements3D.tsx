'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function FloatingShape({ position, color, shape = 'box' }: { position: [number, number, number], color: string, shape?: 'box' | 'sphere' | 'torus' }) {
    const meshRef = useRef<THREE.Mesh>(null!)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
        }
    })

    const geometry = useMemo(() => {
        switch (shape) {
            case 'sphere':
                return <sphereGeometry args={[0.5, 32, 32]} />
            case 'torus':
                return <torusGeometry args={[0.5, 0.2, 16, 100]} />
            default:
                return <boxGeometry args={[1, 1, 1]} />
        }
    }, [shape])

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <mesh ref={meshRef} position={position}>
                {geometry}
                <meshStandardMaterial color={color} transparent opacity={0.7} />
            </mesh>
        </Float>
    )
}

function SkillOrb({ position, color }: { position: [number, number, number], color: string }) {
    const meshRef = useRef<THREE.Mesh>(null!)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
        }
    })

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
            <mesh ref={meshRef} position={position}>
                <sphereGeometry args={[0.8, 32, 32]} />
                <meshStandardMaterial
                    color={color}
                    transparent
                    opacity={0.8}
                    emissive={color}
                    emissiveIntensity={0.2}
                />
            </mesh>
        </Float>
    )
}

export default function FloatingElements3D({ skills = [] }: { skills?: string[] }) {
    const colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444']

    return (
        <div className="absolute inset-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />

                {/* Floating geometric shapes */}
                <FloatingShape position={[-4, 2, -2]} color="#3b82f6" shape="box" />
                <FloatingShape position={[4, -2, -1]} color="#8b5cf6" shape="sphere" />
                <FloatingShape position={[-2, -3, -3]} color="#06b6d4" shape="torus" />
                <FloatingShape position={[3, 3, -2]} color="#10b981" shape="box" />
                <FloatingShape position={[-5, -1, -1]} color="#f59e0b" shape="sphere" />

                {/* Skill orbs */}
                {skills.slice(0, 6).map((skill, index) => (
                    <SkillOrb
                        key={skill}
                        position={[
                            Math.cos(index * Math.PI / 3) * 6,
                            Math.sin(index * Math.PI / 3) * 4,
                            -4
                        ]}
                        color={colors[index % colors.length]}
                    />
                ))}

                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    )
}