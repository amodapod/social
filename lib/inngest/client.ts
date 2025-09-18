// lib/inngest/client.ts
import { Inngest } from 'inngest';

// Define the event types for type safety
type Events = {
  'onboarding/check': {
    data: { userId: string };
  };
  // Add other event types as needed
};

// Create a type-safe client
type InngestClient = Inngest;

// Create a single instance of the Inngest client for server-side usage
const client = new Inngest({
  id: 'youtube-seo-app',
  // Remove the custom fetch implementation as it might be causing issues
  // The Inngest client will handle the fetch implementation
});

export const inngest: InngestClient = client;

// Helper function to safely send events
export async function sendEvent<T extends keyof Events>(
  eventName: T,
  data: Events[T]['data']
) {
  try {
    await client.send({
      name: eventName as string,
      data,
    });
  } catch (error) {
    console.error(`Error sending ${eventName} event:`, error);
    throw error;
  }
}

// Export the client as default for backward compatibility
export default client;