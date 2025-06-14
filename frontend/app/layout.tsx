import type React from "react"
import type { Metadata } from "next"
import { Inter, Outfit, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap'
})

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
  display: 'swap'
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-mono",
  display: 'swap'
})

export const metadata: Metadata = {
  title: "SalesSpeak - AI Voice Assistant",
  description: "Advanced AI conversational agent for sales and customer support",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
