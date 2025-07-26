"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe } from "lucide-react"

interface LanguageSelectorProps {
  currentLanguage: string
  onLanguageChange: (language: string) => void
}

const languages = [
  { code: "en", name: "English", native: "English" },
  { code: "hi", name: "Hindi", native: "हिंदी" },
]

export function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  const currentLang = languages.find((lang) => lang.code === currentLanguage)

  return (
    <Select value={currentLanguage} onValueChange={onLanguageChange}>
      <SelectTrigger className="w-40 bg-white/10 dark:bg-white/10 backdrop-blur-lg border border-white/20 dark:border-white/20 text-gray-800 dark:text-white shadow-lg hover:bg-white/30 dark:hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <div className="flex items-center space-x-2">
          <Globe className="h-4 w-4 text-[#3F3D3B] dark:text-[#3F3D3B]" />
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-white/90 dark:bg-white/10 backdrop-blur-lg border border-gray-200 dark:border-white/20 shadow-2xl">
        {languages.map((language) => (
          <SelectItem
            key={language.code}
            value={language.code}
            className="text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-white/20 focus:bg-gray-100 dark:focus:bg-white/20 transition-all duration-200 hover:scale-105"
          >
            <div className="flex flex-col">
              <span className="font-medium">{language.name}</span>
              <span className="text-xs text-[#3F3D3B]/80 dark:text-[#3F3D3B]/80">{language.native}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}