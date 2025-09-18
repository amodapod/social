import { inngest } from '@/lib/inngest/client';
import { createServerSupabaseClient } from '@/lib/supabase-server';

// Define the YouTube sync event
type SyncYouTubeAnalytics = {
  name: 'youtube/analytics.sync';
  data: {
    userId: string;
    channelId: string;
    startDate?: string;
    endDate?: string;
  };
};

// Create the Inngest function
export const syncYouTubeAnalytics = inngest.createFunction(
  { id: 'sync-youtube-analytics' },
  { event: 'youtube/analytics.sync' },
  async ({ event, step }) => {
    // Initialize Supabase client inside the function
    const supabase = createServerSupabaseClient();
    const { userId, channelId, startDate, endDate } = event.data;

    // 1. Get the user's access token from the database
    const { data: connection, error } = await supabase
      .from('user_connections')
      .select('*')
      .eq('user_id', userId)
      .eq('provider', 'youtube')
      .single();

    if (error || !connection) {
      throw new Error('YouTube connection not found');
    }

    // 2. Fetch analytics data from YouTube API
    const analytics = await step.run('fetch-youtube-analytics', async () => {
      // TODO: Implement YouTube Analytics API call
      // This is a placeholder - you'll need to implement the actual API call
      return {
        views: 0,
        watchTime: 0,
        subscribers: 0,
        // ... other metrics
      };
    });

    // 3. Save the analytics data to the database
    await step.run('save-analytics', async () => {
      const { error } = await supabase
        .from('youtube_analytics')
        .upsert({
          user_id: userId,
          channel_id: channelId,
          date: new Date().toISOString().split('T')[0], // Today's date
          metrics: analytics,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        throw error;
      }
    });

    return { success: true, data: analytics };
  }
);

// Add this function to the Inngest handlers array in route.ts
