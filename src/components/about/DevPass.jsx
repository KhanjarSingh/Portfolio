import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FileDown, Github, Linkedin, RotateCw, Trophy } from 'lucide-react';
import Glyph from '../ui/Glyph';
import { profile, status } from '../../data/portfolio';
import { LITE } from '../../lib/media';

const Counter = ({ value, prefix = '', suffix = '' }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const [n, setN] = useState(0);
    useEffect(() => {
        if (!inView) return;
        const c = animate(0, value, { duration: 1.6, ease: [0.2, 0.7, 0.2, 1], onUpdate: setN });
        return () => c.stop();
    }, [inView, value]);
    return (
        <span ref={ref} className="tabular-nums">
            {prefix}
            {Math.round(n).toLocaleString('en-IN')}
            {suffix}
        </span>
    );
};

// Deterministic decorative barcode built from the name.
const BARS = Array.from(profile.name.repeat(3)).map((ch, i) => ({ w: (ch.charCodeAt(0) % 3) + 1, gap: (i % 4 === 0 ? 3 : 2) }));

const Field = ({ label, value, wide = false }) => (
    <div className={`min-w-0 ${wide ? 'col-span-2' : ''}`}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">{label}</p>
        <p className="mt-0.5 text-[15px] font-medium leading-snug text-white">{value}</p>
    </div>
);

const Face = ({ children, back = false }) => (
    <div
        className="absolute inset-0 overflow-hidden rounded-[30px] border border-white/15 shadow-[0_40px_90px_-30px_rgba(0,0,0,.9)]"
        style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: back ? 'rotateY(180deg)' : undefined,
            background: back
                ? 'linear-gradient(160deg, #1a1030, #0b1424 55%, #06202a)'
                : 'linear-gradient(155deg, #0f4a5c, #0a2534 45%, #0b1020)',
        }}
    >
        {/* soft wave pattern */}
        <svg aria-hidden viewBox="0 0 400 120" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-28 w-full opacity-[0.12]">
            {[0, 18, 36].map((o) => (
                <path key={o} d={`M0 ${40 + o} Q 50 ${20 + o} 100 ${40 + o} T 200 ${40 + o} T 300 ${40 + o} T 400 ${40 + o}`} fill="none" stroke="#5eead4" strokeWidth="2" />
            ))}
        </svg>
        <div className="relative flex h-full flex-col p-6 md:p-7">{children}</div>
    </div>
);

