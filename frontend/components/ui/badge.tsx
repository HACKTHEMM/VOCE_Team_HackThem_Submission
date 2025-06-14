import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 backdrop-blur-sm shadow-sm hover:shadow-md",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary/90 text-primary-foreground hover:bg-primary hover:scale-105",
        secondary:
          "border-transparent bg-secondary/50 text-secondary-foreground hover:bg-secondary/80 hover:scale-105",
        destructive:
          "border-transparent bg-destructive/90 text-destructive-foreground hover:bg-destructive hover:scale-105",
        outline: "text-foreground border-input/50 bg-background/50 hover:bg-accent/50 hover:scale-105",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
