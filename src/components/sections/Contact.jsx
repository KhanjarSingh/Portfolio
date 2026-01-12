import React, { useState } from 'react';
import SectionWrapper from '../ui/SectionWrapper';
import { Button } from '../ui/Button';
import { Mail, Send, Github, Linkedin, ArrowUpRight, Globe, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';



const Contact = () => {
    const [formStatus, setFormStatus] = useState({ type: null, message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormStatus({ type: null, message: '' });

        const form = e.target;
        const formData = new FormData(form);

        try {
            const response = await fetch('https://formspree.io/f/mvzzoalk', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setFormStatus({
                    type: 'success',
                    message: 'Message sent! I\'ll get back to you ASAP.'
                });
                form.reset();
            } else {
                setFormStatus({
                    type: 'error',
                    message: 'Something went wrong. Please email directly.'
                });
            }
        } catch (error) {
            setFormStatus({
                type: 'error',
                message: 'Network error. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SectionWrapper id="contact" className="pb-20 relative overflow-hidden">
            <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10" />
            <div className="absolute top-20 right-20 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] -z-10" />

            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="space-y-8"
                    >
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                <span>Available for work</span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-bold font-heading mb-6 leading-tight tracking-tight">
                                Let’s built <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">something epic.</span>
                            </h2>
                            <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                                I'm always looking for ambitious projects. Whether you have a groundbreaking idea or just want to say hi, my inbox is open.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <a
                                href="mailto:parth.k@adypu.edu.in"
                                className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300"
                            >
                                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <div className="text-sm text-muted-foreground">Email me at</div>
                                    <div className="text-lg font-medium text-white group-hover:text-primary transition-colors">parth.k@adypu.edu.in</div>
                                </div>
                                <ArrowUpRight className="ml-auto text-muted-foreground group-hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" />
                            </a>
                        </div>

                        <div className="flex gap-4">
                            {[
                                { icon: <Github size={20} />, href: "https://github.com/KhanjarSingh", label: "GitHub" },
                                { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/parth-tandalwade-295882323/", label: "LinkedIn" },
                                { icon: <Globe size={20} />, href: "#", label: "Portfolio" }
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-4 rounded-xl bg-white/5 border border-white/5 text-muted-foreground hover:text-white hover:bg-white/10 hover:scale-110 transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative"
                    >
                        <form onSubmit={handleSubmit} className="p-8 md:p-10 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-xl shadow-2xl space-y-6">
                            <h3 className="text-2xl font-bold text-white mb-2">Send a message</h3>

                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-muted-foreground ml-1">Email Address</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="your@email.com"
                                        className="w-full bg-white/5 border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-primary/50 focus:bg-white/10 transition-all text-white placeholder:text-white/20"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-muted-foreground ml-1">Your Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        required
                                        placeholder="Tell me about your project..."
                                        className="w-full bg-white/5 border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-primary/50 focus:bg-white/10 transition-all resize-none text-white placeholder:text-white/20"
                                    />
                                </div>
                            </div>

                            {formStatus.message && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex items-center gap-2 p-3 rounded-lg ${formStatus.type === 'success'
                                            ? 'bg-green-500/10 text-green-400'
                                            : 'bg-red-500/10 text-red-400'
                                        }`}
                                >
                                    {formStatus.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                                    <span className="text-sm font-medium">{formStatus.message}</span>
                                </motion.div>
                            )}

                            <Button
                                type="submit"
                                size="lg"
                                className="w-full bg-white text-black hover:bg-white/90 font-bold h-14 rounded-xl text-lg group"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : (
                                    <span className="flex items-center justify-center gap-2">
                                        Send Message
                                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </span>
                                )}
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default Contact;