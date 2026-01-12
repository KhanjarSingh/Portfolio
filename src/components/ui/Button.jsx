import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer relative overflow-hidden",
    {
        variants: {
            variant: {
                default: "bg-white text-black hover:bg-white/90 shadow-sm",
                destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
                secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
                premium: "bg-gradient-to-r from-blue-600 via-violet-600 to-indigo-600 text-white shadow-lg hover:shadow-blue-500/25 border-0",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8 text-base",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? motion.slot : motion.button;

    const motionProps = !asChild ? {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 }
    } : {};

    return (
        <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...motionProps}
            {...props}
        />
    );
});
Button.displayName = "Button";

export { Button, buttonVariants };
