import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Hexagon, Lock, Search, ShoppingCart, Sprout, Trophy } from 'lucide-react';

// Stylised mock UIs rendered inside the iPhone frame, one per project.

// iOS status bar; the left and right groups sit either side of the Dynamic Island.
const StatusBar = ({ dark = false }) => (
    <div className={`flex h-[50px] items-center justify-between pl-8 pr-[18px] text-[13px] font-semibold ${dark ? 'text-black' : 'text-white'}`}>
        <span className="w-[54px] text-center">9:41</span>
        <span className="flex items-center gap-[5px]" aria-hidden>
            <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor">
                <rect x="0" y="7" width="3" height="4" rx="0.8" />
                <rect x="4.3" y="5" width="3" height="6" rx="0.8" />
                <rect x="8.6" y="2.6" width="3" height="8.4" rx="0.8" />
                <rect x="12.9" y="0" width="3" height="11" rx="0.8" />
            </svg>
            <svg width="14" height="11" viewBox="0 0 14 11" fill="currentColor">
                <path d="M7 2.3c2 0 3.8.8 5.2 2.1l1-1A8.6 8.6 0 0 0 7 .8 8.6 8.6 0 0 0 .8 3.4l1 1A7.2 7.2 0 0 1 7 2.3Z" />
                <path d="M7 5.3c1.2 0 2.3.5 3.1 1.2l1-1A5.8 5.8 0 0 0 7 3.8c-1.6 0-3 .6-4.1 1.7l1 1c.8-.7 1.9-1.2 3.1-1.2Z" />
                <path d="M7 8.2c.4 0 .8.2 1.1.4L7 10.2 5.9 8.6c.3-.2.7-.4 1.1-.4Z" />
            </svg>
            <span className="flex items-center">
                <span className={`h-[11px] w-[22px] rounded-[3.5px] border p-[1.5px] ${dark ? 'border-black/40' : 'border-white/50'}`}>
                    <span className={`block h-full w-[75%] rounded-[1.5px] ${dark ? 'bg-black' : 'bg-white'}`} />
                </span>
                <span className={`ml-[1px] h-1 w-[1.5px] rounded-r ${dark ? 'bg-black/40' : 'bg-white/50'}`} />
            </span>
        </span>
    </div>
);

const KNOWRA_QA = [
    {
        q: 'How does auth work in this repo?',
        a: 'Requests carry a JWT that middleware verifies before any protected route runs. Tokens are issued on login and expire after 7 days.',
        sources: ['auth/middleware.js', 'routes/login.js'],
    },
    {
        q: 'Summarise the resume PDF',
        a: 'CS (AIML) undergrad, three internships plus a live freelance build, runner-up at Project Morpheus. Links to GitHub and the portfolio were found inside the PDF.',
        sources: ['resume.pdf · p1', 'resume.pdf · links'],
    },
];

