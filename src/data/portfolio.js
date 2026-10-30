// Single source of truth for all portfolio content.
import {
    siCplusplus, siPython, siJavascript, siTypescript, siMysql, siHtml5, siCss,
    siReact, siNodedotjs, siExpress, siNextdotjs, siTailwindcss, siExpo,
    siMongodb, siPostgresql, siFirebase, siPrisma, siGit, siPostman, siSupabase, siFigma, siGithubactions,
    siNumpy, siPandas, siFastapi, siGooglegemini, siGo, siJest, siReactquery, siMui,
    siHuggingface, siMeta, siStreamlit, siJupyter,
} from 'simple-icons';

export const profile = {
    name: 'Parth Tandalwade',
    first: 'Parth',
    last: 'Tandalwade',
    katakana: 'パース・タンダルワデ',
    roles: ['Developer', 'Mobile App Builder', 'Competitive Programmer', 'Competitive Swimmer'],
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
    { id: 'surface', label: 'Home', jp: '水面', depth: 0 },
    { id: 'about', label: 'About', jp: 'ステータス', depth: 18 },
    { id: 'skills', label: 'Skills', jp: 'スキル', depth: 40 },
    { id: 'experience', label: 'Experience', jp: 'キャリア', depth: 62 },
    { id: 'projects', label: 'Projects', jp: 'プロジェクト', depth: 85 },
    { id: 'medals', label: 'Achievements', jp: 'メダル', depth: 104 },
    { id: 'contact', label: 'Contact', jp: 'コンタクト', depth: 120 },
];

export const MAX_DEPTH = 120;

