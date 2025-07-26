"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Bot, Copy, Check } from "lucide-react"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"
import createDOMPurify from 'dompurify';

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  language?: string
  sentiment?: "positive" | "neutral" | "negative"
}

interface MessageBubbleProps {
  message: Message
}

const DOMPurify = typeof window !== 'undefined' ? createDOMPurify(window) : null;

export function MessageBubble({ message }: MessageBubbleProps) {
  const [isCopied, setIsCopied] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { toast } = useToast()
  const isUser = message.type === "user"
  const safeHtml = DOMPurify ? DOMPurify.sanitize(message.content) : message.content;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      setIsCopied(true)
      toast({
        description: "Message copied to clipboard",
        duration: 2000,
      })
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      toast({
        description: "Failed to copy message",
        variant: "destructive",
        duration: 2000,
      })
    }
  }

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-100 text-green-700 dark:bg-green-600/20 dark:text-green-400"
      case "negative":
        return "bg-red-100 text-red-700 dark:bg-red-600/20 dark:text-red-400"
      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-600/20 dark:text-slate-400"
    }
  }
  
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-6 group`}>
      <div className={`flex max-w-[85%] ${isUser ? "flex-row-reverse" : "flex-row"} items-start space-x-4`}>
        <Avatar className={`w-10 h-10 mt-1 shadow-lg transition-all duration-300 ${isHovered ? "scale-110" : ""}`}>
          <AvatarFallback
            className={
              isUser 
                ? "bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-md" 
                : "bg-gradient-to-br from-slate-200 to-slate-300 text-slate-700 dark:from-slate-700 dark:to-slate-600 dark:text-white shadow-md"
            }
          >
            {isUser ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
          </AvatarFallback>
        </Avatar>

        <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} space-y-2 relative`}>
          <div
            className={`
              px-6 py-4 rounded-2xl max-w-full break-words shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02] relative group
              ${
                isUser
                  ? "bg-gradient-to-br from-blue-600 to-violet-600 text-white rounded-br-lg"
                  : "glass-strong border border-white/30 dark:border-slate-700/50 text-slate-900 dark:text-slate-100 rounded-bl-lg"
              }
            `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="text-sm leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: safeHtml }}/>
            
            {/* Copy button - appears on hover */}
            <button
              onClick={handleCopy}
              className={`absolute top-2 ${isUser ? "left-2" : "right-2"} 
                opacity-0 group-hover:opacity-100 transition-all duration-200 
                p-1.5 rounded-md bg-black/10 hover:bg-black/20 text-white/70 hover:text-white
                ${isUser ? "" : "text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"}
              `}
              title="Copy message"
            >
              {isCopied ? (
                <Check className="h-3 w-3" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </button>
          </div>

          <div className={`flex items-center space-x-3 px-2 transition-all duration-300 ${isUser ? "flex-row-reverse space-x-reverse" : ""}`}>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {format(message.timestamp, "HH:mm")}
            </span>
            {message.language && (
              <Badge
                variant="outline"
                className="text-xs border-slate-300/50 text-slate-600 dark:border-slate-600/50 dark:text-slate-400 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm hover:scale-105 transition-transform duration-200"
              >
                {message.language.toUpperCase()}
              </Badge>
            )}
            {message.sentiment && !isUser && (
              <Badge className={`text-xs shadow-sm hover:scale-105 transition-transform duration-200 ${getSentimentColor(message.sentiment)}`}>
                {message.sentiment}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
