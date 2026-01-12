import React from 'react';
import SectionWrapper from '../ui/SectionWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Briefcase, MapPin } from 'lucide-react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

const experiences = [
    {
        role: 'Full Stack Developer Intern',
        company: 'Popular Digital AI',
        location: 'Bangalore (Onsite)',
        period: 'Internship',
        description: [
            'Developed scalable web and mobile applications, focusing on performance and maintainability.',
            'Implemented config-driven development (CDD), improving feature adaptability across deployments.',
            'Integrated FastAPI APIs and built backend data-processing logic, reducing manual workflow effort.',
            'Gained hands-on experience collaborating with designers, backend engineers, and product teams in an onsite environment.'
        ]
    },
    {
        role: 'IT Intern – Mobile App Development (React Native)',
        company: 'Instil',
        location: 'Remote',
        period: 'Internship',
        description: [
            'Built and improved mobile app screens using React Native, focusing on clean UI and smooth user experience.',
            'Integrated REST APIs to fetch, display, and manage dynamic data within the app.',
            'Worked with authentication flows, API responses, and error handling.',
            'Collaborated with the team to debug issues and optimize app performance.',
            'Followed best practices for component-based architecture and reusable code.'
        ]
    }
];

const Experience = () => {
    return (
        <SectionWrapper id="experience">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-5xl font-bold font-heading mb-16 text-center"
            >
                Professional <span className="text-primary">Experience</span>
            </motion.h2>

            <div className="relative max-w-4xl mx-auto">
                {/* Animated Vertical Line */}
                <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute left-0 md:left-1/2 h-full w-px bg-gradient-to-b from-primary/50 to-purple-500/20 -ml-[0.5px] origin-top"
                />

                <div className="space-y-16">
                    {experiences.map((item, index) => (
                        <div key={index} className={cn("relative flex flex-col md:flex-row gap-8",
                            index % 2 === 0 ? "md:flex-row-reverse" : ""
                        )}>
                            {/* Animated Dot */}
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.5 + (index * 0.2) }}
                                className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-background border-[3px] border-primary -translate-x-1/2 md:translate-x-[-50%] mt-1.5 z-10 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                            />

                            <motion.div
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7, delay: 0.2 + (index * 0.2), type: "spring", stiffness: 50 }}
                                className={cn("w-full md:w-1/2 pl-8 md:pl-0",
                                    index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                                )}
                            >
                                <Card className="group hover:border-primary/40 transition-all duration-300 bg-secondary/10 border-white/5 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <CardHeader className="pb-3 relative z-10">
                                        <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                                            <span className="text-xs font-bold px-2 py-1 rounded bg-primary/20 text-primary uppercase tracking-wider">
                                                {item.period}
                                            </span>
                                        </div>
                                        <CardTitle className="text-xl font-bold text-white">{item.role}</CardTitle>
                                        <div className="flex items-center gap-2 text-muted-foreground font-medium text-sm">
                                            <Briefcase size={14} />
                                            <span className="text-white/90">{item.company}</span>
                                            <span>•</span>
                                            <MapPin size={14} />
                                            <span>{item.location}</span>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="relative z-10 pt-0">
                                        <ul className="space-y-2 mt-2">
                                            {item.description.map((point, i) => (
                                                <li key={i} className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <div className="hidden md:block w-1/2" />
                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
};

export default Experience;