// The About section's Developer Pass (front + back) and passive skills.
export const status = {
    title: 'Developer',
    focus: 'Web · Mobile · AI',
    degree: 'B.Tech CSE · AIML',
    college: 'Newton School of Technology',
    classOf: '2028',
    stats: [
        { value: 10000, suffix: '+', label: 'people reached' },
        { value: 500, suffix: '+', label: 'athletes served' },
        { value: 2, prefix: '#', label: 'of 500+ teams' },
    ],
    // coding first: it's what I do off the clock too
    interests: [
        { icon: 'Code2', title: 'Competitive coding' },
        { icon: 'GitPullRequest', title: 'Open source' },
        { icon: 'BookOpen', title: 'AI research papers' },
        { icon: 'Waves', title: 'Swimming' },
        { icon: 'Tv', title: 'Anime' },
        { icon: 'Volleyball', title: 'Volleyball' },
    ],
    titles: [
        'Google Big Code · Round 2',
        'Runner-Up · Project Morpheus',
        'Hacktoberfest ×2',
        'SIH National Stage',
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
            icon(siGooglegemini, 'Gemini'), mono('OpenAI', 'AI', '#10A37F'),
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

// Written for people who skim: one headline, three outcome numbers, three plain
// sentences and the things built. No dev-only metrics. Newest first.
export const experience = [
    {
        company: 'ZewaFeeds',
        role: 'Freelance Full-Stack Developer',
        type: 'Freelance',
        period: 'Jun 2026 – Now',
        monogram: 'Z',
        logo: { src: '/logos/zewafeeds.png', bg: '#0b0b0b', fill: true },
        color: ['#34d399', '#0e7490'],
        link: { label: 'zewafeeds.com', href: 'https://zewafeeds.com' },
        context: 'Insect-protein food for aquarium fish and pets, sold online across India.',
        headline: ['Built their ', 'entire online business', ', solo.'],
        metrics: [
            { value: '5 mo', label: 'from idea to a live store' },
            { value: '160+', label: 'customers on the store' },
            { value: '79', label: 'pages across store and admin' },
        ],
        points: [
            'Designed and built the store at zewafeeds.com, from browsing to secure online payment.',
            'Built the back-office the team runs the business from: orders, customers, coupons, influencers and loyalty points.',
            'Moved their customers and order history over from the old platform.',
        ],
        built: [
            { icon: 'Store', title: 'Online store' },
            { icon: 'ShoppingBag', title: 'Payments' },
            { icon: 'LayoutDashboard', title: 'Admin CRM' },
            { icon: 'Gift', title: 'Loyalty points' },
            { icon: 'BadgePercent', title: 'Coupons' },
            { icon: 'Newspaper', title: 'Blog' },
        ],
        stack: ['Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Razorpay'],
    },
    {
        company: 'Ionage',
        role: 'Full Stack Developer Intern',
        type: 'Internship',
        period: 'Mar – Sep 2026',
        monogram: 'i',
        logo: { src: '/logos/ionage.svg', bg: '#ffffff' },
        color: ['#22d3ee', '#2563eb'],
        context: 'India’s EV-charging network: one app and platform across hundreds of charging brands.',
        headline: ['Worked on the software behind ', '25,000+ EV chargers', '.'],
        metrics: [
            { value: '25K+', label: 'chargers on the platform' },
            { value: '3,000', label: 'cities it covers' },
            { value: '7', label: 'user roles I designed' },
        ],
        points: [
            'Built a permissions system so everyone in a company sees exactly what their role allows.',
            'Created one-click revenue and invoice reports for charging partners and the finance team.',
            'Prototyped paying for a charge over UPI, WhatsApp and the web.',
        ],
        built: [
            { icon: 'KeyRound', title: 'Permissions' },
            { icon: 'FileSpreadsheet', title: 'Revenue reports' },
            { icon: 'Receipt', title: 'Invoicing' },
            { icon: 'MousePointerClick', title: 'Pay-to-charge' },
        ],
        stack: ['React', 'TypeScript', 'Go', 'Node.js', 'AWS'],
    },
    {
        company: 'Instilit',
        role: 'Mobile App Developer Intern',
        type: 'Internship',
        period: 'Oct – Dec 2025',
        monogram: 'I',
        color: ['#f472b6', '#7c3aed'],
        context: 'Sports-tech: apps that help athletes train and coaches give feedback.',
        headline: ['Built apps used by ', '500+ athletes', '.'],
        metrics: [
            { value: '500+', label: 'athletes using the apps' },
            { value: '40%', label: 'less time reviewing video' },
            { value: '0', label: 'critical bugs in production' },
        ],
        points: [
            'Built iPhone and Android apps that sync instantly between athletes and coaches.',
            'Made a video tool where coaches draw directly on an athlete’s clip.',
            'Shipped every one of my features before its deadline.',
        ],
        built: [
            { icon: 'Smartphone', title: 'Mobile apps' },
            { icon: 'Clapperboard', title: 'Video coaching' },
            { icon: 'RefreshCcw', title: 'Live sync' },
        ],
        stack: ['React Native', 'Firebase'],
    },
    {
        company: 'PopularDigital.AI',
        role: 'Full Stack Developer Intern',
        type: 'Internship',
        period: 'Jun – Aug 2025',
        monogram: 'P',
        logo: { src: '/logos/populardigital.png', bg: '#ffffff' },
        color: ['#fbbf24', '#f97316'],
        context: 'An AI product company with 10,000+ active users.',
        headline: ['Turned a ', '24-hour job into 30 minutes', '.'],
        metrics: [
            { value: '10K+', label: 'people using the product' },
            { value: '48×', label: 'faster data processing' },
            { value: '65%', label: 'less manual work' },
        ],
        points: [
            'Rebuilt a slow data pipeline so a full day’s work now finishes in half an hour.',
            'Automated repetitive tasks, cutting the team’s manual effort by 65%.',
            'Delivered 3 major features 3 weeks ahead of schedule.',
        ],
        built: [
            { icon: 'Workflow', title: 'Data pipeline' },
            { icon: 'Zap', title: 'Automation' },
            { icon: 'Rocket', title: '3 features' },
        ],
        stack: ['Python', 'FastAPI', 'React'],
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
        title: 'StreaQ',
        tagline: 'Keeps your coding streaks alive: daily reminders for GitHub commits, LeetCode and Codeforces.',
        tech: ['React', 'JavaScript'],
        links: { repo: 'https://github.com/KhanjarSingh/StreaQ' },
    },
    {
        title: 'MindNest',
        tagline: 'An incubation hub for student startups: pitch ideas, build teams, find mentors.',
        tech: ['React', 'Node.js', 'MongoDB'],
        links: { demo: 'https://mind-nest-team-async.vercel.app', repo: 'https://github.com/KhanjarSingh/MindNest-Team_Async' },
    },
];

export const medals = [
    {
        tier: 'gold',
        rank: 'G',
        title: 'Google Big Code',
        sub: '2025 · Round 2',
        desc: 'Qualified for Round 2 of the national coding challenge, in the top 1,500 students in India.',
    },
    {
        tier: 'silver',
        rank: '2',
        title: 'Project Morpheus',
        sub: 'Runner-Up · Feb 2026',
        desc: '2nd of 500+ teams at a national 24-hour hackathon — a Chit Fund platform with blockchain transparency and LLM-driven risk detection.',
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
