import { NextResponse } from 'next/server';
import { inngest } from '@/lib/inngest/client';

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Send the event to Inngest
    await inngest.send({
      name: 'onboarding/check',
      data: { userId },
    });

    // You might want to check the user's onboarding status here
    // and return whether onboarding is required
    return NextResponse.json({ requiresOnboarding: true });
  } catch (error) {
    console.error('Error in onboarding check:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
