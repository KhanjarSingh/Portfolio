import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useTransform } from 'framer-motion';
import { Command, FileDown } from 'lucide-react';
import { MAX_DEPTH, profile, sections } from '../../data/portfolio';
import Glyph from '../ui/Glyph';
import { emit, scrollToId, useActiveSection, useDepth } from '../../lib/scroll';

const spring = { type: 'spring', stiffness: 420, damping: 32 };
const ICONS = { surface: 'Waves', about: 'Gamepad2', skills: 'LayoutGrid', experience: 'Timer', projects: 'Rocket', medals: 'Medal', contact: 'MessageCircle' };

// iPhone-style Dynamic Island: shows the live section + depth, expands into the nav.
const DynamicIsland = () => {
    const [open, setOpen] = useState(false);
    const activeId = useActiveSection();
    const active = sections.find((s) => s.id === activeId) ?? sections[0];
    const index = sections.indexOf(active);
    const meters = useDepth();
    const depth = useTransform(meters, (m) => `−${Math.round(m)}m`);
    const ring = useTransform(meters, (m) => m / MAX_DEPTH);

    const navRef = useRef(null);

    // Briefly expand like an iOS Live Activity whenever the section changes.
    const [seen, setSeen] = useState(activeId);
    const [flash, setFlash] = useState(false);
    if (seen !== activeId) {
        setSeen(activeId);
        setFlash(true);
    }
    useEffect(() => {
        if (!flash) return;
        const t = setTimeout(() => setFlash(false), 1600);
        return () => clearTimeout(t);
    }, [flash, activeId]);

    useEffect(() => {
        if (!open) return;
        const close = (e) => {
            if (!navRef.current?.contains(e.target)) setOpen(false);
        };
        document.addEventListener('pointerdown', close);
        return () => document.removeEventListener('pointerdown', close);
    }, [open]);

    const go = (id) => {
        setOpen(false);
        scrollToId(id);
    };

    return (
        <div className="fixed inset-x-0 top-3 z-50 flex justify-center px-4">
            <motion.nav
                ref={navRef}
                layout
                transition={spring}
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                className="overflow-hidden bg-black text-white shadow-[0_10px_40px_-10px_rgba(0,0,0,.8)] ring-1 ring-white/10"
                style={{ borderRadius: open ? 30 : 999 }}
            >
                <AnimatePresence mode="popLayout" initial={false}>
                    {!open ? (
                        <motion.button
                            key="compact"
                            layout="position"
                            initial={{ opacity: 0, filter: 'blur(6px)' }}
                            animate={{ opacity: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, filter: 'blur(6px)' }}
                            onClick={() => setOpen(true)}
                            data-cursor="Menu"
                            className={`flex items-center gap-3 pl-2 pr-4 ${flash ? 'h-14' : 'h-10'}`}
                            aria-label="Open navigation"
                        >
                            {flash ? (
                                <motion.span
                                    key={`flash-${active.id}`}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex items-center gap-3 pr-2"
                                >
                                    <motion.span
                                        initial={{ rotate: -30, scale: 0.4 }}
                                        animate={{ rotate: 0, scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                                        className="block"
                                    >
                                        <Glyph name={ICONS[active.id]} />
                                    </motion.span>
                                    <span className="text-left leading-tight">
                                        <span className="block font-mono text-[9px] uppercase tracking-[0.25em] text-white/45">Now entering</span>
                                        <span className="block text-base font-semibold">
                                            {active.label} <span className="font-jp text-xs text-white/40">{active.jp}</span>
                                        </span>
                                    </span>
                                    <span className="ml-6 font-mono text-sm text-aqua">−{active.depth}m</span>
                                </motion.span>
                            ) : (
                            <>
                            <svg width="26" height="26" viewBox="0 0 26 26" className="-rotate-90">
                                <circle cx="13" cy="13" r="10" stroke="rgba(255,255,255,.12)" strokeWidth="3" fill="none" />
                                <motion.circle
                                    cx="13" cy="13" r="10" stroke="#5eead4" strokeWidth="3" fill="none" strokeLinecap="round"
                                    style={{ pathLength: ring }}
                                />
                            </svg>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={active.id}
                                    initial={{ y: 12, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -12, opacity: 0 }}
                                    className="flex items-baseline gap-2 text-sm font-semibold"
                                >
                                    <span className="font-mono text-[10px] text-white/40">0{index}</span>
                                    {active.label}
                                    <span className="hidden font-jp text-[10px] text-white/40 sm:inline">{active.jp}</span>
                                </motion.span>
                            </AnimatePresence>
                            <span className="ml-3 h-1.5 w-1.5 animate-pulse rounded-full bg-sakura" />
                            <motion.span className="w-12 text-right font-mono text-xs tabular-nums text-aqua">{depth}</motion.span>
                            </>
                            )}
                        </motion.button>
                    ) : (
                        <motion.div
                            key="expanded"
                            layout="position"
                            initial={{ opacity: 0, filter: 'blur(8px)', scale: 0.9 }}
                            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                            exit={{ opacity: 0, filter: 'blur(8px)', scale: 0.9 }}
                            className="w-[min(92vw,560px)] p-3"
                        >
                            <div className="mb-2 flex items-center justify-between px-2 pt-1">
                                <div>
                                    <p className="font-display text-base font-bold">{profile.name}</p>
                                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-aqua">
                                        Dive log · <motion.span>{depth}</motion.span>
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            setOpen(false);
                                            emit('spotlight');
                                        }}
                                        className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-xs hover:bg-white/20"
                                    >
                                        <Command size={12} /> K
                                    </button>
                                    <a
                                        href={profile.resume}
                                        target="_blank"
                                        rel="noreferrer"
                                        data-cursor="CV"
                                        className="flex items-center gap-1 rounded-full bg-aqua px-3 py-1.5 text-xs font-semibold text-black"
                                    >
                                        <FileDown size={12} /> Resume
                                    </a>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
                                {sections.map((s, i) => (
                                    <motion.button
                                        key={s.id}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.03 * i }}
                                        onClick={() => go(s.id)}
                                        className={`group rounded-2xl p-3 text-left transition-colors ${
                                            s.id === activeId ? 'bg-aqua/15 ring-1 ring-aqua/40' : 'bg-white/5 hover:bg-white/10'
                                        }`}
                                    >
                                        <span className="block font-mono text-[10px] text-white/40">−{s.depth}m</span>
                                        <span className="block text-sm font-semibold">{s.label}</span>
                                        <span className="block font-jp text-[10px] text-white/40 group-hover:text-sakura">{s.jp}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </div>
    );
};

export default DynamicIsland;
