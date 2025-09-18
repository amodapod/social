import { NextRequest, NextResponse } from 'next/server'
import { generateAIContent } from '@/lib/gemini'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { prompt, tool, input } = await req.json()

    if (!prompt || !tool || !input) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate AI content
    const aiOutput = await generateAIContent(prompt, tool)

    // Store result in database (mock user for now)
    const { data, error } = await supabase
      .from('ai_results')
      .insert({
        user_id: '00000000-0000-0000-0000-000000000000', // Mock user ID
        tool: tool,
        input: { prompt: input },
        output: { result: aiOutput },
        status: 'completed'
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
    }

    return NextResponse.json({
      success: true,
      output: aiOutput,
      id: data?.id
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    )
  }
}