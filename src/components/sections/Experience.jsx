import { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import Glyph from '../ui/Glyph';
import Swimmer from '../ui/Swimmer';
import { experience } from '../../data/portfolio';
import { scrollToId } from '../../lib/scroll';
import { useIsDesktop } from '../../lib/media';

const ease = [0.2, 0.8, 0.2, 1];
const LAP_MS = 8000; // auto-advance interval on desktop

const Rope = () => <div aria-hidden className="lane-rope-h h-[3px] w-full rounded-full opacity-50" />;

// One pool lane = one role. The active lane glows, a swimmer crosses it and a timer bar runs.
const Lane = ({ job, index, active, running, onSelect, onLapDone }) => {
    const [c1, c2] = job.color;
    return (
        <button
            onClick={onSelect}
            aria-pressed={active}
            data-cursor={active ? undefined : 'Open'}
            className="group relative flex w-full items-center gap-4 overflow-hidden px-4 py-5 text-left md:px-5"
        >
            {active && (
                <motion.span
                    layoutId="lane-glow"
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(90deg, ${c1}26, ${c2}0d 70%, transparent)` }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
            )}
            <span className={`relative w-7 font-mono text-xs ${active ? 'text-white' : 'text-white/30'}`}>{String(index + 1).padStart(2, '0')}</span>
            <span
                className={`relative grid h-11 w-11 shrink-0 place-items-center rounded-xl font-display text-lg font-extrabold text-white transition-[filter,opacity] ${active ? '' : 'opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0'}`}
                style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
            >
                {job.monogram}
            </span>
            <span className="relative min-w-0 flex-1">
                <span className={`block truncate font-display text-lg font-bold ${active ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>{job.company}</span>
                <span className="block truncate text-xs text-white/45">
                    {job.type} · {job.period}
                </span>
            </span>

            {/* swimmer crossing the active lane */}
            {active && (
                <motion.span
                    key={`swim-${job.company}`}
                    className="pointer-events-none absolute bottom-0 left-0 hidden h-0 md:block"
                    initial={{ x: -40 }}
                    animate={{ x: 420 }}
                    transition={{ duration: LAP_MS / 1000, ease: 'linear' }}
                >
                    {/* centred on the rope line so it never covers the lane text */}
                    <span className="absolute left-0 top-0 inline-block -translate-y-1/2 -rotate-90 scale-[0.4]">
                        <Swimmer />
                    </span>
                </motion.span>
            )}

            {/* lap timer */}
            {active && running && (
                <span
                    key={job.company}
                    className="absolute bottom-0 left-0 h-[2px] w-full origin-left"
                    style={{ background: c1, animation: `lap-timer ${LAP_MS}ms linear forwards` }}
                    onAnimationEnd={onLapDone}
                />
            )}
        </button>
    );
};

const Panel = ({ job }) => {
    const [c1] = job.color;
    return (
        <div className="glass relative overflow-hidden rounded-[32px] p-6 md:p-10">
            <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full opacity-40" style={{ background: `radial-gradient(closest-side, ${c1}55, transparent)` }} />

            <div className="relative">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ background: `${c1}22`, color: c1 }}>
                        {job.role}
                    </span>
                    <span className="font-mono text-[11px] text-white/40">{job.period}</span>
                </div>
                <p className="mt-4 text-sm text-white/50">{job.context}</p>

                <h3 className="mt-3 font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-white md:text-5xl">
                    {job.headline.map((t, i) =>
                        i % 2 ? (
                            <span key={i} className="relative" style={{ color: c1 }}>
                                {t}
                                <motion.span
                                    className="absolute -bottom-1 left-0 h-[4px] w-full origin-left rounded-full opacity-70"
                                    style={{ background: c1 }}
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 0.9, delay: 0.3, ease }}
                                />
                            </span>
                        ) : (
                            <span key={i}>{t}</span>
                        ),
                    )}
                </h3>

                {/* outcome numbers */}
                <div className="mt-8 grid grid-cols-3 divide-x divide-white/10 rounded-2xl bg-black/25 ring-1 ring-white/5">
                    {job.metrics.map((m, i) => (
                        <motion.div
                            key={m.label}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease }}
                            className="px-3 py-5 text-center md:px-5"
                        >
                            <p className="whitespace-nowrap font-display text-2xl font-extrabold tracking-tight md:text-4xl" style={{ color: c1, textShadow: `0 0 28px ${c1}55` }}>
                                {m.value}
                            </p>
                            <p className="mt-1.5 text-[11px] leading-snug text-white/55 md:text-xs">{m.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* what I did, in three sentences */}
                <ol className="mt-8 space-y-4">
                    {job.points.map((p, i) => (
                        <motion.li
                            key={p}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease }}
                            className="flex gap-4"
                        >
                            <span className="mt-0.5 font-mono text-xs font-bold" style={{ color: c1 }}>
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            <span className="text-[15px] leading-relaxed text-white/80">{p}</span>
                        </motion.li>
                    ))}
                </ol>

                {/* what got built */}
                <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-white/10 pt-6">
                    {job.built.map((b) => (
                        <span key={b.title} className="flex items-center gap-2 rounded-full bg-white/[0.05] py-1 pl-1 pr-3 ring-1 ring-white/10">
                            <Glyph name={b.icon} color={c1} size="sm" />
                            <span className="text-xs font-medium text-white/80">{b.title}</span>
                        </span>
                    ))}
                    {job.link && (
                        <a
                            href={job.link.href}
                            target="_blank"
                            rel="noreferrer"
                            data-cursor="Visit"
                            className="ml-auto flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-black transition-transform hover:scale-105"
                            style={{ background: c1 }}
                        >
                            {job.link.label} <ArrowUpRight size={15} />
                        </a>
                    )}
                </div>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-white/30">Built with {job.stack.join(' · ')}</p>
            </div>
        </div>
    );
};

