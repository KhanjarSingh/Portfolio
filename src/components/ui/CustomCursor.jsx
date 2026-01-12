import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        window.addEventListener('mousemove', updateMousePosition);

        const clickableElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
        clickableElements.forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        const observer = new MutationObserver(() => {
            const clickableElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
            clickableElements.forEach(el => {
                el.addEventListener('mouseenter', handleMouseEnter);
                el.addEventListener('mouseleave', handleMouseLeave);
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            clickableElements.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
            observer.disconnect();
        };
    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            height: 32,
            width: 32,
            backgroundColor: "rgba(59, 130, 246, 0.15)",
            border: "1px solid rgba(59, 130, 246, 0.5)",
        },
        hover: {
            x: mousePosition.x - 32,
            y: mousePosition.y - 32,
            height: 64,
            width: 64,
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            border: "1px solid rgba(59, 130, 246, 0.3)",
        }
    };

    const dotVariants = {
        default: {
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
            height: 8,
            width: 8,
            backgroundColor: "#3b82f6"
        },
        hover: {
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
            height: 8,
            width: 8,
            backgroundColor: "#60a5fa"
        }
    };

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] backdrop-blur-[1px]"
                variants={variants}
                animate={isHovering ? "hover" : "default"}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 15,
                    mass: 0.1
                }}
            />
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
                variants={dotVariants}
                animate={isHovering ? "hover" : "default"}
                transition={{
                    type: "tween",
                    ease: "linear",
                    duration: 0
                }}
            />
        </>
    );
};

export default CustomCursor;
