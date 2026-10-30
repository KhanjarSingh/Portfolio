// Single source of truth for all portfolio content.
import {
    siCplusplus, siPython, siJavascript, siTypescript, siMysql, siHtml5, siCss,
    siReact, siNodedotjs, siExpress, siNextdotjs, siTailwindcss, siExpo,
    siMongodb, siPostgresql, siFirebase, siPrisma, siGit, siPostman, siSupabase, siFigma, siGithubactions,
    siNumpy, siPandas, siFastapi, siGooglegemini, siGo, siJest, siReactquery, siMui,
    siHuggingface, siMeta, siStreamlit, siClaude, siJupyter,
} from 'simple-icons';

export const profile = {
    name: 'Parth Tandalwade',
    first: 'Parth',
    last: 'Tandalwade',
    katakana: 'パース・タンダルワデ',
    roles: ['Full-Stack Developer', 'Mobile App Engineer', 'Competitive Programmer', 'Lane-4 Swimmer'],
    location: 'Pune, India',
    email: 'parth.k@adypu.edu.in',
    resume: '/Parth_Tandalwade_Resume.pdf',
    formspree: 'https://formspree.io/f/mvzzoalk',
    socials: {
        github: 'https://github.com/KhanjarSingh',
        linkedin: 'https://www.linkedin.com/in/parth-tandalwade-295882323/',
        leetcode: 'https://leetcode.com/u/parth_0007/',
        codeforces: 'https://codeforces.com/profile/parth_0007',
        codechef: 'https://www.codechef.com/users/parth_0007',
    },
};

// Section ids double as dive checkpoints; depth is in metres.
export const sections = [
    { id: 'surface', label: 'Surface', jp: '水面', depth: 0 },
    { id: 'about', label: 'Status', jp: 'ステータス', depth: 18 },
    { id: 'skills', label: 'Skills', jp: 'スキル', depth: 40 },
    { id: 'experience', label: 'Laps', jp: 'キャリア', depth: 62 },
    { id: 'projects', label: 'Projects', jp: 'プロジェクト', depth: 85 },
    { id: 'medals', label: 'Medals', jp: 'メダル', depth: 104 },
    { id: 'contact', label: 'Contact', jp: 'コンタクト', depth: 120 },
];

export const MAX_DEPTH = 120;

export const status = {
    className: 'Full-Stack Developer',
    subclass: 'Mobile · AI/ML',
    guild: 'Newton School of Technology (ADYPU)',
    degree: 'B.Tech CSE — AIML',
    years: '2024 → 2028',
    stats: [
        { key: 'API ENDPOINTS BUILT', value: 220, max: 250, suffix: '+' },
        { key: 'USERS SERVED', value: 10000, max: 10000, suffix: '+' },
        { key: 'ATHLETES ON MY APP', value: 500, max: 600, suffix: '+' },
        { key: 'TEAMS OUTRANKED', value: 498, max: 500, suffix: '' },
    ],
    titles: [
        'Runner-Up · Project Morpheus',
        'Hacktoberfest ×2',
        'Google Big Code · Round 2',
        'SIH National Stage',
        'Volleyball Squad',
        'Lane Swimmer',
    ],
    passives: [
        { name: 'Deadline Breaker', desc: 'Shipped 3 major features 3 weeks early.' },
        { name: 'Pipeline Alchemy', desc: 'Turned a 24h process into 30 minutes.' },
        { name: 'Underwater Focus', desc: 'Long laps, longer debugging sessions.' },
    ],
};

const icon = (si, name) => ({ name, path: si.path, color: `#${si.hex}` });
const mono = (name, label, color) => ({ name, label, color });

