import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, animate, motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import ScrollText from '../ui/ScrollText';
import { profile, status } from '../../data/portfolio';

const Counter = ({ value, decimals = 0, suffix = '' }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const [n, setN] = useState(0);
    useEffect(() => {
        if (!inView) return;
        const c = animate(0, value, { duration: 1.8, ease: [0.2, 0.7, 0.2, 1], onUpdate: setN });
        return () => c.stop();
    }, [inView, value]);
    return (
        <span ref={ref} className="tabular-nums">
            {n.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
            {suffix}
        </span>
    );
};

const SYSTEM_MSGS = [
    'A new player has entered the dungeon.',
    '+40 XP — Feature shipped 3 weeks early.',
    'Skill “React Native” reached Lv. MAX.',
    'Quest complete: 24h pipeline → 30 min.',
    'Stamina restored after 2km swim.',
];

const Typewriter = () => {
    const [i, setI] = useState(0);
    const [len, setLen] = useState(0);
    const msg = SYSTEM_MSGS[i];
    useEffect(() => {
        const t = len < msg.length ? setTimeout(() => setLen(len + 1), 28) : setTimeout(() => {
            setLen(0);
            setI((i + 1) % SYSTEM_MSGS.length);
        }, 2200);
        return () => clearTimeout(t);
    }, [len, msg, i]);
    return (
        <p className="font-mono text-xs text-cyan">
            <span className="text-white/40">[SYSTEM]</span> {msg.slice(0, len)}
            <span className="ml-0.5 inline-block h-3 w-1.5 animate-pulse bg-cyan align-middle" />
        </p>
    );
};

const Corner = ({ className }) => <span className={`absolute h-4 w-4 border-cyan ${className}`} />;

const StatusWindow = () => {
    const ref = useRef(null);
    const mx = useMotionValue(0.5);
    const my = useMotionValue(0.5);
    const rx = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 150, damping: 15 });
    const ry = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 150, damping: 15 });
    const glareX = useTransform(mx, [0, 1], ['0%', '100%']);
    const [hovered, setHovered] = useState(null);

    const move = (e) => {
        const r = ref.current.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
    };

    return (
        <div style={{ perspective: 1200 }}>
            <motion.div
                ref={ref}
                onPointerMove={move}
                onPointerLeave={() => {
                    mx.set(0.5);
                    my.set(0.5);
                }}
                initial={{ opacity: 0, scale: 0.85, rotateX: 25 }}
                whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ type: 'spring', stiffness: 90, damping: 16 }}
                style={{ rotateX: rx, rotateY: ry }}
                className="relative overflow-hidden border border-cyan/60 will-change-transform bg-[#041a2e]/85 p-6 shadow-[0_0_60px_-10px_rgba(34,211,238,.45),inset_0_0_40px_rgba(34,211,238,.08)] md:p-8"
            >
                <Corner className="left-2 top-2 border-l-2 border-t-2" />
                <Corner className="right-2 top-2 border-r-2 border-t-2" />
                <Corner className="bottom-2 left-2 border-b-2 border-l-2" />
                <Corner className="bottom-2 right-2 border-b-2 border-r-2" />
                <motion.div
                    className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-cyan/10 to-transparent"
                    style={{ left: glareX }}
                />
                {/* scanlines */}
                <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0_3px,rgba(34,211,238,.04)_3px_4px)]" />

                <div className="relative">
                    <div className="mb-5 flex items-center gap-3">
                        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan/70" />
                        <span className="font-mono text-sm font-bold tracking-[0.5em] text-cyan">STATUS</span>
                        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan/70" />
                    </div>

                    <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 font-mono text-sm">
                        {[
                            ['NAME', profile.name],
                            ['CLASS', status.className],
                            ['SUB', status.subclass],
                            ['GUILD', status.guild],
                            ['QUEST', `${status.degree} · ${status.years}`],
                        ].map(([k, v]) => (
                            <div key={k} className="contents">
                                <dt className="text-cyan/60">{k}</dt>
                                <dd className="text-white">{v}</dd>
                            </div>
                        ))}
                    </dl>

                    <div className="my-6 h-px bg-cyan/25" />

                    <div className="space-y-4">
                        {status.stats.map((s, i) => (
                            <div key={s.key} onPointerEnter={() => setHovered(i)} onPointerLeave={() => setHovered(null)}>
                                <div className="mb-1.5 flex justify-between font-mono text-xs">
                                    <span className={hovered === i ? 'text-sakura' : 'text-cyan/70'}>{s.key}</span>
                                    <span className="font-bold text-white">
                                        <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
                                    </span>
                                </div>
                                <div className="h-2 overflow-hidden bg-cyan/10">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-cyan to-aqua shadow-[0_0_12px_#22d3ee]"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${(s.value / s.max) * 100}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.6, delay: 0.2 + i * 0.12, ease: [0.2, 0.7, 0.2, 1] }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="my-6 h-px bg-cyan/25" />

                    <p className="mb-2 font-mono text-xs text-cyan/60">TITLES</p>
                    <div className="flex flex-wrap gap-2">
                        {status.titles.map((t, i) => (
                            <motion.span
                                key={t}
                                initial={{ opacity: 0, scale: 0.6 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6 + i * 0.08, type: 'spring' }}
                                whileHover={{ scale: 1.08, rotate: -2 }}
                                className="border border-sun/50 bg-sun/10 px-2.5 py-1 font-mono text-[11px] text-sun"
                            >
                                【{t}】
                            </motion.span>
                        ))}
                    </div>

                    <div className="mt-6 border-t border-cyan/25 pt-4">
                        <Typewriter />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const About = () => {
    const [popup, setPopup] = useState(null);

    return (
        <section id="about" className="relative mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
            <SectionHeader id="about" title="Player profile." kicker="Developer by day, swimmer by dawn, anime watcher by night." />

            <div className="grid items-start gap-14 lg:grid-cols-[1fr_1.05fr]">
                <div className="space-y-6 text-lg leading-relaxed text-white md:text-xl">
                    <ScrollText
                        segments={[
                            ["Hey, I'm"],
                            ['Parth.', 'font-semibold text-aqua'],
                            [
                                "I'm a computer science undergrad specialising in AI/ML, and I like building things people actually use: sports apps used by 500+ athletes, and pipelines that cut a full day of processing down to half an hour.",
                            ],
                        ]}
                    />
                    <ScrollText
                        segments={[
                            ['I work across the stack:'],
                            ['React, React Native, Node and Python,', 'text-aqua'],
                            [
                                "with a soft spot for interfaces that feel as smooth as the Apple ones I grew up admiring. Away from the keyboard you'll find me in the pool, on the volleyball court, or a few episodes deep into an anime arc.",
                            ],
                        ]}
                    />

                    <div className="pt-4">
                        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-aqua">Passive skills</p>
                        <div className="space-y-3">
                            {status.passives.map((p, i) => (
                                <motion.button
                                    key={p.name}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ x: 8 }}
                                    onClick={() => setPopup(p)}
                                    data-cursor="Equip"
                                    className="glass flex w-full items-center gap-4 rounded-2xl p-4 text-left"
                                >
                                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-sakura to-[#ff9a5c] font-jp text-lg font-black text-white">
                                        {['速', '錬', '集'][i]}
                                    </span>
                                    <span>
                                        <span className="block text-base font-semibold text-white">{p.name}</span>
                                        <span className="block text-sm text-white/55">{p.desc}</span>
                                    </span>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>

                <StatusWindow />
            </div>

            <AnimatePresence>
                {popup && (
                    <motion.div
                        className="fixed inset-0 z-[80] grid place-items-center bg-black/50 px-4 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setPopup(null)}
                    >
                        <motion.div
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            exit={{ scaleY: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                            className="w-full max-w-sm border border-cyan/70 bg-[#041a2e]/95 p-6 text-center font-mono shadow-[0_0_60px_rgba(34,211,238,.4)]"
                        >
                            <p className="text-xs tracking-[0.4em] text-cyan">[ SKILL ACQUIRED ]</p>
                            <p className="mt-4 font-display text-3xl font-extrabold text-white">{popup.name}</p>
                            <p className="mt-2 text-sm text-white/70">{popup.desc}</p>
                            <p className="mt-6 text-[10px] text-white/40">click anywhere to close</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default About;
