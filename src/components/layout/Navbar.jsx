import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2, Github, Linkedin, Mail } from 'lucide-react';
import { cn } from '../../utils/cn';

const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center",
                    scrolled ? "pt-5" : "pt-8"
                )}
            >
                <div
                    className={cn(
                        "flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                        scrolled
                            ? "w-[95%] md:w-[75%] max-w-5xl bg-black/80 backdrop-blur-xl border border-white/5 rounded-full px-10 py-5 shadow-lg shadow-primary/5"
                            : "w-full max-w-7xl px-8 md:px-16 bg-transparent border-transparent py-8"
                    )}
                >
                    <a href="#" className="flex items-center gap-3 font-heading font-bold text-xl tracking-tight group">
                        <div className="p-2 bg-gradient-to-tr from-primary to-indigo-600 rounded-lg text-white group-hover:shadow-[0_0_15px_rgba(59,130,246,0.6)] transition-all duration-300">
                            <Code2 size={20} />
                        </div>
                        <span className="text-white/90 group-hover:text-white transition-colors">Parth<span className="text-primary">.dev</span></span>
                    </a>

                    <div className="hidden md:flex items-center gap-10">
                        <ul className="flex items-center gap-8">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-base font-medium text-muted-foreground hover:text-white transition-colors relative hover-underline-animation"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="h-6 w-px bg-white/10" />
                        <div className="flex gap-4">
                            <a href="https://github.com/KhanjarSingh" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors hover:scale-110 duration-200">
                                <Github size={20} />
                            </a>
                            <a href="https://www.linkedin.com/in/parth-tandalwade-295882323/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-blue-500 transition-colors hover:scale-110 duration-200">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>


                    <div className="md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 text-muted-foreground hover:text-white transition-colors"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </motion.nav >


            < AnimatePresence >
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        className="fixed inset-0 z-40 bg-black/90 md:hidden flex flex-col items-center justify-center"
                    >
                        <nav className="flex flex-col items-center space-y-8">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-3xl font-bold font-heading text-muted-foreground hover:text-primary transition-colors hover:scale-105 transform duration-200"
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                        </nav>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex gap-8 mt-12"
                        >
                            <a href="#" className="p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-all hover:scale-110 group"><Github size={24} className="group-hover:text-white transition-colors" /></a>
                            <a href="#" className="p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-all hover:scale-110 group"><Linkedin size={24} className="group-hover:text-blue-400 transition-colors" /></a>
                            <a href="#" className="p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-all hover:scale-110 group"><Mail size={24} className="group-hover:text-red-400 transition-colors" /></a>
                        </motion.div>
                    </motion.div>
                )
                }
            </AnimatePresence >
        </>
    );
};

export default Navbar;
