import { motion, useSpring, useTransform } from 'framer-motion';
import { MAX_DEPTH, sections } from '../../data/portfolio';
import { scrollToId, useActiveSection, useDepth } from '../../lib/scroll';

// Dive-computer style depth gauge pinned to the right edge.
const DepthGauge = () => {
    const smooth = useSpring(useDepth(), { stiffness: 120, damping: 24 });
    const top = useTransform(smooth, (m) => `${(m / MAX_DEPTH) * 100}%`);
    const depth = useTransform(smooth, (m) => m.toFixed(1));
    const temp = useTransform(smooth, (m) => `${(27 - (m / MAX_DEPTH) * 19).toFixed(0)}°C`);
    const activeId = useActiveSection();

    return (
        <aside className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block" aria-label="Depth gauge">
            <div className="relative h-[56vh] w-14">
                <div className="absolute right-3 top-0 h-full w-px bg-white/15" />
                {Array.from({ length: 25 }, (_, i) => (
                    <div
                        key={i}
                        className="absolute right-3 h-px bg-white/25"
                        style={{ top: `${(i / 24) * 100}%`, width: i % 4 === 0 ? 12 : 6 }}
                    />
                ))}
                {sections.map((s) => (
                    <button
                        key={s.id}
                        onClick={() => scrollToId(s.id)}
                        data-cursor="Dive"
                        className="group absolute right-[76px] -translate-y-1/2 text-right"
                        style={{ top: `${(s.depth / MAX_DEPTH) * 100}%` }}
                    >
                        <span
                            className={`whitespace-nowrap font-mono text-[10px] uppercase tracking-widest transition-all ${
                                s.id === activeId ? 'text-aqua opacity-0 group-hover:opacity-100 2xl:opacity-100' : 'text-white/30 opacity-0 group-hover:opacity-100'
                            }`}
                        >
                            {s.label}
                        </span>
                    </button>
                ))}
                <motion.div className="absolute right-0 -translate-y-1/2" style={{ top }}>
                    <div className="flex items-center gap-1">
                        <div className="glass rounded-lg px-2 py-1 text-right">
                            <motion.p className="font-mono text-xs font-bold tabular-nums text-white">{depth}</motion.p>
                            <motion.p className="font-mono text-[9px] text-aqua">{temp}</motion.p>
                        </div>
                        <div className="h-0 w-0 border-y-[5px] border-l-[7px] border-y-transparent border-l-aqua" />
                    </div>
                </motion.div>
            </div>
            <p className="mt-3 text-right font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">depth · m</p>
        </aside>
    );
};

export default DepthGauge;
