import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { sections } from '../../data/portfolio';
import { LITE } from '../../lib/media';

const ease = [0.2, 0.8, 0.2, 1];

// Section number + depth + title, with a giant katakana watermark drifting behind it.
const SectionHeader = ({ id, title, kicker }) => {
    const ref = useRef(null);
    const s = sections.find((x) => x.id === id);
    const lane = String(sections.indexOf(s)).padStart(2, '0');
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const x = useTransform(scrollYProgress, [0, 1], ['12%', '-18%']);
    const words = title.split(' ');

    return (
        <div ref={ref} className="relative mb-14 md:mb-20">
            {/* decorative watermark: desktop only (costly to paint on phones, barely visible there) */}
            {!LITE && (
                <motion.p
                    aria-hidden
                    style={{ x }}
                    className="pointer-events-none absolute -top-16 left-0 select-none whitespace-nowrap font-jp text-[11vw] font-black leading-none text-white/[0.04]"
                >
                    {s.jp}
                </motion.p>
            )}

            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="relative">
                <motion.div
                    variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease } } }}
                    className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-aqua"
                >
                    <span className="rounded-full border border-aqua/40 px-2.5 py-1">{lane}</span>
                    <motion.span
                        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.8, ease, delay: 0.2 } } }}
                        className="h-px w-10 origin-left bg-aqua/40"
                    />
                    <span className="text-white/40">−{s.depth}m</span>
                </motion.div>

                <h2 aria-label={title} className="font-display text-5xl font-extrabold tracking-tight text-white md:text-7xl">
                    {words.map((word, wi) => (
                        <span key={wi} aria-hidden className="mr-[0.25em] inline-flex overflow-hidden pb-[0.1em] last:mr-0">
                            {word.split('').map((ch, ci) => (
                                <motion.span
                                    key={ci}
                                    className="inline-block"
                                    variants={{
                                        hidden: { y: '110%', rotate: 6 },
                                        show: { y: 0, rotate: 0, transition: { duration: 0.75, ease, delay: 0.1 + (wi * 5 + ci) * 0.03 } },
                                    }}
                                >
                                    {ch}
                                </motion.span>
                            ))}
                        </span>
                    ))}
                </h2>

                {kicker && (
                    <motion.p
                        variants={{ hidden: { opacity: 0, y: 16, filter: 'blur(6px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease, delay: 0.45 } } }}
                        className="mt-4 max-w-xl text-base text-ink md:text-lg"
                    >
                        {kicker}
                    </motion.p>
                )}
            </motion.div>
        </div>
    );
};

export default SectionHeader;
