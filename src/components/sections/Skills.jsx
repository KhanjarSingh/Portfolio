import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import AppIcon from '../ui/AppIcon';
import { dock, skillFolders } from '../../data/portfolio';

const GRAD = new Date('2028-05-31T00:00:00+05:30');

const Folder = ({ folder, onOpen, jiggle, constraints, index, isOpen }) => (
    <motion.button
        drag={jiggle}
        dragConstraints={constraints}
        dragSnapToOrigin
        dragElastic={0.4}
        whileDrag={{ scale: 1.15, zIndex: 20 }}
        onClick={() => !jiggle && onOpen(folder.name)}
        data-cursor={jiggle ? 'Drag' : 'Open'}
        className="flex flex-col items-center gap-2"
        initial={{ opacity: 0, scale: 0.5, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08, type: 'spring', stiffness: 260, damping: 18 }}
    >
        <motion.span
            layoutId={isOpen ? undefined : `folder-${folder.name}`}
            className={`grid h-16 w-16 grid-cols-3 gap-0.5 rounded-[18px] bg-white/20 p-1.5 sm:h-[76px] sm:w-[76px] sm:gap-1 sm:p-2 md:h-[88px] md:w-[88px] ${jiggle ? 'jiggle' : ''} ${isOpen ? 'opacity-0' : ''}`}
            style={{ animationDelay: `${index * -0.07}s` }}
        >
            {folder.apps.slice(0, 9).map((a) => (
                <AppIcon key={a.name} app={a} size="100%" />
            ))}
        </motion.span>
        <span className="text-xs font-medium text-white drop-shadow">{folder.name}</span>
    </motion.button>
);

const GradWidget = () => {
    const days = Math.max(0, Math.ceil((GRAD - new Date()) / 86400000));
    return (
        <div className="col-span-2 flex flex-col justify-between rounded-[26px] bg-gradient-to-br from-[#ff5c8a] to-[#ff9a5c] p-4 text-white shadow-lg">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/80">Graduation</p>
            <div>
                <p className="font-display text-4xl font-extrabold leading-none">{days}</p>
                <p className="text-xs text-white/85">days to my B.Tech</p>
            </div>
        </div>
    );
};

const Ring = ({ r, color, pct, delay }) => (
    <motion.circle
        cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="9" strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: pct }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, delay, ease: [0.2, 0.7, 0.2, 1] }}
    />
);

const RingsWidget = () => (
    <div className="col-span-2 flex items-center gap-3 rounded-[26px] bg-black/70 p-4 shadow-lg">
        <svg viewBox="0 0 100 100" className="h-20 w-20 -rotate-90">
            {[[42, '#ff2d55'], [30, '#a3f900'], [18, '#00e5ff']].map(([r, c]) => (
                <circle key={r} cx="50" cy="50" r={r} fill="none" stroke={c} strokeOpacity=".2" strokeWidth="9" />
            ))}
            <Ring r={42} color="#ff2d55" pct={0.92} delay={0.1} />
            <Ring r={30} color="#a3f900" pct={0.8} delay={0.25} />
            <Ring r={18} color="#00e5ff" pct={0.66} delay={0.4} />
        </svg>
        <div className="space-y-0.5 text-xs font-semibold">
            <p className="text-[#ff2d55]">Code</p>
            <p className="text-[#a3f900]">Swim</p>
            <p className="text-[#00e5ff]">Anime</p>
        </div>
    </div>
);

const DockIcon = ({ app, mouseX }) => {
    const ref = useRef(null);
    const [bounce, setBounce] = useState(0);
    const dist = useTransform(mouseX, (v) => {
        const r = ref.current?.getBoundingClientRect();
        return r ? v - (r.left + r.width / 2) : Infinity;
    });
    const size = useSpring(useTransform(dist, [-160, 0, 160], [48, 84, 48]), { stiffness: 300, damping: 22, mass: 0.2 });

    return (
        <motion.button
            ref={ref}
            style={{ width: size, height: size }}
            onClick={() => setBounce((b) => b + 1)}
            className="group relative flex items-end justify-center"
            aria-label={app.name}
        >
            <span className="pointer-events-none absolute -top-10 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                {app.name}
            </span>
            <motion.span key={bounce} className="h-full w-full" animate={bounce ? { y: [0, -26, 0, -12, 0] } : {}} transition={{ duration: 0.7 }}>
                <AppIcon app={app} size="100%" />
            </motion.span>
        </motion.button>
    );
};

