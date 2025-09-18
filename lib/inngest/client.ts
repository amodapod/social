import { Inngest } from 'inngest';
import type { InngestClient } from '@/types/inngest';

// Create a single instance of the Inngest client for server-side usage
export const inngest: InngestClient = new Inngest({
  id: 'youtube-seo-app',
  eventKey: process.env.INNGEST_EVENT_KEY,
  // Set the base URL for the Inngest API
  fetch: (input, init) => {
    // Use the local dev server URL when in development
    const baseUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000' 
      : process.env.NEXT_PUBLIC_SITE_URL;
      
    const url = typeof input === 'string' 
      ? new URL(input, baseUrl)
      : input;
    
    return fetch(url, {
      ...init,
      headers: {
        ...init?.headers,
        'Content-Type': 'application/json',
      },
    });
  },
});
