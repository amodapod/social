"use client"

import { ToolCard } from "@/components/ai-tools/tool-card"
import { 
  FileText, 
  Tags, 
  Image, 
  Video, 
  MessageSquare,
  BookOpen,
  Zap,
  Hash
} from "lucide-react"

const aiTools = [
  {
    title: "Video Titles",
    description: "Generate catchy, SEO-optimized titles that boost click-through rates",
    icon: FileText,
    placeholder: "Enter your video topic or main keywords...",
    cost: 2,
    prompt: (input: string) => `Generate 5 engaging YouTube video titles for the topic: ${input}. Make them clickable, SEO-friendly, and under 60 characters.`
  },
  {
    title: "Descriptions",
    description: "Create compelling video descriptions with proper formatting and keywords",
    icon: MessageSquare,
    placeholder: "Describe what your video is about...",
    cost: 3,
    prompt: (input: string) => `Write a comprehensive YouTube video description for: ${input}. Include relevant hashtags, timestamps, and call-to-actions.`
  },
  {
    title: "Tags & Keywords",
    description: "Find the best tags and keywords to improve your video's discoverability",
    icon: Tags,
    placeholder: "Enter your video topic...",
    cost: 1,
    prompt: (input: string) => `Generate 20 relevant YouTube tags and keywords for the topic: ${input}. Focus on SEO optimization and search volume.`
  },
  {
    title: "Thumbnail Ideas",
    description: "Get creative thumbnail concepts that stand out in search results",
    icon: Image,
    placeholder: "Describe your video content...",
    cost: 2,
    prompt: (input: string) => `Suggest 3 creative thumbnail ideas for a YouTube video about: ${input}. Describe the visual elements, colors, and text overlays.`
  },
  {
    title: "Video Scripts",
    description: "Generate engaging scripts with hooks, structure, and call-to-actions",
    icon: Video,
    placeholder: "What's your video about? Include key points to cover...",
    cost: 5,
    prompt: (input: string) => `Write a complete YouTube video script for: ${input}. Include an engaging hook, main content sections, and strong call-to-action.`
  },
  {
    title: "Video Hooks",
    description: "Create compelling opening lines that grab viewers' attention instantly",
    icon: Zap,
    placeholder: "What's your video topic or main benefit?",
    cost: 1,
    prompt: (input: string) => `Generate 5 powerful video hooks/opening lines for: ${input}. Make them attention-grabbing and curiosity-inducing.`
  },
  {
    title: "Hashtags",
    description: "Generate trending hashtags to maximize your content's reach",
    icon: Hash,
    placeholder: "Enter your content niche or topic...",
    cost: 1,
    prompt: (input: string) => `Generate 30 trending hashtags for: ${input}. Mix popular and niche-specific hashtags for optimal reach.`
  },
  {
    title: "Chapter Timestamps",
    description: "Create organized chapter timestamps for better user experience",
    icon: BookOpen,
    placeholder: "Describe your video sections or provide a brief outline...",
    cost: 2,
    prompt: (input: string) => `Create chapter timestamps for a YouTube video about: ${input}. Provide clear section titles and estimated time markers.`
  }
]

export default function AIToolsPage() {
  const handleGenerate = async (input: string, tool: string, prompt: string) => {
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          tool: tool,
          input: input
        })
      })

      if (!response.ok) {
        throw new Error('Failed to generate content')
      }

      const data = await response.json()
      return data.output
    } catch (error) {
      console.error('Error generating content:', error)
      throw error
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Content Tools</h1>
          <p className="text-muted-foreground">
            Generate high-quality content with our AI-powered tools to boost your channel growth
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {aiTools.map((tool, index) => (
          <ToolCard
            key={index}
            title={tool.title}
            description={tool.description}
            icon={tool.icon}
            placeholder={tool.placeholder}
            cost={tool.cost}
            onGenerate={(input) => handleGenerate(input, tool.title.toLowerCase(), tool.prompt(input))}
          />
        ))}
      </div>
    </div>
  )
}