const Knowra = () => {
    const [i, setI] = useState(0);
    const [shown, setShown] = useState(0);
    const qa = KNOWRA_QA[i];

    // stream the answer token-by-token, then move to the next question
    useEffect(() => {
        const words = qa.a.split(' ');
        const t =
            shown < words.length
                ? setTimeout(() => setShown(shown + 1), 55)
                : setTimeout(() => {
                      setShown(0);
                      setI((i + 1) % KNOWRA_QA.length);
                  }, 3500);
        return () => clearTimeout(t);
    }, [shown, qa, i]);

    const done = shown >= qa.a.split(' ').length;

    return (
        <div className="flex h-full flex-col bg-[radial-gradient(120%_60%_at_50%_0%,#3b1d5e,#0c0816_70%)] text-white">
            <StatusBar />
            <div className="flex items-center justify-between px-5 pt-2">
                <p className="font-display text-lg font-bold">
                    Knowra <span className="text-purple-300">AI</span>
                </p>
                <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[9px] text-emerald-300">● 3 sources indexed</span>
            </div>
            <div className="mx-5 mt-3 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[10px] text-white/60">
                <span className="text-purple-300">⎇</span>
                <span className="truncate">KhanjarSingh/Codehive</span>
                <span className="ml-auto shrink-0 whitespace-nowrap text-emerald-300">indexed ✓</span>
            </div>

            <div className="flex-1 space-y-3 px-5 pt-4">
                <motion.div key={`q${i}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex justify-end">
                    <p className="max-w-[80%] rounded-2xl rounded-br-md bg-purple-500 px-3 py-2 text-[12px]">{qa.q}</p>
                </motion.div>
                <div className="rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.06] p-3">
                    <p className="text-[12px] leading-relaxed text-white/90">
                        {qa.a.split(' ').slice(0, shown).join(' ')}
                        {!done && <span className="ml-0.5 inline-block h-3 w-1 animate-pulse bg-purple-300 align-middle" />}
                    </p>
                    {done && (
                        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-3 flex flex-wrap gap-1.5">
                            {qa.sources.map((s) => (
                                <span key={s} className="rounded-md border border-purple-400/30 bg-purple-400/10 px-1.5 py-0.5 font-mono text-[9px] text-purple-200">
                                    ✓ {s}
                                </span>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>

            <div className="mx-4 mb-8 flex items-center gap-2 rounded-full border border-white/15 bg-white/5 py-1.5 pl-2 pr-1.5">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-white/10 text-sm">+</span>
                <span className="flex-1 text-[11px] text-white/35">Ask your knowledge base…</span>
                <span className="grid h-6 w-6 place-items-center rounded-full bg-purple-500 text-[11px]">↑</span>
            </div>
        </div>
    );
};

const ZEWA_PRODUCTS = [
    { name: 'Cichlid C4', note: 'Colour & growth', g: 'from-orange-300 to-rose-400' },
    { name: 'Betta Bites', note: 'High protein', g: 'from-sky-300 to-indigo-400' },
    { name: 'Tropical Flakes', note: 'Daily feed', g: 'from-lime-300 to-emerald-400' },
    { name: 'Pet Treats', note: 'Insect-powered', g: 'from-amber-200 to-orange-400' },
];

const ZewaFeeds = () => {
    const [cart, setCart] = useState(0);
    const [bump, setBump] = useState(0);
    const add = () => {
        setCart((c) => c + 1);
        setBump((b) => b + 1);
    };
    return (
        <div className="h-full bg-[#f6faf7] text-[#0b2b26]">
            <StatusBar dark />
            <div className="flex items-center justify-between px-5 pt-1">
                <p className="font-display text-xl font-extrabold tracking-tight">
                    zewa<span className="text-emerald-600">feeds</span>
                </p>
                <motion.span
                    key={bump}
                    animate={bump ? { scale: [1, 1.35, 1] } : {}}
                    className="relative grid h-8 w-8 place-items-center rounded-full bg-[#0b2b26] text-sm text-white"
                >
                    <ShoppingCart size={14} />
                    {cart > 0 && (
                        <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-emerald-500 px-1 text-[9px] font-bold">
                            {cart}
                        </span>
                    )}
                </motion.span>
            </div>
            <div className="mx-5 mt-3 rounded-3xl bg-gradient-to-br from-[#0f766e] to-[#064e3b] p-4 text-white">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-emerald-200">Insect protein · science-led</p>
                <p className="mt-1 font-display text-lg font-bold leading-tight">Food your fish will actually love.</p>
                <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[9px]"><Sprout size={10} /> Earn Zewa Seeds on every order</p>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2.5 px-5">
                {ZEWA_PRODUCTS.map((pr, i) => (
                    <motion.div
                        key={pr.name}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="rounded-2xl bg-white p-2 shadow-sm"
                    >
                        <div className={`h-14 rounded-xl bg-gradient-to-br ${pr.g}`} />
                        <p className="mt-1.5 text-[11px] font-semibold">{pr.name}</p>
                        <p className="text-[9px] text-black/45">{pr.note}</p>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={add}
                            className="mt-1.5 w-full rounded-full bg-[#0b2b26] py-1 text-[10px] font-semibold text-white"
                        >
                            Add
                        </motion.button>
                    </motion.div>
                ))}
            </div>
            <p className="mt-3 flex items-center justify-center gap-1 text-[9px] text-black/40"><Lock size={9} /> Secure checkout with Razorpay</p>
        </div>
    );
};

const QuestLog = () => {
    const [done, setDone] = useState([true, false, false, true]);
    const xp = 340 + done.filter(Boolean).length * 15;
    const tasks = ['Morning swim · 2km', 'Ship leaderboard API', 'Codeforces Div 2', 'Review PR #42'];
    return (
        <div className="h-full bg-gradient-to-b from-[#1e1240] to-[#0d0820] text-white">
            <StatusBar />
            <div className="px-5 pt-5">
                <p className="text-[11px] text-violet-300">Good morning, Parth</p>
                <p className="font-display text-2xl font-bold">Level 12</p>
                <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-violet-400" animate={{ width: `${(xp % 500) / 5}%` }} />
                </div>
                <p className="mt-1 text-right text-[10px] text-white/50">{xp} / 500 XP</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="rounded-2xl bg-white/10 p-3">
                        <Flame size={20} className="text-orange-400" />
                        <p className="text-lg font-bold">14</p>
                        <p className="text-[10px] text-white/50">day streak</p>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-3">
                        <Trophy size={20} className="text-amber-300" />
                        <p className="text-lg font-bold">#3</p>
                        <p className="text-[10px] text-white/50">leaderboard</p>
                    </div>
                </div>
                <p className="mb-2 mt-5 text-xs font-semibold text-white/70">Today&apos;s quests</p>
                <div className="space-y-2">
                    {tasks.map((t, i) => (
                        <button
                            key={t}
                            onClick={() => setDone((d) => d.map((v, j) => (j === i ? !v : v)))}
                            className="flex w-full items-center gap-3 rounded-xl bg-white/5 px-3 py-2.5 text-left"
                        >
                            <span className={`grid h-5 w-5 place-items-center rounded-full border-2 text-[10px] ${done[i] ? 'border-violet-400 bg-violet-400' : 'border-white/30'}`}>
                                {done[i] && '✓'}
                            </span>
                            <span className={`flex-1 text-xs ${done[i] ? 'text-white/40 line-through' : ''}`}>{t}</span>
                            <span className="text-[10px] font-bold text-violet-300">+{[10, 20, 15, 5][i]}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const AInalyst = () => {
    const bars = [62, 88, 45, 74, 96, 58, 81];
    return (
        <div className="h-full bg-[#06121f] text-white">
            <StatusBar />
            <div className="px-5 pt-5">
                <p className="text-[11px] text-sky-300">AInalyst</p>
                <p className="font-display text-xl font-bold">Market pulse</p>
                <div className="mt-3 flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-[11px] text-white/50"><Search size={12} /> Compare: fintech, Pune…</div>
                <div className="mt-4 rounded-2xl bg-white/5 p-3">
                    <p className="text-[10px] text-white/50">Funding raised · last 7 rounds</p>
                    <div className="mt-3 flex h-24 items-end gap-1.5">
                        {bars.map((h, i) => (
                            <motion.div
                                key={i}
                                className="flex-1 rounded-t-md bg-gradient-to-t from-sky-600 to-cyan-300"
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ delay: i * 0.08, type: 'spring', stiffness: 120 }}
                            />
                        ))}
                    </div>
                </div>
                <div className="mt-3 space-y-2">
                    {[
                        ['✦ Gemini insight', 'Competitor B is expanding to Tier-2 cities.'],
                        ['Differentiator', 'Lowest CAC in segment, weak retention.'],
                        ['Market presence', '12 cities · 3 verticals'],
                    ].map(([k, v], i) => (
                        <motion.div
                            key={k}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + i * 0.12 }}
                            className="rounded-xl border border-sky-400/20 bg-sky-400/5 p-2.5"
                        >
                            <p className="text-[10px] font-semibold text-sky-300">{k}</p>
                            <p className="text-[11px] text-white/80">{v}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const CodeHive = () => (
    <div className="h-full bg-[#fffbeb] text-black">
        <StatusBar dark />
        <div className="px-5 pt-5">
            <div className="flex items-center justify-between">
                <p className="flex items-center gap-1.5 font-display text-xl font-extrabold"><Hexagon size={18} className="fill-amber-400 text-amber-500" /> CodeHive</p>
                <span className="rounded-full bg-black px-2.5 py-1 text-[10px] font-semibold text-amber-300">Ask</span>
            </div>
            <div className="mt-4 flex gap-2 text-[10px] font-semibold">
                {['Hot', 'New', 'Unanswered'].map((t, i) => (
                    <span key={t} className={`rounded-full px-2.5 py-1 ${i === 0 ? 'bg-amber-400' : 'bg-black/5'}`}>
                        {t}
                    </span>
                ))}
            </div>
            <div className="mt-4 space-y-2.5">
                {[
                    ['Why does useEffect run twice?', 'react', 42, 7],
                    ['Mongo vs Postgres for chat apps', 'db', 31, 12],
                    ['JWT in cookies or localStorage?', 'auth', 28, 9],
                    ['Express middleware order', 'node', 17, 4],
                ].map(([q, tag, votes, ans], i) => (
                    <motion.div
                        key={q}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex gap-3 rounded-2xl bg-white p-3 shadow-sm"
                    >
                        <div className="text-center">
                            <p className="text-sm font-bold">▲</p>
                            <p className="text-xs font-bold">{votes}</p>
                        </div>
                        <div className="flex-1">
                            <p className="text-[12px] font-semibold leading-snug">{q}</p>
                            <p className="mt-1.5 flex gap-2 text-[10px] text-black/50">
                                <span className="rounded bg-amber-100 px-1.5 text-amber-700">#{tag}</span>
                                {ans} answers
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </div>
);

const Kalakriti = () => (
    <div className="h-full bg-[#fff5f5] text-[#3b0a14]">
        <StatusBar dark />
        <div className="px-5 pt-5">
            <p className="text-center font-display text-2xl font-extrabold tracking-tight">Kalakriti</p>
            <p className="text-center text-[10px] tracking-[0.3em] text-rose-400">कलाकृति · HANDCRAFTED</p>
            <div className="mt-4 h-28 rounded-3xl bg-gradient-to-br from-rose-400 via-orange-300 to-amber-200 p-4">
                <p className="text-[10px] font-semibold text-white/90">Festive edit</p>
                <p className="font-display text-xl font-bold text-white">Banarasi silks</p>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2.5">
                {[
                    ['Kurta set', '₹2,499', 'from-rose-300 to-rose-500'],
                    ['Lehenga', '₹8,999', 'from-amber-200 to-orange-400'],
                    ['Saree', '₹4,299', 'from-fuchsia-300 to-pink-500'],
                    ['Dupatta', '₹999', 'from-teal-200 to-emerald-400'],
                ].map(([n, p, g], i) => (
                    <motion.div
                        key={n}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.08 }}
                        className="rounded-2xl bg-white p-2 shadow-sm"
                    >
                        <div className={`h-16 rounded-xl bg-gradient-to-br ${g}`} />
                        <p className="mt-1.5 text-[11px] font-semibold">{n}</p>
                        <p className="text-[10px] text-rose-500">{p}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </div>
);

const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%&*';
const genPassword = (n) => Array.from({ length: n }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join('');

const Vault = () => {
    const [len, setLen] = useState(16);
    const [pw, setPw] = useState(() => genPassword(16));
    useEffect(() => {
        const t = setInterval(() => setPw(genPassword(len)), 1800);
        return () => clearInterval(t);
    }, [len]);
    const bits = Math.round(len * Math.log2(CHARS.length));
    return (
        <div className="h-full bg-[#03140f] text-white">
            <StatusBar />
            <div className="px-5 pt-6">
                <p className="text-[11px] text-emerald-300">Random Password</p>
                <p className="font-display text-xl font-bold">Generate</p>
                <motion.div
                    key={pw}
                    initial={{ opacity: 0.3, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    className="mt-4 break-all rounded-2xl border border-emerald-400/30 bg-emerald-400/5 p-4 font-mono text-sm text-emerald-200"
                >
                    {pw}
                </motion.div>
                <div className="mt-5">
                    <div className="flex justify-between text-[11px]">
                        <span className="text-white/60">Entropy</span>
                        <span className="font-bold text-emerald-300">{bits} bits</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-yellow-300 to-emerald-400"
                            animate={{ width: `${Math.min(100, bits / 1.6)}%` }}
                        />
                    </div>
                </div>
                <div className="mt-5">
                    <p className="text-[11px] text-white/60">Length · {len}</p>
                    <input
                        type="range"
                        min="8"
                        max="32"
                        value={len}
                        onChange={(e) => {
                            setLen(+e.target.value);
                            setPw(genPassword(+e.target.value));
                        }}
                        className="mt-2 w-full accent-emerald-400"
                    />
                </div>
                <div className="mt-4 space-y-2">
                    {['Uppercase', 'Numbers', 'Symbols'].map((o) => (
                        <div key={o} className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2.5 text-xs">
                            {o}
                            <span className="relative h-5 w-9 rounded-full bg-emerald-400">
                                <span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white" />
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const SCREENS = { knowra: Knowra, zewafeeds: ZewaFeeds, questlog: QuestLog, ainalyst: AInalyst, codehive: CodeHive, kalakriti: Kalakriti, vault: Vault };

const ProjectScreen = ({ screen }) => {
    const Screen = SCREENS[screen];
    return Screen ? <Screen /> : null;
};

export default ProjectScreen;
