import React from 'react';
import SectionWrapper from '../ui/SectionWrapper';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Github, ExternalLink, Smartphone, Globe, Lock, Brain, MessageSquare, ShoppingBag } from 'lucide-react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

const BrowserMockup = ({ children, className }) => (
    <div className={cn("w-full h-full bg-[#1e1e20] rounded-t-xl border border-white/10 flex flex-col overflow-hidden shadow-2xl", className)}>
        <div className="h-8 bg-[#2a2a2c] border-b border-white/5 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 bg-[#121212] relative p-4 flex items-center justify-center">
            {children}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="w-1/3 h-2 bg-white/20 rounded-full absolute top-8 left-8" />
                <div className="w-1/4 h-2 bg-white/10 rounded-full absolute top-12 left-8" />
                <div className="w-full h-px bg-white/5 absolute top-20 left-0" />
            </div>
        </div>
    </div>
);

const PhoneMockup = () => (
    <div className="w-[200px] h-[400px] bg-[#09090b] border-[8px] border-[#27272a] rounded-[2.5rem] shadow-2xl overflow-hidden relative mx-auto">
        {/* Notch/Dynamic Island */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-20 flex items-center justify-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1e1e20]" />
            <div className="w-12 h-1.5 rounded-full bg-[#1e1e20]" />
        </div>

        {/* Screen Content */}
        <div className="w-full h-full bg-[#000000] flex flex-col pt-12 px-4 relative">
            <div className="flex justify-between items-center mb-6">
                <div className="text-white font-bold text-lg">My Tasks</div>
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">JP</div>
            </div>

            <div className="space-y-3">
                <div className="w-full p-3 bg-white/5 rounded-xl border border-white/5 flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-primary/50 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                    </div>
                    <div className="flex-1">
                        <div className="h-2 w-20 bg-white/20 rounded-full mb-1.5" />
                        <div className="h-1.5 w-12 bg-white/10 rounded-full" />
                    </div>
                </div>

                <div className="w-full p-3 bg-white/5 rounded-xl border border-white/5 flex items-center gap-3 opacity-80">
                    <div className="w-5 h-5 rounded-full border-2 border-white/20" />
                    <div className="flex-1">
                        <div className="h-2 w-24 bg-white/20 rounded-full mb-1.5" />
                        <div className="h-1.5 w-16 bg-white/10 rounded-full" />
                    </div>
                </div>

                <div className="w-full p-3 bg-white/5 rounded-xl border border-white/5 flex items-center gap-3 opacity-60">
                    <div className="w-5 h-5 rounded-full border-2 border-white/20" />
                    <div className="flex-1">
                        <div className="h-2 w-16 bg-white/20 rounded-full mb-1.5" />
                        <div className="h-1.5 w-10 bg-white/10 rounded-full" />
                    </div>
                </div>

                {/* Floating Action Button */}
                <div className="absolute bottom-6 right-4 w-12 h-12 bg-primary rounded-full shadow-lg shadow-primary/20 flex items-center justify-center text-white text-2xl font-light">
                    +
                </div>
            </div>
        </div>
    </div>
);

