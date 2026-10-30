import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView } from 'framer-motion';
import { FileDown, Github, Linkedin, Mail } from 'lucide-react';
import Glyph from '../ui/Glyph';
import { profile, status } from '../../data/portfolio';

const ease = [0.2, 0.8, 0.2, 1];

const Counter = ({ value, prefix = '', suffix = '', start }) => {
    const [n, setN] = useState(0);
    useEffect(() => {
        if (!start) return;
        const c = animate(0, value, { duration: 1.4, ease: [0.2, 0.7, 0.2, 1], onUpdate: setN });
        return () => c.stop();
    }, [start, value]);
    return (
        <span className="tabular-nums">
            {prefix}
            {Math.round(n).toLocaleString('en-IN')}
            {suffix}
        </span>
    );
};

const ACTIONS = [
    { label: 'Email', Icon: Mail, href: `mailto:${profile.email}` },
    { label: 'LinkedIn', Icon: Linkedin, href: profile.socials.linkedin },
    { label: 'GitHub', Icon: Github, href: profile.socials.github },
    { label: 'Resume', Icon: FileDown, href: profile.resume },
];

const ROWS = [
    ['Role', status.title],
    ['Now', status.now],
    ['College', status.college],
    ['Degree', `${status.degree} · ${status.classOf}`],
    ['Based in', profile.location],
];

// iOS Contacts-style card: a Contact Poster header, action buttons and a grouped list.
const ContactCard = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-120px' });
    const show = inView ? 'show' : 'hidden';

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={show}
            className="mx-auto w-full max-w-[440px] overflow-hidden rounded-[34px] border border-white/10 bg-[#0b1620] shadow-[0_40px_100px_-40px_rgba(0,0,0,.9)]"
        >
            {/* Contact Poster: the water rises into the frame, then the name */}
            <motion.div
                variants={{ hidden: { clipPath: 'inset(100% 0 0 0)' }, show: { clipPath: 'inset(0% 0 0 0)', transition: { duration: 0.9, ease } } }}
                className="relative h-64 overflow-hidden"
                style={{ background: 'linear-gradient(180deg, #4fd1c5 0%, #0e7490 45%, #0b3a52 100%)' }}
            >
                {/* slow caustic light */}
                <div
                    aria-hidden
                    className="absolute -inset-1/2 opacity-30"
                    style={{
                        backgroundImage:
                            'radial-gradient(closest-side, rgba(255,255,255,.5), transparent), radial-gradient(closest-side, rgba(255,255,255,.35), transparent)',
                        backgroundSize: '220px 160px, 300px 220px',
                        backgroundPosition: '0 0, 120px 80px',
                        animation: 'caustics 14s ease-in-out infinite alternate',
                    }}
                />
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0b1620] to-transparent" />

                <div className="relative flex h-full flex-col justify-end px-6 pb-5">
                    <motion.p
                        variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.6, ease } } }}
                        className="font-jp text-[11px] tracking-[0.35em] text-white/70"
                    >
                        {profile.katakana}
                    </motion.p>
                    <h3 className="font-display font-extrabold leading-[0.85] tracking-tight text-white">
                        {[profile.first, profile.last].map((w, i) => (
                            <span key={w} className="block overflow-hidden">
                                <motion.span
                                    className={`block ${i ? 'text-[2.6rem] text-white/85' : 'text-[4.2rem]'}`}
                                    variants={{ hidden: { y: '105%' }, show: { y: 0, transition: { delay: 0.45 + i * 0.1, duration: 0.8, ease } } }}
                                >
                                    {w}
                                </motion.span>
                            </span>
                        ))}
                    </h3>
                </div>
            </motion.div>

            <div className="px-5 pb-6">
                {/* iOS contact action buttons */}
                <div className="grid grid-cols-4 gap-2">
                    {ACTIONS.map(({ label, Icon, href }, i) => (
                        <motion.a
                            key={label}
                            href={href}
                            target={href.startsWith('mailto:') ? undefined : '_blank'}
                            rel="noreferrer"
                            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { delay: 0.7 + i * 0.06, duration: 0.5, ease } } }}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.94 }}
                            className="flex flex-col items-center gap-1.5 rounded-2xl bg-white/[0.06] py-3 text-[11px] font-medium text-aqua transition-colors hover:bg-white/[0.1]"
                        >
                            <Icon size={19} />
                            {label}
                        </motion.a>
                    ))}
                </div>

                {/* numbers */}
                <motion.div
                    variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 0.9, duration: 0.5 } } }}
                    className="mt-3 grid grid-cols-3 divide-x divide-white/10 rounded-2xl bg-white/[0.04]"
                >
                    {status.stats.map((s) => (
                        <div key={s.label} className="px-2 py-3.5 text-center">
                            <p className="font-display text-2xl font-extrabold text-white">
                                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} start={inView} />
                            </p>
                            <p className="mt-0.5 text-[11px] text-white/50">{s.label}</p>
                        </div>
                    ))}
                </motion.div>

                {/* grouped list */}
                <ul className="mt-3 overflow-hidden rounded-2xl bg-white/[0.04]">
                    {ROWS.map(([k, v], i) => (
                        <motion.li
                            key={k}
                            variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0, transition: { delay: 1 + i * 0.06, duration: 0.45, ease } } }}
                            className="flex items-baseline justify-between gap-4 border-b border-white/[0.07] px-4 py-3 last:border-0"
                        >
                            <span className="shrink-0 text-[13px] text-white/45">{k}</span>
                            <span className="text-right text-[14px] font-medium text-white">{v}</span>
                        </motion.li>
                    ))}
                </ul>

                {/* interests */}
                <motion.div
                    variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 1.35, duration: 0.5 } } }}
                    className="mt-4"
                >
                    <p className="px-1 text-[11px] font-semibold uppercase tracking-wider text-white/35">Off the clock</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {status.interests.map((it, i) => (
                            <span key={it.title} className="flex items-center gap-2 rounded-full bg-white/[0.05] py-1 pl-1 pr-3 ring-1 ring-white/10">
                                <Glyph name={it.icon} color={['#5eead4', '#ff5c8a', '#ffd166', '#a78bfa'][i % 4]} size="sm" />
                                <span className="text-xs font-medium text-white/85">{it.title}</span>
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ContactCard;