const Dock = () => {
    const mouseX = useMotionValue(Infinity);
    return (
        <div className="mt-14 flex justify-center">
            <motion.div
                onPointerMove={(e) => mouseX.set(e.clientX)}
                onPointerLeave={() => mouseX.set(Infinity)}
                className="glass flex h-[72px] max-w-full items-end gap-2 overflow-visible rounded-[24px] px-3 pb-3"
            >
                {dock.map((app) => (
                    <DockIcon key={app.name} app={app} mouseX={mouseX} />
                ))}
            </motion.div>
        </div>
    );
};

const Skills = () => {
    const [open, setOpen] = useState(null);
    const [jiggle, setJiggle] = useState(false);
    const board = useRef(null);
    const folder = skillFolders.find((f) => f.name === open);

    return (
        <section id="skills" className="relative mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
            <SectionHeader id="skills" title="Skills." kicker="My stack, laid out like a phone home screen. Tap a folder to see what's inside." />

            <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
                {/* The home screen */}
                <div
                    ref={board}
                    className="relative overflow-hidden rounded-[44px] border border-white/10 p-6 shadow-[0_40px_120px_-40px_rgba(0,0,0,.9)] md:p-10"
                    style={{
                        background:
                            'radial-gradient(120% 80% at 10% 0%, #22d3ee55, transparent 60%), radial-gradient(90% 70% at 100% 100%, #ff5c8a44, transparent 60%), linear-gradient(160deg,#0b3c52,#071a2a)',
                    }}
                >
                    <div className="mb-6 flex items-center justify-between text-xs font-semibold text-white/80">
                        <span>9:41</span>
                        <button
                            onClick={() => setJiggle((j) => !j)}
                            className="rounded-full bg-white/15 px-3 py-1 hover:bg-white/25"
                        >
                            {jiggle ? 'Done' : 'Edit'}
                        </button>
                    </div>

                    <div className="grid grid-cols-4 gap-x-2 gap-y-6 sm:gap-x-4">
                        <GradWidget />
                        <RingsWidget />
                        {skillFolders.map((f, i) => (
                            <Folder key={f.name} folder={f} index={i} onOpen={setOpen} jiggle={jiggle} constraints={board} isOpen={open === f.name} />
                        ))}
                    </div>

                    <p className="mt-8 text-center text-[11px] text-white/40">• • ◦</p>

                    <AnimatePresence>
                        {folder && (
                            <motion.div
                                className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/30 p-6 backdrop-blur-2xl"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setOpen(null)}
                            >
                                <motion.p
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="mb-5 font-display text-3xl font-bold text-white"
                                >
                                    {folder.name}
                                </motion.p>
                                <motion.div
                                    layoutId={`folder-${folder.name}`}
                                    onClick={(e) => e.stopPropagation()}
                                    className="grid w-full max-w-md grid-cols-3 gap-5 rounded-[34px] bg-white/20 p-6 sm:grid-cols-4"
                                >
                                    {folder.apps.map((a, i) => (
                                        <motion.div
                                            key={a.name}
                                            initial={{ opacity: 0, scale: 0.4 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.1 + i * 0.03, type: 'spring', stiffness: 400, damping: 20 }}
                                            whileHover={{ scale: 1.12, rotate: -4 }}
                                            className="flex flex-col items-center gap-1.5"
                                        >
                                            <AppIcon app={a} size={56} />
                                            <span className="text-center text-[11px] text-white">{a.name}</span>
                                        </motion.div>
                                    ))}
                                </motion.div>
                                <p className="mt-5 text-xs text-white/50">tap outside to close</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Text side */}
                <div className="space-y-6">
                    {skillFolders.map((f, i) => (
                        <motion.div
                            key={f.name}
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                        >
                            <button onClick={() => setOpen(f.name)} className="group w-full text-left" data-cursor="Open">
                                <p className="flex items-baseline justify-between border-b border-white/10 pb-2">
                                    <span className="font-display text-2xl font-bold text-white transition-colors group-hover:text-aqua">{f.name}</span>
                                    <span className="font-mono text-xs text-white/40">{String(f.apps.length).padStart(2, '0')} apps</span>
                                </p>
                                <p className="mt-2 text-sm text-white/55">{f.apps.map((a) => a.name).join(' · ')}</p>
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="hidden md:block">
                <Dock />
                <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">daily drivers · hover the dock</p>
            </div>
        </section>
    );
};

export default Skills;
