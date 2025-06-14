"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

const spinnerVariants = cva(
  "animate-spin",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-6 w-6", 
        lg: "h-8 w-8",
        xl: "h-12 w-12",
      },
      color: {
        default: "text-muted-foreground",
        primary: "text-primary",
        secondary: "text-secondary",
        white: "text-white",
        blue: "text-blue-500",
        violet: "text-violet-500",
      }
    },
    defaultVariants: {
      size: "md",
      color: "default",
    },
  }
)

export interface LoadingSpinnerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof spinnerVariants> {
  asChild?: boolean
  text?: string
}

const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, size, color, text, asChild = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-center gap-2", className)}
        {...props}
      >
        <Loader2 className={cn(spinnerVariants({ size, color }))} />
        {text && (
          <span className={cn(
            "text-sm text-muted-foreground",
            size === "sm" && "text-xs",
            size === "lg" && "text-base",
            size === "xl" && "text-lg"
          )}>
            {text}
          </span>
        )}
      </div>
    )
  }
)
LoadingSpinner.displayName = "LoadingSpinner"

// Alternative pulse animation spinner
const PulseSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, size, color, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-center", className)}
        {...props}
      >
        <div className={cn(
          "animate-pulse rounded-full bg-current",
          size === "sm" && "h-2 w-2",
          size === "md" && "h-3 w-3",
          size === "lg" && "h-4 w-4", 
          size === "xl" && "h-6 w-6",
          color === "default" && "text-muted-foreground",
          color === "primary" && "text-primary",
          color === "secondary" && "text-secondary",
          color === "white" && "text-white",
          color === "blue" && "text-blue-500",
          color === "violet" && "text-violet-500"
        )} />
      </div>
    )
  }
)
PulseSpinner.displayName = "PulseSpinner"

// Dots animation spinner
const DotsSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, size, color, ...props }, ref) => {
    const dotClass = cn(
      "rounded-full bg-current animate-bounce",
      size === "sm" && "h-1 w-1",
      size === "md" && "h-2 w-2",
      size === "lg" && "h-3 w-3",
      size === "xl" && "h-4 w-4",
      color === "default" && "text-muted-foreground",
      color === "primary" && "text-primary", 
      color === "secondary" && "text-secondary",
      color === "white" && "text-white",
      color === "blue" && "text-blue-500",
      color === "violet" && "text-violet-500"
    )
    
    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-center space-x-1", className)}
        {...props}
      >
        <div className={dotClass} />
        <div className={cn(dotClass, "animation-delay-75")} />
        <div className={cn(dotClass, "animation-delay-150")} />
      </div>
    )
  }
)
DotsSpinner.displayName = "DotsSpinner"

// Button-specific loader component
const ButtonLoader = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, size = "sm", color = "white", text, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-center gap-2", className)}
        {...props}
      >
        <Loader2 className={cn(spinnerVariants({ size, color }))} />
        {text && (
          <span className={cn(
            "text-sm",
            size === "sm" && "text-xs",
            size === "lg" && "text-base",
            size === "xl" && "text-lg",
            color === "white" && "text-white",
            color === "default" && "text-muted-foreground",
            color === "primary" && "text-primary",
            color === "secondary" && "text-secondary",
            color === "blue" && "text-blue-500",
            color === "violet" && "text-violet-500"
          )}>
            {text}
          </span>
        )}
      </div>
    )
  }
)
ButtonLoader.displayName = "ButtonLoader"

export { LoadingSpinner, PulseSpinner, DotsSpinner, ButtonLoader, spinnerVariants }