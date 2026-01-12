import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

const SectionWrapper = ({ children, className, id, delay = 0 }) => {
    return (
        <section
            id={id}
            className={cn("relative py-20 px-4 md:px-8 max-w-7xl mx-auto w-full", className)}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay, ease: "easeOut" }}
            >
                {children}
            </motion.div>
        </section>
    );
};

export default SectionWrapper;
