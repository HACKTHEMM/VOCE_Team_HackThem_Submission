"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, MessageSquare, Clock, Target, Heart, Zap } from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  language?: string
  sentiment?: "positive" | "neutral" | "negative"
}

interface ConversationAnalyticsProps {
  messages: Message[]
}

export function ConversationAnalytics({ messages }: ConversationAnalyticsProps) {
  const userMessages = messages.filter((m) => m.type === "user")
  const assistantMessages = messages.filter((m) => m.type === "assistant")

  const sentimentCounts = messages.reduce(
    (acc, msg) => {
      if (msg.sentiment) {
        acc[msg.sentiment] = (acc[msg.sentiment] || 0) + 1
      }
      return acc
    },
    {} as Record<string, number>,
  )

  const totalSentiments = Object.values(sentimentCounts).reduce((a, b) => a + b, 0)
  const positivePercentage = totalSentiments > 0 ? ((sentimentCounts.positive || 0) / totalSentiments) * 100 : 0

  const languageUsage = messages.reduce(
    (acc, msg) => {
      if (msg.language) {
        acc[msg.language] = (acc[msg.language] || 0) + 1
      }
      return acc
    },
    {} as Record<string, number>,
  )

  const conversationDuration =
    messages.length > 1
      ? Math.round((messages[messages.length - 1].timestamp.getTime() - messages[0].timestamp.getTime()) / 1000 / 60)
      : 0

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUp className="h-5 w-5 text-[#BBA588]" />
        <h2 className="text-lg font-semibold text-[#ECE8D9]">Live Analytics</h2>
      </div>

      {/* Conversation Overview */}
      <Card className="bg-white/[0.04] border-[#BBA588]/30 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-[#B6B6B6] flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            Conversation Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#B6B6B6]">Total Messages</span>
            <Badge variant="secondary" className="bg-[#BBA588]/20 text-[#BBA588]">
              {messages.length}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#B6B6B6]">User Messages</span>
            <span className="text-sm text-[#ECE8D9]">{userMessages.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#B6B6B6]">AI Responses</span>
            <span className="text-sm text-[#ECE8D9]">{assistantMessages.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#B6B6B6] flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              Duration
            </span>
            <span className="text-sm text-[#ECE8D9]">{conversationDuration}m</span>
          </div>
        </CardContent>
      </Card>

      {/* Sentiment Analysis */}
      <Card className="bg-white/[0.04] border-[#BBA588]/30 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-[#B6B6B6] flex items-center">
            <Heart className="h-4 w-4 mr-2" />
            Sentiment Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#B6B6B6]">Overall Sentiment</span>
              <Badge
                className={
                  positivePercentage > 60
                    ? "bg-green-600/20 text-green-400"
                    : positivePercentage > 30
                      ? "bg-[#BBA588]/20 text-[#BBA588]"
                      : "bg-red-600/20 text-red-400"
                }
              >
                {positivePercentage > 60 ? "Positive" : positivePercentage > 30 ? "Neutral" : "Negative"}
              </Badge>
            </div>
            <Progress value={positivePercentage} className="h-2" />
            <div className="text-xs text-[#B6B6B6] text-center">
              {Math.round(positivePercentage)}% positive sentiment
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <div className="text-green-400 font-semibold">{sentimentCounts.positive || 0}</div>
              <div className="text-[#B6B6B6]">Positive</div>
            </div>
            <div className="text-center">
              <div className="text-[#BBA588] font-semibold">{sentimentCounts.neutral || 0}</div>
              <div className="text-[#B6B6B6]">Neutral</div>
            </div>
            <div className="text-center">
              <div className="text-red-400 font-semibold">{sentimentCounts.negative || 0}</div>
              <div className="text-[#B6B6B6]">Negative</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language Usage */}
      <Card className="bg-white/[0.04] border-[#BBA588]/30 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-[#B6B6B6] flex items-center">
            <Zap className="h-4 w-4 mr-2" />
            Language Usage
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {Object.entries(languageUsage).map(([lang, count]) => (
            <div key={lang} className="flex justify-between items-center">
              <span className="text-sm text-[#B6B6B6] capitalize">
                {lang === "en" ? "English" : lang === "hi" ? "Hindi" : lang}
              </span>
              <Badge variant="outline" className="border-[#BBA588]/30 text-[#BBA588]">
                {count}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Engagement Metrics */}
      <Card className="bg-white/[0.04] border-[#BBA588]/30 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-[#B6B6B6] flex items-center">
            <Target className="h-4 w-4 mr-2" />
            Engagement Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#B6B6B6]">Response Rate</span>
            <span className="text-sm text-green-400">98%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#B6B6B6]">Avg Response Time</span>
            <span className="text-sm text-[#ECE8D9]">1.2s</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#B6B6B6]">User Satisfaction</span>
            <Badge className="bg-green-600/20 text-green-400">High</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
