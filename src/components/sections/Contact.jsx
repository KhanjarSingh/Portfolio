import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ArrowUp, Copy, FileDown, Linkedin, MessageCircle, RotateCcw } from 'lucide-react';
import { siCodechef, siCodeforces, siGithub, siLeetcode } from 'simple-icons';
import SectionHeader from '../ui/SectionHeader';
import { profile } from '../../data/portfolio';
import { emit } from '../../lib/scroll';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const OPENING = [
    'Hey! You made it all the way to the seabed.',
    'Got an internship, a project, or just want to talk anime and swimming?',
    'What should I call you?',
];
const QUICK = ['I’m hiring', 'Let’s collab on a project', 'Just saying hi'];

const Bubble = ({ from, children }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.6, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={`flex ${from === 'me' ? 'justify-end' : 'justify-start'}`}
        style={{ originX: from === 'me' ? 1 : 0 }}
    >
        <p
            className={`max-w-[78%] whitespace-pre-wrap rounded-[20px] px-4 py-2 text-[15px] leading-snug ${
                from === 'me' ? 'rounded-br-md bg-[#0a84ff] text-white' : 'rounded-bl-md bg-[#26262a] text-white'
            }`}
        >
            {children}
        </p>
    </motion.div>
);

const Typing = () => (
    <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} className="flex">
        <span className="flex gap-1 rounded-[20px] rounded-bl-md bg-[#26262a] px-4 py-3.5">
            {[0, 1, 2].map((i) => (
                <motion.span
                    key={i}
                    className="h-2 w-2 rounded-full bg-white/50"
                    animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                />
            ))}
        </span>
    </motion.div>
);

