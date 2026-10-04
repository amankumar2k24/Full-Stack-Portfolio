'use client'

/* Infinite ticker band — pure CSS animation, GPU cheap */
export default function Marquee({ items, dark = false }: { items: string[]; dark?: boolean }) {
    const row = [...items, ...items]
    return (
        <div className={`relative overflow-hidden border-y ${dark ? 'border-white/10 bg-nova-lime' : 'border-white/10 bg-nova-panel'} py-4 md:py-5 -rotate-1 scale-[1.02]`}>
            <div className="flex w-max animate-marquee gap-0">
                {row.map((item, i) => (
                    <span
                        key={i}
                        className={`flex items-center gap-6 px-6 font-display font-bold text-lg md:text-2xl tracking-tight whitespace-nowrap ${dark ? 'text-nova-ink' : 'text-nova-bone/90'}`}
                    >
                        {item}
                        <span className={dark ? 'text-nova-ink/60' : 'text-nova-lime'}>✦</span>
                    </span>
                ))}
            </div>
        </div>
    )
}
