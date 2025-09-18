import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';

export async function GET() {
  try {
    // This will trigger the supabase client creation and log the environment variables
    const supabase = createServerSupabaseClient();
    return NextResponse.json({ status: 'success', message: 'Supabase client created successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { status: 'error', message: error.message },
      { status: 500 }
    );
  }
}
