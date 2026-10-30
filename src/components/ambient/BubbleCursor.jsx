import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// A glassy bubble cursor that leaves a trail of tiny rising bubbles.
const BubbleCursor = () => {
    const [enabled] = useState(
        () => window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    );
    const [hover, setHover] = useState(null);
    const [down, setDown] = useState(false);
    const trail = useRef(null);
    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    const sx = useSpring(x, { stiffness: 500, damping: 38, mass: 0.5 });
    const sy = useSpring(y, { stiffness: 500, damping: 38, mass: 0.5 });

    useEffect(() => {
        if (!enabled) return;
        document.documentElement.classList.add('bubble-cursor');
        let last = 0;

        const spawn = (cx, cy, size, drift) => {
            const b = document.createElement('span');
            b.className = 'pointer-events-none fixed rounded-full border border-white/50';
            Object.assign(b.style, {
                left: `${cx}px`,
                top: `${cy}px`,
                width: `${size}px`,
                height: `${size}px`,
                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,.7), rgba(94,234,212,.08) 65%)',
                transition: 'transform 1s cubic-bezier(.2,.7,.3,1), opacity 1s ease-out',
                transform: 'translate(-50%,-50%)',
            });
            trail.current?.appendChild(b);
            requestAnimationFrame(() => {
                b.style.transform = `translate(calc(-50% + ${drift}px), calc(-50% - ${30 + Math.random() * 40}px))`;
                b.style.opacity = '0';
            });
            setTimeout(() => b.remove(), 1000);
        };

        const move = (e) => {
            x.set(e.clientX);
            y.set(e.clientY);
            const now = performance.now();
            if (now - last > 45) {
                last = now;
                spawn(e.clientX, e.clientY, 3 + Math.random() * 6, (Math.random() - 0.5) * 20);
            }
            const target = e.target.closest?.('a, button, [data-cursor], input, textarea');
            setHover(target ? target.getAttribute('data-cursor') || '' : null);
        };
        const press = (e) => {
            setDown(true);
            for (let i = 0; i < 8; i++) spawn(e.clientX, e.clientY, 4 + Math.random() * 8, (Math.random() - 0.5) * 80);
        };
        const release = () => setDown(false);

        window.addEventListener('pointermove', move);
        window.addEventListener('pointerdown', press);
        window.addEventListener('pointerup', release);
        return () => {
            document.documentElement.classList.remove('bubble-cursor');
            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerdown', press);
            window.removeEventListener('pointerup', release);
        };
    }, [enabled, x, y]);

    if (!enabled) return null;

    const size = hover !== null ? (hover ? 76 : 48) : 26;

    return (
        <>
            <div ref={trail} className="pointer-events-none fixed inset-0 z-[9998]" />
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full border border-white/60 text-[10px] font-mono font-bold uppercase tracking-widest text-white"
                style={{
                    x: sx,
                    y: sy,
                    translateX: '-50%',
                    translateY: '-50%',
                    background: 'radial-gradient(circle at 30% 28%, rgba(255,255,255,.45), rgba(94,234,212,.12) 45%, rgba(34,211,238,.06) 70%)',
                    boxShadow: 'inset -3px -4px 10px rgba(94,234,212,.25), 0 0 20px rgba(94,234,212,.25)',
                }}
                animate={{ width: size, height: size, scale: down ? 0.8 : 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
                {hover}
            </motion.div>
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-aqua"
                style={{ x, y, translateX: '-50%', translateY: '-50%' }}
            />
        </>
    );
};

export default BubbleCursor;
