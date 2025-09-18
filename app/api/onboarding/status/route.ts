// app/api/onboarding/status/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      return NextResponse.json({ isComplete: false }, { status: 200 });
    }

    const { count: connectionCount } = await supabase
      .from('user_connections')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', session.user.id);

    const { count: subscriptionCount } = await supabase
      .from('subscriptions')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', session.user.id)
      .in('status', ['active', 'trialing']);

    const isComplete = (connectionCount || 0) > 0 && (subscriptionCount || 0) > 0;

    return NextResponse.json({ isComplete });
  } catch (error) {
    console.error('Error checking onboarding status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}