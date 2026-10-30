import { useRef } from 'react';
import { LITE } from '../../lib/media';
import { motion, useAnimationFrame, useInView, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';

const wrap = (min, max, v) => {
    const r = max - min;
    return ((((v - min) % r) + r) % r) + min;
};

// One strip of tape whose speed and skew follow how fast you scroll.
const MotionStrip = ({ items, speed = 3, tone = 'sakura', rotate = -3 }) => {
    const base = useMotionValue(0);
    const box = useRef(null);
    const visible = useInView(box, { margin: '100px' });
    const dir = useRef(speed > 0 ? 1 : -1);
    const { scrollY } = useScroll();
    const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
    const factor = useTransform(velocity, [-2000, 0, 2000], [-5, 0, 5], { clamp: false });
    const skew = useTransform(velocity, [-2500, 0, 2500], [8, 0, -8]);
    const x = useTransform(base, (v) => `${wrap(-50, 0, v)}%`);

    useAnimationFrame((_, delta) => {
        if (!visible) return;
        let move = dir.current * Math.abs(speed) * (delta / 1000);
        const f = factor.get();
        if (f < 0) dir.current = -Math.sign(speed);
        else if (f > 0) dir.current = Math.sign(speed);
        move += move * Math.abs(f);
        base.set(base.get() + move);
    });

    const styles =
        tone === 'sakura'
            ? 'bg-sakura text-white'
            : 'bg-aqua text-[#03141c]';

    // Two copies so the -50% wrap is seamless.
    const run = [...items, ...items];

    return (
        <div ref={box} className={`relative w-[110%] -translate-x-[5%] overflow-hidden py-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,.7)] ${styles}`} style={{ rotate: `${rotate}deg` }}>
            <motion.div className="flex w-max whitespace-nowrap will-change-transform" style={{ x, skewX: skew }}>
                {[0, 1].map((copy) => (
                    <div key={copy} className="flex shrink-0">
                        {run.map((t, i) => (
                            <span key={`${copy}-${i}`} className="flex items-center gap-6 pr-6 font-display text-3xl font-extrabold uppercase tracking-tight md:text-5xl">
                                <span className={i % 2 ? 'text-outline-dark' : ''}>{t}</span>
                                <span className="text-xl md:text-3xl">✦</span>
                            </span>
                        ))}
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

const TONES = { sakura: 'bg-sakura text-white', aqua: 'bg-aqua text-[#03141c]' };

// Phones: the same tape driven by a plain CSS animation, no per-frame JavaScript.
const CssStrip = ({ items, speed = 3, tone = 'sakura', rotate = -3 }) => {
    const box = useRef(null);
    const visible = useInView(box);
    return (
    <div ref={box} className={`relative w-[110%] -translate-x-[5%] overflow-hidden py-2.5 ${TONES[tone]}`} style={{ rotate: `${rotate}deg` }}>
        <div
            className="flex w-max whitespace-nowrap"
            style={{
                animation: `wave-drift ${items.length * 6}s linear infinite`,
                animationDirection: speed > 0 ? 'normal' : 'reverse',
                animationPlayState: visible ? 'running' : 'paused',
            }}
        >
            {[...items, ...items, ...items, ...items].map((t, i) => (
                <span key={i} className="flex items-center gap-5 pr-5 font-display text-2xl font-extrabold uppercase tracking-tight">
                    <span className={i % 2 ? 'text-outline-dark' : ''}>{t}</span>
                    <span className="text-lg">✦</span>
                </span>
            ))}
        </div>
    </div>
    );
};

const Strip = LITE ? CssStrip : MotionStrip;

// Two crossing tapes, like a manga panel break.
const Marquee = ({ top, bottom }) => (
    <div aria-hidden className="pointer-events-none relative z-10 flex h-32 flex-col justify-center overflow-hidden md:h-64">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
            <Strip items={top} speed={2.5} tone="sakura" rotate={-4} />
        </div>
        {bottom && !LITE && (
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-90">
                <Strip items={bottom} speed={-2} tone="aqua" rotate={3} />
            </div>
        )}
    </div>
);

export default Marquee;
