import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, FileDown, Github, Linkedin } from 'lucide-react';
import WaterCanvas from '../ambient/WaterCanvas';
import Magnetic from '../ui/Magnetic';
import Glyph from '../ui/Glyph';
import { profile } from '../../data/portfolio';
import { scrollToId } from '../../lib/scroll';

const Letters = ({ text, delay = 0, className = '' }) => (
    <span className={`inline-flex overflow-hidden pb-[0.08em] ${className}`}>
        {text.split('').map((ch, i) => (
            <motion.span
                key={i}
                className="inline-block"
                initial={{ y: '110%', rotate: 8 }}
                animate={{ y: 0, rotate: 0 }}
                transition={{ delay: delay + i * 0.04, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                whileHover={{ y: -14, color: '#5eead4', transition: { type: 'spring', stiffness: 500, damping: 10 } }}
            >
                {ch}
            </motion.span>
        ))}
    </span>
);

const useClock = () => {
    const fmt = () =>
        new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata', hour12: false }).format(new Date());
    const [time, setTime] = useState(fmt);
    useEffect(() => {
        const t = setInterval(() => setTime(fmt()), 15000);
        return () => clearInterval(t);
    }, []);
    return time;
};

const Hero = () => {
    const [role, setRole] = useState(0);
    const time = useClock();
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 800], [0, 220]);
    const fade = useTransform(scrollY, [0, 600], [1, 0]);

    useEffect(() => {
        const t = setInterval(() => setRole((r) => (r + 1) % profile.roles.length), 2400);
        return () => clearInterval(t);
    }, []);

    return (
        <section id="surface" className="relative flex min-h-[100svh] flex-col overflow-hidden">
            <WaterCanvas />
            {/* fade the water into the ocean below */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-[#0a3b4f]" />
            {/* foam lines drifting along the surface edge */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 overflow-hidden">
                {[
                    { d: 14, o: 0.35, b: 30, w: 2 },
                    { d: 22, o: 0.2, b: 46, w: 1.5 },
                    { d: 9, o: 0.12, b: 14, w: 3 },
                ].map((l, i) => (
                    <svg
                        key={i}
                        viewBox="0 0 1200 40"
                        preserveAspectRatio="none"
                        className="wave-layer absolute left-0 h-6 w-[200%]"
                        style={{ bottom: l.b, animationDuration: `${l.d}s`, animationDirection: i % 2 ? 'reverse' : 'normal' }}
                    >
                        <path
                            d="M0 20 Q 75 0 150 20 T 300 20 T 450 20 T 600 20 T 750 20 T 900 20 T 1050 20 T 1200 20"
                            fill="none"
                            stroke={`rgba(200,250,255,${l.o})`}
                            strokeWidth={l.w}
                            vectorEffect="non-scaling-stroke"
                        />
                    </svg>
                ))}
            </div>

            <motion.p
                aria-hidden
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 1 }}
                className="pointer-events-none absolute right-6 top-24 hidden font-jp lg:right-28 text-2xl font-black tracking-[0.3em] text-white/25 md:block"
                style={{ writingMode: 'vertical-rl' }}
            >
                {profile.katakana}
            </motion.p>

            <motion.div style={{ y, opacity: fade }} className="pointer-events-none relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-10 pt-24 md:px-10">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-white/70"
                >
                    <span className="rounded-full bg-sakura px-2.5 py-1 font-bold text-white">Developer</span>
                    <span>{profile.location}</span>
                </motion.div>

                <h1 className="pointer-events-auto font-display font-extrabold leading-[0.85] tracking-tighter text-white">
                    <Letters text={profile.first.toUpperCase()} delay={0.3} className="text-[clamp(3.5rem,min(22vw,24vh),12rem)]" />
                    <br />
                    <Letters text={profile.last.toUpperCase()} delay={0.5} className="text-outline text-[clamp(2.25rem,min(13vw,15vh),8.5rem)]" />
                </h1>

                <div className="mt-[clamp(1.5rem,4vh,2.5rem)] flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-xl">
                        <p className="text-2xl font-semibold leading-tight md:text-3xl">
                            <span className="text-white/60">I&apos;m a </span>
                            <span className="relative inline-grid overflow-hidden align-bottom">
                                {profile.roles.map((r) => (
                                    <span key={r} aria-hidden className="invisible col-start-1 row-start-1 whitespace-nowrap">
                                        {r}
                                    </span>
                                ))}
                                <AnimatePresence mode="popLayout" initial={false}>
                                    <motion.span
                                        key={role}
                                        className="col-start-1 row-start-1 whitespace-nowrap text-aqua"
                                        initial={{ y: '100%', opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: '-100%', opacity: 0 }}
                                        transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
                                    >
                                        {profile.roles[role]}
                                    </motion.span>
                                </AnimatePresence>
                            </span>
                        </p>
                        <p className="mt-4 text-base leading-relaxed text-white/70 md:text-lg">
                            I build fast, polished web &amp; mobile products — and swim the same way. CS (AIML) at Newton School of Technology,
                            three internships in, and one live online store built solo.
                        </p>
                        <div className="pointer-events-auto mt-8 flex flex-wrap items-center gap-3">
                            <Magnetic>
                                <button
                                    onClick={() => scrollToId('about')}
                                    data-cursor="Dive"
                                    className="group flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-black shadow-[0_10px_40px_-10px_rgba(94,234,212,.8)] transition-transform"
                                >
                                    Dive in
                                    <ArrowDown size={18} className="transition-transform group-hover:translate-y-1" />
                                </button>
                            </Magnetic>
                            <Magnetic>
                                <a
                                    href={profile.resume}
                                    target="_blank"
                                    rel="noreferrer"
                                    data-cursor="CV"
                                    className="glass flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold text-white"
                                >
                                    <FileDown size={18} /> Resume
                                </a>
                            </Magnetic>
                            {[
                                { href: profile.socials.github, Icon: Github, label: 'GitHub' },
                                { href: profile.socials.linkedin, Icon: Linkedin, label: 'LinkedIn' },
                            ].map(({ href, Icon, label }) => (
                                <Magnetic key={label} strength={0.5}>
                                    <a href={href} target="_blank" rel="noreferrer" aria-label={label} className="glass grid h-12 w-12 place-items-center rounded-full text-white">
                                        <Icon size={18} />
                                    </a>
                                </Magnetic>
                            ))}
                        </div>
                    </div>

                    {/* iOS Live Activity card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 1.1, type: 'spring', stiffness: 200, damping: 20 }}
                        className="glass pointer-events-auto w-full max-w-[300px] shrink-0 rounded-[28px] p-4"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Glyph name="Waves" />
                                <div>
                                    <p className="text-sm font-semibold">Live from Pune</p>
                                    <p className="text-xs text-white/50">IST {time}</p>
                                </div>
                            </div>
                            <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2 py-1 text-[10px] font-semibold text-emerald-300">
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" /> Open to work
                            </span>
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                            {[
                                ['4', 'Roles'],
                                ['10K+', 'Users served'],
                                ['#2', 'of 500+'],
                            ].map(([v, l]) => (
                                <div key={l} className="rounded-2xl bg-white/5 py-2">
                                    <p className="font-display text-lg font-bold">{v}</p>
                                    <p className="text-[10px] text-white/50">{l}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                className="pointer-events-none relative z-10 flex flex-col items-center gap-2 pb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50"
            >
                <span className="hidden md:block">move to make waves · click to splash · ⌘K</span>
                <span className="md:hidden">tap the water</span>
                <span className="relative h-10 w-px overflow-hidden bg-white/20">
                    <motion.span
                        className="absolute left-0 top-0 h-3 w-px bg-aqua"
                        animate={{ y: [-12, 40] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeIn' }}
                    />
                </span>
            </motion.div>
        </section>
    );
};

export default Hero;
