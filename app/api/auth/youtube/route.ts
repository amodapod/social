import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  
  if (!userId) {
    return new NextResponse('User ID is required', { status: 400 });
  }

  // Generate a random state for OAuth security
  const state = Math.random().toString(36).substring(2);
  
  // Store the state in the database with the user ID
  const supabase = createRouteHandlerClient({ cookies });
  await supabase
    .from('user_oauth_states')
    .upsert({ 
      user_id: userId, 
      state, 
      created_at: new Date().toISOString() 
    });

  // Create OAuth URL
  const oauthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  oauthUrl.searchParams.set('client_id', process.env.GOOGLE_CLIENT_ID!);
  oauthUrl.searchParams.set('redirect_uri', `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/youtube/callback`);
  oauthUrl.searchParams.set('response_type', 'code');
  oauthUrl.searchParams.set('scope', 'https://www.googleapis.com/auth/youtube.readonly');
  oauthUrl.searchParams.set('access_type', 'offline');
  oauthUrl.searchParams.set('prompt', 'consent');
  oauthUrl.searchParams.set('state', state);

  return NextResponse.redirect(oauthUrl.toString());
}
