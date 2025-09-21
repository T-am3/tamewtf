import { useState, useEffect } from 'react';

interface DiscordProfile {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  avatarUrl: string | null;
  global_name?: string;
}

interface DiscordAvatarProps {
  className?: string;
  size?: number;
  fallbackSrc?: string;
}

export default function DiscordAvatar({
  className = '',
  size = 128,
  fallbackSrc = '/images/tame.gif'
}: DiscordAvatarProps) {
  const [profile, setProfile] = useState<DiscordProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiscordProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `${process.env.NODE_ENV === 'production'
            ? 'https://api.tame.wtf'
            : 'http://localhost:3001'
          }/discord/profile`
        );

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setProfile(data);
      } catch (err) {
        console.error('Failed to fetch Discord profile:', err);
        setError(err instanceof Error ? err.message : 'Failed to load Discord profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiscordProfile();
  }, []);

  if (isLoading) {
    return (
      <div
        className={`animate-pulse bg-gray-700 rounded-full border-2 border-gray-700 ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  if (error || !profile?.avatarUrl) {
    // Fallback to static image if Discord fetch fails
    return (
      <img
        src={fallbackSrc}
        alt="Profile picture"
        className={`rounded-full border-2 border-gray-700 ${className}`}
        style={{ width: size, height: size }}
        onError={(e) => {
          // If fallback also fails, show a generic avatar
          const target = e.target as HTMLImageElement;
          target.src = `https://ui-avatars.com/api/?name=${profile?.username || 'User'}&background=374151&color=ffffff&size=${size}`;
        }}
      />
    );
  }

  return (
    <img
      src={profile.avatarUrl}
      alt={`${profile.username}'s Discord avatar`}
      className={`rounded-full border-2 border-gray-700 ${className}`}
      style={{ width: size, height: size }}
      onError={(e) => {
        // Fallback to static image if Discord avatar fails to load
        const target = e.target as HTMLImageElement;
        target.src = fallbackSrc;
      }}
    />
  );
}