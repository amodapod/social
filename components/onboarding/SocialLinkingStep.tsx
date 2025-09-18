'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { useToast } from '@/hooks/use-toast';

interface SocialLinkingStepProps {
  onNext: () => void;
}

type SocialPlatform = 'youtube' | 'instagram' | 'tiktok';

export function SocialLinkingStep({ onNext }: SocialLinkingStepProps) {
  const [isLoading, setIsLoading] = useState<Record<SocialPlatform, boolean>>({
    youtube: false,
    instagram: false,
    tiktok: false,
  });
  
  const [connectedAccounts, setConnectedAccounts] = useState<SocialPlatform[]>([]);
  const { toast } = useToast();

  const handleConnect = async (platform: SocialPlatform) => {
    try {
      setIsLoading(prev => ({ ...prev, [platform]: true }));
      
      // This would be replaced with your actual OAuth flow
      const response = await fetch(`/api/auth/${platform}/connect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error(`Failed to connect ${platform}`);
      
      const data = await response.json();
      
      // For demo purposes, we'll just add it to the connected accounts
      if (!connectedAccounts.includes(platform)) {
        setConnectedAccounts([...connectedAccounts, platform]);
      }
      
      toast({
        title: 'Success',
        description: `Successfully connected ${platform} account`,
      });
      
    } catch (error) {
      console.error(`Error connecting ${platform}:`, error);
      toast({
        title: 'Error',
        description: `Failed to connect ${platform} account`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(prev => ({ ...prev, [platform]: false }));
    }
  };

  const isContinueDisabled = connectedAccounts.length === 0;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Connect Your Social Accounts</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Link your social accounts to get started with analytics and insights.
        </p>
      </div>

      <div className="space-y-4">
        <SocialButton
          platform="youtube"
          icon={<Icons.youtube className="h-5 w-5" />}
          connected={connectedAccounts.includes('youtube')}
          loading={isLoading.youtube}
          onClick={() => handleConnect('youtube')}
        />
        
        <SocialButton
          platform="instagram"
          icon={<Icons.instagram className="h-5 w-5" />}
          connected={connectedAccounts.includes('instagram')}
          loading={isLoading.instagram}
          onClick={() => handleConnect('instagram')}
        />
        
        <SocialButton
          platform="tiktok"
          icon={<Icons.tiktok className="h-5 w-5" />}
          connected={connectedAccounts.includes('tiktok')}
          loading={isLoading.tiktok}
          onClick={() => handleConnect('tiktok')}
        />
      </div>

      <div className="flex justify-end pt-4">
        <Button 
          onClick={onNext}
          disabled={isContinueDisabled}
          className="w-full sm:w-auto"
        >
          Continue to Plans
          <Icons.arrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

interface SocialButtonProps {
  platform: string;
  icon: React.ReactNode;
  connected: boolean;
  loading: boolean;
  onClick: () => void;
}

function SocialButton({ platform, icon, connected, loading, onClick }: SocialButtonProps) {
  return (
    <Button
      variant="outline"
      className={`w-full justify-start h-14 text-base ${connected ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : ''}`}
      onClick={onClick}
      disabled={connected || loading}
    >
      <div className="flex items-center">
        <span className="mr-3">{icon}</span>
        <span className="capitalize">{platform}</span>
      </div>
      {connected ? (
        <span className="ml-auto flex items-center text-sm text-green-600 dark:text-green-400">
          <Icons.check className="h-4 w-4 mr-1" />
          Connected
        </span>
      ) : loading ? (
        <Icons.spinner className="ml-auto h-4 w-4 animate-spin" />
      ) : (
        <span className="ml-auto text-sm text-gray-500">Connect</span>
      )}
    </Button>
  );
}
