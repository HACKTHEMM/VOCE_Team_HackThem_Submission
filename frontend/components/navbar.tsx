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
    <nav className="relative border-b border-[#BBA588]/20 dark:border-[#BBA588]/10 glass-classic sticky top-0 z-50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            {/* Back button for non-landing pages */}
            {showBackButton && !isLandingPage && (
              <Link href="/">
                <Button
                  variant="ghost"
                  className="text-[#5A5A5A] hover:text-[#2D2C2A] dark:text-[#B6B6B6] dark:hover:text-[#ECE8D9] transition-all duration-300 hover:bg-[#F3F1E9]/40 dark:hover:bg-[#1E1E1E]/40 rounded-xl px-4 py-2.5 font-medium lg:flex hidden font-serif"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
            )}

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#BBA588] via-[#8E735B] to-[#7C6D64] rounded-2xl flex items-center justify-center shadow-lg shadow-[#BBA588]/20 dark:shadow-[#BBA588]/10">
                <Mic className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-[#2D2C2A] via-[#8E735B] to-[#7C6D64] dark:from-[#ECE8D9] dark:via-[#BBA588] dark:to-[#8E735B] bg-clip-text text-transparent font-serif-display">
                  Voce
                </span>
                <span className="text-xs text-[#5A5A5A] dark:text-[#B6B6B6] font-medium font-serif">Classic AI Assistant</span>
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
                  className="text-[#5A5A5A] hover:text-[#2D2C2A] dark:text-[#B6B6B6] dark:hover:text-[#ECE8D9] transition-all duration-300 hover:bg-[#F3F1E9]/40 dark:hover:bg-[#1E1E1E]/40 rounded-xl px-6 py-2.5 font-medium font-serif"
                >
                  Contact
                </Button>
              </Link>

              <SignedOut>
                <SignInButton mode="modal">
                  <Button
                    variant="ghost"
                    className="text-[#5A5A5A] hover:text-[#2D2C2A] dark:text-[#B6B6B6] dark:hover:text-[#ECE8D9] transition-all duration-300 hover:bg-[#F3F1E9]/40 dark:hover:bg-[#1E1E1E]/40 rounded-xl px-6 py-2.5 font-medium font-serif"
                  >
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="btn-classic text-white shadow-lg hover:shadow-xl shadow-[#BBA588]/25 hover:shadow-[#BBA588]/35 transition-all duration-300 transform hover:scale-105 rounded-xl px-8 py-2.5 font-semibold font-serif-display">
                    Get Started
                  </Button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <Link href="/chat">
                  <Button className="btn-classic text-white shadow-lg hover:shadow-xl shadow-[#BBA588]/25 hover:shadow-[#BBA588]/35 transition-all duration-300 transform hover:scale-105 rounded-xl px-8 py-2.5 font-semibold font-serif-display">
                    Dashboard
                  </Button>
                </Link>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10 border-2 border-[#BBA588]/20 hover:border-[#BBA588]/40 transition-all duration-300"
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
                  className="md:hidden w-10 h-10 px-0 bg-[#F3F1E9]/10 dark:bg-[#1E1E1E]/10 backdrop-blur-lg border border-[#BBA588]/20 hover:bg-[#F3F1E9]/20 dark:hover:bg-[#1E1E1E]/20 transition-all duration-300"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] sm:w-[400px] bg-[#F3F1E9] dark:bg-[#1E1E1E] border-[#BBA588]/20">
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
                        className="w-full justify-start text-[#5A5A5A] hover:text-[#2D2C2A] dark:text-[#B6B6B6] dark:hover:text-[#ECE8D9] transition-all duration-300 hover:bg-[#F3F1E9]/40 dark:hover:bg-[#1E1E1E]/40 rounded-xl px-4 py-2.5 font-medium font-serif"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Home
                      </Button>
                    </Link>
                  )}                  {/* Mobile Navigation Links */}
                  {/* Mobile CTA Buttons */}
                  <div className="space-y-3 pt-6 border-t border-[#BBA588]/20 dark:border-[#BBA588]/10">
                    <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        variant="outline"
                        className="w-full text-[#5A5A5A] hover:text-[#2D2C2A] dark:text-[#B6B6B6] dark:hover:text-[#ECE8D9] border-[#BBA588]/30 dark:border-[#BBA588]/20 hover:border-[#BBA588]/40 dark:hover:border-[#BBA588]/30 rounded-xl py-2.5 font-serif"
                      >
                        Contact Us
                      </Button>
                    </Link>

                    <SignedOut>
                      <SignInButton mode="modal">
                        <Button
                          variant="outline"
                          className="w-full text-[#5A5A5A] hover:text-[#2D2C2A] dark:text-[#B6B6B6] dark:hover:text-[#ECE8D9] border-[#BBA588]/30 dark:border-[#BBA588]/20 hover:border-[#BBA588]/40 dark:hover:border-[#BBA588]/30 rounded-xl py-2.5 font-serif"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Sign In
                        </Button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <Button
                          className="w-full btn-classic shadow-lg hover:shadow-xl shadow-[#BBA588]/25 hover:shadow-[#BBA588]/35 transition-all duration-300 rounded-xl py-2.5 font-semibold font-serif-display"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Get Started
                        </Button>
                      </SignUpButton>
                    </SignedOut>

                    <SignedIn>
                      <Link href="/chat" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className="w-full btn-classic shadow-lg hover:shadow-xl shadow-[#BBA588]/25 hover:shadow-[#BBA588]/35 transition-all duration-300 rounded-xl py-2.5 font-semibold font-serif-display">
                          Dashboard
                        </Button>
                      </Link>
                      <div className="flex justify-center pt-2">
                        <UserButton
                          appearance={{
                            elements: {
                              avatarBox: "w-12 h-12 border-2 border-[#BBA588]/20 hover:border-[#BBA588]/40 transition-all duration-300"
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