const Messages = () => {
    const box = useRef(null);
    const scroller = useRef(null);
    const inView = useInView(box, { once: true, margin: '-150px' });
    const [msgs, setMsgs] = useState([]);
    const [typing, setTyping] = useState(false);
    const [step, setStep] = useState('intro');
    const [text, setText] = useState('');
    const [data, setData] = useState({ name: '', email: '', message: '' });

    const say = (lines, then) => {
        let delay = 0;
        lines.forEach((line, i) => {
            delay += 450 + Math.min(line.length * 14, 900);
            setTimeout(() => setTyping(true), delay - 500);
            setTimeout(() => {
                setTyping(false);
                setMsgs((m) => [...m, { from: 'parth', text: line }]);
                if (i === lines.length - 1 && then) then();
            }, delay);
        });
    };

    useEffect(() => {
        if (!inView) return;
        say(OPENING, () => setStep('name'));
        // run once when first visible
    }, [inView]);

    useEffect(() => {
        scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' });
    }, [msgs, typing]);

    const send = async (value) => {
        const v = value.trim();
        if (!v || step === 'intro' || step === 'sending' || step === 'done') return;
        setText('');
        setMsgs((m) => [...m, { from: 'me', text: v }]);

        if (step === 'name') {
            setData((d) => ({ ...d, name: v }));
            setStep('wait');
            say([`Nice to meet you, ${v.split(' ')[0]}!`, 'What’s your email, so I can write back?'], () => setStep('email'));
        } else if (step === 'email') {
            if (!EMAIL_RE.test(v)) {
                setStep('wait');
                say(['Hmm, that doesn’t look like an email. Try again?'], () => setStep('email'));
                return;
            }
            setData((d) => ({ ...d, email: v }));
            setStep('wait');
            say(['Perfect. What’s on your mind?'], () => setStep('message'));
        } else if (step === 'message') {
            const payload = { ...data, message: v };
            setData(payload);
            setStep('sending');
            try {
                const res = await fetch(profile.formspree, {
                    method: 'POST',
                    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                if (!res.ok) throw new Error('failed');
                setMsgs((m) => [...m, { from: 'status', text: 'Delivered' }]);
                say(['Got it! I’ll get back to you soon.'], () => setStep('done'));
            } catch {
                say([`Ugh, the message got lost at sea. Email me directly at ${profile.email}?`], () => setStep('done'));
            }
        }
    };

    const reset = () => {
        setMsgs([]);
        setData({ name: '', email: '', message: '' });
        setStep('intro');
        say(['Round two! What should I call you?'], () => setStep('name'));
    };

    const placeholder = { name: 'Your name', email: 'you@example.com', message: 'Type a message…' }[step] ?? 'iMessage';
    const ready = ['name', 'email', 'message'].includes(step);

    return (
        <div ref={box} className="flex h-[560px] flex-col">
            <div ref={scroller} className="flex-1 space-y-2 overflow-y-auto px-4 py-5">
                <p className="pb-2 text-center text-[11px] text-white/35">iMessage · Today</p>
                {msgs.map((m, i) =>
                    m.from === 'status' ? (
                        <p key={i} className="pr-1 text-right text-[11px] text-white/40">
                            {m.text}
                        </p>
                    ) : (
                        <Bubble key={i} from={m.from}>
                            {m.text}
                        </Bubble>
                    ),
                )}
                <AnimatePresence>{typing && <Typing />}</AnimatePresence>
            </div>

            <AnimatePresence>
                {step === 'message' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex gap-2 overflow-x-auto px-4 pb-2"
                    >
                        {QUICK.map((q) => (
                            <button key={q} onClick={() => setText(q)} className="shrink-0 rounded-full border border-[#0a84ff]/50 px-3 py-1.5 text-xs text-[#5eb0ff] hover:bg-[#0a84ff]/10">
                                {q}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    send(text);
                }}
                className="flex items-center gap-2 border-t border-white/10 p-3"
            >
                {step === 'done' ? (
                    <button type="button" onClick={reset} className="mx-auto flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15">
                        <RotateCcw size={14} /> New conversation
                    </button>
                ) : (
                    <>
                        <input
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            disabled={!ready}
                            type={step === 'email' ? 'email' : 'text'}
                            placeholder={ready ? placeholder : step === 'sending' ? 'Sending…' : 'Parth is typing…'}
                            aria-label={placeholder}
                            className="flex-1 rounded-full border border-white/15 bg-transparent px-4 py-2 text-[15px] text-white outline-none placeholder:text-white/30 focus:border-[#0a84ff] disabled:opacity-50"
                        />
                        <motion.button
                            type="submit"
                            whileTap={{ scale: 0.85 }}
                            disabled={!ready || !text.trim()}
                            className="grid h-9 w-9 place-items-center rounded-full bg-[#0a84ff] text-white disabled:bg-white/10 disabled:text-white/30"
                            aria-label="Send"
                        >
                            <ArrowUp size={18} strokeWidth={3} />
                        </motion.button>
                    </>
                )}
            </form>
        </div>
    );
};

const SiIcon = ({ icon, size = 18 }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden>
        <path d={icon.path} />
    </svg>
);

const Contact = () => {
    const [closed, setClosed] = useState(false);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(profile.email);
            emit('toast', `Copied ${profile.email} to clipboard.`);
        } catch {
            window.location.href = `mailto:${profile.email}`;
        }
    };

    const links = [
        { label: 'LinkedIn', href: profile.socials.linkedin, icon: <Linkedin size={18} />, color: '#0A66C2' },
        { label: 'GitHub', href: profile.socials.github, icon: <SiIcon icon={siGithub} />, color: '#ffffff' },
        { label: 'LeetCode', href: profile.socials.leetcode, icon: <SiIcon icon={siLeetcode} />, color: `#${siLeetcode.hex}` },
        { label: 'Codeforces', href: profile.socials.codeforces, icon: <SiIcon icon={siCodeforces} />, color: `#${siCodeforces.hex}` },
        { label: 'CodeChef', href: profile.socials.codechef, icon: <SiIcon icon={siCodechef} />, color: '#c49a6c' },
        { label: 'Resume', href: profile.resume, icon: <FileDown size={18} />, color: '#5eead4' },
    ];

    return (
        <section id="contact" className="relative mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
            <SectionHeader id="contact" title="Get in touch." kicker="Send me a message right here. It actually reaches my inbox." />

            <div className="grid items-start gap-10 lg:grid-cols-[1.3fr_1fr]">
                {/* macOS window */}
                <div className="relative min-h-[620px]">
                    <AnimatePresence mode="wait">
                        {!closed ? (
                            <motion.div
                                key="window"
                                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true }}
                                exit={{ scale: 0.1, y: 400, opacity: 0, transition: { duration: 0.5, ease: [0.6, 0, 0.4, 1] } }}
                                className="overflow-hidden rounded-[18px] border border-white/10 bg-[#1c1c1e]/95 shadow-[0_50px_120px_-30px_rgba(0,0,0,.9)]"
                            >
                                <div className="flex items-center gap-3 border-b border-white/10 bg-[#2a2a2d] px-4 py-3">
                                    <div className="group flex gap-2">
                                        <button onClick={() => setClosed(true)} aria-label="Close" className="grid h-3 w-3 place-items-center rounded-full bg-[#ff5f57] text-[8px] text-black/0 group-hover:text-black/60">×</button>
                                        <button onClick={() => setClosed(true)} aria-label="Minimise" className="grid h-3 w-3 place-items-center rounded-full bg-[#febc2e] text-[8px] text-black/0 group-hover:text-black/60">−</button>
                                        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                                    </div>
                                    <div className="flex flex-1 items-center justify-center gap-2">
                                        <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-cyan to-sakura text-[11px] font-bold text-white">PT</span>
                                        <span className="text-left leading-tight">
                                            <span className="block text-[13px] font-semibold text-white">Parth Tandalwade</span>
                                            <span className="block text-[10px] text-white/40">iMessage</span>
                                        </span>
                                    </div>
                                    <span className="w-12" />
                                </div>
                                <Messages />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="closed"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex h-[620px] flex-col items-center justify-center gap-4 rounded-[18px] border border-dashed border-white/15"
                            >
                                <p className="text-white/50">Whoops, you closed it.</p>
                                <motion.button
                                    onClick={() => setClosed(false)}
                                    whileHover={{ y: -6 }}
                                    animate={{ y: [0, -14, 0] }}
                                    transition={{ duration: 0.8, repeat: 2 }}
                                    className="grid h-16 w-16 place-items-center rounded-[18px] bg-gradient-to-b from-[#5dfc7a] to-[#11b13a] text-white shadow-lg"
                                    aria-label="Reopen Messages"
                                >
                                    <MessageCircle size={30} fill="white" strokeWidth={1.5} />
                                </motion.button>
                                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">click to reopen</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Contact card */}
                <div className="space-y-4">
                    <motion.button
                        onClick={copyEmail}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                        data-cursor="Copy"
                        className="glass group w-full rounded-[28px] p-6 text-left"
                    >
                        <p className="font-mono text-xs uppercase tracking-[0.3em] text-aqua">Email</p>
                        <p className="mt-2 flex items-center justify-between gap-3 break-all font-display text-xl font-bold text-white md:text-2xl">
                            {profile.email}
                            <Copy size={18} className="shrink-0 text-white/40 transition-colors group-hover:text-aqua" />
                        </p>
                        <p className="mt-2 text-sm text-white/50">Based in {profile.location} · IST (UTC+5:30) · click to copy</p>
                    </motion.button>

                    <div className="grid grid-cols-2 gap-3">
                        {links.map((l, i) => (
                            <motion.a
                                key={l.label}
                                href={l.href}
                                target="_blank"
                                rel="noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                whileHover={{ y: -4 }}
                                className="glass group flex items-center gap-3 rounded-2xl p-4"
                            >
                                <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 transition-colors" style={{ color: l.color }}>
                                    {l.icon}
                                </span>
                                <span className="text-sm font-semibold text-white">{l.label}</span>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
