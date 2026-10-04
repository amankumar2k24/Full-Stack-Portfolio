'use client'

import { useEffect, useRef } from 'react'

/* Custom cursor: dot + trailing ring, single rAF loop, desktop only */
export default function Cursor() {
    const dotRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (typeof window === 'undefined') return
        if (window.matchMedia('(pointer: coarse)').matches) return

        const dot = dotRef.current
        const ring = ringRef.current
        if (!dot || !ring) return

        let mx = -100, my = -100, rx = -100, ry = -100
        let raf = 0
        let hovering = false

        const onMove = (e: MouseEvent) => {
            mx = e.clientX
            my = e.clientY
            const t = (e.target as HTMLElement).closest('a, button, [data-cursor]')
            hovering = !!t
            ring.classList.toggle('cursor-hover', hovering)
        }

        const loop = () => {
            rx += (mx - rx) * 0.16
            ry += (my - ry) * 0.16
            dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`
            ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
            raf = requestAnimationFrame(loop)
        }

        window.addEventListener('mousemove', onMove, { passive: true })
        raf = requestAnimationFrame(loop)
        document.documentElement.classList.add('has-cursor')

        return () => {
            window.removeEventListener('mousemove', onMove)
            cancelAnimationFrame(raf)
            document.documentElement.classList.remove('has-cursor')
        }
    }, [])

    return (
        <>
            <div ref={dotRef} className="cursor-dot" aria-hidden />
            <div ref={ringRef} className="cursor-ring" aria-hidden />
        </>
    )
}
