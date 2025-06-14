import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[100px] w-full rounded-lg border border-input/50 bg-background/50 backdrop-blur-sm px-4 py-3 text-base ring-offset-background transition-all duration-300 placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:border-ring/60 focus-visible:bg-background/80 hover:border-input/80 hover:bg-background/70 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none shadow-sm hover:shadow-md focus-visible:shadow-lg",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