// Apple Wallet-style pass with a holographic sheen. Tap to flip.
const DevPass = () => {
    const [flipped, setFlipped] = useState(false);
    const ref = useRef(null);
    const mx = useMotionValue(0.5);
    const my = useMotionValue(0.5);
    const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 150, damping: 18 });
    const tiltY = useSpring(useTransform(mx, [0, 1], [-9, 9]), { stiffness: 150, damping: 18 });
    const flip = useSpring(0, { stiffness: 120, damping: 18 });
    const rotateY = useTransform([tiltY, flip], ([t, f]) => t + f);
    const sheen = useTransform([mx, my], ([x, y]) => `${x * 100}% ${y * 100}%`);

    useEffect(() => flip.set(flipped ? 180 : 0), [flipped, flip]);

    const move = (e) => {
        if (LITE) return;
        const r = ref.current.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
    };
    const leave = () => {
        mx.set(0.5);
        my.set(0.5);
    };

    return (
        <motion.div
            className="mx-auto w-full max-w-[420px]"
            style={{ perspective: 1400 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        >
            <motion.div
                ref={ref}
                role="button"
                tabIndex={0}
                aria-label={flipped ? 'Show front of pass' : 'Show back of pass'}
                onClick={(e) => !e.target.closest('a') && setFlipped((f) => !f)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setFlipped((f) => !f)}
                onPointerMove={move}
                onPointerLeave={leave}
                data-cursor="Flip"
                className="relative h-[600px] w-full cursor-pointer outline-none will-change-transform sm:h-[580px]"
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            >
                {/* ---------- FRONT ---------- */}
                <Face>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-aqua to-sakura font-display text-sm font-extrabold text-[#04121c]">
                                PT
                            </span>
                            <div className="leading-tight">
                                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">Developer Pass</p>
                                <p className="text-xs text-white/70">{profile.location}</p>
                            </div>
                        </div>
                        <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" /> Open to work
                        </span>
                    </div>

                    <div className="mt-8">
                        <p className="font-jp text-xs tracking-[0.3em] text-white/35">{profile.katakana}</p>
                        <h3 className="mt-1 font-display text-[2.4rem] font-extrabold leading-none tracking-tight text-white">{profile.name}</h3>
                        <p className="mt-2 text-sm text-aqua">
                            {status.title} · {status.focus}
                        </p>
                    </div>

                    <div className="mt-7 grid grid-cols-2 gap-x-5 gap-y-4">
                        <Field label="Now" value={status.now} wide />
                        <Field label="College" value={status.college} wide />
                        <Field label="Studying" value={status.degree} />
                        <Field label="Class of" value={status.classOf} />
                    </div>

                    <div className="my-6 border-t border-dashed border-white/20" />

                    <div className="grid grid-cols-3 gap-3 text-center">
                        {status.stats.map((s) => (
                            <div key={s.label}>
                                <p className="font-display text-2xl font-extrabold text-white md:text-3xl">
                                    <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                                </p>
                                <p className="mt-1 text-[11px] leading-tight text-white/50">{s.label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-auto flex items-end justify-between pt-6">
                        <div aria-hidden className="flex h-10 items-stretch">
                            {BARS.map((b, i) => (
                                <span key={i} className="bg-white/70" style={{ width: b.w, marginRight: b.gap }} />
                            ))}
                        </div>
                        <span className="flex items-center gap-1 text-[11px] text-white/45">
                            <RotateCw size={12} /> Tap to flip
                        </span>
                    </div>

                    {/* holographic sheen following the pointer */}
                    {!LITE && (
                        <motion.div
                            aria-hidden
                            className="pointer-events-none absolute inset-0 opacity-25 mix-blend-screen"
                            style={{
                                backgroundImage:
                                    'linear-gradient(115deg, transparent 30%, rgba(94,234,212,.5) 44%, rgba(167,139,250,.35) 52%, rgba(255,209,102,.3) 58%, transparent 70%)',
                                backgroundSize: '250% 250%',
                                backgroundPosition: sheen,
                            }}
                        />
                    )}
                </Face>

                {/* ---------- BACK ---------- */}
                <Face back>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">Off the clock</p>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                        {status.interests.map((it, i) => (
                            <div key={it.title} className="flex items-center gap-3 rounded-2xl bg-white/[0.05] p-3 ring-1 ring-white/10">
                                <Glyph name={it.icon} color={['#5eead4', '#ff5c8a', '#ffd166', '#a78bfa'][i % 4]} size="sm" />
                                <span className="text-sm font-medium text-white">{it.title}</span>
                            </div>
                        ))}
                    </div>

                    <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">Highlights</p>
                    <ul className="mt-3 space-y-2.5">
                        {status.titles.map((t) => (
                            <li key={t} className="flex items-center gap-3 text-sm text-white/85">
                                <Trophy size={15} className="shrink-0 text-sun" />
                                {t}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-auto grid grid-cols-3 gap-2 pt-6">
                        {[
                            { href: profile.socials.github, Icon: Github, label: 'GitHub' },
                            { href: profile.socials.linkedin, Icon: Linkedin, label: 'LinkedIn' },
                            { href: profile.resume, Icon: FileDown, label: 'Resume' },
                        ].map(({ href, Icon, label }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                className="flex flex-col items-center gap-1.5 rounded-2xl bg-white/[0.06] py-3 text-xs font-medium text-white ring-1 ring-white/10 transition-colors hover:bg-white/[0.12]"
                            >
                                <Icon size={18} />
                                {label}
                            </a>
                        ))}
                    </div>
                    <p className="mt-4 flex items-center justify-center gap-1 text-[11px] text-white/40">
                        <RotateCw size={12} /> Tap to flip back
                    </p>
                </Face>
            </motion.div>
        </motion.div>
    );
};

export default DevPass;
