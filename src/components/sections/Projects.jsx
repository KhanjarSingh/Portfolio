import { memo, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Github, Lock } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import IPhone from '../projects/IPhone';
import { useIsDesktop } from '../../lib/media';
import { moreProjects, projects as allProjects } from '../../data/portfolio';

const projects = allProjects.filter((p) => p.featured);
const others = [...allProjects.filter((p) => !p.featured), ...moreProjects];

// Tilts the phone toward the cursor and keeps it gently floating.
const TiltPhone = ({ children }) => {
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const rotateY = useSpring(useTransform(mx, [-1, 1], [-16, 16]), { stiffness: 120, damping: 14 });
    const rotateX = useSpring(useTransform(my, [-1, 1], [12, -12]), { stiffness: 120, damping: 14 });

    useEffect(() => {
        const move = (e) => {
            mx.set((e.clientX / window.innerWidth) * 2 - 1);
            my.set((e.clientY / window.innerHeight) * 2 - 1);
        };
        window.addEventListener('pointermove', move, { passive: true });
        return () => window.removeEventListener('pointermove', move);
    }, [mx, my]);

    return (
        <div style={{ perspective: 1400 }}>
            <motion.div
                className="will-change-transform"
                style={{ rotateX, rotateY }}
                animate={{ y: [0, -10, 0] }}
                transition={{ y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
            >
                {children}
            </motion.div>
        </div>
    );
};

const ProjectBlock = memo(function ProjectBlock({ project, index, onActive }) {
    const ref = useRef(null);
    const inView = useInView(ref, { amount: 0.55 });

    useEffect(() => {
        if (inView) onActive(index);
    }, [inView, index, onActive]);

    return (
        <div ref={ref} className="flex min-h-[85vh] flex-col justify-center py-10">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
            >
                <div className="flex items-center gap-3 font-mono text-xs text-white/40">
                    <span style={{ color: project.accent }}>{String(index + 1).padStart(2, '0')}</span>
                    <span className="h-px w-8 bg-white/20" />
                    <span>{String(projects.length).padStart(2, '0')}</span>
                    <span className="ml-2 font-jp">{project.jp}</span>
                </div>

                <h3 className="group relative mt-4 font-display text-5xl font-extrabold tracking-tight text-white md:text-7xl">
                    <span className="relative z-10">{project.title}</span>
                    {/* manga-style offset shadow on hover */}
                    <span
                        aria-hidden
                        className="absolute left-0 top-0 -z-0 translate-x-0 translate-y-0 opacity-0 transition-all duration-300 group-hover:translate-x-1.5 group-hover:translate-y-1.5 group-hover:opacity-100"
                        style={{ color: project.accent }}
                    >
                        {project.title}
                    </span>
                </h3>
                <p className="mt-3 text-xl font-medium" style={{ color: project.accent }}>
                    {project.tagline}
                </p>
                <p className="mt-5 max-w-lg leading-relaxed text-white/70">{project.description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                    {project.stats.map((s) => (
                        <span key={s} className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white">
                            {s}
                        </span>
                    ))}
                </div>
                <p className="mt-4 font-mono text-xs text-white/45">{project.tech.join('  /  ')}</p>

                <div className="mt-8 flex flex-wrap gap-3">
                    {project.links.demo && (
                        <a
                            href={project.links.demo}
                            target="_blank"
                            rel="noreferrer"
                            data-cursor="Live"
                            className="group flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-black"
                            style={{ background: project.accent }}
                        >
                            Live demo <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </a>
                    )}
                    {project.links.repo ? (
                        <a
                            href={project.links.repo}
                            target="_blank"
                            rel="noreferrer"
                            data-cursor="Code"
                            className="glass flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white"
                        >
                            <Github size={16} /> Source
                        </a>
                    ) : (
                        <span className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm text-white/45">
                            <Lock size={14} /> Client code · private
                        </span>
                    )}
                </div>

            </motion.div>
        </div>
    );
});

// Phones: one pinned screen. Scrolling swaps the project, the phone changes app
// and the text rolls in, like the desktop sticky phone but on a single screen.
const PHONE = { w: 300, h: 620 };
// scroll distance per project, in svh: about one natural swipe
const STEP = 40;

const RollTitle = ({ text, color }) => (
    <h3 className="flex overflow-hidden font-display text-4xl font-extrabold tracking-tight text-white" aria-label={text}>
        {text.split('').map((ch, i) => (
            <motion.span
                key={i}
                aria-hidden
                className="inline-block whitespace-pre"
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{ duration: 0.35, delay: i * 0.025, ease: [0.2, 0.8, 0.2, 1] }}
                style={i === 0 ? { color } : undefined}
            >
                {ch}
            </motion.span>
        ))}
    </h3>
);

const MobileShowcase = () => {
    const ref = useRef(null);
    const [active, setActive] = useState(0);
    const [scale, setScale] = useState(0.5);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

    useMotionValueEvent(scrollYProgress, 'change', (v) => {
        // switch halfway between snap points, so each snap lands squarely on one project
        const i = Math.min(projects.length - 1, Math.max(0, Math.round(v * (projects.length - 1))));
        setActive((a) => (a === i ? a : i));
    });

    // size the phone to the screen height so everything fits in one view
    useEffect(() => {
        const fit = () => setScale(Math.min(0.62, (window.innerHeight * 0.4) / PHONE.h));
        fit();
        window.addEventListener('resize', fit);
        return () => window.removeEventListener('resize', fit);
    }, []);

    const p = projects[active];

    return (
        <div ref={ref} className="relative" style={{ height: `${100 + (projects.length - 1) * STEP}svh` }}>
            {/* gentle snap points (html.lite uses proximity snapping), one per project */}
            {projects.map((x, i) => (
                <span key={x.id} aria-hidden className="pointer-events-none absolute left-0 h-px w-px" style={{ top: `${i * STEP}svh`, scrollSnapAlign: 'start' }} />
            ))}
            <div className="sticky top-0 flex h-[100svh] flex-col justify-center gap-4 pb-6 pt-16">
                {/* progress */}
                <div className="flex items-center gap-2">
                    {projects.map((x, i) => (
                        <motion.span
                            key={x.id}
                            className="h-1 rounded-full"
                            animate={{ width: i === active ? 32 : 10, backgroundColor: i <= active ? x.accent : 'rgba(255,255,255,.2)' }}
                            transition={{ duration: 0.4 }}
                        />
                    ))}
                    <span className="ml-auto font-mono text-[11px] text-white/45">
                        {String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                    </span>
                </div>

                {/* the phone: its screen transitions between apps */}
                <div className="flex justify-center">
                    <div style={{ width: PHONE.w * scale, height: PHONE.h * scale }}>
                        <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
                            <IPhone screen={p.screen} accent={p.accent} />
                        </div>
                    </div>
                </div>

                {/* the text: rolls out and back in on every change. Fixed height so the phone never shifts. */}
                <div className="h-[210px]">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div key={p.id} exit={{ opacity: 0, transition: { duration: 0.2 } }}>
                        <div className="flex items-center gap-2 font-mono text-[11px] text-white/45">
                            <span style={{ color: p.accent }}>{p.jp}</span>
                            <span className="h-px w-6 bg-white/20" />
                            {p.tech.slice(0, 3).join(' · ')}
                        </div>
                        <RollTitle text={p.title} color={p.accent} />
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15, duration: 0.4 }}
                            className="mt-1 text-base font-medium"
                            style={{ color: p.accent }}
                        >
                            {p.tagline}
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25, duration: 0.4 }}
                            className="mt-3 flex flex-wrap gap-1.5"
                        >
                            {p.stats.map((st) => (
                                <span key={st} className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white">
                                    {st}
                                </span>
                            ))}
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 0.4 }}
                            className="mt-4 flex gap-2"
                        >
                            {p.links.demo && (
                                <a href={p.links.demo} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-black" style={{ background: p.accent }}>
                                    Live demo <ArrowUpRight size={15} />
                                </a>
                            )}
                            {p.links.repo ? (
                                <a href={p.links.repo} target="_blank" rel="noreferrer" className="glass flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white">
                                    <Github size={15} /> Source
                                </a>
                            ) : (
                                <span className="flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-sm text-white/45">
                                    <Lock size={13} /> Private
                                </span>
                            )}
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

