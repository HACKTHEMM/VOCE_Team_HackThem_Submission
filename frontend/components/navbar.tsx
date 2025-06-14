"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetTitle,
  SheetDescription 
} from "@/components/ui/sheet"
import { 
  ArrowLeft, 
  Mic, 
  Menu, 
  X
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton
} from "@clerk/nextjs"

interface NavbarProps {
  showBackButton?: boolean
  variant?: "default" | "simple"
}



export function Navbar({ showBackButton = true, variant = "default" }: NavbarProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const isLandingPage = pathname === "/"

  return (
    <nav className="relative border-b border-white/10 dark:border-slate-800/30 glass-subtle sticky top-0 z-50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            {/* Back button for non-landing pages */}
            {showBackButton && !isLandingPage && (
              <Link href="/">
                <Button 
                  variant="ghost" 
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-all duration-300 hover:bg-white/40 dark:hover:bg-slate-800/40 rounded-xl px-4 py-2.5 font-medium lg:flex hidden"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
            )}

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-violet-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 dark:shadow-blue-500/10">
                <Mic className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-blue-700 to-violet-700 dark:from-white dark:via-blue-300 dark:to-violet-300 bg-clip-text text-transparent">
                  SalesSpeak
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">AI Sales Assistant</span>
              </div>
            </Link>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />            {/* Desktop CTA buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/contact">
                <Button
                  variant="ghost"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-all duration-300 hover:bg-white/40 dark:hover:bg-slate-800/40 rounded-xl px-6 py-2.5 font-medium"
                >
                  Contact
                </Button>
              </Link>
              
              <SignedOut>
                <SignInButton mode="modal">
                  <Button
                    variant="ghost"
                    className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-all duration-300 hover:bg-white/40 dark:hover:bg-slate-800/40 rounded-xl px-6 py-2.5 font-medium"
                  >
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="bg-gradient-to-r from-blue-600 via-violet-600 to-blue-700 hover:from-blue-700 hover:via-violet-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl shadow-blue-500/25 hover:shadow-blue-500/35 transition-all duration-300 transform hover:scale-105 rounded-xl px-8 py-2.5 font-semibold">
                    Get Started
                  </Button>
                </SignUpButton>
              </SignedOut>
              
              <SignedIn>
                <Link href="/chat">
                  <Button className="bg-gradient-to-r from-blue-600 via-violet-600 to-blue-700 hover:from-blue-700 hover:via-violet-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl shadow-blue-500/25 hover:shadow-blue-500/35 transition-all duration-300 transform hover:scale-105 rounded-xl px-8 py-2.5 font-semibold">
                    Dashboard
                  </Button>
                </Link>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10 border-2 border-white/20 hover:border-blue-500/40 transition-all duration-300"
                    }
                  }}
                />
              </SignedIn>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden w-10 h-10 px-0 bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] sm:w-[400px]">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Navigate through the website sections
                </SheetDescription>
                
                <div className="flex flex-col space-y-6 mt-6">
                  {/* Mobile Back Button */}
                  {showBackButton && !isLandingPage && (
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-all duration-300 hover:bg-white/40 dark:hover:bg-slate-800/40 rounded-xl px-4 py-2.5 font-medium"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Home
                      </Button>
                    </Link>
                  )}                  {/* Mobile Navigation Links */}
                      {/* Mobile CTA Buttons */}
                  <div className="space-y-3 pt-6 border-t border-slate-200 dark:border-slate-800">
                    <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        variant="outline"
                        className="w-full text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 rounded-xl py-2.5"
                      >
                        Contact Us
                      </Button>
                    </Link>
                    
                    <SignedOut>
                      <SignInButton mode="modal">
                        <Button
                          variant="outline"
                          className="w-full text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 rounded-xl py-2.5"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Sign In
                        </Button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <Button 
                          className="w-full bg-gradient-to-r from-blue-600 via-violet-600 to-blue-700 hover:from-blue-700 hover:via-violet-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl shadow-blue-500/25 hover:shadow-blue-500/35 transition-all duration-300 rounded-xl py-2.5 font-semibold"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Get Started
                        </Button>
                      </SignUpButton>
                    </SignedOut>
                    
                    <SignedIn>
                      <Link href="/chat" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className="w-full bg-gradient-to-r from-blue-600 via-violet-600 to-blue-700 hover:from-blue-700 hover:via-violet-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl shadow-blue-500/25 hover:shadow-blue-500/35 transition-all duration-300 rounded-xl py-2.5 font-semibold">
                          Dashboard
                        </Button>
                      </Link>
                      <div className="flex justify-center pt-2">
                        <UserButton 
                          appearance={{
                            elements: {
                              avatarBox: "w-12 h-12 border-2 border-white/20 hover:border-blue-500/40 transition-all duration-300"
                            }
                          }}
                        />
                      </div>
                    </SignedIn>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
