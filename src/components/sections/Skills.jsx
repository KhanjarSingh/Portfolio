import React from 'react';
import SectionWrapper from '../ui/SectionWrapper';
import { Code, Layout, Database, Terminal, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const skillGraph = [
    {
        category: 'Frontend Engineering',
        icon: <Layout className="text-blue-400" />,
        items: ['React', 'Next.js', 'Tailwind CSS', 'HTML5', 'CSS3', 'Framer Motion', 'TypeScript']
    },
    {
        category: 'Backend & Database',
        icon: <Database className="text-violet-400" />,
        items: ['Node.js', 'Express', 'Prisma ORM', 'SQL', 'NoSQL', 'Supabase', 'Firebase']
    },
    {
        category: 'AI & Data Science',
        icon: <Cpu className="text-indigo-400" />,
        items: ['Python', 'Pandas', 'NumPy', 'OpenAI API', 'Data Analysis']
    },
    {
        category: 'Tools & DevOps',
        icon: <Terminal className="text-gray-400" />,
        items: ['Git', 'GitHub Actions', 'AWS', 'Docker', 'Postman', 'Figma']
    }
];

const Skills = () => {
    return (
        <SectionWrapper id="skills">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        <Code size={14} />
                        <span>My Arsenal</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold font-heading mb-6">
                        Technical <span className="text-primary">Skills</span>
                    </h2>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">The tools and technologies I use to build premium products.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                    {skillGraph.map((group, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="p-10 rounded-2xl bg-secondary/10 border border-white/5 hover:border-primary/30 hover:bg-secondary/20 transition-all duration-300 group"
                        >
                            <div className="flex items-center gap-4 mb-10">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5 group-hover:bg-white/10 transition-colors">
                                    {group.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white">
                                    {group.category}
                                </h3>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {group.items.map((skill, idx) => (
                                    <span
                                        key={idx}
                                        className="px-5 py-2.5 rounded-lg bg-white/5 border border-white/5 text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/10 hover:border-primary/30 transition-all cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="absolute center left-1/2 -translate-x-1/2 bottom-0 w-[600px] h-[400px] bg-primary/5 blur-[120px] rounded-full -z-10" />
        </SectionWrapper>
    );
};

export default Skills;
