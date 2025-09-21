const express = require('express');
const router = express.Router();

// Import fetch dynamically for node-fetch v3+
const getFetch = async () => {
  try {
    // Try native fetch first (Node.js 18+)
    if (global.fetch) {
      return global.fetch;
    }
    // Fallback to node-fetch v3+
    const { default: fetch } = await import('node-fetch');
    return fetch;
  } catch (error) {
    throw new Error('Failed to load fetch implementation');
  }
};

// Middleware to validate Discord bot token
const validateDiscordToken = (req, res, next) => {
  const token = process.env.DISCORD_BOT_TOKEN;
  if (!token) {
    return res.status(500).json({
      error: 'Discord bot token not configured',
      code: 'MISSING_DISCORD_TOKEN'
    });
  }
  req.discordToken = token;
  next();
};

// Middleware to validate Discord user ID
const validateDiscordUserId = (req, res, next) => {
  const userId = process.env.DISCORD_USER_ID;
  if (!userId) {
    return res.status(500).json({
      error: 'Discord user ID not configured',
      code: 'MISSING_DISCORD_USER_ID'
    });
  }
  req.discordUserId = userId;
  next();
};

// GET /discord/profile - Get user's Discord profile information
router.get('/profile', validateDiscordToken, validateDiscordUserId, async (req, res) => {
  try {
    const fetch = await getFetch();
    const token = req.discordToken;
    const userId = req.discordUserId;

    // Fetch user information from Discord API
    const response = await fetch(`https://discord.com/api/v10/users/${userId}`, {
      headers: {
        'Authorization': `Bot ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Discord API responded with status: ${response.status}`);
    }

    const userData = await response.json();

    // Return relevant profile information
    res.json({
      id: userData.id,
      username: userData.username,
      discriminator: userData.discriminator,
      avatar: userData.avatar,
      // Construct avatar URL if avatar exists
      avatarUrl: userData.avatar
        ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png?size=256`
        : null,
      global_name: userData.global_name,
    });

  } catch (error) {
    console.error('Discord API error:', error);
    res.status(500).json({
      error: 'Failed to fetch Discord profile',
      details: error.message,
    });
  }
});

module.exports = router;