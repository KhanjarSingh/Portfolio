import React from 'react';
import SectionWrapper from '../ui/SectionWrapper';
import { Sparkles, Code2, Brain, Rocket, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <SectionWrapper id="about" className="relative overflow-hidden">
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="space-y-10"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <Sparkles size={16} />
                        <span>About Me</span>
                    </div>

                    <h2 className="text-5xl md:text-6xl font-bold font-heading leading-tight">
                        Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-indigo-500">digital experiences</span> that matter.
                    </h2>

                    <div className="space-y-6 text-base md:text-lg leading-relaxed max-w-2xl">
                        <p className="text-white/90">
                            Hey! I'm Parth, A Computer Science student who turns ideas into reality through code. I love building things that people actually use, whether it's a sleek web app, a mobile experience, or something powered by AI.
                        </p>
                        <p className="text-white/90">
                            My journey started with curiosity and has evolved into a passion for creating elegant solutions. I've worked on projects ranging from e-commerce platforms to AI-powered analytics tools, always focusing on clean code, great UX, and scalable architecture.
                        </p>
                        <p className="text-muted-foreground">
                            When I'm not coding, you'll find me solving DSA problems (75+ and counting), exploring new frameworks, or diving deep into the latest tech trends. I'm always excited to collaborate on interesting projects and learn something new.
                        </p>
                    </div>

                    <div className="flex gap-6 pt-6">
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 border border-white/10 flex-1 hover:border-primary/30 hover:bg-gradient-to-br hover:from-blue-500/15 hover:to-violet-500/15 transition-all duration-300 group">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                                    <Sparkles size={24} />
                                </div>
                                <div className="animate-pulse flex gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/50 delay-75" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/50 delay-150" />
                                </div>
                            </div>
                            <div className="text-xl font-bold text-white mb-1">Problem Solver</div>
                            <div className="text-sm text-muted-foreground font-medium">Turning complexity into clarity</div>
                        </div>
                    </div>
                </motion.div>

                <div className="grid gap-6">
                    {[
                        { icon: <Code2 className="text-blue-400" size={28} />, title: "Full Stack Engineering", desc: "Building end-to-end web applications with modern technologies like React, Next.js, and Node.js.", bg: "bg-blue-500/10 group-hover:bg-blue-500/20" },
                        { icon: <Brain className="text-violet-400" size={28} />, title: "AI-Powered Solutions", desc: "Integrating AI models and smart features to create intelligent, data-driven user experiences.", bg: "bg-violet-500/10 group-hover:bg-violet-500/20" },
                        { icon: <Rocket className="text-indigo-400" size={28} />, title: "Performance & Scale", desc: "Optimizing applications for speed and scalability, ensuring smooth performance under load.", bg: "bg-indigo-500/10 group-hover:bg-indigo-500/20" }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="p-8 rounded-2xl bg-secondary/10 border border-white/5 backdrop-blur-sm hover:bg-secondary/20 hover:border-primary/20 transition-all hover:-translate-y-2 duration-300 group"
                        >
                            <div className={`w-14 h-14 rounded-xl ${item.bg} flex items-center justify-center mb-5 transition-colors`}>
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                            <p className="text-muted-foreground text-base leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-20 pt-10 border-t border-white/5"
            >
                <p className="text-sm text-muted-foreground mb-6 uppercase tracking-wider font-semibold">Certifications & Achievements</p>
                <div className="flex flex-wrap gap-4">
                    <a href="https://drive.google.com/drive/folders/1CXZxouyFfHmu52N5pa47QmEtrS-dMr0J?usp=sharing" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-secondary/20 border border-white/5 text-sm text-muted-foreground hover:text-white hover:bg-secondary/40 transition-colors flex items-center gap-2">
                        <Award size={14} /> Intern – Popular Digital AI
                    </a>
                    <a href="https://coursera.org/share/beee980da3ede436a47b9b69ec3d0dc0" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-secondary/20 border border-white/5 text-sm text-muted-foreground hover:text-white hover:bg-secondary/40 transition-colors flex items-center gap-2">
                        <Award size={14} /> AI for Everyone
                    </a>
                    <a href="https://www.holopin.io/@khanjarsingh#" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-secondary/20 border border-white/5 text-sm text-muted-foreground hover:text-white hover:bg-secondary/40 transition-colors flex items-center gap-2">
                        <Award size={14} /> Hacktoberfest 2024 - 2025
                    </a>
                </div>
            </motion.div>
        </SectionWrapper>
    );
};

export default About;
