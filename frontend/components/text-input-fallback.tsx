"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, Keyboard } from "lucide-react"

interface TextInputFallbackProps {
  onSend: (text: string) => void
  placeholder?: string
  disabled?: boolean
}

export function TextInputFallback({
  onSend,
  placeholder = "Type your message...",
  disabled = false,
}: TextInputFallbackProps) {
  const [inputValue, setInputValue] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      onSend(inputValue.trim())
      setInputValue("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }
  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-3 w-full">
      <div className="relative flex-1">
        <Keyboard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#BBA588]/70" />
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="bg-white/[0.04] backdrop-blur-lg border border-[#BBA588]/20 text-[#ECE8D9] placeholder-[#B6B6B6]/60 pl-10 focus:bg-white/[0.08] focus:border-[#BBA588]/40 transition-all duration-300 hover:bg-white/[0.06] shadow-lg"
          disabled={disabled}
        />
      </div>
      <Button
        type="submit"
        disabled={!inputValue.trim() || disabled}
        className="bg-gradient-to-r from-[#BBA588] to-[#8E735B] hover:from-[#A6956F] hover:to-[#7A6248] text-[#ECE8D9] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  )
}
