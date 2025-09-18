import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

export async function generateAIContent(prompt: string, tool: string) {
  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error(`Error generating ${tool} content:`, error)
    throw error
  }
}