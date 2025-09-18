import { inngest } from './inngest';

type SyncYouTubeAnalyticsParams = {
  userId: string;
  channelId: string;
  startDate?: string;
  endDate?: string;
};

export async function triggerYouTubeSync(params: SyncYouTubeAnalyticsParams) {
  return await inngest.send({
    name: 'youtube/analytics.sync',
    data: {
      userId: params.userId,
      channelId: params.channelId,
      startDate: params.startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Default to last 30 days
      endDate: params.endDate || new Date().toISOString().split('T')[0], // Default to today
    },
  });
}

// Add this to your existing youtube.ts file if it exists
