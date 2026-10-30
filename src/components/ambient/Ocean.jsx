import { motion, useScroll, useTransform } from 'framer-motion';

const rand = (min, max) => min + Math.random() * (max - min);

const BUBBLES = Array.from({ length: 14 }, () => ({
    left: rand(0, 100),
    size: rand(3, 12),
    duration: rand(10, 22),
    delay: -rand(0, 22),
}));

const GLOW = Array.from({ length: 24 }, () => ({
    left: rand(0, 100),
    top: rand(0, 100),
    size: rand(2, 4),
    duration: rand(3, 6),
    delay: -rand(0, 6),
    hue: Math.random() > 0.7 ? '#ff5c8a' : '#5eead4',
}));

// Colour stops of the dive, top to bottom. Each is a full-screen layer whose opacity
// is driven by scroll, so the "deepening" is a GPU cross-fade instead of a repaint.
const LAYERS = [
    { color: '#0a3b4f', range: [0.1, 0.22] },
    { color: '#072636', range: [0.3, 0.5] },
    { color: '#04121c', range: [0.6, 0.8] },
    { color: '#030b16', range: [0.85, 1] },
];

const Layer = ({ color, range, progress }) => {
    const opacity = useTransform(progress, range, [1, 0]);
    return <motion.div className="absolute inset-0 will-change-[opacity]" style={{ backgroundColor: color, opacity }} />;
};

// Fixed backdrop that gets darker the deeper you scroll.
const Ocean = () => {
    const { scrollYProgress } = useScroll();
    const raysOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const glowOpacity = useTransform(scrollYProgress, [0.45, 0.9], [0, 1]);

    return (
        <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-[#010409]">
            {/* deepest layer first so shallower colours sit on top and fade out */}
            {[...LAYERS].reverse().map((l) => (
                <Layer key={l.color} {...l} progress={scrollYProgress} />
            ))}

            {/* God rays: soft gradients, no blur filter */}
            <motion.div className="absolute inset-x-0 top-0 h-[90vh] will-change-[opacity]" style={{ opacity: raysOpacity }}>
                {[8, 26, 47, 66, 84].map((left, i) => (
                    <div
                        key={left}
                        className="absolute top-[-10%] h-full origin-top will-change-transform"
                        style={{
                            left: `${left}%`,
                            width: `${90 + i * 30}px`,
                            background: 'linear-gradient(90deg, transparent, rgba(180,245,255,0.12) 50%, transparent)',
                            maskImage: 'linear-gradient(180deg, black, transparent)',
                            WebkitMaskImage: 'linear-gradient(180deg, black, transparent)',
                            animation: `rays ${7 + i * 1.7}s ease-in-out ${i * 0.8}s infinite`,
                        }}
                    />
                ))}
            </motion.div>

            {/* Bioluminescence in the deep (pure CSS animations) */}
            <motion.div className="absolute inset-0 will-change-[opacity]" style={{ opacity: glowOpacity }}>
                {GLOW.map((g, i) => (
                    <span
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            left: `${g.left}%`,
                            top: `${g.top}%`,
                            width: g.size,
                            height: g.size,
                            background: g.hue,
                            boxShadow: `0 0 ${g.size * 3}px ${g.hue}`,
                            animation: `twinkle ${g.duration}s ease-in-out ${g.delay}s infinite`,
                        }}
                    />
                ))}
            </motion.div>

            {/* Rising bubbles */}
            {BUBBLES.map((b, i) => (
                <span
                    key={i}
                    className="absolute bottom-[-20px] rounded-full border border-white/30 will-change-transform"
                    style={{
                        left: `${b.left}%`,
                        width: b.size,
                        height: b.size,
                        background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.55), rgba(255,255,255,0.05) 60%)',
                        animation: `rise ${b.duration}s linear ${b.delay}s infinite`,
                    }}
                />
            ))}
        </div>
    );
};

export default Ocean;
