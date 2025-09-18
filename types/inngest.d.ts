import type { Inngest } from 'inngest';

declare module 'inngest' {
  interface Events {
    'youtube/analytics.sync': {
      data: {
        userId: string;
        channelId: string;
        startDate?: string;
        endDate?: string;
      };
    };
    'onboarding/check': {
      data: {
        userId: string;
      };
    };
    'social/connected': {
      data: {
        userId: string;
        provider: string;
      };
    };
  }
}

export type InngestClient = Inngest;
