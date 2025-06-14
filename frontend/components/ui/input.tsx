import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-lg border border-input/50 bg-background/50 backdrop-blur-sm px-4 py-3 text-base ring-offset-background transition-all duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:border-ring/60 focus-visible:bg-background/80 hover:border-input/80 hover:bg-background/70 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm shadow-sm hover:shadow-md focus-visible:shadow-lg",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
