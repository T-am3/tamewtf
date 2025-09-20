import { useState, useEffect } from 'react';

interface LastFMTrack {
  name: string;
  artist: string;
  album?: string;
  image?: string;
  url?: string;
}

interface LastFMProps {
  className?: string;
}

export default function LastFM({
  className = ''
}: LastFMProps) {
  const [currentTrack, setCurrentTrack] = useState<LastFMTrack | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrentTrack = async () => {
      try {
        const response = await fetch(
          `${process.env.NODE_ENV === 'production'
            ? 'https://tamewtf-server.herokuapp.com' // Update with your production server URL
            : 'http://localhost:3001'
          }/api/lastfm/recent`
        );

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        if (data.tracks && data.tracks.length > 0) {
          const track = data.tracks[0]; // Get the most recent track
          setCurrentTrack({
            name: track.name,
            artist: track.artist,
            album: track.album,
            image: track.image,
            url: track.url
          });
        } else {
          // No recent tracks
          setCurrentTrack(null);
        }
      } catch (err) {
        console.warn('Failed to fetch track data:', err);
        setError('Unable to load current track');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentTrack();

    // Auto-refresh disabled to prevent API rate limiting
    // const interval = setInterval(fetchCurrentTrack, 30000);
    // return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative rounded-lg overflow-hidden border border-gray-800/50 ${className}`}>
      {/* Blurred background cover art */}
      {currentTrack?.image && (
        <div
          className="absolute inset-0 bg-cover bg-center blur-sm"
          style={{ backgroundImage: `url(${currentTrack.image})` }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-700/30 to-gray-800/30 blur-sm"></div>
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative p-6">
        <div className="mb-4">
          <h4 className="text-lg text-white font-light">
            {isLoading ? 'loading...' : 'last listened to'}
          </h4>
        </div>

        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-lg flex items-center justify-center border border-gray-600/30 overflow-hidden">
            {currentTrack?.image ? (
              <img
                src={currentTrack.image}
                alt={`${currentTrack.name} album art`}
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                className="w-8 h-8 text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
              </svg>
            )}
          </div>

          <div className="flex-1 min-w-0">
            {isLoading ? (
              <>
                <p className="text-white font-medium truncate">
                  loading track...
                </p>
                <p className="text-gray-300 text-sm truncate">
                  fetching current song
                </p>
              </>
            ) : error ? (
              <>
                <p className="text-white font-medium truncate">
                  {error}
                </p>
                <p className="text-gray-300 text-sm truncate">
                try again later
                </p>
              </>
            ) : currentTrack ? (
              <>
                <p className="text-white font-medium truncate">
                  {currentTrack.name}
                </p>
                <p className="text-gray-300 text-sm truncate">
                  {currentTrack.artist}
                  {currentTrack.album && ` • ${currentTrack.album}`}
                </p>
              </>
            ) : (
              <>
                <p className="text-white font-medium truncate">
                  no recent activity
                </p>
                <p className="text-gray-300 text-sm truncate">
                  check back later
                </p>
              </>
            )}
          </div>
        </div>

        {currentTrack?.url && (
          <div className="mt-4">
            <a
              href={currentTrack.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              view on last.fm →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}