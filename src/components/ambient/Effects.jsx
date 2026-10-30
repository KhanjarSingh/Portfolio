import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { emit, useEvent } from '../../lib/scroll';
import Swimmer from '../ui/Swimmer';

const KONAMI = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];

// Easter eggs: Limit Break (Konami), bubble storm, and a swimmer who crosses the screen.
const Effects = () => {
    const [limit, setLimit] = useState(false);
    const [swimmers, setSwimmers] = useState([]);
    const [toast, setToast] = useState(null);
    const layer = useRef(null);

    const notify = useCallback((text) => {
        setToast(text);
        setTimeout(() => setToast(null), 3200);
    }, []);

    const limitBreak = useCallback(() => {
        setLimit(true);
        document.getElementById('main')?.classList.add('shake');
        notify('Hidden skill unlocked: LIMIT BREAK');
        setTimeout(() => document.getElementById('main')?.classList.remove('shake'), 1300);
        setTimeout(() => setLimit(false), 3600);
    }, [notify]);

    const bubbles = useCallback(() => {
        const root = layer.current;
        if (!root) return;
        for (let i = 0; i < 70; i++) {
            const b = document.createElement('span');
            const size = 6 + Math.random() * 30;
            Object.assign(b.style, {
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                bottom: '-40px',
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: '999px',
                border: '1px solid rgba(255,255,255,.5)',
                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,.7), rgba(94,234,212,.08) 65%)',
                animation: `rise ${2.5 + Math.random() * 2.5}s cubic-bezier(.3,.6,.4,1) ${Math.random() * 0.8}s forwards`,
            });
            root.appendChild(b);
            setTimeout(() => b.remove(), 6000);
        }
    }, []);

    const swim = useCallback(() => {
        const id = Date.now();
        setSwimmers((s) => [...s, { id, top: 20 + Math.random() * 60 }]);
        setTimeout(() => setSwimmers((s) => s.filter((x) => x.id !== id)), 4200);
    }, []);

    useEvent('limitbreak', limitBreak);
    useEvent('bubbles', bubbles);
    useEvent('swim', swim);
    useEvent('toast', notify);

    useEffect(() => {
        let seq = [];
        let typed = '';
        const key = (e) => {
            if (e.target.closest?.('input, textarea')) return;
            const k = e.key.toLowerCase();
            seq = [...seq, k].slice(-KONAMI.length);
            if (seq.join() === KONAMI.join()) {
                seq = [];
                emit('limitbreak');
            }
            typed = (typed + k).slice(-5);
            if (typed.endsWith('swim')) emit('swim');
        };
        window.addEventListener('keydown', key);
        return () => window.removeEventListener('keydown', key);
    }, []);

    // Water ripple rings wherever you click or tap.
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const ring = (x, y, size, delay) => {
            const r = document.createElement('span');
            Object.assign(r.style, {
                position: 'fixed',
                left: `${x}px`,
                top: `${y}px`,
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: '999px',
                border: '1.5px solid rgba(94,234,212,.8)',
                boxShadow: '0 0 12px rgba(94,234,212,.4)',
                pointerEvents: 'none',
                zIndex: 9997,
                opacity: 0,
                animation: `ripple-ring .9s cubic-bezier(.2,.7,.3,1) ${delay}s forwards`,
            });
            document.body.appendChild(r);
            setTimeout(() => r.remove(), 1200 + delay * 1000);
        };
        const down = (e) => {
            ring(e.clientX, e.clientY, 90, 0);
            ring(e.clientX, e.clientY, 150, 0.12);
        };
        window.addEventListener('pointerdown', down);
        return () => window.removeEventListener('pointerdown', down);
    }, []);

    return (
        <>
            <div ref={layer} className="pointer-events-none fixed inset-0 z-[90] overflow-hidden" />

            <AnimatePresence>
                {limit && (
                    <motion.div
                        className="pointer-events-none fixed inset-0 z-[95] grid place-items-center overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="speed-lines absolute -inset-1/2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 6, ease: 'linear', repeat: Infinity }}
                        />
                        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,92,138,.25),transparent_60%)]" />
                        <motion.div
                            initial={{ scale: 3, rotate: -14, opacity: 0 }}
                            animate={{ scale: 1, rotate: -6, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 260, damping: 14 }}
                            className="relative text-center"
                        >
                            <p className="font-jp text-[18vw] font-black leading-none text-white drop-shadow-[6px_6px_0_#ff5c8a] md:text-[12vw]">
                                限界突破
                            </p>
                            <p className="mt-2 font-display text-4xl font-extrabold italic tracking-tight text-sun md:text-6xl">
                                LIMIT BREAK!!
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {swimmers.map((s) => (
                <motion.div
                    key={s.id}
                    className="pointer-events-none fixed z-[90] flex items-center"
                    style={{ top: `${s.top}%` }}
                    initial={{ x: '-20vw' }}
                    animate={{ x: '120vw' }}
                    transition={{ duration: 4, ease: 'easeInOut' }}
                >
                    <span className="h-1 w-40 rounded-full bg-gradient-to-r from-transparent to-white/60 blur-[2px]" />
                    <motion.span
                        className="text-5xl"
                        animate={{ y: [0, -6, 0, 6, 0], rotate: [0, -4, 0, 4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                    >
                        <span className="inline-block -rotate-90">
                            <Swimmer />
                        </span>
                    </motion.span>
                </motion.div>
            ))}

            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ x: 40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 40, opacity: 0 }}
                        className="fixed bottom-6 right-6 z-[96] max-w-xs border border-cyan/60 bg-[#06223a]/90 px-4 py-3 font-mono text-xs text-cyan shadow-[0_0_30px_rgba(34,211,238,.35)] backdrop-blur"
                    >
                        <span className="text-white/50">[SYSTEM]</span> {toast}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Effects;
