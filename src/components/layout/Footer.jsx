import React from 'react';
import { Github, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="border-t border-white/10 bg-black py-12">
            <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col items-center md:items-start gap-2">
                    <span className="font-heading font-bold text-xl">Parth<span className="text-primary">.dev</span></span>
                    <p className="text-sm text-muted-foreground">
                        Building digital experiences with purpose.
                    </p>
                </div>

                <div className="flex items-center gap-6">
                    <a href="https://github.com/KhanjarSingh" className="text-muted-foreground hover:text-foreground transition-colors"><Github size={20} /></a>
                    <a href="https://www.linkedin.com/in/parth-tandalwade-295882323/" className="text-muted-foreground hover:text-foreground transition-colors"><Linkedin size={20} /></a>
                    <a href="https://x.com/Parth_Vgt" className="text-muted-foreground hover:text-foreground transition-colors"><Twitter size={20} /></a>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