export const skillFolders = [
    {
        name: 'Languages',
        apps: [
            icon(siCplusplus, 'C++'), icon(siPython, 'Python'), icon(siJavascript, 'JavaScript'),
            icon(siTypescript, 'TypeScript'), icon(siGo, 'Go'), icon(siMysql, 'SQL'), icon(siHtml5, 'HTML'), icon(siCss, 'CSS'),
        ],
    },
    {
        name: 'Web & Mobile',
        apps: [
            icon(siReact, 'React'), icon(siReact, 'React Native'), icon(siNodedotjs, 'Node.js'),
            icon(siExpress, 'Express'), icon(siNextdotjs, 'Next.js'), icon(siTailwindcss, 'Tailwind'),
            icon(siExpo, 'Expo'), mono('NativeWind', 'NW', '#38BDF8'), icon(siMui, 'MUI'), icon(siReactquery, 'TanStack'),
        ],
    },
    {
        name: 'Data & Tools',
        apps: [
            icon(siMongodb, 'MongoDB'), icon(siPostgresql, 'PostgreSQL'), icon(siFirebase, 'Firebase'),
            icon(siPrisma, 'Prisma'), icon(siSupabase, 'Supabase'), icon(siGit, 'Git'),
            icon(siPostman, 'Postman'), icon(siJest, 'Jest'), icon(siFigma, 'Figma'), icon(siGithubactions, 'Actions'), mono('AWS', 'aws', '#FF9900'),
        ],
    },
    {
        name: 'AI & LLMs',
        apps: [
            icon(siGooglegemini, 'Gemini'), mono('OpenAI', 'AI', '#10A37F'), icon(siClaude, 'Claude'),
            icon(siMeta, 'Llama 3'), mono('Groq', 'GQ', '#F55036'), icon(siHuggingface, 'Hugging Face'),
            mono('FAISS', 'FS', '#4F8DF7'), mono('Sentence-Transformers', 'ST', '#FFD21E'), mono('RAG', 'RAG', '#C084FC'),
            mono('Embeddings', 'EMB', '#5EEAD4'), mono('Prompt Eng.', 'PE', '#FB7185'), icon(siFastapi, 'FastAPI'),
        ],
    },
    {
        name: 'Data',
        apps: [
            icon(siNumpy, 'NumPy'), icon(siPandas, 'Pandas'), icon(siJupyter, 'Jupyter'),
            icon(siStreamlit, 'Streamlit'), mono('Power BI', 'BI', '#F2C811'),
        ],
    },
];

export const dock = [
    icon(siReact, 'React'), icon(siTypescript, 'TypeScript'), icon(siNodedotjs, 'Node.js'),
    icon(siExpo, 'Expo'), icon(siNextdotjs, 'Next.js'), icon(siPython, 'Python'),
    icon(siGo, 'Go'), icon(siCplusplus, 'C++'), icon(siPostgresql, 'PostgreSQL'), icon(siMongodb, 'MongoDB'),
    icon(siFirebase, 'Firebase'), icon(siFastapi, 'FastAPI'), icon(siFigma, 'Figma'),
];

