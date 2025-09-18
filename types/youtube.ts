export interface YouTubeChannelData {
  channel_id: string;
  title: string;
  thumbnail: string;
  description?: string;
  published_at?: string;
  subscriber_count?: number;
  video_count?: number;
  view_count?: number;
}

export interface YouTubeConnection {
  id: string;
  provider: 'youtube';
  provider_user_id: string;
  access_token: string;
  refresh_token?: string;
  expires_at: number;
  provider_data: YouTubeChannelData;
  created_at: string;
  updated_at: string;
}
