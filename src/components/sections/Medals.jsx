import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { medals } from '../../data/portfolio';
import { emit } from '../../lib/scroll';

const METAL = {
    gold: { face: 'radial-gradient(circle at 30% 25%, #fff6c8, #ffd166 30%, #c99520 65%, #7a5a10)', ink: '#5a3f05', ribbon: ['#ff5c8a', '#ffd166'] },
    silver: { face: 'radial-gradient(circle at 30% 25%, #ffffff, #dfe7ec 30%, #9aa8b2 65%, #4f5b63)', ink: '#2b343a', ribbon: ['#22d3ee', '#ffffff'] },
    bronze: { face: 'radial-gradient(circle at 30% 25%, #ffe1c4, #e39b62 30%, #a35d2a 65%, #5c3013)', ink: '#3d1d07', ribbon: ['#ff5c8a', '#ffffff'] },
    aqua: { face: 'radial-gradient(circle at 30% 25%, #e6fffb, #5eead4 30%, #0e9488 65%, #064e45)', ink: '#043a33', ribbon: ['#5eead4', '#0e7490'] },
};

const Medal = ({ medal, index }) => {
    const m = METAL[medal.tier];
    const [spin, setSpin] = useState(0);

    return (
        <motion.div
            initial={{ y: -120, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ type: 'spring', stiffness: 70, damping: 9, delay: index * 0.12 }}
            className="flex flex-col items-center text-center"
        >
            <div className="flex origin-top flex-col items-center" style={{ animation: `sway ${3.5 + index * 0.4}s ease-in-out infinite` }}>
                {/* ribbon */}
                <div className="relative h-28 w-24">
                    <span
                        className="absolute left-1 top-0 h-full w-10 origin-top -skew-x-[18deg]"
                        style={{ background: `repeating-linear-gradient(90deg, ${m.ribbon[0]} 0 8px, ${m.ribbon[1]} 8px 12px)` }}
                    />
                    <span
                        className="absolute right-1 top-0 h-full w-10 origin-top skew-x-[18deg]"
                        style={{ background: `repeating-linear-gradient(90deg, ${m.ribbon[1]} 0 4px, ${m.ribbon[0]} 4px 12px)` }}
                    />
                </div>
                <motion.button
                    onHoverStart={() => setSpin((s) => s + 360)}
                    onClick={() => {
                        setSpin((s) => s + 720);
                        if (medal.tier === 'silver') emit('toast', 'Achievement: 2nd of 500+ teams. Next target: gold.');
                    }}
                    animate={{ rotateY: spin }}
                    transition={{ duration: 1.1, ease: [0.3, 0.7, 0.2, 1] }}
                    data-cursor="Spin"
                    className="relative -mt-3 grid h-36 w-36 place-items-center rounded-full shadow-[0_20px_40px_-10px_rgba(0,0,0,.8)] md:h-40 md:w-40"
                    style={{ background: m.face, transformStyle: 'preserve-3d' }}
                    aria-label={medal.title}
                >
                    <span className="absolute inset-3 rounded-full border-2" style={{ borderColor: `${m.ink}55` }} />
                    <span className="absolute inset-5 rounded-full border border-dashed" style={{ borderColor: `${m.ink}40` }} />
                    <span className="relative font-display text-4xl font-extrabold" style={{ color: m.ink, textShadow: '0 1px 0 rgba(255,255,255,.6)' }}>
                        {medal.rank}
                    </span>
                    <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/50 via-transparent to-transparent" />
                </motion.button>
            </div>
            <h3 className="mt-6 font-display text-xl font-bold text-white">{medal.title}</h3>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-aqua">{medal.sub}</p>
            <p className="mt-3 max-w-[260px] text-sm leading-relaxed text-white/60">{medal.desc}</p>
        </motion.div>
    );
};

const Medals = () => (
    <section id="medals" className="relative mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
        <SectionHeader id="medals" title="Medal case." kicker="Hackathons, coding challenges, open source and certifications. Hover to spin them, click for a bonus." />
        <div className="relative">
            {/* the rail the medals hang from */}
            <div className="absolute inset-x-0 top-0 hidden h-1.5 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent lg:block" />
            <div className="grid gap-16 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
                {medals.map((m, i) => (
                    <Medal key={m.title} medal={m} index={i} />
                ))}
            </div>
        </div>
    </section>
);

export default Medals;
