import { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import Glyph from '../ui/Glyph';
import Swimmer from '../ui/Swimmer';
import { experience } from '../../data/portfolio';
import { scrollToId } from '../../lib/scroll';

const ease = [0.2, 0.8, 0.2, 1];

const Headline = ({ parts, color }) => (
    <h3 className="font-display text-2xl font-bold leading-[1.15] tracking-tight text-white md:text-[2rem]">
        {parts.map((t, i) =>
            i % 2 ? (
                <span key={i} className="relative whitespace-nowrap" style={{ color }}>
                    {t}
                    <motion.span
                        className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full"
                        style={{ background: color }}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.4, ease }}
                    />
                </span>
            ) : (
                <span key={i}>{t}</span>
            ),
        )}
    </h3>
);

const CaseCard = ({ job }) => {
    const [techOpen, setTechOpen] = useState(false);
    const [c1, c2] = job.color;

    return (
        <motion.article
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.8, ease }}
            className="glass relative overflow-hidden rounded-[32px]"
        >
            {/* Header band in the company's colours */}
            <div className="relative overflow-hidden border-b border-white/10 px-5 py-5 md:px-8">
                <div className="pointer-events-none absolute inset-0 opacity-30" style={{ background: `linear-gradient(100deg, ${c1}33, transparent 45%, ${c2}22)` }} />
                <div className="pointer-events-none absolute -right-20 -top-28 h-64 w-64 rounded-full opacity-40" style={{ background: `radial-gradient(closest-side, ${c1}55, transparent)` }} />
                <div className="relative flex flex-wrap items-center gap-4">
                    <span
                        className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl font-display text-2xl font-extrabold text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,.8)]"
                        style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
                    >
                        {job.monogram}
                    </span>
                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <p className="font-display text-2xl font-bold text-white">{job.company}</p>
                            <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider" style={{ background: `${c1}22`, color: c1 }}>
                                {job.type}
                            </span>
                        </div>
                        <p className="text-sm text-white/75">{job.role}</p>
                        <p className="mt-0.5 font-mono text-[11px] text-white/40">
                            <span className="whitespace-nowrap">{job.period}</span> · {job.place}
                        </p>
                    </div>
                    {job.link && (
                        <a
                            href={job.link.href}
                            target="_blank"
                            rel="noreferrer"
                            data-cursor="Visit"
                            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-black transition-transform hover:scale-105"
                            style={{ background: c1 }}
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black/40" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-black/70" />
                            </span>
                            {job.link.label}
                            <ArrowUpRight size={15} />
                        </a>
                    )}
                </div>
            </div>

            <div className="grid gap-8 p-5 md:p-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
                {/* Left: the story */}
                <div>
                    <p className="text-sm leading-relaxed text-white/50">{job.context}</p>
                    <div className="mt-4">
                        <Headline parts={job.headline} color={c1} />
                    </div>

                    <div className="mt-7 grid grid-cols-2 gap-3">
                        {job.stats.map((st, i) => (
                            <motion.div
                                key={st.label}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.15 + i * 0.08, duration: 0.6, ease }}
                                className="relative overflow-hidden rounded-2xl bg-black/30 p-4 ring-1 ring-white/5"
                            >
                                <span className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${c1}99, transparent)` }} />
                                <p className="font-display text-3xl font-extrabold tracking-tight md:text-4xl" style={{ color: c1, textShadow: `0 0 24px ${c1}55` }}>
                                    {st.value}
                                </p>
                                <p className="mt-1 text-xs leading-snug text-white/55">{st.label}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-7 space-y-4">
                        {job.stories.map((st, i) => (
                            <motion.div
                                key={st.title}
                                initial={{ opacity: 0, x: -16 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease }}
                                className="flex gap-4"
                            >
                                <Glyph name={st.icon} color={c1} />
                                <div>
                                    <p className="font-semibold text-white">{st.title}</p>
                                    <p className="mt-0.5 text-sm leading-relaxed text-white/60">{st.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right: everything built */}
                <div>
                    <div className="mb-4 flex items-baseline justify-between">
                        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/45">What I built</p>
                        <p className="font-mono text-[11px] text-white/35">{String(job.built.length).padStart(2, '0')} modules</p>
                    </div>
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        {job.built.map((m, i) => (
                            <motion.div
                                key={m.title}
                                initial={{ opacity: 0, scale: 0.92 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 + i * 0.04, duration: 0.5, ease }}
                                whileHover={{ y: -3 }}
                                className="group/m flex items-center gap-3 rounded-2xl bg-white/[0.04] p-3 ring-1 ring-white/5 transition-colors hover:bg-white/[0.07]"
                            >
                                <Glyph name={m.icon} color={c1} size="sm" />
                                <div className="min-w-0">
                                    <p className="truncate text-[13px] font-semibold text-white">{m.title}</p>
                                    <p className="truncate text-[11px] text-white/45">{m.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-5 border-t border-white/10 pt-4">
                        <button
                            onClick={() => setTechOpen((o) => !o)}
                            className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-white/50 hover:text-white"
                            aria-expanded={techOpen}
                        >
                            <motion.span animate={{ rotate: techOpen ? 90 : 0 }} className="inline-block">
                                ▸
                            </motion.span>
                            Tech under the hood · {job.stack.length}
                        </button>
                        <AnimatePresence initial={false}>
                            {techOpen && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                    <div className="flex flex-wrap gap-2 pt-3">
                                        {job.stack.map((t) => (
                                            <span key={t} className="rounded-full border border-white/15 px-2.5 py-1 font-mono text-[11px] text-white/70">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.article>
    );
};

const Experience = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 60%', 'end 60%'] });
    const p = useSpring(scrollYProgress, { stiffness: 90, damping: 20 });
    const top = useTransform(p, (v) => `${v * 100}%`);
    const meters = useTransform(p, (v) => `${Math.round(v * 50)} / 50m`);

    return (
        <section id="experience" className="relative mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
            <SectionHeader id="experience" title="Laps swum." kicker="Four roles so far, newest first. Each one is a lap: push off, go hard, touch the wall, go again." />

            <div ref={ref} className="relative">
                {/* The lane */}
                <div className="absolute bottom-0 left-0 top-0 w-10 md:w-16">
                    <div className="lane-rope absolute inset-y-0 left-0 w-1.5 rounded-full opacity-70" />
                    <div className="lane-rope absolute inset-y-0 right-0 w-1.5 rounded-full opacity-70" />
                    <div
                        className="absolute inset-y-0 left-2 right-2"
                        style={{
                            background:
                                'linear-gradient(rgba(94,234,212,.08),rgba(34,211,238,.04)), repeating-linear-gradient(0deg, rgba(255,255,255,.05) 0 1px, transparent 1px 22px), repeating-linear-gradient(90deg, rgba(255,255,255,.05) 0 1px, transparent 1px 22px)',
                        }}
                    />
                    {/* black lane line on the pool floor, with the T at the end */}
                    <div className="absolute inset-y-6 left-1/2 w-2 -translate-x-1/2 rounded bg-black/50" />
                    <div className="absolute bottom-6 left-1/2 h-2 w-10 -translate-x-1/2 rounded bg-black/50" />

                    {/* wake */}
                    <motion.div
                        className="absolute left-1/2 top-0 w-6 origin-top -translate-x-1/2 bg-gradient-to-b from-transparent via-white/15 to-white/50"
                        style={{ height: top }}
                    />
                    {/* swimmer */}
                    <motion.div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ top }}>
                        <div className="relative">
                            <Swimmer />
                            <motion.span className="absolute left-full top-1/2 ml-3 hidden -translate-y-1/2 whitespace-nowrap rounded-full bg-sun px-2 py-0.5 font-mono text-[10px] font-bold text-black md:block">
                                {meters}
                            </motion.span>
                        </div>
                    </motion.div>
                </div>

                <div className="space-y-16 pl-16 md:space-y-24 md:pl-28">
                    {experience.map((job) => (
                        <div key={job.company} className="relative">
                            {/* wall touch marker */}
                            <motion.span
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true, margin: '-40%' }}
                                className="absolute -left-[60px] top-8 grid h-8 w-8 place-items-center rounded-full bg-sakura font-mono text-xs font-bold text-white shadow-[0_0_20px_#ff5c8a] md:-left-[96px]"
                            >
                                {job.lap}
                            </motion.span>
                            <CaseCard job={job} />
                        </div>
                    ))}

                    {/* Next lap CTA */}
                    <div className="relative">
                        <motion.button
                            onClick={() => scrollToId('contact')}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.02 }}
                            data-cursor="Hire"
                            className="group flex w-full items-center justify-between rounded-[28px] border-2 border-dashed border-aqua/40 p-6 text-left md:p-8"
                        >
                            <span>
                                <span className="block font-mono text-xs uppercase tracking-[0.3em] text-aqua">Lap {String(experience.length + 1).padStart(2, '0')}</span>
                                <span className="mt-2 block font-display text-2xl font-bold text-white md:text-3xl">Your team?</span>
                                <span className="mt-1 block text-white/60">I&apos;m warmed up and ready for the next heat.</span>
                            </span>
                            <ArrowRight className="text-aqua transition-transform group-hover:translate-x-2" size={28} />
                        </motion.button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
