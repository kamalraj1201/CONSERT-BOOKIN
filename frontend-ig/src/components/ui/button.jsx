import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
const buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
    variants: {
        variant: {
            default: "bg-gradient-primary text-primary-foreground shadow-neon hover:shadow-glow-pink hover:scale-105",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-glow-cyan",
            ghost: "text-foreground hover:bg-muted hover:text-foreground",
            link: "text-primary underline-offset-4 hover:underline",
            hero: "bg-gradient-primary text-primary-foreground shadow-neon hover:shadow-glow-pink hover:scale-105 text-lg px-8 py-6 font-bold tracking-wide",
            glass: "bg-card/50 backdrop-blur-md border border-border/50 text-foreground hover:bg-card/70 hover:border-primary/50",
            neon: "bg-transparent border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 hover:shadow-glow-cyan",
        },
        size: {
            default: "h-11 px-6 py-2",
            sm: "h-9 rounded-md px-4 text-xs",
            lg: "h-12 rounded-lg px-8 text-base",
            xl: "h-14 rounded-lg px-10 text-lg",
            icon: "h-10 w-10",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (<Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}/>);
});
Button.displayName = "Button";
export { Button, buttonVariants };
