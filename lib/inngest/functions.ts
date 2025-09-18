import { inngest } from '@/lib/inngest/client.js';
import { createClient } from '@supabase/supabase-js';

export const onboardingCheck = inngest.createFunction(
  { id: 'check-onboarding-status' },
  { event: 'onboarding/check' },
  async ({ event, step }) => {
    const { userId } = event.data;
    
    // Initialize Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Check if user has any social connections
    const { count: connectionCount, error: connectionError } = await supabase
      .from('user_connections')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    if (connectionError) {
      console.error('Error checking user connections:', connectionError);
      throw connectionError;
    }

    // Check if user has an active subscription
    const { count: subscriptionCount, error: subscriptionError } = await supabase
      .from('subscriptions')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .in('status', ['active', 'trialing']);

    if (subscriptionError) {
      console.error('Error checking subscriptions:', subscriptionError);
      throw subscriptionError;
    }

    const hasConnections = (connectionCount || 0) > 0;
    const hasSubscription = (subscriptionCount || 0) > 0;
    const isOnboardingComplete = hasConnections && hasSubscription;

    // Trigger appropriate onboarding step if needed
    if (!isOnboardingComplete) {
      if (!hasConnections) {
        await step.sendEvent('social-linking-required', {
          name: 'onboarding/social-linking.required',
          data: { userId },
        });
      } else if (!hasSubscription) {
        await step.sendEvent('plan-selection-required', {
          name: 'onboarding/plan-selection.required',
          data: { userId },
        });
      }
    }

    return { isOnboardingComplete };
  }
);

export const socialLinkingRequired = inngest.createFunction(
  { id: 'social-linking-required' },
  { event: 'onboarding/social-linking.required' },
  async ({ event, step }) => {
    // This is where you'd trigger the social linking UI
    // For now, we'll just log it
    console.log('Social linking required for user:', event.data.userId);
    return { status: 'pending', step: 'social-linking' };
  }
);

export const planSelectionRequired = inngest.createFunction(
  { id: 'plan-selection-required' },
  { event: 'onboarding/plan-selection.required' },
  async ({ event, step }) => {
    // This is where you'd trigger the plan selection UI
    console.log('Plan selection required for user:', event.data.userId);
    return { status: 'pending', step: 'plan-selection' };
  }
);

export const onboardingComplete = inngest.createFunction(
  { id: 'onboarding-complete' },
  { event: 'onboarding/complete' },
  async ({ event, step }) => {
    const { userId } = event.data;
    
    // Update user's onboarding status
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error } = await supabase
      .from('users')
      .update({ onboarding_complete: true })
      .eq('id', userId);

    if (error) {
      console.error('Error updating onboarding status:', error);
      throw error;
    }

    return { status: 'completed' };
  }
);
