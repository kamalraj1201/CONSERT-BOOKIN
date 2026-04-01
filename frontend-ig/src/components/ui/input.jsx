import * as React from "react";
import { cn } from "@/lib/utils";
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
    return (<input type={type} className={cn("flex h-11 w-full rounded-lg border border-border bg-input px-4 py-2 text-base text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:cursor-not-allowed disabled:opacity-50", className)} ref={ref} {...props}/>);
});
Input.displayName = "Input";
export { Input };
