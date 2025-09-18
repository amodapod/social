export interface Database {
  public: {
    Tables: {
      channel_metrics: {
        Row: {
          id: string
          user_id: string
          subscribers: number
          total_views: number
          engagement_rate: number
          revenue_estimate: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          subscribers: number
          total_views: number
          engagement_rate: number
          revenue_estimate: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          subscribers?: number
          total_views?: number
          engagement_rate?: number
          revenue_estimate?: number
          created_at?: string
        }
      }
      ai_results: {
        Row: {
          id: string
          user_id: string
          tool: string
          input: any
          output: any
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tool: string
          input: any
          output: any
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tool?: string
          input?: any
          output?: any
          status?: string
          created_at?: string
        }
      }
      competitor_channels: {
        Row: {
          id: string
          name: string
          channel_id: string
          subscribers: number
          total_views: number
          engagement_rate: number
          niche: string
          last_updated: string
        }
        Insert: {
          id?: string
          name: string
          channel_id: string
          subscribers: number
          total_views: number
          engagement_rate: number
          niche: string
          last_updated?: string
        }
        Update: {
          id?: string
          name?: string
          channel_id?: string
          subscribers?: number
          total_views?: number
          engagement_rate?: number
          niche?: string
          last_updated?: string
        }
      }
      user_credits: {
        Row: {
          id: string
          user_id: string
          credits: number
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          credits?: number
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          credits?: number
          updated_at?: string
        }
      }
    }
  }
}