import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LITE } from '../../lib/media';

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
// Phones: render the paragraph as-is (one motion value per word is too much per scroll frame).
const PlainText = ({ segments, className = '' }) => (
    <p className={className}>
        {segments.map(([text, cls], i) => (
            <span key={i} className={cls}>
                {text}{' '}
            </span>
        ))}
    </p>
);

const AnimatedText = ({ segments, className = '' }) => {
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

const ScrollText = LITE ? PlainText : AnimatedText;

export default ScrollText;
