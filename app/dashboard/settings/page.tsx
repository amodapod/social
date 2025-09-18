'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';

export default function SettingsPage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [youtubeConnected, setYoutubeConnected] = useState(false);
  const [youtubeChannel, setYoutubeChannel] = useState<any>(null);

  const handleYoutubeConnect = async () => {
    try {
      setIsLoading(true);
      // Redirect to backend OAuth endpoint
      window.location.href = `/api/auth/youtube?userId=${user?.id}`;
    } catch (error) {
      console.error('Error connecting YouTube:', error);
      setIsLoading(false);
    }
  };

  const checkYoutubeConnection = async () => {
    try {
      const response = await fetch('/api/youtube/status');
      const data = await response.json();
      if (data.connected) {
        setYoutubeConnected(true);
        setYoutubeChannel(data.channel);
      }
    } catch (error) {
      console.error('Error checking YouTube connection:', error);
    }
  };

  useEffect(() => {
    checkYoutubeConnection();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and integrations.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Integrations</CardTitle>
          <CardDescription>Connect your accounts to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30">
                <Icons.youtube className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-medium">YouTube</h3>
                <p className="text-sm text-muted-foreground">
                  {youtubeConnected 
                    ? `Connected as ${youtubeChannel?.title}` 
                    : 'Connect your YouTube channel to get started'}
                </p>
              </div>
            </div>
            <Button
              variant={youtubeConnected ? 'outline' : 'default'}
              onClick={handleYoutubeConnect}
              disabled={isLoading}
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : youtubeConnected ? (
                <Icons.check className="mr-2 h-4 w-4" />
              ) : (
                <Icons.add className="mr-2 h-4 w-4" />
              )}
              {youtubeConnected ? 'Connected' : 'Connect'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
