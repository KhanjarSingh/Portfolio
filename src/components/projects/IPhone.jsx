import { AnimatePresence, motion } from 'framer-motion';
import ProjectScreen from './Screens';

// A CSS iPhone with Dynamic Island; the screen transitions between projects.
const IPhone = ({ screen, accent = '#5eead4', className = '' }) => {
    return (
        <div className={`relative ${className}`}>
            <div className="absolute -inset-24 -z-10 transition-[background] duration-700" style={{ background: `radial-gradient(closest-side, ${accent}50, transparent)` }} />
            {/* side buttons */}
            <span className="absolute -left-[3px] top-[110px] h-8 w-[3px] rounded-l bg-[#6b7680]" />
            <span className="absolute -left-[3px] top-[160px] h-14 w-[3px] rounded-l bg-[#6b7680]" />
            <span className="absolute -left-[3px] top-[230px] h-14 w-[3px] rounded-l bg-[#6b7680]" />
            <span className="absolute -right-[3px] top-[180px] h-20 w-[3px] rounded-r bg-[#6b7680]" />

            <div
                className="relative h-[620px] w-[300px] rounded-[54px] p-[10px] shadow-[0_50px_100px_-30px_rgba(0,0,0,.9)]"
                style={{ background: 'linear-gradient(145deg,#9aa6b0,#3c454d 30%,#1b2025 60%,#8b97a1)' }}
            >
                <div className="relative h-full w-full overflow-hidden rounded-[45px] bg-black ring-[3px] ring-black">
                    <AnimatePresence initial={false}>
                        <motion.div
                            key={screen}
                            className="absolute inset-0"
                            initial={{ y: 60, opacity: 0, scale: 0.92 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: -40, opacity: 0, scale: 1.04 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 26 }}
                        >
                            <ProjectScreen screen={screen} />
                        </motion.div>
                    </AnimatePresence>
                    {/* Dynamic Island */}
                    <div className="absolute left-1/2 top-[11px] z-10 h-[28px] w-[88px] -translate-x-1/2 rounded-full bg-black" />
                    {/* home indicator */}
                    <div className="absolute bottom-2 left-1/2 z-10 h-1 w-28 -translate-x-1/2 rounded-full bg-white/60 mix-blend-difference" />
                    {/* glass reflection */}
                    <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
                </div>
            </div>
        </div>
    );
};

export default IPhone;