// Everything else, revealed only if a visitor wants more.
const MoreProjects = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="mt-16 md:mt-24">
            <div className="flex justify-center">
                <motion.button
                    onClick={() => setOpen((o) => !o)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    data-cursor={open ? 'Less' : 'More'}
                    aria-expanded={open}
                    className="glass flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-semibold text-white"
                >
                    {open ? 'Show less' : `See ${others.length} more projects`}
                    <motion.span animate={{ rotate: open ? 180 : 0 }} className="inline-block text-aqua">
                        ↓
                    </motion.span>
                </motion.button>
            </div>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="grid gap-4 pt-10 sm:grid-cols-2 lg:grid-cols-4">
                            {others.map((p, i) => (
                                <motion.article
                                    key={p.title}
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.07 }}
                                    whileHover={{ y: -6 }}
                                    className="glass flex flex-col rounded-3xl p-5"
                                >
                                    <span className="h-1.5 w-10 rounded-full" style={{ background: p.accent ?? '#5eead4' }} />
                                    <h4 className="mt-4 font-display text-xl font-bold text-white">{p.title}</h4>
                                    <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">{p.tagline}</p>
                                    <p className="mt-4 font-mono text-[10px] text-white/40">{p.tech.join(' · ')}</p>
                                    <div className="mt-4 flex gap-2">
                                        {p.links.demo && (
                                            <a href={p.links.demo} target="_blank" rel="noreferrer" className="flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-black">
                                                Live <ArrowUpRight size={12} />
                                            </a>
                                        )}
                                        {p.links.repo && (
                                            <a href={p.links.repo} target="_blank" rel="noreferrer" className="flex items-center gap-1 rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/80">
                                                <Github size={12} /> Code
                                            </a>
                                        )}
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Projects = () => {
    const [active, setActive] = useState(0);
    const desktop = useIsDesktop();
    const project = projects[active];

    return (
        <section id="projects" className="relative mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
            <SectionHeader id="projects" title="Projects." kicker="My four favourites. Scroll and the phone switches apps; the screens are live, so tap around." />

            {!desktop && <MobileShowcase />}

            {desktop && (
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:gap-24">
                <div>
                    {projects.map((p, i) => (
                        <ProjectBlock key={p.id} project={p} index={i} onActive={setActive} />
                    ))}
                </div>

                <div>
                    <div className="sticky top-0 flex h-screen items-center">
                        <div className="relative">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={project.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -40 }}
                                    className="text-outline pointer-events-none absolute -left-24 -top-16 font-display text-[11rem] font-extrabold leading-none opacity-20"
                                >
                                    {String(active + 1).padStart(2, '0')}
                                </motion.p>
                            </AnimatePresence>
                            <TiltPhone>
                                <IPhone screen={project.screen} accent={project.accent} />
                            </TiltPhone>
                            <div className="mt-6 flex justify-center gap-2">
                                {projects.map((p, i) => (
                                    <motion.span
                                        key={p.id}
                                        className="h-1.5 rounded-full"
                                        animate={{ width: i === active ? 28 : 6, background: i === active ? p.accent : 'rgba(255,255,255,.25)' }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}
            <MoreProjects />
        </section>
    );
};

export default Projects;
