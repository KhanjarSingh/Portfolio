import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import { experience } from '../../data/portfolio';
import { scrollToId } from '../../lib/scroll';
import { LITE } from '../../lib/media';

const ease = [0.2, 0.8, 0.2, 1];

const Summary = ({ parts, color }) => (
    <p className="text-lg font-medium leading-snug text-white/90 md:text-xl">
        {parts.map((t, i) =>
            i % 2 ? (
                <span key={i} className="font-semibold" style={{ color }}>
                    {t}
                </span>
            ) : (
                <span key={i}>{t}</span>
            ),
        )}
    </p>
);

const Role = ({ job }) => {
    const [c1] = job.color;

    return (
        <li className="relative grid gap-3 pl-10 md:grid-cols-[180px_1fr] md:gap-12 md:pl-0">
            {/* timeline dot */}
            <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: '-30% 0px' }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                className="absolute left-[7px] top-7 h-[18px] w-[18px] rounded-full border-[3px] border-[#061420] md:left-[195px]"
                style={{ background: c1, boxShadow: `0 0 0 4px ${c1}26` }}
            />

            {/* dates (desktop) */}
            <div className="hidden pt-6 text-right md:block">
                <p className="font-display text-base font-semibold text-white">{job.period}</p>
                <p className="mt-1 text-xs text-white/45">{job.type}</p>
            </div>

            <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, ease }}
                className="glass relative overflow-hidden rounded-3xl p-5 md:p-7"
            >

                {/* who */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                    {job.logo ? (
                        <span
                            className={`grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl ring-1 ring-white/10 ${job.logo.fill ? '' : 'p-2'}`}
                            style={{ background: job.logo.bg }}
                        >
                            <img src={job.logo.src} alt={`${job.company} logo`} className="h-full w-full object-contain" loading="lazy" />
                        </span>
                    ) : (
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/[0.08] font-display text-lg font-bold text-white/80 ring-1 ring-white/10">
                            {job.monogram}
                        </span>
                    )}
                    <div className="min-w-[60%] flex-1">
                        <h3 className="font-display text-xl font-bold text-white md:text-2xl">{job.company}</h3>
                        <p className="text-sm text-white/65">{job.role}</p>
                        <p className="mt-0.5 text-xs text-white/40 md:hidden">
                            {job.period} · {job.type}
                        </p>
                    </div>
                    {job.link && (
                        <a
                            href={job.link.href}
                            target="_blank"
                            rel="noreferrer"
                            data-cursor="Visit"
                            className="ml-[60px] flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold text-black sm:ml-0"
                            style={{ background: c1 }}
                        >
                            {job.link.label} <ArrowUpRight size={14} />
                        </a>
                    )}
                </div>

                {/* what, in one line */}
                <div className="mt-5">
                    <Summary parts={job.headline} color={c1} />
                    <p className="mt-1.5 text-sm text-white/45">{job.context}</p>
                </div>

                {/* outcomes */}
                <div className="mt-5 flex flex-wrap gap-2">
                    {job.metrics.map((m) => (
                        <span key={m.label} className="inline-flex items-baseline gap-2 rounded-full bg-white/[0.05] px-3.5 py-1.5 ring-1 ring-white/10">
                            <span className="font-display text-base font-bold" style={{ color: c1 }}>
                                {m.value}
                            </span>
                            <span className="text-xs text-white/60">{m.label}</span>
                        </span>
                    ))}
                </div>

                {/* what I did */}
                <ul className="mt-5 space-y-2.5">
                    {job.points.map((p) => (
                        <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-white/75">
                            <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full" style={{ background: `${c1}26`, color: c1 }}>
                                <Check size={10} strokeWidth={3.5} />
                            </span>
                            {p}
                        </li>
                    ))}
                </ul>

                <p className="mt-5 border-t border-white/10 pt-4 text-xs text-white/40">
                    <span className="text-white/60">Built with</span> {job.stack.join(' · ')}
                </p>
            </motion.article>
        </li>
    );
};

const Experience = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 70%'] });
    const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

    return (
        <section id="experience" className="relative mx-auto max-w-6xl px-5 py-28 md:px-10 md:py-40">
            <SectionHeader id="experience" title="Experience." kicker="Where I've worked, newest first." />

            <div ref={ref} className="relative">
                {/* the timeline line, filling as you scroll */}
                <div className="absolute bottom-6 left-[15px] top-6 w-[2px] rounded-full bg-white/10 md:left-[203px]">
                    <motion.div
                        className="h-full w-full origin-top rounded-full bg-white/35"
                        style={LITE ? undefined : { scaleY: fill }}
                    />
                </div>

                <ol className="space-y-8 md:space-y-12">
                    {experience.map((job) => (
                        <Role key={job.company} job={job} />
                    ))}
                </ol>

                {/* next role */}
                <div className="relative mt-8 grid pl-10 md:mt-12 md:grid-cols-[180px_1fr] md:gap-12 md:pl-0">
                    <span className="absolute left-[7px] top-6 h-[18px] w-[18px] rounded-full border-2 border-dashed border-aqua md:left-[195px]" />
                    <div className="hidden md:block" />
                    <button
                        onClick={() => scrollToId('contact')}
                        data-cursor="Hire"
                        className="group flex items-center justify-between rounded-3xl border-2 border-dashed border-aqua/35 px-5 py-4 text-left transition-colors hover:border-aqua/70 md:px-7"
                    >
                        <span>
                            <span className="block font-display text-lg font-bold text-white">Your team could be next.</span>
                            <span className="block text-sm text-white/50">Open to internships and freelance work.</span>
                        </span>
                        <ArrowRight className="shrink-0 text-aqua transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Experience;