// Written for anyone, not just engineers: a plain-English headline, big numbers,
// a grid of everything built, a few short stories, and the tech stack tucked away.
// Newest first; `lap` counts in chronological order. Icons are Glyph names.
export const experience = [
    {
        lap: 4,
        company: 'ZewaFeeds',
        role: 'Freelance Full-Stack Developer',
        type: 'Freelance',
        period: 'Jun 2026 – Present',
        place: 'Remote · Kerala, India',
        monogram: 'Z',
        color: ['#34d399', '#0e7490'],
        link: { label: 'zewafeeds.com', href: 'https://zewafeeds.com' },
        context: 'An Indian startup selling insect-protein food for aquarium fish and pets, direct to customers.',
        headline: ['Built their ', 'entire online business', ' solo: the store customers shop in, the back-office the team runs, and the engine behind both.'],
        stats: [
            { value: '5 mo', label: 'from zero to live, solo' },
            { value: '79', label: 'pages: store + admin' },
            { value: '64', label: 'customers onboarded to loyalty' },
            { value: '220+', label: 'API endpoints' },
        ],
        built: [
            { icon: 'Store', title: 'Online store', text: '36-page storefront' },
            { icon: 'ShoppingBag', title: 'Checkout', text: 'Secure Razorpay payments' },
            { icon: 'IdCard', title: 'Customer accounts', text: 'Orders, addresses, tracking' },
            { icon: 'LayoutDashboard', title: 'Admin CRM', text: '43-page back-office' },
            { icon: 'BadgePercent', title: 'Coupon engine', text: '4 stacking modes, buy-X-get-Y' },
            { icon: 'Megaphone', title: 'Influencer tracking', text: 'Who referred every sale' },
            { icon: 'Gift', title: 'Loyalty points', text: 'Earn, expire, redeem' },
            { icon: 'Newspaper', title: 'Blog & site editor', text: 'Publish with rollback' },
            { icon: 'Mail', title: 'Email system', text: 'Order mails + open tracking' },
            { icon: 'Undo2', title: 'Returns & refunds', text: 'Straight from the CRM' },
            { icon: 'BarChart3', title: 'Analytics', text: 'Revenue, products, promos' },
            { icon: 'ShieldCheck', title: 'Security', text: '2FA, roles, audit log' },
        ],
        stories: [
            { icon: 'Gauge', title: '7–20 s → near-instant', text: 'Product pages were crawling. I moved the servers next to the database and they became near-instant.' },
            { icon: 'Truck', title: 'Moved the whole business', text: 'Migrated customers, 60+ past orders and a 13-product, 44-variant catalogue with ~190 images off their old platform.' },
            { icon: 'Bug', title: 'The phantom logout', text: 'Staff kept getting signed out. Traced it to a hidden browser security check and rebuilt sessions so every tab stays in sync.' },
        ],
        stack: ['Next.js', 'React', 'Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'Prisma', 'Redis', 'BullMQ', 'Razorpay', 'Cloudinary', 'Vercel', 'Render'],
    },
    {
        lap: 3,
        company: 'Ionage',
        role: 'Full Stack Developer Intern',
        type: 'Internship',
        period: 'Mar 2026 – Sep 2026',
        place: 'India',
        monogram: 'i',
        color: ['#22d3ee', '#2563eb'],
        context: 'Ionage connects 25,000+ EV charging points in ~3,000 Indian cities into one network, across 70%+ of the country’s charging hardware.',
        headline: ['Built features for the platform that runs ', '25,000+ EV chargers', ' across India, from the dashboard to the servers.'],
        stats: [
            { value: '25K+', label: 'chargers on the platform' },
            { value: '7', label: 'access roles designed' },
            { value: '5', label: 'pull requests merged' },
            { value: '3', label: 'codebases: React, Node, Go' },
        ],
        built: [
            { icon: 'KeyRound', title: 'Roles & permissions', text: '7 roles, Owner → Investor' },
            { icon: 'Receipt', title: 'Invoice prefixes', text: 'Per-operator invoice numbers' },
            { icon: 'FileSpreadsheet', title: 'Revenue export', text: '13-column per-station report' },
            { icon: 'Database', title: 'Settlements table', text: 'GST, energy, totals for finance' },
            { icon: 'MousePointerClick', title: 'Pay-to-charge flows', text: 'UPI, WhatsApp & web POC' },
            { icon: 'Palette', title: 'Typography system', text: 'Shared across the dashboard' },
        ],
        stories: [
            { icon: 'Bug', title: 'The logo that wouldn’t update', text: 'Operators uploaded a new logo and still saw the old one. Found 3 hidden causes across app, server and cloud, fixed all three, and added tests so it stays fixed.' },
            { icon: 'Users', title: 'Who-sees-what', text: 'Moved every user to a new 7-role system without breaking anyone who hadn’t been migrated yet.' },
        ],
        stack: ['React', 'TypeScript', 'Go', 'Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'AWS S3', 'TanStack Table', 'Jest'],
    },
    {
        lap: 2,
        company: 'Instilit',
        role: 'Mobile App Developer Intern',
        type: 'Internship',
        period: 'Oct 2025 – Dec 2025',
        place: 'Remote',
        monogram: 'I',
        color: ['#f472b6', '#7c3aed'],
        context: 'A sports-tech company building apps for athletes and their coaches.',
        headline: ['Built mobile apps used by ', '500+ athletes', ', with zero critical bugs in production.'],
        stats: [
            { value: '500+', label: 'athletes using it' },
            { value: '<0.2 s', label: 'real-time sync' },
            { value: '−40%', label: 'coach review time' },
            { value: '0', label: 'critical bugs' },
        ],
        built: [
            { icon: 'Smartphone', title: 'Athlete apps', text: 'iOS & Android' },
            { icon: 'RefreshCcw', title: 'Live sync', text: 'Firebase, under 0.2 s' },
            { icon: 'Clapperboard', title: 'Video annotation', text: 'Coaches mark up clips' },
            { icon: 'Timer', title: '4 features', text: 'All before deadline' },
        ],
        stories: [
            { icon: 'Clapperboard', title: 'Coaching, faster', text: 'Coaches draw directly on athletes’ videos, cutting their review time by 40%.' },
        ],
        stack: ['React Native', 'Expo', 'Firebase', 'Firestore', 'NativeWind'],
    },
    {
        lap: 1,
        company: 'PopularDigital.AI',
        role: 'Full Stack Developer Intern',
        type: 'Internship',
        period: 'Jun 2025 – Aug 2025',
        place: 'Bangalore, India',
        monogram: 'P',
        color: ['#fbbf24', '#f97316'],
        context: 'An AI product company with 10,000+ active users.',
        headline: ['Turned a ', '24-hour job into 30 minutes', ' for a product used by 10,000+ people.'],
        stats: [
            { value: '10K+', label: 'active users' },
            { value: '48×', label: 'faster processing' },
            { value: '−65%', label: 'manual work' },
            { value: '3 wks', label: 'ahead of schedule' },
        ],
        built: [
            { icon: 'Workflow', title: 'Data pipelines', text: 'FastAPI, 24 h → 30 min' },
            { icon: 'Zap', title: 'Automation', text: '65% less manual effort' },
            { icon: 'Rocket', title: '3 major features', text: 'Shipped 3 weeks early' },
        ],
        stories: [
            { icon: 'Workflow', title: 'A full day → half an hour', text: 'Rebuilt a data pipeline so work that took 24 hours now finishes in 30 minutes.' },
        ],
        stack: ['FastAPI', 'Python', 'React', 'REST APIs'],
    },
];

// `screen` selects the mock UI rendered inside the iPhone.
export const projects = [
    {
        id: 'knowra',
        featured: true,
        title: 'Knowra',
        jp: 'ノウラ',
        tagline: 'Chat with any codebase or document.',
        description:
            'A Retrieval-Augmented Generation system that turns GitHub repos and PDFs into an AI knowledge base. Paste a repo URL and it clones, chunks and indexes it into FAISS; every answer from Llama 3 (via Groq) comes with verified, hoverable source citations. Background ingestion jobs and lazy ML imports keep it running on a 512MB free-tier server.',
        stats: ['RAG pipeline', 'Verified citations', 'Runs in 512MB'],
        tech: ['FastAPI', 'FAISS', 'Groq · Llama 3', 'Sentence-Transformers', 'React 19', 'Tailwind 4'],
        links: { demo: 'https://knowra-jyg3.vercel.app/', repo: 'https://github.com/KhanjarSingh/Knowra' },
        screen: 'knowra',
        accent: '#C084FC',
    },
    {
        id: 'zewafeeds',
        title: 'ZewaFeeds',
        jp: 'ゼワフィード',
        tagline: 'A real store, live and taking orders.',
        description:
            'A complete direct-to-customer business, built solo for a real startup: the storefront at zewafeeds.com, an admin back-office for orders, customers, coupons, influencers and loyalty points, and the API behind both. Payments via Razorpay, prices always checked on the server, every admin action audit-logged.',
        stats: ['Live in production', '3 apps, 1 developer', '220+ endpoints'],
        tech: ['Next.js', 'Express', 'TypeScript', 'PostgreSQL', 'Prisma', 'Redis', 'Razorpay'],
        links: { demo: 'https://zewafeeds.com' },
        screen: 'zewafeeds',
        accent: '#34D399',
        featured: true,
    },
    {
        id: 'questlog',
        featured: true,
        title: 'QuestLog',
        jp: 'クエストログ',
        tagline: 'Your to-do list, but it levels you up.',
        description:
            'A gamified task manager with XP-based leveling (5–20 XP per task), streaks and leaderboards. Node + PostgreSQL REST APIs via Prisma with JWT auth, holding sub-100ms queries under concurrent sessions.',
        stats: ['30% faster loads', '<100ms queries', 'JWT auth'],
        tech: ['React Native', 'Expo', 'Node.js', 'PostgreSQL', 'Prisma'],
        links: { demo: 'https://questlog.expo.app/', repo: 'https://github.com/KhanjarSingh/QuestLog' },
        screen: 'questlog',
        accent: '#818CF8',
    },
    {
        id: 'ainalyst',
        featured: true,
        title: 'AInalyst',
        jp: 'アナリスト',
        tagline: 'Competitor research on autopilot.',
        description:
            'AI-powered competitor analysis built on Gemini. Automated insights on funding, market presence and differentiators across 100+ startups — eliminating ~80% of manual research.',
        stats: ['100+ startups', '−80% research', '<2s loads'],
        tech: ['React', 'Gemini API', 'Tailwind'],
        links: { demo: 'https://ainalyst.vercel.app/', repo: 'https://github.com/KhanjarSingh/AInalyst' },
        screen: 'ainalyst',
        accent: '#38BDF8',
    },
    {
        id: 'codehive',
        title: 'CodeHive',
        jp: 'コードハイブ',
        tagline: 'Where developers ask, answer and argue.',
        description:
            'A full-stack Q&A platform handling 500+ concurrent users with 40% lower response latency. JWT-secured endpoints and a modular frontend of 10+ reusable components.',
        stats: ['500+ concurrent', '−40% latency', '10+ components'],
        tech: ['React', 'Node.js', 'Express', 'MongoDB'],
        links: { demo: 'https://codehive-zfnt.vercel.app/', repo: 'https://github.com/KhanjarSingh/Codehive' },
        screen: 'codehive',
        accent: '#FBBF24',
    },
    {
        id: 'kalakriti',
        title: 'Kalakriti',
        jp: 'カラクリティ',
        tagline: 'Traditional Indian attire, modern storefront.',
        description:
            'A boutique e-commerce experience for traditional Indian wear. A team build focused on UI/UX — responsive layouts and a calm, modern shopping flow.',
        stats: ['Team project', 'UI/UX first', 'Responsive'],
        tech: ['HTML', 'CSS', 'JavaScript'],
        links: { demo: 'https://kalakriti-phi.vercel.app/', repo: 'https://github.com/KhanjarSingh/UI-Ninjas' },
        screen: 'kalakriti',
        accent: '#FB7185',
    },
    {
        id: 'vault',
        title: 'Random Password',
        jp: 'パスワード',
        tagline: 'Entropy you can actually see.',
        description:
            'A password generator with live entropy analysis and custom rulesets, for passwords that are strong and still usable.',
        stats: ['Entropy meter', 'Custom rules', 'Instant'],
        tech: ['JavaScript', 'HTML', 'CSS'],
        links: {
            demo: 'https://randompasswordgenerator-kappa.vercel.app/',
            repo: 'https://github.com/KhanjarSingh/Random-Password-Generator',
        },
        screen: 'vault',
        accent: '#2DD4BF',
    },
];

// Smaller builds, shown only when a visitor asks for more.
export const moreProjects = [
    {
        title: 'MindNest',
        tagline: 'An incubation hub for student startups: pitch ideas, build teams, find mentors.',
        tech: ['React', 'Node.js', 'MongoDB'],
        links: { demo: 'https://mind-nest-team-async.vercel.app', repo: 'https://github.com/KhanjarSingh/MindNest-Team_Async' },
    },
];

export const medals = [
    {
        tier: 'silver',
        rank: '2',
        title: 'Project Morpheus',
        sub: 'Runner-Up · Feb 2026',
        desc: '2nd of 500+ teams at a national 24-hour hackathon — a Chit Fund platform with blockchain transparency and LLM-driven risk detection.',
    },
    {
        tier: 'gold',
        rank: 'G',
        title: 'Google Big Code',
        sub: '2025 · Round 2',
        desc: 'Qualified for Round 2 of the national coding challenge, in the top 1,500 students in India.',
    },
    {
        tier: 'bronze',
        rank: 'SIH',
        title: 'Smart India Hackathon',
        sub: '2024 · National stage',
        desc: 'Cleared college-level selection and advanced to the national stage among 500+ teams.',
    },
    {
        tier: 'gold',
        rank: 'OSS',
        title: 'Hacktoberfest',
        sub: '2024 & 2025',
        desc: 'Merged multiple pull requests across open-source repositories, two years running.',
    },
    {
        tier: 'aqua',
        rank: 'AI',
        title: 'AI for Everyone',
        sub: 'DeepLearning.AI · Dec 2024',
        desc: 'Certification via Coursera. Also: college volleyball squad and Go For Gold volunteer for 200+ attendees.',
    },
];
