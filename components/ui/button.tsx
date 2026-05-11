import * as React from "react";

import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost" | "soft";
  size?: "sm" | "md" | "lg";
};

const variantClasses = {
  default: "bg-zinc-950 text-white hover:bg-zinc-800 shadow-sm",
  outline: "border border-zinc-200 bg-white text-zinc-950 hover:bg-zinc-50",
  ghost: "bg-transparent text-zinc-950 hover:bg-zinc-100",
  soft: "bg-amber-100 text-amber-950 hover:bg-amber-200"
} as const;

const sizeClasses = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-base"
} as const;

export function Button({
  className,
  variant = "default",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
}
