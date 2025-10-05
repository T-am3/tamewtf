const express = require('express');
const router = express.Router();

const getFetch = async () => {
  try {
    if (global.fetch) {
      return global.fetch;
    }
    const { default: fetch } = await import('node-fetch');
    return fetch;
  } catch (error) {
    throw new Error('Failed to load fetch implementation');
  }
};

const validateApiKey = (req, res, next) => {
  const apiKey = process.env.LASTFM_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'LastFM API key not configured',
      code: 'MISSING_API_KEY'
    });
  }
  req.apiKey = apiKey;
  next();
};

const validateUsername = (req, res, next) => {
  if (!process.env.DEFAULT_LASTFM_USERNAME) {
    return res.status(500).json({
      error: 'DEFAULT_LASTFM_USERNAME environment variable not configured',
      code: 'MISSING_USERNAME_CONFIG'
    });
  }
  next();
};

const USERNAME = process.env.DEFAULT_LASTFM_USERNAME || 'tam3_';

router.get('/recent', validateApiKey, validateUsername, async (req, res) => {
  try {
    const { limit = 1 } = req.query;
    const apiKey = req.apiKey;

    const fetch = await getFetch();
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${apiKey}&format=json&limit=${limit}`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('LastFM API Error:', response.status, errorText);
      throw new Error(`LastFM API responded with status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      const errorResponse = handleLastFMError(data.error, data.message, USERNAME);
      return res.status(errorResponse.status).json(errorResponse.body);
    }

    const tracks = data.recenttracks?.track;
    if (!tracks || tracks.length === 0) {
      return res.json({
        tracks: [],
        message: 'No recent tracks found',
        total: 0
      });
    }

    const trackList = Array.isArray(tracks) ? tracks : [tracks];

    const formattedTracks = trackList.map(track => ({
      name: track.name,
      artist: track.artist['#text'] || track.artist,
      album: track.album?.['#text'] || track.album,
      image: track.image?.[2]?.['#text'] || track.image?.[1]?.['#text'], // Medium size, fallback to small
      url: track.url,
      date: track.date?.uts ? new Date(parseInt(track.date.uts) * 1000).toISOString() : null,
      nowPlaying: track['@attr']?.nowplaying === 'true'
    }));

    res.json({
      tracks: formattedTracks,
      total: data.recenttracks['@attr']?.total || formattedTracks.length,
      user: data.recenttracks['@attr']?.user || USERNAME,
      success: true
    });

  } catch (error) {
    console.error('LastFM recent tracks error:', error);
    res.status(500).json({
      error: 'Failed to fetch recent tracks',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

router.get('/top-tracks', validateApiKey, validateUsername, async (req, res) => {
  try {
    const { period = '7day', limit = 10 } = req.query;
    const apiKey = req.apiKey;

    const fetch = await getFetch();
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${USERNAME}&api_key=${apiKey}&format=json&period=${period}&limit=${limit}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`LastFM API responded with status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      const errorResponse = handleLastFMError(data.error, data.message, USERNAME);
      return res.status(errorResponse.status).json(errorResponse.body);
    }

    const tracks = data.toptracks?.track || [];
    const formattedTracks = tracks.map(track => ({
      name: track.name,
      artist: track.artist.name,
      playcount: parseInt(track.playcount),
      url: track.url,
      image: track.image?.[2]?.['#text'] || track.image?.[1]?.['#text'],
      rank: parseInt(track['@attr']?.rank) || null
    }));

    res.json({
      tracks: formattedTracks,
      total: parseInt(data.toptracks['@attr']?.total) || formattedTracks.length,
      user: data.toptracks['@attr']?.user || USERNAME,
      period: period,
      success: true
    });

  } catch (error) {
    console.error('LastFM top tracks error:', error);
    res.status(500).json({
      error: 'Failed to fetch top tracks',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

function handleLastFMError(errorCode, errorMessage, username) {
  switch (errorCode) {
    case 6:
      return {
        status: 404,
        body: {
          error: `LastFM user "${username}" not found`,
          code: 'USER_NOT_FOUND'
        }
      };
    case 10:
      return {
        status: 500,
        body: {
          error: 'Invalid LastFM API key',
          code: 'INVALID_API_KEY'
        }
      };
    case 29:
      return {
        status: 429,
        body: {
          error: 'LastFM API rate limit exceeded',
          code: 'RATE_LIMIT_EXCEEDED'
        }
      };
    default:
      return {
        status: 400,
        body: {
          error: errorMessage || 'LastFM API error',
          code: 'API_ERROR',
          lastfmCode: errorCode
        }
      };
  }
}

module.exports = router;