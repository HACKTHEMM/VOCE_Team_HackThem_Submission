"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="w-10 h-10 px-0 bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:shadow-lg">
        <Sun className="h-4 w-4 text-yellow-300" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-10 h-10 px-0 bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:shadow-lg group"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-yellow-300 group-hover:text-yellow-200 transition-all duration-300 group-hover:rotate-180" />
      ) : (
        <Moon className="h-4 w-4 text-blue-300 group-hover:text-blue-200 transition-all duration-300 group-hover:rotate-12" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