const Projects = () => {
    const projectsList = [
        {
            title: 'Todo Master Pro',
            type: 'Mobile App',
            description: 'A React Native productivity app featuring task prioritization, categories, and cloud sync. Designed for efficiency with a focus on gesture-driven navigation.',
            tags: ['React Native', 'Firebase', 'Mobile UX', 'TypeScript'],
            links: {
                demo: 'https://expo.dev/accounts/khanjarsingh/projects/Full_Todo_App/builds/4c32f57a-7440-4042-8201-afc376e18e46',
                repo: 'https://github.com/KhanjarSingh/Todo_Mobile_App'
            },
            visual: 'mobile',
            color: 'from-orange-500 to-red-500'
        },
        {
            title: 'Codehive',
            type: 'Web Platform',
            description: 'Full-stack community platform for developers to share knowledge. Features real-time discussions, code highlighting, and a robust reputation system.',
            tags: ['React', 'Node.js', 'MongoDB'],
            links: {
                demo: 'https://codehive-zfnt.vercel.app/',
                repo: 'https://github.com/KhanjarSingh/Codehive'
            },
            visual: 'browser',
            icon: <MessageSquare size={48} />,
            color: 'from-blue-500 to-cyan-500'
        },
        {
            title: 'Random Password',
            type: 'Web Tool',
            description: 'Advanced password generator with entropy analysis. Allows users to generate cryptographically strong passwords with custom rulesets.',
            tags: ['React', 'Crypto API', 'Tailwind', 'Vite'],
            links: {
                demo: 'https://randompasswordgenerator-kappa.vercel.app/',
                repo: 'https://github.com/KhanjarSingh/Random-Password-Generator'
            },
            visual: 'browser',
            icon: <Lock size={48} />,
            color: 'from-green-500 to-emerald-500'
        },
        {
            title: 'AInalyst',
            type: 'AI Analytics',
            description: 'AI-powered market intelligence dashboard. Analyzes startup competition and funding data using Gemini API to provide actionable insights.',
            tags: ['Next.js', 'Gemini AI', 'Data Viz', 'Python'],
            links: {
                demo: 'https://ainalyst.vercel.app/',
                repo: 'https://github.com/KhanjarSingh/AInalyst'
            },
            visual: 'browser',
            icon: <Brain size={48} />,
            color: 'from-violet-500 to-purple-500'
        },
        {
            title: 'Kalakriti',
            type: 'E-commerce Website',
            description: 'A boutique e-commerce platform showcasing traditional Indian attire. Group project focused on UI/UX design with responsive layouts and modern shopping experience.',
            tags: ['HTML', 'CSS', 'JavaScript', 'UI/UX'],
            links: {
                demo: 'https://kalakriti-phi.vercel.app/',
                repo: 'https://github.com/KhanjarSingh/UI-Ninjas'
            },
            visual: 'browser',
            icon: <ShoppingBag size={48} />,
            color: 'from-pink-500 to-rose-500'
        }
    ];

    return (
        <SectionWrapper id="projects" className="relative">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                    <Globe size={14} />
                    <span>My Work</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
                    Featured <span className="text-primary">Projects</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    A collection of high-impact applications demonstrating my expertise in full-stack engineering and product design.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectsList.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group bg-secondary/10 border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] flex flex-col h-full"
                    >
                        <div className="h-64 bg-black/40 relative overflow-hidden flex items-center justify-center pt-8 px-8 group-hover:bg-black/60 transition-colors">
                            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10 group-hover:opacity-20 transition-opacity`} />

                            <div className="transform transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-2">
                                {project.visual === 'mobile' ? (
                                    <PhoneMockup />
                                ) : (
                                    <BrowserMockup className="w-64 h-48">
                                        <div className={`text-white/20 group-hover:text-white/80 transition-colors duration-500`}>
                                            {project.icon}
                                        </div>
                                    </BrowserMockup>
                                )}
                            </div>
                        </div>

                        <div className="p-6 flex flex-col flex-1">
                            <div className="mb-4">
                                <span className={`text-xs font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r ${project.color}`}>
                                    {project.type}
                                </span>
                                <h3 className="text-2xl font-bold text-white mt-1 group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>
                            </div>

                            <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.tags.map(tag => (
                                    <span key={tag} className="text-xs px-2 py-1 rounded bg-white/5 border border-white/5 text-muted-foreground">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-3 mt-auto">
                                <Button size="sm" variant="default" className="flex-1 bg-white text-black hover:bg-white/90 font-semibold" asChild>
                                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                                        <ExternalLink size={14} /> Live Demo
                                    </a>
                                </Button>
                                <Button size="sm" variant="outline" className="flex-1 border-white/10 hover:bg-white/5" asChild>
                                    <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                        <Github size={14} /> Code
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </SectionWrapper>
    );
};

export default Projects;