const panelMotion = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
    exit: { opacity: 0, y: -16, transition: { duration: 0.25 } },
};

const Experience = () => {
    const [active, setActive] = useState(0);
    const [picked, setPicked] = useState(false);
    const [hovered, setHovered] = useState(false);
    const board = useRef(null);
    const inView = useInView(board, { amount: 0.4 });
    const desktop = useIsDesktop();
    const running = desktop && inView && !picked && !hovered;

    // Clicking stops the auto-advance; on phones, tapping the open lane closes it.
    const select = (i) => {
        setPicked(true);
        setActive((a) => (!desktop && a === i ? -1 : i));
    };

    const job = experience[active];

    return (
        <section id="experience" className="relative mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
            <SectionHeader id="experience" title="Laps swum." kicker="Four roles, newest first. Pick a lane." />

            <div ref={board} className="grid items-start gap-6 lg:grid-cols-[minmax(320px,400px)_1fr] lg:gap-10">
                {/* The lanes */}
                <div className="glass overflow-hidden rounded-[28px]" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                    <Rope />
                    {experience.map((j, i) => (
                        <div key={j.company}>
                            <Lane
                                job={j}
                                index={i}
                                active={i === active}
                                running={running}
                                onSelect={() => select(i)}
                                onLapDone={() => setActive((a) => (a + 1) % experience.length)}
                            />
                            {/* phones: the panel opens under its lane */}
                            {!desktop && (
                                <AnimatePresence initial={false}>
                                    {i === active && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease }}
                                            className="overflow-hidden px-3 pb-3"
                                        >
                                            <Panel job={j} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            )}
                            <Rope />
                        </div>
                    ))}
                    <button onClick={() => scrollToId('contact')} data-cursor="Hire" className="group flex w-full items-center gap-4 px-4 py-5 text-left md:px-5">
                        <span className="w-7 font-mono text-xs text-aqua">05</span>
                        <span className="grid h-11 w-11 place-items-center rounded-xl border-2 border-dashed border-aqua/50 text-aqua">+</span>
                        <span className="flex-1">
                            <span className="block font-display text-lg font-bold text-white">Your team?</span>
                            <span className="block text-xs text-white/45">Open lane · ready for the next heat</span>
                        </span>
                        <ArrowRight size={18} className="text-aqua transition-transform group-hover:translate-x-1" />
                    </button>
                </div>

                {/* The selected role */}
                {desktop && job && (
                    <div className="relative">
                        <AnimatePresence mode="wait">
                            <motion.div key={job.company} {...panelMotion}>
                                <Panel job={job} />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Experience;
