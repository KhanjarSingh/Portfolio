import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, Code2, Droplets, FileDown, Github, Linkedin, Mail, Search, Trophy, Waves, Zap } from 'lucide-react';
import { profile, sections } from '../../data/portfolio';
import { emit, lockScroll, scrollToId, useEvent } from '../../lib/scroll';

const open = (url) => window.open(url, '_blank', 'noopener,noreferrer');

const ITEMS = [
    ...sections.map((s) => ({
        group: 'Dive to',
        title: s.label,
        hint: `−${s.depth}m · ${s.jp}`,
        icon: Waves,
        run: () => scrollToId(s.id),
    })),
    { group: 'Links', title: 'GitHub', hint: 'KhanjarSingh', icon: Github, run: () => open(profile.socials.github) },
    { group: 'Links', title: 'LinkedIn', hint: 'Let’s connect', icon: Linkedin, run: () => open(profile.socials.linkedin) },
    { group: 'Links', title: 'LeetCode', hint: 'parth_0007', icon: Code2, run: () => open(profile.socials.leetcode) },
    { group: 'Links', title: 'Codeforces', hint: 'parth_0007', icon: Trophy, run: () => open(profile.socials.codeforces) },
    { group: 'Links', title: 'CodeChef', hint: 'parth_0007', icon: Code2, run: () => open(profile.socials.codechef) },
    { group: 'Links', title: 'Email me', hint: profile.email, icon: Mail, run: () => (window.location.href = `mailto:${profile.email}`) },
    { group: 'Links', title: 'Download resume', hint: 'PDF', icon: FileDown, run: () => open(profile.resume) },
    { group: 'Secrets', title: 'Limit Break', hint: '↑↑↓↓←→←→BA', icon: Zap, run: () => emit('limitbreak') },
    { group: 'Secrets', title: 'Bubble storm', hint: 'just because', icon: Droplets, run: () => emit('bubbles') },
    { group: 'Secrets', title: 'Swim across', hint: 'or type “swim”', icon: Waves, run: () => emit('swim') },
    { group: 'Secrets', title: 'Resurface', hint: 'back to 0m', icon: ArrowUp, run: () => scrollToId('surface') },
];

// macOS Spotlight-style command palette (⌘K / Ctrl+K).
const Spotlight = () => {
    const [isOpen, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [sel, setSel] = useState(0);
    const input = useRef(null);

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return ITEMS;
        return ITEMS.filter((i) => `${i.title} ${i.hint} ${i.group}`.toLowerCase().includes(q));
    }, [query]);

    const show = useCallback(() => {
        setQuery('');
        setSel(0);
        setOpen(true);
    }, []);
    useEvent('spotlight', show);

    useEffect(() => {
        const key = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setOpen((o) => !o);
                setQuery('');
                setSel(0);
            } else if (e.key === 'Escape') setOpen(false);
        };
        window.addEventListener('keydown', key);
        return () => window.removeEventListener('keydown', key);
    }, []);

    useEffect(() => {
        lockScroll(isOpen);
        if (isOpen) setTimeout(() => input.current?.focus(), 30);
    }, [isOpen]);

    const run = (item) => {
        setOpen(false);
        setTimeout(item.run, 120);
    };

    const onKey = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSel((s) => Math.min(s + 1, results.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSel((s) => Math.max(s - 1, 0));
        } else if (e.key === 'Enter' && results[sel]) run(results[sel]);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 px-4 pt-[16vh] backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onPointerDown={(e) => e.target === e.currentTarget && setOpen(false)}
                >
                    <motion.div
                        initial={{ scale: 0.94, y: -10, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.96, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 34 }}
                        className="glass w-full max-w-xl overflow-hidden rounded-3xl !bg-[#0b1a24]/80"
                    >
                        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
                            <Search size={22} className="text-white/50" />
                            <input
                                ref={input}
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    setSel(0);
                                }}
                                onKeyDown={onKey}
                                placeholder="Spotlight Search"
                                className="w-full bg-transparent text-xl font-light text-white outline-none placeholder:text-white/35"
                            />
                            <kbd className="rounded-md bg-white/10 px-2 py-0.5 font-mono text-[10px] text-white/50">esc</kbd>
                        </div>
                        <ul className="max-h-[50vh] overflow-y-auto p-2">
                            {results.length === 0 && (
                                <li className="px-4 py-8 text-center text-sm text-white/40">Nothing down here. Try “github” or “limit”.</li>
                            )}
                            {results.map((item, i) => {
                                const header = item.group !== results[i - 1]?.group ? item.group : null;
                                const Icon = item.icon;
                                return (
                                    <li key={`${item.group}-${item.title}`}>
                                        {header && (
                                            <p className="px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wider text-white/35">{header}</p>
                                        )}
                                        <button
                                            onMouseMove={() => setSel(i)}
                                            onClick={() => run(item)}
                                            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left ${
                                                sel === i ? 'bg-[#0a84ff] text-white' : 'text-white/85'
                                            }`}
                                        >
                                            <span className={`grid h-8 w-8 place-items-center rounded-lg ${sel === i ? 'bg-white/20' : 'bg-white/10'}`}>
                                                <Icon size={16} />
                                            </span>
                                            <span className="flex-1 text-sm font-medium">{item.title}</span>
                                            <span className={`text-xs ${sel === i ? 'text-white/80' : 'text-white/35'}`}>{item.hint}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Spotlight;
