import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import ScrollText from '../ui/ScrollText';
import DevPass from '../about/DevPass';
import { status } from '../../data/portfolio';

const About = () => {
    const [popup, setPopup] = useState(null);

    return (
        <section id="about" className="relative mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
            <SectionHeader id="about" title="About me." kicker="Developer by day, swimmer by dawn, anime watcher by night." />

            <div className="grid items-start gap-14 lg:grid-cols-[1fr_1.05fr]">
                <div className="space-y-6 text-lg leading-relaxed text-white md:text-xl">
                    <ScrollText
                        segments={[
                            ["Hey, I'm"],
                            ['Parth.', 'font-semibold text-aqua'],
                            [
                                "I'm a computer science undergrad specialising in AI/ML, and I like building things people actually use: sports apps used by 500+ athletes, and pipelines that cut a full day of processing down to half an hour.",
                            ],
                        ]}
                    />
                    <ScrollText
                        segments={[
                            ['I work across the stack:'],
                            ['React, React Native, Node and Python,', 'text-aqua'],
                            [
                                "with a soft spot for interfaces that feel as smooth as the Apple ones I grew up admiring. Away from the keyboard you'll find me in the pool, on the volleyball court, or a few episodes deep into an anime arc.",
                            ],
                        ]}
                    />

                    <div className="pt-4">
                        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-aqua">Passive skills</p>
                        <div className="space-y-3">
                            {status.passives.map((p, i) => (
                                <motion.button
                                    key={p.name}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ x: 8 }}
                                    onClick={() => setPopup(p)}
                                    data-cursor="Equip"
                                    className="glass flex w-full items-center gap-4 rounded-2xl p-4 text-left"
                                >
                                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-sakura to-[#ff9a5c] font-jp text-lg font-black text-white">
                                        {['速', '錬', '集'][i]}
                                    </span>
                                    <span>
                                        <span className="block text-base font-semibold text-white">{p.name}</span>
                                        <span className="block text-sm text-white/55">{p.desc}</span>
                                    </span>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>

                <DevPass />
            </div>

            <AnimatePresence>
                {popup && (
                    <motion.div
                        className="fixed inset-0 z-[80] grid place-items-center bg-black/50 px-4 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setPopup(null)}
                    >
                        <motion.div
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            exit={{ scaleY: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                            className="w-full max-w-sm border border-cyan/70 bg-[#041a2e]/95 p-6 text-center font-mono shadow-[0_0_60px_rgba(34,211,238,.4)]"
                        >
                            <p className="text-xs tracking-[0.4em] text-cyan">[ SKILL ACQUIRED ]</p>
                            <p className="mt-4 font-display text-3xl font-extrabold text-white">{popup.name}</p>
                            <p className="mt-2 text-sm text-white/70">{popup.desc}</p>
                            <p className="mt-6 text-[10px] text-white/40">click anywhere to close</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default About;
