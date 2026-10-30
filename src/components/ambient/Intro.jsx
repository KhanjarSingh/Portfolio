import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { lockScroll } from '../../lib/scroll';

const STEPS = [
    { text: 'TAKE YOUR MARKS', jp: '位置について', lights: 1 },
    { text: 'GET SET', jp: '用意', lights: 2 },
    { text: 'GO!', jp: 'ドン!', lights: 3 },
];

const seen = () => {
    try {
        return sessionStorage.getItem('deepend-intro') === '1';
    } catch {
        return false;
    }
};

// Race-start countdown that ends in a splash. Shown once per session.
const Intro = () => {
    const [step, setStep] = useState(() => (seen() ? -1 : 0));
    const [splash, setSplash] = useState(false);

    useEffect(() => {
        if (seen()) return;
        lockScroll(true);
        const advance = (n) => () => setStep((s) => (s < 0 ? s : n));
        const timers = [
            setTimeout(advance(1), 750),
            setTimeout(advance(2), 1450),
            setTimeout(() => setSplash(true), 1900),
            setTimeout(() => setStep(-1), 2700),
        ];
        const skip = () => setStep(-1);
        window.addEventListener('keydown', skip);
        return () => {
            timers.forEach(clearTimeout);
            window.removeEventListener('keydown', skip);
        };
    }, []);

    useEffect(() => {
        if (step >= 0) return;
        lockScroll(false);
        try {
            sessionStorage.setItem('deepend-intro', '1');
        } catch {
            /* storage unavailable */
        }
    }, [step]);

    const current = STEPS[Math.max(step, 0)];

    return (
        <AnimatePresence>
            {step >= 0 && (
                <motion.div
                    className="fixed inset-0 z-[200] grid place-items-center overflow-hidden bg-abyss"
                    exit={{ clipPath: 'circle(0% at 50% 50%)' }}
                    initial={{ clipPath: 'circle(150% at 50% 50%)' }}
                    transition={{ duration: 0.8, ease: [0.7, 0, 0.2, 1] }}
                    onClick={() => setStep(-1)}
                >
                    <div className="lane-rope-h absolute inset-x-0 top-[22%] h-2 opacity-40" />
                    <div className="lane-rope-h absolute inset-x-0 bottom-[22%] h-2 opacity-40" />

                    <div className="text-center">
                        <div className="mb-10 flex justify-center gap-4">
                            {[1, 2, 3].map((n) => (
                                <motion.span
                                    key={n}
                                    className="h-5 w-5 rounded-full"
                                    animate={{
                                        backgroundColor:
                                            current.lights >= n ? (current.lights === 3 ? '#5eead4' : '#ff5c8a') : 'rgba(255,255,255,.1)',
                                        boxShadow:
                                            current.lights >= n
                                                ? `0 0 30px ${current.lights === 3 ? '#5eead4' : '#ff5c8a'}`
                                                : '0 0 0 transparent',
                                    }}
                                />
                            ))}
                        </div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ y: 40, opacity: 0, skewY: 6 }}
                                animate={{ y: 0, opacity: 1, skewY: 0 }}
                                exit={{ y: -40, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <p className="font-jp text-sm font-bold tracking-[0.4em] text-sakura">{current.jp}</p>
                                <p className="mt-2 font-display text-5xl font-extrabold tracking-tight text-white md:text-8xl">{current.text}</p>
                            </motion.div>
                        </AnimatePresence>
                        <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.4em] text-white/30">press any key to skip</p>
                    </div>

                    <AnimatePresence>
                        {splash && (
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-b from-cyan to-pool"
                                initial={{ clipPath: 'circle(0% at 50% 60%)' }}
                                animate={{ clipPath: 'circle(150% at 50% 60%)' }}
                                transition={{ duration: 0.7, ease: [0.7, 0, 0.2, 1] }}
                            />
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Intro;
