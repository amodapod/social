import { inngest } from '@/lib/inngest';
import { createServerSupabaseClient } from '@/lib/supabase-server';

// Initialize Supabase client
const supabase = createServerSupabaseClient();

// This function checks if a user has completed onboarding
export const checkOnboardingStatus = inngest.createFunction(
  { id: 'check-onboarding-status' },
  { event: 'user.created' },
  async ({ event, step }) => {
    const { userId } = event.data;

    // Check if user has connected any social accounts
    const { data: connections } = await supabase
      .from('user_connections')
      .select('id')
      .eq('user_id', userId)
      .limit(1);

    const hasSocialConnections = (connections?.length || 0) > 0;

    // Check if user has an active subscription
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('status')
      .eq('user_id', userId)
      .in('status', ['active', 'trialing'])
      .single();

    const hasActiveSubscription = !!subscription;

    // Determine next step
    if (!hasSocialConnections) {
      await step.sendEvent('prompt-social-connection', {
        name: 'onboarding/social.prompt',
        data: { userId },
      });
    } else if (!hasActiveSubscription) {
      await step.sendEvent('prompt-subscription', {
        name: 'onboarding/subscription.prompt',
        data: { userId },
      });
    } else {
      // Mark onboarding as complete
      await step.run('complete-onboarding', async () => {
        await supabase
          .from('profiles')
          .update({ onboarding_complete: true })
          .eq('id', userId);
      });
    }

    return { status: 'onboarding_checked' };
  }
);

// This function handles social connection events
export const handleSocialConnected = inngest.createFunction(
  { id: 'handle-social-connected' },
  { event: 'user.social.connected' },
  async ({ event, step }) => {
    const { userId, provider } = event.data;

    // Update user's connections in the database
    await step.run('update-connections', async () => {
      // This would be a more sophisticated update in a real app
      await supabase
        .from('user_connections')
        .upsert({
          user_id: userId,
          provider,
          connected_at: new Date().toISOString(),
        });
    });

    // Check if we should prompt for subscription next
    const { data: hasActiveSubscription } = await supabase
      .from('subscriptions')
      .select('id')
      .eq('user_id', userId)
      .in('status', ['active', 'trialing'])
      .single();

    if (!hasActiveSubscription) {
      await step.sendEvent('prompt-subscription', {
        name: 'onboarding/subscription.prompt',
        data: { userId },
      });
    }

    return { status: 'social_connection_processed' };
  }
);

// This function handles subscription events
export const handleSubscriptionCreated = inngest.createFunction(
  { id: 'handle-subscription-created' },
  { event: 'subscription.created' },
  async ({ event, step }) => {
    const { userId, planId } = event.data;

    // Update user's subscription in the database
    await step.run('update-subscription', async () => {
      await supabase
        .from('subscriptions')
        .upsert({
          user_id: userId,
          plan_id: planId,
          status: 'active',
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        });
    });

    // Mark onboarding as complete
    await step.run('complete-onboarding', async () => {
      await supabase
        .from('profiles')
        .update({ onboarding_complete: true })
        .eq('id', userId);
    });

    return { status: 'subscription_processed' };
  }
);
