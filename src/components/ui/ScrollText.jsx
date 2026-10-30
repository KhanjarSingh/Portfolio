import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Word = ({ children, range, progress, className }) => {
    const opacity = useTransform(progress, range, [0.15, 1]);
    return (
        <motion.span style={{ opacity }} className={className}>
            {children}{' '}
        </motion.span>
    );
};

// Paragraph whose words light up one by one as you scroll through it.
// `segments` is a list of [text, className?] so parts can be highlighted.
const ScrollText = ({ segments, className = '' }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] });
    const words = segments.flatMap(([text, cls]) => text.split(' ').filter(Boolean).map((w) => [w, cls]));

    return (
        <p ref={ref} className={className}>
            {words.map(([w, cls], i) => {
                const start = i / words.length;
                return (
                    <Word key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]} className={cls}>
                        {w}
                    </Word>
                );
            })}
        </p>
    );
};

export default ScrollText;
