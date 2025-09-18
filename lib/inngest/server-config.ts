import { Inngest } from 'inngest';

// This is a separate instance for server-side usage
export const inngestServer = new Inngest({
  id: 'youtube-seo-app-server',
  eventKey: process.env.INNGEST_EVENT_KEY,
  // Enable development mode when not in production
  dev: process.env.NODE_ENV !== 'production',
  // In development, use the local dev server
  // In production, this will use the default Inngest API URL
  baseUrl: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000/api/inngest' 
    : undefined,
});
