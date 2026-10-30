import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { profile } from '../../data/portfolio';
import { emit, scrollToId } from '../../lib/scroll';

const KELP = [6, 14, 22, 71, 79, 88, 95];

// The seabed: end of the dive.
const Footer = () => (
    <footer className="relative mt-10 overflow-hidden pb-10 pt-32">
        {/* kelp */}
        {KELP.map((left, i) => (
            <svg
                key={left}
                aria-hidden
                viewBox="0 0 40 200"
                className="absolute bottom-0 w-10 origin-bottom opacity-40"
                style={{ left: `${left}%`, height: 120 + (i % 3) * 50, animation: `sway ${3 + i * 0.5}s ease-in-out infinite` }}
            >
                <path d="M20 200 C 5 160, 35 130, 18 95 S 30 40, 20 0" stroke={i % 2 ? '#0e9488' : '#14b8a6'} strokeWidth="7" fill="none" strokeLinecap="round" />
            </svg>
        ))}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1a1408] to-transparent opacity-70" />

        <div className="relative mx-auto max-w-7xl px-5 text-center md:px-10">
            <p className="font-jp text-sm font-bold tracking-[0.5em] text-sakura">海底</p>
            <p className="mt-3 font-display text-4xl font-extrabold text-white md:text-6xl">You reached the seabed.</p>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.3em] text-white/40">−120m · 8°C · thanks for diving</p>

            <motion.button
                onClick={() => {
                    emit('bubbles');
                    scrollToId('surface');
                }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.95 }}
                data-cursor="Up"
                className="mx-auto mt-10 flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-black"
            >
                <ArrowUp size={18} /> Resurface
            </motion.button>

            <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row">
                <p>© {new Date().getFullYear()} {profile.name}. Designed &amp; built in Pune.</p>
                <p className="font-mono">
                    Press <kbd className="rounded bg-white/10 px-1.5 py-0.5">⌘K</kbd> · try ↑↑↓↓←→←→BA
                </p>
                <p className="flex items-center gap-2 font-display font-bold italic text-[#c9b38a]">
                    TO BE CONTINUED
                    <span className="inline-block h-0 w-0 border-y-[7px] border-l-[12px] border-y-transparent border-l-[#c9b38a]" />
                </p>
            </div>
        </div>
    </footer>
);

export default Footer;
