import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    // Get current user session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Check for existing YouTube connection
    const { data: connection } = await supabase
      .from('user_connections')
      .select('*')
      .eq('user_id', session.user.id)
      .eq('provider', 'youtube')
      .single();

    if (!connection) {
      return NextResponse.json({ connected: false });
    }

    // Check if token is expired
    const isExpired = connection.expires_at < Math.floor(Date.now() / 1000);
    
    if (isExpired && connection.refresh_token) {
      try {
        // Refresh the token
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: process.env.GOOGLE_CLIENT_ID!,
            client_secret: process.env.GOOGLE_CLIENT_SECRET!,
            refresh_token: connection.refresh_token,
            grant_type: 'refresh_token',
          }),
        });

        const tokenData = await tokenResponse.json();

        if (tokenResponse.ok) {
          // Update the tokens in the database
          await supabase
            .from('user_connections')
            .update({
              access_token: tokenData.access_token,
              expires_at: Math.floor(Date.now() / 1000) + (tokenData.expires_in || 3600),
              updated_at: new Date().toISOString(),
            })
            .eq('id', connection.id);

          // Update the connection with new token
          connection.access_token = tokenData.access_token;
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
        // Continue with expired token, the UI can handle re-authentication
      }
    }

    return NextResponse.json({
      connected: true,
      channel: connection.provider_data,
    });
  } catch (error) {
    console.error('Error checking YouTube status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
